/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Input from './Input';
import Alert from './Alert';

const TextArea = dynamic(import('./TextArea'), { ssr: false });

interface Props {
  receiverEmail: string;
}

export default function Form({ receiverEmail }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlMessage, setHtml] = useState('');
  const [textMessage, setText] = useState('');
  const [{ message }, setNotification] = useState({
    message: '',
    success: false,
  });
  const router = useRouter();

  const onEmailSend = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverEmail,
          senderEmail: email,
          name,
          subject,
          htmlMessage,
          textMessage,
        }),
      });
      const data = await response.json();
      if (data.success) {
        router.push('/success');
      }
    } catch (error) {
      setNotification(error);
    }
  };

  return (
    <form className="max-w-xl mx-auto" onSubmit={onEmailSend}>
      <Alert
        show={Boolean(message)}
        duration={5000}
        onHide={() => setNotification({ message: '', success: false })}
        className="bg-red-500"
      >
        {message}
      </Alert>
      <label htmlFor="name" className="font-medium tracking-tighter">
        Name
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email" className="font-medium tracking-tighter">
        Email
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="subject" className="font-medium tracking-tighter">
        Subject
        <Input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <label htmlFor="message" className="font-medium tracking-tighter">
        Message
      </label>
      <TextArea
        value={htmlMessage}
        onChange={(value) => setHtml(value)}
        onTextChange={(value) => setText(value)}
      />
      <button
        type="submit"
        className="w-full rounded bg-indigo-500 font-medium tracking-tighter text-white p-2 mt-4"
      >
        Send
      </button>
    </form>
  );
}
