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
interface Fee {
    id: string;
    name: string;
    icon: string;
    type: 'fixe' | 'pourcentage' | 'mixte';
    rate: string;
    minAmount?: number;
    maxAmount?: number;
    appliesTo?: string;
    active: boolean;
}
interface Limit {
    id: string;
    name: string;
    icon: string;
    value: number;
    period: 'jour' | 'semaine' | 'mois' | 'an' | 'illimite';
    currentUsage?: number;
    description?: string;
    active: boolean;
}
interface Notification {
    id: string;
    name: string;
    icon: string;
    channel: 'sms' | 'email' | 'push' | 'webhook';
    config?: string;
    events: string[];
    active: boolean;
}
interface SystemParam {
    id: string;
    name: string;
    icon: string;
    value: string;
    description?: string;
    options?: string[];
    danger?: boolean;
    active: boolean;
}
export declare class SystemSettingsComponent implements OnInit {
    readonly Math: Math;
    activeTab: string;
    showModal: boolean;
    modalTitle: string;
    modalType: string;
    selectedItem: any;
    formData: any;
    toasts: Toast[];
    private toastSeq;
    availableEvents: string[];
    tabs: TabItem[];
    fees: Fee[];
    limits: Limit[];
    notifications: Notification[];
    systemParams: SystemParam[];
    constructor();
    ngOnInit(): void;
    setActiveTab(tab: string): void;
    getActiveFeesCount(): number;
    getActiveLimitsCount(): number;
    getActiveNotificationsCount(): number;
    getActiveParamsCount(): number;
    getLimitsSummary(): any[];
    configureFee(fee: Fee): void;
    toggleFee(fee: Fee): void;
    saveFee(): void;
    configureLimit(limit: Limit): void;
    toggleLimit(limit: Limit): void;
    saveLimit(): void;
    configureNotification(notification: Notification): void;
    toggleNotification(notification: Notification): void;
    testNotification(notification: Notification): void;
    isEventSelected(event: string): boolean;
    toggleEventSelection(event: string): void;
    saveNotification(): void;
    configureParam(param: SystemParam): void;
    toggleParam(param: SystemParam): void;
    resetParam(param: SystemParam): void;
    saveParam(): void;
    clearCache(): void;
    rebuildIndex(): void;
    resetAll(): void;
    exportData(): void;
    closeModal(): void;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
}
export {};
//# sourceMappingURL=system-settings.component.d.ts.map