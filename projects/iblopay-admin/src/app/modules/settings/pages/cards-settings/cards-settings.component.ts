import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsSection, SettingsAction, SettingsSubGroup } from '../../models/settings.model';

interface CardData {
  id: string;
  numero: string;
  uid: string;
  typeCarte: 'parent' | 'enfant';
  utilisateur: string;
  userId: string;
  solde: number;
  statut: 'active' | 'bloquee' | 'desactivee' | 'expiree' | 'inactive';
  dateEmission: string;
  dateExpiration: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Component({
  selector: 'app-cards-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cards-settings.component.html',
  styleUrls: ['./cards-settings.component.scss']
})
export class CardsSettingsComponent {
  readonly title = 'Gestion des Cartes';
  readonly icon = '💳';
  readonly pageSize = 10;

  activeTab: 'cartes' | 'stocks' = 'cartes';
  private currentPages: { [key: string]: number } = {
    cartes: 1,
    stocks: 1
  };

  // Filtres
  searchTerm: string = '';
  filterStatut: string = 'tous';
  filterType: string = 'tous';

  private cartes: CardData[] = [];
  private historique: any[] = [];
  private toastSeq = 0;

  modalOpen = false;
  selectedCard: CardData | null = null;

  // Gestion du PIN
  pinModalOpen = false;
  pinActionType = '';
  pinData: any = {};
  pinError = false;

  actionModalOpen = false;
  actionModalTitle = '';
  actionModalType = '';
  formData: any = {
    pin: '',
    nouveauPin: '',
    confirmPin: ''
  };

  historiqueCartes: any[] = [];
  toasts: Toast[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const utilisateurs = [
      { id: 'CL-001', nom: 'Jean NDAYISHIMIYE' },
      { id: 'CL-002', nom: 'Marie NSABIMANA' },
      { id: 'CL-003', nom: 'Pierre NIZIGIYIMANA' },
      { id: 'CL-004', nom: 'Claire NDIKUMANA' },
      { id: 'CL-005', nom: 'Emmanuel NTAKIRUTIMANA' },
      { id: 'CL-006', nom: 'Françoise NIKIZA' },
      { id: 'CL-007', nom: 'Joseph NISHIMWE' },
      { id: 'CL-008', nom: 'Jeanne NIYONKURU' },
      { id: 'CL-009', nom: 'Michel NIZEYIMANA' },
      { id: 'CL-010', nom: 'Thérèse NSANZABAGANWA' },
      { id: 'CL-011', nom: 'Gaston NTEZIMANA' },
      { id: 'CL-012', nom: 'Odette NIYONGABO' }
    ];

    for (let i = 0; i < 60; i++) {
      const isParent = i % 3 === 0;
      const userIndex = i % utilisateurs.length;
      const user = utilisateurs[userIndex] || utilisateurs[0];
      const dateEmission = new Date(Date.now() - i * 86400000 * 15);
      const dateExpiration = new Date(dateEmission);
      dateExpiration.setFullYear(dateExpiration.getFullYear() + 3);
      
      const statuts: CardData['statut'][] = ['active', 'active', 'active', 'bloquee', 'desactivee', 'inactive'];
      const statutIndex = i % statuts.length;
      const statut = statuts[statutIndex] || 'active';

      this.cartes.push({
        id: `CARD-${String(i + 1).padStart(4, '0')}`,
        numero: `IBLO${String(100000 + i).padStart(6, '0')}`,
        uid: `UID-${String(10000 + i).padStart(5, '0')}`,
        typeCarte: isParent ? 'parent' : 'enfant',
        utilisateur: user ? user.nom : 'Utilisateur Inconnu',
        userId: user ? user.id : 'UNKNOWN',
        solde: isParent ? 100000 + Math.floor(Math.random() * 400000) : 5000 + Math.floor(Math.random() * 50000),
        statut: statut,
        dateEmission: dateEmission.toLocaleDateString('fr-FR'),
        dateExpiration: dateExpiration.toLocaleDateString('fr-FR')
      });
    }

    // Générer l'historique complet avec 5 lignes par carte
    const actions = [
      'Paiement Bus', 'Paiement Taxi', 'Achat Marché', 'Achat Engrais Chimique',
      'Paiement Électricité', 'Achat Nourriture', 'Transfert Mobile', 'Paiement Eau',
      'Achat Pharmacie', 'Paiement Scolarité', 'Achat Vêtements', 'Paiement Loyer',
      'Achat Matériel', 'Paiement Service', 'Achat Carburant', 'Paiement Internet',
      'Achat Entretien', 'Paiement Assurance', 'Achat Semences', 'Paiement Santé'
    ];
    const montants = [5000, 10000, 15000, 20000, 25000, 30000, 50000, 75000, 100000, 200000];
    
    // Générer 5 transactions par carte
    for (let i = 0; i < this.cartes.length; i++) {
      const card = this.cartes[i];
      if (card) {
        for (let j = 0; j < 5; j++) {
          const montantIndex = Math.floor(Math.random() * montants.length);
          const montant = montants[montantIndex] || 10000;
          const isCredit = Math.random() > 0.5;
          const actionIndex = Math.floor(Math.random() * actions.length);
          const action = actions[actionIndex] || 'Transaction';
          
          this.historique.push({
            date: new Date(Date.now() - (i * 5 + j) * 86400000 * (1 + Math.floor(Math.random() * 3))).toLocaleString('fr-FR'),
            action: action,
            detail: `Carte ${card.numero} - ${action}`,
            utilisateur: card.utilisateur,
            montant: (isCredit ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
            isCredit: isCredit,
            montantValue: montant
          });
        }
      }
    }
  }

  // ========== FILTRES ==========

  getFilteredCartes(): CardData[] {
    let result = this.cartes;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c => 
        c.numero.toLowerCase().includes(term) ||
        c.uid.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term) ||
        c.utilisateur.toLowerCase().includes(term) ||
        c.userId.toLowerCase().includes(term)
      );
    }
    
    if (this.filterStatut !== 'tous') {
      result = result.filter(c => c.statut === this.filterStatut);
    }
    
    if (this.filterType !== 'tous') {
      result = result.filter(c => c.typeCarte === this.filterType);
    }
    
    return result;
  }

  getFilteredStock(): CardData[] {
    let result = this.getCartesInactives();
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c => 
        c.numero.toLowerCase().includes(term) ||
        c.uid.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term)
      );
    }
    
    return result;
  }

  onSearchChange(): void {
    this.currentPages['cartes'] = 1;
    this.currentPages['stocks'] = 1;
  }

  onFilterChange(): void {
    this.currentPages['cartes'] = 1;
    this.currentPages['stocks'] = 1;
  }

  // ========== STATISTIQUES ==========

  getTotalCartes(): number {
    return this.cartes.length;
  }

  getCartesByStatut(statut: CardData['statut']): CardData[] {
    return this.cartes.filter(c => c.statut === statut);
  }

  getCartesParent(): CardData[] {
    return this.cartes.filter(c => c.typeCarte === 'parent');
  }

  getCartesEnfant(): CardData[] {
    return this.cartes.filter(c => c.typeCarte === 'enfant');
  }

  getCartesInactives(): CardData[] {
    return this.cartes.filter(c => c.statut === 'inactive');
  }

  getAllCartes(): CardData[] {
    return this.cartes;
  }

  getStockTotal(): number {
    return this.getCartesInactives().length;
  }

  getTotalGeneral(): number {
    return this.getTotalCartes() + this.getStockTotal();
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      active: 'Active',
      bloquee: 'Bloquée',
      desactivee: 'Désactivée',
      expiree: 'Expirée',
      inactive: 'Inactive'
    };
    return labels[statut] || statut;
  }

  // ========== PAGINATION ==========

  getPaginatedFilteredCartes(): CardData[] {
    const page = this.currentPages['cartes'] || 1;
    const start = (page - 1) * this.pageSize;
    return this.getFilteredCartes().slice(start, start + this.pageSize);
  }

  getPaginatedFilteredStock(): CardData[] {
    const page = this.currentPages['stocks'] || 1;
    const start = (page - 1) * this.pageSize;
    return this.getFilteredStock().slice(start, start + this.pageSize);
  }

  getTotalFilteredPages(type: string): number {
    const items = type === 'cartes' ? this.getFilteredCartes() : this.getFilteredStock();
    return Math.ceil(items.length / this.pageSize);
  }

  getCurrentPage(type: string): number {
    return this.currentPages[type] || 1;
  }

  nextPage(type: string): void {
    const totalPages = this.getTotalFilteredPages(type);
    const currentPage = this.currentPages[type] || 1;
    if (currentPage < totalPages) {
      this.currentPages[type] = currentPage + 1;
    }
  }

  previousPage(type: string): void {
    const currentPage = this.currentPages[type] || 1;
    if (currentPage > 1) {
      this.currentPages[type] = currentPage - 1;
    }
  }

  setActiveTab(tab: 'cartes' | 'stocks'): void {
    this.activeTab = tab;
    this.currentPages[tab] = 1;
  }

  // ========== GESTION PIN ==========

  private pendingAction: { type: string, card?: CardData, data?: any } | null = null;

  openCardAction(card: CardData, action: string): void {
    this.selectedCard = card;
    this.pendingAction = { type: action, card: card };
    this.formData = { 
      cardId: card.id,
      pin: '',
      nouveauPin: '',
      confirmPin: ''
    };
    this.pinError = false;
    this.pinModalOpen = true;
    this.pinActionType = action;
    this.pinData = { cardId: card.id };
  }

  onPinChange(): void {
    if (this.formData.pin.length === 4) {
      this.pinError = false;
    }
  }

  closePinModal(): void {
    this.pinModalOpen = false;
    this.formData.pin = '';
    this.pinError = false;
    this.pendingAction = null;
  }

  confirmPin(): void {
    if (this.formData.pin !== '1234') {
      this.pinError = true;
      this.formData.pin = '';
      return;
    }

    this.pinError = false;
    this.pinModalOpen = false;

    if (this.pendingAction) {
      this.actionModalType = this.pendingAction.type;
      this.actionModalTitle = this.getActionTitle(this.pendingAction.type);
      this.actionModalOpen = true;
      this.formData.pin = '';
      
      if (this.pendingAction.card) {
        this.selectedCard = this.pendingAction.card;
      }
    }
  }

  getActionIcon(): string {
    const icons: Record<string, string> = {
      emettre: '➕',
      associer: '🔗',
      desassocier: '🔓',
      activer: '✅',
      desactiver: '⛔',
      bloquer: '🔒',
      debloquer: '🔓',
      renouveler: '🔄',
      reinitialiser_pin: '🔢',
      detruire: '🗑️'
    };
    return icons[this.actionModalType] || '📋';
  }

  // ========== ACTIONS ==========

  openAction(actionId: string): void {
    this.actionModalType = actionId;
    this.actionModalTitle = this.getActionTitle(actionId);
    this.actionModalOpen = true;
    this.formData = { pin: '', nouveauPin: '', confirmPin: '' };

    if (actionId === 'historique') {
      this.historiqueCartes = this.historique.slice(0, 20);
    }
  }

  openCardDetails(card: CardData): void {
    this.selectedCard = card;
    this.modalOpen = true;
  }

  openCardHistory(card: CardData): void {
    this.selectedCard = card;
    this.actionModalType = 'historique';
    this.actionModalTitle = `Historique - ${card.numero}`;
    this.actionModalOpen = true;
    this.formData = { pin: '' };
    // Filtrer l'historique pour la carte sélectionnée
    this.historiqueCartes = this.historique
      .filter(h => h.detail.includes(card.numero))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
    
    if (this.historiqueCartes.length === 0) {
      // Si pas d'historique, générer un historique factice
      this.historiqueCartes = this.generateFakeHistory(card);
    }
  }

  private generateFakeHistory(card: CardData): any[] {
    const actions = ['Paiement Bus', 'Paiement Taxi', 'Achat Marché', 'Achat Engrais Chimique'];
    const montants = [5000, 10000, 15000, 25000, 30000, 50000];
    const history = [];
    
    for (let i = 0; i < 5; i++) {
      const montant = montants[Math.floor(Math.random() * montants.length)] || 10000;
      const isCredit = Math.random() > 0.5;
      history.push({
        date: new Date(Date.now() - i * 86400000 * (1 + Math.floor(Math.random() * 3))).toLocaleString('fr-FR'),
        action: actions[Math.floor(Math.random() * actions.length)],
        detail: `Carte ${card.numero} - ${actions[Math.floor(Math.random() * actions.length)]}`,
        utilisateur: card.utilisateur,
        montant: (isCredit ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
        isCredit: isCredit,
        montantValue: montant
      });
    }
    return history;
  }

  getActionClass(action: string): string {
    const creditActions = ['Dépôt', 'Crédit', 'Réception', 'Transfert reçu'];
    const debitActions = ['Retrait', 'Débit', 'Paiement', 'Transfert envoyé', 'Achat'];
    
    for (const ca of creditActions) {
      if (action.includes(ca)) return 'credit';
    }
    for (const da of debitActions) {
      if (action.includes(da)) return 'debit';
    }
    return 'neutral';
  }

  getMontantClass(montant: string): string {
    if (!montant) return '';
    if (montant.startsWith('+')) return 'montant-credit';
    if (montant.startsWith('-')) return 'montant-debit';
    return 'montant-neutral';
  }

  private getActionTitle(actionId: string): string {
    const titles: Record<string, string> = {
      emettre: 'Émettre une nouvelle carte',
      associer: 'Associer une carte à un utilisateur',
      desassocier: 'Désassocier une carte',
      activer: 'Activer une carte',
      desactiver: 'Désactiver une carte',
      bloquer: 'Bloquer une carte',
      debloquer: 'Débloquer une carte',
      renouveler: 'Renouveler une carte',
      reinitialiser_pin: 'Réinitialiser le PIN',
      historique: 'Historique des cartes',
      inventaire: 'Inventaire des cartes',
      detruire: 'Détruire une carte'
    };
    return titles[actionId] || actionId;
  }

  confirmAction(): void {
    switch (this.actionModalType) {
      case 'emettre':
        this.emettreCarte();
        break;
      case 'associer':
        this.associerCarte();
        break;
      case 'desassocier':
        this.desassocierCarte();
        break;
      case 'activer':
        this.activerCarte();
        break;
      case 'desactiver':
        this.desactiverCarte();
        break;
      case 'bloquer':
        this.bloquerCarte();
        break;
      case 'debloquer':
        this.debloquerCarte();
        break;
      case 'renouveler':
        this.renouvelerCarte();
        break;
      case 'reinitialiser_pin':
        this.reinitialiserPin();
        break;
      case 'detruire':
        this.detruireCarte();
        break;
      default:
        this.toast(`Action "${this.actionModalType}" exécutée avec succès.`, 'success');
    }
    this.closeActionModal();
  }

  // ========== ACTIONS MÉTIER ==========

  private emettreCarte(): void {
    const typeCarte = this.formData.typeCarte || 'parent';
    const quantite = this.formData.quantite || 1;
    const soldeInitial = this.formData.soldeInitial || 0;
    const count = this.cartes.length;
    const utilisateurs = [
      { id: 'CL-001', nom: 'Jean NDAYISHIMIYE' },
      { id: 'CL-002', nom: 'Marie NSABIMANA' },
      { id: 'CL-003', nom: 'Pierre NIZIGIYIMANA' }
    ];
    
    for (let i = 0; i < quantite; i++) {
      const num = count + i + 1;
      const user = utilisateurs[i % utilisateurs.length] || utilisateurs[0];
      this.cartes.push({
        id: `CARD-${String(num).padStart(4, '0')}`,
        numero: `IBLO${String(100000 + num).padStart(6, '0')}`,
        uid: `UID-${String(10000 + num).padStart(5, '0')}`,
        typeCarte: typeCarte === 'parent' ? 'parent' : 'enfant',
        utilisateur: user ? user.nom : 'Utilisateur Inconnu',
        userId: user ? user.id : 'UNKNOWN',
        solde: soldeInitial,
        statut: 'active',
        dateEmission: new Date().toLocaleDateString('fr-FR'),
        dateExpiration: new Date(Date.now() + 3 * 365 * 86400000).toLocaleDateString('fr-FR')
      });
    }
    this.toast(`${quantite} carte(s) ${typeCarte} émise(s) avec succès.`, 'success');
  }

  private associerCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card) {
      card.utilisateur = `Utilisateur ${this.formData.userId}`;
      card.userId = this.formData.userId;
      card.statut = 'active';
      this.toast(`Carte ${card.numero} associée à l'utilisateur ${this.formData.userId}.`, 'success');
    } else {
      this.toast('Carte non trouvée.', 'danger');
    }
  }

  private desassocierCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card) {
      card.utilisateur = 'Non assigné';
      card.userId = 'N/A';
      card.statut = 'inactive';
      this.toast(`Carte ${card.numero} désassociée avec succès.`, 'success');
    } else {
      this.toast('Carte non trouvée.', 'danger');
    }
  }

  private activerCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card && card.statut === 'inactive') {
      card.statut = 'active';
      this.toast(`Carte ${card.numero} activée avec succès.`, 'success');
    } else {
      this.toast('Carte non trouvée ou déjà active.', 'danger');
    }
  }

  private desactiverCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card && card.statut === 'active') {
      card.statut = 'desactivee';
      this.toast(`Carte ${card.numero} désactivée avec succès.`, 'success');
    } else {
      this.toast('Carte non trouvée ou déjà désactivée.', 'danger');
    }
  }

  private bloquerCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card && (card.statut === 'active' || card.statut === 'desactivee')) {
      card.statut = 'bloquee';
      this.toast(`Carte ${card.numero} bloquée avec succès.`, 'warning');
    } else {
      this.toast('Carte non trouvée ou déjà bloquée.', 'danger');
    }
  }

  private debloquerCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card && card.statut === 'bloquee') {
      card.statut = 'active';
      this.toast(`Carte ${card.numero} débloquée avec succès.`, 'success');
    } else {
      this.toast('Carte non trouvée ou déjà débloquée.', 'danger');
    }
  }

  private renouvelerCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card) {
      const dateExpiration = new Date(Date.now() + 3 * 365 * 86400000);
      card.dateExpiration = dateExpiration.toLocaleDateString('fr-FR');
      card.statut = 'active';
      this.toast(`Carte ${card.numero} renouvelée jusqu'au ${card.dateExpiration}.`, 'success');
    } else {
      this.toast('Carte non trouvée.', 'danger');
    }
  }

  private reinitialiserPin(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card) {
      if (!this.formData.nouveauPin || this.formData.nouveauPin.length !== 4) {
        this.toast('Le nouveau PIN doit contenir 4 chiffres.', 'danger');
        return;
      }
      if (this.formData.nouveauPin !== this.formData.confirmPin) {
        this.toast('Les PIN ne correspondent pas.', 'danger');
        return;
      }
      this.toast(`PIN réinitialisé avec succès pour la carte ${card.numero}.`, 'success');
    } else {
      this.toast('Carte non trouvée.', 'danger');
    }
  }

  private detruireCarte(): void {
    const card = this.cartes.find(c => c.id === this.formData.cardId);
    if (card) {
      this.cartes = this.cartes.filter(c => c.id !== card.id);
      this.toast(`Carte ${card.numero} détruite avec succès.`, 'success');
    } else {
      this.toast('Carte non trouvée.', 'danger');
    }
  }

  // ========== EXPORT ET IMPRESSION ==========

  exportExcel(): void {
    this.toast('Export Excel des cartes en cours...', 'info');
    setTimeout(() => {
      this.toast('Export Excel terminé avec succès.', 'success');
    }, 1000);
  }

  exportExcelStock(): void {
    this.toast('Export Excel du stock en cours...', 'info');
    setTimeout(() => {
      this.toast('Export Excel du stock terminé avec succès.', 'success');
    }, 1000);
  }

  exportHistoryExcel(): void {
    this.toast('Export Excel de l\'historique en cours...', 'info');
    setTimeout(() => {
      this.toast('Export Excel de l\'historique terminé avec succès.', 'success');
    }, 1000);
  }

  printList(): void {
    this.toast('Impression de la liste en cours...', 'info');
    window.print();
  }

  printStock(): void {
    this.toast('Impression du stock en cours...', 'info');
    window.print();
  }

  printHistory(): void {
    this.toast('Impression de l\'historique en cours...', 'info');
    window.print();
  }

  printCardDetail(): void {
    this.toast('Impression des détails de la carte en cours...', 'info');
    window.print();
  }

  // ========== MODALES ==========

  closeModal(): void {
    this.modalOpen = false;
    this.selectedCard = null;
  }

  closeActionModal(): void {
    this.actionModalOpen = false;
    this.actionModalType = '';
    this.actionModalTitle = '';
    this.formData = { pin: '', nouveauPin: '', confirmPin: '' };
    this.pendingAction = null;
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