import { Observable } from 'rxjs';
import { Workflow, WorkflowEtape, CompteUtilisateur, DroitWorkflow } from '../models/provider.model';
export interface DroitCatalogueItem {
    code: DroitWorkflow;
    label: string;
    icon: string;
}
/** Catalogue des droits pouvant être accordés à un compte sur une étape de workflow. */
export declare const DROITS_CATALOGUE: DroitCatalogueItem[];
/** Rôles/postes suggérés pour accélérer la création des comptes (liste libre, modifiable). */
export declare const ROLES_SUGGERES: string[];
export declare class WorkflowsService {
    private workflows;
    private comptes;
    private nextWorkflowId;
    private nextCompteId;
    constructor();
    getAll(): Observable<Workflow[]>;
    getById(id: number): Observable<Workflow | undefined>;
    getByServiceId(serviceId: number): Observable<Workflow | undefined>;
    save(workflow: Workflow): Observable<Workflow>;
    toggleStatut(id: number): Observable<Workflow>;
    delete(id: number): Observable<void>;
    creerEtapeVide(ordre: number): WorkflowEtape;
    getAllComptes(): Observable<CompteUtilisateur[]>;
    getComptesByWorkflow(workflowId: number): Observable<CompteUtilisateur[]>;
    getComptesByEtape(etapeId: string): Observable<CompteUtilisateur[]>;
    genererIdentifiant(prenom: string, nom: string): string;
    creerCompte(compte: Partial<CompteUtilisateur>): Observable<CompteUtilisateur>;
    modifierCompte(compte: CompteUtilisateur): Observable<CompteUtilisateur>;
    toggleStatutCompte(id: number): Observable<CompteUtilisateur>;
    supprimerCompte(id: number): Observable<void>;
    labelDroit(code: DroitWorkflow): string;
    /**
     * Ajoute un droit personnalisé au catalogue (bouton « + » dans le builder de workflow),
     * pour les droits qui ne figurent pas encore dans la liste proposée par défaut.
     */
    ajouterDroitPersonnalise(libelle: string): DroitCatalogueItem;
    private sauvegarderCatalogueDroitsPersonnalises;
    private restaurerCatalogueDroitsPersonnalises;
    private cleBrouillon;
    sauvegarderBrouillonWorkflow(serviceId: number, workflowId: number, donnees: {
        workflow: Workflow;
        comptes: CompteUtilisateur[];
    }): void;
    chargerBrouillonWorkflow(serviceId: number, workflowId: number): {
        workflow: Workflow;
        comptes: CompteUtilisateur[];
        dateSauvegarde: Date;
    } | null;
    effacerBrouillonWorkflow(serviceId: number, workflowId: number): void;
    /** Recherche un compte par identifiant + mot de passe (utilisé par l'authentification). */
    authentifier(identifiant: string, motDePasse: string): Observable<CompteUtilisateur | undefined>;
    reinitialiserMotDePasse(id: number, nouveauMotDePasse: string): Observable<CompteUtilisateur>;
}
//# sourceMappingURL=workflows.service.d.ts.map