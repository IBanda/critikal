import type { GetServerSideProps } from 'next';
import SignupForm from 'components/SignupForm';
import withSession from 'lib/session';

export default function SignUp() {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="col-span-1 flex flex-col justify-center items-center py-36">
        <img className="w-24 mx-auto mb-8" src="logo.png" alt="logo" />
        <SignupForm />
      </div>
      <div className="col-span-1 flex items-center justify-center bg-indigo-400 ">
        <img className="max-w-lg" src="/world.svg" alt="signup" />
      </div>
    </div>
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
