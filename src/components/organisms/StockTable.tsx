import React from 'react';
import { Table } from '../molecules/Table';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export interface Stock {
  id: string;
  name: string;
  symbol: string;
  allocation: number;
  purchasePrice: number;
  currency: string;
  portfolioId: string;
  userId: string;
  logo: string;
}

interface StockTableProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onEdit }) => {
  const columns: { header: string; accessor: keyof Stock; icon?: any; onIconClick?: (stock: Stock) => void }[] = [
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Name', accessor: 'name' },
    { header: 'Purchase Price', accessor: 'purchasePrice' },
    { header: 'Allocation', accessor: 'allocation' },
    { header: '', accessor: 'id', icon: faEllipsisVertical, onIconClick: onEdit },
  ];

  return <Table columns={columns} data={stocks} />;
};

export default StockTable;
