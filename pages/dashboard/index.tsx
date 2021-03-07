import type { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import withSession from 'lib/session';
import LinkCopy from 'components/LinkCopy';

interface Props {
  id: string;
}

export default function Index({ id }: Props) {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <LinkCopy id={id} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req }) => {
    const subscriber = req.session.get('subscriber');

    if (!subscriber) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    return {
      props: {
        id: subscriber.id,
      },
    };
  }
);
