import { ReportDefinition, TransactionRow, CommissionRow, ReconciliationRow, OfflineBatchRow, KpiCard, CashManagementRow, ComplianceRow, KycUserRow, ChartDataPoint } from '../models/report.models';
export declare class ReportDummyData {
    readonly reports: ReportDefinition[];
    readonly categoryLabels: Record<string, string>;
    readonly categoryColors: Record<string, string>;
    readonly agents: {
        id: string;
        name: string;
    }[];
    private rand;
    private randDate;
    private pickAgent;
    private pick;
    getAgentOptions(): {
        id: string;
        name: string;
    }[];
    getFinancialKpis(): KpiCard[];
    getFinancialChartTrend(): ChartDataPoint[];
    getFinancialByType(): ChartDataPoint[];
    getFinancialTransactions(): TransactionRow[];
    getCommissionKpis(): KpiCard[];
    getCommissionChart(): ChartDataPoint[];
    getCommissionByAgent(): ChartDataPoint[];
    getCommissionRows(): CommissionRow[];
    getTrustAccountKpis(): KpiCard[];
    getReconciliationChart(): ChartDataPoint[];
    getReconciliationRows(): ReconciliationRow[];
    getCashManagementKpis(): KpiCard[];
    getCashManagementChart(): ChartDataPoint[];
    getCashManagementRows(): CashManagementRow[];
    getOfflineKpis(): KpiCard[];
    getOfflineChart(): ChartDataPoint[];
    getOfflineByStatus(): ChartDataPoint[];
    getOfflineRows(): OfflineBatchRow[];
    getComplianceKpis(): KpiCard[];
    getComplianceChart(): ChartDataPoint[];
    getComplianceByAction(): ChartDataPoint[];
    getComplianceRows(): ComplianceRow[];
    getKycKpis(): KpiCard[];
    getKycChart(): ChartDataPoint[];
    getKycByStatus(): ChartDataPoint[];
    getKycByRole(): ChartDataPoint[];
    getKycRows(): KycUserRow[];
}
//# sourceMappingURL=report-dummy.data.d.ts.map