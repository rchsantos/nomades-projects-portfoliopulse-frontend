import React from 'react';
import { Table } from '../molecules/Table';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Asset } from '../../types/Asset';

interface StockTableProps {
  stocks: Asset[];
  onEdit: (stock: Asset) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onEdit }) => {
  const columns: { header: string; accessor: keyof Asset; icon?: any; onIconClick?: (stock: Asset) => void }[] = [
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Name', accessor: 'name' },
    { header: '', accessor: 'id', icon: faEllipsisVertical, onIconClick: onEdit },
  ];

  return <Table columns={columns} data={stocks} />;
};

export default StockTable;
