var _a, _b, _c;
import { TransactionType } from './enums/transaction-type.enum';
import { TransactionStatus } from './enums/transaction-status.enum';
import { PaymentMode } from './enums/payment-mode.enum';
export var TRANSACTION_STATUS_META = (_a = {},
    _a[TransactionStatus.PENDING] = { label: 'Pending', color: '#e0932c' },
    _a[TransactionStatus.COMPLETED] = { label: 'Completed', color: '#1fae5b' },
    _a[TransactionStatus.FAILED] = { label: 'Failed', color: '#e14b4b' },
    _a[TransactionStatus.REVERSED] = { label: 'Reversed', color: '#6f6fef' },
    _a);
export var TRANSACTION_TYPE_META = (_b = {},
    _b[TransactionType.DEPOSIT] = { label: 'Deposit', icon: '⬇️' },
    _b[TransactionType.WITHDRAWAL] = { label: 'Withdrawal', icon: '⬆️' },
    _b[TransactionType.TRANSFER] = { label: 'Transfer', icon: '🔁' },
    _b[TransactionType.PAYMENT_NFC] = { label: 'NFC payment', icon: '📶' },
    _b[TransactionType.SWEEP] = { label: 'Sweep', icon: '🧹' },
    _b[TransactionType.SWEEP_INVERSE] = { label: 'Sweep (reverse)', icon: '🧹' },
    _b[TransactionType.COMMISSION] = { label: 'Commission', icon: '💼' },
    _b[TransactionType.REIMBURSEMENT] = { label: 'Reimbursement', icon: '↩️' },
    _b);
export var PAYMENT_MODE_META = (_c = {},
    _c[PaymentMode.NFC] = { label: 'NFC' },
    _c[PaymentMode.USSD] = { label: 'USSD' },
    _c[PaymentMode.MOBILE_APP] = { label: 'Mobile app' },
    _c[PaymentMode.WEB] = { label: 'Web' },
    _c[PaymentMode.AGENT] = { label: 'Agent' },
    _c);
export var TRANSACTIONS_ROUTE_PATHS = {
    list: '',
    detail: ':id',
    export: 'export'
};
/**
 * Formats a minor-unit BIGINT amount (e.g. cents) into a display string.
 * ASSUMPTION: 2 decimal places / 100 minor units per major unit — adjust
 * if your currency uses a different minor-unit scale, and pass a real
 * currency code once one is available on the wallet/transaction.
 */
export function formatMinorAmount(amountMinorUnits, currency) {
    if (currency === void 0) { currency = ''; }
    var major = amountMinorUnits / 100;
    var formatted = major.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return currency ? "".concat(formatted, " ").concat(currency) : formatted;
}
//# sourceMappingURL=transactions.constants.js.map