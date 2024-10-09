import { AssetDTO, AssetResponseDTO } from '../dtos/AssetDTO';
import { Asset } from '../types/Asset';

export class AssetMapper {
  static toAsset(assetResponseDTO: AssetResponseDTO): Asset {
    return {
      id: assetResponseDTO.id,
      portfolioId: assetResponseDTO.portfolioId,
      symbol: assetResponseDTO.symbol,
      name: assetResponseDTO.name,
      shares: assetResponseDTO.shares,
      purchasePrice: assetResponseDTO.purchasePrice,
      currency: assetResponseDTO.currency,
      userId: assetResponseDTO.userId,
    };
  }

  static toAssetResponseDTO(asset: Asset): AssetResponseDTO {
    return {
      id: asset.id!,
      portfolioId: asset.portfolioId,
      symbol: asset.symbol,
      name: asset.name,
      shares: asset.shares,
      purchasePrice: asset.purchasePrice,
      currency: asset.currency,
      userId: asset.userId!,
    };
  }

  static toAssetDTO(asset: Asset): AssetDTO {
    return {
      id: asset.id,
      portfolioId: asset.portfolioId,
      symbol: asset.symbol,
      name: asset.name,
      shares: asset.shares,
      purchasePrice: asset.purchasePrice,
      currency: asset.currency,
      userId: asset.userId,
    };
  }
}