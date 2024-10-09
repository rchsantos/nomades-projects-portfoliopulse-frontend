import React, { useState } from 'react';
import moment from 'moment';
import Button from '../atoms/Button';
import { TransactionDTO } from '../../dtos/TransactionDTO';
import { addTransaction } from '../../services/PortfolioService';

interface AddTransactionFormProps {
  portfolioId: string;
  onTransactionAdded: (transaction: TransactionDTO) => void;
  onClosed: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ portfolioId, onTransactionAdded, onClosed }) => {
  const [transaction, setTransaction] = useState<TransactionDTO>({
    operation: '',
    name: '',
    symbol: '',
    date: '',
    shares: 0,
    price: 0,
    currency: '',
    fee_tax: 0,
    note: '',
    portfolio_id: portfolioId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
  
    if (name === 'date' && value) {
      const date = new Date(value);
      formattedValue = date.toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
    }
  
    setTransaction({ ...transaction, [name]: formattedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transaction:', transaction);
    transaction.portfolio_id = portfolioId;
    const formattedTransaction = {
      ...transaction,
      date: moment(transaction.date).toISOString() // Ensure date is a string
    };
    addTransaction(portfolioId, formattedTransaction).then((newTransaction) => {
      onTransactionAdded({
        ...newTransaction, date: moment(newTransaction.date).toISOString(),
        portfolio_id: ''
      });
      onClosed();
    });
  };

  return (
    <div className='flex flex-col bg-white text-dark-gunmetal'>
      <p className='p-4'>
        Enter details about your holdings, including the average price per share and the number of shares you own. Support for advanced transaction management features will be available soon. 
      </p>
      <form 
        onSubmit={handleSubmit}
        className="p-4 flex flex-col justify-start rounded shadow-md"
        >
        <div className='mb-4'>
          <label 
            htmlFor='operation'
            className="text-sm font-medium text-dark-gunmetal"
            >
            Operation
          </label>
          <input
            type="text" 
            name="operation" 
            value={transaction.operation} 
            placeholder='Buy/Sell'
            onChange={handleChange} 
            required 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className="text-sm font-medium text-dark-gunmetal">
            Name
          </label>
          <input
            type="text" 
            name="name" 
            value={transaction.name} 
            onChange={handleChange} 
            placeholder='Apple Inc.'
            required 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='symbol'
            className="text-sm font-medium text-dark-gunmetal"
          >
            Symbol
          </label>
          <input 
          type="text" 
          name="symbol" 
          value={transaction.symbol} 
          onChange={handleChange} 
          placeholder='AAPL'
          required 
          className='mt-1 p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='date'
            className='text-sm font-medium text-dark-gunmetal'
          >
            Date
          </label>
          <input 
            type="date" 
            name="date" 
            value={transaction.date} 
            placeholder="Select a date"
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required 
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='shares'
            className="text-sm font-medium text-dark-gunmetal"
          >
            Shares
            </label>
          <input 
            type="number" 
            name="shares" 
            value={transaction.shares} 
            onChange={handleChange} 
            placeholder='This is the number of shares'
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required 
            />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='price'
            className='text-sm font-medium text-dark-gunmetal'
          >
            Price
          </label>
          <input 
            type="number" 
            name="price" 
            value={transaction.price}
            placeholder="This is the price per share"
            onChange={handleChange} 
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='currency'
            className='text-sm font-medium text-dark-gunmetal'
          >
            Currency
          </label>
          <input 
            type="text" 
            name="currency" 
            value={transaction.currency}
            placeholder="USD" 
            onChange={handleChange} 
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required 
            />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='fee_tax'
            className='text-sm font-medium text-dark-gunmetal'
          >
            Fee/Tax
          </label>
          <input 
            type="number" 
            name="fee_tax" 
            value={transaction.fee_tax} 
            placeholder="This is the fee or tax"
            onChange={handleChange} 
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required 
            />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='note'
            className='text-sm font-medium text-dark-gunmetal'
          >
            Note
          </label>
          <input 
            type="text" 
            name="note" 
            value={transaction.note} 
            placeholder="This is a note"
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            />
        </div>
        <Button 
          type="submit"
          label="Add Transaction"
        />
      </form>
    </div>
  );
};

export default AddTransactionForm;