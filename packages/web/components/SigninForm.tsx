/* eslint-disable jsx-a11y/label-has-associated-control */
import useSubscriber from 'lib/useSubscriber';
import { useState } from 'react';
import Link from 'next/link';
import getAlertColor from 'utils/notificationColors';
import useFetch from 'lib/useFetch';
import Alert from './Alert';
import Input from './Input';
import Button from './Button';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    fetcher,
    notification: { message, loading, success },
    setNotification,
    initialNotification,
  } = useFetch({ loadingMessage: '...Authenticating' });
  const { mutateSubscriber } = useSubscriber({
    redirect: true,
    redirectPath: '/dashboard/',
  });

  const onSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetcher('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.success) {
      await new Promise((r) => setTimeout(r, 1000));
      mutateSubscriber(response);
    }
  };

  return (
    <form className="max-w-md" onSubmit={onSignIn}>
      <Alert
        show={Boolean(message)}
        duration={5000}
        autoHide
        onHide={() => setNotification(initialNotification)}
        className={getAlertColor(success, loading)}
      >
        {message}
      </Alert>

      <label htmlFor="email" className="font-medium">
        Email
        <Input
          id="email"
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
          className="my-2"
        />
      </label>
      <Button className="mt-4 bg-gray-900 w-full p-3 " type="submit">
        Sign In
      </Button>
      <div className="text-sm tracking-tight mt-4">
        Don&apos;t have an account?
        <Link href="/">
          <a className="text-indigo-400"> Sign Up</a>
        </Link>
      </div>
    </form>
  );
}
