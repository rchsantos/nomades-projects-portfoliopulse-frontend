export interface AssetDTO {
  id?: string;
  portfolioId: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currency: string;
  userId?: string;
}

export interface AssetResponseDTO {
  id: string;
  portfolioId: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currency: string;
  userId: string;
}