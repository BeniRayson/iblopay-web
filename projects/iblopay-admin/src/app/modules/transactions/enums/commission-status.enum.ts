// ADDITION beyond the requested enums/ list — needed to type commission_transactions.status.
// Mirrors the Postgres `commission_status_enum` type 1:1.
export enum CommissionStatus {
  PENDING = "PENDING",
  CREDITED = "CREDITED",
  FAILED = "FAILED"
}
