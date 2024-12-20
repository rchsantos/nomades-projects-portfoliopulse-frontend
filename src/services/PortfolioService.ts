import axios from 'axios';
// import yahooFinance from 'yahoo-finance2';

import { TransactionDTO, TransactionResponseDTO } from '../dtos/TransactionDTO';
import { TransactionMapper } from '../mappers/TransactionMapper';
import { Transaction } from '../types/Transaction';
import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { PortfolioMapper } from '../mappers/PortfolioMapper';
import { Portfolio } from '../types/Portfolio';
// import { TotalValueResponse } from '../types/TotalValueResponse';

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
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/portfolio`, portfolioDTO, {
      headers: {
        'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('Failed to add portfolio');
    }

    return response.data;
  } catch (error) {
    console.error('Error adding portfolio:', error);
    throw error;
  }
  // const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(portfolioDTO),
  // });
  //
  // const data: PortfolioResponseDTO = await response.json();
  // return PortfolioMapper.toPortfolio(data);
};

// Update an existing Portfolio
export const updatePortfolio = async (portfolioDTO: PortfolioDTO): Promise<Portfolio> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioDTO.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
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
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
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

export const fetchPortfolioAnlysis = async (portfolioId: string): Promise<any> => {
  
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/analysis`, {
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch portfolio analysis');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio analysis:', error);
    throw error;
  }
  
}

export const fetchTransactions = async (portfolioId: string): Promise<Transaction[]> => {
  
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

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

    // Fetch the symbol for each transaction if not present
    return await Promise.all(transactionResponseDTOs.map(async (transaction) => {
      if (!transaction.symbol && transaction.asset_id) {
        const assetResponse = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/assets/${transaction.asset_id}`, {
          headers: {
            'Authorization': `${tokenType} ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        transaction.symbol = assetResponse.data.symbol;
      }
      return TransactionMapper.toTransaction(transaction);
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error); // @TODO: Remove this log
    throw error;
  }
};

export const addTransaction = async (portfolio_id: string, transactionDTO: TransactionDTO): Promise<Transaction> => {
  
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

// export const fetchTotalValues = async (portfolioId: string): Promise<TotalValueResponse> => {
//   if (!portfolioId) {
//     throw new Error('Portfolio ID is required');
//   }
//
//   const tokenType = localStorage.getItem('tokenType');
//   const accessToken = localStorage.getItem('accessToken');
//
//   if (!tokenType || !accessToken) {
//     throw new Error('Authorization token is missing');
//   }
//
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/total-value`, {
//       headers: {
//         'Authorization': `${tokenType} ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (response.status !== 200) {
//       throw new Error('Failed to fetch total values');
//     }
//
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching total values:', error);
//     throw error;
//   }
// };

// export const fetchPortfolioPredictions = async (portfolioId: string): Promise<any> => {
//   if (!portfolioId) {
//     throw new Error('Portfolio ID is required');
//   }
//
//   const tokenType = localStorage.getItem('tokenType');
//   const accessToken = localStorage.getItem('accessToken');
//
//   if (!tokenType || !accessToken) {
//     throw new Error('Authorization token is missing');
//   }
//
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/lstm-predictions`, {
//       headers: {
//         'Authorization': `${tokenType} ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (response.status !== 200) {
//       throw new Error('Failed to fetch portfolio predictions');
//     }
//
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching portfolio predictions:', error);
//     throw error;
//   }
// }


export const updateTransaction = async (transaction: TransactionDTO): Promise<TransactionResponseDTO> => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/transactions/${transaction.id}`, transaction);
  return response.data;
};

export const comparePortfolioToBenchmark = async (portfolioId: string, benchmarkId: string): Promise<any> => {
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}//compare`, {
      method: 'POST',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error comparing portfolio to benchmark:', error);
    throw error;
  }
}

export const fetchPortfolioVsMarketData = async (portfolioId: string, benchmark: string, interval: string): Promise<any> => {
  if (!portfolioId) {
    throw new Error('Portfolio ID is required');
  }

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/compare`, {
      params: { benchmark, interval },
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch Portfolio vs Market data');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching Portfolio vs Market data:', error);
    throw error;
  }
}

export const fetchBacktestData = async (initialAmount: number, years: number, indices: string[]): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/backtest`, {
      params: {
        initial_amount: initialAmount,
        years: years,
        indices: indices,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching backtest data:', error);
    throw error;
  }
}