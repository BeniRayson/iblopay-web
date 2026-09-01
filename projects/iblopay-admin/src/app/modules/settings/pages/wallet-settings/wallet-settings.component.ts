import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface WalletData {
  id: string;
  userId: string;
  userNom: string;
  type: 'client' | 'agent' | 'super-agent';
  solde: number;
  soldeEMoney: number;
  soldeCash: number;
  soldeDistribution: number;
  statut: 'actif' | 'bloque' | 'suspendu' | 'archive';
  dateCreation: string;
  derniereTransaction: string;
  kycLevel: number;
  performance: number;
  nbAgents: number;
}

interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: 'credit' | 'debit' | 'transfert' | 'distribution' | 'reception';
  typeLabel: string;
  montant: number;
  description: string;
  destinataire?: string;
  source?: string;
  date: string;
  statut: 'effectue' | 'en_attente' | 'annule' | 'echoue';
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Component({
  selector: 'app-wallet-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './wallet-settings.component.html',
  styleUrls: ['./wallet-settings.component.scss']
})
export class WalletSettingsComponent {
  readonly title = 'Gestion des Wallets';
  readonly icon = '💰';
  readonly pageSize = 10;

  activeTab: 'client' | 'agent' | 'super-agent' = 'client';

  private wallets: WalletData[] = [];
  private transactions: Transaction[] = [];
  private toastSeq = 0;
  private transactionSeq = 1000;

  // Pagination
  private currentPages: { [key: string]: number } = {
    client: 1,
    agent: 1,
    'super-agent': 1
  };

  // Couleurs pour les avatars
  private avatarColors: string[] = [
    '#111c44', '#2A4A8A', '#1A7A4A', '#B8791C', '#C1443B',
    '#6B3FA0', '#008080', '#D4760A', '#2C7A7B', '#805AD5',
    '#E53E3E', '#38A169', '#2B6CB0', '#D69E2E', '#6B46C1'
  ];

  modalOpen = false;
  modalTitle = '';
  modalAction = '';
  selectedWallet: WalletData | null = null;
  montant: number = 0;
  descriptionTxt: string = '';
  transactionId: string = '';
  agentSource: string = '';
  agentDestinataire: string = '';
  agentsList: any[] = [];
  historiqueTransactions: any[] = [];
  toasts: Toast[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const prenoms = ['Jean', 'Marie', 'Pierre', 'Claire', 'Emmanuel', 'Françoise', 'Joseph', 'Jeanne', 'Michel', 'Thérèse',
      'André', 'Marguerite', 'Philippe', 'Catherine', 'Roger', 'Simone', 'Daniel', 'Anne', 'Jacques', 'Francine',
      'Étienne', 'Nicole', 'Henri', 'Jacqueline', 'Louis', 'Chantal', 'Gaston', 'Odette', 'Maurice', 'Solange'];
    const noms = ['NDAYISHIMIYE', 'NSABIMANA', 'NIZIGIYIMANA', 'NDIKUMANA', 'HABIMANA', 'NKURUNZIZA', 'BIZIMANA', 'NIYONZIMA',
      'MANIRAKIZA', 'NSENGIYUMVA', 'NTAHONKURIYE', 'BARAMPAMA', 'NININAHAZWE', 'NZISABIRA', 'NTAKIRUTIMANA',
      'SINDAGAYA', 'NAHIMANA', 'NIZIGIYIMANA', 'NTAHOMVUKIYE', 'NIRAGIRA', 'NTAKIRUTIMANA', 'NSHIMIRIMANA',
      'NIKIZA', 'NISHIMWE', 'NIYONKURU', 'NIZEYIMANA', 'NSANZABAGANWA', 'NTAKIRUTIMANA', 'NTEZIMANA', 'NIYONGABO'];

    // 50 clients
    for (let i = 0; i < 50; i++) {
      const id = `CL-${String(i + 1).padStart(3, '0')}`;
      const nom = `${prenoms[i % prenoms.length]} ${noms[i % noms.length]}`;
      const solde = 5000 + Math.floor(Math.random() * 500000);
      const kycLevel = [1, 2, 3][Math.floor(i % 3)] || 1;
      const statut: 'actif' | 'suspendu' | 'archive' = i % 7 === 0 ? 'suspendu' : i % 13 === 0 ? 'archive' : 'actif';
      
      this.wallets.push({
        id: `WAL-${id}`,
        userId: id,
        userNom: nom,
        type: 'client',
        solde: solde,
        soldeEMoney: 0,
        soldeCash: 0,
        soldeDistribution: 0,
        statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
        dateCreation: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('fr-FR'),
        derniereTransaction: new Date(Date.now() - i * 3600000).toISOString(),
        kycLevel: kycLevel,
        performance: 0,
        nbAgents: 0
      });
    }

    // 50 agents
    for (let i = 0; i < 50; i++) {
      const id = `AG-${String(i + 1).padStart(3, '0')}`;
      const nom = `${prenoms[(i + 5) % prenoms.length]} ${noms[(i + 3) % noms.length]}`;
      const eMoney = 10000 + Math.floor(Math.random() * 300000);
      const cash = 5000 + Math.floor(Math.random() * 150000);
      const performance = 30 + Math.floor(Math.random() * 60);
      const statut: 'actif' | 'suspendu' | 'archive' = i % 9 === 0 ? 'suspendu' : i % 17 === 0 ? 'archive' : 'actif';
      
      this.wallets.push({
        id: `WAL-${id}`,
        userId: id,
        userNom: nom,
        type: 'agent',
        solde: eMoney + cash,
        soldeEMoney: eMoney,
        soldeCash: cash,
        soldeDistribution: 0,
        statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
        dateCreation: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('fr-FR'),
        derniereTransaction: new Date(Date.now() - i * 7200000).toISOString(),
        kycLevel: 0,
        performance: performance,
        nbAgents: 0
      });
    }

    // 10 super agents
    for (let i = 0; i < 10; i++) {
      const id = `SA-${String(i + 1).padStart(3, '0')}`;
      const nom = `Super ${prenoms[(i + 10) % prenoms.length]} ${noms[(i + 7) % noms.length]}`;
      const distribution = 500000 + Math.floor(Math.random() * 2000000);
      const performance = 40 + Math.floor(Math.random() * 50);
      const nbAgents = 4 + Math.floor(Math.random() * 8);
      const statut: 'actif' | 'suspendu' | 'archive' = i % 11 === 0 ? 'suspendu' : 'actif';
      
      this.wallets.push({
        id: `WAL-${id}`,
        userId: id,
        userNom: nom,
        type: 'super-agent',
        solde: distribution,
        soldeEMoney: 0,
        soldeCash: 0,
        soldeDistribution: distribution,
        statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
        dateCreation: new Date(Date.now() - i * 86400000 * 5).toLocaleDateString('fr-FR'),
        derniereTransaction: new Date(Date.now() - i * 86400000).toISOString(),
        kycLevel: 0,
        performance: performance,
        nbAgents: nbAgents
      });
    }

    // Transactions
    this.wallets.forEach(w => {
      const nbTransactions = 2 + Math.floor(Math.random() * 5);
      for (let i = 0; i < nbTransactions; i++) {
        const isCredit = Math.random() > 0.5;
        const montant = 1000 + Math.floor(Math.random() * 100000);
        const type = isCredit ? 'credit' : 'debit';
        const typeLabel = isCredit ? 'Crédit' : 'Débit';
        const description = isCredit ? 'Dépôt effectué' : 'Retrait effectué';
        
        this.transactions.push({
          id: `TXN-${String(++this.transactionSeq).padStart(4, '0')}`,
          walletId: w.id,
          userId: w.userId,
          type: type,
          typeLabel: typeLabel,
          montant: montant,
          description: `${description} #${i + 1}`,
          date: new Date(Date.now() - i * 86400000 * (1 + Math.random() * 3)).toISOString(),
          statut: 'effectue'
        });
      }
    });

    this.agentsList = this.wallets
      .filter(w => w.type === 'agent')
      .map(w => ({
        id: w.userId,
        nom: w.userNom,
        telephone: w.userId
      }));
  }

  // ========== AVATAR ==========

  getAvatarColor(userId: string): string {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.avatarColors.length;
    // Utilisation de l'opérateur de coalescence pour garantir une valeur de retour
    return this.avatarColors[index] || '#111c44';
  }

  // ========== PAGINATION ==========

  getPaginatedWallets(type: string): WalletData[] {
    const wallets = this.getWalletsByType(type);
    const page = this.currentPages[type] || 1;
    const start = (page - 1) * this.pageSize;
    return wallets.slice(start, start + this.pageSize);
  }

  getTotalPages(type: string): number {
    const wallets = this.getWalletsByType(type);
    return Math.ceil(wallets.length / this.pageSize);
  }

  getCurrentPage(type: string): number {
    return this.currentPages[type] || 1;
  }

  nextPage(type: string): void {
    const totalPages = this.getTotalPages(type);
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

  // ========== MÉTHODES PUBLIQUES ==========

  setActiveTab(tab: 'client' | 'agent' | 'super-agent'): void {
    this.activeTab = tab;
    this.currentPages[tab] = 1;
  }

  getWalletsByType(type: string): WalletData[] {
    return this.wallets.filter(w => w.type === type);
  }

  getTotalSolde(type: string): number {
    const wallets = this.wallets.filter(w => w.type === type);
    return wallets.reduce((sum, w) => sum + w.solde, 0);
  }

  getTotalGeneral(): number {
    return this.wallets.reduce((sum, w) => sum + w.solde, 0);
  }

  getInitials(nom: string): string {
    return (nom || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase())
      .join('');
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      actif: 'Actif',
      bloque: 'Bloqué',
      suspendu: 'Suspendu',
      archive: 'Archivé'
    };
    return labels[statut] || statut;
  }

  getKycLevel(userId: string): number {
    const wallet = this.wallets.find(w => w.userId === userId);
    return wallet ? wallet.kycLevel : 1;
  }

  getAgentPerformance(userId: string): number {
    const wallet = this.wallets.find(w => w.userId === userId);
    return wallet ? wallet.performance : 0;
  }

  getSuperPerformance(userId: string): number {
    const wallet = this.wallets.find(w => w.userId === userId);
    return wallet ? wallet.performance : 0;
  }

  getNbAgentsForSuper(superId: string): number {
    const wallet = this.wallets.find(w => w.userId === superId);
    return wallet ? wallet.nbAgents : 0;
  }

  // ========== ACTIONS ==========

  openWalletHistory(wallet: WalletData): void {
    this.selectedWallet = wallet;
    this.modalTitle = `Historique - ${wallet.userNom}`;
    this.modalAction = 'historique';
    this.modalOpen = true;
    
    this.historiqueTransactions = this.transactions
      .filter(t => t.walletId === wallet.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20)
      .map(t => ({
        date: new Date(t.date).toLocaleString('fr-FR'),
        type: t.type,
        typeLabel: t.typeLabel,
        montant: (t.type === 'credit' || t.type === 'reception' ? '+' : '-') + ' ' + t.montant.toLocaleString('fr-FR') + ' BIF',
        description: t.description
      }));
  }

  openWalletAction(wallet: WalletData, action: string): void {
    this.selectedWallet = wallet;
    this.modalAction = action;
    this.modalTitle = this.getActionTitle(action, wallet.userNom);
    this.modalOpen = true;
    this.montant = 0;
    this.descriptionTxt = '';
    this.agentSource = '';
    this.agentDestinataire = '';
  }

  openGlobalAction(type: string, action: string): void {
    this.selectedWallet = null;
    this.modalAction = action;
    this.modalTitle = this.getGlobalActionTitle(type, action);
    this.modalOpen = true;
    this.montant = 0;
    this.descriptionTxt = '';
    this.agentSource = '';
    this.agentDestinataire = '';

    if (action === 'historique') {
      const wallets = this.wallets.filter(w => w.type === type);
      const walletIds = wallets.map(w => w.id);
      this.historiqueTransactions = this.transactions
        .filter(t => walletIds.includes(t.walletId))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30)
        .map(t => ({
          date: new Date(t.date).toLocaleString('fr-FR'),
          type: t.type,
          typeLabel: t.typeLabel,
          montant: (t.type === 'credit' || t.type === 'reception' ? '+' : '-') + ' ' + t.montant.toLocaleString('fr-FR') + ' BIF',
          description: t.description
        }));
    }
  }

  private getActionTitle(action: string, nom: string): string {
    const titles: Record<string, string> = {
      crediter: `Créditer - ${nom}`,
      debiter: `Débiter - ${nom}`,
      bloquer: `Bloquer - ${nom}`,
      debloquer: `Débloquer - ${nom}`,
      solde: `Solde - ${nom}`,
      distribution: `Distribuer - ${nom}`,
      reception: `Réception - ${nom}`,
      reattribuer: `Réattribuer - ${nom}`
    };
    return titles[action] || `Action - ${nom}`;
  }

  private getGlobalActionTitle(type: string, action: string): string {
    const typeLabels: Record<string, string> = {
      client: 'Clients',
      agent: 'Agents',
      'super-agent': 'Super Agents'
    };
    const actionLabels: Record<string, string> = {
      crediter: 'Créditer tous les',
      debiter: 'Débiter tous les',
      distribution: 'Distribuer aux',
      reception: 'Réception pour les',
      historique: 'Historique des',
      reattribuer: 'Réattribuer e-Money des'
    };
    return `${actionLabels[action] || action} ${typeLabels[type] || type}`;
  }

  confirmModal(): void {
    if (this.selectedWallet) {
      this.executeWalletAction(this.selectedWallet);
    } else {
      this.executeGlobalAction();
    }
    this.closeModal();
  }

  private executeWalletAction(wallet: WalletData): void {
    switch (this.modalAction) {
      case 'crediter':
        if (this.montant > 0) {
          wallet.solde += this.montant;
          if (wallet.type === 'agent') wallet.soldeEMoney += this.montant;
          if (wallet.type === 'super-agent') wallet.soldeDistribution += this.montant;
          this.addTransaction(wallet, 'credit', this.montant, this.descriptionTxt || 'Crédit manuel');
          this.toast(`Crédit de ${this.montant.toLocaleString('fr-FR')} BIF effectué sur ${wallet.userNom}.`, 'success');
        } else {
          this.toast('Le montant doit être supérieur à 0.', 'danger');
        }
        break;
      case 'debiter':
        if (this.montant > 0 && wallet.solde >= this.montant) {
          wallet.solde -= this.montant;
          if (wallet.type === 'agent') wallet.soldeEMoney -= this.montant;
          if (wallet.type === 'super-agent') wallet.soldeDistribution -= this.montant;
          this.addTransaction(wallet, 'debit', this.montant, this.descriptionTxt || 'Débit manuel');
          this.toast(`Débit de ${this.montant.toLocaleString('fr-FR')} BIF effectué sur ${wallet.userNom}.`, 'success');
        } else {
          this.toast('Montant invalide ou solde insuffisant.', 'danger');
        }
        break;
      case 'bloquer':
        if (wallet.statut === 'actif') {
          wallet.statut = 'bloque';
          this.addTransaction(wallet, 'debit', 0, `Blocage du compte : ${this.descriptionTxt || 'Motif non spécifié'}`);
          this.toast(`Wallet de ${wallet.userNom} bloqué avec succès.`, 'warning');
        } else {
          this.toast('Le wallet n\'est pas actif.', 'danger');
        }
        break;
      case 'debloquer':
        if (wallet.statut === 'bloque') {
          wallet.statut = 'actif';
          this.addTransaction(wallet, 'credit', 0, `Déblocage du compte : ${this.descriptionTxt || 'Motif non spécifié'}`);
          this.toast(`Wallet de ${wallet.userNom} débloqué avec succès.`, 'success');
        } else {
          this.toast('Le wallet n\'est pas bloqué.', 'danger');
        }
        break;
      case 'distribution':
        if (this.montant > 0 && this.agentDestinataire) {
          const agentWallet = this.wallets.find(w => w.userId === this.agentDestinataire && w.type === 'agent');
          if (agentWallet && wallet.solde >= this.montant) {
            wallet.solde -= this.montant;
            wallet.soldeDistribution -= this.montant;
            agentWallet.solde += this.montant;
            agentWallet.soldeEMoney += this.montant;
            this.addTransaction(wallet, 'distribution', this.montant, `Distribution à ${agentWallet.userNom}`);
            this.addTransaction(agentWallet, 'credit', this.montant, `Réception de distribution de ${wallet.userNom}`);
            this.toast(`Distribution de ${this.montant.toLocaleString('fr-FR')} BIF effectuée.`, 'success');
          } else {
            this.toast('Agent introuvable ou solde insuffisant.', 'danger');
          }
        } else {
          this.toast('Veuillez remplir tous les champs.', 'danger');
        }
        break;
      case 'reception':
        if (this.montant > 0) {
          wallet.solde += this.montant;
          wallet.soldeDistribution += this.montant;
          this.addTransaction(wallet, 'reception', this.montant, `Réception : ${this.descriptionTxt || 'Source externe'}`);
          this.toast(`Réception de ${this.montant.toLocaleString('fr-FR')} BIF enregistrée.`, 'success');
        } else {
          this.toast('Le montant doit être supérieur à 0.', 'danger');
        }
        break;
      default:
        this.toast('Action non reconnue.', 'info');
    }
  }

  private executeGlobalAction(): void {
    let type = 'client';
    if (this.modalTitle.includes('Agents') && !this.modalTitle.includes('Super')) type = 'agent';
    else if (this.modalTitle.includes('Super')) type = 'super-agent';
    else if (this.modalTitle.includes('Clients')) type = 'client';

    const wallets = this.wallets.filter(w => w.type === type);

    switch (this.modalAction) {
      case 'crediter':
        if (this.montant > 0) {
          const montantParWallet = this.montant / (wallets.length || 1);
          wallets.forEach(w => {
            w.solde += montantParWallet;
            if (w.type === 'agent') w.soldeEMoney += montantParWallet;
            if (w.type === 'super-agent') w.soldeDistribution += montantParWallet;
            this.addTransaction(w, 'credit', montantParWallet, this.descriptionTxt || 'Crédit global');
          });
          this.toast(`Crédit de ${this.montant.toLocaleString('fr-FR')} BIF effectué sur ${wallets.length} wallet(s).`, 'success');
        } else {
          this.toast('Le montant doit être supérieur à 0.', 'danger');
        }
        break;
      case 'debiter':
        if (this.montant > 0) {
          const soldeTotal = wallets.reduce((sum, w) => sum + w.solde, 0);
          if (soldeTotal >= this.montant) {
            const proportion = this.montant / soldeTotal;
            wallets.forEach(w => {
              const debit = w.solde * proportion;
              w.solde -= debit;
              if (w.type === 'agent') w.soldeEMoney -= debit;
              if (w.type === 'super-agent') w.soldeDistribution -= debit;
              this.addTransaction(w, 'debit', debit, this.descriptionTxt || 'Débit global');
            });
            this.toast(`Débit de ${this.montant.toLocaleString('fr-FR')} BIF effectué.`, 'success');
          } else {
            this.toast('Solde total insuffisant.', 'danger');
          }
        } else {
          this.toast('Le montant doit être supérieur à 0.', 'danger');
        }
        break;
      case 'distribution':
        if (this.montant > 0 && this.agentDestinataire) {
          const agentWallet = this.wallets.find(w => w.userId === this.agentDestinataire && w.type === 'agent');
          if (agentWallet) {
            const soldeTotal = wallets.reduce((sum, w) => sum + w.solde, 0);
            if (soldeTotal >= this.montant) {
              const proportion = this.montant / soldeTotal;
              wallets.forEach(w => {
                const debit = w.solde * proportion;
                w.solde -= debit;
                w.soldeDistribution -= debit;
                this.addTransaction(w, 'distribution', debit, `Distribution à ${agentWallet.userNom}`);
              });
              agentWallet.solde += this.montant;
              agentWallet.soldeEMoney += this.montant;
              this.addTransaction(agentWallet, 'credit', this.montant, `Réception de distribution globale`);
              this.toast(`Distribution de ${this.montant.toLocaleString('fr-FR')} BIF effectuée.`, 'success');
            } else {
              this.toast('Solde total insuffisant.', 'danger');
            }
          } else {
            this.toast('Agent destinataire introuvable.', 'danger');
          }
        } else {
          this.toast('Veuillez remplir tous les champs.', 'danger');
        }
        break;
      case 'reception':
        if (this.montant > 0) {
          const montantParWallet = this.montant / (wallets.length || 1);
          wallets.forEach(w => {
            w.solde += montantParWallet;
            w.soldeDistribution += montantParWallet;
            this.addTransaction(w, 'reception', montantParWallet, `Réception : ${this.descriptionTxt || 'Source externe'}`);
          });
          this.toast(`Réception de ${this.montant.toLocaleString('fr-FR')} BIF enregistrée.`, 'success');
        } else {
          this.toast('Le montant doit être supérieur à 0.', 'danger');
        }
        break;
      case 'reattribuer':
        if (this.montant > 0 && this.agentSource && this.agentDestinataire) {
          const sourceWallet = this.wallets.find(w => w.userId === this.agentSource && w.type === 'agent');
          const destWallet = this.wallets.find(w => w.userId === this.agentDestinataire && w.type === 'agent');
          if (sourceWallet && destWallet && sourceWallet.soldeEMoney >= this.montant) {
            sourceWallet.soldeEMoney -= this.montant;
            sourceWallet.solde -= this.montant;
            destWallet.soldeEMoney += this.montant;
            destWallet.solde += this.montant;
            this.addTransaction(sourceWallet, 'transfert', this.montant, `Réattribution e-Money vers ${destWallet.userNom}`);
            this.addTransaction(destWallet, 'credit', this.montant, `Réattribution e-Money depuis ${sourceWallet.userNom}`);
            this.toast(`Réattribution de ${this.montant.toLocaleString('fr-FR')} BIF effectuée.`, 'success');
          } else {
            this.toast('Source/destinataire invalide ou solde insuffisant.', 'danger');
          }
        } else {
          this.toast('Veuillez remplir tous les champs.', 'danger');
        }
        break;
      default:
        this.toast('Action non reconnue.', 'info');
    }
  }

  private addTransaction(wallet: WalletData, type: Transaction['type'], montant: number, description: string): void {
    const typeLabels: Record<string, string> = {
      credit: 'Crédit',
      debit: 'Débit',
      transfert: 'Transfert',
      distribution: 'Distribution',
      reception: 'Réception'
    };
    this.transactions.push({
      id: `TXN-${String(++this.transactionSeq).padStart(4, '0')}`,
      walletId: wallet.id,
      userId: wallet.userId,
      type: type,
      typeLabel: typeLabels[type] || type,
      montant: montant,
      description: description,
      date: new Date().toISOString(),
      statut: 'effectue'
    });
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedWallet = null;
  }

  toast(message: string, type: Toast['type'] = 'info'): void {
    const id = ++this.toastSeq;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.dismissToast(id), 5000);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}