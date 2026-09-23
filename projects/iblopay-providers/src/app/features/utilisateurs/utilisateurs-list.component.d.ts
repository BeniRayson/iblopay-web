import { OnInit } from '@angular/core';
import { DemandesService } from '../../services/demandes.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, CompteUtilisateur } from '../../models/provider.model';
import { ToastService } from '../../core/toast.service';
export interface UtilisateurCitoyen {
    nom: string;
    telephone: string;
    nombreDemandes: number;
    montantTotalPaye: number;
    montantEnAttente: number;
    derniereDemande: Date;
    demandes: SoumissionFormulaire[];
}
export declare class UtilisateursListComponent implements OnInit {
    private demandesService;
    private workflowsService;
    private toastService;
    vueActive: 'CITOYENS' | 'COMPTES';
    utilisateurs: UtilisateurCitoyen[];
    filtered: UtilisateurCitoyen[];
    searchTerm: string;
    isLoading: boolean;
    comptes: CompteUtilisateur[];
    comptesFiltres: CompteUtilisateur[];
    searchTermComptes: string;
    isLoadingComptes: boolean;
    compteSelectionne: CompteUtilisateur | null;
    currentPage: number;
    pageSize: number;
    utilisateurSelectionne: UtilisateurCitoyen | null;
    documentActif: {
        reponse: any;
        demande: SoumissionFormulaire;
        utilisateur: UtilisateurCitoyen;
    } | null;
    constructor(demandesService: DemandesService, workflowsService: WorkflowsService, toastService: ToastService);
    ngOnInit(): void;
    chargerComptes(): void;
    changerVue(vue: 'CITOYENS' | 'COMPTES'): void;
    applyFiltersComptes(): void;
    ouvrirDetailCompte(c: CompteUtilisateur): void;
    fermerDetailCompte(): void;
    toggleStatutCompte(c: CompteUtilisateur, event?: Event): void;
    reinitialiserMotDePasse(c: CompteUtilisateur): void;
    labelDroit(code: string): string;
    private genererDemandesSimulation;
    private regrouperParUtilisateur;
    applyFilters(): void;
    onSearchChange(): void;
    get totalPages(): number;
    get paginatedUtilisateurs(): UtilisateurCitoyen[];
    get startIndex(): number;
    get endIndex(): number;
    changePage(page: number): void;
    ouvrirDetail(u: UtilisateurCitoyen): void;
    fermerDetail(): void;
    voirDocument(reponse: any, demande: SoumissionFormulaire, utilisateur: UtilisateurCitoyen, event: Event): void;
    fermerDocument(): void;
    statutClass(statut: string): string;
    statutLabel(statut: string): string;
}
//# sourceMappingURL=utilisateurs-list.component.d.ts.map