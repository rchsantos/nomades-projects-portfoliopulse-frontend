import React from 'react';
import { Link } from 'react-router-dom';
// import { Portfolio } from '../../services/PortfolioService';

interface PortfolioCardProps {
  name: string;
  value: number;
  gain: number;
  portfolioId: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ name, value, gain, portfolioId }) => {
  return (
    <div className="flex flex-col justify-betweew bg-white rounded-lg shadow-md p-10">
      <h2 className='text-dark-gunmetal hover:text-global-color-secondary '>{name}</h2>
      <p>Value: ${value}</p>
      <p className={ `text-${gain >= 0 ? 'bg-dark-gunmetal' : 'red'}` }> Gain: ${gain}%</p>

      <Link 
        to={`/portfolio/${portfolioId}`}
        className='text-global-color-secondary pt-8 text-right hover:text-global-color-primary'
      >
        View Details
      </Link>
    </div>
  );
};

export default PortfolioCard;