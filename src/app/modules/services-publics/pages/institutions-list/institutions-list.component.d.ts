import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
export declare class InstitutionsListComponent implements OnInit {
    private route;
    private router;
    private servicesPublicsService;
    institutions: Institution[];
    serviceId: number;
    loading: boolean;
    notFound: boolean;
    viewingInstitution: Institution | null;
    showNotification: boolean;
    notificationMessage: string;
    notificationType: 'success' | 'error' | 'info';
    constructor(route: ActivatedRoute, router: Router, servicesPublicsService: ServicesPublicsService);
    ngOnInit(): void;
    goBack(): void;
    getServiceColor(code: string): string;
    getInstitutionTypeLabel(type: string): string;
    onViewInstitution(institution: Institution): void;
    closeInstitutionModal(): void;
    onEditInstitution(institution: Institution): void;
    onToggleInstitution(institution: Institution): void;
    onAddInstitution(): void;
    exportData(): void;
    showNotificationMessage(message: string, type?: 'success' | 'error' | 'info'): void;
}
//# sourceMappingURL=institutions-list.component.d.ts.map