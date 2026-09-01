import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { WorkflowsService } from '../services/workflows.service';
import { DroitWorkflow } from '../models/provider.model';

/** Identifiants de l'administrateur des SERVICES (services, workflows, comptes, demandes...). */
export const ADMIN_SERVICES_IDENTIFIANT = '72483021';
export const ADMIN_SERVICES_PIN = '1234';

/** Identifiants de l'administrateur TRANSPORT (bus & taxis). */
export const ADMIN_TRANSPORT_IDENTIFIANT = '67391031';
export const ADMIN_TRANSPORT_PIN = '1234';

/** Identifiants de l'administrateur ÉVÉNEMENTS (matchs, concerts, conférences...). */
export const ADMIN_EVENEMENTS_IDENTIFIANT = '64001001';
export const ADMIN_EVENEMENTS_PIN = '1234';

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

const CLE_SESSION = 'iblopay_providers_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private utilisateurSubject = new BehaviorSubject<UtilisateurConnecte | null>(this.restaurerSession());
  utilisateur$ = this.utilisateurSubject.asObservable();

  constructor(private workflowsService: WorkflowsService) {}

  get utilisateurActuel(): UtilisateurConnecte | null {
    return this.utilisateurSubject.value;
  }

  get estConnecte(): boolean {
    return !!this.utilisateurActuel;
  }

  get estAdmin(): boolean {
    return this.utilisateurActuel?.type === 'ADMIN';
  }

  get estAdminServices(): boolean {
    return this.estAdmin && this.utilisateurActuel?.secteur === 'SERVICES';
  }

  get estAdminTransport(): boolean {
    return this.estAdmin && this.utilisateurActuel?.secteur === 'TRANSPORT';
  }

  get estAdminEvenements(): boolean {
    return this.estAdmin && this.utilisateurActuel?.secteur === 'EVENEMENTS';
  }

  /** Vérifie si l'utilisateur connecté possède un droit donné (l'admin services a implicitement tous les droits). */
  aLeDroit(droit: DroitWorkflow): boolean {
    const u = this.utilisateurActuel;
    if (!u) return false;
    if (u.type === 'ADMIN') return u.secteur === 'SERVICES';
    return u.droits.includes(droit);
  }

  connecter(identifiant: string, motDePasse: string): Observable<ResultatConnexion> {
    const id = (identifiant || '').trim();
    const mdp = (motDePasse || '').trim();

    if (!id || !mdp) {
      return of({ succes: false, message: 'Veuillez renseigner votre identifiant et votre mot de passe.' }).pipe(delay(200));
    }

    if (id === ADMIN_SERVICES_IDENTIFIANT && mdp === ADMIN_SERVICES_PIN) {
      const utilisateur: UtilisateurConnecte = {
        type: 'ADMIN', id: 'admin', nom: 'Administrateur Services', role: 'Administrateur', identifiant: id, droits: [], secteur: 'SERVICES'
      };
      this.definirSession(utilisateur);
      return of({ succes: true, utilisateur }).pipe(delay(300));
    }

    if (id === ADMIN_TRANSPORT_IDENTIFIANT && mdp === ADMIN_TRANSPORT_PIN) {
      const utilisateur: UtilisateurConnecte = {
        type: 'ADMIN', id: 'admin', nom: 'Administrateur Transport', role: 'Administrateur Transport', identifiant: id, droits: [], secteur: 'TRANSPORT'
      };
      this.definirSession(utilisateur);
      return of({ succes: true, utilisateur }).pipe(delay(300));
    }

    if (id === ADMIN_EVENEMENTS_IDENTIFIANT && mdp === ADMIN_EVENEMENTS_PIN) {
      const utilisateur: UtilisateurConnecte = {
        type: 'ADMIN', id: 'admin', nom: 'Administrateur Événements', role: 'Administrateur Événements', identifiant: id, droits: [], secteur: 'EVENEMENTS'
      };
      this.definirSession(utilisateur);
      return of({ succes: true, utilisateur }).pipe(delay(300));
    }

    return this.workflowsService.authentifier(id, mdp).pipe(
      delay(300),
      map(compte => {
        if (!compte) {
          return { succes: false, message: 'Identifiant ou mot de passe incorrect.' };
        }
        if (compte.statut !== 'ACTIF') {
          return { succes: false, message: 'Ce compte a été désactivé. Contactez votre administrateur.' };
        }
        const utilisateur: UtilisateurConnecte = {
          type: 'COMPTE', id: compte.id, nom: compte.nom, prenom: compte.prenom, role: compte.role,
          identifiant: compte.identifiantConnexion, droits: compte.droits, secteur: 'SERVICES',
          serviceId: compte.serviceId, workflowId: compte.workflowId, etapeId: compte.etapeId, etapeNom: compte.etapeNom || ''
        };
        this.definirSession(utilisateur);
        return { succes: true, utilisateur };
      })
    );
  }

  deconnecter(): void {
    try { localStorage.removeItem(CLE_SESSION); } catch { /* SSR ou stockage indisponible */ }
    this.utilisateurSubject.next(null);
  }

  private definirSession(u: UtilisateurConnecte): void {
    try { localStorage.setItem(CLE_SESSION, JSON.stringify(u)); } catch { /* SSR ou stockage indisponible */ }
    this.utilisateurSubject.next(u);
  }

  private restaurerSession(): UtilisateurConnecte | null {
    try {
      const brut = localStorage.getItem(CLE_SESSION);
      return brut ? JSON.parse(brut) : null;
    } catch {
      return null;
    }
  }
}
