import type { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import withSession from 'lib/session';
import LinkCopy from 'components/LinkCopy';
import db from 'lib/db';
import Email from 'models/email';
import { TableData } from 'lib/interfaces';
import DataTableWithModal from 'components/DatatableWithModal';

interface Props {
  id: string;
  data: TableData[];
}

export default function Index({ id, data }: Props) {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <LinkCopy id={id} />
        <div className="mt-12  w-full">
          <div className="overflow-y-auto md:overflow-y-visible md:p-4">
            <DataTableWithModal data={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function formatData(data): TableData[] {
  const dataCopy = [...data];
  return dataCopy.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.senderEmail,
    subject: item.subject,
    priority: item.insights.priority,
    date: item.created_on,
  }));
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
    try {
      let data = [];
      await db();
      const emails = await Email.find(
        { emailId: subscriber.id },
        'id name senderEmail subject insights created_on'
      );
      if (emails.length) {
        data = formatData(emails);
      }
      return {
        props: {
          id: subscriber.id,
          data,
        },
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  }
);
