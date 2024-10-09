export interface TransactionResponseDTO {
  id: string;
  symbol: string;
  operation: string;
  shares: number;
  price: number;
  currency: string;
  date: Date;
  portfolio_id: string;
  user_id: string | null;
  asset_id: string | null;
  fee_tax: number;
  notes: string | null;
  name: string | null;
}

export interface TransactionDTO {
  operation: string;
  name: string;
  symbol: string;
  date: string;
  shares: number;
  price: number;
  currency: string;
  fee_tax: number;
  note: string;
  portfolio_id: string;
}