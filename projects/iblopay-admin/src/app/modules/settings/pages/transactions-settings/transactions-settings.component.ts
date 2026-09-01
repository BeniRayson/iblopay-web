import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Transaction {
  id: string;
  type: 'depot' | 'retrait' | 'transfert' | 'paiement' | 'achat' | 'commission';
  typeLabel: string;
  montant: number;
  utilisateur: string;
  agent: string;
  date: string;
  statut: 'effectuee' | 'en_attente' | 'annulee' | 'echouee';
  description?: string;
  reference?: string;
  ip?: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Component({
  selector: 'app-transactions-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transactions-settings.component.html',
  styleUrls: ['./transactions-settings.component.scss']
})
export class TransactionsSettingsComponent {
  readonly title = 'Gestion des Transactions';
  readonly icon = '💸';
  readonly pageSize = 10;
  readonly currentDate = new Date().toLocaleDateString('fr-FR');

  activeTab: 'toutes' | 'types' | 'filtres' | 'analytique' = 'toutes';
  private currentPage = 1;

  // Filtres
  searchTerm: string = '';
  filterStatut: string = 'tous';
  filterType: string = 'tous';
  filterPeriode: string = 'all';

  // Sélection
  selectedIds: Set<string> = new Set();

  private transactions: Transaction[] = [];
  private toastSeq = 0;

  modalOpen = false;
  selectedTransaction: Transaction | null = null;

  actionModalOpen = false;
  actionModalTitle = '';
  actionModalType = '';
  actionData: any = {};
  formData: any = {};

  toasts: Toast[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const types = [
      { key: 'depot' as const, label: 'Dépôt', icon: '💰' },
      { key: 'retrait' as const, label: 'Retrait', icon: '💳' },
      { key: 'transfert' as const, label: 'Transfert Wallet', icon: '🔄' },
      { key: 'paiement' as const, label: 'Paiement', icon: '💳' },
      { key: 'achat' as const, label: 'Achat', icon: '🛍️' },
      { key: 'commission' as const, label: 'Commission', icon: '💵' }
    ];
    
    const utilisateurs = [
      'Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA',
      'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA', 'Françoise NIKIZA'
    ];
    
    const agents = ['AG-001', 'AG-002', 'AG-003', 'AG-004', 'AG-005'];
    const statuts: Transaction['statut'][] = ['effectuee', 'effectuee', 'effectuee', 'en_attente', 'annulee', 'echouee'];
    const descriptions = [
      'Dépôt en espèces', 'Retrait Mobile Money', 'Transfert vers compte',
      'Paiement marchand', 'Achat airtime', 'Commission agent',
      'Paiement facture', 'Transfert reçu', 'Dépôt par carte'
    ];
    const ips = ['192.168.1.1', '10.0.0.1', '172.16.0.1', '41.207.0.1', '197.0.0.1'];

    for (let i = 0; i < 60; i++) {
      const typeIndex = i % types.length;
      const type = types[typeIndex]!;
      const utilisateurIndex = i % utilisateurs.length;
      const utilisateur = utilisateurs[utilisateurIndex]!;
      const agentIndex = i % agents.length;
      const agent = agents[agentIndex]!;
      const statutIndex = i % statuts.length;
      const statut = statuts[statutIndex]!;
      const descriptionIndex = i % descriptions.length;
      const description = descriptions[descriptionIndex]!;
      const ipIndex = i % ips.length;
      const ip = ips[ipIndex]!;
      const montant = 1000 + Math.floor(Math.random() * 200000);
      const date = new Date(Date.now() - i * 3600000 * (1 + Math.floor(Math.random() * 24)));
      
      this.transactions.push({
        id: `TXN-${String(100000 + i).padStart(6, '0')}`,
        type: type.key,
        typeLabel: type.label,
        montant: montant,
        utilisateur: utilisateur,
        agent: agent,
        date: date.toLocaleString('fr-FR'),
        statut: statut,
        description: description,
        reference: `REF-${String(100000 + i).padStart(6, '0')}`,
        ip: ip
      });
    }
  }

  // ========== SÉLECTION ==========

  toggleSelection(id: string): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  toggleAll(event: any): void {
    if (event.target.checked) {
      this.getPaginatedFilteredTransactions().forEach(t => this.selectedIds.add(t.id));
    } else {
      this.selectedIds.clear();
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  isAllSelected(): boolean {
    const list = this.getPaginatedFilteredTransactions();
    return list.length > 0 && list.every(t => this.selectedIds.has(t.id));
  }

  getSelectedCount(): number {
    return this.selectedIds.size;
  }

  // ========== STATISTIQUES ==========

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionsByStatut(statut: string): Transaction[] {
    return this.transactions.filter(t => t.statut === statut);
  }

  getMontantTotal(): number {
    return this.transactions.reduce((sum, t) => sum + t.montant, 0);
  }

  getMontantMoyen(): number {
    return this.transactions.length > 0 ? this.getMontantTotal() / this.transactions.length : 0;
  }

  getTypesCount(): number {
    return new Set(this.transactions.map(t => t.type)).size;
  }

  getTransactionsEnAttente(): Transaction[] {
    return this.transactions.filter(t => t.statut === 'en_attente');
  }

  getTransactionsEchouees(): Transaction[] {
    return this.transactions.filter(t => t.statut === 'echouee');
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      effectuee: '✅ Effectuée',
      en_attente: '⏳ En attente',
      annulee: '❌ Annulée',
      echouee: '⚠️ Échouée'
    };
    return labels[statut] || statut;
  }

  getTypeClass(type: string): string {
    const classes: Record<string, string> = {
      depot: 'depot',
      retrait: 'retrait',
      transfert: 'transfert',
      paiement: 'paiement',
      achat: 'achat',
      commission: 'commission'
    };
    return classes[type] || '';
  }

  // ========== ANALYTIQUE ==========

  getAnalyticsData(): any[] {
    const total = this.transactions.length;
    const effectuees = this.getTransactionsByStatut('effectuee').length;
    const enAttente = this.getTransactionsByStatut('en_attente').length;
    const annulees = this.getTransactionsByStatut('annulee').length;
    const echouees = this.getTransactionsByStatut('echouee').length;
    const montantTotal = this.getMontantTotal();
    
    return [
      {
        icon: '✅',
        label: 'Taux de succès',
        value: `${Math.round((effectuees / total) * 100)}%`,
        sub: `${effectuees} sur ${total} transactions`,
        trend: effectuees / total > 0.8 ? 'up' : 'down',
        trendValue: `${Math.round((effectuees / total) * 100)}%`
      },
      {
        icon: '💰',
        label: 'Volume total',
        value: `${(montantTotal / 1000000).toFixed(1)}M BIF`,
        sub: `${montantTotal.toLocaleString('fr-FR')} BIF`,
        trend: 'up',
        trendValue: '+12%'
      },
      {
        icon: '⏳',
        label: 'En attente',
        value: enAttente,
        sub: `${Math.round((enAttente / total) * 100)}% du total`,
        trend: enAttente > 5 ? 'down' : 'up',
        trendValue: enAttente > 5 ? '-5%' : '+3%'
      },
      {
        icon: '⚠️',
        label: 'Échouées',
        value: echouees,
        sub: `${Math.round((echouees / total) * 100)}% du total`,
        trend: echouees > 10 ? 'down' : 'up',
        trendValue: echouees > 10 ? '-8%' : '+2%'
      },
      {
        icon: '📊',
        label: 'Montant moyen',
        value: `${(this.getMontantMoyen() / 1000).toFixed(1)}K BIF`,
        sub: `${this.getMontantMoyen().toLocaleString('fr-FR')} BIF`,
        trend: 'up',
        trendValue: '+5%'
      },
      {
        icon: '🔄',
        label: 'Types différents',
        value: this.getTypesCount(),
        sub: `${this.getTypesCount()} types de transactions`,
        trend: 'up',
        trendValue: '+1'
      }
    ];
  }

  // ========== FILTRES ==========

  getFilteredTransactions(): Transaction[] {
    let result = this.transactions;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(t => 
        t.id.toLowerCase().includes(term) ||
        t.utilisateur.toLowerCase().includes(term) ||
        t.agent.toLowerCase().includes(term) ||
        t.typeLabel.toLowerCase().includes(term) ||
        (t.reference && t.reference.toLowerCase().includes(term))
      );
    }
    
    if (this.filterStatut !== 'tous') {
      result = result.filter(t => t.statut === this.filterStatut);
    }
    
    if (this.filterType !== 'tous') {
      result = result.filter(t => t.type === this.filterType);
    }

    if (this.filterPeriode !== 'all') {
      const now = new Date();
      result = result.filter(t => {
        const date = new Date(t.date);
        if (this.filterPeriode === 'today') {
          return date.toDateString() === now.toDateString();
        } else if (this.filterPeriode === 'week') {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return date >= weekAgo;
        } else if (this.filterPeriode === 'month') {
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return date >= monthAgo;
        }
        return true;
      });
    }
    
    return result;
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  // ========== PAGINATION ==========

  getPaginatedFilteredTransactions(): Transaction[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.getFilteredTransactions().slice(start, start + this.pageSize);
  }

  getTotalFilteredPages(): number {
    return Math.ceil(this.getFilteredTransactions().length / this.pageSize);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalFilteredPages()) {
      this.currentPage++;
      this.selectedIds.clear();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.selectedIds.clear();
    }
  }

  setActiveTab(tab: 'toutes' | 'types' | 'filtres' | 'analytique'): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  // ========== TYPES ==========

  getTypes(): any[] {
    const typeMap = new Map<string, any>();
    this.transactions.forEach(t => {
      if (!typeMap.has(t.type)) {
        typeMap.set(t.type, { 
          key: t.type, 
          label: t.typeLabel, 
          count: 0, 
          total: 0, 
          icon: this.getTypeIcon(t.type),
          effectuees: 0,
          enAttente: 0
        });
      }
      const data = typeMap.get(t.type);
      if (data) {
        data.count++;
        data.total += t.montant;
        if (t.statut === 'effectuee') data.effectuees++;
        if (t.statut === 'en_attente') data.enAttente++;
      }
    });
    return Array.from(typeMap.values());
  }

  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      depot: '💰',
      retrait: '💳',
      transfert: '🔄',
      paiement: '💳',
      achat: '🛍️',
      commission: '💵'
    };
    return icons[type] || '📋';
  }

  filterByType(type: string): void {
    this.filterType = type;
    this.activeTab = 'toutes';
    this.currentPage = 1;
    this.selectedIds.clear();
  }

  // ========== FILTRES ==========

  getFiltres(): any[] {
    const now = new Date();
    return [
      { key: 'date', label: 'Date', icon: '📅', description: 'Filtrer par date', value: now.toLocaleDateString('fr-FR') },
      { key: 'heure', label: 'Heure', icon: '🕐', description: 'Filtrer par heure', value: now.toLocaleTimeString('fr-FR') },
      { key: 'type', label: 'Type', icon: '🔀', description: 'Filtrer par type de transaction', value: this.filterType !== 'tous' ? this.filterType : 'Tous' },
      { key: 'statut', label: 'Statut', icon: '📊', description: 'Filtrer par statut', value: this.filterStatut !== 'tous' ? this.filterStatut : 'Tous' },
      { key: 'utilisateur', label: 'Utilisateur', icon: '👤', description: 'Filtrer par utilisateur' },
      { key: 'agent', label: 'Agent', icon: '🧑‍💼', description: 'Filtrer par agent' },
      { key: 'super_agent', label: 'Super Agent', icon: '👨‍💼', description: 'Filtrer par super agent' },
      { key: 'province', label: 'Province', icon: '🗺️', description: 'Filtrer par province' },
      { key: 'commune', label: 'Commune', icon: '🏘️', description: 'Filtrer par commune' },
      { key: 'montant', label: 'Montant', icon: '💰', description: 'Filtrer par montant', value: 'Min - Max' }
    ];
  }

  getFilterOptions(filterType: string): string[] {
    const options: Record<string, string[]> = {
      type: ['Dépôt', 'Retrait', 'Transfert Wallet', 'Paiement', 'Achat', 'Commission'],
      statut: ['Effectuée', 'En attente', 'Annulée', 'Échouée'],
      utilisateur: ['Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA', 'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA'],
      agent: ['AG-001', 'AG-002', 'AG-003', 'AG-004', 'AG-005'],
      super_agent: ['SA-001', 'SA-002', 'SA-003'],
      province: ['Bujumbura Mairie', 'Gitega', 'Ngozi', 'Muyinga', 'Bururi'],
      commune: ['Mukaza', 'Ntahangwa', 'Muha', 'Gitega', 'Nyanza-Lac']
    };
    return options[filterType] || [];
  }

  openFilter(filter: any): void {
    this.openAction(filter.key);
  }

  // ========== ACTIONS ==========

  openTransactionDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.modalOpen = true;
  }

  openAction(actionId: string, transaction?: Transaction): void {
    if (transaction) {
      this.selectedTransaction = transaction;
    }
    this.actionModalType = actionId;
    this.actionModalTitle = this.getActionTitle(actionId);
    this.actionModalOpen = true;
    this.formData = {};
  }

  private getActionTitle(actionId: string): string {
    const titles: Record<string, string> = {
      voir: '📊 Vue d\'ensemble des transactions',
      exporter: '📤 Exporter les transactions',
      imprimer: '🖨️ Imprimer les transactions',
      telecharger_reçu: '📄 Télécharger le reçu',
      corriger: '🔧 Corriger la transaction',
      reattribuer: '🔄 Réattribuer la transaction',
      annuler: '❌ Annuler la transaction',
      annuler_selection: '❌ Annuler les transactions sélectionnées',
      frauduleuse: '🚫 Marquer comme frauduleuse',
      partager: '📤 Partager la transaction',
      date: '📅 Filtrer par date',
      heure: '🕐 Filtrer par heure',
      type: '🔀 Filtrer par type',
      statut: '📊 Filtrer par statut',
      utilisateur: '👤 Filtrer par utilisateur',
      agent: '🧑‍💼 Filtrer par agent',
      super_agent: '👨‍💼 Filtrer par super agent',
      province: '🗺️ Filtrer par province',
      commune: '🏘️ Filtrer par commune',
      montant: '💰 Filtrer par montant'
    };
    return titles[actionId] || actionId;
  }

  getActionIcon(): string {
    const icons: Record<string, string> = {
      exporter: '📤',
      imprimer: '🖨️',
      telecharger_reçu: '📄',
      corriger: '🔧',
      reattribuer: '🔄',
      annuler: '❌',
      annuler_selection: '❌',
      frauduleuse: '🚫',
      partager: '📤',
      date: '📅',
      heure: '🕐',
      type: '🔀',
      statut: '📊',
      utilisateur: '👤',
      agent: '🧑‍💼',
      super_agent: '👨‍💼',
      province: '🗺️',
      commune: '🏘️',
      montant: '💰'
    };
    return icons[this.actionModalType] || '📋';
  }

  confirmAction(): void {
    switch (this.actionModalType) {
      case 'exporter':
        this.exportTransactions();
        break;
      case 'corriger':
        this.corrigerTransaction();
        break;
      case 'annuler':
        this.annulerTransaction();
        break;
      case 'annuler_selection':
        this.annulerSelection();
        break;
      case 'telecharger_reçu':
        this.toast('Reçu téléchargé avec succès.', 'success');
        break;
      case 'reattribuer':
        this.reattribuerTransaction();
        break;
      case 'frauduleuse':
        this.marquerFrauduleuse();
        break;
      case 'partager':
        this.partagerTransaction();
        break;
      default:
        this.toast(`Filtre "${this.actionModalType}" appliqué.`, 'info');
    }
    this.closeActionModal();
  }

  // ========== ACTIONS MÉTIER ==========

  private exportTransactions(): void {
    const format = this.formData.format || 'excel';
    const periode = this.formData.periode || 'all';
    this.toast(`Export en cours (${format})...`, 'info');
    setTimeout(() => {
      this.toast(`Export terminé avec succès (${format})`, 'success');
    }, 1500);
  }

  private corrigerTransaction(): void {
    if (!this.selectedTransaction) return;
    const raison = this.formData.raison || 'Correction';
    const nouveauMontant = this.formData.montant;
    const nouveauType = this.formData.type;
    
    if (nouveauMontant) {
      this.selectedTransaction.montant = nouveauMontant;
    }
    if (nouveauType) {
      const types: Record<string, string> = {
        depot: 'Dépôt',
        retrait: 'Retrait',
        transfert: 'Transfert Wallet',
        paiement: 'Paiement',
        achat: 'Achat',
        commission: 'Commission'
      };
      this.selectedTransaction.typeLabel = types[nouveauType] || this.selectedTransaction.typeLabel;
      this.selectedTransaction.type = nouveauType;
    }
    this.selectedTransaction.description = `Corrigé: ${raison}`;
    this.toast(`Transaction ${this.selectedTransaction.id} corrigée avec succès.`, 'success');
  }

  private annulerTransaction(): void {
    if (!this.selectedTransaction) return;
    const raison = this.formData.raison || 'Annulation';
    this.selectedTransaction.statut = 'annulee';
    this.selectedTransaction.description = `Annulé: ${raison}`;
    this.toast(`Transaction ${this.selectedTransaction.id} annulée avec succès.`, 'warning');
  }

  private annulerSelection(): void {
    const ids = Array.from(this.selectedIds);
    if (ids.length === 0) {
      this.toast('Aucune transaction sélectionnée.', 'danger');
      return;
    }
    const raison = this.formData.raison || 'Annulation en masse';
    ids.forEach(id => {
      const transaction = this.transactions.find(t => t.id === id);
      if (transaction) {
        transaction.statut = 'annulee';
        transaction.description = `Annulé en masse: ${raison}`;
      }
    });
    this.selectedIds.clear();
    this.toast(`${ids.length} transaction(s) annulée(s) avec succès.`, 'warning');
  }

  private reattribuerTransaction(): void {
    if (!this.selectedTransaction) return;
    const nouvelUtilisateur = this.formData.nouvelUtilisateur;
    const nouvelAgent = this.formData.nouvelAgent;
    
    if (nouvelUtilisateur) {
      this.selectedTransaction.utilisateur = nouvelUtilisateur;
    }
    if (nouvelAgent) {
      this.selectedTransaction.agent = nouvelAgent;
    }
    this.toast(`Transaction ${this.selectedTransaction.id} réattribuée avec succès.`, 'success');
  }

  private marquerFrauduleuse(): void {
    if (!this.selectedTransaction) return;
    const raison = this.formData.raison || 'Signalement';
    const risque = this.formData.risque || 'moyen';
    this.selectedTransaction.statut = 'annulee';
    this.selectedTransaction.description = `FRAUDULEUSE (${risque}): ${raison}`;
    this.toast(`Transaction ${this.selectedTransaction.id} marquée comme frauduleuse.`, 'danger');
  }

  private partagerTransaction(): void {
    if (!this.selectedTransaction) return;
    const methode = this.formData.methode || 'email';
    const destinataire = this.formData.destinataire || 'Non spécifié';
    const message = this.formData.message || '';
    this.toast(`Transaction partagée via ${methode} vers ${destinataire}.`, 'success');
  }

  // ========== EXPORT ET IMPRESSION ==========

  exportExcel(): void {
    this.toast('Export Excel des transactions en cours...', 'info');
    setTimeout(() => {
      this.toast('Export Excel terminé avec succès.', 'success');
    }, 1000);
  }

  printList(): void {
    this.toast('Impression de la liste en cours...', 'info');
    window.print();
  }

  printTransaction(): void {
    this.toast('Impression du reçu en cours...', 'info');
    window.print();
  }

  // ========== MODALES ==========

  closeModal(): void {
    this.modalOpen = false;
    this.selectedTransaction = null;
  }

  closeActionModal(): void {
    this.actionModalOpen = false;
    this.actionModalType = '';
    this.actionModalTitle = '';
    this.formData = {};
    this.selectedTransaction = null;
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