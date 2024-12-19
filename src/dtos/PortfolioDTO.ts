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
  }>;
  totalValue: number;
  totalReturn: number;
  currency: string;
}