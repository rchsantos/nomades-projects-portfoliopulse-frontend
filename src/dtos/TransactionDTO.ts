export interface TransactionResponseDTO {
  id: string;
  symbol: string;
  transaction_type: string;
  shares: number;
  price_per_share: number;
  currency: string;
  created_at: Date;
  portfolio_id: string;
  user_id: string | null;
  asset_id: string | null;
  fee_tax: number;
  notes: string | null;
  name: string | null;
  total_value: number;
}

export interface TransactionDTO {
  id: string;
  operation: string;
  name: string;
  symbol: string;
  createdAt: string;
  shares: number;
  pricePerShare: string;
  currency: string;
  feeTax: number;
  note: string;
  portfolio_id: string;
  totalValue: string;
}