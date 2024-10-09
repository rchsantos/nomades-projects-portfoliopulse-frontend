export interface Portfolio {
  id?: string;
  name: string;
  description?: string;
  userId: string;
  assets?: Array<string>;
  strategy?: string;
  totalValue?: number;
  totalReturn?: number;
  currency: string;
}