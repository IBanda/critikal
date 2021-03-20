/* eslint-disable @typescript-eslint/no-use-before-define */
import type { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import withSession from 'lib/session';
import db from 'lib/db';
import Tag from 'models/tag';
import Email from 'models/message';
import { TableData } from 'lib/interfaces';
import DataTableWithModal from 'components/DatatableWithModal';
import useSWR from 'swr';
import formatData from 'utils/formatData';
import modifyResult from 'utils/modifyResult';

interface Props {
  id: string;
  data: TableData[];
}
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Index({ id, data }: Props) {
  const { data: tableData } = useSWR('/api/email', fetcher, {
    initialData: data,
  });

  // Data from another session remains until the key is revalidated
  // which means another user can see data that's not theres

  const revalidationSafeData = !tableData.length ? data : tableData;

  return (
    <Layout id={id}>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-12  w-full">
          <div className="overflow-y-auto lg:overflow-y-visible lg:p-4">
            <DataTableWithModal data={revalidationSafeData} />
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
        const { tags } = await Tag.findOne({ subscriber: subscriber.id });
        data = formatData(emails, modifyResult(tags));
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
