import { useState } from 'react';
import { TableData } from 'lib/interfaces';
import DataTable from './DataTable';
import EmailModal from './EmailModal';

interface Props {
  data: TableData[];
}

export default function DataTableWithModal({ data }: Props) {
  const [id, setId] = useState('');
  const resetId = () => {
    setId('');
  };

  return (
    <>
      <DataTable data={data} setId={setId} />
      {Boolean(id) && <EmailModal id={id} onHide={resetId} />}
    </>
  );
}
