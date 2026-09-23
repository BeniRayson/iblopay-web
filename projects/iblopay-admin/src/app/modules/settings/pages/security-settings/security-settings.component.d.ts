import { OnInit } from '@angular/core';
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'danger' | 'info' | 'warning';
}
interface TabItem {
    key: string;
    label: string;
    icon: string;
    count?: number;
}
interface KpiData {
    icon: string;
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
    color: string;
}
interface AuditLog {
    id: string;
    date: string;
    time: string;
    user: string;
    type: 'connexion' | 'transaction' | 'commission' | 'taxe' | 'transfert' | 'systeme';
    action: string;
    description: string;
    amount: number;
    ip: string;
    status: 'success' | 'warning' | 'danger';
    service?: string;
    reference?: string;
}
interface FraudRule {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: 'transaction' | 'connexion' | 'comportement';
    threshold: string;
    detected: number;
    active: boolean;
    config: {
        minAmount?: number;
        maxAmount?: number;
        timeWindow?: number;
        transactionCount?: number;
        ipBlacklist?: string[];
        countryBlacklist?: string[];
        velocityCheck?: boolean;
        deviceFingerprint?: boolean;
        anomalyDetection?: boolean;
        alertLevel: 'low' | 'medium' | 'high' | 'critical';
        action: 'block' | 'alert' | 'notify' | 'review';
        notifyEmail?: string;
        notifyPhone?: string;
    };
}
interface Activity {
    time: string;
    user: string;
    action: string;
    status: 'success' | 'warning' | 'danger';
    description?: string;
}
export declare class SecuritySettingsComponent implements OnInit {
    readonly title = "S\u00E9curit\u00E9 & Conformit\u00E9";
    readonly icon = "\uD83D\uDD10";
    readonly Math: Math;
    activeTab: string;
    showModal: boolean;
    modalTitle: string;
    modalType: string;
    modalData: any;
    selectedItem: any;
    formData: any;
    toasts: Toast[];
    private toastSeq;
    auditSearchTerm: string;
    auditTypeFilter: string;
    auditDateFrom: string;
    auditDateTo: string;
    auditStatusFilter: string;
    filteredAuditLogs: AuditLog[];
    auditPageSize: number;
    auditCurrentPage: number;
    amlStatusFilter: string;
    amlRiskFilter: string;
    filteredAMLLogs: any[];
    amlPageSize: number;
    amlCurrentPage: number;
    tabs: TabItem[];
    kpiData: KpiData[];
    recentActivities: Activity[];
    auditLogs: AuditLog[];
    fraudRules: FraudRule[];
    kycVerifications: any[];
    amlAlerts: any[];
    constructor();
    ngOnInit(): void;
    getActiveFraudRulesCount(): number;
    getPendingKYCCount(): number;
    getActiveAMLAlertsCount(): number;
    applyAuditFilters(): void;
    resetAuditFilters(): void;
    get paginatedAuditLogs(): AuditLog[];
    get auditTotalPages(): number;
    auditPreviousPage(): void;
    auditNextPage(): void;
    applyAMLFilters(): void;
    get paginatedAMLLogs(): any[];
    get amlTotalPages(): number;
    amlPreviousPage(): void;
    amlNextPage(): void;
    getHighValueTransactions(): AuditLog[];
    setActiveTab(tab: string): void;
    viewAuditDetail(log: AuditLog): void;
    configureFraudRule(rule: FraudRule): void;
    toggleFraudRule(rule: FraudRule): void;
    saveFraudRule(): void;
    viewKYC(kyc: any): void;
    approveKYC(kyc: any): void;
    rejectKYC(kyc: any): void;
    viewAMLAlert(alert: any): void;
    updateAMLStatus(alert: any, status: string): void;
    closeModal(): void;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
    getStatusLabel(status: string): string;
    getStatusColor(status: string): string;
    getActivityIcon(status: string): string;
    getAuditTypeLabel(type: string): string;
}
export {};
//# sourceMappingURL=security-settings.component.d.ts.map