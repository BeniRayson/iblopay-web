import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { WorkflowsService } from '../../services/workflows.service';
import { ServiceInstitution, Workflow, CompteUtilisateur } from '../../models/provider.model';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent implements OnInit {
  services: ServiceInstitution[] = [];
  filtered: ServiceInstitution[] = [];
  searchTerm = '';
  selectedStatut = '';
  isLoading = true;

  // Pagination & Modal
  currentPage = 0;
  pageSize = 12;
  selectedService: ServiceInstitution | null = null;

  stats = { total: 0, actifs: 0, brouillon: 0 };

  // ─── SCHÉMA DE WORKFLOW ───────────
  serviceSchemaActif: ServiceInstitution | null = null;
  workflowSchemaAffiche: Workflow | null = null;
  comptesSchema: CompteUtilisateur[] = [];
  isLoadingSchema = false;

  constructor(
    private servicesService: ServicesService,
    private workflowsService: WorkflowsService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.servicesService.getAll().subscribe(s => {
      this.services = s;
      this.applyFilters();
      this.updateStats();
      this.isLoading = false;
    });
  }

  updateStats(): void {
    this.stats = {
      total: this.services.length,
      actifs: this.services.filter(s => s.statut === 'ACTIF').length,
      brouillon: this.services.filter(s => s.statut === 'BROUILLON').length
    };
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.services.filter(s => {
      const matchTerm = !term || 
        s.nom.toLowerCase().includes(term) || 
        s.code.toLowerCase().includes(term) ||
        (s.categorie && s.categorie.toLowerCase().includes(term)) ||
        (s.sousCategorie && s.sousCategorie.toLowerCase().includes(term));
      const matchStatut = !this.selectedStatut || s.statut === this.selectedStatut;
      return matchTerm && matchStatut;
    });
    this.currentPage = 0;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  get pagedServices(): ServiceInstitution[] {
    const start = this.currentPage * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
    }
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  toggleStatut(s: ServiceInstitution): void {
    const nouveauStatut = s.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF';
    this.servicesService.update({ ...s, statut: nouveauStatut }).subscribe(() => this.load());
  }

  deleteService(s: ServiceInstitution): void {
    if (confirm(`Supprimer le service "${s.nom}" ?`)) {
      this.servicesService.delete(s.id).subscribe(() => this.load());
    }
  }

  ouvrirFormBuilder(s: ServiceInstitution): void {
    if (s.formulaireId) {
      this.router.navigate(['/formulaires', s.formulaireId, 'builder']);
    } else {
      this.router.navigate(['/formulaires/builder'], { queryParams: { serviceId: s.id } });
    }
  }

  ouvrirWorkflowBuilder(s: ServiceInstitution): void {
    this.router.navigate(['/workflows/nouveau'], { queryParams: { serviceId: s.id } });
  }

  voirSchemaWorkflow(s: ServiceInstitution): void {
    this.serviceSchemaActif = s;
    this.isLoadingSchema = true;
    this.workflowsService.getByServiceId(s.id).subscribe(w => {
      if (!w) {
        this.isLoadingSchema = false;
        this.serviceSchemaActif = null;
        this.toastService.error(`Aucun workflow n'est encore configuré pour « ${s.nom} ».`);
        if (confirm(`Voulez-vous créer le workflow de « ${s.nom} » maintenant ?`)) {
          this.ouvrirWorkflowBuilder(s);
        }
        return;
      }
      this.workflowSchemaAffiche = w;
      this.workflowsService.getComptesByWorkflow(w.id).subscribe(comptes => {
        this.comptesSchema = comptes;
        this.isLoadingSchema = false;
      });
    });
  }

  fermerSchemaWorkflow(): void {
    this.serviceSchemaActif = null;
    this.workflowSchemaAffiche = null;
    this.comptesSchema = [];
  }

  comptesPourEtapeSchema(etapeId: string): CompteUtilisateur[] {
    return this.comptesSchema.filter(c => c.etapeId === etapeId);
  }

  modifierWorkflowDepuisSchema(): void {
    if (!this.workflowSchemaAffiche) return;
    this.router.navigate(['/workflows', this.workflowSchemaAffiche.id, 'builder']);
  }

  couleurCategorie(categorie: string): string {
    const couleurs: Record<string, string> = {
      'Certificats': '#2563eb',
      'Autorisations': '#7c3aed',
      'Licences': '#ea580c',
      'Attestations': '#0891b2',
      'Transport': '#16a34a'
    };
    return couleurs[categorie] || '#64748b';
  }
}