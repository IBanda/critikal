/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { TableData } from 'lib/interfaces';
import FilterInput from './FilterInput';
import SelectFilter from './SelectFilter';
import Thead from './Thead';
import Tbody from './Tbody';
import Tpagination from './Tpagination';
import DateFilter from './DateFilter';

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
    Cell: ({ value }) => (
      <div
        className={`text-center rounded text-xs text-white py-0.5 px-1 rounded-full bg-${
          value === 'high' ? 'red' : 'green'
        }-500`}
      >
        {value}
      </div>
    ),
  },
  {
    Header: 'Date',
    accessor: 'date',
    Filter: DateFilter,
    filter: 'between',
    Cell: ({ value }) => new Date(Number(value)).toLocaleDateString(),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Filter: SelectFilter,
  },
];

interface Props {
  data: TableData[];
  setId: (id: string) => void;
}

export default function DataTable({ data, setId }: Props) {
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
        <Thead headerGroups={headerGroups} />
        <Tbody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          setId={setId}
        />
      </table>
      <Tpagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
}
