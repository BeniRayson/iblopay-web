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
  code: string;
  swiftCode: string;
  accountNumber: string;
  isActive: boolean;
  /** Champ UI uniquement (hors contrat backend) — utilisé par l'onglet "Par catégorie" */
  category?: string;
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

  // Tri (liste)
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

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
      name: 'Banque de la République du Burundi',
      code: 'BRB',
      swiftCode: 'BRBUBI01',
      accountNumber: '20001160001',
      isActive: true,
      category: 'Banque'
    },
    {
      id: '2',
      name: 'Banque Commerciale du Burundi (BANCOBU)',
      code: 'BCOBU',
      swiftCode: 'BCBUBI01',
      accountNumber: '20002260002',
      isActive: true,
      category: 'Banque'
    },
    {
      id: '3',
      name: 'Banque de Crédit de Bujumbura',
      code: 'BCB',
      swiftCode: 'BCBIBI01',
      accountNumber: '20003360003',
      isActive: true,
      category: 'Banque'
    },
    {
      id: '4',
      name: 'Interbank Burundi',
      code: 'IBK',
      swiftCode: 'IBKBBU01',
      accountNumber: '20004460004',
      isActive: true,
      category: 'Banque'
    },
    {
      id: '5',
      name: 'Ecobank Burundi',
      code: 'ECOB',
      swiftCode: 'ECOBBI01',
      accountNumber: '20005560005',
      isActive: false,
      category: 'Banque'
    },
    {
      id: '6',
      name: 'FinBank',
      code: 'FINB',
      swiftCode: 'FINBBI01',
      accountNumber: '20006660006',
      isActive: false,
      category: 'Banque'
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
    return this.partners.filter(p => p.isActive).length;
  }

  get inactivePartners(): number {
    return this.partners.filter(p => !p.isActive).length;
  }

  get totalCategories(): number {
    return new Set(this.partners.map(p => p.category ?? 'Banque')).size;
  }

  get activeIntegrations(): number {
    return this.integrations.filter(i => i.active).length;
  }

  // ========== CATEGORY STATS ==========

  get categoryStats(): any[] {
    const stats = this.categories.map(cat => {
      const partners = this.partners.filter(p => (p.category ?? 'Banque') === cat);
      const active = partners.filter(p => p.isActive).length;
      const inactive = partners.filter(p => !p.isActive).length;
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
        (p.swiftCode ?? '').toLowerCase().includes(term) ||
        (p.accountNumber ?? '').toLowerCase().includes(term)
      );
    }

    if (this.categoryFilter) {
      filtered = filtered.filter(p => (p.category ?? 'Banque') === this.categoryFilter);
    }

    if (this.statusFilter) {
      const active = this.statusFilter === 'active';
      filtered = filtered.filter(p => p.isActive === active);
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

  // ========== PAGINATION & TRI ==========

  get paginatedPartners(): Partner[] {
    const sorted = [...this.filteredPartners].sort((a, b) => {
      const av = String(a[this.sortColumn as keyof Partner] ?? '').toLowerCase();
      const bv = String(b[this.sortColumn as keyof Partner] ?? '').toLowerCase();
      const cmp = av.localeCompare(bv);
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return sorted.slice(start, end);
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

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortMarker(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // ========== STATUS HELPERS ==========

  getStatusLabel(active: boolean): string {
    return active ? 'Actif' : 'Inactif';
  }

  getStatusBadgeClass(active: boolean): string {
    return active ? 'status-badge--success' : 'status-badge--danger';
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
    this.modalTitle = 'Ajouter une banque partenaire';
    this.formData = {
      name: '',
      code: '',
      swiftCode: '',
      accountNumber: '',
      isActive: true,
      category: 'Banque'
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
        category: this.formData.category || 'Banque'
      };
      this.partners.push(newPartner);
      this.toast(`Banque partenaire "${newPartner.name}" ajoutée avec succès`, 'success');
    } else if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Partenaire "${this.selectedItem.name}" modifié avec succès`, 'success');
    }
    this.closeModal();
    this.applyFilters();
  }

  togglePartnerStatus(partner: Partner): void {
    partner.isActive = !partner.isActive;
    this.toast(
      `Partenaire "${partner.name}" ${partner.isActive ? 'activé' : 'désactivé'}`,
      partner.isActive ? 'success' : 'danger'
    );
  }

  deletePartner(partner: Partner): void {
    if (confirm(`Voulez-vous vraiment supprimer "${partner.name}" ?`)) {
      this.partners = this.partners.filter(p => p.id !== partner.id);
      this.toast(`Partenaire "${partner.name}" supprimé`, 'danger');
      this.applyFilters();
    }
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