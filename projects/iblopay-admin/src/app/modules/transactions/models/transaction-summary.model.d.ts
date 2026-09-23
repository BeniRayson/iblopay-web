import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
export interface TransactionSummary {
    totalCount: number;
    totalAmount: number;
    totalFees: number;
    countByStatus: Partial<Record<TransactionStatus, number>>;
    countByType: Partial<Record<TransactionType, number>>;
}
//# sourceMappingURL=transaction-summary.model.d.ts.map