import React, { useState, useEffect } from 'react';
import { addPortfolio } from '../../services/PortfolioService';
import { Stock } from '../../types/Stock';


export interface AddPortfolioProps {
  // Define the props type for the AddPortfolio component below
  // The props is an object with no properties
  onPortfolioAdded: () => void;
  onClosed: () => void;
}

const AddPortfolio: React.FC<AddPortfolioProps> = ({ onPortfolioAdded, onClosed }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tickers, setTickers] = useState<Array<string>>([]);
  const [strategy, setStrategy] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storageUserId = localStorage.getItem('accessToken');
    if (storageUserId) {
      setUserId(storageUserId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (!userId) {
        throw new Error('User not logged in');
      }
      
      const stockTickers: Stock[] = tickers.map(ticker => ({
        id: ticker,
        name: ticker,
        symbol: ticker,
        allocation: 0,
        purchasePrice: 0,
        currency: currency,
        portfolioId: '',
        userId: userId,
        logo: ''
      }));

      console.log('Submitting portfolio with User Token:', userId);

      await addPortfolio({ name, description, userId: userId, tickers: stockTickers, strategy, currency });
      setName('');
      setDescription('');
      setTickers([]);
      setStrategy('');
      setCurrency('');
      setError(null);
      onPortfolioAdded();
      onClosed();  
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setError('Failed to create portfolio');
    }
  }

  return (
    <div className='flex flex-col bg-white text-dark-gunmetal'>
      <p className='p-4'>
      Add your holdings information such as average prices and number of shares. Support for transactions will be available soon.
      </p>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col justify-start rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-medium text-dark-gunmetal">Portfolio Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-dark-gunmetal">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tickers" className="block text-sm font-medium text-dark-gunmetal">Tickers</label>
          <input
            type="text"
            id="tickers"
            value={tickers}
            onChange={(e) => setTickers(e.target.value.split(','))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="strategy" className="block text-sm font-medium text-dark-gunmetal">Strategy</label>
          <input
            type="text"
            id="strategy"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium text-dark-gunmetal">Currency</label>
          <input
            type="text"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-global-color-primary text-dark-gunmetal py-2 px-4 rounded">
          Add Portfolio
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddPortfolio;