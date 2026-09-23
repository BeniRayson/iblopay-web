import { OnInit, OnDestroy } from '@angular/core';
import { CommissionMockService } from '../../services/commission-mock.service';
import { LeaderboardEntry, ViewRole } from '../../models/commission.model';
export declare class LeaderboardComponent implements OnInit, OnDestroy {
    private commissionService;
    activeTab: 'agents' | 'super_agents';
    entries: LeaderboardEntry[];
    isLoading: boolean;
    activeView: ViewRole;
    readonly Math: Math;
    private destroy$;
    constructor(commissionService: CommissionMockService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onViewChange(view: ViewRole): void;
    onTabChange(tab: 'agents' | 'super_agents'): void;
    private loadData;
    formatBif(amount: number): string;
    getTrendIcon(trend: string): string;
    getTrendColor(trend: string): string;
    getRankClass(rank: number): string;
}
//# sourceMappingURL=leaderboard.component.d.ts.map