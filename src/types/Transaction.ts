export interface Transaction {
  id: string;
  createdAt: string;
  name: string;
  symbol: string;
  shares: number;
  pricePerShare: string;
  operation: string;
  currency: string;
  feeTax: number;
  note: string;
  portfolioId: string;
  userId: string | null;
  assetId: string | null;
  totalValue: string;
}