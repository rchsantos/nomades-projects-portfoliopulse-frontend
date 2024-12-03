import React from 'react';

import { Transaction } from '../../types/Transaction';
// import { Table } from '../molecules/Table';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../molecules/Table";
import moment from "moment";

interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onEdit }) => {
  // Transform the date to a more readable format before rendering the table use the locale Switzerland.
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    createdAt: moment(transaction.createdAt).format('DD-MM-YYYY'),
    pricePerShare: 'CHF ' + transaction.pricePerShare, // @TDOO: Use the locale Switzerland to format the price per share.
    totalValue: 'CHF ' + transaction.totalValue, // @TDOO: Use the locale Switzerland to format the total value.
    operation: transaction.operation.toUpperCase(),
  }));
  
  console.log('Formatted Transactions: ', formattedTransactions);

  const columns: { header: string; accessor: keyof Transaction; icon?: any; onIconClick?: (transaction: Transaction) => void }[] = [
    { header: 'Created at', accessor: 'createdAt' },
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Shares', accessor: 'shares' },
    { header: 'Price per share', accessor: 'pricePerShare' },
    { header: 'Operation', accessor: 'operation' },
    { header: 'Total', accessor: 'totalValue' },
    { header: '', accessor: 'id', icon: faEllipsisVertical, onIconClick: onEdit },
  ];
  
  // return <div>Transactions Table</div>;
  return <Table 
    columns={columns} data={formattedTransactions} />;
};

export default TransactionsTable;