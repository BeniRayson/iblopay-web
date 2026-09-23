import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePublic, Categorie } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
export declare class CategoriesListComponent implements OnInit {
    private route;
    private router;
    private servicesPublicsService;
    service: ServicePublic | undefined;
    categories: Categorie[];
    loading: boolean;
    showNotification: boolean;
    notificationMessage: string;
    notificationType: 'success' | 'error' | 'info';
    constructor(route: ActivatedRoute, router: Router, servicesPublicsService: ServicesPublicsService);
    ngOnInit(): void;
    goBack(): void;
    getCategoryColor(code: string): string;
    onAddCategory(): void;
    onViewCategory(category: Categorie): void;
    onEditCategory(category: Categorie): void;
    onToggleCategory(category: Categorie): void;
    exportData(): void;
    showNotificationMessage(message: string, type?: 'success' | 'error' | 'info'): void;
}
//# sourceMappingURL=categories-list.component.d.ts.map