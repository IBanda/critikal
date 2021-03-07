import { GetServerSideProps } from 'next';
import Subscriber from 'models/subscriber';
import Form from 'components/Form';
import db from 'lib/db';
import Head from 'next/head';

interface Props {
  email: string | null;
  error: string | null;
}
export default function DefaultForm({ email, error }: Props) {
  const element = error ? (
    <h1 className="text-xl tracking-tighter font-bold mx-auto">{error}</h1>
  ) : (
    <Form receiverEmail={email} />
  );
  return (
    <div
      style={{
        backgroundImage: `url(/form-bg.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
      className="py-16 container bg-opacity-25"
    >
      <Head>
        <title>Form</title>
      </Head>
      <div className="relative z-10">{element}</div>
      <div className="bg-opacity-90 bg-white fixed top-0 left-0 w-full h-full" />
      <div className="flex items-center shadow p-1 fixed right-0 top-1/2 bg-white">
        <span className="text-xs tracking-tight font-medium">Powered by:</span>
        <img className="w-8 ml-1" src="/logo.png" alt="logo" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  try {
    await db();
    const { email } = await Subscriber.findOne({ _id: id }, 'email');

    const props: Props = {
      email,
      error: email ? null : 'Link is invalid',
    };
    return {
      props,
    };
  } catch (error) {
    const props: Props = {
      email: null,
      error: 'Something went wrong',
    };
    return {
      props,
    };
  }
};
