import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BilletsService } from '../../services/billets.service';
import { EvenementsService } from '../../services/evenements.service';
import { Billet, StatutBillet, Evenement, VenteHistorique } from '../../models/evenements.model';
import { ToastService } from '../../core/toast.service';

type VueBilletterie = 'TEMPS_REEL' | 'HISTORIQUE';

@Component({
  selector: 'app-billetterie-live',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billetterie-live.component.html',
  styleUrl: './billetterie-live.component.scss'
})
export class BilletterieLiveComponent implements OnInit, OnDestroy {
  vueActive: VueBilletterie = 'TEMPS_REEL';

  billets: Billet[] = [];
  filtered: Billet[] = [];
  evenements: Evenement[] = [];

  filtreEvenement = '';
  filtreStatut = '';
  filtreNumero = '';
  isLoading = true;

  currentPage = 1;
  pageSize = 12;

  billetDetailAffiche: Billet | null = null;

  // ─── HISTORIQUE (billets confirmés par événement & catégorie) ────
  historique: VenteHistorique[] = [];
  historiqueFiltre: VenteHistorique[] = [];
  historiqueFiltreEvenement = '';
  historiqueFiltreCategorie = '';
  historiquePage = 1;
  historiquePageSize = 15;
  isLoadingHistorique = false;

  private sub?: Subscription;

  constructor(
    private billetsService: BilletsService,
    private evenementsService: EvenementsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.evenementsService.getEvenements().subscribe(e => this.evenements = e);

    this.sub = this.billetsService.getAll().subscribe(billets => {
      this.billets = billets;
      this.applyFilters();
      if (this.billetDetailAffiche) {
        const maj = billets.find(b => b.id === this.billetDetailAffiche!.id);
        if (maj) this.billetDetailAffiche = maj;
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  changerVue(vue: VueBilletterie): void {
    this.vueActive = vue;
    if (vue === 'HISTORIQUE' && this.historique.length === 0) {
      this.chargerHistorique();
    }
  }

  chargerHistorique(): void {
    this.isLoadingHistorique = true;
    this.evenementsService.getHistorique().subscribe(h => {
      this.historique = h;
      this.appliquerFiltresHistorique();
      this.isLoadingHistorique = false;
    });
  }

  /** Catégories disponibles pour l'événement sélectionné dans l'historique (ou toutes si aucun événement choisi). */
  get categoriesHistoriqueDisponibles(): string[] {
    const source = this.historiqueFiltreEvenement
      ? this.historique.filter(h => h.evenementId === Number(this.historiqueFiltreEvenement))
      : this.historique;
    return [...new Set(source.map(h => h.categorieNom))].sort();
  }

  appliquerFiltresHistorique(): void {
    this.historiquePage = 1;
    this.historiqueFiltre = this.historique
      .filter(h => h.statut === 'VALIDE')
      .filter(h => !this.historiqueFiltreEvenement || h.evenementId === Number(this.historiqueFiltreEvenement))
      .filter(h => !this.historiqueFiltreCategorie || h.categorieNom === this.historiqueFiltreCategorie)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  reinitialiserFiltresHistorique(): void {
    this.historiqueFiltreEvenement = '';
    this.historiqueFiltreCategorie = '';
    this.appliquerFiltresHistorique();
  }

  get historiqueRevenuTotal(): number {
    return this.historiqueFiltre.reduce((sum, h) => sum + h.revenu, 0);
  }

  get historiqueBilletsTotal(): number {
    return this.historiqueFiltre.reduce((sum, h) => sum + h.quantite, 0);
  }

  get historiqueTotalPages(): number {
    return Math.ceil(this.historiqueFiltre.length / this.historiquePageSize) || 1;
  }

  get historiquePagine(): VenteHistorique[] {
    const start = (this.historiquePage - 1) * this.historiquePageSize;
    return this.historiqueFiltre.slice(start, start + this.historiquePageSize);
  }

  changerPageHistorique(page: number): void {
    if (page >= 1 && page <= this.historiqueTotalPages) this.historiquePage = page;
  }

  applyFilters(): void {
    const term = this.filtreNumero.toLowerCase().trim();
    this.filtered = this.billets
      .filter(b =>
        (!this.filtreEvenement || b.evenementId === Number(this.filtreEvenement)) &&
        (!this.filtreStatut || b.statut === this.filtreStatut) &&
        (!term || b.numeroReference.toLowerCase().includes(term))
      )
      .sort((a, b) => b.dateAchat.getTime() - a.dateAchat.getTime());
  }

  onFiltreChange(): void {
    this.applyFilters();
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize) || 1;
  }

  get filteredPagines(): Billet[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  get reservesCount(): number {
    return this.billets.filter(b => b.statut === 'RESERVE').length;
  }

  get payesCount(): number {
    return this.billets.filter(b => b.statut === 'PAYE').length;
  }

  get utilisesCount(): number {
    return this.billets.filter(b => b.statut === 'UTILISE').length;
  }

  get revenuTotal(): number {
    return this.billets.filter(b => b.statut === 'PAYE' || b.statut === 'UTILISE').reduce((sum, b) => sum + b.prix, 0);
  }

  formatBIF(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
  }

  nomEvenement(id: number): string {
    return this.evenements.find(e => e.id === id)?.nom || '—';
  }

  statutClass(statut: StatutBillet): string {
    const map: Record<StatutBillet, string> = { RESERVE: 'badge-orange', PAYE: 'badge-blue', UTILISE: 'badge-green', ANNULE: 'badge-red' };
    return map[statut];
  }

  statutLabel(statut: StatutBillet): string {
    const map: Record<StatutBillet, string> = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
    return map[statut];
  }

  minutesEcoulees(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  }

  ouvrirDetail(b: Billet): void {
    this.billetDetailAffiche = b;
  }

  fermerDetail(): void {
    this.billetDetailAffiche = null;
  }

  confirmerPaiement(b: Billet, event?: Event): void {
    event?.stopPropagation();
    this.billetsService.changerStatut(b.id, 'PAYE');
    this.toastService.success(`Billet ${b.numeroReference} marqué comme payé.`);
  }

  validerEntree(b: Billet, event?: Event): void {
    event?.stopPropagation();
    this.billetsService.changerStatut(b.id, 'UTILISE');
    this.toastService.success(`Entrée validée pour le billet ${b.numeroReference}.`);
  }

  annulerBillet(b: Billet, event?: Event): void {
    event?.stopPropagation();
    if (!confirm(`Annuler le billet ${b.numeroReference} ?`)) return;
    this.billetsService.changerStatut(b.id, 'ANNULE');
    this.toastService.success('Billet annulé.');
  }
}
