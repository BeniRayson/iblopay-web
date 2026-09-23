import { OnInit, OnDestroy } from '@angular/core';
import { CommissionMockService } from '../../services/commission-mock.service';
import { AgentHierarchy, ViewRole } from '../../models/commission.model';
export declare class HierarchyComponent implements OnInit, OnDestroy {
    private commissionService;
    hierarchies: AgentHierarchy[];
    isLoading: boolean;
    expandedSuperAgent: string | null;
    expandedAgent: string | null;
    activeView: ViewRole;
    private destroy$;
    constructor(commissionService: CommissionMockService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onViewChange(view: ViewRole): void;
    toggleSuperAgent(superAgentId: string): void;
    toggleAgent(agentId: string): void;
    private loadData;
    formatBif(amount: number): string;
    formatDate(dateStr: string): string;
    statusLabel(status: string): string;
    getStatusClass(status: string): string;
}
//# sourceMappingURL=hierarchy.component.d.ts.map