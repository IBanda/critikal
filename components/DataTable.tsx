import { useTable } from 'react-table';
import { TableData } from 'lib/interfaces';

const columns = [
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Subject',
    accessor: 'subject',
  },
  {
    Header: 'Priority',
    accessor: 'priority',
  },
];

interface Props {
  data: TableData[];
}
export default function DataTable({ data }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
