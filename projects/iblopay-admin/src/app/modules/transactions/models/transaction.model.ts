import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { PaymentMode } from '../enums/payment-mode.enum';

// Maps 1:1 to the `transactions` table columns (camelCased).
//
// NOTE on amount/fee: these are BIGINT in Postgres (minor currency units,
// e.g. cents). If your API serializes them as raw JSON numbers and values
// can exceed Number.MAX_SAFE_INTEGER (~9e15), switch these to `string` and
// parse with a bignum-safe library instead of trusting JS number precision.
export interface Transaction {
  transactionId: string;                 // transaction_id
  reference: string | null;              // reference
  fromWalletId: string | null;           // from_wallet_id
  toWalletId: string | null;             // to_wallet_id
  amount: number;                        // amount (minor units)
  fee: number;                           // fee (minor units)
  transactionType: TransactionType;      // transaction_type
  status: TransactionStatus;             // status
  description: string | null;            // description
  paymentMode: PaymentMode | null;       // payment_mode
  metadata: Record<string, unknown> | null; // metadata
  createdAt: string;                     // created_at
  completedAt: string | null;            // completed_at
}
