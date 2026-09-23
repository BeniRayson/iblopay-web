import { OnInit } from '@angular/core';
import { DemandesService } from '../../services/demandes.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, StatutSoumission, ReponseFormulaire, Workflow, CompteUtilisateur } from '../../models/provider.model';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
export declare class DemandesListComponent implements OnInit {
    private demandesService;
    private workflowsService;
    private authService;
    private toastService;
    demandes: SoumissionFormulaire[];
    filtered: SoumissionFormulaire[];
    searchTerm: string;
    selectedStatut: string;
    demandeSelectionnee: SoumissionFormulaire | null;
    documentAgrandi: ReponseFormulaire | null;
    bordereauAgrandi: SoumissionFormulaire | null;
    etapeSelectionnee: {
        code: StatutSoumission;
        label: string;
        icon: string;
    } | null;
    isLoading: boolean;
    etapes: {
        code: StatutSoumission;
        label: string;
        icon: string;
    }[];
    workflowActif: Workflow | null;
    comptesActifs: CompteUtilisateur[];
    constructor(demandesService: DemandesService, workflowsService: WorkflowsService, authService: AuthService, toastService: ToastService);
    ngOnInit(): void;
    get estAdmin(): boolean;
    get utilisateur(): import("../../core/auth.service").UtilisateurConnecte | null;
    get peutVoirDocuments(): boolean;
    get peutEncaisser(): boolean;
    /** Vrai si l'utilisateur connecté est responsable de l'étape actuelle de la demande sélectionnée. */
    get estResponsableEtapeActuelle(): boolean;
    get peutValider(): boolean;
    get peutRejeter(): boolean;
    load(): void;
    applyFilters(): void;
    ouvrirDetail(d: SoumissionFormulaire): void;
    fermerDetail(): void;
    selectionnerEtapeWorkflow(e: {
        code: StatutSoumission;
        label: string;
        icon: string;
    }): void;
    getAuditInfo(code: StatutSoumission): {
        statut: string;
        agent: string;
        date: string;
        commentaire: string;
    };
    /** Retourne "Prénom Nom — Rôle" du/des comptes rattachés à l'étape du workflow correspondant à ce code de statut. */
    agentAssigne(code: StatutSoumission): string;
    voirDocument(r: ReponseFormulaire, event: Event): void;
    fermerDocument(): void;
    ouvrirBordereau(d: SoumissionFormulaire, event: Event): void;
    fermerBordereau(): void;
    get copieOfficielle(): ReponseFormulaire | undefined;
    get documentsJoints(): ReponseFormulaire[];
    /** Numéro de bordereau généré à partir de la référence du dossier */
    get numeroBordereau(): string;
    get numeroBordereauFull(): string;
    etapeIndex(statut: StatutSoumission): number;
    avancerEtape(): void;
    rejeter(): void;
    confirmerPaiement(): void;
    statutClass(statut: string): string;
    statutLabel(statut: string): string;
}
//# sourceMappingURL=demandes-list.component.d.ts.map