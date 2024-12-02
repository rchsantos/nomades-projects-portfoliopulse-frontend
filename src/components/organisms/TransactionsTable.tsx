import React from 'react';
import moment from "moment";

import { Transaction } from '../../types/Transaction';
import { Table } from '../molecules/Table';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface TransactionsTableProps {
  transactions: Transaction[];
  
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  
  
  // Transform the date to a more readable format before rendering the table use the locale Switzerland.
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    date: moment(transaction.date).format('DD.MM.YYYY'),
    pricePerShare: transaction.pricePerShare.toFixed(2),
  }));

  const columns: { header: string; accessor: keyof Transaction }[] = [
    { header: 'Date', accessor: 'date' },
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Shares', accessor: 'shares' },
    { header: 'Price per share', accessor: 'pricePerShare' },
    { header: 'Operation', accessor: 'operation' },
    { header: 'Total', accessor: 'totalValue' },
    // { header: '', accessor: 'id', icon: faEllipsisVertical, onIconClick: onEdit },
  ];

  return <Table columns={columns} data={formattedTransactions} />;
};

export default TransactionsTable;