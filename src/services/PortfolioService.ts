import { Stock } from '../types/Stock';


// This interface is used to represent the portfolio data.
export interface Portfolio {
  id?: number;
  name: string;
  description: string;
  userId: string;
  tickers?: Array<Stock>;
  currency?: string;
  strategy?: string;
  value?: number;
  gain?: number;
}

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

// This interface is used to represent the transaction of stocks in the portfolio details.
export interface Transaction {
  id: string;
  date: string;
  ticker: string;
  quantity: number;
  price: number;
}

// Get all Portfolios
export  const getPortfolios = async (userId: string): Promise<Portfolio[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolios');
  }

  return await response.json();
}

// Fecth a Portfolio
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

// Add a Portfolio
export const addPortfolio = async (portfolio: Portfolio): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolio),
  });

  // const data = await response.json();

  console.log('Response Status', response.status);
  console.log('Response Body', response.body);

  if (!response.ok) {
    
    if (response.status === 400) {
      throw new Error('Bad request');
    } else if (response.status === 401) {
      throw new Error('Unauthorized');
    } else if (response.status === 403) {
      throw new Error('Forbidden');
    } else if (response.status === 500) {
      throw new Error('Failed to add portfolio');
    }

    throw new Error('Failed to add portfolio');
  }

  return response.json();
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
  // Replace with actual API call
  return [
    { id: '1', date: '2024-10-8', ticker: 'AAPL', quantity: 100, price: 221.69 },
    { id: '2', date: '2024-08-07', ticker: 'GOOGL', quantity: 20, price: 162.98 },
    { id: '3', date: '2024-08-07', ticker: 'TSLA', quantity: 720, price: 240.83 },
  ];
};