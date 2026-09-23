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
interface Partner {
    id: string;
    name: string;
    code: string;
    swiftCode: string;
    accountNumber: string;
    isActive: boolean;
    /** Champ UI uniquement (hors contrat backend) — utilisé par l'onglet "Par catégorie" */
    category?: string;
}
interface Integration {
    id: string;
    name: string;
    icon: string;
    type: string;
    version: string;
    partner?: string;
    endpoint?: string;
    lastSync?: string;
    apiKey?: string;
    autoSync?: boolean;
    webhookEnabled?: boolean;
    active: boolean;
}
interface CommissionRule {
    id: string;
    partner: string;
    icon: string;
    type: 'fixe' | 'pourcentage' | 'mixte';
    rate: string;
    minAmount?: number;
    maxAmount?: number;
    category?: string;
    active: boolean;
}
export declare class PartnersSettingsComponent implements OnInit {
    readonly Math: Math;
    activeTab: string;
    showModal: boolean;
    modalTitle: string;
    modalType: string;
    selectedItem: any;
    formData: any;
    toasts: Toast[];
    private toastSeq;
    searchTerm: string;
    categoryFilter: string;
    statusFilter: string;
    pageSize: number;
    currentPage: number;
    filteredPartners: Partner[];
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    tabs: TabItem[];
    categories: string[];
    partners: Partner[];
    integrations: Integration[];
    commissionRules: CommissionRule[];
    constructor();
    ngOnInit(): void;
    setActiveTab(tab: string): void;
    get totalPartners(): number;
    get activePartners(): number;
    get inactivePartners(): number;
    get totalCategories(): number;
    get activeIntegrations(): number;
    get categoryStats(): any[];
    getCategoryIcon(category: string): string;
    applyFilters(): void;
    resetFilters(): void;
    filterByCategory(category: string): void;
    get paginatedPartners(): Partner[];
    get totalPages(): number;
    previousPage(): void;
    nextPage(): void;
    onSort(column: string): void;
    getSortMarker(column: string): string;
    getStatusLabel(active: boolean): string;
    getStatusBadgeClass(active: boolean): string;
    viewPartner(partner: Partner): void;
    addPartner(): void;
    editPartner(partner: Partner): void;
    savePartner(): void;
    togglePartnerStatus(partner: Partner): void;
    deletePartner(partner: Partner): void;
    configureIntegration(integration: Integration): void;
    testIntegration(integration: Integration): void;
    toggleIntegration(integration: Integration): void;
    syncIntegration(integration: Integration): void;
    saveIntegration(): void;
    editCommission(rule: CommissionRule): void;
    toggleCommission(rule: CommissionRule): void;
    saveCommission(): void;
    closeModal(): void;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
}
export {};
//# sourceMappingURL=partners-settings.component.d.ts.map