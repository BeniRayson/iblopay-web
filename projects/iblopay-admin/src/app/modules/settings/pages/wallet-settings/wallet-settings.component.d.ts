interface WalletData {
    id: string;
    userId: string;
    userNom: string;
    type: 'client' | 'agent' | 'super-agent';
    solde: number;
    soldeEMoney: number;
    soldeCash: number;
    soldeDistribution: number;
    statut: 'actif' | 'bloque' | 'suspendu' | 'archive';
    dateCreation: string;
    derniereTransaction: string;
    kycLevel: number;
    performance: number;
    nbAgents: number;
}
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'danger' | 'info' | 'warning';
}
export declare class WalletSettingsComponent {
    readonly title = "Gestion des Wallets";
    readonly icon = "\uD83D\uDCB0";
    readonly pageSize = 10;
    activeTab: 'client' | 'agent' | 'super-agent';
    private wallets;
    private transactions;
    private toastSeq;
    private transactionSeq;
    private currentPages;
    private avatarColors;
    modalOpen: boolean;
    modalTitle: string;
    modalAction: string;
    selectedWallet: WalletData | null;
    montant: number;
    descriptionTxt: string;
    transactionId: string;
    agentSource: string;
    agentDestinataire: string;
    agentsList: any[];
    historiqueTransactions: any[];
    toasts: Toast[];
    constructor();
    private initializeData;
    getAvatarColor(userId: string): string;
    getPaginatedWallets(type: string): WalletData[];
    getTotalPages(type: string): number;
    getCurrentPage(type: string): number;
    nextPage(type: string): void;
    previousPage(type: string): void;
    setActiveTab(tab: 'client' | 'agent' | 'super-agent'): void;
    getWalletsByType(type: string): WalletData[];
    getTotalSolde(type: string): number;
    getTotalGeneral(): number;
    getInitials(nom: string): string;
    getStatutLabel(statut: string): string;
    getKycLevel(userId: string): number;
    getAgentPerformance(userId: string): number;
    getSuperPerformance(userId: string): number;
    getNbAgentsForSuper(superId: string): number;
    openWalletHistory(wallet: WalletData): void;
    openWalletAction(wallet: WalletData, action: string): void;
    openGlobalAction(type: string, action: string): void;
    private getActionTitle;
    private getGlobalActionTitle;
    confirmModal(): void;
    private executeWalletAction;
    private executeGlobalAction;
    private addTransaction;
    closeModal(): void;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
}
export {};
//# sourceMappingURL=wallet-settings.component.d.ts.map