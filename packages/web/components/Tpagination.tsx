import { TriangleLeftIcon, TriangleRightIcon } from '@primer/octicons-react';
import Button from './Button';
import Input from './Input';

interface Props {
  page: any;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: any;
  gotoPage: (next: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (num: number) => void;
  pageIndex: number;
  pageSize: number;
}

export default function Tpagination({
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
}: Props) {
  return (
    <div className="py-2 px-4 text-sm flex justify-between items-center w-full">
      <div>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-gray-900 "
        >
          <TriangleLeftIcon />
        </Button>{' '}
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-gray-900 "
        >
          <TriangleRightIcon />
        </Button>{' '}
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
          className="bg-indigo-100 text-black my-2  rounded py-1 focus:outline-none focus:ring-2 focus:border-indigo-300"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {page.length} Record{page.length > 1 ? 's' : ''}{' '}
      </div>
    </div>
  );
}
