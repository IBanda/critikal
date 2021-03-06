import type { NextApiRequest } from 'next';

export interface NextApiReqWithSession extends NextApiRequest {
  session: any;
}
