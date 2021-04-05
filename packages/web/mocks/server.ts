import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { handlers } from './handlers';

// eslint-disable-next-line import/prefer-default-export
const server = setupServer(...handlers);
export { server, rest };
