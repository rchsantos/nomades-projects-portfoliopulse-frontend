import axios from 'axios';

export const fetchPredictionBySymbol = async (symbol: string, period: number = 30) => {
  
  if (!symbol) {
    throw new Error('Symbol is required');
  }
  
  console.log(`#### SERVICE => Prediction Period : ${period} ####`);

  const tokenType = localStorage.getItem('tokenType');
  const accessToken = localStorage.getItem('accessToken');

  if (!tokenType || !accessToken) {
    throw new Error('Authorization token is missing');
  }
  
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/predictions/${symbol}/${period}`, {
        headers: {
          'Authorization': `${tokenType} ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch portfolio predictions');
    }

    console.log(`#### SERVICE => Prediction Response : `, response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio predictions:', error);
    throw error;
  }
  
}