import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

interface Bank {
  code: string;
  name: string;
}

interface FundingForm {
  receiptReference: string;
  amount: number;
  bank: string;
  depositDate: string;
  note: string;
}

interface FundingReceipt {
  transactionId: string;
  agentName: string;
  agentCode: string;
  reference: string;
  bank: string;
  amount: number;
  date: Date;
  previousBalance: number;
  newBalance: number;
  createdBy: string;
}

@Component({
  selector: 'app-agent-approvisionnement',
  templateUrl: './agent-approvisionnement.component.html',
  styleUrls: ['./agent-approvisionnement.component.scss']
})
export class AgentApprovisionnementComponent implements OnInit {
  agent: Agent | null = null;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  currentStep = 1;
  showPinModal = false;
  showReceipt = false;
  pinValue = '';
  pinError = '';
  receipt: FundingReceipt | null = null;

  readonly demoPin = '1234';
  readonly currentAdmin = 'Admin Principal';

  readonly banks: Bank[] = [
    { code: 'BANCOBU', name: 'BANCOBU' },
    { code: 'BCB', name: 'Banque de Crédit de Bujumbura' },
    { code: 'BBCI', name: 'BBCI' },
    { code: 'IBB', name: 'Interbank Burundi' },
    { code: 'ECOBANK', name: 'Ecobank Burundi' },
    { code: 'CRDB', name: 'CRDB Bank Burundi' },
    { code: 'KCB', name: 'KCB Bank Burundi' },
    { code: 'DTB', name: 'Diamond Trust Bank Burundi' }
  ];

  form: FundingForm = {
    receiptReference: '',
    amount: 0,
    bank: '',
    depositDate: '',
    note: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.setDefaultDate();
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/agents']);
      return;
    }
    this.loadAgent(id);
  }

  private setDefaultDate(): void {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    this.form.depositDate = local.toISOString().slice(0, 16);
  }

  private loadAgent(id: string): void {
    this.isLoading = true;
    this.agentService.getAgentById(id).subscribe({
      next: (agent) => {
        this.agent = agent;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/agents']);
      }
    });
  }

  get currentBalance(): number {
    if (!this.agent?.electronics?.length) return 0;
    return this.agent.electronics.reduce((sum, item) => sum + (item.amountInCirculation || 0), 0);
  }

  get newBalance(): number {
    return this.currentBalance + (Number(this.form.amount) || 0);
  }

  get selectedBankName(): string {
    return this.banks.find(b => b.code === this.form.bank)?.name || this.form.bank;
  }

  getInitials(): string {
    if (!this.agent) return '';
    return `${this.agent.firstName?.charAt(0) || ''}${this.agent.lastName?.charAt(0) || ''}`.toUpperCase();
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }

  continueFunding(): void {
    this.errorMessage = '';
    if (!this.form.receiptReference.trim()) {
      this.errorMessage = 'Veuillez saisir le numéro de référence du bordereau.';
      return;
    }
    if (!this.form.amount || this.form.amount <= 0) {
      this.errorMessage = 'Veuillez saisir un montant valide.';
      return;
    }
    if (!this.form.bank) {
      this.errorMessage = 'Veuillez sélectionner la banque du bordereau.';
      return;
    }
    if (!this.form.depositDate) {
      this.errorMessage = 'Veuillez saisir la date du versement.';
      return;
    }

    this.currentStep = 3;
    this.pinValue = '';
    this.pinError = '';
    this.showPinModal = true;
  }

  closePin(): void {
    this.showPinModal = false;
    this.pinValue = '';
    this.pinError = '';
    this.currentStep = 2;
  }

  confirmPin(): void {
    this.pinError = '';
    if (this.pinValue.length < 4) {
      this.pinError = 'Veuillez saisir votre code PIN.';
      return;
    }
    if (this.pinValue !== this.demoPin) {
      this.pinError = 'Code PIN incorrect. Code de démonstration : 1234';
      return;
    }

    this.showPinModal = false;
    this.currentStep = 4;
    this.prepareReceipt();
    this.showReceipt = true;
  }

  private prepareReceipt(): void {
    if (!this.agent) return;
    this.receipt = {
      transactionId: `APV-${Date.now().toString().slice(-10)}`,
      agentName: `${this.agent.firstName} ${this.agent.lastName}`,
      agentCode: this.agent.code,
      reference: this.form.receiptReference.trim().toUpperCase(),
      bank: this.selectedBankName,
      amount: Number(this.form.amount),
      date: new Date(),
      previousBalance: this.currentBalance,
      newBalance: this.newBalance,
      createdBy: this.currentAdmin
    };
  }

  printReceipt(): void {
    window.print();
  }

  confirmFunding(): void {
    if (!this.agent || !this.receipt || this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    const electronics = [...(this.agent.electronics || [])];
    if (electronics.length > 0) {
      electronics[0] = {
        ...electronics[0],
        amountInCirculation: (electronics[0].amountInCirculation || 0) + this.receipt.amount
      };
    }

    const deposits = [
      ...(this.agent.deposits || []),
      {
        id: this.receipt.transactionId,
        agentId: this.agent.id,
        agentName: this.receipt.agentName,
        amount: this.receipt.amount,
        currency: 'BIF',
        date: new Date(),
        status: 'COMPLETED' as const,
        reference: this.receipt.reference
      }
    ];

    this.agentService.updateAgent(this.agent.id, { electronics, deposits }).subscribe({
      next: (updated) => {
        this.agent = updated;
        this.isSubmitting = false;
        this.successMessage = `Approvisionnement de ${this.receipt?.amount.toLocaleString('fr-FR')} BIF confirmé avec succès.`;
        this.showReceipt = false;
        setTimeout(() => this.router.navigate(['/agents']), 1100);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Impossible de confirmer l’approvisionnement.';
      }
    });
  }
}
