import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type UserRole = 'CLIENT' | 'AGENT' | 'SUPER_AGENT' | 'SHAREHOLDER';
type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED';
type TabName = 'profile' | 'transactions' | 'commissions' | 'fund';
type TransactionType = 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL' | 'FUND' | 'COMMISSION';
type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string;
  role: UserRole;
  status: UserStatus;
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
  } | null;
  accountNumber: string;
  walletBalance: number;
}

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  description: string;
  status: TransactionStatus;
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

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  user: User | null = null;
  isLoading = true;
  isDarkMode = false;

  activeTab: TabName = 'profile';

  isEditing = false;
  editForm!: FormGroup;
  editLoading = false;
  editError = '';
  editSuccess = '';

  fundForm!: FormGroup;
  fundLoading = false;
  fundError = '';
  fundSuccess = '';

  transactionFilter = '';
  commissionFilter = '';

  readonly pageSize = 10;
  transactionPage = 1;
  commissionPage = 1;

  transactions: Transaction[] = [];
  commissions: Commission[] = [];
  fundHistory: Transaction[] = [];

  provinces = [
    'Bujumbura Mairie',
    'Bujumbura Rural',
    'Gitega',
    'Ngozi',
    'Muyinga',
    'Kayanza',
    'Karuzi',
    'Kirundo',
    'Ruyigi',
    'Cankuzo',
    'Bururi',
    'Rumonge',
    'Makamba',
    'Rutana',
    'Muramvya',
    'Mwaro',
    'Bubanza',
    'Cibitoke'
  ];

  communes = [
    'Mukaza',
    'Ntahangwa',
    'Muha',
    'Isale',
    'Kabezi',
    'Mubimbi',
    'Mutimbuzi',
    'Nyabiraba',
    'Mukike',
    'Mutambu',
    'Muhuta',
    'Mugongomanga'
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initEditForm();
    this.initFundForm();
    this.loadTheme();
    this.loadMockData();

    const userId = this.route.snapshot.paramMap.get('id') || 'USR-2024-00125';
    this.loadUser(userId);
  }

  private initEditForm(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\+257\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/)
      ]],
      role: ['CLIENT', Validators.required],
      status: ['ACTIVE', Validators.required],
      cardNumber: [''],
      cniNumber: [''],
      province: [''],
      commune: [''],
      zone: ['']
    });
  }

  private initFundForm(): void {
    this.fundForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(100)]],
      reason: ['', Validators.required],
      description: ['']
    });
  }

  private loadUser(id: string): void {
    this.isLoading = true;

    setTimeout(() => {
      this.user = {
        id,
        firstName: 'Jean Claude',
        lastName: 'NDAYISHIMIYE',
        email: 'jeanclaude@gmail.com',
        phone: '+257 69 12 34 56',
        photoUrl: '',
        role: 'CLIENT',
        status: 'ACTIVE',
        cardNumber: '1234 5678 9012 3456',
        cniNumber: '012345678901234',
        address: {
          zone: 'Nyakabiga',
          commune: 'Mukaza',
          province: 'Bujumbura Mairie',
          fullAddress: 'Nyakabiga, Mukaza, Bujumbura Mairie'
        },
        createdAt: new Date(2024, 0, 12),
        createdBy: {
          id: 'SA-0001',
          firstName: 'Marie',
          lastName: 'KABURA',
          role: 'SUPER_AGENT'
        },
        accountNumber: 'IBLO-00125',
        walletBalance: 125000
      };

      this.populateForm();
      this.isLoading = false;
    }, 250);
  }

  private loadMockData(): void {
    this.transactions = [
      {
        id: 'TX-001',
        type: 'DEPOSIT',
        amount: 50000,
        date: new Date(2024, 0, 12, 14, 30),
        description: 'De MUTONI David',
        status: 'COMPLETED',
        from: 'MUTONI David',
        to: 'Jean Claude NDAYISHIMIYE',
        reference: 'DEP-2024-001',
        commission: 5000
      },
      {
        id: 'TX-002',
        type: 'TRANSFER',
        amount: 25000,
        date: new Date(2024, 0, 11, 10, 15),
        description: 'Vers KABURA Marie',
        status: 'COMPLETED',
        from: 'Jean Claude NDAYISHIMIYE',
        to: 'KABURA Marie',
        reference: 'TRF-2024-002',
        commission: 4250
      },
      {
        id: 'TX-003',
        type: 'FUND',
        amount: 100000,
        date: new Date(2024, 0, 10, 16, 45),
        description: 'Par SUPER AGENT',
        status: 'COMPLETED',
        from: 'SUPER AGENT',
        to: 'Jean Claude NDAYISHIMIYE',
        reference: 'FUND-2024-003',
        commission: 0
      },
      {
        id: 'TX-004',
        type: 'COMMISSION',
        amount: 1250,
        date: new Date(2024, 0, 9, 11, 20),
        description: 'Sur transfert',
        status: 'COMPLETED',
        reference: 'COM-2024-004',
        commission: 3250
      },
      {
        id: 'TX-005',
        type: 'TRANSFER',
        amount: 5000,
        date: new Date(2024, 0, 8, 9, 10),
        description: 'Airtime',
        status: 'FAILED',
        from: 'Jean Claude NDAYISHIMIYE',
        to: 'Airtime',
        reference: 'TRF-2024-005',
        commission: 0
      },
      {
        id: 'TX-006',
        type: 'WITHDRAWAL',
        amount: 15000,
        date: new Date(2024, 0, 7, 13, 5),
        description: 'Retrait agence',
        status: 'COMPLETED',
        from: 'Jean Claude NDAYISHIMIYE',
        reference: 'WDR-2024-006',
        commission: 0
      }
    ];

    this.commissions = [
      {
        id: 'COM-001',
        amount: 5000,
        date: new Date(2024, 0, 12, 14, 30),
        from: 'MUTONI David',
        forTransaction: 'DEP-2024-001',
        type: 'RECEIVE',
        status: 'COMPLETED'
      },
      {
        id: 'COM-002',
        amount: 4250,
        date: new Date(2024, 0, 11, 10, 15),
        from: 'KABURA Marie',
        forTransaction: 'TRF-2024-002',
        type: 'RECEIVE',
        status: 'COMPLETED'
      },
      {
        id: 'COM-003',
        amount: 3250,
        date: new Date(2024, 0, 9, 11, 20),
        from: 'IBLOPAY',
        forTransaction: 'COM-2024-004',
        type: 'RECEIVE',
        status: 'COMPLETED'
      }
    ];

    this.fundHistory = [
      {
        id: 'FUND-001',
        type: 'FUND',
        amount: 100000,
        date: new Date(2024, 0, 10, 16, 45),
        description: 'Approvisionnement par SUPER AGENT',
        status: 'COMPLETED',
        reference: 'FUND-2024-003',
        commission: 0
      },
      {
        id: 'FUND-002',
        type: 'FUND',
        amount: 50000,
        date: new Date(2024, 0, 5, 9, 25),
        description: 'Ajustement du portefeuille',
        status: 'COMPLETED',
        reference: 'FUND-2024-002'
      }
    ];
  }

  private populateForm(): void {
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

  setTab(tab: TabName): void {
    if (tab === 'commissions' && !this.canSeeCommissions) {
      this.activeTab = 'transactions';
      return;
    }

    if (tab === 'fund' && !this.canFundAccount) {
      this.activeTab = 'transactions';
      return;
    }

    this.activeTab = tab;

    if (tab === 'transactions') {
      this.transactionPage = 1;
    }

    if (tab === 'commissions') {
      this.commissionPage = 1;
    }
  }

  onFund(): void {
    if (!this.canFundAccount) return;

    this.setTab('fund');

    setTimeout(() => {
      document.querySelector('.fund-form-card')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('iblopay-theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
  }

  enableEditMode(): void {
    this.isEditing = true;
    this.editError = '';
    this.editSuccess = '';
    this.populateForm();
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

    if (!this.user) return;

    this.editLoading = true;
    this.editError = '';
    this.editSuccess = '';

    const value = this.editForm.getRawValue();

    setTimeout(() => {
      if (!this.user) return;

      this.user = {
        ...this.user,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone,
        role: value.role,
        status: value.status,
        cardNumber: value.cardNumber,
        cniNumber: value.cniNumber,
        address: {
          zone: value.zone,
          commune: value.commune,
          province: value.province,
          fullAddress: [value.zone, value.commune, value.province]
            .filter(Boolean)
            .join(', ')
        }
      };

      this.editLoading = false;
      this.editSuccess = 'Utilisateur modifié avec succès.';

      setTimeout(() => {
        this.isEditing = false;
        this.editSuccess = '';
      }, 1200);
    }, 650);
  }

  onSubmitFund(): void {
    if (!this.canFundAccount) return;

    if (this.fundForm.invalid) {
      this.fundForm.markAllAsTouched();
      return;
    }

    if (!this.user) return;

    this.fundLoading = true;
    this.fundError = '';
    this.fundSuccess = '';

    const value = this.fundForm.getRawValue();
    const amount = Number(value.amount);
    const now = new Date();

    setTimeout(() => {
      if (!this.user) return;

      const reference = `FUND-${Date.now()}`;

      const operation: Transaction = {
        id: reference,
        type: 'FUND',
        amount,
        date: now,
        description: value.description?.trim() || value.reason,
        status: 'COMPLETED',
        from: 'Administration IBLOPAY',
        to: `${this.user.firstName} ${this.user.lastName}`,
        reference
      };

      this.user.walletBalance += amount;
      this.transactions = [operation, ...this.transactions];
      this.fundHistory = [operation, ...this.fundHistory];

      this.fundLoading = false;
      this.fundSuccess = `${this.formatCurrency(amount)} crédités avec succès.`;

      this.fundForm.reset({
        amount: '',
        reason: '',
        description: ''
      });

      setTimeout(() => {
        this.fundSuccess = '';
      }, 2500);
    }, 650);
  }

  get isClient(): boolean {
    return this.user?.role === 'CLIENT';
  }

  get canSeeCommissions(): boolean {
    return !!this.user && (
      this.user.role === 'AGENT' ||
      this.user.role === 'SUPER_AGENT' ||
      this.user.role === 'SHAREHOLDER'
    );
  }

  get canFundAccount(): boolean {
    return !this.isClient;
  }

  get visibleTransactions(): Transaction[] {
    if (!this.isClient) {
      return this.transactions;
    }

    // Pour un client : uniquement les opérations simples.
    // Les commissions et les approvisionnements administratifs ne sont pas affichés.
    return this.transactions.filter(
      txn => txn.type !== 'COMMISSION' && txn.type !== 'FUND'
    );
  }

  get filteredTransactions(): Transaction[] {
    const term = this.transactionFilter.trim().toLowerCase();

    const source = this.visibleTransactions;

    if (!term) return source;

    return source.filter(txn =>
      txn.description.toLowerCase().includes(term) ||
      txn.reference?.toLowerCase().includes(term) ||
      txn.from?.toLowerCase().includes(term) ||
      txn.to?.toLowerCase().includes(term)
    );
  }

  get filteredCommissions(): Commission[] {
    const term = this.commissionFilter.trim().toLowerCase();

    if (!term) return this.commissions;

    return this.commissions.filter(commission =>
      commission.from.toLowerCase().includes(term) ||
      commission.forTransaction.toLowerCase().includes(term)
    );
  }

  get paginatedTransactions(): Transaction[] {
    this.ensureTransactionPage();
    const start = (this.transactionPage - 1) * this.pageSize;
    return this.filteredTransactions.slice(start, start + this.pageSize);
  }

  get transactionTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredTransactions.length / this.pageSize));
  }

  get transactionStartItem(): number {
    if (this.filteredTransactions.length === 0) return 0;
    return (this.transactionPage - 1) * this.pageSize + 1;
  }

  get transactionEndItem(): number {
    return Math.min(
      this.transactionPage * this.pageSize,
      this.filteredTransactions.length
    );
  }

  get paginatedCommissions(): Commission[] {
    this.ensureCommissionPage();
    const start = (this.commissionPage - 1) * this.pageSize;
    return this.filteredCommissions.slice(start, start + this.pageSize);
  }

  get commissionTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCommissions.length / this.pageSize));
  }

  get commissionStartItem(): number {
    if (this.filteredCommissions.length === 0) return 0;
    return (this.commissionPage - 1) * this.pageSize + 1;
  }

  get commissionEndItem(): number {
    return Math.min(
      this.commissionPage * this.pageSize,
      this.filteredCommissions.length
    );
  }

  onTransactionFilterChange(): void {
    this.transactionPage = 1;
  }

  onCommissionFilterChange(): void {
    this.commissionPage = 1;
  }

  previousTransactionPage(): void {
    if (this.transactionPage > 1) {
      this.transactionPage--;
    }
  }

  nextTransactionPage(): void {
    if (this.transactionPage < this.transactionTotalPages) {
      this.transactionPage++;
    }
  }

  previousCommissionPage(): void {
    if (this.commissionPage > 1) {
      this.commissionPage--;
    }
  }

  nextCommissionPage(): void {
    if (this.commissionPage < this.commissionTotalPages) {
      this.commissionPage++;
    }
  }

  private ensureTransactionPage(): void {
    if (this.transactionPage > this.transactionTotalPages) {
      this.transactionPage = this.transactionTotalPages;
    }
  }

  private ensureCommissionPage(): void {
    if (this.commissionPage > this.commissionTotalPages) {
      this.commissionPage = this.commissionTotalPages;
    }
  }

  getTransactionCommission(txn: Transaction): number {
    if (!this.canSeeCommissions || !txn.reference) {
      return 0;
    }

    const linked = this.commissions
      .filter(c => c.forTransaction === txn.reference)
      .reduce((sum, c) => sum + c.amount, 0);

    if (linked > 0) {
      return linked;
    }

    return txn.commission || 0;
  }

  hasTransactionCommission(txn: Transaction): boolean {
    return this.getTransactionCommission(txn) > 0;
  }

  get totalCommissions(): number {
    return this.commissions.reduce((total, item) => total + item.amount, 0);
  }

  printTransactions(): void {
    const rows = this.filteredTransactions.map(txn => `
      <tr>
        <td>${this.escapeHtml(this.getTransactionTitle(txn))}</td>
        <td>${this.escapeHtml(txn.description || '')}</td>
        <td>${this.escapeHtml((this.isIncoming(txn) ? '+' : '-') + ' ' + this.formatCurrency(txn.amount))}</td>
        <td>${this.escapeHtml(this.formatDate(txn.date))}</td>
        <td>${this.escapeHtml(this.getTransactionStatusLabel(txn.status))}</td>
      </tr>
    `).join('');

    this.openPrintWindow(
      'Liste des transactions',
      ['Type', 'Description', 'Montant', 'Date', 'Statut'],
      rows
    );
  }

  printCommissions(): void {
    if (!this.canSeeCommissions) return;

    const rows = this.filteredCommissions.map(commission => `
      <tr>
        <td>${this.escapeHtml(commission.from)}</td>
        <td>${this.escapeHtml(commission.forTransaction)}</td>
        <td>${this.escapeHtml(this.formatCurrency(commission.amount))}</td>
        <td>${this.escapeHtml(this.formatDate(commission.date))}</td>
        <td>${this.escapeHtml(this.getCommissionStatusLabel(commission.status))}</td>
      </tr>
    `).join('');

    this.openPrintWindow(
      'Liste des commissions',
      ['Origine', 'Transaction', 'Montant', 'Date', 'Statut'],
      rows
    );
  }

  private openPrintWindow(
    title: string,
    columns: string[],
    rows: string
  ): void {
    const printWindow = window.open('', '_blank', 'width=1000,height=700');

    if (!printWindow) {
      return;
    }

    const userName = this.user
      ? `${this.user.firstName} ${this.user.lastName}`
      : '';

    printWindow.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>${this.escapeHtml(title)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #172554;
              margin: 28px;
              font-size: 12px;
            }
            h1 {
              margin: 0 0 4px;
              font-size: 20px;
            }
            .meta {
              color: #64748b;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px 7px;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
              vertical-align: top;
            }
            th {
              background: #f1f5f9;
              font-size: 11px;
            }
            @media print {
              body { margin: 10mm; }
            }
          </style>
        </head>
        <body>
          <h1>${this.escapeHtml(title)}</h1>
          <div class="meta">
            ${this.escapeHtml(userName)}
            ${this.user ? ' • ' + this.escapeHtml(this.user.accountNumber) : ''}
            • ${this.escapeHtml(new Date().toLocaleString('fr-FR'))}
          </div>
          <table>
            <thead>
              <tr>${columns.map(column => `<th>${this.escapeHtml(column)}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="${columns.length}">Aucune donnée.</td></tr>`}
            </tbody>
          </table>
          <script>
            window.onload = function () {
              window.print();
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }

  private escapeHtml(value: string): string {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);

    if (!control || !control.touched || !control.errors) return '';

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['minlength']) return 'Minimum 2 caractères.';
    if (control.errors['email']) return 'Adresse email invalide.';
    if (control.errors['pattern']) return 'Format attendu : +257 69 12 34 56.';

    return 'Valeur invalide.';
  }

  getFundFieldError(fieldName: string): string {
    const control = this.fundForm.get(fieldName);

    if (!control || !control.touched || !control.errors) return '';

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['min']) return 'Le montant minimum est de 100 BIF.';

    return 'Valeur invalide.';
  }

  copyValue(value: string): void {
    if (!value) return;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => this.fallbackCopy(value));
      return;
    }

    this.fallbackCopy(value);
  }

  private fallbackCopy(value: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  getInitials(firstName: string, lastName: string): string {
    const first = firstName?.trim()?.charAt(0) || '';
    const last = lastName?.trim()?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  }

  getAvatarColor(id: string): string {
    const palette = [
      '#4f83e8',
      '#6f74e8',
      '#4f9dbb',
      '#5e92d9',
      '#6a79c7',
      '#4f96a8'
    ];

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    return palette[Math.abs(hash) % palette.length];
  }

  getStatusLabel(status: UserStatus | string): string {
    const labels: Record<string, string> = {
      ACTIVE: 'Actif',
      SUSPENDED: 'Suspendu',
      FROZEN: 'Gelé',
      CLOSED: 'Fermé'
    };

    return labels[status] || status;
  }

  getStatusClass(status: UserStatus | string): string {
    return `status-${status.toLowerCase()}`;
  }

  getRoleLabel(role: UserRole | string): string {
    const labels: Record<string, string> = {
      CLIENT: 'Client',
      AGENT: 'Agent',
      SUPER_AGENT: 'Super Agent',
      SHAREHOLDER: 'Actionnaire'
    };

    return labels[role] || role;
  }

  getRoleClass(role: UserRole | string): string {
    return `role-${role.toLowerCase().replace(/_/g, '-')}`;
  }

  getCreatorRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      CLIENT: 'Client',
      AGENT: 'Agent',
      SUPER_AGENT: 'Super Agent',
      SHAREHOLDER: 'Actionnaire',
      ADMIN: 'Administrateur'
    };

    return labels[role] || role;
  }

  getTransactionTitle(txn: Transaction): string {
    if (txn.type === 'DEPOSIT') return "Réception d'argent";
    if (txn.type === 'TRANSFER') return txn.status === 'FAILED' ? 'Achat marchand' : 'Transfert envoyé';
    if (txn.type === 'WITHDRAWAL') return 'Retrait';
    if (txn.type === 'FUND') return 'Approvisionnement';
    if (txn.type === 'COMMISSION') return 'Commission reçue';
    return 'Transaction';
  }

  getTransactionTypeClass(type: TransactionType): string {
    const classes: Record<TransactionType, string> = {
      TRANSFER: 'type-transfer',
      DEPOSIT: 'type-deposit',
      WITHDRAWAL: 'type-withdrawal',
      FUND: 'type-fund',
      COMMISSION: 'type-commission'
    };

    return classes[type];
  }

  isIncoming(txn: Transaction): boolean {
    return txn.type === 'DEPOSIT' ||
           txn.type === 'FUND' ||
           txn.type === 'COMMISSION';
  }

  getTransactionStatusClass(status: TransactionStatus): string {
    const classes: Record<TransactionStatus, string> = {
      COMPLETED: 'status-completed',
      PENDING: 'status-pending',
      FAILED: 'status-failed'
    };

    return classes[status];
  }

  getTransactionStatusLabel(status: TransactionStatus): string {
    const labels: Record<TransactionStatus, string> = {
      COMPLETED: 'Complété',
      PENDING: 'En attente',
      FAILED: 'Échoué'
    };

    return labels[status];
  }

  getCommissionStatusClass(status: Commission['status']): string {
    return `commission-${status.toLowerCase()}`;
  }

  getCommissionStatusLabel(status: Commission['status']): string {
    return status === 'COMPLETED' ? 'Validée' : 'En attente';
  }

  formatCurrency(amount: number): string {
    return `${new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0
    }).format(amount)} BIF`;
  }

  formatDateOnly(date: Date | string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  }

  formatTime(date: Date | string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  formatDate(date: Date | string): string {
    return `${this.formatDateOnly(date)} • ${this.formatTime(date)}`;
  }
}