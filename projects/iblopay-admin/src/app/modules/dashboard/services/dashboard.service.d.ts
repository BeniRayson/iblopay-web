import { Observable } from 'rxjs';
import { ServicePublic, ActivityItem, QuickAccess, DashboardStats, ProvinceStatistics } from '../models/dashboard.interface';
export declare class DashboardService {
    private statsSubject;
    stats$: Observable<DashboardStats>;
    private provinceStatsSubject;
    provinceStats$: Observable<ProvinceStatistics>;
    constructor();
    getStats(): Observable<DashboardStats>;
    getProvinceStats(): Observable<ProvinceStatistics>;
    getPublicServices(): Observable<ServicePublic[]>;
    getActivities(): Observable<ActivityItem[]>;
    getQuickAccess(): Observable<QuickAccess[]>;
    getRecentRegistrations(): Observable<ActivityItem[]>;
    getPendingRequests(): Observable<ActivityItem[]>;
    refreshData(): Observable<boolean>;
    private getDefaultStats;
    private getDefaultProvinceStats;
    private simulateUpdates;
}
//# sourceMappingURL=dashboard.service.d.ts.map