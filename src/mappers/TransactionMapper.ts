import moment from 'moment';
import { TransactionDTO } from '../dtos/TransactionDTO';
import { TransactionResponseDTO } from '../dtos/TransactionDTO';
import { Transaction } from '../types/Transaction';

export class TransactionMapper {
  static toTransaction(transactionResponseDTO: TransactionResponseDTO): Transaction {
    return {
      id: transactionResponseDTO.id,
      date: moment(transactionResponseDTO.date, 'DD-MM-YYYY').toDate(),
      name: transactionResponseDTO.name ?? '',
      symbol: transactionResponseDTO.symbol,
      shares: transactionResponseDTO.shares,
      price: transactionResponseDTO.price,
      operation: transactionResponseDTO.operation,
      currency: transactionResponseDTO.currency,
      fee_tax: transactionResponseDTO.fee_tax,
      note: transactionResponseDTO.notes ?? '',
      portfolioId: transactionResponseDTO.portfolio_id,
      userId: transactionResponseDTO.user_id,
      assetId: transactionResponseDTO.asset_id,
    };
  }

  static toTransactionResponseDTO(transaction: Transaction): TransactionResponseDTO {
    return {
      id: transaction.id,
      symbol: transaction.symbol,
      operation: transaction.operation,
      shares: transaction.shares,
      price: transaction.price,
      currency: transaction.currency,
      date: moment(transaction.date, 'DD-MM-YYYY').toDate(),
      portfolio_id: transaction.portfolioId,
      user_id: transaction.userId,
      asset_id: transaction.assetId,
      fee_tax: transaction.fee_tax,
      notes: transaction.note, 
      name: transaction.name,
    };
  }

  static toTransactionDTO(transaction: Transaction): TransactionDTO {
    return {
      operation: transaction.operation,
      name: transaction.name,
      symbol: transaction.symbol,
      date: moment(transaction.date, 'DD-MM-YYYY').toDate().toDateString(),
      shares: transaction.shares,
      price: transaction.price,
      currency: transaction.currency,
      fee_tax: transaction.fee_tax,
      note: transaction.note,
      portfolio_id: transaction.portfolioId,
    };
  }
}