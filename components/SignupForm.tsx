/* eslint-disable jsx-a11y/label-has-associated-control */
import useSubscriber from 'lib/useSubscriber';
import { useEffect, useState } from 'react';
import Input from './Input';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ message, success }, setNotification] = useState({
    message: '',
    success: null,
  });
  const { mutateSubscriber } = useSubscriber({
    redirect: true,
    redirectPath: '/dashboard/',
  });

  useEffect(() => {
    const timer = setTimeout(
      () => setNotification({ message: '', success: null }),
      5000
    );
    return () => clearTimeout(timer);
  }, [success]);
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
  const alertClass = success ? 'bg-green-500' : 'bg-red-500';
  return (
    <form className="max-w-md" onSubmit={onSignUp}>
      {message && (
        <div
          role="alert"
          className={`${alertClass} tracking-tighter text-white p-1 rounded text-sm mb-4`}
        >
          {message}
        </div>
      )}
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
      <button
        className="mt-4 bg-indigo-600 w-full p-3 text-white font-medium tracking-tighter rounded focus:outline-none focus:ring-2 focus:border-indigo-300"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
