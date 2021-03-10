/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { TableData } from 'lib/interfaces';
import {
  EyeIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@primer/octicons-react';
import FilterInput from './FilterInput';
import SelectFilter from './SelectFilter';

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
    Filter: SelectFilter,
    disableSortBy: true,
  },
];

interface Props {
  data: TableData[];
}

export default function DataTable({ data }: Props) {
  const defaultColumn = useMemo(
    () => ({
      Filter: FilterInput,
    }),
    []
  );
  const memoData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: memoData, defaultColumn },
    useFilters,
    useSortBy
  );

  return (
    <table
      {...getTableProps({
        className: 'table-auto  text-sm w-full md:shadow-lg text-left',
      })}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps({
              className: 'text-indigo-900 tracking-tight',
            })}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  className: 'px-4 pt-4',
                  ...column.getSortByToggleProps(),
                })}
              >
                <div>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon />
                      ) : (
                        <TriangleUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps({
              className: 'text-indigo-900 tracking-tight',
            })}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  className: 'px-4 ',
                })}
              >
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                className: 'text-indigo-900 tracking-tight odd:bg-indigo-200',
              })}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps({
                    className: 'px-4 py-2 max-w-xs min-w-xs truncate',
                  })}
                >
                  {cell.render('Cell')}
                </td>
              ))}
              <td>
                <div className="px-2 h-full">
                  <button className="focus:outline-none" type="button">
                    <EyeIcon />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
