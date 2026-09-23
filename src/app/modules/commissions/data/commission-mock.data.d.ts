import { Commission } from '../models/commission.model';
export declare const MOCK_AGENTS: {
    agentId: string;
    agentName: string;
    superAgentId: string;
    superAgentName: string;
}[];
export declare const MOCK_SUPER_AGENTS: {
    superAgentId: string;
    superAgentName: string;
}[];
export declare function generateMockCommissions(count?: number): Commission[];
export declare const MOCK_COMMISSIONS: Commission[];
export declare function computeDashboardKpis(commissions: Commission[]): {
    totalCommissions: number;
    totalPending: number;
    totalCredited: number;
    transactionCount: number;
    averageRate: number;
};
export declare function getCommissionTrendData(days: number): {
    labels: string[];
    agentValues: number[];
    superAgentValues: number[];
};
export declare function getCommissionTypeBreakdown(): {
    type: string;
    amount: number;
    count: number;
}[];
export declare function getCommissionStatusBreakdown(): {
    status: string;
    amount: number;
    count: number;
}[];
export declare function getAgentLeaderboard(): {
    agentId: string;
    agentName: string;
    totalCommissions: number;
    transactionCount: number;
    averageRate: number;
    trend: 'up' | 'down' | 'stable';
    previousPeriodTotal: number;
}[];
export declare function getSuperAgentLeaderboard(): {
    agentId: string;
    agentName: string;
    totalCommissions: number;
    transactionCount: number;
    averageRate: number;
    trend: 'up' | 'down' | 'stable';
    previousPeriodTotal: number;
}[];
export declare function getAgentHierarchy(): {
    superAgentId: string;
    superAgentName: string;
    totalCommissions: number;
    agents: {
        agentId: string;
        agentName: string;
        totalCommissions: number;
        transactionCount: number;
        commissions: Commission[];
    }[];
}[];
//# sourceMappingURL=commission-mock.data.d.ts.map