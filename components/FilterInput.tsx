import { SearchIcon } from '@primer/octicons-react';

export default function FilterInput({ column: { filterValue, setFilter } }) {
  return (
    <div className="relative my-2 text-black w-full">
      <SearchIcon className="absolute  top-1/2 left-2 transform -translate-y-1/2 text-indigo-400" />
      <input
        className="bg-gray-100 rounded focus:outline-none focus:ring-2 focus:border-indigo-300 py-1 pl-7 w-full"
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value) || undefined}
      />
    </div>
  );
}
