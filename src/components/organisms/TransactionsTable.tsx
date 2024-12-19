import React from 'react';
import { Transaction } from '../../types/Transaction';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../molecules/Table";
import moment from "moment";

interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onEdit }) => {
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    createdAt: moment(transaction.createdAt).format('DD-MM-YYYY'),
    operation: transaction.operation.toUpperCase(),
  }));

  const columns: { header: string; accessor?: keyof Transaction | ((row: Transaction) => any); icon?: any; onIconClick?: (transaction: Transaction) => void }[] = [
    { header: 'Created at', accessor: 'createdAt' },
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Shares', accessor: 'shares' },
    { header: 'Price per share', accessor: (row) => Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(row.pricePerShare) },
    { header: 'Operation', accessor: 'operation' },
    { header: 'Total', accessor: (row) => Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(row.totalValue) },
    { header: '', icon: faEllipsisVertical, onIconClick: onEdit },
  ];

  return <Table columns={columns} data={formattedTransactions} />;
};

export default TransactionsTable;