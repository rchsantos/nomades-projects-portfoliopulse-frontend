import axios from 'axios';
import { TransactionDTO, TransactionResponseDTO } from '../dtos/TransactionDTO';
import { TransactionMapper } from '../mappers/TransactionMapper';
import { Transaction } from '../types/Transaction';
import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { PortfolioMapper } from '../mappers/PortfolioMapper';
import { Portfolio } from '../types/Portfolio';
import { TotalValueResponse } from '../types/TotalValueResponse';

// This interface is used to represent the stock data in the portfolio details.
export interface StockData {
  id: string;
  logo: string;
  name: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  portfolioId: string;
  userId: string;
}

// Get all Portfolios
export const getPortfolios = async (userId: string): Promise<Portfolio[]> => {
   
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  const data: PortfolioResponseDTO[] = await response.json();
  return data.map(PortfolioMapper.toPortfolio);
};

// Fetch a Portfolio
export const fetchPortfolio = async (portfolioId: string): Promise<Portfolio | null> => {
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}`, {
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Portfolio Data:', response.data);
      return response.data;
    } else {
      throw new Error('Failed to fetch portfolio');
    }
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
};

// Add a new Portfolio
export const addPortfolio = async (portfolioDTO: PortfolioDTO): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolioDTO),
  });

  const data: PortfolioResponseDTO = await response.json();
  return PortfolioMapper.toPortfolio(data);
};

// Update an existing Portfolio
export const updatePortfolio = async (portfolioDTO: PortfolioDTO): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioDTO.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolioDTO),
  });

  const data: PortfolioResponseDTO = await response.json();
  return PortfolioMapper.toPortfolio(data);
};

// Delete a Portfolio
export const deletePortfolio = async (portfolioId: string): Promise<void> => {
  await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const fetchPortfolioStocks = async (portfolioId: string): Promise<StockData[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/assets`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio stocks');
  }

  return response.json();
};

export const fetchTransactions = async (portfolioId: string): Promise<Transaction[]> => {
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  console.log('Fetching transactions for portfolio ID:', portfolioId);

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/transaction`, {
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch transactions');
    }

    const transactionResponseDTOs: TransactionResponseDTO[] = response.data;
    console.log('Transaction Response DTOs:', transactionResponseDTOs);
    return transactionResponseDTOs.map(TransactionMapper.toTransaction);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addTransaction = async (portfolio_id: string, transactionDTO: TransactionDTO): Promise<Transaction> => {
  // console.log('Portfolio ID : ', portfolio_id);
  
  if (!portfolio_id) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolio_id}/transaction`, {
    method: 'POST',
    headers: {
      'Authorization': `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionDTO),
  });

  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }

  const transactionResponseDTO: TransactionResponseDTO = await response.json();
  return TransactionMapper.toTransaction(transactionResponseDTO);
};

export const fetchTotalValues = async (portfolioId: string): Promise<TotalValueResponse> => {
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/total-value`, {
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch total values');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching total values:', error);
    throw error;
  }
};