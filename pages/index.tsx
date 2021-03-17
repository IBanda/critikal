import type { GetServerSideProps } from 'next';
import SignupForm from 'components/SignupForm';
import withSession from 'lib/session';
import AuthLayout from 'components/AuthLayout';

export default function SignUp() {
  return (
    <AuthLayout imgSrc="Mailbox-bro">
      <SignupForm />
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req }) => {
    const subscriber = req.session.get('subscriber');

    if (subscriber) {
      return {
        redirect: {
          destination: '/dashboard/',
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
);
