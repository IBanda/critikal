/* eslint-disable no-nested-ternary */
import { TriangleDownIcon, TriangleUpIcon } from '@primer/octicons-react';

interface Props {
  headerGroups: any;
}

export default function Thead({ headerGroups }: Props) {
  return (
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
                className: `px-4 pt-4 ${
                  column.id === 'subject' ? 'w-1/2' : 'w-1/4'
                } `,
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
  );
}
