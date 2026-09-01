import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService } from '../../services/transport.service';
import { CoursesService } from '../../services/courses.service';
import { LigneBus, ZoneTaxi, TarificationTaxi, Vehicule, Chauffeur, TrajetHistorique, Course } from '../../models/transport.model';
import { ToastService } from '../../core/toast.service';

interface LigneFormState {
  id?: number;
  nom: string;
  code: string;
  arrets: string[];
  tarif: number;
  distanceKm: number;
  dureeMinutesEstimee: number;
  frequenceMinutes: number;
  statut: 'ACTIVE' | 'INACTIVE';
}

interface ZoneFormState {
  id?: number;
  nom: string;
  tarification: TarificationTaxi;
  tarifBase: number;
  tarifParKm: number | null;
  forfaitMoyen: number | null;
  statut: 'ACTIVE' | 'INACTIVE';
}

@Component({
  selector: 'app-lignes-tarifs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lignes-tarifs.component.html',
  styleUrl: './lignes-tarifs.component.scss'
})
export class LignesTarifsComponent implements OnInit {
  vueActive: 'LIGNES' | 'ZONES' = 'LIGNES';
  lignes: LigneBus[] = [];
  zones: ZoneTaxi[] = [];
  vehicules: Vehicule[] = [];
  chauffeurs: Chauffeur[] = [];
  coursesActives: Course[] = [];
  isLoading = true;

  showLigneModal = false;
  ligneForm: LigneFormState | null = null;
  nouvelArret = '';

  showZoneModal = false;
  zoneForm: ZoneFormState | null = null;

  // ─── DÉTAILS D'UN TRAJET (bus ou zone) ─────────────────────
  ligneDetailAffichee: LigneBus | null = null;
  zoneDetailAffichee: ZoneTaxi | null = null;

  // ─── HISTORIQUE (avec pagination) ──────────────────────────
  historiqueOuvert = false;
  historiqueTitre = '';
  historiqueLignes: TrajetHistorique[] = [];
  historiquePage = 1;
  historiquePageSize = 10;

  constructor(
    private transportService: TransportService,
    private coursesService: CoursesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.charger();
    this.coursesService.getAll().subscribe(courses => this.coursesActives = courses);
  }

  charger(): void {
    this.isLoading = true;
    this.transportService.getVehicules().subscribe(v => this.vehicules = v);
    this.transportService.getChauffeurs().subscribe(c => this.chauffeurs = c);
    this.transportService.getLignes().subscribe(l => {
      this.lignes = l;
      this.transportService.getZones().subscribe(z => {
        this.zones = z;
        this.isLoading = false;
      });
    });
  }

  changerVue(vue: 'LIGNES' | 'ZONES'): void {
    this.vueActive = vue;
  }

  // ─── STATUT EN COURS / TERMINÉ ───────────────────────────
  /** Véhicules actuellement EN_COURS sur cette ligne (permet le badge de statut + affichage détail). */
  vehiculesEnCoursPourLigne(ligneId: number): Vehicule[] {
    const vehiculeIdsEnCourse = new Set(
      this.coursesActives.filter(c => c.statut === 'EN_COURS' && c.type === 'BUS').map(c => c.vehiculeId)
    );
    return this.vehicules.filter(v => v.ligneId === ligneId && v.id !== undefined && vehiculeIdsEnCourse.has(v.id));
  }

  ligneEnCours(ligneId: number): boolean {
    return this.vehiculesEnCoursPourLigne(ligneId).length > 0;
  }

  vehiculesEnCoursPourZone(zoneId: number): Vehicule[] {
    const vehiculeIdsEnCourse = new Set(
      this.coursesActives.filter(c => c.statut === 'EN_COURS' && c.type === 'TAXI').map(c => c.vehiculeId)
    );
    return this.vehicules.filter(v => v.zoneId === zoneId && v.id !== undefined && vehiculeIdsEnCourse.has(v.id));
  }

  zoneEnCours(zoneId: number): boolean {
    return this.vehiculesEnCoursPourZone(zoneId).length > 0;
  }

  // ─── VÉHICULES / CHAUFFEURS ASSIGNÉS (pour le détail) ────
  vehiculesDeLaLigne(ligneId: number): Vehicule[] {
    return this.vehicules.filter(v => v.ligneId === ligneId);
  }

  vehiculesDeLaZone(zoneId: number): Vehicule[] {
    return this.vehicules.filter(v => v.zoneId === zoneId);
  }

  nomChauffeur(id?: number): string {
    if (!id) return 'Aucun chauffeur assigné';
    const c = this.chauffeurs.find(x => x.id === id);
    return c ? `${c.prenom} ${c.nom}` : 'Aucun chauffeur assigné';
  }

  // ─── DÉTAIL D'UN TRAJET ───────────────────────────────────
  voirDetailLigne(l: LigneBus): void {
    this.ligneDetailAffichee = l;
  }

  fermerDetailLigne(): void {
    this.ligneDetailAffichee = null;
  }

  voirDetailZone(z: ZoneTaxi): void {
    this.zoneDetailAffichee = z;
  }

  fermerDetailZone(): void {
    this.zoneDetailAffichee = null;
  }

  // ─── HISTORIQUE PAGINÉ ────────────────────────────────────
  ouvrirHistoriqueLigne(l: LigneBus): void {
    this.historiqueTitre = `Historique du trajet « ${l.nom} »`;
    this.historiquePage = 1;
    this.transportService.getHistoriqueParLigne(l.id).subscribe(h => {
      this.historiqueLignes = h;
      this.historiqueOuvert = true;
    });
  }

  ouvrirHistoriqueZone(z: ZoneTaxi): void {
    this.historiqueTitre = `Historique de la zone « ${z.nom} »`;
    this.historiquePage = 1;
    this.transportService.getHistoriqueParZone(z.id).subscribe(h => {
      this.historiqueLignes = h;
      this.historiqueOuvert = true;
    });
  }

  fermerHistorique(): void {
    this.historiqueOuvert = false;
    this.historiqueLignes = [];
  }

  get historiqueRevenuTotal(): number {
    return this.historiqueLignes.filter(h => h.statut === 'TERMINE').reduce((sum, h) => sum + h.revenu, 0);
  }

  get historiqueTrajetsTermines(): number {
    return this.historiqueLignes.filter(h => h.statut === 'TERMINE').length;
  }

  get historiqueTotalPages(): number {
    return Math.ceil(this.historiqueLignes.length / this.historiquePageSize) || 1;
  }

  get historiquePagine(): TrajetHistorique[] {
    const start = (this.historiquePage - 1) * this.historiquePageSize;
    return this.historiqueLignes.slice(start, start + this.historiquePageSize);
  }

  changerPageHistorique(page: number): void {
    if (page >= 1 && page <= this.historiqueTotalPages) this.historiquePage = page;
  }

  // ─── LIGNES DE BUS (CRUD) ─────────────────────────────────
  ouvrirNouvelleLigne(): void {
    this.ligneForm = { nom: '', code: '', arrets: [], tarif: this.transportService.calculerTarifEtat(10), distanceKm: 10, dureeMinutesEstimee: 30, frequenceMinutes: 15, statut: 'ACTIVE' };
    this.nouvelArret = '';
    this.showLigneModal = true;
  }

  modifierLigne(l: LigneBus): void {
    this.ligneForm = { id: l.id, nom: l.nom, code: l.code, arrets: [...l.arrets], tarif: l.tarif, distanceKm: l.distanceKm, dureeMinutesEstimee: l.dureeMinutesEstimee, frequenceMinutes: l.frequenceMinutes, statut: l.statut };
    this.nouvelArret = '';
    this.showLigneModal = true;
  }

  /** Le tarif est fixé par l'État (barème officiel) : recalculé automatiquement à chaque changement de distance, jamais saisi à la main. */
  recalculerTarifEtat(): void {
    if (!this.ligneForm) return;
    this.ligneForm.tarif = this.transportService.calculerTarifEtat(this.ligneForm.distanceKm);
  }

  get tarifParKmEtat(): number {
    return this.transportService.TARIF_ETAT_PAR_KM;
  }

  fermerLigneModal(): void {
    this.showLigneModal = false;
    this.ligneForm = null;
  }

  ajouterArret(): void {
    if (!this.ligneForm || !this.nouvelArret.trim()) return;
    this.ligneForm.arrets.push(this.nouvelArret.trim());
    this.nouvelArret = '';
  }

  supprimerArret(index: number): void {
    this.ligneForm?.arrets.splice(index, 1);
  }

  enregistrerLigne(): void {
    const f = this.ligneForm;
    if (!f) return;
    if (!f.nom.trim() || !f.code.trim()) {
      this.toastService.error('Veuillez renseigner le nom et le code du trajet.');
      return;
    }
    if (f.arrets.length < 2) {
      this.toastService.error('Ajoutez au moins deux arrêts (départ et destination).');
      return;
    }
    const obs = f.id ? this.transportService.modifierLigne(f as LigneBus) : this.transportService.creerLigne(f);
    obs.subscribe(l => {
      this.toastService.success(f.id ? `Trajet « ${l.nom} » mis à jour.` : `Trajet « ${l.nom} » créé.`);
      this.fermerLigneModal();
      this.charger();
    });
  }

  supprimerLigne(l: LigneBus): void {
    if (!confirm(`Supprimer le trajet « ${l.nom} » ?`)) return;
    this.transportService.supprimerLigne(l.id).subscribe(() => {
      this.toastService.success('Trajet supprimé.');
      this.charger();
    });
  }

  toggleStatutLigne(l: LigneBus): void {
    this.transportService.modifierLigne({ ...l, statut: l.statut === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }).subscribe(() => {
      this.toastService.success(`Trajet ${l.statut === 'ACTIVE' ? 'désactivé' : 'activé'}.`);
      this.charger();
    });
  }

  // ─── ZONES TAXI (CRUD) ────────────────────────────────────
  ouvrirNouvelleZone(): void {
    this.zoneForm = { nom: '', tarification: 'COMPTEUR', tarifBase: 2000, tarifParKm: 800, forfaitMoyen: null, statut: 'ACTIVE' };
    this.showZoneModal = true;
  }

  modifierZone(z: ZoneTaxi): void {
    this.zoneForm = { id: z.id, nom: z.nom, tarification: z.tarification, tarifBase: z.tarifBase, tarifParKm: z.tarifParKm ?? null, forfaitMoyen: z.forfaitMoyen ?? null, statut: z.statut };
    this.showZoneModal = true;
  }

  fermerZoneModal(): void {
    this.showZoneModal = false;
    this.zoneForm = null;
  }

  enregistrerZone(): void {
    const f = this.zoneForm;
    if (!f) return;
    if (!f.nom.trim()) {
      this.toastService.error('Veuillez renseigner le nom de la zone.');
      return;
    }
    const payload = {
      id: f.id, nom: f.nom, tarification: f.tarification, tarifBase: f.tarifBase,
      tarifParKm: f.tarifParKm ?? undefined, forfaitMoyen: f.forfaitMoyen ?? undefined, statut: f.statut
    } as Partial<ZoneTaxi>;
    const obs = f.id ? this.transportService.modifierZone(payload as ZoneTaxi) : this.transportService.creerZone(payload);
    obs.subscribe(z => {
      this.toastService.success(f.id ? `Zone « ${z.nom} » mise à jour.` : `Zone « ${z.nom} » créée.`);
      this.fermerZoneModal();
      this.charger();
    });
  }

  supprimerZone(z: ZoneTaxi): void {
    if (!confirm(`Supprimer la zone « ${z.nom} » ?`)) return;
    this.transportService.supprimerZone(z.id).subscribe(() => {
      this.toastService.success('Zone supprimée.');
      this.charger();
    });
  }

  toggleStatutZone(z: ZoneTaxi): void {
    this.transportService.modifierZone({ ...z, statut: z.statut === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }).subscribe(() => {
      this.toastService.success(`Zone ${z.statut === 'ACTIVE' ? 'désactivée' : 'activée'}.`);
      this.charger();
    });
  }
}
