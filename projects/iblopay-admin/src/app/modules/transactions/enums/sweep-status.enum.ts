// ADDITION beyond the requested enums/ list — needed to type sweep_transactions.status.
// Mirrors the Postgres `sweep_status_enum` type 1:1.
export enum SweepStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  ROLLED_BACK = "ROLLED_BACK"
}
