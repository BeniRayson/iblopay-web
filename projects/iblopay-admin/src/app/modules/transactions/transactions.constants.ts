import { TransactionType } from './enums/transaction-type.enum';
import { TransactionStatus } from './enums/transaction-status.enum';
import { PaymentMode } from './enums/payment-mode.enum';

export interface StatusMeta {
  label: string;
  color: string;
}

export const TRANSACTION_STATUS_META: Record<TransactionStatus, StatusMeta> = {
  [TransactionStatus.PENDING]: { label: 'Pending', color: '#e0932c' },
  [TransactionStatus.COMPLETED]: { label: 'Completed', color: '#1fae5b' },
  [TransactionStatus.FAILED]: { label: 'Failed', color: '#e14b4b' },
  [TransactionStatus.REVERSED]: { label: 'Reversed', color: '#6f6fef' }
};

export const TRANSACTION_TYPE_META: Record<TransactionType, { label: string; icon: string }> = {
  [TransactionType.DEPOSIT]: { label: 'Deposit', icon: '⬇️' },
  [TransactionType.WITHDRAWAL]: { label: 'Withdrawal', icon: '⬆️' },
  [TransactionType.TRANSFER]: { label: 'Transfer', icon: '🔁' },
  [TransactionType.PAYMENT_NFC]: { label: 'NFC payment', icon: '📶' },
  [TransactionType.SWEEP]: { label: 'Sweep', icon: '🧹' },
  [TransactionType.SWEEP_INVERSE]: { label: 'Sweep (reverse)', icon: '🧹' },
  [TransactionType.COMMISSION]: { label: 'Commission', icon: '💼' },
  [TransactionType.REIMBURSEMENT]: { label: 'Reimbursement', icon: '↩️' }
};

export const PAYMENT_MODE_META: Record<PaymentMode, { label: string }> = {
  [PaymentMode.NFC]: { label: 'NFC' },
  [PaymentMode.USSD]: { label: 'USSD' },
  [PaymentMode.MOBILE_APP]: { label: 'Mobile app' },
  [PaymentMode.WEB]: { label: 'Web' },
  [PaymentMode.AGENT]: { label: 'Agent' }
};

export const TRANSACTIONS_ROUTE_PATHS = {
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
export function formatMinorAmount(amountMinorUnits: number, currency = ''): string {
  const major = amountMinorUnits / 100;
  const formatted = major.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return currency ? `${formatted} ${currency}` : formatted;
}
