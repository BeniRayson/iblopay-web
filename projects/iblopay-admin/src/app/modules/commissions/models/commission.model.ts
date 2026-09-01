export type CommissionType = 'AGENT_COMMISSION' | 'SUPER_AGENT_COMMISSION';
export type CommissionStatus = 'PENDING' | 'CREDITED' | 'FAILED';
export type ViewRole = 'agent' | 'super_agent' | 'admin';
export type PeriodFilter = '7d' | '30d' | '90d' | 'custom';

export interface Commission {
  commissionId: string;
  transactionId: string;
  transactionReference: string;
  agentId: string;
  agentName: string;
  superAgentId: string;
  superAgentName: string;
  amount: number;
  rate: number;
  commissionType: CommissionType;
  status: CommissionStatus;
  sourceType: string;
  paymentMode: string;
  createdAt: string;
  creditedAt: string | null;
}

export interface CommissionDashboardKpi {
  totalCommissions: number;
  totalPending: number;
  totalCredited: number;
  transactionCount: number;
  averageRate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface CommissionFilter {
  dateFrom: string | null;
  dateTo: string | null;
  agentId: string | null;
  superAgentId: string | null;
  status: CommissionStatus | null;
  commissionType: CommissionType | null;
  search: string;
}

export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LeaderboardEntry {
  rank: number;
  agentId: string;
  agentName: string;
  totalCommissions: number;
  transactionCount: number;
  averageRate: number;
  trend: 'up' | 'down' | 'stable';
  previousPeriodTotal: number;
}

export interface AgentHierarchy {
  superAgentId: string;
  superAgentName: string;
  totalCommissions: number;
  agents: AgentCommissionSummary[];
}

export interface AgentCommissionSummary {
  agentId: string;
  agentName: string;
  totalCommissions: number;
  transactionCount: number;
  commissions: Commission[];
}

export interface KpiCardData {
  label: string;
  value: string;
  delta: string;
  deltaType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}