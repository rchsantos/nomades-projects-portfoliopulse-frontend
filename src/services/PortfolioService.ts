import { TransactionDTO, TransactionResponseDTO } from '../dtos/TransactionDTO';
import { TransactionMapper } from '../mappers/TransactionMapper';
import { Transaction } from '../types/Transaction';
// import { Stock } from '../types/Stock';
import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { PortfolioMapper } from '../mappers/PortfolioMapper';
import { Portfolio } from '../types/Portfolio';


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
   
  console.log('Token Type : ', localStorage.getItem('tokenType'));
  console.log('Token : ', localStorage.getItem('accessToken'));
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
export const fetchPortfolio = async (portfolioId: string): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log('Response Message : ', response.statusText);
    throw new Error('Failed to fetch portfolio');
  }

  // Log the response status and body
  console.log('Response Status', response.status);
  console.log('Response Body', response.body);

  return response.json();
};

// Add a new Portfolio
export const addPortfolio = async (portfolioDTO: PortfolioDTO): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('token')}`,
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
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/transaction`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  const transactionResponseDTOs: TransactionResponseDTO[] = await response.json();
  return transactionResponseDTOs.map(TransactionMapper.toTransaction);
};

export const addTransaction = async (portfolio_id: string, transactionDTO: TransactionDTO): Promise<Transaction> => {
  console.log('Portfolio ID : ', portfolio_id);
  
  if (!portfolio_id) {
    throw new Error('Portfolio ID is required');
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolio_id}/transaction`, {
    method: 'POST',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
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