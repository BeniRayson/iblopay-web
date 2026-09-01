import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService } from '../../services/transport.service';
import { CoursesService } from '../../services/courses.service';
import { StatsTransportGlobal, StatsParLigneOuZone, LigneBus, ZoneTaxi, TrajetHistorique, Chauffeur, Course } from '../../models/transport.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface KpiItem {
  icon: string;
  label: string;
  valeur: string;
  couleur: string;
}

@Component({
  selector: 'app-statistiques-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistiques-transport.component.html',
  styleUrl: './statistiques-transport.component.scss'
})
export class StatistiquesTransportComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  stats: StatsTransportGlobal | null = null;
  statsParLigneOuZone: StatsParLigneOuZone[] = [];
  lignes: LigneBus[] = [];
  zones: ZoneTaxi[] = [];
  chauffeurs: Chauffeur[] = [];
  historique: TrajetHistorique[] = [];
  courses: Course[] = [];

  trajetSelectionneId: string | null = null; // format "LIGNE:1" ou "ZONE:2"
  kpisTrajet: KpiItem[] = [];
  isLoadingKpis = false;

  private chart?: Chart;

  constructor(
    private transportService: TransportService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.transportService.getStatsGlobal().subscribe(s => this.stats = s);
    this.transportService.getChauffeurs().subscribe(c => this.chauffeurs = c);
    this.coursesService.getAll().subscribe(c => this.courses = c);
    this.transportService.getHistorique().subscribe(h => this.historique = h);

    this.transportService.getStatsParLigneOuZone().subscribe(s => {
      this.statsParLigneOuZone = s;
      setTimeout(() => this.buildChart(), 0);
    });

    this.transportService.getLignes().subscribe(l => {
      this.lignes = l.filter(x => x.statut === 'ACTIVE');
      this.transportService.getZones().subscribe(z => {
        this.zones = z.filter(x => x.statut === 'ACTIVE');
        const premiere = this.lignes[0];
        if (premiere) this.selectionnerTrajet('LIGNE:' + premiere.id);
      });
    });
  }

  ngAfterViewInit(): void {}

  selectionnerTrajet(cle: string): void {
    this.trajetSelectionneId = cle;
    this.isLoadingKpis = true;

    const [type, idStr] = cle.split(':');
    const id = Number(idStr);
    const entries = type === 'LIGNE'
      ? this.historique.filter(h => h.ligneId === id)
      : this.historique.filter(h => h.zoneId === id);

    const termines = entries.filter(e => e.statut === 'TERMINE');
    const revenuTotal = termines.reduce((sum, e) => sum + e.revenu, 0);
    const dureeMoyenne = termines.length ? Math.round(termines.reduce((s, e) => s + e.dureeMinutes, 0) / termines.length) : 0;
    const tauxAnnulation = entries.length ? Math.round(((entries.length - termines.length) / entries.length) * 100) : 0;
    const passagersTotal = termines.reduce((sum, e) => sum + e.passagers, 0);

    this.kpisTrajet = [
      { icon: 'fa-solid fa-route', label: 'Trajets effectués', valeur: String(termines.length), couleur: 'blue' },
      { icon: 'fa-solid fa-sack-dollar', label: 'Revenu total', valeur: this.formatBIF(revenuTotal), couleur: 'green' },
      { icon: 'fa-solid fa-users', label: 'Passagers transportés', valeur: String(passagersTotal), couleur: 'purple' },
      { icon: 'fa-solid fa-clock', label: 'Durée moyenne', valeur: dureeMoyenne + ' min', couleur: 'cyan' },
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

    const datasets = this.statsParLigneOuZone.map((s, index) => {
      const color = colors[index % colors.length];
      const base = Math.max(5, Math.round(s.courses / 6));

      const waveData = [
        base,
        base + (index % 2 === 0 ? 12 : -8),
        base + (index % 2 === 0 ? -5 : 15),
        base + (index % 2 === 0 ? 18 : -10),
        base + (index % 2 === 0 ? -2 : 8),
        s.courses - (base * 5)
      ];

      return {
        label: s.nom,
        data: waveData,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2.5,
        tension: 0.5,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 6
      };
    });

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: { labels: labelsPeriode, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 } }
        },
        scales: {
          x: { ticks: { color: '#475569', font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(15,23,42,0.05)' } }
        }
      }
    });
  }

  get termineesAujourdhui(): number {
    return this.courses.filter(c => c.statut === 'TERMINEE').length;
  }

  get revenuTotalCourses(): number {
    return this.courses.filter(c => c.statut === 'TERMINEE').reduce((sum, c) => sum + c.prix, 0);
  }

  get tauxReussite(): number {
    const annulees = this.courses.filter(c => c.statut === 'ANNULEE').length;
    const total = this.termineesAujourdhui + annulees;
    return total ? Math.round((this.termineesAujourdhui / total) * 100) : 0;
  }

  getWorkloadLabel(occupation: number): string {
    if (occupation >= 75) return 'Élevée';
    if (occupation >= 50) return 'Modérée';
    return 'Faible';
  }

  getWorkloadClass(occupation: number): string {
    if (occupation >= 75) return 'workload-high';
    if (occupation >= 50) return 'workload-medium';
    return 'workload-low';
  }

  colorClass(couleur: string): string {
    return 'kpi-' + couleur;
  }
}
