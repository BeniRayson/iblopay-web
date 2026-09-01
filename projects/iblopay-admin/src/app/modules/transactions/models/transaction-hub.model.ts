export interface KpiCard {
  label: string;
  value: string;
  delta: string;
  deltaType: 'increase' | 'decrease' | 'neutral';
  extra?: string;
  link?: string;
  icon?: string;
  sparkline?: number[];
}

export interface KpiData {
  volumeTotal: KpiCard;
  transactionsToday: KpiCard;
  succeeded: KpiCard;
  failed: KpiCard;
  pending: KpiCard;
  depositsToValidate: KpiCard;
  trustAccountBalance: KpiCard;
  eMoneyInCirculation: KpiCard;
}

export interface QuickAction {
  label: string;
  subtitle: string;
  type: 'primary' | 'outline-green' | 'plain';
  badge?: number;
  action: string;
  icon?: string;
}

export interface TransactionTableRow {
  dateTime: string;
  transactionNo: string;
  type: string;
  typePillColor: string;
  sender: string;
  recipient: string;
  amount: string;
  fee: string;
  status: string;
  statusPillColor: string;
  channel: string;
  location: string;
  category?: 'mobile_money' | 'card' | 'agent' | 'super_agent' | 'all';
}

export interface SenderRecipientInfo {
  initials: string;
  name: string;
  phone: string;
  walletId: string;
  balanceBefore: string;
  balanceAfter: string;
  province: string;
  commune: string;
  agency: string;
}

export interface TransactionDetail {
  transactionId: string;
  status: string;
  statusColor: string;
  timestamp: string;
  typeTag: string;
  typeTagColor: string;
  amountTotal: string;
  fee: string;
  commission: string;
  netAmount: string;
  sender: SenderRecipientInfo;
  recipient: SenderRecipientInfo;
  channel: string;
  reference: string;
  ip: string;
  device: string;
  location: string;
  validatedBy: string;
  validatedByAvatar: string;
  validatedAt: string;
  attachments: string[];
}

export interface TraceabilityStep {
  icon: string;
  timestamp: string;
  description: string;
  amount: string;
  signedAmount: string;
  reference: string;
}

export interface TraceabilityData {
  steps: TraceabilityStep[];
  initialAmount: string;
  currentAmount: string;
  stepCount: number;
  totalDuration: string;
  status: string;
  statusColor: string;
}

export interface TopActor {
  rank: number;
  name: string;
  volume: number;
  volumeFormatted: string;
  barPercent: number;
}

export interface OperationTypeStats {
  type: string;
  color: string;
  count: number;
  percentage: number;
}

export interface AlertNotification {
  icon: string;
  message: string;
  link: string;
}

export interface SystemActivity {
  icon: string;
  action: string;
  actor: string;
  time: string;
}

export type UserRole = 'regular' | 'agent' | 'super_agent' | 'admin';
export type TransactionFilter = 'all' | 'mobile_money' | 'card' | 'agent_network';