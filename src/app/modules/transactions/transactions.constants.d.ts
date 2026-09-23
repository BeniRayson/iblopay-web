import { TransactionType } from './enums/transaction-type.enum';
import { TransactionStatus } from './enums/transaction-status.enum';
import { PaymentMode } from './enums/payment-mode.enum';
export interface StatusMeta {
    label: string;
    color: string;
}
export declare const TRANSACTION_STATUS_META: Record<TransactionStatus, StatusMeta>;
export declare const TRANSACTION_TYPE_META: Record<TransactionType, {
    label: string;
    icon: string;
}>;
export declare const PAYMENT_MODE_META: Record<PaymentMode, {
    label: string;
}>;
export declare const TRANSACTIONS_ROUTE_PATHS: {
    list: string;
    detail: string;
    export: string;
};
/**
 * Formats a minor-unit BIGINT amount (e.g. cents) into a display string.
 * ASSUMPTION: 2 decimal places / 100 minor units per major unit — adjust
 * if your currency uses a different minor-unit scale, and pass a real
 * currency code once one is available on the wallet/transaction.
 */
export declare function formatMinorAmount(amountMinorUnits: number, currency?: string): string;
//# sourceMappingURL=transactions.constants.d.ts.map