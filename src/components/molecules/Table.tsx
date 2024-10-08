import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Column<T> {
  header: string;
  accessor: keyof T;
  icon?: IconDefinition;
  onIconClick?: (item: T) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {

  console.log('columns', columns);

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
          console.log('item', item),
            <tr key={index} className='bg-white border-b bg-transparent dark:border-global-color-secondary hover:bg-global-color-primary darck:hover:bg-global-color-primary'>
              {columns.map((column) => (
                <td key={column.accessor as string} className="px-4 py-2">
                  <span>{String(item[column.accessor])}</span>
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

  // return (
  //   <div className='overflow-x-auto'>
  //     <table className='min-w-full bg-white text-dark-gunmetal border-dark-gunmetal text-left  mt-4 mb-4'>
  //       <thead className='bg-global-color-primary opacity:30 border-dark-gunmetal'>
  //         <tr>
  //           <th className="px-4 py-2">Symbol</th>
  //           <th className="px-4 py-2">Name</th>
  //           <th className="px-4 py-2">purchase Price</th>
  //           <th className="px-4 py-2">Allocation</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {stocks.map((stock: Stock) => (
  //           <tr key={stock.id} className='bg-white border-b bg-transparent dark:border-global-color-secondary hover:bg-global-color-primary dark:hover:bg-global-color-primary'>
  //             <td className="px-4 py-2">{stock.symbol}</td>
  //             <td className="px-4 py-2">{stock.name}</td>
  //             <td className="px-4 py-2">{stock.purchasePrice.toFixed(2)}</td>
  //             <td className="px-4 py-2">{stock.allocation}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );