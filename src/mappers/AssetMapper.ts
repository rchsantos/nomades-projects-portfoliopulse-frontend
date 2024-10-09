import { AssetDTO, AssetResponseDTO } from '../dtos/AssetDTO';
import { Asset } from '../types/Asset';

export class AssetMapper {
  static toAsset(assetResponseDTO: AssetResponseDTO): Asset {
    return {
      id: assetResponseDTO.id,
      portfolioId: assetResponseDTO.portfolio_id,
      symbol: assetResponseDTO.symbol,
      name: assetResponseDTO.name,
      shares: assetResponseDTO.shares,
      purchasePrice: assetResponseDTO.purchase_price,
      currency: assetResponseDTO.currency,
      userId: assetResponseDTO.user_id,
    };
  }

  static toAssetResponseDTO(asset: Asset): AssetResponseDTO {
    return {
      id: asset.id!,
      portfolio_id: asset.portfolioId,
      symbol: asset.symbol,
      name: asset.name,
      shares: asset.shares,
      purchase_price: asset.purchasePrice,
      currency: asset.currency,
      user_id: asset.userId!,
    };
  }

  static toAssetDTO(asset: Asset): AssetDTO {
    return {
      id: asset.id,
      portfolio_id: asset.portfolioId,
      symbol: asset.symbol,
      name: asset.name,
      shares: asset.shares,
      purchase_price: asset.purchasePrice,
      currency: asset.currency,
      userId: asset.userId,
    };
  }
}