import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { Portfolio } from '../types/Portfolio';

export class PortfolioMapper {
  static toPortfolio(portfolioResponseDTO: PortfolioResponseDTO): Portfolio {
    console.log('Portfolio Response DTO => ', portfolioResponseDTO);
    return {
      id: portfolioResponseDTO.id,
      name: portfolioResponseDTO.name,
      description: portfolioResponseDTO.description,
      userId: portfolioResponseDTO.userId,
      assets: (portfolioResponseDTO.assets ?? []).map(asset => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        // logo: asset.logo,
      })),
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
      assets: (portfolio.assets ?? []).map(asset => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        // logo: asset.logo,
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
      assets: (portfolio.assets ?? []).map(asset => ({
        id: asset.id,
        name: asset.name,
        symbol: asset.symbol,
        // logo: asset.logo,
      })),
      strategy: portfolio.strategy,
      totalValue: portfolio.totalValue || 0,
      totalReturn: portfolio.totalReturn || 0,
      currency: portfolio.currency,
    };
  }
}