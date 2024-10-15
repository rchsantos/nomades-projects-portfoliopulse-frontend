export interface AssetDTO {
  id?: string;
  portfolio_id: string;
  symbol: string;
  name: string;
  shares: number;
  purchase_price: number;
  currency: string;
  userId?: string;
  allocation?: number; 
}

export interface AssetResponseDTO {
  id: string;
  portfolio_id: string;
  symbol: string;
  name: string;
  shares: number;
  purchase_price: number;
  currency: string;
  user_id: string;
}