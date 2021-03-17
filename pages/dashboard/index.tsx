import type { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import withSession from 'lib/session';
import db from 'lib/db';
import Email from 'models/message';
import { TableData } from 'lib/interfaces';
import DataTableWithModal from 'components/DatatableWithModal';
import useSWR from 'swr';
import formatData from 'utils/formatData';

interface Props {
  id: string;
  data: TableData[];
}
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Index({ id, data }: Props) {
  const { data: tableData } = useSWR('/api/email', fetcher, {
    initialData: data,
  });
  return (
    <Layout id={id}>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-12  w-full">
          <div className="overflow-y-auto lg:overflow-y-visible lg:p-4">
            <DataTableWithModal data={tableData} />
          </div>
        </div>
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
    try {
      let data = [];
      await db();
      const emails = await Email.find(
        { receiver: subscriber.id },
        'id senderEmail subject insights created_on status'
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
