export interface Asset {
  id?: string;
  portfolioId: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currency: string;
  userId?: string;
}