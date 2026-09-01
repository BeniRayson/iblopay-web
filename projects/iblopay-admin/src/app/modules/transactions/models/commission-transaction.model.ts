// ADDITION beyond the requested models/ list — maps 1:1 to the
// `commission_transactions` table. Used by transaction-detail when a
// transaction's type is COMMISSION, to show the linked commission record.
import { CommissionType } from '../enums/commission-type.enum';
import { CommissionStatus } from '../enums/commission-status.enum';

export interface CommissionTransaction {
  commissionId: string;           // commission_id
  transactionId: string;          // transaction_id
  agentId: string;                // agent_id
  amount: number;                 // amount (minor units)
  rate: number | null;            // rate (percentage, e.g. 2.50)
  commissionType: CommissionType; // commission_type
  status: CommissionStatus;       // status
  createdAt: string;              // created_at
  creditedAt: string | null;      // credited_at
}
