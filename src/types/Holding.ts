import { Asset } from "./Asset";

export interface Holding {
  asset: Asset;
  quantity: number;
  current_value: number;
  weight: number;
}