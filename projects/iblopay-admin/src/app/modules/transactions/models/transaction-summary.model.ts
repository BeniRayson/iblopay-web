import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';

export interface TransactionSummary {
  totalCount: number;
  totalAmount: number;    // minor units
  totalFees: number;      // minor units
  countByStatus: Partial<Record<TransactionStatus, number>>;
  countByType: Partial<Record<TransactionType, number>>;
}
