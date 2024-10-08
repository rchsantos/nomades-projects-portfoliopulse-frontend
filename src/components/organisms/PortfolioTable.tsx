import React from 'react';
// import { Listbox, ListboxOption } from '@headlessui/react';
// import { Link } from 'react-router-dom';
import PortfolioCard from '../molecules/PortfolioCard';
import { Link } from 'react-router-dom';
import { Portfolio } from '../../services/PortfolioService';

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
          value={portfolio.value || 0}
          gain={portfolio.gain || 0}  
          portfolioId={portfolio.id?.toString() || ''}
          />  
      ))}
    </div>
  );
};

export default PortfolioTable;