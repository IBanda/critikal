/* eslint-disable @typescript-eslint/no-use-before-define */
import { render, screen, waitFor } from '@testing-library/react';
import SignupForm from 'components/SignupForm';
import userEvent from '@testing-library/user-event';

afterEach(() => localStorage.removeItem('subscribers'));
describe('Signup form tests', () => {
  beforeEach(() => render(<SignupForm />));
  test('Successful subscriber signup should show success alert', async () => {
    await enterUserDetails({
      name: 'businessA',
      email: 'businessA@mail.com',
      password: '12324',
    });
    const button = screen.getByRole('button');

    userEvent.click(button);
    const alert = screen.getByRole('alert');

    await waitFor(() => expect(alert).toBeInTheDocument());
    await waitFor(() => expect(alert).toHaveTextContent('...Please wait'));
    await waitFor(() =>
      expect(alert).toHaveTextContent('Subscriber successfully created')
    );
  });

  test('Existing user signup should show error alert', async () => {
    const button = screen.getByRole('button');

    const clearInputs = await enterUserDetails({
      name: 'businessB',
      email: 'bata@mail.com',
      password: '234235',
    });

    userEvent.click(button);

    const alert = screen.getByRole('alert');
    await waitFor(() => expect(alert).toBeInTheDocument());
    await waitFor(() => expect(alert).toHaveTextContent('...Please wait'));
    await waitFor(() =>
      expect(alert).toHaveTextContent('Subscriber successfully created')
    );

    clearInputs();

    await enterUserDetails({
      name: 'businessC',
      email: 'bata@mail.com',
      password: '234235',
    });
    userEvent.click(button);

    await waitFor(() => expect(alert).toBeInTheDocument());
    await waitFor(() => expect(alert).toHaveTextContent('...Please wait'));
    await waitFor(() =>
      expect(alert).toHaveTextContent(
        'Subscriber with this email already exists'
      )
    );
  });
});

/**
 * Helpers
 *
 */
async function enterUserDetails({ name, email, password }) {
  const nameInput = screen.getByTestId('name');
  const emailInput = screen.getByTestId('email');
  const passwordInput = screen.getByTestId('password');

  await userEvent.type(nameInput, name);
  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);

  return () => {
    [nameInput, emailInput, passwordInput].forEach((element) => {
      userEvent.clear(element);
    });
  };
}
