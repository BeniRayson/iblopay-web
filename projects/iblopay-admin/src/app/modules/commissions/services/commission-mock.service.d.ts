import { Observable } from 'rxjs';
import { Commission, CommissionFilter, SortConfig, PaginatedResult, LeaderboardEntry, AgentHierarchy, KpiCardData, ViewRole } from '../models/commission.model';
export declare class CommissionMockService {
    private readonly simDelay;
    getAllCommissions(): Observable<Commission[]>;
    getCommissionById(id: string): Observable<Commission | undefined>;
    getFilteredCommissions(filter: CommissionFilter, sort: SortConfig, page: number, pageSize: number): Observable<PaginatedResult<Commission>>;
    getDashboardKpis(viewRole: ViewRole): Observable<KpiCardData[]>;
    getCommissionTrend(days: number): Observable<{
        labels: string[];
        agentValues: number[];
        superAgentValues: number[];
    }>;
    getTypeBreakdown(): Observable<{
        type: string;
        amount: number;
        count: number;
    }[]>;
    getStatusBreakdown(): Observable<{
        status: string;
        amount: number;
        count: number;
    }[]>;
    getAgentLeaderboard(): Observable<LeaderboardEntry[]>;
    getSuperAgentLeaderboard(): Observable<LeaderboardEntry[]>;
    getAgentHierarchy(): Observable<AgentHierarchy[]>;
    getAgents(): Observable<{
        agentId: string;
        agentName: string;
    }[]>;
    getSuperAgents(): Observable<{
        superAgentId: string;
        superAgentName: string;
    }[]>;
    getChartData(days: number): Observable<{
        labels: string[];
        agentValues: number[];
        superAgentValues: number[];
    }>;
    private formatBif;
}
//# sourceMappingURL=commission-mock.service.d.ts.map