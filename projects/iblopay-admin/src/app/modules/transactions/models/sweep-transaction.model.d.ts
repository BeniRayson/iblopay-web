import { SweepStatus } from '../enums/sweep-status.enum';
export interface SweepTransaction {
    sweepId: string;
    transactionId: string;
    fromWalletId: string;
    toWalletId: string;
    amount: number;
    reason: string | null;
    status: SweepStatus;
    parentTransactionId: string | null;
    createdAt: string;
    completedAt: string | null;
    rolledBackAt: string | null;
}
//# sourceMappingURL=sweep-transaction.model.d.ts.map