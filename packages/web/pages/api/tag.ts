/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiResponse } from 'next';
import { NextApiReqWithSession } from 'lib/interfaces';
import db from 'lib/db';
import Tag from 'models/tag';
import fs from 'fs/promises';
import withSession from 'lib/session';
import formidable from 'formidable';
import csv from 'csvtojson';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    const subscriber = req.session.get('subscriber');
    const form = formidable({
      keepExtensions: true,
      uploadDir: './uploads',
    });
    try {
      if (req.method === 'POST') {
        form.parse(req, async (_, fields, files) => {
          await db();
          let extractedTags = [];
          const isFileIncluded =
            files.csvFile !== 'null' && Boolean(Object.keys(files).length);

          const tags = JSON.parse(fields?.tags || '[]');
          const cols = JSON.parse(fields?.cols || '[]');

          if (isFileIncluded) {
            extractedTags = await csv()
              .fromFile(files.csvFile.path)
              .subscribe((jsonObj) => {
                Object.keys(jsonObj).forEach((key) => {
                  if (!cols.includes(key.toLowerCase())) {
                    // eslint-disable-next-line no-param-reassign
                    delete jsonObj[key];
                  }
                });
              });
          }
          const tagValues = [...extractValues(extractedTags), ...tags];
          const subscriberTagExist = await Tag.exists({
            subscriber: subscriber.id,
          });

          if (subscriberTagExist) {
            await Tag.updateOne(
              { subscriber: subscriber.id },
              { $addToSet: { tags: tagValues as any } }
            );

            if (isFileIncluded) {
              fs.unlink(files.csvFile.path);
            }
            return;
          }
          await Tag.create({
            subscriber: subscriber.id,
            tags: tagValues,
          });
          if (isFileIncluded) {
            fs.unlink(files.csvFile.path);
          }
        });
        res.end();
      } else if (req.method === 'GET') {
        const subscriberID = subscriber.id;
        const hasTags = await Tag.exists({ subscriber: subscriberID });
        if (!hasTags) return res.end();

        const { tags } = await Tag.findOne({ subscriber: subscriberID });
        res.status(200).json(tags);
      } else if (req.method === 'DELETE') {
        const { tags } = req.query;
        await Tag.updateOne(
          { subscriber: subscriber.id },
          {
            $pull: { tags: { $in: tags } },
          },
          { multi: true }
        );
        res.json({ message: 'Successfully deleted ', success: true });
      }
    } catch (error) {
      console.log(error);
      res
        .status(error.reponseCode || 500)
        .json({ message: 'Something went wrong', success: false });
    }
  }
);

function extractValues(extractedTags: any[]) {
  const set = new Set();
  extractedTags.forEach((value) => {
    Object.values(value).forEach((v) => {
      set.add(v);
    });
  });
  return [...Array.from(set)];
}
