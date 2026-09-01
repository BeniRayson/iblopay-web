import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { PaymentMode } from '../enums/payment-mode.enum';

// All fields optional — an empty object means "no filtering, page 1".
export interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  paymentMode?: PaymentMode;
  walletId?: string;       // matches either from_wallet_id or to_wallet_id
  dateFrom?: string;       // ISO date, inclusive
  dateTo?: string;         // ISO date, inclusive
  minAmount?: number;
  maxAmount?: number;
  page?: number;           // 1-based
  pageSize?: number;
}
