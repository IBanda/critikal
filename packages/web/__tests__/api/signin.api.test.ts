import { login, signup } from './utils/preActions';

beforeEach(async () => {
  await signup();
});

test('Should sign in', async () => {
  const { res } = await login();
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    message: 'Login successful',
    success: true,
  });
});

test('Bad credential should fail', async () => {
  const { res } = await login({
    email: 'johndoe@gmail.com',
    password: '123456',
  });
  expect(res._getStatusCode()).toBe(404);
  expect(res._getJSONData()).toEqual({
    message: `Subscriber with this email doesn't exist, please sign up`,
    success: false,
  });
});
