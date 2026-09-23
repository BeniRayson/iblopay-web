interface Bordereau {
    id: string;
    numero: string;
    nomVersant: string;
    montant: number;
    date: string;
    statut: 'valide' | 'en_attente' | 'rejete';
    description?: string;
}
interface ComptabiliteItem {
    id: string;
    date: string;
    compte: string;
    libelle: string;
    debit: number | null;
    credit: number | null;
    reference: string;
    typeEcriture?: string;
}
interface RapportItem {
    id: string;
    titre: string;
    description: string;
    icon: string;
    date: string;
    taille: string;
    type: string;
    contenu?: string;
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
export declare class FinancialSettingsComponent {
    readonly title = "Gestion Financi\u00E8re";
    readonly icon = "\uD83C\uDFE6";
    readonly pageSize = 10;
    private readonly STORAGE_KEY;
    tabs: TabItem[];
    activeTab: string;
    private currentPages;
    private bordereaux;
    private comptabiliteData;
    private rapportsData;
    private configData;
    private soldeDisponible;
    private liquiditeUtilisee;
    private toastSeq;
    modalOpen: boolean;
    modalTitle: string;
    modalType: string;
    modalIcon: string;
    selectedItem: any;
    formData: any;
    rapportPreview: string;
    toasts: Toast[];
    constructor();
    private loadData;
    private saveData;
    private updateTabsCount;
    private initializeData;
    private generateRapportJournalier;
    private generateRapportHebdomadaire;
    private generateRapportMensuel;
    private generateRapportCommissions;
    private generateRapportBordereaux;
    getKpiData(): any[];
    getTotalBordereaux(): number;
    getBordereauxEnAttente(): Bordereau[];
    getTotalMontantBordereaux(): number;
    getMontantMoyenBordereau(): number;
    getBordereaux(): Bordereau[];
    getPaginatedBordereaux(): Bordereau[];
    getTotalBordereauxPages(): number;
    deleteBordereau(item: any): void;
    getNombreTransactions(): number;
    getTransactionsEffectuees(): number;
    getComptabiliteData(): ComptabiliteItem[];
    getPaginatedComptabilite(): ComptabiliteItem[];
    getTotalComptabilitePages(): number;
    getRapports(): RapportItem[];
    viewRapport(rapport: RapportItem): void;
    downloadRapport(rapport: RapportItem): void;
    getConfiguration(): any[];
    getCurrentPage(type: string): number;
    nextPage(type: string): void;
    prevPage(type: string): void;
    setActiveTab(tab: string): void;
    openNouveauBordereau(): void;
    openNouvelleEcriture(): void;
    openCorrigerEcriture(item: any): void;
    openGenererRapport(): void;
    openModifierConfig(item: any): void;
    viewBordereau(item: any): void;
    viewEcriture(item: any): void;
    closeModal(): void;
    confirmModal(): void;
    private ajouterBordereau;
    private genererRapport;
    private modifierConfiguration;
    getRapportPeriode(): string;
    exportBordereaux(): void;
    printBordereaux(): void;
    exportComptabilite(): void;
    printComptabilite(): void;
    downloadBordereau(item: any): void;
    private downloadFile;
    getStatutLabel(statut: string): string;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
}
export {};
//# sourceMappingURL=financial-settings.component.d.ts.map