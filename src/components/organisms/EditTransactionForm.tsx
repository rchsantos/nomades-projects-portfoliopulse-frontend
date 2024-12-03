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