import db from 'lib/db';
import Message from 'models/message';
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
        if (!message)
          return res.status(404).json({
            message: 'This message was deleted from your Critikal dashboard',
            success: false,
          });

        res.status(200).json({ ...message, success: true });
        break;
      }
      case 'PATCH': {
        const { messageId, status } = req.query;
        if (status === 'actionable' || status === 'resolved') {
          const message = await Message.findOneAndUpdate(
            { id: String(messageId) },
            { status },
            { new: true }
          );
          res.status(200).json({ ...message, success: true });
        }
        break;
      }
      default:
        throw new Error('Unsupported method');
    }
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
};
