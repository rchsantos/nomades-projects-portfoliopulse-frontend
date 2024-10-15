import { PortfolioDTO, PortfolioResponseDTO } from '../dtos/PortfolioDTO';
import { Portfolio } from '../types/Portfolio';

export class PortfolioMapper {
  static toPortfolio(portfolioResponseDTO: PortfolioResponseDTO): Portfolio {
    return {
      id: portfolioResponseDTO.id,
      name: portfolioResponseDTO.name,
      description: portfolioResponseDTO.description,
      userId: portfolioResponseDTO.userId,
      assets: (portfolioResponseDTO.assets ?? []).map(asset => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        shares: asset.shares, // Ensure shares is mapped
        purchasePrice: asset.purchase_price,
        currency: asset.currency,
        portfolioId: asset.portfolio_id,
        userId: asset.user_id,
        allocation: asset.allocation, // Ensure allocation is mapped
        logo: asset.logo,
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
        shares: asset.shares, // Ensure shares is mapped
        purchase_price: asset.purchasePrice,
        currency: asset.currency,
        portfolio_id: asset.portfolioId,
        user_id: asset.userId,
        allocation: asset.allocation, // Ensure allocation is mapped
        logo: asset.logo,
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
        shares: asset.shares, // Ensure shares is mapped
        purchasePrice: asset.purchasePrice,
        currency: asset.currency,
        portfolioId: asset.portfolioId,
        userId: asset.userId,
        allocation: asset.allocation, // Ensure allocation is mapped
        logo: asset.logo,
      })),
      strategy: portfolio.strategy,
      totalValue: portfolio.totalValue || 0,
      totalReturn: portfolio.totalReturn || 0,
      currency: portfolio.currency,
    };
  }
}