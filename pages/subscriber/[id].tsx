import { GetServerSideProps } from 'next';
import Subscriber from 'models/subscriber';

interface Props {
  email: string | null;
  error: string | null;
}
export default function DefaultForm({ email, error }: Props) {
  return <div>{error || email}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  try {
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
