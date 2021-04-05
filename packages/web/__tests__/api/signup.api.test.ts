import { resetAndClose, signup } from './utils/preActions';

beforeEach(async () => {
  await resetAndClose();
});

afterAll(async () => {
  await resetAndClose();
});

test('Should sign up', async () => {
  const { res } = await signup();
  expect(res._getStatusCode()).toBe(201);
  expect(res._getJSONData()).toEqual({
    message: 'Subscriber successfully created',
    success: true,
  });
});

test('Same email should reject with an error', async () => {
  await signup();
  const { res } = await signup();
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData()).toEqual({
    message: 'Subscriber with this email already exists',
    success: false,
  });
});
