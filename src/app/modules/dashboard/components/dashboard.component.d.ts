import { OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
export declare class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
    private router;
    currentDate: Date;
    currentTime: string;
    currentDay: string;
    isRefreshing: boolean;
    isDarkMode: boolean;
    chartCanvas: ElementRef<HTMLCanvasElement>;
    private chartInstance;
    private clockSubscription?;
    statsData: {
        users: number;
        agents: number;
        superAgents: number;
        merchants: number;
        transactionsToday: number;
        commissionEtat: number;
        commissionIblopay: number;
        servicesPublics: number;
    };
    provinceData: {
        depots: {
            name: string;
            amount: number;
        }[];
        transactions: {
            name: string;
            amount: number;
        }[];
        commissions: {
            name: string;
            amount: number;
        }[];
    };
    provinceTotals: {
        depots: number;
        transactions: number;
        commissions: number;
    };
    servicesStats: {
        total: number;
        traitees: number;
        enCours: number;
        rejetees: number;
    };
    services: {
        name: string;
        total: number;
        traitees: number;
        enCours: number;
        rejetees: number;
    }[];
    recentRegistrations: {
        name: string;
        type: string;
    }[];
    pendingRequests: {
        label: string;
        value: number;
    }[];
    agentActivities: {
        label: string;
        value: string;
    }[];
    constructor(router: Router);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private initClock;
    private updateClock;
    private generateSinusoidalData;
    private generateLabels;
    private initChart;
    /**
     * Construit le graphique "Évolution des transactions" (Dépôts / Retraits / Services publics).
     * Utilisée à la fois pour l'affichage initial et pour le changement de période.
     */
    private createChart;
    updateChartPeriod(event: Event): void;
    private loadTheme;
    refreshData(): void;
    formatNumber(value: any): string;
    formatAmount(amount: number): string;
    getChangeClass(change: number): string;
    getChangeSymbol(change: number): string;
}
//# sourceMappingURL=dashboard.component.d.ts.map