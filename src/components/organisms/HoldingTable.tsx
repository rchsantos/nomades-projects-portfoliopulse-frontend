import React from 'react';

import { Table } from '../molecules/Table';
import { Holding } from "../../types/Holding";

interface HoldingTableProps {
  holdings:  Holding[];
}

const HoldingTable: React.FC<HoldingTableProps> = ({ holdings }) => {
  
  const formattedHoldings = holdings.map(holding => ({
    ...holding,
    current_value: Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(holding.current_value),
  }));
  
  console.log('Current Value', formattedHoldings);
  console.log('Table Holdings', holdings);
  const columns: { header: string; accessor?: keyof Holding | ((row: Holding) => any); 
  }[] = [
    { header: 'Symbol', accessor: (row) => row.asset.symbol },
    { header: 'Name', accessor: (row) => row.asset.name },
    { header: 'Quantity', accessor: row => row.quantity },
    { header: 'Current Value', accessor: (row) => new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(row.current_value) },
    { header: 'Weight', accessor: (row) => `${(row.weight * 100).toFixed(2)}%` },
  ];

  return <Table columns={columns} data={holdings} />;
};

export default HoldingTable;
