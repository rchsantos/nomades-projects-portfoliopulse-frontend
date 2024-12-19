export interface TransactionResponseDTO {
  id: string;
  createdAt: Date;
  name: string;
  symbol: string;
  shares: number;
  pricePerShare: number;
  operation: string;
  currency: string;
  feeTax: number;
  note: string;
  portfolioId: string;
  userId: string | null;
  assetId: string | null;
  totalValue: number;
}