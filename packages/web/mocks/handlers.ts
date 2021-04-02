/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
import messages from './messages';
import loadingDelay from './loadingDelay';

interface Subscriber {
  name: string;
  email: string;
  password: string;
}
interface Req {
  name: string;
  email: string;
  password: string;
}
interface Res {
  message: string;
  success: boolean;
}
const baseUrl = 'http://localhost:3000';
export const handlers = [
  rest.post<Req, Res>(`${baseUrl}/api/signup`, async (req, res, ctx) => {
    const subscribers: Subscriber[] = [];
    const { name, email, password } = req.body;
    const DBsubscribers = localStorage.getItem('subscribers');
    await loadingDelay();
    if (DBsubscribers) {
      const subscriber = JSON.parse(DBsubscribers).find(
        (subs) => subs.email === email
      );
      if (subscriber) {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Subscriber with this email already exists',
            success: false,
          })
        );
      }
    }
    subscribers.push({ name, email, password });
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    return res(
      ctx.status(200),
      ctx.json({ message: 'Subscriber successfully created', success: true })
    );
  }),
  rest.get(`${baseUrl}/api/message`, async (req, res, ctx) => {
    const id = req.url.searchParams.get('id');

    console.log(id);
    const message = messages.find((msg) => msg.id === id);
    await loadingDelay();
    return res(ctx.status(200), ctx.json(message));
  }),
];
