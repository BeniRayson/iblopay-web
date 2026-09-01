// src/app/modules/users/components/users-detail/users-detail.component.ts
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

// Interface pour les transactions
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

// Interface pour les commissions
interface Commission {
  id: string;
  amount: number;
  date: Date;
  from: string;
  forTransaction: string;
  type: 'SEND' | 'RECEIVE';
  status: 'COMPLETED' | 'PENDING';
}

const communes = ['Mukaza', 'Ntahangwa', 'Muha', 'Isale', 'Kabezi', 'Mubimbi', 'Mugongomanga', 
                   'Muhuta', 'Mukike', 'Mutambu', 'Mutimbuzi', 'Nyabiraba', 'Buyenzi', 'Kinindo'];

const zones = ['Nyakabiga', 'Kigobe', 'Rohero', 'Kanyosha', 'Ruziba', 'Kinama', 'Gihosha', 
               'Kiriri', 'Musaga', 'Ntare', 'Cibitoke', 'Ngagara', 'Gatoke', 'Vugizo',
               'Kwijabe', 'Gasenyi', 'Kavumu', 'Rukaramu', 'Taba', 'Bwiza', 'Gatete'];

const provinces = ['Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Gitega', 'Muramvya', 
                   'Ngozi', 'Muyinga', 'Ruyigi', 'Kirundo', 'Kayanza', 'Karuzi', 'Cankuzo'];

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  isDarkMode = false;
  
  // Onglet actif
  activeTab: 'profile' | 'transactions' | 'commissions' | 'fund' = 'profile';
  
  // Mode édition
  isEditing = false;
  editForm!: FormGroup;
  editLoading = false;
  editError = '';
  editSuccess = '';

  // Approvisionnement
  fundForm!: FormGroup;
  fundLoading = false;
  fundError = '';
  fundSuccess = '';
  fundAmount = 0;

  // Données
  transactions: Transaction[] = [];
  commissions: Commission[] = [];
  fundHistory: Transaction[] = [];

  // Filtres
  transactionFilter = '';
  commissionFilter = '';

  communes = communes;
  zones = zones;
  provinces = provinces;

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
    this.initEditForm();
    this.initFundForm();
    this.loadMockData();
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+257\s?[0-9]{8}$/)]],
      role: ['', Validators.required],
      status: ['', Validators.required],
      cardNumber: [''],
      cniNumber: [''],
      province: [''],
      commune: [''],
      zone: ['']
    });
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
      this.populateForm();
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
    // Transactions simulées
    this.transactions = [
      {
        id: 'txn-1',
        type: 'TRANSFER',
        amount: 25000,
        date: new Date(Date.now() - 1800000),
        description: 'Transfert vers Client A. Niyonzima',
        status: 'COMPLETED',
        from: 'Jean Ndayishimiye',
        to: 'Alain Niyonzima',
        reference: 'TXN-2024-001',
        commission: 500
      },
      {
        id: 'txn-2',
        type: 'DEPOSIT',
        amount: 50000,
        date: new Date(Date.now() - 7200000),
        description: 'Dépôt client C. Mukiza',
        status: 'COMPLETED',
        from: 'Claire Mukiza',
        to: 'Jean Ndayishimiye',
        reference: 'DEP-2024-002',
        commission: 1000
      },
      {
        id: 'txn-3',
        type: 'WITHDRAWAL',
        amount: 30000,
        date: new Date(Date.now() - 14400000),
        description: 'Retrait par P. Nkurunziza',
        status: 'COMPLETED',
        from: 'Jean Ndayishimiye',
        to: 'Pierre Nkurunziza',
        reference: 'WTH-2024-003',
        commission: 600
      },
      {
        id: 'txn-4',
        type: 'FUND',
        amount: 100000,
        date: new Date(Date.now() - 86400000),
        description: 'Réapprovisionnement après perte',
        status: 'COMPLETED',
        reference: 'FUND-2024-001',
        commission: 0
      }
    ];

    // Commissions simulées
    this.commissions = [
      {
        id: 'com-1',
        amount: 500,
        date: new Date(Date.now() - 1800000),
        from: 'Alain Niyonzima',
        forTransaction: 'TXN-2024-001',
        type: 'RECEIVE',
        status: 'COMPLETED'
      },
      {
        id: 'com-2',
        amount: 1000,
        date: new Date(Date.now() - 7200000),
        from: 'Claire Mukiza',
        forTransaction: 'DEP-2024-002',
        type: 'RECEIVE',
        status: 'COMPLETED'
      },
      {
        id: 'com-3',
        amount: 600,
        date: new Date(Date.now() - 14400000),
        from: 'Pierre Nkurunziza',
        forTransaction: 'WTH-2024-003',
        type: 'RECEIVE',
        status: 'COMPLETED'
      }
    ];

    // Historique d'approvisionnement
    this.fundHistory = [
      {
        id: 'fund-1',
        type: 'FUND',
        amount: 100000,
        date: new Date(Date.now() - 86400000),
        description: 'Réapprovisionnement après perte',
        status: 'COMPLETED',
        reference: 'FUND-2024-001'
      },
      {
        id: 'fund-2',
        type: 'FUND',
        amount: 50000,
        date: new Date(Date.now() - 172800000),
        description: 'Ajustement commission',
        status: 'COMPLETED',
        reference: 'FUND-2024-002'
      }
    ];
  }

  populateForm(): void {
    if (!this.user) return;
    this.editForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      role: this.user.role,
      status: this.user.status,
      cardNumber: this.user.cardNumber,
      cniNumber: this.user.cniNumber,
      province: this.user.address.province,
      commune: this.user.address.commune,
      zone: this.user.address.zone
    });
  }

  goBack(): void {
    this.location.back();
  }

  // ─── GESTION DES ONGLETS ──────────────────────────────────

  setTab(tab: 'profile' | 'transactions' | 'commissions' | 'fund'): void {
    this.activeTab = tab;
  }

  // ─── MODE ÉDITION ────────────────────────────────────────

  enableEditMode(): void {
    this.isEditing = true;
    this.editError = '';
    this.editSuccess = '';
    this.populateForm();
    setTimeout(() => {
      const formElement = document.querySelector('.edit-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editError = '';
    this.editSuccess = '';
    this.populateForm();
  }

  onSubmitEdit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.editLoading = true;
    this.editError = '';
    this.editSuccess = '';

    const formData = this.editForm.value;
    
    setTimeout(() => {
      if (this.user) {
        this.user.firstName = formData.firstName;
        this.user.lastName = formData.lastName;
        this.user.email = formData.email;
        this.user.phone = formData.phone;
        this.user.role = formData.role;
        this.user.status = formData.status;
        this.user.cardNumber = formData.cardNumber;
        this.user.cniNumber = formData.cniNumber;
        this.user.address.province = formData.province;
        this.user.address.commune = formData.commune;
        this.user.address.zone = formData.zone;
        this.user.address.fullAddress = `${formData.zone}; ${formData.commune}; ${formData.province}`;
      }

      this.editLoading = false;
      this.editSuccess = '✅ Utilisateur modifié avec succès !';
      
      setTimeout(() => {
        this.isEditing = false;
        this.editSuccess = '';
      }, 2000);
    }, 1500);
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
    
    setTimeout(() => {
      // Ajouter l'approvisionnement à l'historique
      const fundEntry: Transaction = {
        id: `fund-${Date.now()}`,
        type: 'FUND',
        amount: amount,
        date: new Date(),
        description: formData.reason || 'Réapprovisionnement',
        status: 'COMPLETED',
        reference: `FUND-${Date.now()}`,
        commission: 0
      };

      this.fundHistory.unshift(fundEntry);
      
      // Mettre à jour le solde
      this.user!.walletBalance += amount;

      // Ajouter une notification (simulée)
      this.transactions.unshift({
        id: `txn-${Date.now()}`,
        type: 'FUND',
        amount: amount,
        date: new Date(),
        description: formData.reason || 'Réapprovisionnement du wallet',
        status: 'COMPLETED',
        reference: `FUND-${Date.now()}`,
        commission: 0
      });

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

  get totalCommissions(): number {
    return this.commissions.reduce((sum, c) => sum + c.amount, 0);
  }

  // ─── MÉTHODES UTILITAIRES ─────────────────────────────────

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['minlength']) return 'Minimum 2 caractères';
    if (control.errors['email']) return 'Email invalide';
    if (control.errors['pattern']) return 'Format invalide';
    
    return 'Valeur invalide';
  }

  getFundFieldError(fieldName: string): string {
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

  getCreatorRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      'AGENT': 'Agent',
      'SUPER_AGENT': 'Super Agent'
    };
    return labels[role] || '';
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

  onEdit(): void {
    this.enableEditMode();
  }

  onFund(): void {
    this.setTab('fund');
    setTimeout(() => {
      const fundSection = document.querySelector('.fund-section');
      if (fundSection) {
        fundSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  onToggleStatus(): void {
    console.log('Changer statut de:', this.user?.id);
  }

  onDelete(): void {
    console.log('Supprimer l\'utilisateur:', this.user?.id);
  }
}