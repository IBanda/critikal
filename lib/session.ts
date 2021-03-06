import { withIronSession } from 'next-iron-session';

interface Handler {
  (req: any, res: any): any;
}
export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    cookieName: 'critikal',
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
