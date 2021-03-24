/* eslint-disable jsx-a11y/label-has-associated-control */
import useSubscriber from 'lib/useSubscriber';
import { useState } from 'react';
import Link from 'next/link';
import useFetch from 'lib/useFetch';
import getAlertColor from 'utils/notificationColors';
import Alert from './Alert';
import Input from './Input';
import Button from './Button';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    fetcher,
    notification: { message, success, loading },
    setNotification,
    initialNotification,
  } = useFetch({ loadingMessage: '...Please wait ' });

  const { mutateSubscriber } = useSubscriber({
    redirect: true,
    redirectPath: '/dashboard/',
  });

  const onSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetcher('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.success) {
      await new Promise((r) => setTimeout(r, 2000));
      mutateSubscriber(response);
    }
  };
  return (
    <form className="max-w-md" onSubmit={onSignUp}>
      <Alert
        show={Boolean(message)}
        duration={5000}
        autoHide
        onHide={() => setNotification(initialNotification)}
        className={getAlertColor(success, loading)}
      >
        {message}
      </Alert>
      <label htmlFor="name" className="font-medium">
        Name
        <Input
          id="name"
          data-testid="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="my-2"
        />
      </label>
      <label htmlFor="email" className="font-medium">
        Email
        <Input
          id="email"
          data-testid="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
          className="my-2"
        />
      </label>
      <label htmlFor="password" className="font-medium">
        Password
        <Input
          id="password"
          data-testid="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
          className="my-2"
        />
      </label>
      <Button className="mt-4 bg-gray-900 w-full p-3 " type="submit">
        Sign Up
      </Button>
      <div className="text-sm tracking-tight mt-4">
        Already have an account?
        <Link href="/signin">
          <a className="text-indigo-400"> Sign In</a>
        </Link>
      </div>
    </form>
  );
}
