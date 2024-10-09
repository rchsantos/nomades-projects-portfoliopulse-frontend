import React from 'react';
import { Transaction } from '../../types/Transaction';
import { Table } from '../../components/molecules/Table';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {

  // console.log('transactions', transactions);
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date).toLocaleDateString('en-GB'),
  }));

  const columns: { header: string; accessor: keyof Transaction }[] = [
    { header: 'Date', accessor: 'date' },
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Shares', accessor: 'shares' },
    { header: 'Price', accessor: 'price' },
  ];

  return <Table columns={columns} data={formattedTransactions} />;
};

export default TransactionsTable;