import { Observable } from 'rxjs';
import { WorkflowsService } from '../services/workflows.service';
import { DroitWorkflow } from '../models/provider.model';
/** Identifiants de l'administrateur des SERVICES (services, workflows, comptes, demandes...). */
export declare const ADMIN_SERVICES_IDENTIFIANT = "72483021";
export declare const ADMIN_SERVICES_PIN = "1234";
/** Identifiants de l'administrateur TRANSPORT (bus & taxis). */
export declare const ADMIN_TRANSPORT_IDENTIFIANT = "67391031";
export declare const ADMIN_TRANSPORT_PIN = "1234";
/** Identifiants de l'administrateur ÉVÉNEMENTS (matchs, concerts, conférences...). */
export declare const ADMIN_EVENEMENTS_IDENTIFIANT = "64001001";
export declare const ADMIN_EVENEMENTS_PIN = "1234";
export type Secteur = 'SERVICES' | 'TRANSPORT' | 'EVENEMENTS';
export interface UtilisateurConnecte {
    type: 'ADMIN' | 'COMPTE';
    id: number | 'admin';
    nom: string;
    prenom?: string;
    role: string;
    identifiant: string;
    droits: DroitWorkflow[];
    /** Détermine à quel espace (Services ou Transport) cet utilisateur a accès. */
    secteur: Secteur;
    serviceId?: number;
    workflowId?: number;
    etapeId?: string;
    etapeNom?: string;
}
export interface ResultatConnexion {
    succes: boolean;
    message?: string;
    utilisateur?: UtilisateurConnecte;
}
export declare class AuthService {
    private workflowsService;
    private utilisateurSubject;
    utilisateur$: Observable<UtilisateurConnecte | null>;
    constructor(workflowsService: WorkflowsService);
    get utilisateurActuel(): UtilisateurConnecte | null;
    get estConnecte(): boolean;
    get estAdmin(): boolean;
    get estAdminServices(): boolean;
    get estAdminTransport(): boolean;
    get estAdminEvenements(): boolean;
    /** Vérifie si l'utilisateur connecté possède un droit donné (l'admin services a implicitement tous les droits). */
    aLeDroit(droit: DroitWorkflow): boolean;
    connecter(identifiant: string, motDePasse: string): Observable<ResultatConnexion>;
    deconnecter(): void;
    private definirSession;
    private restaurerSession;
}
//# sourceMappingURL=auth.service.d.ts.map