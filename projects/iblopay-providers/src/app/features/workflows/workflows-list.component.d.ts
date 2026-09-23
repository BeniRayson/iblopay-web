import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowsService } from '../../services/workflows.service';
import { ServicesService } from '../../services/services.service';
import { Workflow, ServiceInstitution, CompteUtilisateur } from '../../models/provider.model';
import { ToastService } from '../../core/toast.service';
interface WorkflowLigne extends Workflow {
    serviceNom: string;
    nombreComptes: number;
}
export declare class WorkflowsListComponent implements OnInit {
    private workflowsService;
    private servicesService;
    private router;
    private toastService;
    lignes: WorkflowLigne[];
    filtered: WorkflowLigne[];
    services: ServiceInstitution[];
    comptes: CompteUtilisateur[];
    searchTerm: string;
    selectedStatut: string;
    isLoading: boolean;
    workflowSelectionne: WorkflowLigne | null;
    comptesDuWorkflowSelectionne: CompteUtilisateur[];
    stats: {
        total: number;
        actifs: number;
        comptes: number;
    };
    constructor(workflowsService: WorkflowsService, servicesService: ServicesService, router: Router, toastService: ToastService);
    ngOnInit(): void;
    load(): void;
    updateStats(): void;
    applyFilters(): void;
    /** Services qui n'ont pas encore de workflow configuré. */
    get servicesSansWorkflow(): ServiceInstitution[];
    ouvrirDetail(w: WorkflowLigne): void;
    fermerDetail(): void;
    modifier(w: Workflow): void;
    toggleStatut(w: Workflow, event?: Event): void;
    supprimer(w: Workflow, event?: Event): void;
    statutClass(statut: string): string;
    comptesPourEtape(etapeId: string): CompteUtilisateur[];
}
export {};
//# sourceMappingURL=workflows-list.component.d.ts.map