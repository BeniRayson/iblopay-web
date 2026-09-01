export interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  icon: string;
  roles: ('admin' | 'agent' | 'super_agent')[];
  route: string;
}

export type ReportCategory =
  | 'financial'
  | 'commissions'
  | 'trust_account'
  | 'cash_management'
  | 'offline_pos'
  | 'compliance_audit'
  | 'kyc_users';

export interface TransactionRow {
  reference: string;
  date: Date;
  type: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  fee: number;
  status: string;
  paymentMode: string;
}

export interface CommissionRow {
  agentName: string;
  agentId: string;
  transactionRef: string;
  date: Date;
  amount: number;
  rate: number;
  commissionType: string;
  status: string;
}

export interface ReconciliationRow {
  date: Date;
  totalEmoney: number;
  trustAccountBalance: number;
  difference: number;
  status: string;
}

export interface CashManagementRow {
  agentName: string;
  agentId: string;
  declaredAmount: number;
  expectedAmount: number;
  difference: number;
  status: string;
  date: Date;
}

export interface OfflineBatchRow {
  batchId: string;
  posTerminalId: string;
  transactionCount: number;
  totalAmount: number;
  status: string;
  receivedAt: Date;
}

export interface ComplianceRow {
  user: string;
  actionType: string;
  targetId: string;
  details: string;
  ipAddress: string;
  createdAt: Date;
}

export interface KycUserRow {
  userId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  role: string;
  registeredAt: Date;
  kycCompleted: boolean;
}

export interface AuditLogRow {
  user: string;
  actionType: string;
  targetId: string;
  details: string;
  ipAddress: string;
  createdAt: Date;
}

export interface CashDeclarationRow {
  agentName: string;
  agentId: string;
  declaredAmount: number;
  expectedAmount: number;
  difference: number;
  status: string;
  date: Date;
}

export interface KpiCard {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}