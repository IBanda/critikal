/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { TableData } from 'lib/interfaces';
import {
  TriangleDownIcon,
  TriangleUpIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@primer/octicons-react';
import FilterInput from './FilterInput';
import SelectFilter from './SelectFilter';
import Input from './Input';

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
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: memoData, defaultColumn },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="md:shadow-lg md:overflow-hidden">
      <table
        {...getTableProps({
          className: 'md:table-fixed  text-sm w-full  text-left',
          style: { borderSpacing: '2em' },
        })}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                className: 'text-indigo-900 tracking-tight ',
              })}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    className: 'px-4 pt-4 ',
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
                  {column.canFilter ? column.render('Filter') : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => alert(row.original.id)}
                  {...row.getRowProps({
                    className:
                      'text-indigo-900 tracking-tight odd:bg-indigo-200 cursor-pointer',
                  })}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps({
                        className: 'px-4 py-2 max-w-xs  truncate',
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <h1 className="px-4 tracking-tight text-indigo-400 font-medium text-lg">
                  No Messages
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="py-2 px-4 text-sm">
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-indigo-500 text-white"
        >
          <TriangleLeftIcon />
        </button>{' '}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-indigo-500 text-white"
        >
          <TriangleRightIcon />
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length || 1}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const next = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(next);
            }}
            style={{ padding: '.25rem', width: 100 }}
            className="w-8"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="bg-gray-100 text-black my-2  rounded py-1 focus:outline-none focus:ring-2 focus:border-indigo-300"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
