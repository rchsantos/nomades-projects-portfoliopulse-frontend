export interface Portfolio {
  id: number;
  name: string;
  description: string;
  ticker: [];
  user_id: string;
  strategy: string;
}

export async function getPortfolios(): Promise<Portfolio[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolios');
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