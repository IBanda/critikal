import type { NextApiResponse } from 'next';
import Subscriber from 'models/subscriber';
import withSession from 'lib/session';
import db from 'lib/db';
import { NextApiReqWithSession } from 'lib/interfaces';

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    const { name, email, password } = req.body;
    try {
      await db();

      const existingSubscriber = await Subscriber.exists({ email });
      if (existingSubscriber) {
        return res.status(400).json({
          message: 'Subscriber with this email already exists',
          success: false,
        });
      }

      const subscriber = new Subscriber({ name, email });
      await subscriber.hashPassword(password);
      const newSubscriber = await subscriber.save();

      if (!newSubscriber)
        return res.json({
          message: 'An error occurred while creating a new Subscriber ',
          success: false,
        });

      req.session.set('subscriber', {
        email: newSubscriber.email,
        id: newSubscriber._id,
      });
      await req.session.save();
      res
        .status(201)
        .json({ message: 'Subscriber successfully created', success: true });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ message: 'Something went wrong', success: false });
    }
  }
);
