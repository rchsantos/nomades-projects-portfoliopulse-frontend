import React from 'react';
import { Portfolio } from '../../services/PortfolioService';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <div className="text-xl font-semibold">{portfolio.name}</div>
    <div className="mt-2">{portfolio.description}</div>
    <div className="mt-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  </div>
);

export default PortfolioCard;