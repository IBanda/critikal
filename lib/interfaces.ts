import type { NextApiRequest } from 'next';
import { Session } from 'next-iron-session';

export interface NextApiReqWithSession extends NextApiRequest {
  session: Session;
}

export interface TableData {
  id: string;
  email: string;
  subject: string;
  priority: string;
  date: string;
  status: string;
}
