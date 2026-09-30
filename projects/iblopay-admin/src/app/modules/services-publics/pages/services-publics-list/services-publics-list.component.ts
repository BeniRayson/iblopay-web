import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServicePublic } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
import { ICON_PATHS, IconName } from '../../utils/service-icons';
import { getServiceColor, getServiceInitials } from '../../utils/service-display.util';

type ViewMode = 'grid' | 'list';
type NotificationType = 'success' | 'error' | 'info';
type StatTone = 'blue' | 'green' | 'red' | 'purple';

interface StatCard {
  label: string;
  value: string;
  hint: string;
  tone: StatTone;
  icon: IconName;
}

/** Nombre de cartes par page (3 colonnes × 4 lignes). */
const PAGE_SIZE = 12;

/** Durée d'affichage de la notification (ms). */
const NOTIFICATION_DURATION = 3000;

@Component({
  selector: 'app-services-publics-list',
  standalone: false,
  templateUrl: './services-publics-list.component.html',
  styleUrls: ['./services-publics-list.component.scss']
})
export class ServicesPublicsListComponent implements OnInit, OnDestroy {

  // ─── Données ──────────────────────────────────────────────
  services: ServicePublic[] = [];
  filteredServices: ServicePublic[] = [];
  paginatedServices: ServicePublic[] = [];
  statCards: StatCard[] = [];

  // ─── Filtres ──────────────────────────────────────────────
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';

  // ─── Affichage ────────────────────────────────────────────
  viewMode: ViewMode = 'grid';
  isLoading = false;
  openMenuId: number | null = null;

  // ─── Pagination ───────────────────────────────────────────
  readonly pageSize = PAGE_SIZE;
  currentPage = 1;
  totalPages = 1;

  // ─── Notification ─────────────────────────────────────────
  showNotification = false;
  notificationMessage = '';
  notificationType: NotificationType = 'success';
  private notificationTimer?: ReturnType<typeof setTimeout>;

  // ─── Helpers exposés au template ──────────────────────────
  readonly iconPaths = ICON_PATHS;
  readonly getColor = getServiceColor;
  readonly getInitials = getServiceInitials;

  constructor(
    private router: Router,
    private servicesPublicsService: ServicesPublicsService
  ) { }

  // ═════════════════════════════════════════════════════════
  // CYCLE DE VIE
  // ═════════════════════════════════════════════════════════

  ngOnInit(): void {
    this.loadServices();
  }

  ngOnDestroy(): void {
    clearTimeout(this.notificationTimer);
  }

  /** Un clic n'importe où ferme le menu « ⋯ » ouvert. */
  @HostListener('document:click')
  closeMenu(): void {
    this.openMenuId = null;
  }

  // ═════════════════════════════════════════════════════════
  // CHARGEMENT
  // ═════════════════════════════════════════════════════════

  loadServices(): void {
    this.isLoading = true;

    this.servicesPublicsService.getAll().subscribe({
      next: services => {
        this.services = services;
        this.updateStats();
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notify('Erreur lors du chargement des services', 'error');
      }
    });
  }

  // ═════════════════════════════════════════════════════════
  // FILTRES ET PAGINATION
  // ═════════════════════════════════════════════════════════

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredServices = this.services.filter(service => {
      const matchesSearch = !term
        || service.abreviation.toLowerCase().includes(term)
        || service.description.toLowerCase().includes(term);

      const matchesType = !this.selectedType || service.type === this.selectedType;

      const matchesStatus = !this.selectedStatus
        || (this.selectedStatus === 'ACTIF') === service.actif;

      return matchesSearch && matchesType && matchesStatus;
    });

    this.totalPages = Math.max(1, Math.ceil(this.filteredServices.length / this.pageSize));
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.updatePage();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.onFilterChange();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePage();
  }

  get pages(): number[] {
    const maxVisible = 5;
    const start = Math.max(1, Math.min(this.currentPage - 2, this.totalPages - maxVisible + 1));
    const end = Math.min(this.totalPages, start + maxVisible - 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  get startItem(): number {
    return this.filteredServices.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredServices.length);
  }

  private updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedServices = this.filteredServices.slice(start, start + this.pageSize);
  }

  // ═════════════════════════════════════════════════════════
  // STATISTIQUES
  // ═════════════════════════════════════════════════════════

  private updateStats(): void {
    const total = this.services.length;
    const actifs = this.services.filter(service => service.actif).length;
    const paiements = this.services.reduce((sum, service) => sum + this.getPayments(service), 0);

    this.statCards = [
      { label: 'Total des services', value: this.formatNumber(total), hint: 'Services disponibles sur la plateforme', tone: 'blue', icon: 'grid' },
      { label: 'Services actifs', value: this.formatNumber(actifs), hint: 'Fonctionnels et disponibles', tone: 'green', icon: 'check' },
      { label: 'Services désactivés', value: this.formatNumber(total - actifs), hint: 'Non visibles par les utilisateurs', tone: 'red', icon: 'ban' },
      { label: 'Total des paiements', value: this.formatNumber(paiements), hint: 'Tous les paiements confondus', tone: 'purple', icon: 'card' }
    ];
  }

  getUsers(service: ServicePublic): number {
    return service.statistiques?.totalUtilisateurs ?? 0;
  }

  getPayments(service: ServicePublic): number {
    return service.statistiques?.totalPaiements ?? 0;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value);
  }

  // ═════════════════════════════════════════════════════════
  // ACTIONS SUR UN SERVICE
  // ═════════════════════════════════════════════════════════

  onAddService(): void {
    this.router.navigate(['/services-publics/edit', 'new']);
  }

  onViewService(service: ServicePublic): void {
    this.router.navigate(['/services-publics', service.id]);
  }

  onEditService(service: ServicePublic): void {
    this.router.navigate(['/services-publics/edit', service.id]);
  }

  toggleMenu(event: Event, service: ServicePublic): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === service.id ? null : service.id;
  }

  onToggleStatus(service: ServicePublic): void {
    const updated: ServicePublic = { ...service, actif: !service.actif };
    this.openMenuId = null;

    this.servicesPublicsService.update(updated).subscribe({
      next: () => {
        this.services = this.services.map(s => (s.id === service.id ? updated : s));
        this.updateStats();
        this.applyFilters();
        this.notify(`Service « ${service.abreviation} » ${updated.actif ? 'activé' : 'désactivé'} avec succès.`);
      },
      error: () => this.notify('Erreur lors du changement de statut', 'error')
    });
  }

  onDeleteService(service: ServicePublic): void {
    this.openMenuId = null;

    if (!confirm(`Êtes-vous sûr de vouloir supprimer le service « ${service.abreviation} » ?`)) {
      return;
    }

    this.servicesPublicsService.delete(service.id).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.id !== service.id);
        this.updateStats();
        this.applyFilters();
        this.notify(`Service « ${service.abreviation} » supprimé avec succès.`);
      },
      error: () => this.notify('Erreur lors de la suppression', 'error')
    });
  }

  trackById(index: number, service: ServicePublic): number {
    return service ? service.id : index;
  }

  // ═════════════════════════════════════════════════════════
  // NOTIFICATION
  // ═════════════════════════════════════════════════════════

  private notify(message: string, type: NotificationType = 'success'): void {
    clearTimeout(this.notificationTimer);

    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    this.notificationTimer = setTimeout(() => {
      this.showNotification = false;
    }, NOTIFICATION_DURATION);
  }
}
