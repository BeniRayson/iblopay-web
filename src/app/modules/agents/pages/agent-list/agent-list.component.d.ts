import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';
interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
    time: string;
    read: boolean;
}
export declare class AgentListComponent implements OnInit {
    private agentService;
    private router;
    agents: Agent[];
    filteredAgents: Agent[];
    isLoading: boolean;
    searchTerm: string;
    selectedStatus: string;
    isDarkMode: boolean;
    showNotifications: boolean;
    showOtpModal: boolean;
    otpCode: string;
    otpError: string;
    otpLoading: boolean;
    otpCooldown: number;
    otpCanResend: boolean;
    private otpTimerInterval;
    agentToBlock: Agent | null;
    blockAction: 'bloquer' | 'débloquer';
    notifications: Notification[];
    stats: {
        total: number;
        active: number;
        pending: number;
        blocked: number;
        totalElectronics: number;
        totalElectronicsAmount: number;
        totalAgents: number;
        totalDeposits: number;
        totalDepositAmount: number;
        totalTransactionAmount: number;
    };
    statuses: {
        value: string;
        label: string;
    }[];
    currentPage: number;
    itemsPerPage: number;
    constructor(agentService: AgentService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadTheme(): void;
    toggleTheme(): void;
    toggleNotifications(): void;
    markAllRead(): void;
    removeNotification(id: number): void;
    loadAgents(): void;
    loadStats(): void;
    applyFilters(): void;
    onSearch(event: any): void;
    onStatusChange(event: any): void;
    resetFilters(): void;
    viewAgent(agent: Agent): void;
    createAgent(): void;
    /**
     * Ouvre la page d'approvisionnement pour un agent spécifique
     * @param agent L'agent à approvisionner
     */
    openFunding(agent: Agent): void;
    openBlockOtpModal(agent: Agent): void;
    closeOtpModal(): void;
    private sendOtpSimulation;
    private startOtpTimer;
    private clearOtpTimer;
    resendOtp(): void;
    verifyOtpAndBlock(): void;
    private executeBlock;
    getTotalElectronicsAmount(agent: Agent): number;
    getStatusLabel(status: string): string;
    getStatusClass(status: string): string;
    getInitials(firstName: string, lastName: string): string;
    get paginatedAgents(): Agent[];
    get totalPages(): number;
    changePage(direction: 'prev' | 'next'): void;
    goToPage(page: number): void;
    getStartIndex(): number;
    getEndIndex(): number;
}
export {};
//# sourceMappingURL=agent-list.component.d.ts.map