import { OnInit } from '@angular/core';
interface ReportData {
    id: string;
    date: string;
    service: string;
    category: string;
    amount: number;
    status: 'collecte' | 'transfert' | 'valide';
    paymentMethod: string;
    clientName: string;
}
interface KpiData {
    icon: string;
    label: string;
    value: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
    color: string;
}
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor?: string;
    }[];
}
interface ReportFilter {
    period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
    dateStart: string;
    dateEnd: string;
    category: string;
    service: string;
    status: string;
}
interface SettingsAction {
    label: string;
    actionId: string;
    icon?: string;
    danger?: boolean;
}
interface SettingsSection {
    key: string;
    title: string;
    icon: string;
    description?: string;
    actions?: SettingsAction[];
    open?: boolean;
}
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'danger' | 'info' | 'warning';
}
interface AlertConfig {
    id: string;
    name: string;
    type: 'seuil' | 'anomalie' | 'programme' | 'notification';
    active: boolean;
    threshold?: number;
    frequency?: string;
    recipients?: string[];
    lastTriggered?: string;
    description?: string;
}
interface ChartConfig {
    id: string;
    name: string;
    type: 'bar' | 'pie' | 'line' | 'doughnut';
    description: string;
    icon: string;
    data: ChartData;
}
export declare class ReportsSettingsComponent implements OnInit {
    readonly title = "Rapports & Business Intelligence";
    readonly icon = "\uD83D\uDCC8";
    readonly description = "Dashboard, rapports p\u00E9riodiques, exports et graphiques.";
    sections: SettingsSection[];
    kpiData: KpiData[];
    recentTransactions: ReportData[];
    chartConfigs: ChartConfig[];
    alertConfigs: AlertConfig[];
    generatedReports: any[];
    filters: ReportFilter;
    showModal: boolean;
    modalTitle: string;
    modalType: string;
    modalData: any;
    showPinModal: boolean;
    pinCode: string;
    toasts: Toast[];
    private toastSeq;
    activeTab: string;
    showReportModal: boolean;
    reportType: string;
    selectedPeriod: string;
    showGeneratedReports: boolean;
    selectedChart: ChartConfig | null;
    constructor();
    ngOnInit(): void;
    private initDates;
    private loadData;
    private saveData;
    private loadGeneratedReports;
    private saveGeneratedReports;
    private loadAlertConfigs;
    private saveAlertConfigs;
    onAction(section: SettingsSection, action: SettingsAction, group?: any): void;
    openReportModal(title: string, icon: string): void;
    generateReport(type: string): void;
    closeReportModal(): void;
    exportReport(format: string): void;
    sendReportByEmail(): void;
    printReport(): void;
    showAnalysis(type: string): void;
    showChartById(chartId: string): void;
    openAlertConfig(type: string): void;
    toggleAlert(alert: AlertConfig): void;
    deleteAlert(alert: AlertConfig): void;
    addAlert(): void;
    openPinModal(title: string): void;
    addPinDigit(digit: number): void;
    clearPin(): void;
    confirmPin(): void;
    closePinModal(): void;
    closeModal(): void;
    applyFilters(): void;
    resetFilters(): void;
    getChartTotal(chart: ChartConfig): string;
    getChartAverage(chart: ChartConfig): string;
    getAlertTotal(alerts: AlertConfig[]): number;
    getAlertActiveCount(alerts: AlertConfig[]): number;
    getAlertInactiveCount(alerts: AlertConfig[]): number;
    getLinePoints(data: number[], width: number, height: number): string;
    getLinePointsArray(data: number[], width: number, height: number): {
        x: number;
        y: number;
    }[];
    getStatusLabel(status: string): string;
    getStatusColor(status: string): string;
    getPeriodLabel(period: string): string;
    getObjectKeys(obj: any): string[];
    getAlertTypeLabel(type: string): string;
    getAlertStatusLabel(active: boolean): string;
    getChartTypeLabel(type: string): string;
    getChartIcon(type: string): string;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
}
export {};
//# sourceMappingURL=reports-settings.component.d.ts.map