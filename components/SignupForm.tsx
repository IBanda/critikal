/* eslint-disable jsx-a11y/label-has-associated-control */
import useSubscriber from 'lib/useSubscriber';
import { useState } from 'react';
import Link from 'next/link';
import Alert from './Alert';
import Input from './Input';
import Button from './Button';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ message, success }, setNotification] = useState({
    message: '',
    success: false,
  });
  const { mutateSubscriber } = useSubscriber({
    redirect: true,
    redirectPath: '/dashboard/',
  });

  const onSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
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
      const data = await response.json();
      setNotification(data);
      if (data.success) {
        await new Promise((r) => setTimeout(r, 2000));
        mutateSubscriber(data);
      }
    } catch (err) {
      setNotification(err);
    }
  };
  return (
    <form className="max-w-md" onSubmit={onSignUp}>
      <Alert
        show={Boolean(message)}
        duration={5000}
        autoHide
        onHide={() => setNotification({ message: '', success: false })}
        className={success ? 'bg-green-500' : 'bg-red-500'}
      >
        {message}
      </Alert>
      <label htmlFor="name" className="font-medium">
        Name
        <Input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label htmlFor="email" className="font-medium">
        Email
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
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
        />
      </label>
      <Button className="mt-4 bg-indigo-600 w-full p-3 " type="submit">
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
