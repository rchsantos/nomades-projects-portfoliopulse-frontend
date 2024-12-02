import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  icon?: IconDefinition;
  onIconClick?: (item: T) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {

  // console.log('columns', columns);
  // console.log('data', data);

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white text-dark-gunmetal border-dark-gunmetal text-left mt-4 mb-4'>
        <thead className='bg-global-color-primary opacity:30 border-dark-gunmetal'>
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-2">{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          // console.log('item', item),
            <tr key={index} className='bg-white border-b bg-transparent dark:border-global-color-secondary hover:bg-global-color-primary darck:hover:bg-global-color-primary'>
              {columns.map((column) => (
                <td key={column.accessor as string} className="px-4 py-2">
                  <span>{column.accessor ? String(item[column.accessor]) : ''}</span>
                  {column.icon && column.onIconClick && (
                    <FontAwesomeIcon
                      icon={column.icon}
                      className="ml-2 cursor-pointer"
                      onClick={() => column.onIconClick!(item)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};