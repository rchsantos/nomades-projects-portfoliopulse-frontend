import moment from 'moment';
import { TransactionDTO } from '../dtos/TransactionDTO';
import { TransactionResponseDTO } from '../dtos/TransactionDTO';
import { Transaction } from '../types/Transaction';

export class TransactionMapper {

  static toTransaction(transactionResponseDTO: TransactionResponseDTO): Transaction {
    console.log('To Transaction: ', transactionResponseDTO.symbol);
    return {
      id: transactionResponseDTO.id,
      createdAt: moment(transactionResponseDTO.created_at).format('DD-MM-YYYY'),
      name: transactionResponseDTO.name ?? '',
      symbol: transactionResponseDTO.symbol,
      shares: transactionResponseDTO.shares,
      pricePerShare: transactionResponseDTO.price_per_share.toString(),
      operation: transactionResponseDTO.transaction_type,
      currency: transactionResponseDTO.currency,
      feeTax: transactionResponseDTO.fee_tax,
      note: transactionResponseDTO.notes ?? '',
      portfolioId: transactionResponseDTO.portfolio_id,
      userId: transactionResponseDTO.user_id,
      assetId: transactionResponseDTO.asset_id,
      totalValue: transactionResponseDTO.total_value.toString(),
    };
  }

  static toTransactionResponseDTO(transaction: Transaction): TransactionResponseDTO {
    return {
      total_value: parseFloat(transaction.totalValue),
      id: transaction.id,
      symbol: transaction.symbol,
      transaction_type: transaction.operation,
      shares: transaction.shares,
      price_per_share: parseFloat(transaction.pricePerShare),
      currency: transaction.currency,
      created_at: moment(transaction.createdAt).toDate(),
      portfolio_id: transaction.portfolioId,
      user_id: transaction.userId,
      asset_id: transaction.assetId,
      fee_tax: transaction.feeTax,
      notes: transaction.note,
      name: transaction.name
    };
  }

  static toTransactionDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      totalValue: transaction.totalValue,
      operation: transaction.operation,
      name: transaction.name,
      symbol: transaction.symbol,
      createdAt: transaction.createdAt,
      shares: transaction.shares,
      pricePerShare: transaction.pricePerShare,
      currency: transaction.currency,
      feeTax: transaction.feeTax,
      note: transaction.note,
      portfolio_id: transaction.portfolioId
    };
  }
  
}