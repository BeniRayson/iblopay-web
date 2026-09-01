import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Lieu, Organisateur, Evenement, StatsEvenementsGlobal, StatsParEvenement, VenteHistorique, ReclamationEvenement } from '../models/evenements.model';
import { MOCK_LIEUX, MOCK_ORGANISATEURS, MOCK_EVENEMENTS, MOCK_HISTORIQUE_VENTES, MOCK_RECLAMATIONS_EVENEMENTS } from '../data/mock-events-data';

@Injectable({ providedIn: 'root' })
export class EvenementsService {
  private lieux: Lieu[] = [...MOCK_LIEUX];
  private organisateurs: Organisateur[] = [...MOCK_ORGANISATEURS];
  private evenements: Evenement[] = [...MOCK_EVENEMENTS];
  private historique: VenteHistorique[] = [...MOCK_HISTORIQUE_VENTES];
  private reclamations: ReclamationEvenement[] = [...MOCK_RECLAMATIONS_EVENEMENTS];
  private typesLieux: string[] = ['Stade', 'Salle de concert', 'Salle de conférence', 'Plein air', 'Autre'];

  private nextLieuId = Math.max(0, ...this.lieux.map(l => l.id)) + 1;
  private nextOrganisateurId = Math.max(0, ...this.organisateurs.map(o => o.id)) + 1;
  private nextEvenementId = Math.max(0, ...this.evenements.map(e => e.id)) + 1;

  // ─── TYPES DE LIEUX (extensibles) ─────────────────────────
  getTypesLieux(): Observable<string[]> {
    return of(this.typesLieux).pipe(delay(100));
  }

  ajouterTypeLieu(nom: string): void {
    const propre = nom.trim();
    if (propre && !this.typesLieux.some(t => t.toLowerCase() === propre.toLowerCase())) {
      this.typesLieux = [...this.typesLieux, propre];
    }
  }

  // ─── LIEUX ───────────────────────────────────────────────
  getLieux(): Observable<Lieu[]> {
    return of(this.lieux).pipe(delay(200));
  }

  creerLieu(l: Partial<Lieu>): Observable<Lieu> {
    const created: Lieu = {
      id: this.nextLieuId++, nom: l.nom || '', ville: l.ville || '', adresse: l.adresse || '',
      type: l.type || 'Autre', capaciteMax: l.capaciteMax || 0, statut: l.statut || 'ACTIF'
    };
    if (created.type) this.ajouterTypeLieu(created.type);
    this.lieux = [created, ...this.lieux];
    return of(created).pipe(delay(200));
  }

  modifierLieu(l: Lieu): Observable<Lieu> {
    this.lieux = this.lieux.map(x => x.id === l.id ? { ...l } : x);
    return of(l).pipe(delay(200));
  }

  supprimerLieu(id: number): Observable<void> {
    this.lieux = this.lieux.filter(l => l.id !== id);
    return of(void 0).pipe(delay(150));
  }

  toggleStatutLieu(l: Lieu): Observable<Lieu> {
    return this.modifierLieu({ ...l, statut: l.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' });
  }

  // ─── ORGANISATEURS ───────────────────────────────────────
  getOrganisateurs(): Observable<Organisateur[]> {
    return of(this.organisateurs).pipe(delay(200));
  }

  creerOrganisateur(o: Partial<Organisateur>): Observable<Organisateur> {
    const created: Organisateur = {
      id: this.nextOrganisateurId++, nom: o.nom || '', prenom: o.prenom || '', telephone: o.telephone || '',
      adresse: o.adresse || '', statut: 'ACTIF',
      nombreEvenements: o.nombreEvenements || 0, revenuTotal: o.revenuTotal || 0, dateInscription: new Date(),
      ...(o.entreprise !== undefined ? { entreprise: o.entreprise } : {}),
      ...(o.email !== undefined ? { email: o.email } : {})
    };
    this.organisateurs = [created, ...this.organisateurs];
    return of(created).pipe(delay(200));
  }

  modifierOrganisateur(o: Organisateur): Observable<Organisateur> {
    this.organisateurs = this.organisateurs.map(x => x.id === o.id ? { ...o } : x);
    return of(o).pipe(delay(200));
  }

  toggleStatutOrganisateur(id: number): Observable<Organisateur> {
    this.organisateurs = this.organisateurs.map(o => o.id === id ? { ...o, statut: o.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' } : o);
    return of(this.organisateurs.find(o => o.id === id)!).pipe(delay(150));
  }

  supprimerOrganisateur(id: number): Observable<void> {
    this.organisateurs = this.organisateurs.filter(o => o.id !== id);
    return of(void 0).pipe(delay(150));
  }

  // ─── ÉVÉNEMENTS ──────────────────────────────────────────
  getEvenements(): Observable<Evenement[]> {
    return of(this.evenements).pipe(delay(200));
  }

  getEvenementById(id: number): Observable<Evenement | undefined> {
    return this.getEvenements().pipe(map(list => list.find(e => e.id === id)));
  }

  creerEvenement(e: Partial<Evenement>): Observable<Evenement> {
    const created: Evenement = {
      id: this.nextEvenementId++, nom: e.nom || '', type: e.type || 'AUTRE', lieuId: e.lieuId || 0,
      organisateurId: e.organisateurId || 0, dateDebut: e.dateDebut || new Date(), dateFin: e.dateFin || new Date(),
      description: e.description || '', capaciteTotale: e.capaciteTotale || 0,
      categoriesBillets: e.categoriesBillets || [], statut: e.statut || 'PROGRAMME', dateCreation: new Date()
    };
    this.evenements = [created, ...this.evenements];
    return of(created).pipe(delay(200));
  }

  modifierEvenement(e: Evenement): Observable<Evenement> {
    this.evenements = this.evenements.map(x => x.id === e.id ? { ...e } : x);
    return of(e).pipe(delay(200));
  }

  supprimerEvenement(id: number): Observable<void> {
    this.evenements = this.evenements.filter(e => e.id !== id);
    return of(void 0).pipe(delay(150));
  }

  toggleStatutEvenement(e: Evenement, statut: Evenement['statut']): Observable<Evenement> {
    return this.modifierEvenement({ ...e, statut });
  }

  // ─── STATISTIQUES ────────────────────────────────────────
  getStatsGlobal(): Observable<StatsEvenementsGlobal> {
    const actifs = this.evenements.filter(e => e.statut === 'PROGRAMME' || e.statut === 'EN_COURS').length;
    const billetsVendusTotal = this.evenements.reduce((sum, e) =>
      sum + e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue, 0), 0);
    const revenuTotal = this.evenements.reduce((sum, e) =>
      sum + e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue * c.prix, 0), 0);
    const capaciteTotale = this.evenements.reduce((sum, e) => sum + e.capaciteTotale, 0);

    const stats: StatsEvenementsGlobal = {
      totalEvenements: this.evenements.length,
      evenementsActifs: actifs,
      totalOrganisateurs: this.organisateurs.filter(o => o.statut === 'ACTIF').length,
      billetsVendusAujourdhui: Math.round(billetsVendusTotal * 0.04) || 32,
      revenuAujourdhui: Math.round(revenuTotal * 0.04) || 480000,
      tauxRemplissageMoyen: capaciteTotale ? Math.round((billetsVendusTotal / capaciteTotale) * 100) : 0,
      reclamationsOuvertes: this.reclamations.filter(r => r.statut !== 'RESOLU').length
    };
    return of(stats).pipe(delay(150));
  }

  getStatsParEvenement(): Observable<StatsParEvenement[]> {
    const stats: StatsParEvenement[] = this.evenements.map(e => {
      const billetsVendus = e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue, 0);
      const revenu = e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue * c.prix, 0);
      return {
        id: e.id, nom: e.nom, type: e.type, billetsVendus, revenu,
        tauxRemplissage: e.capaciteTotale ? Math.round((billetsVendus / e.capaciteTotale) * 100) : 0
      };
    });
    return of(stats).pipe(delay(150));
  }

  // ─── HISTORIQUE DES VENTES ───────────────────────────────
  getHistorique(): Observable<VenteHistorique[]> {
    return of(this.historique).pipe(delay(200));
  }

  getHistoriqueParEvenement(evenementId: number): Observable<VenteHistorique[]> {
    return this.getHistorique().pipe(map(list =>
      list.filter(h => h.evenementId === evenementId).sort((a, b) => b.date.getTime() - a.date.getTime())
    ));
  }

  // ─── RÉCLAMATIONS ────────────────────────────────────────
  getReclamations(): Observable<ReclamationEvenement[]> {
    return of(this.reclamations).pipe(delay(150));
  }
}
