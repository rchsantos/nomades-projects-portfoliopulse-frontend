export interface Portfolio {
  id: number;
  name: string;
  description: string;
  tickers: [];
  user_id: string;
  strategy: string;
}

export interface StockDTO {
  logo: string
  name: string;
  symbol: string;
  quantity: number;
  purchase_price: number;
  currency: string;
  portfolio_id: string;
  id: string;
  user_id: string;
}

export interface Stock {
  id: string;
  logo: string;
  name: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  portfolioId: string;
  userId: string;
}

// Get all portfolios
export async function getPortfolios(): Promise<Portfolio[]> {
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

// Get a single portfolio
export async function getPortfolio(portfolioId: string): Promise<Portfolio> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio');
  }

  return await response.json();
}

export async function createPortfolio(
  portfolioData: { 
    name: string,
    description: string, 
    ticker: [],
    user_id: string,
    strategy: string
  }
): Promise<Portfolio> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolioData),
  });

  if (!response.ok) {
    throw new Error('Failed to create portfolio');
  }

  return await response.json();
}

export async function getRelatedStocks(portfolioId: string): Promise<StockDTO[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/assets`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }
  
  const data = await response.json();
  return data as StockDTO[];
}

export const transformStockDTO = (stockDTO: StockDTO): Stock => {
  return {
    id: stockDTO.id,
    logo: stockDTO.logo,
    name: stockDTO.name,
    symbol: stockDTO.symbol,
    quantity: stockDTO.quantity,
    purchasePrice: stockDTO.purchase_price,
    portfolioId: stockDTO.portfolio_id,
    userId: stockDTO.user_id,
  };
}