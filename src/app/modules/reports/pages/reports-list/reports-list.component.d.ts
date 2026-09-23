import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportDummyData } from '../../data/report-dummy.data';
import { ReportDefinition, ReportCategory } from '../../models/report.models';
export declare class ReportsListComponent implements OnInit {
    private dummy;
    private router;
    reports: ReportDefinition[];
    filteredReports: ReportDefinition[];
    currentRole: 'admin' | 'agent' | 'super_agent';
    categoryLabels: Record<string, string>;
    categoryColors: Record<string, string>;
    readonly categoryOrder: ReportCategory[];
    constructor(dummy: ReportDummyData, router: Router);
    ngOnInit(): void;
    setRole(role: 'admin' | 'agent' | 'super_agent'): void;
    private applyRoleFilter;
    getCategoryKeys(): ReportCategory[];
    getReportsByCategory(catKey: ReportCategory): ReportDefinition[];
    openReport(route: string): void;
}
//# sourceMappingURL=reports-list.component.d.ts.map