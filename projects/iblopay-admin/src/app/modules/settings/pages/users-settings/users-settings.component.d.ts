import { ElementRef } from '@angular/core';
import { ClientUser, AgentUser, SuperAgentUser } from './users-mock-data';
type ActorTab = 'clients' | 'agents' | 'super-agents';
type AnyUser = ClientUser | AgentUser | SuperAgentUser;
type WizardStepKey = 'carte' | 'identite' | 'adresse' | 'professionnel' | 'recap';
interface RowAction {
    label: string;
    actionId: string;
    icon: string;
    danger?: boolean;
}
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'danger' | 'info';
}
interface ConfirmState {
    title: string;
    message: string;
    danger: boolean;
    onConfirm: () => void;
}
interface HistoriqueDetail {
    date: string;
    type: 'depot' | 'retrait' | 'transfert' | 'paiement';
    typeLabel: string;
    montant: string;
    destinataire: string;
    statut: 'actif' | 'suspendu' | 'archive';
}
export declare class UsersSettingsComponent {
    fileInput: ElementRef<HTMLInputElement>;
    readonly title = "Gestion des utilisateurs";
    readonly icon = "\uD83D\uDC65";
    readonly currentYear: number;
    readonly today: Date;
    readonly Math: Math;
    tabs: {
        key: ActorTab;
        label: string;
        icon: string;
    }[];
    activeTab: ActorTab;
    clients: ClientUser[];
    agents: AgentUser[];
    superAgents: SuperAgentUser[];
    searchTerm: string;
    statutFilter: string;
    kycFilter: string;
    currentPage: number;
    pageSize: number;
    openMenuId: string | null;
    drawerOpen: boolean;
    drawerUser: AnyUser | null;
    drawerType: ActorTab | null;
    drawerTab: string;
    folderOpen: boolean;
    wizardOpen: boolean;
    wizardMode: 'create' | 'edit';
    wizardData: any;
    wizardStep: number;
    otpSent: boolean;
    otpVerified: boolean;
    otpGenerated: string;
    otpInput: string;
    otpError: boolean;
    private editingUser;
    readonly provinces: string[];
    confirm: ConfirmState | null;
    toasts: Toast[];
    private toastSeq;
    get rawList(): AnyUser[];
    get filteredList(): AnyUser[];
    get totalPages(): number;
    get paginatedList(): AnyUser[];
    get pageNumbers(): number[];
    get activeTabLabel(): string;
    setTab(tab: ActorTab): void;
    goToPage(p: number): void;
    onFilterChange(): void;
    initials(nom: string): string;
    actionsFor(user: any): RowAction[];
    moreActionsFor(user: any): RowAction[];
    toggleMenu(id: string): void;
    toggleFolder(): void;
    handleAction(user: any, actionId: string): void;
    private mapActionToDrawerTab;
    private setStatut;
    drawerTabsFor(type: ActorTab): {
        key: string;
        label: string;
    }[];
    openDrawer(user: any, tab?: string): void;
    closeDrawer(): void;
    agentsOfSuperAgent(superAgentId: string): AgentUser[];
    getHistoriqueDetail(id: string): HistoriqueDetail[];
    getConnexions(id: string): {
        date: string;
        ip: string;
        appareil: string;
        localisation: string;
    }[];
    getLimitPercentage(agent: AgentUser): number;
    exportCSV(): void;
    printDocument(): void;
    get needsProfessionalStep(): boolean;
    get wizardSteps(): {
        key: WizardStepKey;
        label: string;
    }[];
    get currentStepKey(): WizardStepKey;
    openCreateModal(): void;
    openEditFlow(user: any): void;
    closeWizard(): void;
    private generateOtpCode;
    private generateNFC;
    private generateCardNumber;
    private generateTempPassword;
    regenerateCard(): void;
    sendOtp(): void;
    verifyOtp(): void;
    get availableCommunes(): string[];
    get availableZones(): string[];
    get availableCollines(): string[];
    onProvinceChange(): void;
    onCommuneChange(): void;
    onZoneChange(): void;
    onDocumentSelected(event: Event): void;
    canGoNext(): boolean;
    wizardNext(): void;
    wizardPrev(): void;
    goToStep(i: number): void;
    submitWizard(): void;
    private createUserFromWizard;
    private applyEditFromWizard;
    assignModalOpen: boolean;
    assignTargetUser: AgentUser | null;
    assignTargetSuperAgentId: string;
    openAssignModal(user: AgentUser): void;
    closeAssignModal(): void;
    confirmAssign(): void;
    confirmAction(title: string, message: string, danger: boolean, onConfirm: () => void): void;
    resolveConfirm(): void;
    cancelConfirm(): void;
    toast(message: string, type?: Toast['type']): void;
    dismissToast(id: number): void;
    statutLabel(statut: string): string;
    formatBIF(n: number): string;
    formatDate(date: Date): string;
    trackById(_i: number, item: any): string;
    asClient(u: AnyUser): ClientUser;
    asAgent(u: AnyUser): AgentUser;
    asSuperAgent(u: AnyUser): SuperAgentUser;
    range(n: number): number[];
}
export {};
//# sourceMappingURL=users-settings.component.d.ts.map