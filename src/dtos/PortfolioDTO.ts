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
}

export interface PortfolioResponseDTO {
  id: string;
  name: string;
  description?: string;
  userId: string;
  assets: Stock[];
  strategy?: string;
  totalValue?: number;
  totalReturn?: number;
  currency: string;
}