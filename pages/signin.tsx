import type { GetServerSideProps } from 'next';
import withSession from 'lib/session';
import AuthLayout from 'components/AuthLayout';
import SigninForm from 'components/SigninForm';

export default function SignUp() {
  return (
    <AuthLayout imgSrc="inbox-cleanup-pana">
      <SigninForm />
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
