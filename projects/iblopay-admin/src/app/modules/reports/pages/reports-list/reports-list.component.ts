import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportDummyData } from '../../data/report-dummy.data';
import { ReportDefinition } from '../../models/report.models';

interface OverviewCard {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  tone: 'blue' | 'green' | 'cyan' | 'purple' | 'red' | 'orange' | 'teal';
}

interface KeyIndicator {
  label: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'red';
}

interface RecentReport {
  id: number;
  name: string;
  type: string;
  period: string;
  generatedAt: string;
  format: 'PDF' | 'Excel';
  status: 'Terminé' | 'En cours';
  route: string;
}

interface TrendPoint {
  x: number;
  y: number;
  label: string;
  amount: string;
  transactions: string;
  successful: string;
}

interface ChartHover {
  point: TrendPoint;
  leftPercent: number;
  topPercent: number;
}

interface ReportNarrative {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  reports: ReportDefinition[] = [];

  periodStart = '2026-09-01';
  periodEnd = '2026-09-30';
  reportType = 'all';
  status = 'all';
  agent = 'all';
  province = 'all';
  commune = 'all';
  search = '';

  selectedCategory = 'overview';
  page = 1;
  pageSize = 6;

  selectedReport: RecentReport | null = null;
  selectedNarrative: ReportNarrative | null = null;
  chartHover: ChartHover | null = null;

  readonly overviewCards: OverviewCard[] = [
    { label: 'Clients', value: '124 580', subtitle: 'Total des clients', icon: 'fa-solid fa-users', tone: 'blue' },
    { label: 'Agents', value: '3 248', subtitle: 'Agents actifs', icon: 'fa-solid fa-user-tie', tone: 'green' },
    { label: 'Super Agents', value: '48', subtitle: 'Super agents actifs', icon: 'fa-solid fa-wallet', tone: 'teal' },
    { label: 'Marchands', value: '3 285', subtitle: 'Marchands actifs', icon: 'fa-solid fa-store', tone: 'purple' },
    { label: 'Cartes', value: '125 680', subtitle: 'Cartes en circulation', icon: 'fa-solid fa-credit-card', tone: 'cyan' },
    { label: 'Transactions', value: '258 410', subtitle: 'Transactions totales', icon: 'fa-solid fa-right-left', tone: 'red' },
    { label: 'Volume total', value: '5 430 250 000', subtitle: 'Montant total (BIF)', icon: 'fa-solid fa-coins', tone: 'orange' }
  ];

  readonly indicators: KeyIndicator[] = [
    { label: 'Transactions réussies', value: '245 680', helper: '95% de taux de succès', icon: 'fa-solid fa-arrow-right-arrow-left', tone: 'blue' },
    { label: 'Transactions échouées', value: '12 730', helper: '5% de taux d’échec', icon: 'fa-solid fa-circle-xmark', tone: 'red' },
    { label: 'Montant moyen / transaction', value: '21 030 BIF', helper: 'Montant moyen observé sur la période', icon: 'fa-solid fa-coins', tone: 'green' },
    { label: 'Utilisateurs actifs', value: '12 458', helper: 'Clients, agents et marchands actifs', icon: 'fa-solid fa-user-group', tone: 'purple' }
  ];

  readonly categories = [
    { key: 'overview', label: 'Vue d’ensemble', icon: 'fa-solid fa-chart-column' },
    { key: 'clients', label: 'Clients', icon: 'fa-solid fa-users' },
    { key: 'agents', label: 'Agents', icon: 'fa-solid fa-user-tie' },
    { key: 'super-agents', label: 'Super Agents', icon: 'fa-solid fa-wallet' },
    { key: 'merchants', label: 'Marchands', icon: 'fa-solid fa-store' },
    { key: 'cards', label: 'Cartes', icon: 'fa-solid fa-credit-card' },
    { key: 'transactions', label: 'Transactions', icon: 'fa-solid fa-right-left' },
    { key: 'commissions', label: 'Commissions', icon: 'fa-solid fa-coins' },
    { key: 'liquidity', label: 'Solde et liquidité', icon: 'fa-solid fa-wallet' }
  ];

  recentReports: RecentReport[] = [
    { id: 1, name: 'Rapport des transactions', type: 'Transactions', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 11:30', format: 'PDF', status: 'Terminé', route: 'financial' },
    { id: 2, name: 'Rapport des clients', type: 'Clients', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 10:45', format: 'Excel', status: 'Terminé', route: 'kyc-users' },
    { id: 3, name: 'Rapport des agents', type: 'Agents', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 10:20', format: 'PDF', status: 'Terminé', route: 'cash-management' },
    { id: 4, name: 'Rapport des marchands', type: 'Marchands', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 09:50', format: 'Excel', status: 'Terminé', route: 'financial' },
    { id: 5, name: 'Rapport des commissions', type: 'Commissions', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 09:15', format: 'PDF', status: 'Terminé', route: 'commissions' },
    { id: 6, name: 'Rapport de solde et liquidité', type: 'Solde et liquidité', period: '01/09/2026 - 30/09/2026', generatedAt: '30/09/2026 08:40', format: 'Excel', status: 'Terminé', route: 'trust-account' },
    { id: 7, name: 'Rapport des cartes', type: 'Cartes', period: '01/08/2026 - 31/08/2026', generatedAt: '01/09/2026 17:20', format: 'PDF', status: 'Terminé', route: 'offline-pos' },
    { id: 8, name: 'Rapport des super agents', type: 'Super Agents', period: '01/08/2026 - 31/08/2026', generatedAt: '01/09/2026 16:00', format: 'Excel', status: 'Terminé', route: 'commissions' },
    { id: 9, name: 'Rapport de conformité', type: 'Audit', period: '01/08/2026 - 31/08/2026', generatedAt: '01/09/2026 15:10', format: 'PDF', status: 'Terminé', route: 'compliance' },
    { id: 10, name: 'Rapport POS / Offline', type: 'POS', period: '01/08/2026 - 31/08/2026', generatedAt: '01/09/2026 14:45', format: 'Excel', status: 'Terminé', route: 'offline-pos' }
  ];

  readonly trendData: TrendPoint[] = [
    { x: 0, y: 118, label: '23 Sep', amount: '86,4 M BIF', transactions: '31 420', successful: '29 890' },
    { x: 95, y: 92, label: '24 Sep', amount: '108,2 M BIF', transactions: '35 860', successful: '34 110' },
    { x: 190, y: 102, label: '25 Sep', amount: '98,7 M BIF', transactions: '33 240', successful: '31 640' },
    { x: 285, y: 120, label: '26 Sep', amount: '82,1 M BIF', transactions: '29 780', successful: '28 190' },
    { x: 380, y: 70, label: '27 Sep', amount: '136,9 M BIF', transactions: '38 960', successful: '37 240' },
    { x: 475, y: 55, label: '28 Sep', amount: '154,3 M BIF', transactions: '41 580', successful: '39 720' },
    { x: 570, y: 92, label: '29 Sep', amount: '109,5 M BIF', transactions: '36 420', successful: '34 660' },
    { x: 665, y: 100, label: '30 Sep', amount: '101,7 M BIF', transactions: '34 150', successful: '32 590' }
  ];

  readonly trendPoints = this.trendData.map(point => `${point.x},${point.y}`).join(' ');
  readonly trendFillPoints = `${this.trendPoints} 665,150 0,150`;

  constructor(private dummy: ReportDummyData) {}

  ngOnInit(): void {
    this.reports = this.dummy.reports;
  }

  get filteredReports(): RecentReport[] {
    const q = this.search.trim().toLowerCase();
    return this.recentReports.filter(report => {
      const matchesSearch = !q || report.name.toLowerCase().includes(q) || report.type.toLowerCase().includes(q);
      const matchesCategory = this.selectedCategory === 'overview' || this.matchesCategory(report, this.selectedCategory);
      const matchesType = this.reportType === 'all' || report.type.toLowerCase() === this.reportType;
      const matchesStatus = this.status === 'all' || report.status.toLowerCase().replace('é', 'e') === this.status;
      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }

  get paginatedReports(): RecentReport[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredReports.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredReports.length / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selectCategory(key: string): void {
    this.selectedCategory = key;
    this.page = 1;
  }

  applyFilters(): void {
    this.page = 1;
  }

  resetFilters(): void {
    this.periodStart = '2026-09-01';
    this.periodEnd = '2026-09-30';
    this.reportType = 'all';
    this.status = 'all';
    this.agent = 'all';
    this.province = 'all';
    this.commune = 'all';
    this.search = '';
    this.selectedCategory = 'overview';
    this.page = 1;
  }

  generateReport(): void {
    const now = new Date();
    const generatedAt = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const label = this.reportType === 'all' ? 'Rapport général' : `Rapport ${this.reportType}`;
    this.recentReports.unshift({
      id: Date.now(),
      name: label,
      type: this.reportType === 'all' ? 'Vue d’ensemble' : this.reportType,
      period: `${this.formatDate(this.periodStart)} - ${this.formatDate(this.periodEnd)}`,
      generatedAt,
      format: 'PDF',
      status: 'Terminé',
      route: 'financial'
    });
    this.page = 1;
  }

  onChartMove(event: MouseEvent): void {
    const svg = event.currentTarget as SVGElement;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const relativeX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const ratio = relativeX / rect.width;
    const index = Math.max(0, Math.min(this.trendData.length - 1, Math.round(ratio * (this.trendData.length - 1))));
    const point = this.trendData[index];

    this.chartHover = {
      point,
      leftPercent: (point.x / 665) * 100,
      topPercent: (point.y / 150) * 100
    };
  }

  clearChartHover(): void {
    this.chartHover = null;
  }

  openReport(report: RecentReport): void {
    this.selectedReport = report;
    this.selectedNarrative = this.buildNarrative(report);
    document.body.style.overflow = 'hidden';
  }

  closeReport(): void {
    this.selectedReport = null;
    this.selectedNarrative = null;
    document.body.style.overflow = '';
  }

  printSelectedReport(): void {
    window.print();
  }

  downloadReport(report: RecentReport): void {
    const narrative = this.buildNarrative(report);
    const content = [
      'IBLOPAY - RAPPORT',
      narrative.title,
      `Type : ${report.type}`,
      `Période : ${report.period}`,
      `Généré le : ${report.generatedAt}`,
      '',
      ...narrative.paragraphs
    ].join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  deleteReport(report: RecentReport): void {
    this.recentReports = this.recentReports.filter(item => item.id !== report.id);
    if (this.page > this.totalPages) this.page = this.totalPages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.page = page;
  }

  trackById(_: number, item: RecentReport): number {
    return item.id;
  }

  private buildNarrative(report: RecentReport): ReportNarrative {
    const commonIntro = `Ce rapport couvre la période du ${report.period}. Il a été généré le ${report.generatedAt} à partir des informations consolidées de la plateforme IBLOPAY. L’objectif est de présenter une lecture simple et exploitable de l’activité enregistrée pendant la période sélectionnée.`;

    const narratives: Record<string, string[]> = {
      transactions: [
        commonIntro,
        `La plateforme a enregistré 258 410 transactions sur la période. Parmi elles, 245 680 ont été exécutées avec succès tandis que 12 730 ont échoué ou ont nécessité une reprise. Le volume financier total traité s’élève à 5 430 250 000 BIF, soit un montant moyen d’environ 21 030 BIF par transaction.`,
        `L’activité est restée soutenue sur l’ensemble de la période, avec un niveau plus élevé autour des 27 et 28 septembre. Les opérations de transfert, de paiement et de recharge représentent l’essentiel des mouvements observés. Les transactions rejetées doivent continuer à faire l’objet d’un suivi afin d’identifier les causes récurrentes : insuffisance de solde, référence invalide, indisponibilité réseau ou interruption au niveau d’un prestataire.`,
        `Au niveau opérationnel, le rapport recommande de surveiller en priorité les points de forte concentration des transactions et de comparer quotidiennement les montants enregistrés dans IBLOPAY avec les écritures de réconciliation. Cette approche permet de détecter rapidement les écarts et de sécuriser la continuité des opérations.`
      ],
      clients: [
        commonIntro,
        `Le portefeuille compte 124 580 clients enregistrés. Ce chiffre représente l’ensemble des comptes clients présents sur la plateforme au moment de la génération du rapport. La lecture doit être complétée par le suivi des comptes réellement actifs, des nouvelles inscriptions et des comptes nécessitant une mise à jour de leurs informations.`,
        `La qualité des données KYC reste un élément central. Les informations d’identité, les numéros de téléphone et les pièces justificatives doivent rester cohérents afin de limiter les doublons et de faciliter les contrôles. Les dossiers incomplets ou arrivant à expiration doivent être identifiés et traités selon les règles de conformité applicables.`,
        `Le suivi des clients doit également tenir compte de leur niveau d’activité. Une segmentation entre clients actifs, peu actifs et inactifs permet de mieux comprendre l’utilisation réelle de la plateforme et d’orienter les actions de support ou de communication.`
      ],
      agents: [
        commonIntro,
        `Le réseau comprend 3 248 agents actifs. Ces agents assurent une partie essentielle des opérations de proximité, notamment les encaissements, décaissements, recharges et autres services autorisés par la plateforme.`,
        `Le rapport doit être lu en parallèle avec le niveau de liquidité disponible chez chaque agent. Un agent peut être actif dans le système mais rencontrer des contraintes opérationnelles si son solde ou sa trésorerie disponible devient insuffisant. Les mouvements inhabituels, les écarts de caisse et les périodes prolongées d’inactivité nécessitent une attention particulière.`,
        `Pour renforcer le pilotage du réseau, il est recommandé de suivre les volumes par agent, le nombre d’opérations réalisées, les montants approvisionnés et les éventuels incidents déclarés. Ces éléments permettent d’identifier les agents les plus sollicités et ceux qui nécessitent un accompagnement.`
      ],
      'super agents': [
        commonIntro,
        `IBLOPAY compte actuellement 48 super agents actifs chargés d’encadrer et d’approvisionner un réseau d’agents. Leur rôle est stratégique car ils assurent la disponibilité des fonds, la supervision des opérations et le soutien de proximité aux agents qui leur sont rattachés.`,
        `L’analyse doit porter sur les montants approvisionnés, les soldes disponibles, la fréquence des opérations et la répartition des agents sous responsabilité. Une concentration trop importante des opérations sur un nombre limité de super agents peut constituer un risque opérationnel et doit être surveillée.`,
        `Le rapport recommande un contrôle régulier des bordereaux d’approvisionnement et des références bancaires associées afin de garantir que chaque crédit accordé à un super agent est correctement justifié et rapproché des mouvements bancaires.`
      ],
      marchands: [
        commonIntro,
        `Le réseau marchand comprend 3 285 marchands actifs. Ces comptes reçoivent des paiements pour des biens et services et constituent un indicateur important de l’utilisation réelle de la plateforme dans l’économie quotidienne.`,
        `L’analyse doit distinguer les marchands à forte activité de ceux dont l’utilisation reste faible. Le volume des paiements reçus, la fréquence des opérations et le montant moyen permettent d’identifier les segments les plus dynamiques et de repérer d’éventuelles anomalies.`,
        `Un suivi régulier des statuts KYC, des coordonnées de règlement et des mouvements de fonds doit être maintenu afin de sécuriser les paiements marchands et de faciliter les contrôles financiers.`
      ],
      commissions: [
        commonIntro,
        `Les commissions représentent la rémunération calculée sur les opérations éligibles des agents et super agents. Le présent rapport consolide les commissions générées sur la période et permet de vérifier leur cohérence avec les règles configurées dans la plateforme.`,
        `Chaque montant de commission doit pouvoir être rapproché d’une transaction source. Les écarts entre les taux paramétrés et les montants effectivement crédités doivent être analysés avant toute validation définitive.`,
        `Une attention particulière doit être portée aux commissions exceptionnellement élevées, aux annulations de transactions et aux opérations corrigées manuellement. Ces cas doivent rester traçables dans l’historique d’audit.`
      ],
      'solde et liquidité': [
        commonIntro,
        `Ce rapport présente la situation des soldes et de la liquidité disponible dans l’écosystème IBLOPAY. Le volume total observé sur la période s’inscrit dans un mouvement global de 5 430 250 000 BIF de transactions enregistrées.`,
        `La surveillance de la liquidité vise à s’assurer que les agents et super agents disposent de ressources suffisantes pour répondre aux demandes des clients. Les soldes de la plateforme doivent être rapprochés avec les comptes bancaires et les comptes de cantonnement afin de détecter tout écart.`,
        `Les écarts identifiés doivent être documentés, analysés puis régularisés selon une procédure contrôlée. Les mouvements importants ou inhabituels doivent être soumis à une vérification complémentaire avant clôture de la période.`
      ],
      cartes: [
        commonIntro,
        `La plateforme comptabilise 125 680 cartes en circulation. Le rapport permet de suivre les cartes actives, bloquées, expirées ou nécessitant une intervention particulière.`,
        `Chaque carte doit rester associée à un propriétaire clairement identifié et à un historique complet de ses opérations. Les blocages, remplacements et changements de statut doivent être journalisés afin d’assurer la traçabilité.`,
        `Le suivi régulier des cartes contribue à réduire les risques de fraude et permet d’identifier rapidement les comportements anormaux, les cartes inutilisées ou les opérations répétitives nécessitant une vérification.`
      ]
    };

    const key = report.type.toLowerCase();
    const paragraphs = narratives[key] || [
      commonIntro,
      `Les informations consolidées dans ce rapport permettent de suivre l’activité de la catégorie « ${report.type} » et de vérifier la cohérence des principales données enregistrées dans IBLOPAY. Les volumes, statuts et événements significatifs doivent être comparés avec les données opérationnelles disponibles afin d’identifier d’éventuels écarts.`,
      `Toute anomalie détectée doit être documentée et transmise aux équipes concernées pour analyse. Le rapport constitue ainsi un support de contrôle, de suivi opérationnel et d’aide à la décision pour l’administration de la plateforme.`
    ];

    return {
      title: report.name,
      subtitle: `Rapport détaillé — ${report.type}`,
      paragraphs
    };
  }

  private matchesCategory(report: RecentReport, category: string): boolean {
    const type = report.type.toLowerCase();
    const map: Record<string, string[]> = {
      clients: ['clients'],
      agents: ['agents'],
      'super-agents': ['super agents'],
      merchants: ['marchands'],
      cards: ['cartes'],
      transactions: ['transactions'],
      commissions: ['commissions'],
      liquidity: ['solde et liquidité']
    };
    return (map[category] || []).some(value => type.includes(value));
  }

  private formatDate(value: string): string {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }
}
