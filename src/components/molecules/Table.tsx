import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Column<T> {
  header: string;
  accessor?: keyof T | ((row: T) => any);
  icon?: IconDefinition;
  onIconClick?: (item: T) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {
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
                // if column.icon the icon need to be displayed in right side of the text
                <td key={column.accessor as string} className={`${column.icon ? 'text-right pl4' : 'py-2' } px-4`}>
                  <span>
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor as keyof T]}
                  </span>
                  {column.icon && column.onIconClick && (
                    <FontAwesomeIcon
                      icon={column.icon}
                      className="ml-2 cursor-pointer text-right pl-2"
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