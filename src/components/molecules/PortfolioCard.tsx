import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTotalValues } from '../../services/PortfolioService';
import { formatCurrency, formatPercentage } from '../../utils/format';

interface PortfolioCardProps {
  name: string;
  value: number;
  gain: number;
  portfolioId: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ name, value, gain, portfolioId }) => {
  const [totalValue, setTotalValue] = useState<string>('');
  const [totalReturn, setTotalReturn] = useState<string>('');

  useEffect(() => {
    const loadTotalValues = async () => {
      try {
        const totalValues = await fetchTotalValues(portfolioId);
        setTotalValue(formatCurrency(totalValues.total_value));
        setTotalReturn(formatPercentage(totalValues.return_percentage));
      } catch (error) {
        console.error('Error loading total values:', error);
      }
    };

    loadTotalValues();
  }, [portfolioId]);

  return (
    <div className="flex flex-col justify-betweew bg-white rounded-lg shadow-md p-6">
      <h2 className='pb-2 text-dark-gunmetal font-extrabold'>
        {name}
      </h2>
      <p className='pb-2 text-dark-gunmetal'>
        Value : 
        <span className='text-1xl font-semibold mb-4 ml-3'>{totalValue}</span>
      </p>
      <p> Gain :   
        <span 
          className={`text-${totalReturn.startsWith('+') ? 'global-color-secondary' : 'red'} text-1xl font-semibold mb-4 ml-3`} >
         {totalReturn}
        </span>
      </p>

      <Link 
        to={`/portfolio/${portfolioId}`}
        className='text-global-color-secondary pt-4 text-right hover:text-global-color-primary'
      >
        View Details
      </Link>
    </div>
  );
};

export default PortfolioCard;