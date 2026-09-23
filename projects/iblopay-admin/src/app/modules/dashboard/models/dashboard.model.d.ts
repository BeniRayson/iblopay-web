export interface DashboardStats {
    totalAgents: number;
    totalTransactions: number;
    totalCards: number;
    totalRevenue: number;
    activeAgents: number;
    pendingTransactions: number;
    activeCards: number;
    monthlyGrowth: number;
}
export interface Activity {
    id: string;
    type: 'success' | 'info' | 'warning' | 'danger';
    message: string;
    date: Date;
}
export interface Transaction {
    id: string;
    agent: string;
    amount: number;
    type: 'paiement' | 'recharge' | 'retrait' | 'transfert';
    status: 'success' | 'pending' | 'failed';
    date: Date;
}
export interface AgentsStatus {
    online: number;
    offline: number;
    busy: number;
}
//# sourceMappingURL=dashboard.model.d.ts.map