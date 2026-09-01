import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WorkflowsService } from '../../services/workflows.service';
import { ServicesService } from '../../services/services.service';
import { Workflow, ServiceInstitution, CompteUtilisateur } from '../../models/provider.model';
import { ToastService } from '../../core/toast.service';

interface WorkflowLigne extends Workflow {
  serviceNom: string;
  nombreComptes: number;
}

@Component({
  selector: 'app-workflows-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './workflows-list.component.html',
  styleUrl: './workflows-list.component.scss'
})
export class WorkflowsListComponent implements OnInit {
  lignes: WorkflowLigne[] = [];
  filtered: WorkflowLigne[] = [];
  services: ServiceInstitution[] = [];
  comptes: CompteUtilisateur[] = [];
  searchTerm = '';
  selectedStatut = '';
  isLoading = true;

  workflowSelectionne: WorkflowLigne | null = null;
  comptesDuWorkflowSelectionne: CompteUtilisateur[] = [];

  stats = { total: 0, actifs: 0, comptes: 0 };

  constructor(
    private workflowsService: WorkflowsService,
    private servicesService: ServicesService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.servicesService.getAll().subscribe(services => {
      this.services = services;
      this.workflowsService.getAll().subscribe(workflows => {
        this.workflowsService.getAllComptes().subscribe(comptes => {
          this.comptes = comptes;
          this.lignes = workflows.map(w => ({
            ...w,
            serviceNom: services.find(s => s.id === w.serviceId)?.nom || 'Service inconnu',
            nombreComptes: comptes.filter(c => c.workflowId === w.id).length
          }));
          this.applyFilters();
          this.updateStats();
          this.isLoading = false;
        });
      });
    });
  }

  updateStats(): void {
    this.stats = {
      total: this.lignes.length,
      actifs: this.lignes.filter(w => w.statut === 'ACTIF').length,
      comptes: this.comptes.filter(c => c.statut === 'ACTIF').length
    };
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.lignes.filter(w => {
      const matchTerm = !term ||
        w.nom.toLowerCase().includes(term) ||
        w.serviceNom.toLowerCase().includes(term);
      const matchStatut = !this.selectedStatut || w.statut === this.selectedStatut;
      return matchTerm && matchStatut;
    });
  }

  /** Services qui n'ont pas encore de workflow configuré. */
  get servicesSansWorkflow(): ServiceInstitution[] {
    const idsAvecWorkflow = new Set(this.lignes.map(w => w.serviceId));
    return this.services.filter(s => !idsAvecWorkflow.has(s.id));
  }

  ouvrirDetail(w: WorkflowLigne): void {
    this.workflowSelectionne = w;
    this.comptesDuWorkflowSelectionne = this.comptes.filter(c => c.workflowId === w.id);
  }

  fermerDetail(): void {
    this.workflowSelectionne = null;
    this.comptesDuWorkflowSelectionne = [];
  }

  modifier(w: Workflow): void {
    this.router.navigate(['/workflows', w.id, 'builder']);
  }

  toggleStatut(w: Workflow, event?: Event): void {
    event?.stopPropagation();
    this.workflowsService.toggleStatut(w.id).subscribe(() => {
      this.toastService.success(`Le workflow « ${w.nom} » a été ${w.statut === 'ACTIF' ? 'désactivé' : 'activé'}.`);
      this.load();
    });
  }

  supprimer(w: Workflow, event?: Event): void {
    event?.stopPropagation();
    if (!confirm(`Supprimer le workflow « ${w.nom} » et tous ses comptes rattachés ?`)) return;
    this.workflowsService.delete(w.id).subscribe(() => {
      this.toastService.success('Workflow supprimé.');
      this.fermerDetail();
      this.load();
    });
  }

  statutClass(statut: string): string {
    return statut === 'ACTIF' ? 'badge-green' : 'badge-gray';
  }

  comptesPourEtape(etapeId: string): CompteUtilisateur[] {
    return this.comptesDuWorkflowSelectionne.filter(c => c.etapeId === etapeId);
  }
}
