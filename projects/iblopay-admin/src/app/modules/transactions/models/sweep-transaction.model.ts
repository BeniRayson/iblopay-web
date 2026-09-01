// ADDITION beyond the requested models/ list — maps 1:1 to the
// `sweep_transactions` table. Used by transaction-detail when a transaction's
// type is SWEEP or SWEEP_INVERSE, to show the linked sweep record.
import { SweepStatus } from '../enums/sweep-status.enum';

export interface SweepTransaction {
  sweepId: string;                  // sweep_id
  transactionId: string;            // transaction_id
  fromWalletId: string;             // from_wallet_id
  toWalletId: string;               // to_wallet_id
  amount: number;                   // amount (minor units)
  reason: string | null;            // reason (e.g. PAYMENT_NFC, WITHDRAWAL)
  status: SweepStatus;              // status
  parentTransactionId: string | null; // parent_transaction_id
  createdAt: string;                // created_at
  completedAt: string | null;       // completed_at
  rolledBackAt: string | null;      // rolled_back_at
}
