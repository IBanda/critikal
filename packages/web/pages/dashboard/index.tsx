/* eslint-disable @typescript-eslint/no-use-before-define */
import type { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import withSession from 'lib/session';
import db from 'lib/db';
import Tag from 'models/tag';
import Email from 'models/message';
import { TableData } from 'lib/interfaces';
import TableLoading from 'components/TableLoading';
import useSWR from 'swr';
import formatData from 'utils/formatData';
import modifyResult from 'utils/modifyResult';
import dynamic from 'next/dynamic';

const DataTableWithModal = dynamic(
  () => import('components/DatatableWithModal'),
  {
    ssr: false,
    loading: () => <TableLoading />,
  }
);

interface Props {
  id: string;
  data: TableData[];
}
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Index({ id, data }: Props) {
  const { data: tableData } = useSWR('/api/message', fetcher, {
    initialData: data,
    revalidateOnMount: true,
  });

  // Data from another session remains until the key is revalidated
  // which means another user can see data that's not theres
  const revalidationSafeData = !tableData?.length ? data : tableData;
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
        const hasTags = await Tag.exists({ subscriber: subscriber.id });
        if (hasTags) {
          const { tags } = await Tag.findOne({
            subscriber: subscriber.id,
          });
          data = formatData(emails, modifyResult(tags));
        } else {
          data = formatData(emails);
        }
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
