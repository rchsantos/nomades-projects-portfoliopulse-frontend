import React, { useState } from 'react';
import moment from 'moment';
import Button from '../atoms/Button';
import { Transaction } from '../../types/Transaction';
import { updateTransaction } from '../../services/PortfolioService';
import { TransactionResponseDTO } from '../../dtos/TransactionResponseDTO';

interface EditTransactionFormProps {
  transaction: Transaction;
  onTransactionUpdated: (transaction: Transaction) => void;
  onClosed: () => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transaction, onTransactionUpdated, onClosed }) => {
  const [updatedTransaction, setUpdatedTransaction] = useState<Transaction>({
    ...transaction
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTransaction({ ...updatedTransaction, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTransaction = {
      ...updatedTransaction,
      portfolio_id: transaction.portfolioId, // Ensure portfolio_id is included
    };

    // Any return type is not recommended, but it is used here to simplify the example
    // @TODO: Replace any with the correct return type, and ensure the correct type is used
    updateTransaction(formattedTransaction).then((newTransaction: TransactionResponseDTO | any) => {
      const mappedTransaction: Transaction = {
        id: newTransaction.id,
        createdAt: newTransaction.createdAt,
        name: newTransaction.name || '', // Handle null case
        symbol: newTransaction.symbol,
        shares: newTransaction.shares,
        pricePerShare: newTransaction.pricePerShare,
        operation: newTransaction.operation,
        currency: newTransaction.currency,
        feeTax: newTransaction.feeTax,
        note: newTransaction.note,
        portfolioId: newTransaction.portfolioId,
        userId: newTransaction.userId,
        assetId: newTransaction.assetId,
        totalValue: newTransaction.totalValue,
      };
      onTransactionUpdated(mappedTransaction);
      onClosed();
    });
  };

  return (
    <div className='flex flex-col bg-white text-dark-gunmetal'>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start rounded">
        <div className='p-4'>
          <p>
            Enter details about your holdings, including the average price per share and the number of shares you own. Support for advanced transaction management features will be available soon.
          </p>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="symbol" className="text-sm font-medium text-dark-gunmetal">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={updatedTransaction.symbol}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <label htmlFor="name" className="text-sm font-medium text-dark-gunmetal">Name</label>
          <input
            type="text"
            name="name"
            value={updatedTransaction.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shares" className="text-sm font-medium text-dark-gunmetal">Shares</label>
          <input
            type="number"
            name="shares"
            value={updatedTransaction.shares}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='pricePerShare' className='text-sm font-medium text-dark-gunmetal'>Price per share</label>
          <input
            type="number"
            name="pricePerShare"
            value={updatedTransaction.pricePerShare}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
          />
        </div>
        {/* Add Total field, the total value has automaticaly and put the value in the field */}
        <div className='mb-4'>
          <label htmlFor='totalValue' className='text-sm font-medium text-dark-gunmetal'>Total Value</label>
          <input
            type="number"
            name="totalValue"
            value={updatedTransaction.totalValue}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
            disabled
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='operation' className='text-sm font-medium text-dark-gunmetal'>Operation</label>
          <input
            type="text"
            name="operation"
            value={updatedTransaction.operation}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='currency' className='text-sm font-medium text-dark-gunmetal'>Currency</label>
          <input
            type="text"
            name="currency"
            value={updatedTransaction.currency}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='feeTax' className='text-sm font-medium text-dark-gunmetal'>Fee Tax</label>
          <input
            type="number"
            name="feeTax"
            value={updatedTransaction.feeTax}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
          />
        </div>
        
        <div className='mb-4'>
          <label htmlFor='date' className='text-sm font-medium text-dark-gunmetal'>Date</label>
          <input
            type="date"
            name="date"
            value={moment(updatedTransaction.createdAt).format('YYYY-MM-DD')} // Format date for display
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            required
          />
        </div>
        {/* Other form fields similar to AddTransactionForm */}
        <Button type="submit" label="Update Transaction" />
      </form>
    </div>
  );
};

export default EditTransactionForm;