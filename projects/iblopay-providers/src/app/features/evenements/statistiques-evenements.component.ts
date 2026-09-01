import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvenementsService } from '../../services/evenements.service';
import { BilletsService } from '../../services/billets.service';
import { StatsEvenementsGlobal, StatsParEvenement, Evenement, VenteHistorique, Billet } from '../../models/evenements.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface KpiItem {
  icon: string;
  label: string;
  valeur: string;
  couleur: string;
}

@Component({
  selector: 'app-statistiques-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistiques-evenements.component.html',
  styleUrl: './statistiques-evenements.component.scss'
})
export class StatistiquesEvenementsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  stats: StatsEvenementsGlobal | null = null;
  statsParEvenement: StatsParEvenement[] = [];
  evenements: Evenement[] = [];
  historique: VenteHistorique[] = [];
  billets: Billet[] = [];

  evenementSelectionneId: number | null = null;
  kpisEvenement: KpiItem[] = [];
  isLoadingKpis = false;

  private chart?: Chart;

  constructor(
    private evenementsService: EvenementsService,
    private billetsService: BilletsService
  ) {}

  ngOnInit(): void {
    this.evenementsService.getStatsGlobal().subscribe(s => this.stats = s);
    this.billetsService.getAll().subscribe(b => this.billets = b);
    this.evenementsService.getHistorique().subscribe(h => this.historique = h);

    this.evenementsService.getStatsParEvenement().subscribe(s => {
      this.statsParEvenement = s;
      setTimeout(() => this.buildChart(), 0);
    });

    this.evenementsService.getEvenements().subscribe(e => {
      this.evenements = e;
      const premier = e[0];
      if (premier) this.selectionnerEvenement(premier.id);
    });
  }

  ngAfterViewInit(): void {}

  selectionnerEvenement(id: number): void {
    this.evenementSelectionneId = id;
    this.isLoadingKpis = true;

    const entries = this.historique.filter(h => h.evenementId === id);
    const valides = entries.filter(e => e.statut === 'VALIDE');
    const revenuTotal = valides.reduce((sum, e) => sum + e.revenu, 0);
    const billetsVendus = valides.reduce((sum, e) => sum + e.quantite, 0);
    const tauxAnnulation = entries.length ? Math.round(((entries.length - valides.length) / entries.length) * 100) : 0;
    const evenement = this.evenements.find(e => e.id === id);
    const tauxRemplissage = evenement?.capaciteTotale
      ? Math.round((evenement.categoriesBillets.reduce((s, c) => s + c.quantiteVendue, 0) / evenement.capaciteTotale) * 100)
      : 0;

    this.kpisEvenement = [
      { icon: 'fa-solid fa-ticket', label: 'Billets vendus', valeur: String(billetsVendus), couleur: 'blue' },
      { icon: 'fa-solid fa-sack-dollar', label: 'Revenu total', valeur: this.formatBIF(revenuTotal), couleur: 'green' },
      { icon: 'fa-solid fa-gauge-high', label: 'Taux de remplissage', valeur: tauxRemplissage + '%', couleur: 'purple' },
      { icon: 'fa-solid fa-triangle-exclamation', label: 'Taux d\'annulation', valeur: tauxAnnulation + '%', couleur: 'orange' }
    ];
    setTimeout(() => { this.isLoadingKpis = false; }, 150);
  }

  formatBIF(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + ' BIF';
  }

  buildChart(): void {
    if (!this.chartCanvas) return;
    this.chart?.destroy();

    const colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#dc2626', '#d97706'];
    const labelsPeriode = ['Période 1', 'Période 2', 'Période 3', 'Période 4', 'Période 5', 'Période 6'];

    const datasets = this.statsParEvenement.map((s, index) => {
      const color = colors[index % colors.length];
      const base = Math.max(5, Math.round(s.billetsVendus / 6));

      const waveData = [
        base, base + (index % 2 === 0 ? 12 : -8), base + (index % 2 === 0 ? -5 : 15),
        base + (index % 2 === 0 ? 18 : -10), base + (index % 2 === 0 ? -2 : 8), s.billetsVendus - (base * 5)
      ];

      return {
        label: s.nom, data: waveData, borderColor: color, backgroundColor: color,
        borderWidth: 2.5, tension: 0.5, fill: false, pointRadius: 3, pointHoverRadius: 6
      };
    });

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: { labels: labelsPeriode, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 } } },
        scales: {
          x: { ticks: { color: '#475569', font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(15,23,42,0.05)' } }
        }
      }
    });
  }

  get billetsVendusCount(): number {
    return this.billets.filter(b => b.statut === 'PAYE' || b.statut === 'UTILISE').length;
  }

  get revenuTotalBillets(): number {
    return this.billets.filter(b => b.statut === 'PAYE' || b.statut === 'UTILISE').reduce((sum, b) => sum + b.prix, 0);
  }

  getWorkloadLabel(remplissage: number): string {
    if (remplissage >= 75) return 'Forte demande';
    if (remplissage >= 50) return 'Demande modérée';
    return 'Demande faible';
  }

  getWorkloadClass(remplissage: number): string {
    if (remplissage >= 75) return 'workload-high';
    if (remplissage >= 50) return 'workload-medium';
    return 'workload-low';
  }

  colorClass(couleur: string): string {
    return 'kpi-' + couleur;
  }
}
