import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowsService, DroitCatalogueItem } from '../../services/workflows.service';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { ActiviteService } from '../../services/activite.service';
import { Workflow, WorkflowEtape, CompteUtilisateur, ServiceInstitution, DroitWorkflow } from '../../models/provider.model';
type EtapeBuilder = 'infos' | 'etapes' | 'comptes' | 'finalisation';
/** Formulaire d'ajout d'un compte pour une étape donnée (état volatile du modal). */
interface CompteFormState {
    etapeId: string;
    id?: number;
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    email: string;
    role: string;
    motDePasse: string;
    confirmationMotDePasse: string;
    droits: DroitWorkflow[];
}
export declare class WorkflowBuilderComponent implements OnInit, OnDestroy {
    private workflowsService;
    private servicesService;
    private route;
    private router;
    private toastService;
    private activiteService;
    etapeBuilder: EtapeBuilder;
    services: ServiceInstitution[];
    rolesSuggeres: string[];
    droitsCatalogue: DroitCatalogueItem[];
    isEdit: boolean;
    isSaving: boolean;
    workflow: Workflow;
    /** Comptes du workflow, groupés en mémoire pendant l'édition (persistés à l'enregistrement). */
    comptes: CompteUtilisateur[];
    etapeActiveId: string | null;
    showCompteModal: boolean;
    compteEnEdition: CompteFormState | null;
    showMotDePasse: boolean;
    /** Horodatage de la dernière sauvegarde automatique du brouillon, affiché à l'utilisateur. */
    derniereSauvegardeBrouillon: Date | null;
    private autosaveTimer;
    /** Affichage du champ d'ajout d'un droit personnalisé (bouton « + »). */
    showAjoutDroitPersonnalise: boolean;
    nouveauDroitLibelle: string;
    constructor(workflowsService: WorkflowsService, servicesService: ServicesService, route: ActivatedRoute, router: Router, toastService: ToastService, activiteService: ActiviteService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Sauvegarde automatiquement le brouillon en cours toutes les quelques secondes. */
    private demarrerAutosave;
    /** Sauvegarde immédiate du brouillon (aussi déclenchée manuellement par l'utilisateur). */
    sauvegarderBrouillon(): void;
    /** Restaure un brouillon existant pour ce service/workflow, s'il y en a un. Renvoie true si restauré. */
    private restaurerBrouillonSiPresent;
    get serviceSelectionne(): ServiceInstitution | undefined;
    allerA(etape: EtapeBuilder): void;
    ajouterEtape(): void;
    supprimerEtape(index: number): void;
    deplacerEtape(index: number, direction: -1 | 1): void;
    comptesPourEtape(etapeId: string): CompteUtilisateur[];
    get etapeActive(): WorkflowEtape | undefined;
    ouvrirNouveauCompte(): void;
    modifierCompte(c: CompteUtilisateur): void;
    fermerCompteModal(): void;
    toggleDroit(droit: DroitWorkflow): void;
    compteADroit(droit: DroitWorkflow): boolean;
    ouvrirAjoutDroitPersonnalise(): void;
    annulerAjoutDroitPersonnalise(): void;
    confirmerAjoutDroitPersonnalise(): void;
    enregistrerCompte(): void;
    supprimerCompte(c: CompteUtilisateur): void;
    labelDroit(code: DroitWorkflow): string;
    get peutEnregistrer(): boolean;
    enregistrer(): void;
    private finaliserEnregistrement;
}
export {};
//# sourceMappingURL=workflow-builder.component.d.ts.map