import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { PaymentMode } from '../enums/payment-mode.enum';
export interface TransactionFilter {
    type?: TransactionType;
    status?: TransactionStatus;
    paymentMode?: PaymentMode;
    walletId?: string;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    pageSize?: number;
}
//# sourceMappingURL=transaction-filter.model.d.ts.map