import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  currentDate: Date = new Date(2026, 6, 15);
  currentTime: string = '';
  currentDay: string = '';
  isRefreshing: boolean = false;
  isDarkMode: boolean = true;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;
  private clockSubscription?: Subscription;

  statsData = {
    users: 1248532,
    agents: 18532,
    superAgents: 1245,
    merchants: 45892,
    transactionsToday: 523690000,
    commissionEtat: 1245800000,
    commissionIblopay: 2229100000,
    servicesPublics: 128456
  };

  provinceData = {
    depots: [
      { name: 'Butanyerera', amount: 42300000 },
      { name: 'Burunga', amount: 28700000 },
      { name: 'Buhumuza', amount: 22100000 },
      { name: 'Gitega', amount: 19800000 },
      { name: 'Bujumbura', amount: 122780000 }
    ],
    transactions: [
      { name: 'Butanyerera', amount: 98400000 },
      { name: 'Burunga', amount: 67200000 },
      { name: 'Buhumuza', amount: 52800000 },
      { name: 'Gitega', amount: 45600000 },
      { name: 'Bujumbura', amount: 259690000 }
    ],
    commissions: [
      { name: 'Butanyerera', amount: 945000 },
      { name: 'Burunga', amount: 820000 },
      { name: 'Buhumuza', amount: 680000 },
      { name: 'Gitega', amount: 590000 },
      { name: 'Bujumbura', amount: 439900 }
    ]
  };

  provinceTotals = {
    depots: 235680000,
    transactions: 523690000,
    commissions: 3474900
  };

  servicesStats = {
    total: 128456,
    traitees: 112345,
    enCours: 12453,
    rejetees: 3658
  };

  services = [
    { name: 'Permis de construire', total: 28456, traitees: 24987, enCours: 2675, rejetees: 794 },
    { name: 'Certificat de résidence', total: 24125, traitees: 21652, enCours: 1842, rejetees: 631 },
    { name: 'Extrait de naissance', total: 18984, traitees: 16852, enCours: 1556, rejetees: 576 },
    { name: 'Certificat de célibat', total: 15236, traitees: 13497, enCours: 1210, rejetees: 529 },
    { name: "Autorisation d'exploiter", total: 11655, traitees: 9357, enCours: 1170, rejetees: 1128 }
  ];

  recentRegistrations = [
    { name: 'Marie Nduwimana', type: 'Nouveau client' },
    { name: 'Samuel Niyonkuru', type: 'Nouvel agent' },
    { name: 'Smart Shop', type: 'Nouveau marchand' },
    { name: 'Innocent Manirakiza', type: 'Nouveau super agent' },
    { name: 'Permis de construire', type: 'Nouveau service public' }
  ];

  pendingRequests = [
    { label: 'Ouverture de compte marchand', value: 12 },
    { label: "Demande d'augmentation de plafond", value: 8 },
    { label: 'Validation de documents KYC', value: 23 },
    { label: "Demande d'habilitation agent", value: 5 },
    { label: 'Création de service public', value: 7 }
  ];

  agentActivities = [
    { label: 'Transactions effectuées', value: '412 589' },
    { label: 'Volume total', value: '98 600 000 Fbu' },
    { label: 'Nouveaux clients enregistrés', value: '32 458' },
    { label: 'Dépôts effectués', value: '45 200 000 Fbu' },
    { label: 'Retraits effectués', value: '32 100 000 Fbu' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initClock();
    this.loadTheme();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initChart();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  private initClock(): void {
    this.updateClock();
    this.clockSubscription = new Subscription();
  }

  private updateClock(): void {
    const now = new Date();
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    this.currentDay = `${days[this.currentDate.getDay()]} ${this.currentDate.getDate()} ${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  private generateSinusoidalData(points: number) {
    const dataDepots: number[] = [];
    const dataRetraits: number[] = [];
    const dataServices: number[] = [];

    for (let i = 0; i < points; i++) {
      const depots = 40 + 20 * Math.sin((i / points) * 2 * Math.PI * 1.5) + (Math.random() - 0.5) * 3;
      const retraits = 25 + 15 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 0.8) + (Math.random() - 0.5) * 2.5;
      const services = 18 + 12 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 1.6) + (Math.random() - 0.5) * 2;
      dataDepots.push(Math.round(depots * 10) / 10);
      dataRetraits.push(Math.round(retraits * 10) / 10);
      dataServices.push(Math.round(services * 10) / 10);
    }
    return { depots: dataDepots, retraits: dataRetraits, services: dataServices };
  }

  private generateLabels(points: number): string[] {
    const labels: string[] = [];
    const startDate = new Date(2025, 5, 29);

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - i);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      if (i % Math.max(1, Math.floor(points / 12)) === 0 || i === points - 1) {
        labels.push(`${day}/${month}`);
      } else {
        labels.push('');
      }
    }
    return labels;
  }

  private initChart(): void {
    if (!this.chartCanvas) return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.createChart(ctx, 30);
  }

  /**
   * Construit le graphique "Évolution des transactions" (Dépôts / Retraits / Services publics).
   * Utilisée à la fois pour l'affichage initial et pour le changement de période.
   */
  private createChart(ctx: CanvasRenderingContext2D, period: number): void {
    const evolutionData = this.generateSinusoidalData(period);
    const labels = this.generateLabels(period);

    // Extraction des variables CSS dynamiques selon le mode (Clair/Sombre)
    const computedStyles = getComputedStyle(document.body);
    const textDimColor = computedStyles.getPropertyValue('--text-dim').trim() || '#a3b1cc';
    const textFaintColor = computedStyles.getPropertyValue('--text-faint').trim() || '#64748b';
    const surfaceColor = computedStyles.getPropertyValue('--surface').trim() || '#111c44';

    const gradientDepots = ctx.createLinearGradient(0, 0, 0, 200);
    gradientDepots.addColorStop(0, 'rgba(59,130,246,.35)');
    gradientDepots.addColorStop(1, 'rgba(59,130,246,0)');

    const gradientRetraits = ctx.createLinearGradient(0, 0, 0, 200);
    gradientRetraits.addColorStop(0, 'rgba(239,68,68,.3)');
    gradientRetraits.addColorStop(1, 'rgba(239,68,68,0)');

    const gradientServices = ctx.createLinearGradient(0, 0, 0, 200);
    gradientServices.addColorStop(0, 'rgba(236,72,153,.3)');
    gradientServices.addColorStop(1, 'rgba(236,72,153,0)');

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Dépôts (M Fbu)',
            data: evolutionData.depots,
            borderColor: '#3b82f6',
            backgroundColor: gradientDepots,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 6
          },
          {
            label: 'Retraits (M Fbu)',
            data: evolutionData.retraits,
            borderColor: '#ef4444',
            backgroundColor: gradientRetraits,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 6
          },
          {
            label: 'Services Publics (M Fbu)',
            data: evolutionData.services,
            borderColor: '#ec4899',
            backgroundColor: gradientServices,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 6,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 600,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: {
            labels: {
              color: textDimColor,
              font: { size: 11, weight: 500 },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: surfaceColor,
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: textDimColor,
            bodyColor: textDimColor,
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(1)} M Fbu`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textFaintColor,
              font: { size: 10 }
            }
          },
          y: {
            grid: { color: 'rgba(255,255,255,.05)' },
            ticks: {
              color: textFaintColor,
              font: { size: 10 },
              callback: (v) => v + 'M'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChartPeriod(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const period = parseInt(select.value, 10);
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    const canvas = this.chartCanvas?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.createChart(ctx, period);
      }
    }
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('iblopay_theme');
    this.isDarkMode = savedTheme !== 'light';
  }

  refreshData(): void {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
      this.initChart();
    }, 1000);
  }

  formatNumber(value: any): string {
    if (typeof value === 'string') return value;
    return value.toLocaleString('fr-FR');
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('fr-FR') + ' Fbu';
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  getChangeSymbol(change: number): string {
    return change >= 0 ? '+' : '';
  }
}