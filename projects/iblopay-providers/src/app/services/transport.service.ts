import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Vehicule, Chauffeur, LigneBus, ZoneTaxi, StatsTransportGlobal, StatsParLigneOuZone, TrajetHistorique, IncidentTransport } from '../models/transport.model';
import { MOCK_VEHICULES, MOCK_CHAUFFEURS, MOCK_LIGNES_BUS, MOCK_ZONES_TAXI, MOCK_HISTORIQUE_TRAJETS, MOCK_INCIDENTS_TRANSPORT } from '../data/mock-transport-data';

@Injectable({ providedIn: 'root' })
export class TransportService {
  /** Tarif fixé par l'État pour le transport en commun (BIF par kilomètre). Non modifiable par l'admin. */
  readonly TARIF_ETAT_PAR_KM = 65;

  /** Calcule le tarif officiel d'un trajet de bus, arrondi aux 50 BIF les plus proches. */
  calculerTarifEtat(distanceKm: number): number {
    const brut = distanceKm * this.TARIF_ETAT_PAR_KM;
    return Math.max(300, Math.round(brut / 50) * 50);
  }

  private vehicules: Vehicule[] = [...MOCK_VEHICULES];
  private chauffeurs: Chauffeur[] = [...MOCK_CHAUFFEURS];
  private lignes: LigneBus[] = [...MOCK_LIGNES_BUS];
  private zones: ZoneTaxi[] = [...MOCK_ZONES_TAXI];
  private historique: TrajetHistorique[] = [...MOCK_HISTORIQUE_TRAJETS];
  private incidents: IncidentTransport[] = [...MOCK_INCIDENTS_TRANSPORT];

  private nextVehiculeId = Math.max(0, ...this.vehicules.map(v => v.id)) + 1;
  private nextChauffeurId = Math.max(0, ...this.chauffeurs.map(c => c.id)) + 1;
  private nextLigneId = Math.max(0, ...this.lignes.map(l => l.id)) + 1;
  private nextZoneId = Math.max(0, ...this.zones.map(z => z.id)) + 1;

  // ─── VÉHICULES ───────────────────────────────────────────
  getVehicules(): Observable<Vehicule[]> {
    return of(this.vehicules).pipe(delay(200));
  }

  getVehiculeById(id: number): Observable<Vehicule | undefined> {
    return this.getVehicules().pipe(map(list => list.find(v => v.id === id)));
  }

  creerVehicule(v: Partial<Vehicule>): Observable<Vehicule> {
    const created: Vehicule = {
      id: this.nextVehiculeId++,
      type: v.type || 'BUS',
      matricule: v.matricule || '',
      marqueModele: v.marqueModele || '',
      statut: v.statut || (v.type === 'TAXI' ? 'DISPONIBLE' : 'AU_DEPOT'),
      kilometrage: v.kilometrage || 0,
      motorisation: v.motorisation || 'DIESEL',
      consommationMoyenne100km: v.consommationMoyenne100km ?? (v.type === 'BUS' ? 19 : 7.5),
      dateMiseEnService: v.dateMiseEnService || new Date(),
      ...(v.capacite !== undefined ? { capacite: v.capacite } : {}),
      ...(v.chauffeurId !== undefined ? { chauffeurId: v.chauffeurId } : {}),
      ...(v.ligneId !== undefined ? { ligneId: v.ligneId } : {}),
      ...(v.zoneId !== undefined ? { zoneId: v.zoneId } : {}),
      ...(v.prochaineMaintenanceKm !== undefined ? { prochaineMaintenanceKm: v.prochaineMaintenanceKm } : {})
    };
    this.vehicules = [created, ...this.vehicules];
    return of(created).pipe(delay(200));
  }

  modifierVehicule(v: Vehicule): Observable<Vehicule> {
    this.vehicules = this.vehicules.map(x => x.id === v.id ? { ...v } : x);
    return of(v).pipe(delay(200));
  }

  supprimerVehicule(id: number): Observable<void> {
    this.vehicules = this.vehicules.filter(v => v.id !== id);
    return of(void 0).pipe(delay(150));
  }

  // ─── CHAUFFEURS ──────────────────────────────────────────
  getChauffeurs(): Observable<Chauffeur[]> {
    return of(this.chauffeurs).pipe(delay(200));
  }

  getChauffeurById(id: number): Observable<Chauffeur | undefined> {
    return this.getChauffeurs().pipe(map(list => list.find(c => c.id === id)));
  }

  creerChauffeur(c: Partial<Chauffeur>): Observable<Chauffeur> {
    const created: Chauffeur = {
      id: this.nextChauffeurId++,
      nom: c.nom || '',
      prenom: c.prenom || '',
      telephone: c.telephone || '',
      adresse: c.adresse || '',
      numeroPermis: c.numeroPermis || '',
      permisValidite: c.permisValidite || new Date(),
      statut: 'ACTIF',
      note: c.note || 0,
      nombreCourses: c.nombreCourses || 0,
      dateEmbauche: c.dateEmbauche || new Date(),
      ...(c.vehiculeId !== undefined ? { vehiculeId: c.vehiculeId } : {})
    };
    this.chauffeurs = [created, ...this.chauffeurs];
    return of(created).pipe(delay(200));
  }

  modifierChauffeur(c: Chauffeur): Observable<Chauffeur> {
    this.chauffeurs = this.chauffeurs.map(x => x.id === c.id ? { ...c } : x);
    return of(c).pipe(delay(200));
  }

  toggleStatutChauffeur(id: number): Observable<Chauffeur> {
    this.chauffeurs = this.chauffeurs.map(c => c.id === id ? { ...c, statut: c.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' } : c);
    return of(this.chauffeurs.find(c => c.id === id)!).pipe(delay(150));
  }

  supprimerChauffeur(id: number): Observable<void> {
    this.chauffeurs = this.chauffeurs.filter(c => c.id !== id);
    return of(void 0).pipe(delay(150));
  }

  // ─── LIGNES DE BUS ───────────────────────────────────────
  getLignes(): Observable<LigneBus[]> {
    return of(this.lignes).pipe(delay(200));
  }

  creerLigne(l: Partial<LigneBus>): Observable<LigneBus> {
    const created: LigneBus = {
      id: this.nextLigneId++,
      nom: l.nom || '',
      code: l.code || '',
      arrets: l.arrets || [],
      tarif: l.tarif || 0,
      distanceKm: l.distanceKm || 0,
      dureeMinutesEstimee: l.dureeMinutesEstimee || 0,
      frequenceMinutes: l.frequenceMinutes || 15,
      statut: l.statut || 'ACTIVE'
    };
    this.lignes = [created, ...this.lignes];
    return of(created).pipe(delay(200));
  }

  modifierLigne(l: LigneBus): Observable<LigneBus> {
    this.lignes = this.lignes.map(x => x.id === l.id ? { ...l } : x);
    return of(l).pipe(delay(200));
  }

  supprimerLigne(id: number): Observable<void> {
    this.lignes = this.lignes.filter(l => l.id !== id);
    return of(void 0).pipe(delay(150));
  }

  // ─── ZONES TAXI ──────────────────────────────────────────
  getZones(): Observable<ZoneTaxi[]> {
    return of(this.zones).pipe(delay(200));
  }

  creerZone(z: Partial<ZoneTaxi>): Observable<ZoneTaxi> {
    const created: ZoneTaxi = {
      id: this.nextZoneId++,
      nom: z.nom || '',
      tarification: z.tarification || 'COMPTEUR',
      tarifBase: z.tarifBase || 0,
      statut: z.statut || 'ACTIVE',
      ...(z.tarifParKm !== undefined ? { tarifParKm: z.tarifParKm } : {}),
      ...(z.forfaitMoyen !== undefined ? { forfaitMoyen: z.forfaitMoyen } : {})
    };
    this.zones = [created, ...this.zones];
    return of(created).pipe(delay(200));
  }

  modifierZone(z: ZoneTaxi): Observable<ZoneTaxi> {
    this.zones = this.zones.map(x => x.id === z.id ? { ...z } : x);
    return of(z).pipe(delay(200));
  }

  supprimerZone(id: number): Observable<void> {
    this.zones = this.zones.filter(z => z.id !== id);
    return of(void 0).pipe(delay(150));
  }

  // ─── STATISTIQUES ────────────────────────────────────────
  getStatsGlobal(): Observable<StatsTransportGlobal> {
    const actifs = this.vehicules.filter(v => v.statut === 'EN_SERVICE' || v.statut === 'DISPONIBLE' || v.statut === 'EN_COURSE').length;
    const stats: StatsTransportGlobal = {
      totalVehicules: this.vehicules.length,
      vehiculesActifs: actifs,
      totalChauffeurs: this.chauffeurs.filter(c => c.statut === 'ACTIF').length,
      coursesAujourdhui: 246,
      revenuAujourdhui: 2340000,
      distanceTotaleKm: this.vehicules.reduce((sum, v) => sum + v.kilometrage, 0),
      tauxOccupationMoyen: 68,
      incidentsOuverts: 2
    };
    return of(stats).pipe(delay(150));
  }

  getStatsParLigneOuZone(): Observable<StatsParLigneOuZone[]> {
    const statsLignes: StatsParLigneOuZone[] = this.lignes.filter(l => l.statut === 'ACTIVE').map((l, i) => ({
      id: l.id, nom: l.nom, type: 'BUS', courses: 80 + i * 12, revenu: (80 + i * 12) * l.tarif, tauxOccupation: 55 + i * 8
    }));
    const statsZones: StatsParLigneOuZone[] = this.zones.filter(z => z.statut === 'ACTIVE').map((z, i) => ({
      id: z.id, nom: z.nom, type: 'TAXI', courses: 40 + i * 20, revenu: (40 + i * 20) * (z.tarifBase + (z.tarifParKm || 0) * 6), tauxOccupation: 60 + i * 5
    }));
    return of([...statsLignes, ...statsZones]).pipe(delay(150));
  }

  // ─── HISTORIQUE DES TRAJETS ──────────────────────────────
  getHistorique(): Observable<TrajetHistorique[]> {
    return of(this.historique).pipe(delay(200));
  }

  getHistoriqueParLigne(ligneId: number): Observable<TrajetHistorique[]> {
    return this.getHistorique().pipe(map(list =>
      list.filter(h => h.ligneId === ligneId).sort((a, b) => b.date.getTime() - a.date.getTime())
    ));
  }

  getHistoriqueParZone(zoneId: number): Observable<TrajetHistorique[]> {
    return this.getHistorique().pipe(map(list =>
      list.filter(h => h.zoneId === zoneId).sort((a, b) => b.date.getTime() - a.date.getTime())
    ));
  }

  /** Vrai si un véhicule de cette ligne a une course EN_COURS actuellement (utilisé pour badge de statut). */
  ligneEstEnCours(ligneId: number, vehiculesEnCourseIds: number[]): boolean {
    return this.vehicules.some(v => v.ligneId === ligneId && vehiculesEnCourseIds.includes(v.id));
  }

  // ─── INCIDENTS ────────────────────────────────────────────
  getIncidents(): Observable<IncidentTransport[]> {
    return of(this.incidents).pipe(delay(150));
  }
}
