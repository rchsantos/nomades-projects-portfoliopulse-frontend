import React from 'react';
import { Listbox, ListboxOption } from '@headlessui/react';
import { Link } from 'react-router-dom';
import PortfolioCard from '../molecules/PortfolioCard';
import { Portfolio } from '../../services/PortfolioService';

interface PortfolioListProps {
  loading: boolean;
  portfolios: Portfolio[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({ loading, portfolios }) => {
  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <Listbox as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {portfolios.map((portfolio) => (
        <ListboxOption key={portfolio.id} value={portfolio}>
          {({ active }) => (
            <div className={`relative ${active ? 'ring-2 ring-indigo-500' : ''}`}>
              <Link to={`/portfolio/${portfolio.id}`} className="block">
                <PortfolioCard portfolio={portfolio} />
              </Link>
            </div>
          )}
        </ListboxOption>
      ))}
    </Listbox>
  );
};

export default PortfolioList;