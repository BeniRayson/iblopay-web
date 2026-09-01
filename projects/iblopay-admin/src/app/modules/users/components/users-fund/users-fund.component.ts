// src/app/modules/users/components/users-fund/users-fund.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string;
  role: 'CLIENT' | 'AGENT' | 'SUPER_AGENT';
  status: 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED';
  cardNumber: string;
  cniNumber: string;
  address: {
    zone: string;
    commune: string;
    province: string;
    fullAddress: string;
  };
  createdAt: Date;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accountNumber: string;
  walletBalance: number;
}

interface Transaction {
  id: string;
  type: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL' | 'FUND' | 'COMMISSION';
  amount: number;
  date: Date;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  from?: string;
  to?: string;
  reference?: string;
  commission?: number;
}

interface Commission {
  id: string;
  amount: number;
  date: Date;
  from: string;
  forTransaction: string;
  type: 'SEND' | 'RECEIVE';
  status: 'COMPLETED' | 'PENDING';
}

interface FundHistoryItem {
  id: string;
  amount: number;
  date: Date;
  reason: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  adminName: string;
}

@Component({
  selector: 'app-users-fund',
  templateUrl: './users-fund.component.html',
  styleUrls: ['./users-fund.component.scss']
})
export class UsersFundComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  isDarkMode = false;
  
  // Formulaire d'approvisionnement
  fundForm!: FormGroup;
  fundLoading = false;
  fundError = '';
  fundSuccess = '';
  
  // Données
  transactions: Transaction[] = [];
  commissions: Commission[] = [];
  fundHistory: FundHistoryItem[] = [];
  
  // Filtres
  transactionFilter = '';
  commissionFilter = '';

  // Statistiques
  totalTransactions = 0;
  totalCommissions = 0;
  totalFunds = 0;

  // Données simulées pour les transactions
  private clientNames: string[] = ['Alain Niyonzima', 'Claire Mukiza', 'Pierre Nkurunziza', 'Marie Uwimana', 'David Niyongabo'];
  private agentNames: string[] = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Niyonzima', 'Claire Mukiza'];
  private superAgentNames: string[] = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Niyonzima'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    } else {
      this.goBack();
    }
    this.loadTheme();
    this.initFundForm();
    this.loadMockData();
  }

  initFundForm(): void {
    this.fundForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(100)]],
      reason: ['', Validators.required],
      description: ['']
    });
  }

  loadTheme(): void {
    const saved = localStorage.getItem('iblopay-theme');
    if (saved === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
  }

  loadUser(id: string): void {
    this.isLoading = true;
    setTimeout(() => {
      this.user = this.getMockUser(id);
      this.isLoading = false;
    }, 500);
  }

  private getMockUser(id: string): User {
    return {
      id: id || 'user-0001',
      firstName: 'Jean',
      lastName: 'Ndayishimiye',
      email: 'jean.ndayishimiye@iblopay.bi',
      phone: '+257 61234567',
      photoUrl: '',
      role: 'AGENT',
      status: 'ACTIVE',
      cardNumber: 'CARD-2024-001',
      cniNumber: 'CNI-123456',
      address: {
        zone: 'Nyakabiga',
        commune: 'Mukaza',
        province: 'Bujumbura Mairie',
        fullAddress: 'Nyakabiga; Mukaza; Bujumbura Mairie'
      },
      createdAt: new Date(2024, 0, 15),
      createdBy: {
        id: 'super-001',
        firstName: 'Marie',
        lastName: 'Uwimana',
        role: 'SUPER_AGENT'
      },
      accountNumber: 'IBL-123456789',
      walletBalance: 150000
    };
  }

  loadMockData(): void {
    // Générer des transactions selon le rôle
    if (this.user?.role === 'CLIENT') {
      this.transactions = this.generateClientTransactions();
    } else if (this.user?.role === 'AGENT') {
      this.transactions = this.generateAgentTransactions();
      this.commissions = this.generateAgentCommissions();
    } else if (this.user?.role === 'SUPER_AGENT') {
      this.transactions = this.generateSuperAgentTransactions();
      this.commissions = this.generateSuperAgentCommissions();
    }

    // Historique d'approvisionnement commun à tous
    this.fundHistory = this.generateFundHistory();

    this.calculateStats();
  }

  private generateClientTransactions(): Transaction[] {
    return [
      {
        id: 'txn-001',
        type: 'DEPOSIT',
        amount: 50000,
        date: new Date(Date.now() - 1800000),
        description: 'Dépôt en espèces',
        status: 'COMPLETED',
        from: 'Jean Ndayishimiye',
        to: 'Wallet Client',
        reference: 'DEP-2024-001'
      },
      {
        id: 'txn-002',
        type: 'WITHDRAWAL',
        amount: 25000,
        date: new Date(Date.now() - 7200000),
        description: 'Retrait en espèces',
        status: 'COMPLETED',
        from: 'Wallet Client',
        to: 'Jean Ndayishimiye',
        reference: 'WTH-2024-001'
      },
      {
        id: 'txn-003',
        type: 'DEPOSIT',
        amount: 75000,
        date: new Date(Date.now() - 14400000),
        description: 'Dépôt virement bancaire',
        status: 'COMPLETED',
        from: 'Jean Ndayishimiye',
        to: 'Wallet Client',
        reference: 'DEP-2024-002'
      },
      {
        id: 'txn-004',
        type: 'WITHDRAWAL',
        amount: 30000,
        date: new Date(Date.now() - 36000000),
        description: 'Retrait ATM',
        status: 'COMPLETED',
        from: 'Wallet Client',
        to: 'Jean Ndayishimiye',
        reference: 'WTH-2024-002'
      },
      {
        id: 'txn-005',
        type: 'DEPOSIT',
        amount: 100000,
        date: new Date(Date.now() - 72000000),
        description: 'Dépôt chèque',
        status: 'PENDING',
        from: 'Jean Ndayishimiye',
        to: 'Wallet Client',
        reference: 'DEP-2024-003'
      }
    ];
  }

  private generateAgentTransactions(): Transaction[] {
    const transactions: Transaction[] = [];
    const types: ('TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL')[] = ['TRANSFER', 'DEPOSIT', 'WITHDRAWAL'];
    const statuses: ('COMPLETED' | 'PENDING')[] = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING'];
    const amounts: number[] = [25000, 50000, 30000, 75000, 40000, 60000, 20000];
    const descriptions: string[] = [
      'Transfert vers client',
      'Dépôt client',
      'Retrait client',
      'Transfert entre agents',
      'Dépôt en espèces',
      'Retrait ATM',
      'Transfert commission'
    ];

    for (let i = 1; i <= 12; i++) {
      const typeIndex = i % types.length;
      const statusIndex = i % statuses.length;
      const amountIndex = i % amounts.length;
      const descIndex = i % descriptions.length;
      const clientIndex = i % this.clientNames.length;
      
      const type = types[typeIndex] || 'TRANSFER';
      const status = statuses[statusIndex] || 'COMPLETED';
      const amount = amounts[amountIndex] || 25000;
      const from = i % 2 === 0 ? 'Jean Ndayishimiye' : this.clientNames[clientIndex] || 'Client';
      const to = i % 2 === 0 ? this.clientNames[clientIndex] || 'Client' : 'Jean Ndayishimiye';
      const commission = type === 'TRANSFER' ? Math.round(amount * 0.02) : Math.round(amount * 0.01);

      transactions.push({
        id: `txn-${String(i).padStart(3, '0')}`,
        type: type,
        amount: amount,
        date: new Date(Date.now() - (i * 3600000 * 2)),
        description: `${descriptions[descIndex] || 'Transaction'} ${this.clientNames[clientIndex] || 'Client'}`,
        status: status,
        from: from,
        to: to,
        reference: `${type === 'TRANSFER' ? 'TXN' : type === 'DEPOSIT' ? 'DEP' : 'WTH'}-2024-${String(i).padStart(3, '0')}`,
        commission: commission
      });
    }

    return transactions;
  }

  private generateAgentCommissions(): Commission[] {
    const commissions: Commission[] = [];
    const commissionAmounts: number[] = [500, 1000, 750, 1250, 600, 800, 950, 1100];

    for (let i = 1; i <= 8; i++) {
      const amountIndex = i % commissionAmounts.length;
      const clientIndex = i % this.clientNames.length;
      
      const amount = commissionAmounts[amountIndex] || 500;
      const from = this.clientNames[clientIndex] || 'Client';
      
      commissions.push({
        id: `com-${String(i).padStart(3, '0')}`,
        amount: amount,
        date: new Date(Date.now() - (i * 3600000 * 3)),
        from: from,
        forTransaction: `TXN-2024-${String(i).padStart(3, '0')}`,
        type: 'RECEIVE',
        status: i % 5 === 0 ? 'PENDING' : 'COMPLETED'
      });
    }

    return commissions;
  }

  private generateSuperAgentTransactions(): Transaction[] {
    const transactions: Transaction[] = [];
    const types: ('TRANSFER' | 'DEPOSIT')[] = ['TRANSFER', 'DEPOSIT'];
    const statuses: ('COMPLETED' | 'PENDING')[] = ['COMPLETED', 'COMPLETED', 'PENDING'];
    const amounts: number[] = [150000, 200000, 100000, 250000, 80000, 120000, 180000];

    for (let i = 1; i <= 10; i++) {
      const typeIndex = i % types.length;
      const statusIndex = i % statuses.length;
      const amountIndex = i % amounts.length;
      const agentIndex = i % this.agentNames.length;
      
      const type = types[typeIndex] || 'TRANSFER';
      const status = statuses[statusIndex] || 'COMPLETED';
      const amount = amounts[amountIndex] || 150000;
      const from = i % 2 === 0 ? 'Jean Ndayishimiye' : this.agentNames[agentIndex] || 'Agent';
      const to = i % 2 === 0 ? this.agentNames[agentIndex] || 'Agent' : 'Jean Ndayishimiye';
      const commission = Math.round(amount * 0.02);

      transactions.push({
        id: `txn-SA-${String(i).padStart(3, '0')}`,
        type: type,
        amount: amount,
        date: new Date(Date.now() - (i * 3600000 * 2.5)),
        description: `${type === 'TRANSFER' ? 'Transfert vers' : 'Dépôt de'} ${this.agentNames[agentIndex] || 'Agent'}`,
        status: status,
        from: from,
        to: to,
        reference: `${type === 'TRANSFER' ? 'TXN' : 'DEP'}-SA-2024-${String(i).padStart(3, '0')}`,
        commission: commission
      });
    }

    return transactions;
  }

  private generateSuperAgentCommissions(): Commission[] {
    const commissions: Commission[] = [];
    const commissionAmounts: number[] = [2000, 3000, 1500, 2500, 1800, 2200, 2800];

    for (let i = 1; i <= 7; i++) {
      const amountIndex = i % commissionAmounts.length;
      const agentIndex = i % this.agentNames.length;
      
      const amount = commissionAmounts[amountIndex] || 2000;
      const from = this.agentNames[agentIndex] || 'Agent';
      
      commissions.push({
        id: `com-SA-${String(i).padStart(3, '0')}`,
        amount: amount,
        date: new Date(Date.now() - (i * 3600000 * 3.5)),
        from: from,
        forTransaction: `TXN-SA-2024-${String(i).padStart(3, '0')}`,
        type: 'RECEIVE',
        status: i % 4 === 0 ? 'PENDING' : 'COMPLETED'
      });
    }

    return commissions;
  }

  private generateFundHistory(): FundHistoryItem[] {
    const reasons: string[] = ['Perte de fonds', 'Fuite de transaction', 'Erreur de rechargement', 'Ajustement commission'];
    const descriptions: string[] = [
      'Réapprovisionnement après perte de transaction',
      'Correction suite à une fuite de fonds',
      'Ajustement pour erreur de rechargement',
      'Réapprovisionnement commission'
    ];
    const amounts: number[] = [100000, 50000, 75000, 25000, 150000, 30000];

    const history: FundHistoryItem[] = [];

    for (let i = 1; i <= 6; i++) {
      const reasonIndex = i % reasons.length;
      const descIndex = i % descriptions.length;
      const amountIndex = i % amounts.length;
      
      history.push({
        id: `fund-${String(i).padStart(3, '0')}`,
        amount: amounts[amountIndex] || 50000,
        date: new Date(Date.now() - (i * 3600000 * 6)),
        reason: reasons[reasonIndex] || 'Autre',
        description: descriptions[descIndex] || 'Réapprovisionnement',
        status: i % 5 === 0 ? 'PENDING' : 'COMPLETED',
        adminName: 'Admin IBLOPAY'
      });
    }

    return history;
  }

  calculateStats(): void {
    this.totalTransactions = this.transactions.length;
    this.totalCommissions = this.commissions.reduce((sum, c) => sum + c.amount, 0);
    this.totalFunds = this.fundHistory.reduce((sum, f) => sum + f.amount, 0);
  }

  goBack(): void {
    this.location.back();
  }

  // ─── APPROVISIONNEMENT ────────────────────────────────────

  onSubmitFund(): void {
    if (this.fundForm.invalid) {
      this.fundForm.markAllAsTouched();
      return;
    }

    if (!this.user) return;

    this.fundLoading = true;
    this.fundError = '';
    this.fundSuccess = '';

    const formData = this.fundForm.value;
    const amount = Number(formData.amount);
    const reason = formData.reason;
    
    setTimeout(() => {
      const fundEntry: FundHistoryItem = {
        id: `fund-${Date.now()}`,
        amount: amount,
        date: new Date(),
        reason: reason,
        description: formData.description || '',
        status: 'COMPLETED',
        adminName: 'Admin IBLOPAY'
      };

      this.fundHistory.unshift(fundEntry);
      this.user!.walletBalance += amount;

      this.transactions.unshift({
        id: `txn-${Date.now()}`,
        type: 'FUND',
        amount: amount,
        date: new Date(),
        description: reason || 'Réapprovisionnement du wallet',
        status: 'COMPLETED',
        reference: `FUND-${Date.now()}`
      });

      this.calculateStats();

      this.fundLoading = false;
      this.fundSuccess = `✅ ${amount.toLocaleString()} Fbu crédités avec succès !`;
      
      this.fundForm.reset({
        amount: '',
        reason: '',
        description: ''
      });
      
      setTimeout(() => {
        this.fundSuccess = '';
      }, 3000);
    }, 1500);
  }

  // ─── FILTRES ──────────────────────────────────────────────

  get filteredTransactions(): Transaction[] {
    if (!this.transactionFilter) return this.transactions;
    const term = this.transactionFilter.toLowerCase();
    return this.transactions.filter(t => 
      t.description.toLowerCase().includes(term) ||
      t.reference?.toLowerCase().includes(term) ||
      t.from?.toLowerCase().includes(term) ||
      t.to?.toLowerCase().includes(term)
    );
  }

  get filteredCommissions(): Commission[] {
    if (!this.commissionFilter) return this.commissions;
    const term = this.commissionFilter.toLowerCase();
    return this.commissions.filter(c => 
      c.from.toLowerCase().includes(term) ||
      c.forTransaction.toLowerCase().includes(term)
    );
  }

  // ─── MÉTHODES POUR L'HISTORIQUE COMPLET ──────────────────

  get allTransactions(): Transaction[] {
    return this.transactions;
  }

  getDeposits(): Transaction[] {
    return this.transactions.filter(t => t.type === 'DEPOSIT');
  }

  getWithdrawals(): Transaction[] {
    return this.transactions.filter(t => t.type === 'WITHDRAWAL');
  }

  getTransfers(): Transaction[] {
    return this.transactions.filter(t => t.type === 'TRANSFER');
  }

  getTotalDeposits(): number {
    return this.getDeposits().reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalWithdrawals(): number {
    return this.getWithdrawals().reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalTransfers(): number {
    return this.getTransfers().reduce((sum, t) => sum + t.amount, 0);
  }

  // ─── MÉTHODES UTILITAIRES ─────────────────────────────────

  getFieldError(fieldName: string): string {
    const control = this.fundForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['min']) return 'Le montant minimum est de 100 Fbu';
    
    return 'Valeur invalide';
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  getAvatarColor(id: string): string {
    const colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length] || '#4f46e5';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ACTIVE': 'Actif',
      'SUSPENDED': 'Suspendu',
      'FROZEN': 'Gelé',
      'CLOSED': 'Fermé'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      'CLIENT': 'Client',
      'AGENT': 'Agent',
      'SUPER_AGENT': 'Super Agent'
    };
    return labels[role] || role;
  }

  getRoleClass(role: string): string {
    return `role-${role.toLowerCase().replace('_', '-')}`;
  }

  getTransactionTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'TRANSFER': 'Transfert',
      'DEPOSIT': 'Dépôt',
      'WITHDRAWAL': 'Retrait',
      'FUND': 'Approvisionnement',
      'COMMISSION': 'Commission'
    };
    return labels[type] || type;
  }

  getTransactionTypeClass(type: string): string {
    const classes: Record<string, string> = {
      'TRANSFER': 'type-transfer',
      'DEPOSIT': 'type-deposit',
      'WITHDRAWAL': 'type-withdrawal',
      'FUND': 'type-fund',
      'COMMISSION': 'type-commission'
    };
    return classes[type] || '';
  }

  getTransactionStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'COMPLETED': 'status-completed',
      'PENDING': 'status-pending',
      'FAILED': 'status-failed'
    };
    return classes[status] || '';
  }

  getTransactionStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'COMPLETED': '✅ Complété',
      'PENDING': '⏳ En attente',
      'FAILED': '❌ Échoué'
    };
    return labels[status] || status;
  }

  getCommissionStatusClass(status: string): string {
    return `commission-${status.toLowerCase()}`;
  }

  getCommissionStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'COMPLETED': '✅ Validée',
      'PENDING': '⏳ En attente'
    };
    return labels[status] || status;
  }

  getFundReasonLabel(reason: string): string {
    const labels: Record<string, string> = {
      'Perte de fonds': '💰 Perte de fonds',
      'Fuite de transaction': '🔒 Fuite de transaction',
      'Erreur de rechargement': '🔄 Erreur de rechargement',
      'Ajustement commission': '📊 Ajustement commission',
      'Autre': '📝 Autre'
    };
    return labels[reason] || reason;
  }

  getFundStatusClass(status: string): string {
    return `fund-${status.toLowerCase()}`;
  }

  getFundStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'COMPLETED': '✅ Complété',
      'PENDING': '⏳ En attente',
      'FAILED': '❌ Échoué'
    };
    return labels[status] || status;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('fr-FR') + ' Fbu';
  }

  // ─── ACTIONS ──────────────────────────────────────────────

  onFund(): void {
    // Déjà dans l'onglet approprié
  }
}