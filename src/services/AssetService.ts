import { AssetDTO, AssetResponseDTO } from '../dtos/AssetDTO';
import { AssetMapper } from '../mappers/AssetMapper';
import { Asset } from '../types/Asset';

// Get all Assets for a Portfolio
export const fetchAllAssets = async (portfolioId: string): Promise<Asset[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/portfolio/${portfolioId}/assets`, {
    method: 'GET',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('Response Asset => ', response);
  const data: AssetResponseDTO[] = await response.json();
  return data.map(AssetMapper.toAsset);
};

// Add a new Asset
export const addAsset = async (assetDTO: AssetDTO): Promise<Asset> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/assets`, {
    method: 'POST',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assetDTO),
  });

  const data: AssetResponseDTO = await response.json();
  return AssetMapper.toAsset(data);
};

// Update an existing Asset
export const updateAsset = async (assetDTO: AssetDTO): Promise<Asset> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/assets/${assetDTO.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assetDTO),
  });

  const data: AssetResponseDTO = await response.json();
  return AssetMapper.toAsset(data);
};

// Delete an Asset
export const deleteAsset = async (assetId: string): Promise<void> => {
  await fetch(`${process.env.REACT_APP_API_URL}/assets/${assetId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });
};