import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { WorkflowsService } from '../../services/workflows.service';
import { ServiceInstitution, Workflow, CompteUtilisateur } from '../../models/provider.model';
import { ToastService } from '../../core/toast.service';
export declare class ServicesListComponent implements OnInit {
    private servicesService;
    private workflowsService;
    private router;
    private toastService;
    services: ServiceInstitution[];
    filtered: ServiceInstitution[];
    searchTerm: string;
    selectedStatut: string;
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
    selectedService: ServiceInstitution | null;
    stats: {
        total: number;
        actifs: number;
        brouillon: number;
    };
    serviceSchemaActif: ServiceInstitution | null;
    workflowSchemaAffiche: Workflow | null;
    comptesSchema: CompteUtilisateur[];
    isLoadingSchema: boolean;
    constructor(servicesService: ServicesService, workflowsService: WorkflowsService, router: Router, toastService: ToastService);
    ngOnInit(): void;
    load(): void;
    updateStats(): void;
    applyFilters(): void;
    onSearchChange(): void;
    get pagedServices(): ServiceInstitution[];
    get totalPages(): number;
    changePage(page: number): void;
    mathMin(a: number, b: number): number;
    toggleStatut(s: ServiceInstitution): void;
    deleteService(s: ServiceInstitution): void;
    ouvrirFormBuilder(s: ServiceInstitution): void;
    ouvrirWorkflowBuilder(s: ServiceInstitution): void;
    voirSchemaWorkflow(s: ServiceInstitution): void;
    fermerSchemaWorkflow(): void;
    comptesPourEtapeSchema(etapeId: string): CompteUtilisateur[];
    modifierWorkflowDepuisSchema(): void;
    couleurCategorie(categorie: string): string;
}
//# sourceMappingURL=services-list.component.d.ts.map