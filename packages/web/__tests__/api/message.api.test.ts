import analyzeText from 'lib/textAnalytics';
import transporter from 'lib/transporter';
import msgHandler from 'pages/api/message';
import merge from 'deepmerge';
import { applySession } from 'next-iron-session';
import {
  createMessage,
  getMessage,
  login,
  resetAndClose,
  signup,
  _createMocks,
} from './utils/preActions';

jest.mock('lib/transporter', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    sendMail: () => {},
  })),
}));

beforeEach(async () => {
  await signup();
});
afterEach(async () => {
  await resetAndClose();
});

test('Message should be analyzed and sent', async () => {
  const { res } = await createMessage();
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    message: 'Message successfully sent',
    success: true,
  });
  expect(analyzeText).toHaveBeenCalledTimes(1);
  expect(transporter).toHaveBeenCalledWith('Ian');
});

test('GET a single message', async () => {
  const { req: request } = await login();
  await createMessage();
  const msg = await getMessage();
  const { req, res } = _createMocks({
    method: 'GET',
    query: {
      id: msg.id,
    },
  });

  const reqWithSession = merge(request, {
    query: req.query,
    method: req.method,
  });

  await applySession(reqWithSession, res, {
    cookieName: 'critikal',
    password: 'testpassword',
  });
  await msgHandler(reqWithSession, res);
  expect(res._getStatusCode()).toBe(200);
});

test('Status should update', async () => {
  await createMessage();
  const msg = await getMessage();
  const { req, res } = _createMocks({
    method: 'PATCH',
    query: {
      id: msg.id,
      status: 'actionable',
    },
  });
  await msgHandler(req, res);
  const updatedMsg = await getMessage();

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    message: 'status successfully updated',
    success: true,
  });
  expect(updatedMsg.status).toBe('actionable');
});

test('Should delete a message', async () => {
  await createMessage();
  const msg = await getMessage();
  const { req, res } = _createMocks({
    method: 'DELETE',
    query: {
      id: msg.id,
    },
  });
  await msgHandler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    message: 'Message succssfully deleted',
    success: true,
  });
});
