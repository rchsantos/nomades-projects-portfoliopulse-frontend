export interface Transaction {
  id: string;
  date: Date;
  name: string;
  symbol: string;
  shares: number;
  price: number;
  operation: string;
  currency: string;
  fee_tax: number;
  note: string;
  portfolioId: string;
  userId: string | null;
  assetId: string | null;
}