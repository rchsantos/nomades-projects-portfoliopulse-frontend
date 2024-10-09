import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { Portfolio } from '../types/Portfolio';

export class PortfolioMapper {
  static toPortfolio(portfolioResponseDTO: PortfolioResponseDTO): Portfolio {
    return {
      id: portfolioResponseDTO.id,
      name: portfolioResponseDTO.name,
      description: portfolioResponseDTO.description,
      userId: portfolioResponseDTO.userId,
      assets: portfolioResponseDTO.assets.map(asset => asset.id) || [],
      strategy: portfolioResponseDTO.strategy,
      totalValue: portfolioResponseDTO.totalValue || 0,
      totalReturn: portfolioResponseDTO.totalReturn || 0,
      currency: portfolioResponseDTO.currency,
    };
  }

  static toPortfolioResponseDTO(portfolio: Portfolio): PortfolioResponseDTO {
    return {
      id: portfolio.id!,
      name: portfolio.name,
      description: portfolio.description,
      userId: portfolio.userId,
      strategy: portfolio.strategy,
      assets: (portfolio.assets ?? []).map(assetId => ({
        id: assetId,
        name: '', // Provide default or actual values
        symbol: '', // Provide default or actual values
        allocation: 0, // Provide default or actual values
        purchasePrice: 0, // Provide default or actual values
        currentPrice: 0, // Provide default or actual values
        quantity: 0, // Provide default or actual values
        purchaseDate: new Date(), // Provide default or actual values
        currentValue: 0, // Provide default or actual values
        currency: '', // Provide default or actual values
        portfolioId: portfolio.id!, // Provide default or actual values
        userId: portfolio.userId, // Provide default or actual values
        logo: '' // Provide default or actual values
      })),
      totalValue: portfolio.totalValue || 0,
      totalReturn: portfolio.totalReturn || 0,
      currency: portfolio.currency,
    };
  }

  static toPortfolioDTO(portfolio: Portfolio): PortfolioDTO {
    return {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      userId: portfolio.userId,
      assets: (portfolio.assets ?? []).map(assetId => ({
        id: assetId,
        name: '', // Provide default or actual values
        symbol: '', // Provide default or actual values
        allocation: 0, // Provide default or actual values
        purchasePrice: 0, // Provide default or actual values
        currentPrice: 0, // Provide default or actual values
        quantity: 0, // Provide default or actual values
        purchaseDate: new Date(), // Provide default or actual values
        currentValue: 0, // Provide default or actual values
        currency: '', // Provide default or actual values
        portfolioId: portfolio.id!, // Provide default or actual values
        userId: portfolio.userId, // Provide default or actual values
        logo: '' // Provide default or actual values
      })),
      strategy: portfolio.strategy,
      totalValue: portfolio.totalValue || 0,
      totalReturn: portfolio.totalReturn || 0,
      currency: portfolio.currency,
    };
  }
}