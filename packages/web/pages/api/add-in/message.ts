import db from 'lib/db';
import Message from 'models/message';
import Tag from 'models/tag';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from 'lib/initMiddleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PATCH'],
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res);
    await db();
    switch (req.method) {
      case 'GET': {
        const { messageId } = req.query;
        if (!messageId) return res.end();
        const message = await Message.findOne({ id: String(messageId) });
        const { tags } = await Tag.findOne({ subscriber: message.receiver });
        const lowerCaseTags = tags?.map((tag) => tag.toLowerCase());
        const usedTags = message.insights.keyPhrases.filter((phrase) =>
          lowerCaseTags?.includes(phrase.toLowerCase())
        );
        if (usedTags.length) {
          return res.status(200).json({ ...message, usedTags });
        }
        res.status(200).json(message);
        break;
      }
      case 'PATCH': {
        const { messageId, status } = req.query;
        if (status === 'actionable' || status === 'resolved') {
          const message = await Message.updateOne(
            { id: String(messageId) },
            { status }
          );
          res.status(200).json(message);
        }
        break;
      }
      default:
        throw new Error('Unsupported method');
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
};
