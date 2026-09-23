import { OnInit } from '@angular/core';
interface Agent {
    id: string;
    nom: string;
    role: 'agent' | 'super_agent' | 'etat';
    email: string;
    telephone: string;
    dateCreation: string;
    solde: number;
    transactions: number;
    volumeTotal: number;
    commissionTotal: number;
    statut: 'actif' | 'inactif';
}
interface Commission {
    id: string;
    agentId: string;
    agentNom: string;
    agentRole: 'agent' | 'super_agent' | 'etat';
    nbTransactions: number;
    volume: number;
    taux: number;
    montant: number;
    statut: 'calculee' | 'payee' | 'en_attente';
    date?: string;
    transactionIds?: string[];
    commissionEtat?: number;
}
interface HistoriqueCommission {
    id: string;
    date: string;
    agentId: string;
    agentNom: string;
    agentRole: 'agent' | 'super_agent' | 'etat';
    montant: number;
    type: 'commission_agent' | 'commission_super' | 'commission_etat' | 'transfert_etat';
    reference: string;
    statut: 'effectue' | 'en_attente' | 'echoue';
    description?: string;
}
interface TransfertEtat {
    id: string;
    date: string;
    montant: number;
    reference: string;
    statut: 'effectue' | 'en_attente' | 'echoue';
    description: string;
    source: string;
    destination: 'compte_etat';
    commissionIds: string[];
    agentId?: string;
}
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
    color: string;
    textColor: string;
    trend: 'up' | 'down' | 'stable';
    trendValue: string;
}
export declare class CommissionsSettingsComponent implements OnInit {
    readonly title = "Gestion des Commissions";
    readonly icon = "\uD83D\uDCB5";
    readonly pageSize = 100;
    private readonly STORAGE_KEY;
    private agents;
    private commissions;
    private historique;
    private transfertsEtat;
    private toastSeq;
    activeTab: string;
    modalOpen: boolean;
    modalTitle: string;
    modalType: string;
    modalIcon: string;
    selectedItem: any;
    formData: any;
    toasts: Toast[];
    pinCode: string;
    showPinModal: boolean;
    private currentPages;
    tabs: TabItem[];
    constructor();
    ngOnInit(): void;
    private generateAgentNames;
    private initializeData;
    private generateCommissions;
    private generateHistorique;
    private generateTransfertsInitiaux;
    private loadData;
    private saveData;
    getAgents(): Agent[];
    getSuperAgents(): Agent[];
    getEtat(): Agent[];
    getCommissions(): Commission[];
    getHistorique(): HistoriqueCommission[];
    getTransfertsEtat(): TransfertEtat[];
    getCurrentPage(type: string): number;
    getTotalPages(type: string): number;
    getPaginatedItems(type: string): any[];
    nextPage(type: string): void;
    prevPage(type: string): void;
    setActiveTab(tab: string): void;
    private updateCounts;
    getKpiData(): KpiData[];
    openPinModal(): void;
    addPinDigit(digit: number): void;
    clearPin(): void;
    confirmPin(): void;
    closePinModal(): void;
    openTransfertEtat(): void;
    transfererVersEtat(): void;
    openVoirCommission(item: any): void;
    openPayerCommission(item: any): void;
    openVoirHistorique(item: any): void;
    openVoirTransfert(item: any): void;
    closeModal(): void;
    confirmModal(): void;
    private payerCommission;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
    getStatutLabel(statut: string): string;
    getRoleLabel(role: string): string;
    getTypeLabel(type: string): string;
    getMontantTotal(type: string): number;
    getNombreTransactions(type: string): number;
    getTransfertsCount(): number;
    getTotalTransfertsFormatted(): string;
    getTotalCommissionsEtatFormatted(): string;
    getNbCommissionsPayees(): number;
    hasCommissionsPayees(): boolean;
    getTransfertMontant(transfert: any): string;
    getCommissionEtatMontant(commission: any): string;
    getAgentSolde(agent: any): string;
    getAgentCommissionTotal(agent: any): string;
    getAgentVolumeTotal(agent: any): string;
    getCommissionMontant(commission: any): string;
    getCommissionVolume(commission: any): string;
    getHistoriqueMontant(historique: any): string;
    getDetailInfo(detail: any, field: string): string;
}
export {};
//# sourceMappingURL=commissions-settings.component.d.ts.map