import { OnInit } from '@angular/core';
export type TransactionType = 'DEPOT' | 'RETRAIT' | 'PAIEMENT_NFC' | 'TRANSFERT';
export type PersonRole = 'agent' | 'super_agent';
export interface CommissionSplit {
    etat: number;
    iblopay: number;
    tierce: number;
    personnelle: number;
}
export interface Transaction {
    reference: string;
    date: Date;
    type: TransactionType;
    montant: number;
    commissions: CommissionSplit;
}
export interface Person {
    id: string;
    nom: string;
    prenom: string;
    wallet: string;
    contact: string;
    transactions: Transaction[];
    role: PersonRole;
    superAgentNom?: string;
}
export interface PersonRow {
    person: Person;
    totalCommissionEtat: number;
    totalCommissionIblopay: number;
    totalCommissionTierce: number;
    totalCommissionPersonnelle: number;
    totalToutesCommissions: number;
    initials: string;
}
export declare class CommissionDashboardComponent implements OnInit {
    allPersons: Person[];
    filteredPersons: Person[];
    agentRows: PersonRow[];
    superAgentRows: PersonRow[];
    activeTab: PersonRole;
    searchQuery: string;
    selectedPerson: Person | null;
    isModalOpen: boolean;
    modalTotalMontant: number;
    modalTotalEtat: number;
    modalTotalIblopay: number;
    modalTotalTierce: number;
    modalTotalPersonnelle: number;
    totalCommissionEtat: number;
    totalCommissionIblopay: number;
    totalCommissionTierce: number;
    totalCommissionPersonnelle: number;
    totalToutesCommissions: number;
    totalsEtat: number;
    totalsIblopay: number;
    totalsTierce: number;
    totalsPersonnelle: number;
    totalsGlobale: number;
    ngOnInit(): void;
    private toRow;
    get currentRows(): PersonRow[];
    switchTab(tab: PersonRole): void;
    onSearch(): void;
    private applyFilter;
    private computeKpis;
    private computeTableTotals;
    get selectedPersonRoleLabel(): string;
    get selectedPersonThirdCommissionLabel(): string;
    get selectedPersonTransactionCount(): number;
    openDetail(person: Person): void;
    closeModal(): void;
    downloadCsv(): void;
    getInitials(nom: string, prenom: string): string;
    formatBif(amount: number): string;
    formatDate(date: Date | string): string;
    formatDateShort(date: Date | string): string;
    transactionTypeLabel(type: TransactionType): string;
    getTransactionTypeClass(type: TransactionType): string;
    getAvatarColor(initials: string): string;
    getMiniBarTitle(pct: {
        etat: number;
        iblopay: number;
        tierce: number;
        personnelle: number;
    }): string;
    getMiniBarPercentages(commissions: CommissionSplit): {
        etat: number;
        iblopay: number;
        tierce: number;
        personnelle: number;
    };
    getBarPercentagesFromTotals(row: PersonRow): {
        etat: number;
        iblopay: number;
        tierce: number;
        personnelle: number;
    };
    get percentageEtatGlobale(): number;
    get percentageIblopayGlobale(): number;
    get percentageTierceGlobale(): number;
    get percentagePersonnelleGlobale(): number;
}
//# sourceMappingURL=commission-dashboard.component.d.ts.map