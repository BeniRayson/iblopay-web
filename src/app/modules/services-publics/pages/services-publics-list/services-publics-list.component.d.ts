import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePublic } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
interface ServiceStats {
    total: number;
    interne: number;
    externe: number;
    actifs: number;
}
export declare class ServicesPublicsListComponent implements OnInit {
    private router;
    private servicesPublicsService;
    services: ServicePublic[];
    filteredServices: ServicePublic[];
    paginatedServices: ServicePublic[];
    searchTerm: string;
    selectedType: string;
    selectedStatus: string;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    isLoading: boolean;
    selectedServices: Set<number>;
    selectAll: boolean;
    stats: ServiceStats;
    notificationMessage: string;
    notificationType: 'success' | 'error' | 'info';
    showNotification: boolean;
    readonly Math: Math;
    constructor(router: Router, servicesPublicsService: ServicesPublicsService);
    ngOnInit(): void;
    loadServices(): void;
    applyFilters(): void;
    onSearchChange(): void;
    onFilterChange(): void;
    clearFilters(): void;
    changePage(page: number): void;
    getPaginationPages(): number[];
    updateStats(): void;
    onViewService(service: ServicePublic): void;
    onEditService(service: ServicePublic): void;
    onToggleStatus(service: ServicePublic): void;
    onDeleteService(service: ServicePublic): void;
    toggleSelectAll(): void;
    toggleSelect(serviceId: number): void;
    bulkActivate(): void;
    bulkDeactivate(): void;
    bulkDelete(): void;
    exportData(): void;
    trackById(index: number, service: ServicePublic): number;
    getServiceColor(abreviation: string): string;
    getStatusLabel(actif: boolean | undefined): string;
    getStatusClass(actif: boolean | undefined): string;
    showNotificationMessage(message: string, type?: 'success' | 'error' | 'info'): void;
}
export {};
//# sourceMappingURL=services-publics-list.component.d.ts.map