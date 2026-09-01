// Mirrors the Postgres `transaction_type_enum` type 1:1.
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT_NFC = 'PAYMENT_NFC',
  SWEEP = 'SWEEP',
  SWEEP_INVERSE = 'SWEEP_INVERSE',
  COMMISSION = 'COMMISSION',
  REIMBURSEMENT = 'REIMBURSEMENT'
}
