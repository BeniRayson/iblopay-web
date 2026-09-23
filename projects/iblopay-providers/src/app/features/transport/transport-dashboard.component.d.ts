import { OnInit } from '@angular/core';
type BusStatus = 'En service' | 'Hors-ligne' | 'En maintenance';
interface BusRow {
    plate: string;
    status: BusStatus;
    driver: string;
    revenue: number;
    deposit: number;
    sync: string;
}
interface PaymentRow {
    time: string;
    bus: string;
    route: string;
    amount: number;
    card: string;
}
interface AlertRow {
    title: string;
    subtitle: string;
    time: string;
    kind: 'danger' | 'warning';
}
export declare class TransportDashboardComponent implements OnInit {
    readonly busImage = "assets/images/Bus.png";
    period: string;
    vehicleType: string;
    selectedBus: string;
    activeMenu: string;
    sidebarCollapsed: boolean;
    notificationsOpen: boolean;
    lastRefresh: Date;
    notificationCount: number;
    visibleBusCount: number;
    visiblePaymentCount: number;
    selectedAlert: AlertRow | null;
    selectedPayment: PaymentRow | null;
    readonly menu: {
        label: string;
        icon: string;
    }[];
    readonly buses: BusRow[];
    readonly payments: PaymentRow[];
    readonly alerts: AlertRow[];
    readonly topBuses: {
        plate: string;
        route: string;
        revenue: number;
        share: number;
    }[];
    readonly topRoutes: {
        name: string;
        revenue: number;
    }[];
    readonly revenueHistory: number[];
    readonly chartLabels: string[];
    chartPoints: string;
    chartArea: string;
    chartDots: {
        x: number;
        y: number;
    }[];
    ngOnInit(): void;
    get filteredBuses(): BusRow[];
    get filteredPayments(): PaymentRow[];
    get activeBuses(): number;
    get uniqueBusPlates(): string[];
    get selectedPeriodLabel(): string;
    formatBif(amount: number): string;
    formatNumber(amount: number): string;
    trackByIndex(index: number): number;
    refresh(): void;
    showAllBuses(): void;
    showAllPayments(): void;
    chooseMenu(label: string): void;
    viewAlert(alert: AlertRow): void;
    viewPayment(payment: PaymentRow): void;
    closeDialog(): void;
    private buildChart;
}
export {};
