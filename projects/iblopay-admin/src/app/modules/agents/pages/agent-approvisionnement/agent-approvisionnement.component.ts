// src/app/modules/agents/pages/agent-approvisionnement/agent-approvisionnement.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

interface Bank {
  code: string;
  name: string;
}

interface FundData {
  receiptReference: string;
  amount: number;
  bank: string;
  branch: string;
  depositDate: string;
  trustAccountVerified: boolean;
  reinforcedVerification: boolean;
  adminNote: string;
}

type FundStatus = 'ACTIVE' | 'PENDING_APPROVAL' | 'REJECTED';

interface FundHistoryItem {
  id: string;
  receiptReference: string;
  amount: number;
  date: Date;
  agentName?: string;
  status: FundStatus;
  createdBy: string;
  validatedBy?: string;
  rejectionReason?: string;
  bank?: string;
  branch?: string;
  depositDate?: string;
}

type PendingActionType = 'CREATE' | 'APPROVE' | null;

interface SummaryCardData {
  transactionId: string;
  actionLabel: string;
  agentName: string;
  agentCode: string;
  receiptReference: string;
  amount: number;
  bank: string;
  branch: string;
  depositDate: string;
  performedBy: string;
  performedAt: Date;
  newBalance: number;
  status: FundStatus;
}

@Component({
  selector: 'app-agent-approvisionnement',
  templateUrl: './agent-approvisionnement.component.html',
  styleUrls: ['./agent-approvisionnement.component.scss']
})
export class AgentApprovisionnementComponent implements OnInit {
  agent: Agent | null = null;
  isLoading = true;
  isDarkMode = false;
  fundLoading = false;
  fundError = '';
  fundSuccess = '';
  fundHistory: FundHistoryItem[] = [];

  // --- Banques agréées au Burundi ---
  readonly banks: Bank[] = [
    { code: 'BANCOBU', name: 'Banque Commerciale du Burundi' },
    { code: 'BCB', name: 'Banque de Crédit de Bujumbura' },
    { code: 'BBCI', name: 'Banque Burundaise pour le Commerce et l\'Investissement' },
    { code: 'BGF', name: 'Banque de Gestion et de Financement' },
    { code: 'IBB', name: 'Interbank Burundi' },
    { code: 'FINBANK', name: 'FinBank' },
    { code: 'ECOBANK', name: 'Ecobank Burundi' },
    { code: 'DTB', name: 'Diamond Trust Bank Burundi' },
    { code: 'KCB', name: 'KCB Bank Burundi' },
    { code: 'CRDB', name: 'CRDB Bank Burundi' },
    { code: 'BCAB', name: 'Banque Communautaire et Agricole du Burundi' },
    { code: 'BIJE', name: 'Banque d\'Investissement pour les Jeunes' },
    { code: 'BHB', name: 'Banque de l\'Habitat du Burundi' },
    { code: 'BIDF', name: 'Banque d\'Investissement et de Développement pour les Femmes' },
    { code: 'BFB', name: 'Bedrock Financial Bank' }
  ];

  // --- Règles de contrôle ---
  readonly APPROVAL_THRESHOLD = 5_000_000;
  readonly RECEIPT_MAX_AGE_DAYS = 7;
  readonly MAX_PIN_ATTEMPTS = 3;
  readonly PIN_LOCK_DURATION_MS = 30_000;

  currentAdmin = 'Admin. J. Bizimana';
  private mockAdminPin = '1234';

  trustAccountBalance = 128_500_000;

  fundData: FundData = {
    receiptReference: '',
    amount: 0,
    bank: '',
    branch: '',
    depositDate: '',
    trustAccountVerified: false,
    reinforcedVerification: false,
    adminNote: ''
  };

  // Modale de rejet
  showRejectModal = false;
  rejectionTargetId: string | null = null;
  rejectionReason = '';

  // Modale PIN
  showPinModal = false;
  pinValue = '';
  pinError = '';
  pinAttempts = 0;
  pinLockedUntil: number | null = null;
  private pendingAction: PendingActionType = null;
  private pendingApproveItem: FundHistoryItem | null = null;

  // Carte récapitulative
  showSummaryModal = false;
  summaryData: SummaryCardData | null = null;

  // Écran de traitement
  showProcessingOverlay = false;
  processingLabel = '';

  private usedReferences = new Set<string>();
  private colorPalette: string[][] = [
    ['#4f46e5', '#7c3aed'],
    ['#ec4899', '#f43f5e'],
    ['#8b5cf6', '#6d28d9'],
    ['#3b82f6', '#2563eb'],
    ['#10b981', '#059669'],
    ['#f59e0b', '#d97706'],
    ['#ef4444', '#dc2626'],
    ['#14b8a6', '#0d9488']
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAgent(id);
    } else {
      this.router.navigate(['/agents']);
    }
    this.loadTheme();
    this.loadFundHistory();
    this.setDefaultDate();
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

  loadAgent(id: string): void {
    this.isLoading = true;
    this.agentService.getAgentById(id).subscribe({
      next: (data) => {
        this.agent = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/agents']);
      }
    });
  }

  loadFundHistory(): void {
    this.fundHistory = [
      {
        id: 'txn-1',
        receiptReference: 'DEP-2026-07-16-001',
        amount: 5000000,
        date: new Date(Date.now() - 3600000),
        agentName: 'Jean Mukiza',
        status: 'ACTIVE',
        createdBy: 'Admin. J. Bizimana',
        validatedBy: 'Superviseur A. Ndayishimiye'
      },
      {
        id: 'txn-2',
        receiptReference: 'DEP-2026-07-15-003',
        amount: 2500000,
        date: new Date(Date.now() - 7200000),
        agentName: 'Marie Uwimana',
        status: 'ACTIVE',
        createdBy: 'Admin. J. Bizimana'
      },
      {
        id: 'txn-3',
        receiptReference: 'DEP-2026-07-14-002',
        amount: 10000000,
        date: new Date(Date.now() - 86400000),
        agentName: 'Pierre Niyonzima',
        status: 'PENDING_APPROVAL',
        createdBy: 'Admin. J. Bizimana'
      }
    ];
    this.fundHistory.forEach(item => {
      if (item.status !== 'REJECTED') {
        this.usedReferences.add(this.normalizeReference(item.receiptReference));
      }
    });
  }

  setDefaultDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.fundData.depositDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getBankName(code: string): string {
    return this.banks.find(b => b.code === code)?.name || code;
  }

  getTotalElectronicsAmount(): number {
    if (!this.agent || !this.agent.electronics) return 0;
    return this.agent.electronics.reduce((total, e) => total + (e.amountInCirculation || 0), 0);
  }

  // --- Contrôles renforcés ---

  private normalizeReference(ref: string): string {
    return (ref || '').trim().toUpperCase();
  }

  isDuplicateReference(): boolean {
    if (!this.fundData.receiptReference) return false;
    return this.usedReferences.has(this.normalizeReference(this.fundData.receiptReference));
  }

  receiptAgeInDays(): number {
    if (!this.fundData.depositDate) return 0;
    const deposit = new Date(this.fundData.depositDate).getTime();
    return Math.floor((Date.now() - deposit) / (1000 * 60 * 60 * 24));
  }

  isReceiptExpired(): boolean {
    return this.receiptAgeInDays() > this.RECEIPT_MAX_AGE_DAYS;
  }

  requiresSecondApproval(): boolean {
    return this.fundData.amount > this.APPROVAL_THRESHOLD;
  }

  reconciliationGap(): number {
    return this.trustAccountBalance - this.getTotalElectronicsAmount();
  }

  onAmountChange(): void {
    this.fundError = '';
  }

  // --- Étape 1 : validations de formulaire, puis ouverture de la modale PIN ---

  submitFund(): void {
    if (!this.agent) {
      this.fundError = 'Aucun agent sélectionné';
      return;
    }
    if (!this.fundData.receiptReference) {
      this.fundError = 'La référence du bordereau est obligatoire';
      return;
    }
    if (!this.fundData.amount || this.fundData.amount <= 0) {
      this.fundError = 'Le montant doit être supérieur à 0';
      return;
    }
    if (!this.fundData.bank) {
      this.fundError = 'Veuillez sélectionner une banque';
      return;
    }
    if (!this.fundData.branch) {
      this.fundError = 'Veuillez saisir le nom de l\'agence';
      return;
    }
    if (!this.fundData.depositDate) {
      this.fundError = 'Veuillez saisir la date du dépôt';
      return;
    }
    if (!this.fundData.trustAccountVerified) {
      this.fundError = 'Vous devez confirmer la vérification sur le Trust Account';
      return;
    }
    if (this.isDuplicateReference()) {
      this.fundError = 'Cette référence de bordereau a déjà été utilisée pour un approvisionnement.';
      return;
    }
    if (this.isReceiptExpired() && !this.fundData.reinforcedVerification) {
      this.fundError = `Ce bordereau date de ${this.receiptAgeInDays()} jours (délai max: ${this.RECEIPT_MAX_AGE_DAYS} j). Cochez la vérification renforcée pour continuer.`;
      return;
    }

    this.fundError = '';
    this.pendingAction = 'CREATE';
    this.pendingApproveItem = null;
    this.openPinModal();
  }

  // --- Modale PIN ---

  openPinModal(): void {
    this.pinValue = '';
    this.pinError = '';
    this.showPinModal = true;
  }

  cancelPin(): void {
    this.showPinModal = false;
    this.pinValue = '';
    this.pinError = '';
    this.pendingAction = null;
    this.pendingApproveItem = null;
  }

  get isPinLocked(): boolean {
    return !!this.pinLockedUntil && Date.now() < this.pinLockedUntil;
  }

  pinLockSecondsRemaining(): number {
    if (!this.pinLockedUntil) return 0;
    return Math.max(0, Math.ceil((this.pinLockedUntil - Date.now()) / 1000));
  }

  confirmPin(): void {
    if (this.isPinLocked) {
      this.pinError = `Trop de tentatives. Réessayez dans ${this.pinLockSecondsRemaining()}s.`;
      return;
    }
    if (!this.pinValue || this.pinValue.length < 4) {
      this.pinError = 'Le code PIN doit contenir au moins 4 chiffres';
      return;
    }

    if (this.pinValue !== this.mockAdminPin) {
      this.pinAttempts++;
      if (this.pinAttempts >= this.MAX_PIN_ATTEMPTS) {
        this.pinLockedUntil = Date.now() + this.PIN_LOCK_DURATION_MS;
        this.pinError = `Code PIN incorrect. Compte verrouillé ${this.PIN_LOCK_DURATION_MS / 1000}s après ${this.MAX_PIN_ATTEMPTS} échecs.`;
      } else {
        this.pinError = `Code PIN incorrect (tentative ${this.pinAttempts}/${this.MAX_PIN_ATTEMPTS})`;
      }
      this.pinValue = '';
      return;
    }

    // ✅ PIN correct - Fermer la modale PIN
    this.pinAttempts = 0;
    this.pinLockedUntil = null;
    this.showPinModal = false;
    this.pinValue = '';

    const action = this.pendingAction;
    const approveItem = this.pendingApproveItem;
    this.pendingAction = null;
    this.pendingApproveItem = null;

    // Afficher l'écran de traitement
    this.showProcessingOverlay = true;
    this.processingLabel = action === 'APPROVE'
      ? 'Validation de l\'opération en cours...'
      : 'Enregistrement de l\'approvisionnement...';
    
    this.cdr.detectChanges();

    // Exécuter l'action après un petit délai pour que l'écran de traitement s'affiche
    setTimeout(() => {
      if (action === 'CREATE') {
        this.executeFunding();
      } else if (action === 'APPROVE' && approveItem) {
        this.executeApproval(approveItem);
      }
    }, 300);
  }

  // --- Étape 2 : exécution réelle après validation du PIN ---

  private executeFunding(): void {
    this.fundLoading = true;
    this.fundError = '';
    this.fundSuccess = '';
    const requiresApproval = this.requiresSecondApproval();

    // Traitement principal
    setTimeout(() => {
      const agent = this.agent;
      if (!agent) {
        this.fundLoading = false;
        this.fundError = 'Agent introuvable, opération annulée.';
        this.showProcessingOverlay = false;
        this.cdr.detectChanges();
        return;
      }

      const newItem: FundHistoryItem = {
        id: `txn-${Date.now()}`,
        receiptReference: this.fundData.receiptReference,
        amount: this.fundData.amount,
        date: new Date(),
        agentName: `${agent.firstName} ${agent.lastName}`,
        status: requiresApproval ? 'PENDING_APPROVAL' : 'ACTIVE',
        createdBy: this.currentAdmin,
        bank: this.fundData.bank,
        branch: this.fundData.branch,
        depositDate: this.fundData.depositDate
      };

      this.usedReferences.add(this.normalizeReference(this.fundData.receiptReference));
      this.fundHistory.unshift(newItem);

      if (!requiresApproval) {
        this.creditWallet(agent, this.fundData.amount);
        this.fundSuccess = `Approvisionnement de ${this.fundData.amount.toLocaleString()} Fbu effectué avec succès.`;
      } else {
        this.fundSuccess = `Montant supérieur au seuil de ${this.APPROVAL_THRESHOLD.toLocaleString()} Fbu : en attente de validation.`;
      }

      this.fundLoading = false;

      // 🔴 POINT CRITIQUE : Fermer l'écran de traitement et ouvrir la carte
      this.showProcessingOverlay = false;
      this.openSummaryCard(newItem, requiresApproval ? 'En attente de double validation' : 'Approvisionnement crédité');
      this.resetFundForm();
      this.cdr.detectChanges();
      
    }, 500); // Délai réduit pour un meilleur feedback
  }

  private creditWallet(agent: Agent, amount: number): void {
    if (!agent.electronics) {
      agent.electronics = [];
    }
    const existingElectronic = agent.electronics.find(e => e.status === 'ACTIVE');
    if (existingElectronic) {
      existingElectronic.amountInCirculation = (existingElectronic.amountInCirculation || 0) + amount;
    } else {
      agent.electronics.push({
        id: Date.now().toString(),
        amountInCirculation: amount,
        status: 'ACTIVE'
      } as any);
    }
  }

  // --- Double contrôle : validation ou rejet d'une opération en attente ---

  approvePending(item: FundHistoryItem): void {
    if (item.status !== 'PENDING_APPROVAL' || !this.agent) return;
    if (item.createdBy === this.currentAdmin) {
      this.fundError = 'Le second contrôle doit être réalisé par un administrateur différent de celui ayant saisi l\'opération.';
      return;
    }
    this.pendingAction = 'APPROVE';
    this.pendingApproveItem = item;
    this.openPinModal();
  }

  private executeApproval(item: FundHistoryItem): void {
    if (!this.agent) return;
    
    setTimeout(() => {
      if (!this.agent) {
        this.showProcessingOverlay = false;
        this.cdr.detectChanges();
        return;
      }
      
      item.status = 'ACTIVE';
      item.validatedBy = this.currentAdmin;
      this.creditWallet(this.agent, item.amount);
      this.fundSuccess = `Opération ${item.receiptReference} validée et créditée.`;

      // Fermer l'écran de traitement et ouvrir la carte
      this.showProcessingOverlay = false;
      this.openSummaryCard(item, 'Approbation confirmée — wallet crédité');
      this.cdr.detectChanges();

      this.cdr.detectChanges();
    }, 500);
  }

  openRejectModal(item: FundHistoryItem): void {
    this.rejectionTargetId = item.id;
    this.rejectionReason = '';
    this.showRejectModal = true;
  }

  confirmReject(): void {
    if (!this.rejectionReason.trim()) return;
    const item = this.fundHistory.find(h => h.id === this.rejectionTargetId);
    if (item) {
      item.status = 'REJECTED';
      item.rejectionReason = this.rejectionReason.trim();
      item.validatedBy = this.currentAdmin;
      this.usedReferences.delete(this.normalizeReference(item.receiptReference));
    }
    this.cancelReject();
  }

  cancelReject(): void {
    this.showRejectModal = false;
    this.rejectionTargetId = null;
    this.rejectionReason = '';
  }

  // --- Carte récapitulative (reçu) + impression ---

  private openSummaryCard(item: FundHistoryItem, actionLabel: string): void {
    if (!this.agent) {
      console.error('❌ Agent non trouvé pour la carte récapitulative');
      return;
    }
    
    console.log('📄 Ouverture de la carte récapitulative');
    
    this.summaryData = {
      transactionId: item.id,
      actionLabel,
      agentName: `${this.agent.firstName} ${this.agent.lastName}`,
      agentCode: this.agent.code,
      receiptReference: item.receiptReference,
      amount: item.amount,
      bank: this.getBankName(item.bank || this.fundData.bank),
      branch: item.branch || this.fundData.branch,
      depositDate: item.depositDate || this.fundData.depositDate,
      performedBy: item.validatedBy || item.createdBy,
      performedAt: new Date(),
      newBalance: this.getTotalElectronicsAmount(),
      status: item.status
    };
    
    this.showSummaryModal = true;
    this.cdr.detectChanges();
    
    console.log('✅ Carte affichée avec succès');
  }

  closeSummaryCard(): void {
    this.showSummaryModal = false;
    this.summaryData = null;
  }

  printSummaryCard(): void {
    window.print();
  }

  resetFundForm(): void {
    this.fundData = {
      receiptReference: '',
      amount: 0,
      bank: '',
      branch: '',
      depositDate: this.fundData.depositDate,
      trustAccountVerified: false,
      reinforcedVerification: false,
      adminNote: ''
    };
    this.fundError = '';
    this.fundSuccess = '';
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }

  getColor(id: string, index: number): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash % this.colorPalette.length);
    const colorPair = this.colorPalette[colorIndex];
    if (colorPair && colorPair.length > 0) {
      const selectedIndex = index % colorPair.length;
      return colorPair[selectedIndex] || '#4f46e5';
    }
    return index % 2 === 0 ? '#4f46e5' : '#7c3aed';
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ACTIVE': 'Actif',
      'PENDING': 'En attente',
      'SUSPENDED': 'Suspendu',
      'BLOCKED': 'Bloqué',
      'INACTIVE': 'Inactif'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'ACTIVE': 'active',
      'PENDING': 'pending',
      'SUSPENDED': 'suspended',
      'BLOCKED': 'blocked',
      'INACTIVE': 'inactive'
    };
    return classes[status] || '';
  }

  getFundStatusLabel(status: FundStatus): string {
    const labels: Record<FundStatus, string> = {
      'ACTIVE': 'Crédité',
      'PENDING_APPROVAL': 'En attente de validation',
      'REJECTED': 'Rejeté'
    };
    return labels[status];
  }

  getFundStatusClass(status: FundStatus): string {
    const classes: Record<FundStatus, string> = {
      'ACTIVE': 'fund-status-active',
      'PENDING_APPROVAL': 'fund-status-pending',
      'REJECTED': 'fund-status-rejected'
    };
    return classes[status];
  }
}