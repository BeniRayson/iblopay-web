import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { TransportService } from '../../services/transport.service';
import { Course, StatutCourse, Vehicule, Chauffeur, TypeVehicule } from '../../models/transport.model';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-courses-live',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-live.component.html',
  styleUrl: './courses-live.component.scss'
})
export class CoursesLiveComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filtered: Course[] = [];
  vehicules: Vehicule[] = [];
  chauffeurs: Chauffeur[] = [];

  filtreType: '' | TypeVehicule = '';
  filtreStatut = '';
  isLoading = true;

  currentPage = 1;
  pageSize = 12;

  showAssignationModal = false;
  courseAAssigner: Course | null = null;
  vehiculeChoisiId: number | null = null;

  // ─── DÉTAIL / SUIVI EN TEMPS RÉEL D'UNE COURSE ────────────
  courseDetailAffichee: Course | null = null;

  private sub?: Subscription;

  constructor(
    private coursesService: CoursesService,
    private transportService: TransportService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.transportService.getVehicules().subscribe(v => this.vehicules = v);
    this.transportService.getChauffeurs().subscribe(c => this.chauffeurs = c);

    this.sub = this.coursesService.getAll().subscribe(courses => {
      this.courses = courses;
      this.applyFilters();
      // Garde le détail affiché synchronisé avec la progression en temps réel
      if (this.courseDetailAffichee) {
        const maj = courses.find(c => c.id === this.courseDetailAffichee!.id);
        if (maj) this.courseDetailAffichee = maj;
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  applyFilters(): void {
    this.filtered = this.courses
      .filter(c => (!this.filtreType || c.type === this.filtreType) && (!this.filtreStatut || c.statut === this.filtreStatut))
      .sort((a, b) => b.dateDemande.getTime() - a.dateDemande.getTime());
  }

  onFiltreChange(): void {
    this.applyFilters();
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize) || 1;
  }

  get filteredPagines(): Course[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  get enCoursCount(): number {
    return this.courses.filter(c => c.statut === 'EN_COURS').length;
  }

  get enAttenteCount(): number {
    return this.courses.filter(c => c.statut === 'DEMANDE' || c.statut === 'ACCEPTEE').length;
  }

  get termineesAujourdhui(): number {
    return this.courses.filter(c => c.statut === 'TERMINEE').length;
  }

  get revenuTotalCourses(): number {
    return this.courses.filter(c => c.statut === 'TERMINEE').reduce((sum, c) => sum + c.prix, 0);
  }

  formatBIF(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
  }

  nomVehicule(id?: number): string {
    if (!id) return '—';
    const v = this.vehicules.find(x => x.id === id);
    return v ? v.matricule : '—';
  }

  nomChauffeur(id?: number): string {
    if (!id) return '—';
    const c = this.chauffeurs.find(x => x.id === id);
    return c ? `${c.prenom} ${c.nom}` : '—';
  }

  telephoneChauffeur(id?: number): string {
    const c = this.chauffeurs.find(x => x.id === id);
    return c?.telephone || '—';
  }

  vehiculesDisponibles(type: TypeVehicule): Vehicule[] {
    return this.vehicules.filter(v => v.type === type && (v.statut === 'DISPONIBLE' || v.statut === 'AU_DEPOT' || v.statut === 'EN_SERVICE'));
  }

  ouvrirAssignation(c: Course, event?: Event): void {
    event?.stopPropagation();
    this.courseAAssigner = c;
    this.vehiculeChoisiId = null;
    this.showAssignationModal = true;
  }

  fermerAssignation(): void {
    this.showAssignationModal = false;
    this.courseAAssigner = null;
  }

  confirmerAssignation(): void {
    if (!this.courseAAssigner || !this.vehiculeChoisiId) {
      this.toastService.error('Veuillez sélectionner un véhicule.');
      return;
    }
    const vehicule = this.vehicules.find(v => v.id === this.vehiculeChoisiId);
    if (!vehicule || !vehicule.chauffeurId) {
      this.toastService.error('Ce véhicule n\'a pas de chauffeur assigné. Assignez-en un depuis la Flotte.');
      return;
    }
    this.coursesService.assignerVehicule(this.courseAAssigner.id, vehicule.id, vehicule.chauffeurId);
    this.toastService.success(`Véhicule ${vehicule.matricule} assigné à la course ${this.courseAAssigner.numeroReference}.`);
    this.fermerAssignation();
  }

  demarrerCourse(c: Course, event?: Event): void {
    event?.stopPropagation();
    this.coursesService.changerStatut(c.id, 'EN_COURS');
    this.toastService.success(`Course ${c.numeroReference} démarrée.`);
  }

  terminerCourse(c: Course, event?: Event): void {
    event?.stopPropagation();
    this.coursesService.changerStatut(c.id, 'TERMINEE');
    this.toastService.success(`Course ${c.numeroReference} terminée.`);
  }

  annulerCourse(c: Course, event?: Event): void {
    event?.stopPropagation();
    if (!confirm(`Annuler la course ${c.numeroReference} ?`)) return;
    this.coursesService.changerStatut(c.id, 'ANNULEE');
    this.toastService.success('Course annulée.');
  }

  statutClass(statut: StatutCourse): string {
    const map: Record<StatutCourse, string> = {
      DEMANDE: 'badge-orange', ACCEPTEE: 'badge-blue', EN_COURS: 'badge-purple', TERMINEE: 'badge-green', ANNULEE: 'badge-red'
    };
    return map[statut];
  }

  statutLabel(statut: StatutCourse): string {
    const map: Record<StatutCourse, string> = {
      DEMANDE: 'Demande reçue', ACCEPTEE: 'Véhicule assigné', EN_COURS: 'En cours', TERMINEE: 'Terminée', ANNULEE: 'Annulée'
    };
    return map[statut];
  }

  minutesEcoulees(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  }

  // ─── DÉTAIL / CARTE DE SUIVI EN TEMPS RÉEL ────────────────
  ouvrirDetail(c: Course): void {
    this.courseDetailAffichee = c;
  }

  fermerDetail(): void {
    this.courseDetailAffichee = null;
  }

  /** Estimation du temps restant en minutes, en fonction de la progression actuelle. */
  tempsRestantEstime(c: Course): number {
    if (c.statut !== 'EN_COURS' || !c.dateDebut) return 0;
    const ecouleMs = Date.now() - new Date(c.dateDebut).getTime();
    if (c.progression <= 0) return 0;
    const totalEstimeMs = (ecouleMs / c.progression) * 100;
    const restantMs = Math.max(0, totalEstimeMs - ecouleMs);
    return Math.round(restantMs / 60000);
  }

  dureeTotale(c: Course): number {
    if (!c.dateDebut) return 0;
    const fin = c.dateFin ? new Date(c.dateFin).getTime() : Date.now();
    return Math.round((fin - new Date(c.dateDebut).getTime()) / 60000);
  }
}
