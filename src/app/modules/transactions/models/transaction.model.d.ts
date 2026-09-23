import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { PaymentMode } from '../enums/payment-mode.enum';
export interface Transaction {
    transactionId: string;
    reference: string | null;
    fromWalletId: string | null;
    toWalletId: string | null;
    amount: number;
    fee: number;
    transactionType: TransactionType;
    status: TransactionStatus;
    description: string | null;
    paymentMode: PaymentMode | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
    completedAt: string | null;
}
//# sourceMappingURL=transaction.model.d.ts.map