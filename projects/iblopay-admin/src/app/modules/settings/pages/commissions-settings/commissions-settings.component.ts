import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// ========== INTERFACES ==========

interface Agent {
  id: string;
  nom: string;
  role: 'agent' | 'super_agent' | 'etat';
  email: string;
  telephone: string;
  dateCreation: string;
  solde: number;
  transactions: number;
  volumeTotal: number;
  commissionTotal: number;
  statut: 'actif' | 'inactif';
}

interface Commission {
  id: string;
  agentId: string;
  agentNom: string;
  agentRole: 'agent' | 'super_agent' | 'etat';
  nbTransactions: number;
  volume: number;
  taux: number;
  montant: number;
  statut: 'calculee' | 'payee' | 'en_attente';
  date?: string;
  transactionIds?: string[];
  commissionEtat?: number;
}

interface HistoriqueCommission {
  id: string;
  date: string;
  agentId: string;
  agentNom: string;
  agentRole: 'agent' | 'super_agent' | 'etat';
  montant: number;
  type: 'commission_agent' | 'commission_super' | 'commission_etat' | 'transfert_etat';
  reference: string;
  statut: 'effectue' | 'en_attente' | 'echoue';
  description?: string;
}

interface TransfertEtat {
  id: string;
  date: string;
  montant: number;
  reference: string;
  statut: 'effectue' | 'en_attente' | 'echoue';
  description: string;
  source: string;
  destination: 'compte_etat';
  commissionIds: string[];
  agentId?: string;
}

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
  color: string;
  textColor: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

@Component({
  selector: 'app-commissions-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './commissions-settings.component.html',
  styleUrls: ['./commissions-settings.component.scss']
})
export class CommissionsSettingsComponent implements OnInit {
  readonly title = 'Gestion des Commissions';
  readonly icon = '💵';
  readonly pageSize = 100;
  private readonly STORAGE_KEY = 'commissions_data_v2';

  private agents: Agent[] = [];
  private commissions: Commission[] = [];
  private historique: HistoriqueCommission[] = [];
  private transfertsEtat: TransfertEtat[] = [];
  private toastSeq = 0;

  activeTab: string = 'dashboard';
  modalOpen = false;
  modalTitle = '';
  modalType = '';
  modalIcon = '';
  selectedItem: any = null;
  formData: any = {};
  toasts: Toast[] = [];
  pinCode: string = '';
  showPinModal: boolean = false;

  private currentPages: { [key: string]: number } = {
    commissions: 1,
    historique: 1,
    transferts: 1,
    agents: 1,
    super_agents: 1
  };

  tabs: TabItem[] = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { key: 'agents', label: 'Agents', icon: '👤' },
    { key: 'super_agents', label: 'Super Agents', icon: '⭐' },
    { key: 'etat', label: 'État', icon: '🏛️' },
    { key: 'commissions', label: 'Commissions', icon: '💰' },
    { key: 'historique', label: 'Historique', icon: '📋' },
    { key: 'transferts', label: 'Transferts État', icon: '🏦' }
  ];

  constructor() {
    this.loadData();
    this.initializeData();
  }

  ngOnInit(): void {
    this.updateCounts();
  }

  // ========== GENERATION DES NOMS ==========

  private generateAgentNames(count: number, prefix: string, role: 'agent' | 'super_agent'): { id: string; nom: string }[] {
    const prenoms = [
      'Pierre', 'Claire', 'Jean-Bosco', 'Marie', 'Emmanuel', 'David', 'Esther', 'Fabrice', 
      'Gracieuse', 'Hervé', 'Isabelle', 'Jean-Pierre', 'Karine', 'Léonard', 'Martine', 
      'Noël', 'Odette', 'Patrick', 'Rose', 'Samuel', 'Thérèse', 'Urbain', 'Valérie', 
      'William', 'Xavier', 'Yvonne', 'Zacharie', 'Anne', 'Benoît', 'Céline', 'Alain', 
      'Bernadette', 'Charles', 'Dominique', 'Emilie', 'Françoise', 'Gisèle', 'Henri', 
      'Inès', 'Jacques', 'Katherine', 'Louis', 'Madeleine', 'Nicolas', 'Odile', 
      'Philippe', 'Quentin', 'Rachel', 'Stéphane', 'Ursula', 'Victor', 'Wendy', 
      'Xénia', 'Yves', 'Zoé', 'Antoine', 'Béatrice', 'Christophe', 'Diane', 'Éric', 
      'Florence', 'Gérard', 'Hélène', 'Irène', 'Joël', 'Laurence', 'Michel', 
      'Nathalie', 'Olivier', 'Pascale', 'René', 'Sandrine', 'Thierry', 'Véronique'
    ];
    
    const noms = [
      'NIZIGIYIMANA', 'NDIKUMANA', 'NSABIMANA', 'NTAKIRUTIMANA', 'NDAYISABA', 
      'NIYONKURU', 'HAKIZIMANA', 'NIBITANGA', 'NDAYIZEYE', 'KARORERO', 
      'MANIRAKIZA', 'NIMUBONA', 'NISHIMWE', 'NTIRANDEKURA', 'NZAJIMANA',
      'BIGIRIMANA', 'BUCUMI', 'HABONIMANA', 'HATEGEKIMANA', 'IRAKOZE',
      'KABAYIZA', 'KAMANA', 'MANIRAKIZA', 'MPOZENZI', 'MUNYAKAZI',
      'NAHAYO', 'NDAYISENGA', 'NDIKUMANA', 'NIBISHAKA', 'NIMUBONA'
    ];
    
    const result: { id: string; nom: string }[] = [];
    const prefixId = prefix === 'AG' ? 'AG' : 'SA';
    
    for (let i = 1; i <= count; i++) {
      const prenomIndex = (i - 1) % prenoms.length;
      const nomIndex = (i - 1) % noms.length;
      const id = `${prefixId}-${String(100 + i).padStart(3, '0')}`;
      const nom = `${prenoms[prenomIndex]} ${noms[nomIndex]}`;
      result.push({ id, nom });
    }
    
    return result;
  }

  // ========== INITIALISATION ==========

  private initializeData(): void {
    if (this.agents.length > 0) return;

    const agentsData: any[] = [];

    // 100 Agents normaux
    const agentNames = this.generateAgentNames(100, 'AG', 'agent');
    for (let i = 0; i < agentNames.length; i++) {
      const a = agentNames[i];
      if (a) {
        const solde = 50000 + Math.floor(Math.random() * 450000);
        agentsData.push({
          id: a.id,
          nom: a.nom,
          role: 'agent' as const,
          email: `${a.nom.toLowerCase().replace(' ', '.')}@email.com`,
          telephone: `+257 79 ${String(100 + i).padStart(3, '0')} ${String(100 + i * 3).padStart(3, '0')}`,
          dateCreation: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
          solde: solde,
          transactions: 0
        });
      }
    }

    // 100 Super Agents
    const superAgentNames = this.generateAgentNames(100, 'SA', 'super_agent');
    for (let i = 0; i < superAgentNames.length; i++) {
      const a = superAgentNames[i];
      if (a) {
        const solde = 200000 + Math.floor(Math.random() * 800000);
        agentsData.push({
          id: a.id,
          nom: a.nom,
          role: 'super_agent' as const,
          email: `${a.nom.toLowerCase().replace(' ', '.')}@super.email.com`,
          telephone: `+257 79 ${String(200 + i).padStart(3, '0')} ${String(200 + i * 3).padStart(3, '0')}`,
          dateCreation: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
          solde: solde,
          transactions: 0
        });
      }
    }

    // État
    agentsData.push({
      id: 'ET-001',
      nom: 'Trésor Public - État',
      role: 'etat' as const,
      email: 'tresor@finance.gov.bi',
      telephone: '+257 22 123 456',
      dateCreation: '2024-01-01',
      solde: 0,
      transactions: 0
    });

    this.agents = agentsData.map((a: any) => ({
      ...a,
      commissionTotal: 0,
      volumeTotal: 0,
      statut: 'actif' as const
    }));

    this.generateCommissions();
    this.generateTransfertsInitiaux();
    this.saveData();
  }

  private generateCommissions(): void {
    const agents = this.agents.filter(a => a.role !== 'etat');
    const statuts: ('calculee' | 'payee' | 'en_attente')[] = ['calculee', 'payee', 'en_attente'];
    
    agents.forEach((agent) => {
      const nbCommissions = 2 + Math.floor(Math.random() * 4);
      let totalCommission = 0;
      let totalVolume = 0;
      
      for (let i = 0; i < nbCommissions; i++) {
        const nbTransactions = 3 + Math.floor(Math.random() * 30);
        const volume = 20000 + Math.floor(Math.random() * 500000);
        const taux = agent.role === 'super_agent' ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3;
        const montant = volume * (taux / 100);
        const commissionEtat = montant * 0.1;
        const statusIndex = i % statuts.length;
        
        const commission: Commission = {
          id: `COM-${String(100000 + this.commissions.length + 1).padStart(6, '0')}`,
          agentId: agent.id,
          agentNom: agent.nom,
          agentRole: agent.role,
          nbTransactions: nbTransactions,
          volume: volume,
          taux: Math.round(taux * 10) / 10,
          montant: Math.round(montant),
          statut: statuts[statusIndex] || 'en_attente',
          date: new Date(Date.now() - (i * 86400000 * 2)).toLocaleDateString('fr-FR'),
          commissionEtat: Math.round(commissionEtat)
        };
        
        this.commissions.push(commission);
        totalCommission += montant;
        totalVolume += volume;
      }
      
      const agentIndex = this.agents.findIndex(a => a.id === agent.id);
      if (agentIndex !== -1) {
        const agentToUpdate = this.agents[agentIndex];
        if (agentToUpdate) {
          agentToUpdate.commissionTotal = Math.round(totalCommission);
          agentToUpdate.volumeTotal = totalVolume;
          agentToUpdate.transactions = nbCommissions;
        }
      }
    });

    const etat = this.agents.find(a => a.role === 'etat');
    if (etat) {
      const totalEtat = this.commissions.reduce((sum, c) => sum + (c.commissionEtat || 0), 0);
      etat.solde = totalEtat;
      etat.volumeTotal = totalEtat;
      etat.transactions = this.commissions.filter(c => c.statut === 'payee').length;
    }

    this.generateHistorique();
  }

  private generateHistorique(): void {
    const agents = this.agents.filter(a => a.role !== 'etat');
    const statuts: HistoriqueCommission['statut'][] = ['effectue', 'effectue', 'en_attente', 'echoue'];
    
    agents.forEach(agent => {
      for (let i = 0; i < 2; i++) {
        const commission = this.commissions.find(c => c.agentId === agent.id);
        if (commission) {
          const statusIndex = i % statuts.length;
          this.historique.push({
            id: `HIS-${String(100000 + this.historique.length + 1).padStart(6, '0')}`,
            date: new Date(Date.now() - (i * 86400000 * 3)).toLocaleDateString('fr-FR'),
            agentId: agent.id,
            agentNom: agent.nom,
            agentRole: agent.role,
            montant: commission.montant * (0.5 + Math.random() * 0.5),
            type: agent.role === 'super_agent' ? 'commission_super' : 'commission_agent',
            reference: `REF-${String(100000 + this.historique.length + 1).padStart(6, '0')}`,
            statut: statuts[statusIndex] || 'effectue',
            description: `Commission ${agent.role === 'super_agent' ? 'Super ' : ''}${agent.nom}`
          });
        }
      }
    });
  }

  private generateTransfertsInitiaux(): void {
    for (let i = 0; i < 5; i++) {
      const montant = 30000 + Math.random() * 150000;
      this.transfertsEtat.push({
        id: `TRF-${String(100000 + i + 1).padStart(6, '0')}`,
        date: new Date(Date.now() - (i * 86400000 * 5)).toLocaleDateString('fr-FR'),
        montant: Math.round(montant),
        reference: `REF-ETAT-${String(100000 + i + 1).padStart(6, '0')}`,
        statut: i === 0 ? 'en_attente' : 'effectue',
        description: `Transfert des commissions État (${2 + i} commissions)`,
        source: 'Commissions payées',
        destination: 'compte_etat',
        commissionIds: [`COM-${String(100000 + i + 1).padStart(6, '0')}`]
      });
    }
  }

  // ========== DATA PERSISTENCE ==========

  private loadData(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.agents) this.agents = data.agents;
        if (data.commissions) this.commissions = data.commissions;
        if (data.historique) this.historique = data.historique;
        if (data.transferts) this.transfertsEtat = data.transferts;
      } catch (e) {
        console.error('Erreur de chargement des données', e);
      }
    }
  }

  private saveData(): void {
    const data = {
      agents: this.agents,
      commissions: this.commissions,
      historique: this.historique,
      transferts: this.transfertsEtat
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // ========== GETTERS ==========

  getAgents(): Agent[] {
    return this.agents.filter(a => a.role === 'agent');
  }

  getSuperAgents(): Agent[] {
    return this.agents.filter(a => a.role === 'super_agent');
  }

  getEtat(): Agent[] {
    return this.agents.filter(a => a.role === 'etat');
  }

  getCommissions(): Commission[] {
    return this.commissions;
  }

  getHistorique(): HistoriqueCommission[] {
    return this.historique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getTransfertsEtat(): TransfertEtat[] {
    return this.transfertsEtat.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // ========== PAGINATION ==========

  getCurrentPage(type: string): number {
    return this.currentPages[type] || 1;
  }

  getTotalPages(type: string): number {
    let items: any[] = [];
    switch(type) {
      case 'commissions': items = this.getCommissions(); break;
      case 'historique': items = this.getHistorique(); break;
      case 'transferts': items = this.getTransfertsEtat(); break;
      case 'agents': items = this.getAgents(); break;
      case 'super_agents': items = this.getSuperAgents(); break;
      default: return 1;
    }
    return Math.ceil(items.length / this.pageSize);
  }

  getPaginatedItems(type: string): any[] {
    const page = this.currentPages[type] || 1;
    const start = (page - 1) * this.pageSize;
    let items: any[] = [];
    switch(type) {
      case 'commissions': items = this.getCommissions(); break;
      case 'historique': items = this.getHistorique(); break;
      case 'transferts': items = this.getTransfertsEtat(); break;
      case 'agents': items = this.getAgents(); break;
      case 'super_agents': items = this.getSuperAgents(); break;
      default: return [];
    }
    return items.slice(start, start + this.pageSize);
  }

  nextPage(type: string): void {
    const total = this.getTotalPages(type);
    const current = this.currentPages[type] || 1;
    if (current < total) this.currentPages[type] = current + 1;
  }

  prevPage(type: string): void {
    const current = this.currentPages[type] || 1;
    if (current > 1) this.currentPages[type] = current - 1;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentPages[tab] = 1;
  }

  private updateCounts(): void {
    this.tabs = this.tabs.map(tab => {
      switch(tab.key) {
        case 'commissions': return { ...tab, count: this.commissions.length };
        case 'historique': return { ...tab, count: this.historique.length };
        case 'transferts': return { ...tab, count: this.transfertsEtat.length };
        case 'agents': return { ...tab, count: this.getAgents().length };
        case 'super_agents': return { ...tab, count: this.getSuperAgents().length };
        default: return tab;
      }
    });
  }

  // ========== KPI DATA ==========

  getKpiData(): KpiData[] {
    const totalCommissions = this.commissions.reduce((sum, c) => sum + c.montant, 0);
    const totalPayees = this.commissions.filter(c => c.statut === 'payee').length;
    const totalEnAttente = this.commissions.filter(c => c.statut === 'en_attente').length;
    const totalEtat = this.commissions.reduce((sum, c) => sum + (c.commissionEtat || 0), 0);
    const totalAgents = this.getAgents().length;
    const totalSuperAgents = this.getSuperAgents().length;
    const totalTransferts = this.transfertsEtat.reduce((sum, t) => sum + t.montant, 0);

    return [
      {
        icon: '💰',
        label: 'Total Com.',
        value: totalCommissions.toLocaleString('fr-FR') + ' BIF',
        color: '#1a1a2e',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: '+12%'
      },
      {
        icon: '✅',
        label: 'Payées',
        value: totalPayees.toString(),
        color: '#2e7d32',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalPayees}`
      },
      {
        icon: '⏳',
        label: 'Attente',
        value: totalEnAttente.toString(),
        color: '#e65100',
        textColor: '#ffffff',
        trend: 'down',
        trendValue: `${totalEnAttente}`
      },
      {
        icon: '🏛️',
        label: 'État',
        value: totalEtat.toLocaleString('fr-FR') + ' BIF',
        color: '#1a237e',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalTransferts.toLocaleString('fr-FR')}`
      },
      {
        icon: '👤',
        label: 'Agents',
        value: totalAgents.toString(),
        color: '#1a237e',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalAgents}`
      },
      {
        icon: '⭐',
        label: 'Super A.',
        value: totalSuperAgents.toString(),
        color: '#4a148c',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalSuperAgents}`
      }
    ];
  }

  // ========== PIN MODAL ==========

  openPinModal(): void {
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
      this.openTransfertEtat();
    } else {
      this.toast('Code PIN incorrect. Veuillez réessayer.', 'danger');
      this.pinCode = '';
    }
  }

  closePinModal(): void {
    this.showPinModal = false;
    this.pinCode = '';
  }

  // ========== TRANSFERT VERS L'ÉTAT ==========

  openTransfertEtat(): void {
    const commissionsPayees = this.commissions.filter(c => c.statut === 'payee' && c.commissionEtat && c.commissionEtat > 0);
    this.modalType = 'transfert_etat';
    this.modalTitle = '🏦 Transférer à l\'État';
    this.modalIcon = '🏦';
    this.formData = {
      commissions: commissionsPayees
    };
    this.modalOpen = true;
  }

  transfererVersEtat(): void {
    const commissionsToTransfer = this.commissions.filter(c => c.statut === 'payee' && c.commissionEtat && c.commissionEtat > 0);

    if (commissionsToTransfer.length === 0) {
      this.toast('Aucune commission à transférer à l\'État.', 'warning');
      return;
    }

    const totalMontant = commissionsToTransfer.reduce((sum, c) => sum + (c.commissionEtat || 0), 0);
    
    const transfert: TransfertEtat = {
      id: `TRF-${String(100000 + this.transfertsEtat.length + 1).padStart(6, '0')}`,
      date: new Date().toLocaleDateString('fr-FR'),
      montant: Math.round(totalMontant),
      reference: `REF-ETAT-${String(100000 + this.transfertsEtat.length + 1).padStart(6, '0')}`,
      statut: 'effectue',
      description: `Transfert des commissions État (${commissionsToTransfer.length} commissions)`,
      source: 'Commissions payées',
      destination: 'compte_etat',
      commissionIds: commissionsToTransfer.map(c => c.id)
    };

    this.transfertsEtat.push(transfert);

    const etat = this.agents.find(a => a.role === 'etat');
    if (etat) {
      etat.solde = (etat.solde || 0) + totalMontant;
    }

    this.historique.push({
      id: `HIS-${String(100000 + this.historique.length + 1).padStart(6, '0')}`,
      date: new Date().toLocaleDateString('fr-FR'),
      agentId: 'ET-001',
      agentNom: 'Trésor Public - État',
      agentRole: 'etat',
      montant: Math.round(totalMontant),
      type: 'transfert_etat',
      reference: transfert.reference,
      statut: 'effectue',
      description: `Transfert de ${Math.round(totalMontant).toLocaleString('fr-FR')} BIF vers le compte État`
    });

    this.saveData();
    this.updateCounts();
    this.toast(`Transfert de ${Math.round(totalMontant).toLocaleString('fr-FR')} BIF vers l'État effectué avec succès.`, 'success');
    this.closeModal();
  }

  // ========== MODALES ==========

  openVoirCommission(item: any): void {
    this.selectedItem = item;
    this.modalType = 'voir_commission';
    this.modalTitle = '👁️ Détails de la Commission';
    this.modalIcon = '👁️';
    this.modalOpen = true;
  }

  openPayerCommission(item: any): void {
    this.selectedItem = item;
    this.modalType = 'payer_commission';
    this.modalTitle = '💵 Payer la Commission';
    this.modalIcon = '💵';
    this.formData = { methode: 'wallet', reference: '', commentaire: '' };
    this.modalOpen = true;
  }

  openVoirHistorique(item: any): void {
    this.selectedItem = item;
    this.modalType = 'voir_historique';
    this.modalTitle = '📋 Détails de l\'Historique';
    this.modalIcon = '📋';
    this.modalOpen = true;
  }

  openVoirTransfert(item: any): void {
    this.selectedItem = item;
    this.modalType = 'voir_transfert';
    this.modalTitle = '🏦 Détails du Transfert';
    this.modalIcon = '🏦';
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedItem = null;
  }

  confirmModal(): void {
    switch(this.modalType) {
      case 'transfert_etat':
        this.transfererVersEtat();
        break;
      case 'payer_commission':
        this.payerCommission();
        break;
    }
    this.closeModal();
  }

  private payerCommission(): void {
    if (!this.selectedItem) return;
    this.selectedItem.statut = 'payee';
    
    this.historique.push({
      id: `HIS-${String(100000 + this.historique.length + 1).padStart(6, '0')}`,
      date: new Date().toLocaleDateString('fr-FR'),
      agentId: this.selectedItem.agentId,
      agentNom: this.selectedItem.agentNom,
      agentRole: this.selectedItem.agentRole,
      montant: this.selectedItem.montant,
      type: this.selectedItem.agentRole === 'super_agent' ? 'commission_super' : 'commission_agent',
      reference: this.formData.reference || `PAY-${String(100000 + this.historique.length + 1).padStart(6, '0')}`,
      statut: 'effectue',
      description: `Paiement commission ${this.selectedItem.agentNom}`
    });
    
    this.saveData();
    this.updateCounts();
    this.toast(`Commission payée à ${this.selectedItem.agentNom}`, 'success');
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

  // ========== MÉTHODES POUR LE TEMPLATE ==========

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      calculee: '✅ Calculée',
      payee: '💵 Payée',
      en_attente: '⏳ En attente',
      effectue: '✅ Effectué',
      echoue: '❌ Échoué',
      actif: '✅ Actif',
      inactif: '⛔ Inactif'
    };
    return labels[statut] || statut;
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      agent: '👤 Agent',
      super_agent: '⭐ Super Agent',
      etat: '🏛️ État'
    };
    return labels[role] || role;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      commission_agent: 'Commission Agent',
      commission_super: 'Commission Super Agent',
      commission_etat: 'Commission État',
      transfert_etat: 'Transfert État'
    };
    return labels[type] || type;
  }

  getMontantTotal(type: string): number {
    switch(type) {
      case 'agent': return this.getAgents().reduce((sum, a) => sum + a.commissionTotal, 0);
      case 'super': return this.getSuperAgents().reduce((sum, a) => sum + a.commissionTotal, 0);
      case 'etat': return this.commissions.reduce((sum, c) => sum + (c.commissionEtat || 0), 0);
      default: return 0;
    }
  }

  getNombreTransactions(type: string): number {
    switch(type) {
      case 'agent': return this.getAgents().reduce((sum, a) => sum + a.transactions, 0);
      case 'super': return this.getSuperAgents().reduce((sum, a) => sum + a.transactions, 0);
      case 'etat': return this.commissions.filter(c => c.statut === 'payee').length;
      default: return 0;
    }
  }

  getTransfertsCount(): number {
    return this.transfertsEtat.length;
  }

  getTotalTransfertsFormatted(): string {
    const total = this.transfertsEtat.reduce((sum, t) => sum + t.montant, 0);
    return total.toLocaleString('fr-FR');
  }

  getTotalCommissionsEtatFormatted(): string {
    const total = this.formData.commissions?.reduce((sum: number, c: any) => sum + (c.commissionEtat || 0), 0) || 0;
    return total.toLocaleString('fr-FR');
  }

  getNbCommissionsPayees(): number {
    return this.formData.commissions?.length || 0;
  }

  hasCommissionsPayees(): boolean {
    return this.formData.commissions && this.formData.commissions.length > 0;
  }

  getTransfertMontant(transfert: any): string {
    return transfert.montant.toLocaleString('fr-FR');
  }

  getCommissionEtatMontant(commission: any): string {
    return (commission.commissionEtat || 0).toLocaleString('fr-FR');
  }

  getAgentSolde(agent: any): string {
    return agent.solde.toLocaleString('fr-FR');
  }

  getAgentCommissionTotal(agent: any): string {
    return agent.commissionTotal.toLocaleString('fr-FR');
  }

  getAgentVolumeTotal(agent: any): string {
    return agent.volumeTotal.toLocaleString('fr-FR');
  }

  getCommissionMontant(commission: any): string {
    return commission.montant.toLocaleString('fr-FR');
  }

  getCommissionVolume(commission: any): string {
    return commission.volume.toLocaleString('fr-FR');
  }

  getHistoriqueMontant(historique: any): string {
    return historique.montant.toLocaleString('fr-FR');
  }

  getDetailInfo(detail: any, field: string): string {
    return detail[field] || 'N/A';
  }
}