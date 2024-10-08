import React from 'react';
import { Table } from '../../components/molecules/Table';

export interface Transaction {
  id: string;
  date: string;
  ticker: string;
  quantity: number;
  price: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const columns: { header: string; accessor: keyof Transaction }[] = [
    { header: 'Date', accessor: 'date' },
    { header: 'Ticker', accessor: 'ticker' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Price', accessor: 'price' },
  ];

  return <Table columns={columns} data={transactions} />;
};

export default TransactionsTable;