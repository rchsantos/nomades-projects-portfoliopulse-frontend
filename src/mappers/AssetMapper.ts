import { AssetDTO, AssetResponseDTO } from '../dtos/AssetDTO';
import { Asset } from '../types/Asset';

export class AssetMapper {
  static toAsset(assetResponseDTO: AssetResponseDTO): Asset {
    return {
      id: assetResponseDTO.id,
      symbol: assetResponseDTO.symbol,
      name: assetResponseDTO.name,
    };
  }

  static toAssetResponseDTO(asset: Asset): AssetResponseDTO {
    return {
      id: asset.id!,
      symbol: asset.symbol,
      name: asset.name,
    };
  }

  static toAssetDTO(asset: Asset): AssetDTO {
    return {
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name
    };
  }
}