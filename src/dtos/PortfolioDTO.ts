import { Stock } from "../types/Stock";

export interface PortfolioDTO {
  id?: string;
  name: string;
  description?: string;
  userId: string;
  assets: Stock[];
  strategy?: string;
  totalValue?: number;
  totalReturn?: number;
  currency: string;
  shares?: number;
}

export interface PortfolioResponseDTO {
  id: string;
  name: string;
  description?: string;
  userId: string;
  strategy?: string;
  assets: Array<{
    id: string;
    symbol: string;
    name: string;
    shares: number; // Add the shares property
    purchase_price: number;
    currency: string;
    portfolio_id: string;
    user_id: string;
    logo: string;
    allocation: number; 
  }>;
  totalValue: number;
  totalReturn: number;
  currency: string;
}