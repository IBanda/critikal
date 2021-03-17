/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3000/api/signup', async (_req, res, ctx) => {
    res(
      ctx.status(200),
      ctx.json({ message: 'Subscriber successfully created', success: true })
    );
  }),
];
