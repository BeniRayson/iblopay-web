import { OnInit } from '@angular/core';
import { DemandesService } from '../../services/demandes.service';
import { ServicesService } from '../../services/services.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, ServiceInstitution, CompteUtilisateur, Workflow } from '../../models/provider.model';
import { ExportUtilsService } from '../../core/export-utils.service';
type TypeRapport = 'DEMANDES' | 'REVENUS' | 'COMPTES';
interface ColonneRapport {
    cle: string;
    label: string;
}
interface LigneRapport {
    [cle: string]: string | number;
}
export declare class RapportsComponent implements OnInit {
    private demandesService;
    private servicesService;
    private workflowsService;
    private exportUtils;
    isLoading: boolean;
    demandes: SoumissionFormulaire[];
    services: ServiceInstitution[];
    comptes: CompteUtilisateur[];
    workflows: Workflow[];
    typeRapport: TypeRapport;
    dateDebut: string;
    dateFin: string;
    serviceId: string;
    statut: string;
    role: string;
    recherche: string;
    colonnes: ColonneRapport[];
    lignes: LigneRapport[];
    currentPage: number;
    pageSize: number;
    readonly statutsDisponibles: string[];
    constructor(demandesService: DemandesService, servicesService: ServicesService, workflowsService: WorkflowsService, exportUtils: ExportUtilsService);
    ngOnInit(): void;
    changerType(type: TypeRapport): void;
    reinitialiserFiltres(): void;
    get rolesDisponibles(): string[];
    private dansPeriode;
    genererRapport(): void;
    private demandesFiltrees;
    private genererRapportDemandes;
    private genererRapportRevenus;
    private genererRapportComptes;
    statutLabel(statut: string): string;
    get totalPages(): number;
    get lignesPaginees(): LigneRapport[];
    changePage(page: number): void;
    get totalLignes(): number;
    get montantTotal(): number;
    exporterExcel(): void;
    imprimer(): void;
}
export {};
//# sourceMappingURL=rapports.component.d.ts.map