import { NextApiReqWithSession } from 'lib/interfaces';
import withSession from 'lib/session';
import type { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiReqWithSession, res: NextApiResponse) => {
    req.session.destroy();
    res.json({ loggedIn: false });
  }
);
