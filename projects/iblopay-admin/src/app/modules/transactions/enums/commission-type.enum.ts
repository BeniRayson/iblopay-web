// ADDITION beyond the requested enums/ list — needed to type commission_transactions.commission_type.
// Mirrors the Postgres `commission_type_enum` type 1:1.
export enum CommissionType {
  AGENT_COMMISSION = "AGENT_COMMISSION",
  SUPER_AGENT_COMMISSION = "SUPER_AGENT_COMMISSION"
}
