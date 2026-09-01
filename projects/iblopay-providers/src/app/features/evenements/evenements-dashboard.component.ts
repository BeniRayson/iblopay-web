import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EvenementsService } from '../../services/evenements.service';
import { BilletsService } from '../../services/billets.service';
import { Evenement, Organisateur, StatsEvenementsGlobal, StatsParEvenement, Billet, ReclamationEvenement } from '../../models/evenements.model';

@Component({
  selector: 'app-evenements-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evenements-dashboard.component.html',
  styleUrl: './evenements-dashboard.component.scss'
})
export class EvenementsDashboardComponent implements OnInit {
  evenements: Evenement[] = [];
  organisateurs: Organisateur[] = [];
  billets: Billet[] = [];
  reclamations: ReclamationEvenement[] = [];
  stats?: StatsEvenementsGlobal;
  statsParEvenement: StatsParEvenement[] = [];
  dernieresVentes: Billet[] = [];
  meilleursOrganisateurs: Organisateur[] = [];
  isLoading = true;
  today = new Date();

  private readonly colors: string[] = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#4f46e5', '#0d9488'];

  constructor(
    private evenementsService: EvenementsService,
    private billetsService: BilletsService
  ) {}

  ngOnInit(): void {
    this.evenementsService.getEvenements().subscribe(e => this.evenements = e);
    this.evenementsService.getOrganisateurs().subscribe(o => {
      this.organisateurs = o;
      this.meilleursOrganisateurs = [...o].sort((a, b) => (b.revenuTotal || 0) - (a.revenuTotal || 0)).slice(0, 10);
    });
    this.evenementsService.getStatsGlobal().subscribe(s => this.stats = s);
    this.evenementsService.getStatsParEvenement().subscribe(s => this.statsParEvenement = s.sort((a, b) => b.revenu - a.revenu));
    this.evenementsService.getReclamations().subscribe(r => this.reclamations = r);

    this.billetsService.getAll().subscribe(billets => {
      this.billets = billets;
      this.dernieresVentes = [...billets].sort((a, b) => b.dateAchat.getTime() - a.dateAchat.getTime()).slice(0, 5);
      this.isLoading = false;
    });
  }

  get evenementsAVenir(): Evenement[] {
    return this.evenements.filter(e => e.statut === 'PROGRAMME');
  }

  get evenementsEnCours(): Evenement[] {
    return this.evenements.filter(e => e.statut === 'EN_COURS');
  }

  get reclamationsOuvertes(): ReclamationEvenement[] {
    return this.reclamations.filter(r => r.statut !== 'RESOLU');
  }

  get organisateursActifs(): number {
    return this.organisateurs.filter(o => o.statut === 'ACTIF').length;
  }

  get billetsVendusCount(): number {
    return this.billets.filter(b => b.statut === 'PAYE' || b.statut === 'UTILISE').length;
  }

  getEvenementColor(nom: string): string {
    const index = this.statsParEvenement.findIndex(s => s.nom === nom);
    let colorIndex: number;
    if (index !== -1) {
      colorIndex = index % this.colors.length;
    } else {
      let hash = 0;
      for (let i = 0; i < nom.length; i++) hash = nom.charCodeAt(i) + ((hash << 5) - hash);
      colorIndex = Math.abs(hash) % this.colors.length;
    }
    return this.colors[colorIndex] || '#2563eb';
  }

  formatBIFComplet(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
  }

  nomEvenement(id: number): string {
    return this.evenements.find(e => e.id === id)?.nom || '—';
  }

  statutBilletClass(statut: string): string {
    const map: Record<string, string> = { RESERVE: 'badge-orange', PAYE: 'badge-blue', UTILISE: 'badge-green', ANNULE: 'badge-red' };
    return map[statut] || 'badge-blue';
  }

  statutBilletLabel(statut: string): string {
    const map: Record<string, string> = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
    return map[statut] || statut;
  }
}
