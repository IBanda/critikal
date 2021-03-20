interface Props {
  getTableBodyProps: () => any;
  page: any;
  prepareRow: (row: any) => void;
  setId: (id: string) => void;
}

export default function Tbody({
  getTableBodyProps,
  page,
  prepareRow,
  setId,
}: Props) {
  return (
    <tbody {...getTableBodyProps()}>
      {page.length ? (
        page.map((row) => {
          prepareRow(row);

          return (
            <tr
              onClick={() => setId(row.original.id)}
              {...row.getRowProps({
                className: `text-indigo-900 tracking-tight ${
                  row.original.hasListedTags
                    ? 'bg-pink-200'
                    : 'odd:bg-indigo-200'
                } cursor-pointer`,
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
            <h1 className="px-4 tracking-tight whitespace-nowrap  text-gray-900 font-bold text-lg">
              No Messages
            </h1>
          </td>
        </tr>
      )}
    </tbody>
  );
}
