import { Commission, CommissionType, CommissionStatus } from '../models/commission.model';

export const MOCK_AGENTS = [
  { agentId: 'AGT-001', agentName: 'Jean-Pierre Hakizimana', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
  { agentId: 'AGT-002', agentName: 'Marie-Claire Ndayishimiye', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
  { agentId: 'AGT-003', agentName: 'Pierre Ciza', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
  { agentId: 'AGT-004', agentName: 'Anastasie Habimana', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
  { agentId: 'AGT-005', agentName: 'David Mbonimpa', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
  { agentId: 'AGT-006', agentName: 'Jacqueline Ntakirutimana', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
  { agentId: 'AGT-007', agentName: 'Christophe Bigirimana', superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
  { agentId: 'AGT-008', agentName: 'Béatrice Kamwenubusa', superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
  { agentId: 'AGT-009', agentName: 'Gérard Manirakiza', superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
  { agentId: 'AGT-010', agentName: 'Odette Sindayigaya', superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
  { agentId: 'AGT-011', agentName: 'Fabien Ndikumana', superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
  { agentId: 'AGT-012', agentName: 'Patricia Nyabenda', superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
];

export const MOCK_SUPER_AGENTS = [
  { superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
  { superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
  { superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
  { superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
  { superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
];

const sourceTypes = ['DEPOSIT', 'WITHDRAWAL', 'PAYMENT_NFC', 'TRANSFER'];
const paymentModes = ['AGENT', 'USSD', 'MOBILE_APP', 'NFC'];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx] as T;
}

function generateTransactionRef(index: number): string {
  const prefixes = ['TXN', 'PAY', 'DEP', 'WTH'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `${prefix}-${String(2024000 + index).padStart(7, '0')}`;
}

function formatDate(date: Date): string {
  return date.toISOString();
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(randomInt(8, 20), randomInt(0, 59), randomInt(0, 59));
  return d;
}

export function generateMockCommissions(count: number = 200): Commission[] {
  const commissions: Commission[] = [];

  for (let i = 0; i < count; i++) {
    const agent = randomItem(MOCK_AGENTS);
    const sourceType = randomItem(sourceTypes);
    const paymentMode = randomItem(paymentModes);
    const amount = randomInt(5000, 500000);
    const rate = parseFloat((Math.random() * 1.5 + 0.25).toFixed(2));
    const commissionType: CommissionType = Math.random() > 0.6 ? 'SUPER_AGENT_COMMISSION' : 'AGENT_COMMISSION';
    const statusRand = Math.random();
    const status: CommissionStatus = statusRand > 0.9 ? 'FAILED' : statusRand > 0.3 ? 'CREDITED' : 'PENDING';

    const createdDate = daysAgo(randomInt(0, 90));
    const creditedDate = status === 'CREDITED' ? new Date(createdDate.getTime() + randomInt(1, 5) * 86400000) : null;

    commissions.push({
      commissionId: `COM-${String(i + 1).padStart(4, '0')}`,
      transactionId: `TXN-ID-${String(1000 + i)}`,
      transactionReference: generateTransactionRef(i),
      agentId: agent.agentId,
      agentName: agent.agentName,
      superAgentId: agent.superAgentId,
      superAgentName: agent.superAgentName,
      amount,
      rate,
      commissionType,
      status,
      sourceType,
      paymentMode,
      createdAt: formatDate(createdDate),
      creditedAt: creditedDate ? formatDate(creditedDate) : null,
    });
  }

  // Sort by createdAt descending
  return commissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const MOCK_COMMISSIONS = generateMockCommissions(200);

// Pre-computed dashboard KPIs
export function computeDashboardKpis(commissions: Commission[]) {
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
  const totalPending = commissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0);
  const totalCredited = commissions.filter(c => c.status === 'CREDITED').reduce((sum, c) => sum + c.amount, 0);
  const transactionCount = commissions.length;
  const averageRate = commissions.length > 0
    ? commissions.reduce((sum, c) => sum + c.rate, 0) / commissions.length
    : 0;

  return { totalCommissions, totalPending, totalCredited, transactionCount, averageRate };
}

// Pre-compute data for charts
export function getCommissionTrendData(days: number): { labels: string[]; agentValues: number[]; superAgentValues: number[] } {
  const now = new Date();
  const labels: string[] = [];
  const agentValues: number[] = [];
  const superAgentValues: number[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    labels.push(label);

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayCommissions = MOCK_COMMISSIONS.filter(c => {
      const d = new Date(c.createdAt);
      return d >= dayStart && d <= dayEnd;
    });

    agentValues.push(dayCommissions.filter(c => c.commissionType === 'AGENT_COMMISSION').reduce((s, c) => s + c.amount, 0));
    superAgentValues.push(dayCommissions.filter(c => c.commissionType === 'SUPER_AGENT_COMMISSION').reduce((s, c) => s + c.amount, 0));
  }

  return { labels, agentValues, superAgentValues };
}

export function getCommissionTypeBreakdown(): { type: string; amount: number; count: number }[] {
  const agentComms = MOCK_COMMISSIONS.filter(c => c.commissionType === 'AGENT_COMMISSION');
  const superAgentComms = MOCK_COMMISSIONS.filter(c => c.commissionType === 'SUPER_AGENT_COMMISSION');

  return [
    { type: 'AGENT_COMMISSION', amount: agentComms.reduce((s, c) => s + c.amount, 0), count: agentComms.length },
    { type: 'SUPER_AGENT_COMMISSION', amount: superAgentComms.reduce((s, c) => s + c.amount, 0), count: superAgentComms.length },
  ];
}

export function getCommissionStatusBreakdown(): { status: string; amount: number; count: number }[] {
  const statuses: CommissionStatus[] = ['PENDING', 'CREDITED', 'FAILED'];
  return statuses.map(s => {
    const filtered = MOCK_COMMISSIONS.filter(c => c.status === s);
    return { status: s, amount: filtered.reduce((sum, c) => sum + c.amount, 0), count: filtered.length };
  });
}

// Generate leaderboard data
export function getAgentLeaderboard(): { agentId: string; agentName: string; totalCommissions: number; transactionCount: number; averageRate: number; trend: 'up' | 'down' | 'stable'; previousPeriodTotal: number }[] {
  const now = new Date();
  const currentPeriodStart = new Date(now);
  currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
  const previousPeriodStart = new Date(currentPeriodStart);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);

  const agentMap = new Map<string, { currentTotal: number; prevTotal: number; count: number; totalRate: number }>();

  for (const c of MOCK_COMMISSIONS) {
    const createdDate = new Date(c.createdAt);
    if (!agentMap.has(c.agentId)) {
      agentMap.set(c.agentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
    }
    const entry = agentMap.get(c.agentId)!;
    entry.count++;
    entry.totalRate += c.rate;

    if (createdDate >= currentPeriodStart) {
      entry.currentTotal += c.amount;
    } else if (createdDate >= previousPeriodStart) {
      entry.prevTotal += c.amount;
    }
  }

  return Array.from(agentMap.entries())
    .map(([agentId, data]) => {
      const agent = MOCK_AGENTS.find(a => a.agentId === agentId);
      const trend: 'up' | 'down' | 'stable' = data.currentTotal > data.prevTotal ? 'up' : data.currentTotal < data.prevTotal ? 'down' : 'stable';
      return {
        agentId,
        agentName: agent?.agentName || agentId,
        totalCommissions: data.currentTotal,
        transactionCount: data.count,
        averageRate: data.count > 0 ? parseFloat((data.totalRate / data.count).toFixed(2)) : 0,
        trend,
        previousPeriodTotal: data.prevTotal,
      };
    })
    .sort((a, b) => b.totalCommissions - a.totalCommissions);
}

export function getSuperAgentLeaderboard(): { agentId: string; agentName: string; totalCommissions: number; transactionCount: number; averageRate: number; trend: 'up' | 'down' | 'stable'; previousPeriodTotal: number }[] {
  const now = new Date();
  const currentPeriodStart = new Date(now);
  currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
  const previousPeriodStart = new Date(currentPeriodStart);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);

  const saMap = new Map<string, { currentTotal: number; prevTotal: number; count: number; totalRate: number }>();

  for (const c of MOCK_COMMISSIONS) {
    // Only count SUPER_AGENT_COMMISSION for super agent leaderboard
    if (c.commissionType !== 'SUPER_AGENT_COMMISSION') continue;
    const createdDate = new Date(c.createdAt);
    if (!saMap.has(c.superAgentId)) {
      saMap.set(c.superAgentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
    }
    const entry = saMap.get(c.superAgentId)!;
    entry.count++;
    entry.totalRate += c.rate;

    if (createdDate >= currentPeriodStart) {
      entry.currentTotal += c.amount;
    } else if (createdDate >= previousPeriodStart) {
      entry.prevTotal += c.amount;
    }
  }

  // If no super agent commissions exist, create entries from agent data
  if (saMap.size === 0) {
    for (const c of MOCK_COMMISSIONS) {
      if (!saMap.has(c.superAgentId)) {
        saMap.set(c.superAgentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
      }
      const entry = saMap.get(c.superAgentId)!;
      entry.count++;
      entry.totalRate += c.rate;
      const createdDate = new Date(c.createdAt);
      if (createdDate >= currentPeriodStart) {
        entry.currentTotal += c.amount;
      } else if (createdDate >= previousPeriodStart) {
        entry.prevTotal += c.amount;
      }
    }
  }

  return Array.from(saMap.entries())
    .map(([superAgentId, data]) => {
      const sa = MOCK_SUPER_AGENTS.find(a => a.superAgentId === superAgentId);
      const trend: 'up' | 'down' | 'stable' = data.currentTotal > data.prevTotal ? 'up' : data.currentTotal < data.prevTotal ? 'down' : 'stable';
      return {
        agentId: superAgentId,
        agentName: sa?.superAgentName || superAgentId,
        totalCommissions: data.currentTotal,
        transactionCount: data.count,
        averageRate: data.count > 0 ? parseFloat((data.totalRate / data.count).toFixed(2)) : 0,
        trend,
        previousPeriodTotal: data.prevTotal,
      };
    })
    .sort((a, b) => b.totalCommissions - a.totalCommissions);
}

// Get hierarchy data
export function getAgentHierarchy(): {
  superAgentId: string;
  superAgentName: string;
  totalCommissions: number;
  agents: { agentId: string; agentName: string; totalCommissions: number; transactionCount: number; commissions: Commission[] }[];
}[] {
  return MOCK_SUPER_AGENTS.map(sa => {
    const agents = MOCK_AGENTS.filter(a => a.superAgentId === sa.superAgentId);
    const agentSummaries = agents.map(agent => {
      const commissions = MOCK_COMMISSIONS.filter(c => c.agentId === agent.agentId);
      return {
        agentId: agent.agentId,
        agentName: agent.agentName,
        totalCommissions: commissions.reduce((s, c) => s + c.amount, 0),
        transactionCount: commissions.length,
        commissions,
      };
    });

    const totalCommissions = agentSummaries.reduce((s, a) => s + a.totalCommissions, 0);

    return {
      superAgentId: sa.superAgentId,
      superAgentName: sa.superAgentName,
      totalCommissions,
      agents: agentSummaries,
    };
  });
}