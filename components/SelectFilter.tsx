import { useMemo } from 'react';

export default function SelectFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options: string[] = useMemo(() => {
    const opts = new Set();
    preFilteredRows.forEach((row) => {
      opts.add(row.values[id]);
    });

    return Array.from(opts) as string[];
  }, [id, preFilteredRows]);

  return (
    <select
      className="bg-gray-100 text-black my-2  rounded py-1 w-full focus:outline-none focus:ring-2 focus:border-indigo-300"
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
