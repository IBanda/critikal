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
  return !error ? (
    <div className="py-16 container">
      <Head>
        <title>Form</title>
      </Head>
      <div className="relative z-10">
        <Form receiverEmail={email} />
      </div>

      <div className=" hidden md:flex items-center shadow p-1 fixed right-0 top-1/2 bg-white z-20">
        <span className="text-xs tracking-tight font-medium">Powered by:</span>
        <div className="bg-gray-900 text-white ml-0.5 p-0.5 text-xs">
          critikal
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-xl text-center tracking-tighter font-bold mx-auto">
      {error}
    </h1>
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
