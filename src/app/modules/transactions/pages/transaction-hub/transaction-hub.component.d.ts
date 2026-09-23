import { OnInit } from '@angular/core';
import { TransactionHubService } from '../../services/transaction-hub.service';
import { KpiCard, QuickAction, TransactionTableRow, TransactionDetail, TraceabilityData, TopActor, OperationTypeStats, AlertNotification, SystemActivity } from '../../models/transaction-hub.model';
export declare class TransactionHubComponent implements OnInit {
    private hubService;
    kpiCards: KpiCard[];
    quickActions: QuickAction[];
    transactions: TransactionTableRow[];
    totalTransactions: number;
    currentPage: number;
    selectedDetail: TransactionDetail | null;
    detailVisible: boolean;
    traceability: TraceabilityData | null;
    topActors: TopActor[];
    operationTypes: OperationTypeStats[];
    alerts: AlertNotification[];
    systemActivities: SystemActivity[];
    chartLabels: string[];
    chartValues: number[];
    isLoading: boolean;
    constructor(hubService: TransactionHubService);
    ngOnInit(): void;
    private loadAll;
    onPageChange(page: number): void;
    onRowClick(transactionNo: string): void;
    onReverseClick(transactionNo: string): void;
    closeDetail(): void;
}
//# sourceMappingURL=transaction-hub.component.d.ts.map