import type { NextApiResponse } from 'next';
import { NextApiReqWithSession } from 'lib/interfaces';
import withSession from 'lib/session';

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    const subscriber = req.session.get('subscriber');
    if (subscriber) {
      res.json({
        subscriber,
        loggedIn: true,
      });
    } else {
      res.json({
        loggedIn: false,
      });
    }
  }
);
