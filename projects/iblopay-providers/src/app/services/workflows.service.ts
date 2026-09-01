import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Workflow, WorkflowEtape, CompteUtilisateur, DroitWorkflow } from '../models/provider.model';
import { MOCK_WORKFLOWS, MOCK_COMPTES } from '../data/mock-data';

export interface DroitCatalogueItem {
  code: DroitWorkflow;
  label: string;
  icon: string;
}

/** Catalogue des droits pouvant être accordés à un compte sur une étape de workflow. */
export const DROITS_CATALOGUE: DroitCatalogueItem[] = [
  { code: 'VOIR_DEMANDE', label: 'Voir les demandes arrivées à cette étape', icon: 'fa-solid fa-eye' },
  { code: 'VOIR_DOCUMENTS', label: 'Voir les documents / pièces jointes', icon: 'fa-solid fa-file' },
  { code: 'VALIDER', label: 'Valider / approuver le dossier', icon: 'fa-solid fa-check' },
  { code: 'REJETER', label: 'Rejeter le dossier', icon: 'fa-solid fa-xmark' },
  { code: 'MODIFIER_INFOS', label: 'Modifier les informations du dossier', icon: 'fa-solid fa-pen' },
  { code: 'ENCAISSER_PAIEMENT', label: 'Encaisser / confirmer un paiement', icon: 'fa-solid fa-money-bill' },
  { code: 'VOIR_STATISTIQUES', label: 'Consulter les statistiques du service', icon: 'fa-solid fa-chart-line' }
];

/** Rôles/postes suggérés pour accélérer la création des comptes (liste libre, modifiable). */
export const ROLES_SUGGERES: string[] = [
  'Secrétaire', 'Agent de vérification', 'Agent de traitement', 'Agent de guichet',
  'Validateur', 'Superviseur', 'Caissier', 'Chef de service', 'Autre'
];

@Injectable({ providedIn: 'root' })
export class WorkflowsService {
  private workflows: Workflow[] = [...MOCK_WORKFLOWS];
  private comptes: CompteUtilisateur[] = [...MOCK_COMPTES];
  private nextWorkflowId = Math.max(0, ...this.workflows.map(w => w.id)) + 1;
  private nextCompteId = Math.max(0, ...this.comptes.map(c => c.id)) + 1;

  constructor() {
    this.restaurerCatalogueDroitsPersonnalises();
  }

  // ─── WORKFLOWS ───────────────────────────────────────────
  getAll(): Observable<Workflow[]> {
    return of(this.workflows).pipe(delay(200));
  }

  getById(id: number): Observable<Workflow | undefined> {
    return this.getAll().pipe(map(list => list.find(w => w.id === id)));
  }

  getByServiceId(serviceId: number): Observable<Workflow | undefined> {
    return this.getAll().pipe(map(list => list.find(w => w.serviceId === serviceId)));
  }

  save(workflow: Workflow): Observable<Workflow> {
    if (workflow.id) {
      this.workflows = this.workflows.map(w => w.id === workflow.id ? { ...workflow } : w);
    } else {
      workflow.id = this.nextWorkflowId++;
      workflow.dateCreation = new Date();
      this.workflows = [workflow, ...this.workflows];
    }
    return of(workflow).pipe(delay(250));
  }

  toggleStatut(id: number): Observable<Workflow> {
    this.workflows = this.workflows.map(w => w.id === id ? { ...w, statut: w.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' } : w);
    return of(this.workflows.find(w => w.id === id)!).pipe(delay(150));
  }

  delete(id: number): Observable<void> {
    this.workflows = this.workflows.filter(w => w.id !== id);
    this.comptes = this.comptes.filter(c => c.workflowId !== id);
    return of(void 0).pipe(delay(150));
  }

  creerEtapeVide(ordre: number): WorkflowEtape {
    return {
      id: 'etape_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      nom: '',
      code: 'ETAPE_' + ordre,
      ordre,
      responsable: '',
      delaiHeures: 24,
      actions: ['Valider'],
      notifications: true,
      ceQuIlValide: '',
      comptesAssignesIds: []
    };
  }

  // ─── COMPTES (STAFF) ─────────────────────────────────────
  getAllComptes(): Observable<CompteUtilisateur[]> {
    return of(this.comptes).pipe(delay(200));
  }

  getComptesByWorkflow(workflowId: number): Observable<CompteUtilisateur[]> {
    return this.getAllComptes().pipe(map(list => list.filter(c => c.workflowId === workflowId)));
  }

  getComptesByEtape(etapeId: string): Observable<CompteUtilisateur[]> {
    return this.getAllComptes().pipe(map(list => list.filter(c => c.etapeId === etapeId)));
  }

  genererIdentifiant(prenom: string, nom: string): string {
    const norm = (s: string) => (s || '').trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z]/g, '');
    const base = `${norm(prenom)}.${norm(nom)}`;
    const existants = this.comptes.filter(c => c.identifiantConnexion.startsWith(base)).length;
    return existants > 0 ? `${base}${existants + 1}` : base;
  }

  creerCompte(compte: Partial<CompteUtilisateur>): Observable<CompteUtilisateur> {
    const created: CompteUtilisateur = {
      id: this.nextCompteId++,
      nom: compte.nom || '',
      prenom: compte.prenom || '',
      adresse: compte.adresse || '',
      telephone: compte.telephone || '',
      email: compte.email || '',
      role: compte.role || 'Autre',
      identifiantConnexion: compte.identifiantConnexion || this.genererIdentifiant(compte.prenom || '', compte.nom || ''),
      motDePasse: compte.motDePasse || '1234',
      statut: 'ACTIF',
      workflowId: compte.workflowId || 0,
      serviceId: compte.serviceId || 0,
      etapeId: compte.etapeId || '',
      etapeNom: compte.etapeNom || '',
      droits: compte.droits || ['VOIR_DEMANDE'],
      dateCreation: new Date()
    };
    this.comptes = [created, ...this.comptes];
    return of(created).pipe(delay(200));
  }

  modifierCompte(compte: CompteUtilisateur): Observable<CompteUtilisateur> {
    this.comptes = this.comptes.map(c => c.id === compte.id ? { ...compte } : c);
    return of(compte).pipe(delay(150));
  }

  toggleStatutCompte(id: number): Observable<CompteUtilisateur> {
    this.comptes = this.comptes.map(c => c.id === id ? { ...c, statut: c.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' } : c);
    return of(this.comptes.find(c => c.id === id)!).pipe(delay(150));
  }

  supprimerCompte(id: number): Observable<void> {
    this.comptes = this.comptes.filter(c => c.id !== id);
    return of(void 0).pipe(delay(150));
  }

  labelDroit(code: DroitWorkflow): string {
    return DROITS_CATALOGUE.find(d => d.code === code)?.label || code;
  }

  /**
   * Ajoute un droit personnalisé au catalogue (bouton « + » dans le builder de workflow),
   * pour les droits qui ne figurent pas encore dans la liste proposée par défaut.
   */
  ajouterDroitPersonnalise(libelle: string): DroitCatalogueItem {
    const code = ('CUSTOM_' + libelle.trim().toUpperCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')) as DroitWorkflow;

    const existant = DROITS_CATALOGUE.find(d => d.code === code);
    if (existant) return existant;

    const nouveau: DroitCatalogueItem = { code, label: libelle.trim(), icon: 'fa-solid fa-star' };
    DROITS_CATALOGUE.push(nouveau);
    this.sauvegarderCatalogueDroitsPersonnalises();
    return nouveau;
  }

  private sauvegarderCatalogueDroitsPersonnalises(): void {
    try {
      const personnalises = DROITS_CATALOGUE.filter(d => d.code.toString().startsWith('CUSTOM_'));
      localStorage.setItem('iblopay_providers_droits_personnalises', JSON.stringify(personnalises));
    } catch { /* stockage indisponible */ }
  }

  private restaurerCatalogueDroitsPersonnalises(): void {
    try {
      const brut = localStorage.getItem('iblopay_providers_droits_personnalises');
      if (!brut) return;
      const personnalises: DroitCatalogueItem[] = JSON.parse(brut);
      personnalises.forEach(d => {
        if (!DROITS_CATALOGUE.find(x => x.code === d.code)) DROITS_CATALOGUE.push(d);
      });
    } catch { /* stockage indisponible */ }
  }

  // ─── BROUILLONS DE WORKFLOW (sauvegarde en temps réel) ────────────
  // Permet de quitter le builder de workflow en cours de route et de
  // retrouver exactement où on en était à la réouverture, tant que le
  // workflow n'a pas été enregistré définitivement.
  private cleBrouillon(serviceId: number, workflowId: number): string {
    return `iblopay_providers_brouillon_workflow_${workflowId || 'nouveau'}_${serviceId}`;
  }

  sauvegarderBrouillonWorkflow(serviceId: number, workflowId: number, donnees: { workflow: Workflow; comptes: CompteUtilisateur[] }): void {
    try {
      localStorage.setItem(this.cleBrouillon(serviceId, workflowId), JSON.stringify({ ...donnees, dateSauvegarde: new Date() }));
    } catch { /* stockage indisponible */ }
  }

  chargerBrouillonWorkflow(serviceId: number, workflowId: number): { workflow: Workflow; comptes: CompteUtilisateur[]; dateSauvegarde: Date } | null {
    try {
      const brut = localStorage.getItem(this.cleBrouillon(serviceId, workflowId));
      if (!brut) return null;
      const data = JSON.parse(brut);
      return { ...data, dateSauvegarde: new Date(data.dateSauvegarde) };
    } catch {
      return null;
    }
  }

  effacerBrouillonWorkflow(serviceId: number, workflowId: number): void {
    try { localStorage.removeItem(this.cleBrouillon(serviceId, workflowId)); } catch { /* stockage indisponible */ }
  }

  /** Recherche un compte par identifiant + mot de passe (utilisé par l'authentification). */
  authentifier(identifiant: string, motDePasse: string): Observable<CompteUtilisateur | undefined> {
    return this.getAllComptes().pipe(
      map(list => list.find(c => c.identifiantConnexion === identifiant.trim() && c.motDePasse === motDePasse))
    );
  }

  reinitialiserMotDePasse(id: number, nouveauMotDePasse: string): Observable<CompteUtilisateur> {
    this.comptes = this.comptes.map(c => c.id === id ? { ...c, motDePasse: nouveauMotDePasse } : c);
    return of(this.comptes.find(c => c.id === id)!).pipe(delay(150));
  }
}
