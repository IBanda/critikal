import { render, screen, waitFor } from '@testing-library/react';
import SignupForm from 'components/SignupForm';
import userEvent from '@testing-library/user-event';

beforeEach(() => render(<SignupForm />));

test('user should signup', async () => {
  const nameInput = screen.getByTestId('name');
  const emailInput = screen.getByTestId('email');
  const passwordInput = screen.getByTestId('password');
  const button = screen.getByRole('button');

  userEvent.type(nameInput, 'Shoprite');
  userEvent.type(emailInput, 'ian7991@outlook.com');
  userEvent.type(passwordInput, '123456');
  userEvent.click(button);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Subscriber successfully created'
  );
});
