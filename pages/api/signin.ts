import type { NextApiResponse } from 'next';
import Subscriber from 'models/subscriber';
import withSession from 'lib/session';
import db from 'lib/db';
import { NextApiReqWithSession } from 'lib/interfaces';

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    const { email, password } = req.body;
    try {
      await db();

      const existingSubscriber = await Subscriber.findOne({ email });

      if (!existingSubscriber) {
        return res.status(404).json({
          message: `Subscriber with this email doesn't exist, please sign up`,
          success: false,
        });
      }

      const subscriber = await Subscriber.findOne({ email });
      const isValidCredentials = await subscriber.compare(password);

      if (!isValidCredentials)
        return res.json({
          message: 'The  provided password does not match the account ',
          success: false,
        });

      req.session.set('subscriber', {
        email: subscriber.email,
        id: subscriber._id,
      });
      await req.session.save();
      res.status(200).json({ message: 'Login successful', success: true });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ message: 'Something went wrong', success: false });
    }
  }
);
