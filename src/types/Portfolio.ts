import { Stock } from "./Stock";

export interface Portfolio {
  id?: string;
  name: string;
  userId: string;
  assets: Stock[];
  description?: string;
  strategy?: string;
  totalValue?: number;
  totalReturn?: number;
  currency: string;
  shares?: number;
}