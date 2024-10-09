export interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currency: string;
  portfolioId: string;
  userId: string;
  allocation: number;
  logo: string;
}