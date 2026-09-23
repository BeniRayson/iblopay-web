import { OnInit, OnDestroy } from '@angular/core';
import { CommissionMockService } from '../../services/commission-mock.service';
import { Commission, CommissionFilter, SortConfig, CommissionStatus, CommissionType, ViewRole } from '../../models/commission.model';
export declare class CommissionListComponent implements OnInit, OnDestroy {
    private commissionService;
    commissions: Commission[];
    total: number;
    page: number;
    pageSize: number;
    isLoading: boolean;
    filter: CommissionFilter;
    sort: SortConfig;
    agents: {
        agentId: string;
        agentName: string;
    }[];
    superAgents: {
        superAgentId: string;
        superAgentName: string;
    }[];
    statuses: ({
        value: CommissionStatus | null;
        label: string;
    })[];
    types: ({
        value: CommissionType | null;
        label: string;
    })[];
    selectedCommission: Commission | null;
    detailVisible: boolean;
    activeView: ViewRole;
    private destroy$;
    constructor(commissionService: CommissionMockService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onViewChange(view: ViewRole): void;
    onPageChange(newPage: number): void;
    onSort(column: string): void;
    onFilterChange(): void;
    onSearch(): void;
    clearFilters(): void;
    onRowClick(commission: Commission): void;
    closeDetail(): void;
    private loadDropdowns;
    private loadData;
    get totalPages(): number;
    get pages(): number[];
    formatBif(amount: number): string;
    formatDate(dateStr: string): string;
    formatDateShort(dateStr: string | null): string;
    statusLabel(status: string): string;
    typeLabel(type: string): string;
    getStatusClass(status: string): string;
    getSortIcon(column: string): string;
}
//# sourceMappingURL=commission-list.component.d.ts.map