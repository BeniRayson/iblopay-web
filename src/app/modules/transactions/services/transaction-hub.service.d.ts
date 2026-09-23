import { Observable } from 'rxjs';
import { KpiData, QuickAction, TransactionTableRow, TransactionDetail, TraceabilityData, TopActor, OperationTypeStats, AlertNotification, SystemActivity, UserRole, TransactionFilter } from '../models/transaction-hub.model';
export declare class TransactionHubService {
    private readonly simDelay;
    getKpiData(): Observable<KpiData>;
    getQuickActions(): Observable<QuickAction[]>;
    getTransactionsTable(page?: number, pageSize?: number): Observable<{
        items: TransactionTableRow[];
        total: number;
    }>;
    /**
     * Filter transactions by user role.
     * - regular: Mobile Money + Card transactions
     * - agent: Agent + regular user transactions
     * - super_agent: Super Agent network + Agent + regular user
     * - admin: All transactions
     */
    getTransactionsByRole(role: UserRole, page?: number, pageSize?: number): Observable<{
        items: TransactionTableRow[];
        total: number;
    }>;
    /**
     * Filter transactions by type/category
     * - all: All transactions
     * - mobile_money: Mobile Money transactions
     * - card: Carte NFC transactions
     * - agent_network: Réseau Agent transactions
     */
    getTransactionsByCategory(filter: TransactionFilter, page?: number, pageSize?: number): Observable<{
        items: TransactionTableRow[];
        total: number;
    }>;
    /**
     * Filter transactions by both role AND category
     */
    getFilteredTransactions(role: UserRole, category: TransactionFilter, page?: number, pageSize?: number): Observable<{
        items: TransactionTableRow[];
        total: number;
    }>;
    getTransactionDetail(id: string): Observable<TransactionDetail>;
    getTraceability(): Observable<TraceabilityData>;
    getTopActors(tab: 'super-agents' | 'agents' | 'clients' | 'merchants'): Observable<TopActor[]>;
    getOperationTypes(): Observable<OperationTypeStats[]>;
    getAlerts(): Observable<AlertNotification[]>;
    getSystemActivities(): Observable<SystemActivity[]>;
    getVolumeChartData(period: 'today' | '7d' | '30d' | 'custom'): Observable<{
        labels: string[];
        values: number[];
    }>;
}
//# sourceMappingURL=transaction-hub.service.d.ts.map