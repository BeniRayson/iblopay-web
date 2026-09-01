import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// ========== INTERFACES ==========

interface ReportData {
  id: string;
  date: string;
  service: string;
  category: string;
  amount: number;
  status: 'collecte' | 'transfert' | 'valide';
  paymentMethod: string;
  clientName: string;
}

interface KpiData {
  icon: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string;
  }[];
}

interface ReportFilter {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  dateStart: string;
  dateEnd: string;
  category: string;
  service: string;
  status: string;
}

interface SettingsAction {
  label: string;
  actionId: string;
  icon?: string;
  danger?: boolean;
}

interface SettingsSection {
  key: string;
  title: string;
  icon: string;
  description?: string;
  actions?: SettingsAction[];
  open?: boolean;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface AlertConfig {
  id: string;
  name: string;
  type: 'seuil' | 'anomalie' | 'programme' | 'notification';
  active: boolean;
  threshold?: number;
  frequency?: string;
  recipients?: string[];
  lastTriggered?: string;
  description?: string;
}

interface ChartConfig {
  id: string;
  name: string;
  type: 'bar' | 'pie' | 'line' | 'doughnut';
  description: string;
  icon: string;
  data: ChartData;
}

@Component({
  selector: 'app-reports-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reports-settings.component.html',
  styleUrls: ['./reports-settings.component.scss']
})
export class ReportsSettingsComponent implements OnInit {
  readonly title = 'Rapports & Business Intelligence';
  readonly icon = '📈';
  readonly description = 'Dashboard, rapports périodiques, exports et graphiques.';

  // ========== DONNÉES ==========

  sections: SettingsSection[] = [
    {
      key: 'dashboard',
      title: 'Tableau de bord',
      icon: '📊',
      description: 'Vue d\'ensemble des indicateurs clés de performance',
      open: true,
      actions: [
        { label: 'Chiffre d\'affaires', actionId: 'chiffre_affaires', icon: '💰' },
        { label: 'Transactions', actionId: 'transactions', icon: '📋' },
        { label: 'Revenus', actionId: 'revenus', icon: '💵' },
        { label: 'Commissions', actionId: 'commissions', icon: '🏦' },
        { label: 'Nouveaux clients', actionId: 'nouveaux_clients', icon: '👤' },
        { label: 'Croissance', actionId: 'croissance', icon: '📈' }
      ]
    },
    {
      key: 'rapports',
      title: 'Rapports par période',
      icon: '📄',
      description: 'Génération et consultation des rapports périodiques',
      open: false,
      actions: [
        { label: 'Rapport quotidien', actionId: 'quotidien', icon: '📅' },
        { label: 'Rapport hebdomadaire', actionId: 'hebdomadaire', icon: '📊' },
        { label: 'Rapport mensuel', actionId: 'mensuel', icon: '📈' },
        { label: 'Rapport annuel', actionId: 'annuel', icon: '📉' }
      ]
    },
    {
      key: 'exports',
      title: 'Exports & Partage',
      icon: '⬇️',
      description: 'Exportez les rapports dans différents formats',
      open: false,
      actions: [
        { label: 'Exporter en PDF', actionId: 'pdf', icon: '📄' },
        { label: 'Exporter en Excel', actionId: 'excel', icon: '📊' },
        { label: 'Exporter en CSV', actionId: 'csv', icon: '📋' },
        { label: 'Envoyer par email', actionId: 'email', icon: '📧' },
        { label: 'Imprimer', actionId: 'imprimer', icon: '🖨️' }
      ]
    },
    {
      key: 'analyses',
      title: 'Analyses avancées',
      icon: '🔍',
      description: 'Analyses approfondies et Business Intelligence',
      open: false,
      actions: [
        { label: 'Prévisions', actionId: 'previsions', icon: '🔮' },
        { label: 'Tendances', actionId: 'tendances', icon: '📈' },
        { label: 'Segmentation clients', actionId: 'segmentation', icon: '👥' },
        { label: 'Performances', actionId: 'performances', icon: '⭐' }
      ]
    },
    {
      key: 'graphiques',
      title: 'Graphiques & visualisations',
      icon: '📈',
      description: 'Visualisations interactives des données',
      open: false,
      actions: [
        { label: 'Revenus par catégorie', actionId: 'revenus_categorie', icon: '📊' },
        { label: 'Évolution des revenus', actionId: 'evolution_revenus', icon: '📉' },
        { label: 'Répartition des services', actionId: 'repartition_services', icon: '🥧' },
        { label: 'Performance des agents', actionId: 'performance_agents', icon: '📊' },
        { label: 'Transactions par mois', actionId: 'transactions_mois', icon: '📈' }
      ]
    },
    {
      key: 'alertes',
      title: 'Alertes & Notifications',
      icon: '🔔',
      description: 'Configurer les alertes et seuils de notification',
      open: false,
      actions: [
        { label: 'Seuils de revenus', actionId: 'seuils_revenus', icon: '💰' },
        { label: 'Anomalies de transactions', actionId: 'anomalies', icon: '⚠️', danger: true },
        { label: 'Rapports programmés', actionId: 'rapports_programmes', icon: '⏰' },
        { label: 'Notifications en temps réel', actionId: 'notifications', icon: '📱' }
      ]
    }
  ];

  // ========== KPIs ==========

  kpiData: KpiData[] = [
    { icon: '💰', label: 'Chiffre d\'affaires', value: '2 450 000 BIF', change: 12.5, trend: 'up', color: '#1a237e' },
    { icon: '📋', label: 'Transactions', value: '1 283', change: 8.3, trend: 'up', color: '#2e7d32' },
    { icon: '💵', label: 'Revenus', value: '1 820 000 BIF', change: -2.1, trend: 'down', color: '#e65100' },
    { icon: '🏦', label: 'Commissions', value: '245 000 BIF', change: 15.7, trend: 'up', color: '#4a148c' },
    { icon: '👤', label: 'Clients actifs', value: '342', change: 5.2, trend: 'up', color: '#0d47a1' },
    { icon: '📈', label: 'Croissance', value: '+18.4%', change: 3.8, trend: 'up', color: '#bf360c' }
  ];

  // ========== DONNÉES DE TEST ==========

  recentTransactions: ReportData[] = [
    { id: 'TRX-001', date: '2025-01-15', service: 'ARCT - Autorisation réseaux', category: 'Communications', amount: 25000, status: 'valide', paymentMethod: 'Mobile Money', clientName: 'Jean Bosco NIZIGIYIMANA' },
    { id: 'TRX-002', date: '2025-01-15', service: 'OBM - Or', category: 'Mines', amount: 75000, status: 'valide', paymentMethod: 'Banque', clientName: 'Marie Claire NDIKUMANA' },
    { id: 'TRX-003', date: '2025-01-14', service: 'Education - Attestation équivalence', category: 'Éducation', amount: 15000, status: 'transfert', paymentMethod: 'Wallet', clientName: 'Pierre HAKIZIMANA' },
    { id: 'TRX-004', date: '2025-01-14', service: 'Licences - Débit de boissons', category: 'Licences', amount: 50000, status: 'collecte', paymentMethod: 'Cash', clientName: 'Françoise NIBITANGA' },
    { id: 'TRX-005', date: '2025-01-13', service: 'Transport - Permis de conduire', category: 'Transport', amount: 35000, status: 'valide', paymentMethod: 'Mobile Money', clientName: 'Emmanuel NTAKIRUTIMANA' }
  ];

  // ========== GRAPHIQUES ==========

  chartConfigs: ChartConfig[] = [
    {
      id: '1',
      name: 'Revenus par catégorie',
      type: 'bar',
      description: 'Répartition des revenus par catégorie de service',
      icon: '📊',
      data: {
        labels: ['Communications', 'Mines', 'Environnement', 'Éducation', 'Licences', 'Transport', 'Autres'],
        datasets: [{
          label: 'Revenus par catégorie',
          data: [820000, 450000, 280000, 180000, 150000, 120000, 90000],
          backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C', '#E65100', '#B8791C']
        }]
      }
    },
    {
      id: '2',
      name: 'Évolution des revenus',
      type: 'line',
      description: 'Évolution des revenus sur les 12 derniers mois',
      icon: '📉',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [{
          label: 'Revenus 2025',
          data: [120000, 135000, 98000, 165000, 142000, 189000, 210000, 178000, 220000, 195000, 245000, 280000],
          backgroundColor: ['#0F6E5B'],
          borderColor: '#0F6E5B'
        }]
      }
    },
    {
      id: '3',
      name: 'Répartition des services',
      type: 'pie',
      description: 'Répartition des revenus par service',
      icon: '🥧',
      data: {
        labels: ['ARCT', 'OBM', 'OBPE', 'Éducation', 'Licences', 'Transport', 'Autres'],
        datasets: [{
          label: 'Répartition',
          data: [35, 20, 15, 10, 8, 7, 5],
          backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C', '#E65100', '#B8791C']
        }]
      }
    },
    {
      id: '4',
      name: 'Performance des agents',
      type: 'bar',
      description: 'Performance des agents par volume de transactions',
      icon: '📊',
      data: {
        labels: ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'],
        datasets: [{
          label: 'Transactions',
          data: [145, 120, 98, 85, 67],
          backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C']
        }]
      }
    },
    {
      id: '5',
      name: 'Transactions par mois',
      type: 'line',
      description: 'Nombre de transactions par mois',
      icon: '📈',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [{
          label: 'Transactions',
          data: [85, 92, 78, 110, 95, 120, 135, 115, 140, 125, 155, 170],
          backgroundColor: ['#1A56DB'],
          borderColor: '#1A56DB'
        }]
      }
    }
  ];

  // ========== ALERTES ==========

  alertConfigs: AlertConfig[] = [
    { 
      id: '1', 
      name: 'Seuil de revenus minimum', 
      type: 'seuil', 
      active: true, 
      threshold: 50000, 
      lastTriggered: '2025-01-10',
      description: 'Alerte lorsque les revenus journaliers sont inférieurs à 50 000 BIF'
    },
    { 
      id: '2', 
      name: 'Anomalies de transactions', 
      type: 'anomalie', 
      active: true, 
      lastTriggered: '2025-01-12',
      description: 'Détection des transactions suspectes ou anormales'
    },
    { 
      id: '3', 
      name: 'Rapport mensuel automatique', 
      type: 'programme', 
      active: true, 
      frequency: 'mensuel', 
      recipients: ['admin@iblopay.bi', 'finance@iblopay.bi'],
      description: 'Envoi automatique du rapport mensuel aux destinataires'
    },
    { 
      id: '4', 
      name: 'Notification de paiement', 
      type: 'notification', 
      active: true,
      description: 'Notification en temps réel lors des paiements importants'
    },
    { 
      id: '5', 
      name: 'Seuil de transactions par jour', 
      type: 'seuil', 
      active: false, 
      threshold: 200, 
      lastTriggered: '2025-01-08',
      description: 'Alerte lorsque le nombre de transactions dépasse 200 par jour'
    },
    { 
      id: '6', 
      name: 'Anomalie de montant', 
      type: 'anomalie', 
      active: true, 
      lastTriggered: '2025-01-14',
      description: 'Détection des montants anormalement élevés ou bas'
    },
    { 
      id: '7', 
      name: 'Rapport hebdomadaire', 
      type: 'programme', 
      active: true, 
      frequency: 'hebdomadaire', 
      recipients: ['direction@iblopay.bi'],
      description: 'Résumé hebdomadaire des activités'
    },
    { 
      id: '8', 
      name: 'Alerte de dépassement de plafond', 
      type: 'notification', 
      active: false,
      description: 'Notification lorsque les plafonds de services sont atteints'
    }
  ];

  // ========== RAPPORTS GÉNÉRÉS ==========
  
  generatedReports: any[] = [];

  // ========== FILTRES ==========

  filters: ReportFilter = {
    period: 'monthly',
    dateStart: '',
    dateEnd: '',
    category: 'all',
    service: 'all',
    status: 'all'
  };

  // ========== ÉTAT ==========

  showModal: boolean = false;
  modalTitle: string = '';
  modalType: string = '';
  modalData: any = {};
  showPinModal: boolean = false;
  pinCode: string = '';
  toasts: Toast[] = [];
  private toastSeq = 0;
  activeTab: string = 'dashboard';
  showReportModal: boolean = false;
  reportType: string = '';
  selectedPeriod: string = 'monthly';
  showGeneratedReports: boolean = false;
  selectedChart: ChartConfig | null = null;

  // ========== CONSTRUCTEUR ==========

  constructor() {
    this.loadData();
    this.initDates();
    this.loadGeneratedReports();
    this.loadAlertConfigs();
  }

  ngOnInit(): void {}

  // ========== INITIALISATION DES DATES ==========

  private initDates(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.filters.dateStart = firstDay.toISOString().split('T')[0] || '';
    this.filters.dateEnd = now.toISOString().split('T')[0] || '';
    
    if (!this.filters.dateStart) this.filters.dateStart = '2024-01-01';
    if (!this.filters.dateEnd) this.filters.dateEnd = '2024-12-31';
  }

  // ========== CHARGEMENT DES DONNÉES ==========

  private loadData(): void {
    const saved = localStorage.getItem('reports_settings_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.filters) {
          this.filters = { ...this.filters, ...data.filters };
          if (!this.filters.dateStart) this.filters.dateStart = '2024-01-01';
          if (!this.filters.dateEnd) this.filters.dateEnd = '2024-12-31';
        }
      } catch (e) {
        console.error('Erreur de chargement des données', e);
      }
    }
  }

  private saveData(): void {
    const data = { filters: this.filters };
    localStorage.setItem('reports_settings_data', JSON.stringify(data));
  }

  // ========== GESTION DES RAPPORTS GÉNÉRÉS ==========

  private loadGeneratedReports(): void {
    const saved = localStorage.getItem('generated_reports');
    if (saved) {
      try {
        this.generatedReports = JSON.parse(saved);
      } catch (e) {
        console.error('Erreur de chargement des rapports', e);
      }
    }
  }

  private saveGeneratedReports(): void {
    localStorage.setItem('generated_reports', JSON.stringify(this.generatedReports));
  }

  private loadAlertConfigs(): void {
    const saved = localStorage.getItem('alert_configs');
    if (saved) {
      try {
        this.alertConfigs = JSON.parse(saved);
      } catch (e) {
        console.error('Erreur de chargement des alertes', e);
      }
    }
  }

  private saveAlertConfigs(): void {
    localStorage.setItem('alert_configs', JSON.stringify(this.alertConfigs));
  }

  // ========== ACTIONS ==========

  onAction(section: SettingsSection, action: SettingsAction, group?: any): void {
    console.log('[ReportsSettings]', section.key, action.actionId);
    
    switch(action.actionId) {
      case 'chiffre_affaires':
      case 'transactions':
      case 'revenus':
      case 'commissions':
      case 'nouveaux_clients':
      case 'croissance':
        this.openReportModal(action.label, '📊');
        break;
      case 'quotidien':
      case 'hebdomadaire':
      case 'mensuel':
      case 'annuel':
        this.generateReport(action.actionId);
        break;
      case 'pdf':
        this.exportReport('PDF');
        break;
      case 'excel':
        this.exportReport('Excel');
        break;
      case 'csv':
        this.exportReport('CSV');
        break;
      case 'email':
        this.sendReportByEmail();
        break;
      case 'imprimer':
        this.printReport();
        break;
      case 'previsions':
        this.showAnalysis('previsions');
        break;
      case 'tendances':
        this.showAnalysis('tendances');
        break;
      case 'segmentation':
        this.showAnalysis('segmentation');
        break;
      case 'performances':
        this.showAnalysis('performances');
        break;
      case 'revenus_categorie':
        this.showChartById('1');
        break;
      case 'evolution_revenus':
        this.showChartById('2');
        break;
      case 'repartition_services':
        this.showChartById('3');
        break;
      case 'performance_agents':
        this.showChartById('4');
        break;
      case 'transactions_mois':
        this.showChartById('5');
        break;
      case 'seuils_revenus':
        this.openAlertConfig('seuils');
        break;
      case 'anomalies':
        this.openAlertConfig('anomalies');
        break;
      case 'rapports_programmes':
        this.openAlertConfig('programmes');
        break;
      case 'notifications':
        this.openAlertConfig('notifications');
        break;
      default:
        this.toast(`Action ${action.label} déclenchée`, 'info');
    }
  }

  // ========== GESTION DES RAPPORTS ==========

  openReportModal(title: string, icon: string): void {
    this.modalTitle = title;
    this.modalType = 'report_detail';
    this.modalData = { icon, data: this.recentTransactions };
    this.showModal = true;
  }

  generateReport(type: string): void {
    const labels: Record<string, string> = {
      quotidien: 'Rapport quotidien',
      hebdomadaire: 'Rapport hebdomadaire',
      mensuel: 'Rapport mensuel',
      annuel: 'Rapport annuel'
    };
    
    this.reportType = type;
    this.showReportModal = true;
    this.toast(`Génération du ${labels[type]} en cours...`, 'info');
    
    setTimeout(() => {
      const report = {
        id: `RPT-${String(100000 + this.generatedReports.length + 1).padStart(6, '0')}`,
        name: labels[type],
        type: type,
        date: new Date().toLocaleDateString('fr-FR'),
        status: 'généré',
        data: this.recentTransactions.map(tx => ({ ...tx }))
      };
      
      this.generatedReports.push(report);
      this.saveGeneratedReports();
      
      this.toast(`${labels[type]} généré avec succès`, 'success');
      this.showReportModal = false;
      this.showGeneratedReports = true;
      
      this.modalTitle = `📄 ${labels[type]}`;
      this.modalType = 'report_detail';
      this.modalData = { 
        icon: '📄', 
        data: report.data,
        reportInfo: {
          id: report.id,
          date: report.date,
          name: report.name
        }
      };
      this.showModal = true;
    }, 2000);
  }

  closeReportModal(): void {
    this.showReportModal = false;
  }

  // ========== EXPORTS ==========

  exportReport(format: string): void {
    const data = this.modalData.data || this.recentTransactions;
    let content = '';
    let filename = `rapport_${new Date().toISOString().split('T')[0]}`;
    let mimeType = '';
    
    const headers = ['Date', 'Client', 'Service', 'Catégorie', 'Montant', 'Statut'];
    const rows = data.map((tx: any) => [
      tx.date,
      tx.clientName,
      tx.service,
      tx.category || 'N/A',
      tx.amount.toString(),
      tx.status
    ]);
    
    const csvContent = [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');
    
    switch(format) {
      case 'PDF':
        mimeType = 'application/pdf';
        content = csvContent;
        filename += '.pdf';
        break;
      case 'Excel':
        mimeType = 'application/vnd.ms-excel';
        content = csvContent;
        filename += '.xls';
        break;
      case 'CSV':
        mimeType = 'text/csv';
        content = csvContent;
        filename += '.csv';
        break;
      default:
        mimeType = 'text/plain';
        content = csvContent;
        filename += '.txt';
    }
    
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    this.toast(`Export en ${format} terminé avec succès`, 'success');
  }

  sendReportByEmail(): void {
    this.toast('Envoi par email en cours...', 'info');
    setTimeout(() => {
      this.toast('Rapport envoyé par email avec succès', 'success');
    }, 1500);
  }

  printReport(): void {
    this.toast('Impression en cours...', 'info');
    setTimeout(() => {
      window.print();
      this.toast('Impression terminée', 'success');
    }, 500);
  }

  // ========== ANALYSES ==========

  showAnalysis(type: string): void {
    const titles: Record<string, string> = {
      previsions: '🔮 Prévisions',
      tendances: '📈 Tendances',
      segmentation: '👥 Segmentation clients',
      performances: '⭐ Performances'
    };
    
    const dataMap: Record<string, any> = {
      previsions: {
        title: 'Analyse prédictive des revenus',
        description: 'Prévisions des revenus pour les 12 prochains mois basées sur les données historiques.',
        data: [
          { mois: 'Jan 2026', prevision: '285 000 BIF', confiance: '95%', tendance: '📈' },
          { mois: 'Fév 2026', prevision: '292 000 BIF', confiance: '93%', tendance: '📈' },
          { mois: 'Mar 2026', prevision: '305 000 BIF', confiance: '90%', tendance: '📈' },
          { mois: 'Avr 2026', prevision: '315 000 BIF', confiance: '88%', tendance: '📈' }
        ]
      },
      tendances: {
        title: 'Analyse des tendances',
        description: 'Détection des tendances saisonnières et des cycles de revenus.',
        data: [
          { periode: 'Q1 2025', revenus: '450 000 BIF', croissance: '+8%', saison: '📊' },
          { periode: 'Q2 2025', revenus: '520 000 BIF', croissance: '+15%', saison: '📈' },
          { periode: 'Q3 2025', revenus: '580 000 BIF', croissance: '+11%', saison: '📉' },
          { periode: 'Q4 2025', revenus: '650 000 BIF', croissance: '+12%', saison: '📈' }
        ]
      },
      segmentation: {
        title: 'Segmentation des clients',
        description: 'Classification des clients par volume de transactions et valeur.',
        data: [
          { segment: 'Premium', clients: '45', revenus: '450 000 BIF', pourcentage: '32%' },
          { segment: 'Standard', clients: '120', revenus: '520 000 BIF', pourcentage: '38%' },
          { segment: 'Basique', clients: '177', revenus: '380 000 BIF', pourcentage: '30%' }
        ]
      },
      performances: {
        title: 'Analyse des performances',
        description: 'Évaluation des performances par service et par catégorie.',
        data: [
          { service: 'ARCT', revenus: '820 000 BIF', transactions: '450', note: '⭐⭐⭐⭐⭐' },
          { service: 'OBM', revenus: '450 000 BIF', transactions: '280', note: '⭐⭐⭐⭐' },
          { service: 'Transport', revenus: '180 000 BIF', transactions: '120', note: '⭐⭐⭐' },
          { service: 'Éducation', revenus: '120 000 BIF', transactions: '95', note: '⭐⭐⭐' }
        ]
      }
    };

    this.modalTitle = titles[type] || 'Analyse';
    this.modalType = 'analysis';
    this.modalData = dataMap[type] || { 
      title: 'Analyse', 
      description: '', 
      data: [] 
    };
    this.showModal = true;
  }

  // ========== GRAPHIQUES ==========

  showChartById(chartId: string): void {
    const chart = this.chartConfigs.find(c => c.id === chartId);
    if (chart) {
      this.selectedChart = chart;
      this.modalTitle = `📊 ${chart.name}`;
      this.modalType = 'chart_detail';
      this.modalData = {
        chart: chart,
        description: chart.description
      };
      this.showModal = true;
    }
  }

  // ========== ALERTES ==========

  openAlertConfig(type: string): void {
    const titles: Record<string, string> = {
      seuils: '🔔 Configuration des seuils de revenus',
      anomalies: '🔔 Configuration des alertes d\'anomalies',
      programmes: '🔔 Configuration des rapports programmés',
      notifications: '🔔 Configuration des notifications'
    };
    
    let filteredAlerts = this.alertConfigs.filter(a => {
      if (type === 'seuils') return a.type === 'seuil';
      if (type === 'anomalies') return a.type === 'anomalie';
      if (type === 'programmes') return a.type === 'programme';
      if (type === 'notifications') return a.type === 'notification';
      return false;
    });
    
    if (filteredAlerts.length === 0) {
      filteredAlerts = this.alertConfigs;
    }
    
    this.modalTitle = titles[type] || 'Configuration des alertes';
    this.modalType = 'alert_config';
    this.modalData = {
      type: type,
      alerts: filteredAlerts,
      allAlerts: this.alertConfigs
    };
    this.showModal = true;
  }

  toggleAlert(alert: AlertConfig): void {
    alert.active = !alert.active;
    this.saveAlertConfigs();
    this.toast(`Alerte "${alert.name}" ${alert.active ? 'activée' : 'désactivée'} avec succès`, 'success');
  }

  deleteAlert(alert: AlertConfig): void {
    if (confirm(`Voulez-vous vraiment supprimer l'alerte "${alert.name}" ?`)) {
      this.alertConfigs = this.alertConfigs.filter(a => a.id !== alert.id);
      this.saveAlertConfigs();
      this.toast(`Alerte "${alert.name}" supprimée avec succès`, 'success');
      this.openAlertConfig(this.modalData.type || 'seuils');
    }
  }

  addAlert(): void {
    const newAlert: AlertConfig = {
      id: String(Date.now()),
      name: 'Nouvelle alerte',
      type: this.modalData.type === 'seuils' ? 'seuil' : 
             this.modalData.type === 'anomalies' ? 'anomalie' :
             this.modalData.type === 'programmes' ? 'programme' : 'notification',
      active: true,
      threshold: 100000,
      frequency: 'mensuel',
      recipients: ['admin@iblopay.bi'],
      description: 'Description de la nouvelle alerte'
    };
    
    this.alertConfigs.push(newAlert);
    this.saveAlertConfigs();
    this.toast('Nouvelle alerte ajoutée avec succès', 'success');
    this.openAlertConfig(this.modalData.type || 'seuils');
  }

  // ========== PIN MODAL ==========

  openPinModal(title: string): void {
    this.modalTitle = `🔐 ${title}`;
    this.pinCode = '';
    this.showPinModal = true;
  }

  addPinDigit(digit: number): void {
    if (this.pinCode.length < 4) {
      this.pinCode += digit.toString();
    }
  }

  clearPin(): void {
    this.pinCode = '';
  }

  confirmPin(): void {
    if (this.pinCode === '1234') {
      this.showPinModal = false;
      this.toast('Configuration validée avec succès', 'success');
    } else {
      this.toast('Code PIN incorrect', 'danger');
      this.pinCode = '';
    }
  }

  closePinModal(): void {
    this.showPinModal = false;
    this.pinCode = '';
  }

  // ========== MODAL ==========

  closeModal(): void {
    this.showModal = false;
    this.modalData = {};
    this.selectedChart = null;
  }

  // ========== FILTRES ==========

  applyFilters(): void {
    if (!this.filters.dateStart) this.filters.dateStart = '2024-01-01';
    if (!this.filters.dateEnd) this.filters.dateEnd = '2024-12-31';
    this.saveData();
    this.toast('Filtres appliqués avec succès', 'success');
  }

  resetFilters(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.filters = {
      period: 'monthly',
      dateStart: firstDay.toISOString().split('T')[0] || '2024-01-01',
      dateEnd: now.toISOString().split('T')[0] || '2024-12-31',
      category: 'all',
      service: 'all',
      status: 'all'
    };
    this.saveData();
    this.toast('Filtres réinitialisés', 'info');
  }

  // ========== MÉTHODES POUR LES GRAPHIQUES ==========

  getChartTotal(chart: ChartConfig): string {
    if (!chart || !chart.data || !chart.data.datasets || chart.data.datasets.length === 0) {
      return '0';
    }
    const dataset = chart.data.datasets[0];
    if (!dataset || !dataset.data) {
      return '0';
    }
    const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
    return total.toLocaleString('fr-FR');
  }

  getChartAverage(chart: ChartConfig): string {
    if (!chart || !chart.data || !chart.data.datasets || chart.data.datasets.length === 0) {
      return '0';
    }
    const dataset = chart.data.datasets[0];
    if (!dataset || !dataset.data || chart.data.labels.length === 0) {
      return '0';
    }
    const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
    const avg = total / chart.data.labels.length;
    return Math.round(avg).toLocaleString('fr-FR');
  }

  // ========== MÉTHODES POUR LES ALERTES ==========

  getAlertTotal(alerts: AlertConfig[]): number {
    return alerts ? alerts.length : 0;
  }

  getAlertActiveCount(alerts: AlertConfig[]): number {
    return alerts ? alerts.filter(a => a.active).length : 0;
  }

  getAlertInactiveCount(alerts: AlertConfig[]): number {
    return alerts ? alerts.filter(a => !a.active).length : 0;
  }

  // ========== MÉTHODES POUR LES GRAPHIQUES EN LIGNE ==========

  getLinePoints(data: number[], width: number, height: number): string {
    if (!data || data.length === 0) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    return data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  }

  getLinePointsArray(data: number[], width: number, height: number): {x: number, y: number}[] {
    if (!data || data.length === 0) return [];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    return data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return { x, y };
    });
  }

  // ========== MÉTHODES POUR LES UTILITAIRES ==========

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      collecte: '📥 Collectée',
      transfert: '🔄 En transfert',
      valide: '✅ Validée',
      généré: '✅ Généré'
    };
    return labels[status] || status;
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      collecte: 'status-badge--collecte',
      transfert: 'status-badge--transfert',
      valide: 'status-badge--valide',
      généré: 'status-badge--valide'
    };
    return colors[status] || '';
  }

  getPeriodLabel(period: string): string {
    const labels: Record<string, string> = {
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      yearly: 'Annuel',
      custom: 'Personnalisé'
    };
    return labels[period] || period;
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getAlertTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      seuil: 'Seuil de revenus',
      anomalie: 'Anomalie',
      programme: 'Rapport programmé',
      notification: 'Notification'
    };
    return labels[type] || type;
  }

  getAlertStatusLabel(active: boolean): string {
    return active ? '✅ Actif' : '⛔ Inactif';
  }

  getChartTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      bar: 'Barres',
      pie: 'Camembert',
      line: 'Ligne',
      doughnut: 'Anneau'
    };
    return labels[type] || type;
  }

  getChartIcon(type: string): string {
    const icons: Record<string, string> = {
      bar: '📊',
      pie: '🥧',
      line: '📈',
      doughnut: '⭕'
    };
    return icons[type] || '📊';
  }

  // ========== TOASTS ==========

  toast(message: string, type: Toast['type'] = 'info'): void {
    const id = ++this.toastSeq;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.dismissToast(id), 5000);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}