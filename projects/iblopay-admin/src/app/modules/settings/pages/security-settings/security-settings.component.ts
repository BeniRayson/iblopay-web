import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface TabItem {
  key: string;
  label: string;
  icon: string;
  count?: number;
}

interface KpiData {
  icon: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface AuditLog {
  id: string;
  date: string;
  time: string;
  user: string;
  type: 'connexion' | 'transaction' | 'commission' | 'taxe' | 'transfert' | 'systeme';
  action: string;
  description: string;
  amount: number;
  ip: string;
  status: 'success' | 'warning' | 'danger';
  service?: string;
  reference?: string;
}

interface FraudRule {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'transaction' | 'connexion' | 'comportement';
  threshold: string;
  detected: number;
  active: boolean;
  config: {
    minAmount?: number;
    maxAmount?: number;
    timeWindow?: number;
    transactionCount?: number;
    ipBlacklist?: string[];
    countryBlacklist?: string[];
    velocityCheck?: boolean;
    deviceFingerprint?: boolean;
    anomalyDetection?: boolean;
    alertLevel: 'low' | 'medium' | 'high' | 'critical';
    action: 'block' | 'alert' | 'notify' | 'review';
    notifyEmail?: string;
    notifyPhone?: string;
  };
}

interface Activity {
  time: string;
  user: string;
  action: string;
  status: 'success' | 'warning' | 'danger';
  description?: string;
}

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {
  readonly title = 'Sécurité & Conformité';
  readonly icon = '🔐';
  readonly Math = Math;

  activeTab: string = 'dashboard';
  showModal: boolean = false;
  modalTitle: string = '';
  modalType: string = '';
  modalData: any = {};
  selectedItem: any = null;
  formData: any = {};
  toasts: Toast[] = [];
  private toastSeq = 0;

  // Audit filters
  auditSearchTerm: string = '';
  auditTypeFilter: string = '';
  auditDateFrom: string = '';
  auditDateTo: string = '';
  auditStatusFilter: string = '';
  filteredAuditLogs: AuditLog[] = [];

  // Audit pagination
  auditPageSize: number = 100;
  auditCurrentPage: number = 1;

  // AML filters
  amlStatusFilter: string = '';
  amlRiskFilter: string = '';
  filteredAMLLogs: any[] = [];

  // AML pagination
  amlPageSize: number = 50;
  amlCurrentPage: number = 1;

  tabs: TabItem[] = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { key: 'audit', label: 'Audit Complet', icon: '📋' },
    { key: 'fraude', label: 'Détection de fraude', icon: '🚨' },
    { key: 'kyc', label: 'KYC', icon: '🪪' },
    { key: 'aml', label: 'AML', icon: '⚖️' }
  ];

  kpiData: KpiData[] = [
    { icon: '🛡️', label: 'Sécurité', value: '98%', change: '+2%', trend: 'up', color: '#2e7d32' },
    { icon: '💰', label: 'Transactions', value: '12 450', change: '+8%', trend: 'up', color: '#1a237e' },
    { icon: '📋', label: 'Audit logs', value: '1 890', change: '+12%', trend: 'up', color: '#0d47a1' },
    { icon: '🚨', label: 'Alertes', value: '3', change: '-1', trend: 'down', color: '#e65100' },
    { icon: '🪪', label: 'KYC en attente', value: '156', change: '+5%', trend: 'up', color: '#4a148c' },
    { icon: '🏦', label: 'Commissions', value: '245 000 BIF', change: '+15%', trend: 'up', color: '#bf360c' }
  ];

  recentActivities: Activity[] = [
    { time: '14:32', user: 'Jean B.', action: 'Connexion réussie', status: 'success' },
    { time: '14:28', user: 'Marie C.', action: 'Transfert de 150 000 BIF', status: 'success', description: 'Compte Agent' },
    { time: '14:15', user: 'Pierre H.', action: 'Tentative de connexion échouée', status: 'danger' },
    { time: '14:00', user: 'Françoise N.', action: 'Commission Super Agent calculée', status: 'success', description: '12 500 BIF' },
    { time: '13:45', user: 'Emmanuel N.', action: 'Taxe État prélevée', status: 'success', description: '8 200 BIF' },
    { time: '13:30', user: 'David N.', action: 'Dépôt client effectué', status: 'success', description: '500 000 BIF' },
    { time: '13:15', user: 'Esther N.', action: 'Commission IBLOPAY générée', status: 'warning', description: '6 800 BIF' }
  ];

  auditLogs: AuditLog[] = [
    { id: '1', date: '15/01', time: '14:32', user: 'Jean B.', type: 'connexion', action: 'Connexion réussie', description: 'Utilisateur connecté depuis Chrome/Windows', amount: 0, ip: '192.168.1.100', status: 'success' },
    { id: '2', date: '15/01', time: '14:28', user: 'Marie C.', type: 'transfert', action: 'Transfert client', description: 'Transfert de 150 000 BIF vers compte Agent', amount: 150000, ip: '192.168.1.101', status: 'success', service: 'Agent', reference: 'TRX-001' },
    { id: '3', date: '15/01', time: '14:15', user: 'Pierre H.', type: 'connexion', action: 'Tentative de connexion', description: '3 tentatives échouées en 2 minutes', amount: 0, ip: '10.0.0.50', status: 'danger' },
    { id: '4', date: '15/01', time: '14:00', user: 'Françoise N.', type: 'commission', action: 'Commission Super Agent', description: 'Commission calculée pour Super Agent', amount: 12500, ip: '192.168.1.102', status: 'success', service: 'Super Agent', reference: 'COM-001' },
    { id: '5', date: '15/01', time: '13:45', user: 'Emmanuel N.', type: 'taxe', action: 'Taxe État', description: 'Prélèvement taxe État sur transaction', amount: 8200, ip: '192.168.1.103', status: 'success', service: 'État', reference: 'TAX-001' },
    { id: '6', date: '15/01', time: '13:30', user: 'David N.', type: 'transaction', action: 'Dépôt client', description: 'Dépôt de 500 000 BIF effectué', amount: 500000, ip: '192.168.1.104', status: 'success', service: 'Client', reference: 'DEP-001' },
    { id: '7', date: '15/01', time: '13:15', user: 'Esther N.', type: 'commission', action: 'Commission IBLOPAY', description: 'Commission générée pour IBLOPAY', amount: 6800, ip: '192.168.1.105', status: 'warning', service: 'IBLOPAY', reference: 'COM-002' },
    { id: '8', date: '15/01', time: '13:00', user: 'Système', type: 'systeme', action: 'Backup journalier', description: 'Sauvegarde des données effectuée', amount: 0, ip: 'localhost', status: 'success' },
    { id: '9', date: '15/01', time: '12:45', user: 'Jean B.', type: 'commission', action: 'Commission Agent', description: 'Commission calculée pour Agent', amount: 8500, ip: '192.168.1.100', status: 'success', service: 'Agent', reference: 'COM-003' },
    { id: '10', date: '15/01', time: '12:30', user: 'Marie C.', type: 'transfert', action: 'Transfert inter-comptes', description: 'Transfert de 75 000 BIF entre comptes', amount: 75000, ip: '192.168.1.101', status: 'success', service: 'IBLOPAY', reference: 'TRX-002' },
    { id: '11', date: '15/01', time: '12:15', user: 'Pierre H.', type: 'taxe', action: 'Taxe sur transaction', description: 'Taxe prélevée sur transaction', amount: 4500, ip: '10.0.0.50', status: 'danger', service: 'État', reference: 'TAX-002' },
    { id: '12', date: '15/01', time: '12:00', user: 'Françoise N.', type: 'transaction', action: 'Retrait client', description: 'Retrait de 200 000 BIF effectué', amount: 200000, ip: '192.168.1.102', status: 'success', service: 'Client', reference: 'RET-001' },
    // Ajout de transactions > 1 million pour tester l'alerte
    { id: '13', date: '15/01', time: '11:45', user: 'Test User', type: 'transaction', action: 'Dépôt exceptionnel', description: 'Dépôt de 2 500 000 BIF', amount: 2500000, ip: '192.168.1.106', status: 'success', service: 'Client', reference: 'DEP-002' },
    { id: '14', date: '15/01', time: '11:30', user: 'VIP Client', type: 'transfert', action: 'Transfert important', description: 'Transfert de 1 500 000 BIF', amount: 1500000, ip: '192.168.1.107', status: 'success', service: 'Agent', reference: 'TRX-003' }
  ];

  fraudRules: FraudRule[] = [
    {
      id: '1',
      name: 'Transactions multiples',
      icon: '🔄',
      description: 'Détection des transactions multiples en peu de temps',
      category: 'transaction',
      threshold: '5 en 15 min',
      detected: 12,
      active: true,
      config: {
        transactionCount: 5,
        timeWindow: 15,
        alertLevel: 'high',
        action: 'block',
        velocityCheck: true,
        anomalyDetection: true,
        notifyEmail: 'fraude@iblopay.bi',
        notifyPhone: '+257 79 123 456'
      }
    },
    {
      id: '2',
      name: 'Montant anormal',
      icon: '💰',
      description: 'Détection des montants anormalement élevés',
      category: 'transaction',
      threshold: '> 1 000 000 BIF',
      detected: 8,
      active: true,
      config: {
        minAmount: 500000,
        maxAmount: 1000000,
        alertLevel: 'critical',
        action: 'review',
        anomalyDetection: true,
        notifyEmail: 'securite@iblopay.bi',
        notifyPhone: '+257 79 789 012'
      }
    },
    {
      id: '3',
      name: 'IP suspecte',
      icon: '🌐',
      description: 'Détection des connexions depuis IP à risque',
      category: 'connexion',
      threshold: 'Liste noire IP',
      detected: 3,
      active: false,
      config: {
        ipBlacklist: ['192.168.0.0', '10.0.0.0', '172.16.0.0'],
        countryBlacklist: ['XX', 'YY'],
        alertLevel: 'high',
        action: 'block',
        deviceFingerprint: true,
        notifyEmail: 'security@iblopay.bi'
      }
    },
    {
      id: '4',
      name: 'Comportement suspect',
      icon: '👤',
      description: 'Détection des comportements anormaux des utilisateurs',
      category: 'comportement',
      threshold: 'Déviation > 3 écarts-types',
      detected: 5,
      active: true,
      config: {
        velocityCheck: true,
        deviceFingerprint: true,
        anomalyDetection: true,
        alertLevel: 'medium',
        action: 'alert',
        notifyEmail: 'fraude@iblopay.bi'
      }
    }
  ];

  kycVerifications: any[] = [
    { id: '1', user: 'Jean B. NIZIGIYIMANA', documentType: 'CNI', submittedDate: '2025-01-10', status: 'approved', documentId: 'CNI-001', expiryDate: '2030-01-10' },
    { id: '2', user: 'Marie C. NDIKUMANA', documentType: 'Passeport', submittedDate: '2025-01-08', status: 'pending', documentId: 'PAS-002', expiryDate: '2025-07-08' },
    { id: '3', user: 'Pierre HAKIZIMANA', documentType: 'Permis', submittedDate: '2025-01-05', status: 'rejected', documentId: 'PER-003', expiryDate: '2025-12-05' },
    { id: '4', user: 'Françoise NIBITANGA', documentType: 'CNI', submittedDate: '2025-01-12', status: 'approved', documentId: 'CNI-004', expiryDate: '2030-01-12' },
    { id: '5', user: 'Emmanuel NTAKIRUTIMANA', documentType: 'Passeport', submittedDate: '2025-01-14', status: 'pending', documentId: 'PAS-005', expiryDate: '2025-06-14' },
    { id: '6', user: 'David NDAYISABA', documentType: 'CNI', submittedDate: '2025-01-13', status: 'pending', documentId: 'CNI-006', expiryDate: '2030-01-13' }
  ];

  amlAlerts: any[] = [
    { id: '1', date: '15/01 14:20', type: 'Opération inhabituelle', description: 'Transfert de 5 000 000 BIF en 3 transactions', amount: 5000000, status: 'new', riskLevel: 'high', transactionId: 'TRX-001', userId: 'USR-001' },
    { id: '2', date: '15/01 11:30', type: 'Seuil dépassé', description: 'Dépassement du seuil journalier de 2 000 000 BIF', amount: 2500000, status: 'reviewing', riskLevel: 'medium', transactionId: 'TRX-002', userId: 'USR-002' },
    { id: '3', date: '14/01 16:00', type: 'Pays à risque', description: 'Transaction vers un pays à risque élevé', amount: 150000, status: 'reported', riskLevel: 'high', transactionId: 'TRX-003', userId: 'USR-003' },
    { id: '4', date: '14/01 09:45', type: 'Multiple transactions', description: '5 transactions en 15 minutes', amount: 750000, status: 'closed', riskLevel: 'low', transactionId: 'TRX-004', userId: 'USR-004' },
    { id: '5', date: '13/01 08:30', type: 'Transfert suspect', description: 'Transfert vers compte externe non vérifié', amount: 1200000, status: 'new', riskLevel: 'high', transactionId: 'TRX-005', userId: 'USR-005' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.applyAuditFilters();
    this.applyAMLFilters();
  }

  // ========== MÉTHODES POUR LES COMPTES ==========

  getActiveFraudRulesCount(): number {
    return this.fraudRules.filter(r => r.active).length;
  }

  getPendingKYCCount(): number {
    return this.kycVerifications.filter(k => k.status === 'pending').length;
  }

  getActiveAMLAlertsCount(): number {
    return this.amlAlerts.filter(a => a.status === 'new' || a.status === 'reviewing').length;
  }

  // ========== AUDIT FILTERS ==========

  applyAuditFilters(): void {
    let filtered = [...this.auditLogs];

    // Search filter
    if (this.auditSearchTerm.trim()) {
      const term = this.auditSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        log.ip.includes(term) ||
        (log.reference && log.reference.toLowerCase().includes(term))
      );
    }

    // Type filter
    if (this.auditTypeFilter) {
      filtered = filtered.filter(log => log.type === this.auditTypeFilter);
    }

    // Status filter
    if (this.auditStatusFilter) {
      filtered = filtered.filter(log => log.status === this.auditStatusFilter);
    }

    // Date range filter
    if (this.auditDateFrom) {
      filtered = filtered.filter(log => log.date >= this.auditDateFrom);
    }
    if (this.auditDateTo) {
      filtered = filtered.filter(log => log.date <= this.auditDateTo);
    }

    this.filteredAuditLogs = filtered;
    this.auditCurrentPage = 1;
  }

  resetAuditFilters(): void {
    this.auditSearchTerm = '';
    this.auditTypeFilter = '';
    this.auditDateFrom = '';
    this.auditDateTo = '';
    this.auditStatusFilter = '';
    this.applyAuditFilters();
  }

  // ========== AUDIT PAGINATION ==========

  get paginatedAuditLogs(): AuditLog[] {
    const start = (this.auditCurrentPage - 1) * this.auditPageSize;
    const end = start + this.auditPageSize;
    return this.filteredAuditLogs.slice(start, end);
  }

  get auditTotalPages(): number {
    return Math.ceil(this.filteredAuditLogs.length / this.auditPageSize);
  }

  auditPreviousPage(): void {
    if (this.auditCurrentPage > 1) {
      this.auditCurrentPage--;
    }
  }

  auditNextPage(): void {
    if (this.auditCurrentPage < this.auditTotalPages) {
      this.auditCurrentPage++;
    }
  }

  // ========== AML FILTERS ==========

  applyAMLFilters(): void {
    let filtered = [...this.amlAlerts];

    if (this.amlStatusFilter) {
      filtered = filtered.filter(alert => alert.status === this.amlStatusFilter);
    }

    if (this.amlRiskFilter) {
      filtered = filtered.filter(alert => alert.riskLevel === this.amlRiskFilter);
    }

    this.filteredAMLLogs = filtered;
    this.amlCurrentPage = 1;
  }

  // ========== AML PAGINATION ==========

  get paginatedAMLLogs(): any[] {
    const start = (this.amlCurrentPage - 1) * this.amlPageSize;
    const end = start + this.amlPageSize;
    return this.filteredAMLLogs.slice(start, end);
  }

  get amlTotalPages(): number {
    return Math.ceil(this.filteredAMLLogs.length / this.amlPageSize);
  }

  amlPreviousPage(): void {
    if (this.amlCurrentPage > 1) {
      this.amlCurrentPage--;
    }
  }

  amlNextPage(): void {
    if (this.amlCurrentPage < this.amlTotalPages) {
      this.amlCurrentPage++;
    }
  }

  // ========== HIGH VALUE TRANSACTIONS ==========

  getHighValueTransactions(): AuditLog[] {
    return this.auditLogs.filter(log => log.amount > 1000000);
  }

  // ========== ACTIONS ==========

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  viewAuditDetail(log: AuditLog): void {
    this.selectedItem = log;
    this.modalType = 'audit_detail';
    this.modalTitle = `📋 Détails de l'audit`;
    this.formData = { ...log };
    this.showModal = true;
  }

  configureFraudRule(rule: FraudRule): void {
    this.selectedItem = rule;
    this.modalType = 'fraud_config';
    this.modalTitle = `⚙️ Configuration - ${rule.name}`;
    this.formData = { ...rule.config, name: rule.name };
    this.showModal = true;
  }

  toggleFraudRule(rule: FraudRule): void {
    rule.active = !rule.active;
    this.toast(`Règle "${rule.name}" ${rule.active ? 'activée' : 'désactivée'}`, rule.active ? 'success' : 'danger');
  }

  saveFraudRule(): void {
    if (this.selectedItem) {
      this.selectedItem.config = { ...this.formData };
      this.toast(`Règle "${this.selectedItem.name}" configurée avec succès`, 'success');
      this.closeModal();
    }
  }

  viewKYC(kyc: any): void {
    this.selectedItem = kyc;
    this.modalType = 'kyc_detail';
    this.modalTitle = `🪪 Détails KYC - ${kyc.user}`;
    this.formData = { ...kyc };
    this.showModal = true;
  }

  approveKYC(kyc: any): void {
    kyc.status = 'approved';
    this.toast(`KYC de ${kyc.user} approuvé`, 'success');
    this.closeModal();
  }

  rejectKYC(kyc: any): void {
    kyc.status = 'rejected';
    this.toast(`KYC de ${kyc.user} rejeté`, 'danger');
    this.closeModal();
  }

  viewAMLAlert(alert: any): void {
    this.selectedItem = alert;
    this.modalType = 'aml_detail';
    this.modalTitle = `⚖️ Détails AML - ${alert.type}`;
    this.formData = { ...alert };
    this.showModal = true;
  }

  updateAMLStatus(alert: any, status: string): void {
    alert.status = status;
    this.toast(`Alerte AML mise à jour: ${status}`, 'success');
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
    this.formData = {};
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

  // ========== UTILITAIRES ==========

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      success: '✅ Succès',
      warning: '⚠️ Attention',
      danger: '❌ Danger',
      pending: '⏳ En attente',
      approved: '✅ Approuvé',
      rejected: '❌ Rejeté',
      new: '🆕 Nouveau',
      reviewing: '📝 En révision',
      reported: '📋 Signalé',
      closed: '✅ Clos',
      low: '🟢 Faible',
      medium: '🟡 Moyen',
      high: '🟠 Élevé',
      critical: '🔴 Critique'
    };
    return labels[status] || status;
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      success: 'status-badge--success',
      warning: 'status-badge--warning',
      danger: 'status-badge--danger',
      pending: 'status-badge--pending',
      approved: 'status-badge--approved',
      rejected: 'status-badge--rejected',
      new: 'status-badge--info',
      reviewing: 'status-badge--warning',
      reported: 'status-badge--warning',
      closed: 'status-badge--success',
      low: 'status-badge--info',
      medium: 'status-badge--warning',
      high: 'status-badge--danger',
      critical: 'status-badge--danger'
    };
    return colors[status] || 'status-badge--info';
  }

  getActivityIcon(status: string): string {
    const icons: Record<string, string> = {
      success: '✅',
      warning: '⚠️',
      danger: '❌'
    };
    return icons[status] || 'ℹ️';
  }

  getAuditTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      connexion: '🔌 Connexion',
      transaction: '💰 Transaction',
      commission: '💵 Commission',
      taxe: '🏛️ Taxe',
      transfert: '🔄 Transfert',
      systeme: '⚙️ Système'
    };
    return labels[type] || type;
  }
}