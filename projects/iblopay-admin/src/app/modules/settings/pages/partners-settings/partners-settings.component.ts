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

interface Partner {
  id: string;
  name: string;
  icon: string;
  category: string;
  code: string;
  contact: string;
  email?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  transactions: number;
  commission?: string;
  apiKey?: string;
  webhook?: string;
  createdAt?: string;
}

interface Integration {
  id: string;
  name: string;
  icon: string;
  type: string;
  version: string;
  partner?: string;
  endpoint?: string;
  lastSync?: string;
  apiKey?: string;
  autoSync?: boolean;
  webhookEnabled?: boolean;
  active: boolean;
}

interface CommissionRule {
  id: string;
  partner: string;
  icon: string;
  type: 'fixe' | 'pourcentage' | 'mixte';
  rate: string;
  minAmount?: number;
  maxAmount?: number;
  category?: string;
  active: boolean;
}

@Component({
  selector: 'app-partners-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './partners-settings.component.html',
  styleUrls: ['./partners-settings.component.scss']
})
export class PartnersSettingsComponent implements OnInit {
  readonly Math = Math;

  activeTab: string = 'tous';
  showModal: boolean = false;
  modalTitle: string = '';
  modalType: string = '';
  selectedItem: any = null;
  formData: any = {};
  toasts: Toast[] = [];
  private toastSeq = 0;

  // Filters
  searchTerm: string = '';
  categoryFilter: string = '';
  statusFilter: string = '';

  // Pagination
  pageSize: number = 12;
  currentPage: number = 1;
  filteredPartners: Partner[] = [];

  tabs: TabItem[] = [
    { key: 'tous', label: 'Tous les partenaires', icon: '🤝' },
    { key: 'categories', label: 'Par catégorie', icon: '📂' },
    { key: 'integrations', label: 'Intégrations', icon: '🔌' },
    { key: 'commissions', label: 'Commissions', icon: '💰' }
  ];

  categories: string[] = [
    'Banque',
    'Opérateur Télécom',
    'Fournisseur de services',
    'Marchand',
    'Institution publique'
  ];

  partners: Partner[] = [
    {
      id: '1',
      name: 'Banque de la République',
      icon: '🏦',
      category: 'Banque',
      code: 'BRB-001',
      contact: '+257 79 123 456',
      email: 'contact@brb.bi',
      status: 'active',
      transactions: 15420,
      commission: '0.5%',
      apiKey: 'brb_api_key_12345',
      webhook: 'https://api.brb.bi/webhook',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Econet Burundi',
      icon: '📱',
      category: 'Opérateur Télécom',
      code: 'ECO-002',
      contact: '+257 79 789 012',
      email: 'partners@econet.bi',
      status: 'active',
      transactions: 28450,
      commission: '1.2%',
      apiKey: 'eco_api_key_67890',
      webhook: 'https://api.econet.bi/webhook',
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'PayTech Services',
      icon: '💳',
      category: 'Fournisseur de services',
      code: 'PTS-003',
      contact: '+257 79 456 789',
      email: 'contact@paytech.bi',
      status: 'active',
      transactions: 8920,
      commission: '2.0%',
      apiKey: 'pts_api_key_24680',
      webhook: 'https://api.paytech.bi/webhook',
      createdAt: '2024-03-10'
    },
    {
      id: '4',
      name: 'Super Marché Central',
      icon: '🛍️',
      category: 'Marchand',
      code: 'SMC-004',
      contact: '+257 79 321 654',
      email: 'info@supermarche.bi',
      status: 'active',
      transactions: 12300,
      commission: '1.5%',
      createdAt: '2024-04-05'
    },
    {
      id: '5',
      name: 'Ministère des Finances',
      icon: '🏛️',
      category: 'Institution publique',
      code: 'MFP-005',
      contact: '+257 79 987 654',
      email: 'finance@gov.bi',
      status: 'pending',
      transactions: 0,
      createdAt: '2024-05-20'
    },
    {
      id: '6',
      name: 'Orange Burundi',
      icon: '📱',
      category: 'Opérateur Télécom',
      code: 'ORA-006',
      contact: '+257 79 654 321',
      email: 'partners@orange.bi',
      status: 'inactive',
      transactions: 0,
      createdAt: '2024-06-01'
    }
  ];

  integrations: Integration[] = [
    {
      id: '1',
      name: 'API Banque',
      icon: '🏦',
      type: 'REST API',
      version: 'v2.1.0',
      partner: 'Banque de la République',
      endpoint: 'https://api.brb.bi/v2',
      lastSync: '2024-06-20 14:30',
      apiKey: 'brb_sk_12345',
      autoSync: true,
      webhookEnabled: true,
      active: true
    },
    {
      id: '2',
      name: 'API Econet',
      icon: '📱',
      type: 'SOAP',
      version: 'v1.3.2',
      partner: 'Econet Burundi',
      endpoint: 'https://api.econet.bi/soap',
      lastSync: '2024-06-20 15:00',
      apiKey: 'eco_sk_67890',
      autoSync: true,
      webhookEnabled: false,
      active: true
    },
    {
      id: '3',
      name: 'API PayTech',
      icon: '💳',
      type: 'GraphQL',
      version: 'v3.0.0',
      partner: 'PayTech Services',
      endpoint: 'https://api.paytech.bi/graphql',
      lastSync: '2024-06-19 18:45',
      apiKey: 'pts_sk_24680',
      autoSync: false,
      webhookEnabled: true,
      active: true
    },
    {
      id: '4',
      name: 'API Orange',
      icon: '📱',
      type: 'REST API',
      version: 'v1.0.0',
      partner: 'Orange Burundi',
      endpoint: 'https://api.orange.bi/v1',
      lastSync: '2024-06-18 09:15',
      apiKey: 'ora_sk_13579',
      autoSync: false,
      webhookEnabled: false,
      active: false
    }
  ];

  commissionRules: CommissionRule[] = [
    {
      id: '1',
      partner: 'Banque de la République',
      icon: '🏦',
      type: 'pourcentage',
      rate: '0.5%',
      minAmount: 1000,
      maxAmount: 1000000,
      category: 'Banque',
      active: true
    },
    {
      id: '2',
      partner: 'Econet Burundi',
      icon: '📱',
      type: 'mixte',
      rate: '1.2% + 100 BIF',
      minAmount: 500,
      maxAmount: 500000,
      category: 'Opérateur Télécom',
      active: true
    },
    {
      id: '3',
      partner: 'PayTech Services',
      icon: '💳',
      type: 'pourcentage',
      rate: '2.0%',
      minAmount: 200,
      maxAmount: 200000,
      category: 'Fournisseur de services',
      active: true
    },
    {
      id: '4',
      partner: 'Super Marché Central',
      icon: '🛍️',
      type: 'fixe',
      rate: '250 BIF',
      minAmount: 0,
      maxAmount: 0,
      category: 'Marchand',
      active: true
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  // ========== NAVIGATION ==========

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // ========== COMPTES ==========

  get totalPartners(): number {
    return this.partners.length;
  }

  get activePartners(): number {
    return this.partners.filter(p => p.status === 'active').length;
  }

  get inactivePartners(): number {
    return this.partners.filter(p => p.status === 'inactive' || p.status === 'suspended').length;
  }

  get totalCategories(): number {
    return new Set(this.partners.map(p => p.category)).size;
  }

  get totalTransactions(): number {
    return this.partners.reduce((sum, p) => sum + p.transactions, 0);
  }

  get activeIntegrations(): number {
    return this.integrations.filter(i => i.active).length;
  }

  // ========== CATEGORY STATS ==========

  get categoryStats(): any[] {
    const stats = this.categories.map(cat => {
      const partners = this.partners.filter(p => p.category === cat);
      const active = partners.filter(p => p.status === 'active').length;
      const inactive = partners.filter(p => p.status === 'inactive' || p.status === 'suspended').length;
      return {
        name: cat,
        icon: this.getCategoryIcon(cat),
        count: partners.length,
        active,
        inactive
      };
    });
    return stats.filter(s => s.count > 0);
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Banque': '🏦',
      'Opérateur Télécom': '📱',
      'Fournisseur de services': '💳',
      'Marchand': '🛍️',
      'Institution publique': '🏛️'
    };
    return icons[category] || '🤝';
  }

  // ========== FILTERS ==========

  applyFilters(): void {
    let filtered = [...this.partners];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.contact.includes(term)
      );
    }

    if (this.categoryFilter) {
      filtered = filtered.filter(p => p.category === this.categoryFilter);
    }

    if (this.statusFilter) {
      filtered = filtered.filter(p => p.status === this.statusFilter);
    }

    this.filteredPartners = filtered;
    this.currentPage = 1;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    this.categoryFilter = category;
    this.activeTab = 'tous';
    this.applyFilters();
  }

  // ========== PAGINATION ==========

  get paginatedPartners(): Partner[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredPartners.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPartners.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // ========== STATUS HELPERS ==========

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
      suspended: 'Suspendu'
    };
    return labels[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classes: Record<string, string> = {
      active: 'status-badge--success',
      inactive: 'status-badge--danger',
      pending: 'status-badge--pending',
      suspended: 'status-badge--suspended'
    };
    return classes[status] || 'status-badge--info';
  }

  // ========== PARTNER ACTIONS ==========

  viewPartner(partner: Partner): void {
    this.selectedItem = partner;
    this.modalType = 'partner_detail';
    this.modalTitle = partner.name;
    this.formData = { ...partner };
    this.showModal = true;
  }

  addPartner(): void {
    this.selectedItem = null;
    this.modalType = 'partner_add';
    this.modalTitle = 'Ajouter un partenaire';
    this.formData = {
      name: '',
      category: this.categories[0],
      code: '',
      contact: '',
      email: '',
      status: 'pending',
      transactions: 0,
      apiKey: this.generateApiKey(),
      webhook: ''
    };
    this.showModal = true;
  }

  editPartner(partner: Partner): void {
    this.selectedItem = partner;
    this.modalType = 'partner_edit';
    this.modalTitle = 'Modifier ' + partner.name;
    this.formData = { ...partner };
    this.showModal = true;
  }

  savePartner(): void {
    if (this.modalType === 'partner_add') {
      const newPartner: Partner = {
        ...this.formData,
        id: (this.partners.length + 1).toString(),
        icon: this.getCategoryIcon(this.formData.category),
        transactions: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.partners.push(newPartner);
      this.toast(`Partenaire "${newPartner.name}" ajouté avec succès`, 'success');
    } else if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.selectedItem.icon = this.getCategoryIcon(this.formData.category);
      this.toast(`Partenaire "${this.selectedItem.name}" modifié avec succès`, 'success');
    }
    this.closeModal();
    this.applyFilters();
  }

  togglePartnerStatus(partner: Partner): void {
    if (partner.status === 'active') {
      partner.status = 'inactive';
      this.toast(`Partenaire "${partner.name}" désactivé`, 'danger');
    } else if (partner.status === 'pending') {
      this.toast(`Partenaire "${partner.name}" en attente de validation`, 'info');
    } else {
      partner.status = 'active';
      this.toast(`Partenaire "${partner.name}" activé`, 'success');
    }
  }

  deletePartner(partner: Partner): void {
    if (confirm(`Voulez-vous vraiment supprimer "${partner.name}" ?`)) {
      this.partners = this.partners.filter(p => p.id !== partner.id);
      this.toast(`Partenaire "${partner.name}" supprimé`, 'danger');
      this.applyFilters();
    }
  }

  generateApiKey(): string {
    return 'sk_' + Math.random().toString(36).substring(2, 15) + '_' + 
           Math.random().toString(36).substring(2, 10);
  }

  // ========== INTEGRATION ACTIONS ==========

  configureIntegration(integration: Integration): void {
    this.selectedItem = integration;
    this.modalType = 'integration_config';
    this.modalTitle = 'Configuration - ' + integration.name;
    this.formData = { ...integration };
    this.showModal = true;
  }

  testIntegration(integration: Integration): void {
    this.toast(`Test de l'intégration "${integration.name}" en cours...`, 'info');
    setTimeout(() => {
      this.toast(`Test de "${integration.name}" réussi`, 'success');
    }, 1500);
  }

  toggleIntegration(integration: Integration): void {
    integration.active = !integration.active;
    this.toast(`Intégration "${integration.name}" ${integration.active ? 'activée' : 'désactivée'}`, 
               integration.active ? 'success' : 'danger');
  }

  syncIntegration(integration: Integration): void {
    this.toast(`Synchronisation de "${integration.name}" en cours...`, 'info');
    setTimeout(() => {
      integration.lastSync = new Date().toLocaleString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      this.toast(`Synchronisation de "${integration.name}" terminée`, 'success');
    }, 2000);
  }

  saveIntegration(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Intégration "${this.selectedItem.name}" configurée avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== COMMISSION ACTIONS ==========

  editCommission(rule: CommissionRule): void {
    this.selectedItem = rule;
    this.modalType = 'commission_edit';
    this.modalTitle = 'Commission - ' + rule.partner;
    this.formData = { ...rule };
    this.showModal = true;
  }

  toggleCommission(rule: CommissionRule): void {
    rule.active = !rule.active;
    this.toast(`Commission "${rule.partner}" ${rule.active ? 'activée' : 'désactivée'}`, 
               rule.active ? 'success' : 'danger');
  }

  saveCommission(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Commission "${this.selectedItem.partner}" sauvegardée avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== MODAL ==========

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
}