import React from 'react';
// import { Listbox, ListboxOption } from '@headlessui/react';
// import { Link } from 'react-router-dom';
import PortfolioCard from '../molecules/PortfolioCard';
import { Link } from 'react-router-dom';
import { Portfolio } from '../../types/Portfolio';

interface PortfolioListProps {
//   loading: boolean;
  portfolios: Portfolio[];
}

const PortfolioTable: React.FC<PortfolioListProps> = ({ portfolios }) => {
  return (
    <div className='grid grid-cols-3 gap-4 mt-10'>
      {portfolios.map((portfolio) => (
        
          <PortfolioCard 
          key={portfolio.name}
          name={portfolio.name}
          value={portfolio.totalValue || 0}
          gain={portfolio.totalReturn || 0}  
          portfolioId={portfolio.id?.toString() || ''}
          />  
      ))}
    </div>
  );
};

export default PortfolioTable;