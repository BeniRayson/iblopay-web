// src/app/modules/agents/pages/agent-detail/agent-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent, SubAgent, Deposit } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.scss']
})
export class AgentDetailComponent implements OnInit {
  agent: Agent | null = null;
  isLoading = true;
  isDarkMode = false;
  activeTab: 'profile' | 'mouvements' | 'depots' | 'commissions' = 'profile';
  selectedSubAgent: SubAgent | null = null;
  showTransactionsModal = false;

  // Variables pour les filtres
  movementSearchTerm: string = '';
  depositSearchTerm: string = '';
  commissionSearchTerm: string = '';

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

  // Cartes pour les agents
  private agentCards: Record<string, string> = {
    '2': 'CARTE-AG-2024-001',
    '3': 'CARTE-AG-2024-002',
    '4': 'CARTE-AG-2024-003',
    '5': 'CARTE-AG-2024-004',
    '6': 'CARTE-AG-2024-005',
    '7': 'CARTE-AG-2024-006',
    '8': 'CARTE-AG-2024-007',
    '9': 'CARTE-AG-2024-008',
    '10': 'CARTE-AG-2024-009',
    '11': 'CARTE-AG-2024-010',
    '12': 'CARTE-AG-2024-011',
    '13': 'CARTE-AG-2024-012',
    '14': 'CARTE-AG-2024-013',
    '15': 'CARTE-AG-2024-014',
    '16': 'CARTE-AG-2024-015',
    '17': 'CARTE-AG-2024-016',
    '18': 'CARTE-AG-2024-017',
    '19': 'CARTE-AG-2024-018',
    '20': 'CARTE-AG-2024-019',
    '21': 'CARTE-AG-2024-020',
    '22': 'CARTE-AG-2024-021',
    '23': 'CARTE-AG-2024-022',
    '24': 'CARTE-AG-2024-023',
    '25': 'CARTE-AG-2024-024',
    '26': 'CARTE-AG-2024-025',
    '27': 'CARTE-AG-2024-026',
    '28': 'CARTE-AG-2024-027',
    '29': 'CARTE-AG-2024-028',
    '30': 'CARTE-AG-2024-029',
    '31': 'CARTE-AG-2024-030'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadAgent(id);
    this.loadTheme();
  }

  loadTheme(): void {
    const saved = localStorage.getItem('iblopay-theme');
    if (saved === 'light') {
      this.isDarkMode = false;
      document.body.classList.add('light-mode');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode');
    localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
  }

  loadAgent(id: string): void {
    this.isLoading = true;
    this.agentService.getAgentById(id).subscribe({
      next: (data) => {
        this.agent = data;
        this.isLoading = false;
        console.log('Agents affiliés:', this.agent?.agents);
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/agents']);
      }
    });
  }

  // ================================================================
  // FILTRE POUR LES MOUVEMENTS
  // ================================================================
  get filteredAgentsForMovement(): SubAgent[] {
    if (!this.agent?.agents) return [];
    if (!this.movementSearchTerm.trim()) return this.agent.agents;
    const term = this.movementSearchTerm.toLowerCase().trim();
    return this.agent.agents.filter(sub => 
      sub.firstName.toLowerCase().includes(term) ||
      sub.lastName.toLowerCase().includes(term) ||
      sub.code.toLowerCase().includes(term) ||
      this.getAgentCardNumber(sub.id).toLowerCase().includes(term)
    );
  }

  onMovementSearch(event: any): void {
    this.movementSearchTerm = event.target.value;
  }

  clearMovementSearch(): void {
    this.movementSearchTerm = '';
    const input = document.querySelector('.search-filter input');
    if (input) {
      (input as HTMLInputElement).value = '';
      (input as HTMLInputElement).dispatchEvent(new Event('input'));
    }
  }

  // ================================================================
  // FILTRE POUR LES DÉPÔTS
  // ================================================================
  get filteredDeposits(): Deposit[] {
    if (!this.agent?.deposits) return [];
    if (!this.depositSearchTerm.trim()) return this.agent.deposits;
    const term = this.depositSearchTerm.toLowerCase().trim();
    return this.agent.deposits.filter(d => 
      d.agentName.toLowerCase().includes(term) ||
      d.reference.toLowerCase().includes(term) ||
      this.getDepositCardNumber(d.agentId).toLowerCase().includes(term)
    );
  }

  onDepositSearch(event: any): void {
    this.depositSearchTerm = event.target.value;
  }

  clearDepositSearch(): void {
    this.depositSearchTerm = '';
    const input = document.querySelector('.search-filter input');
    if (input) {
      (input as HTMLInputElement).value = '';
      (input as HTMLInputElement).dispatchEvent(new Event('input'));
    }
  }

  // ================================================================
  // FILTRE POUR LES COMMISSIONS
  // ================================================================
  get filteredAgentsForCommission(): SubAgent[] {
    if (!this.agent?.agents) return [];
    if (!this.commissionSearchTerm.trim()) return this.agent.agents;
    const term = this.commissionSearchTerm.toLowerCase().trim();
    return this.agent.agents.filter(sub => 
      sub.firstName.toLowerCase().includes(term) ||
      sub.lastName.toLowerCase().includes(term) ||
      sub.code.toLowerCase().includes(term) ||
      this.getAgentCardNumber(sub.id).toLowerCase().includes(term)
    );
  }

  onCommissionSearch(event: any): void {
    this.commissionSearchTerm = event.target.value;
  }

  clearCommissionSearch(): void {
    this.commissionSearchTerm = '';
    const input = document.querySelector('.search-filter input');
    if (input) {
      (input as HTMLInputElement).value = '';
      (input as HTMLInputElement).dispatchEvent(new Event('input'));
    }
  }

  // ================================================================
  // MÉTHODES UTILITAIRES
  // ================================================================
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

  getAgentCardNumber(agentId: string): string {
    return this.agentCards[agentId] || 'CARTE-NON-TROUVEE';
  }

  getTotalSentAmount(agentId: string): number {
    if (!this.agent) return 0;
    const subAgent = this.agent.agents?.find(a => a.id === agentId);
    if (!subAgent) return 0;
    return subAgent.transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
  }

  getCommissionReceived(agentId: string): number {
    if (!this.agent) return 0;
    const subAgent = this.agent.agents?.find(a => a.id === agentId);
    if (!subAgent) return 0;
    const total = subAgent.transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
    return Math.round(total * 0.02);
  }

  getInitialsAgent(name: string): string {
    if (!name) return '?';
    const parts = name.split(' ');
    return parts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2);
  }

  getDepositCardNumber(agentId: string): string {
    return this.agentCards[agentId] || 'CARTE-DEP-001';
  }

  getTotalCommissions(): number {
    if (!this.agent || !this.agent.agents) return 0;
    let total = 0;
    this.agent.agents.forEach(sub => {
      total += this.getCommissionReceived(sub.id);
    });
    return total;
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }

  setTab(tab: 'profile' | 'mouvements' | 'depots' | 'commissions'): void {
    this.activeTab = tab;
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

  getTransactionTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      'DEPOSIT': 'fa-arrow-down',
      'TRANSFER': 'fa-exchange-alt',
      'WITHDRAWAL': 'fa-arrow-up'
    };
    return icons[type] || 'fa-circle';
  }

  getTransactionTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'DEPOSIT': 'Dépôt',
      'TRANSFER': 'Transfert',
      'WITHDRAWAL': 'Retrait'
    };
    return labels[type] || type;
  }

  getTransactionTypeClass(type: string): string {
    const classes: Record<string, string> = {
      'DEPOSIT': 'deposit',
      'TRANSFER': 'transfer',
      'WITHDRAWAL': 'withdrawal'
    };
    return classes[type] || '';
  }

  getTransactionStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'COMPLETED': 'Complété',
      'FAILED': 'Échoué',
      'CANCELLED': 'Annulé'
    };
    return labels[status] || status;
  }

  getTransactionStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'PENDING': 'pending',
      'COMPLETED': 'completed',
      'FAILED': 'failed',
      'CANCELLED': 'cancelled'
    };
    return classes[status] || '';
  }

  getElectronicStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'ACTIVE': 'active',
      'INACTIVE': 'inactive',
      'MAINTENANCE': 'maintenance',
      'LOST': 'lost'
    };
    return classes[status] || '';
  }

  getElectronicStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ACTIVE': 'Actif',
      'INACTIVE': 'Inactif',
      'MAINTENANCE': 'En maintenance',
      'LOST': 'Perdu'
    };
    return labels[status] || status;
  }

  getElectronicTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'PHONE': 'Téléphone',
      'TABLET': 'Tablette',
      'POS_TERMINAL': 'Terminal POS',
      'OTHER': 'Autre'
    };
    return labels[type] || type;
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getDepositStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'COMPLETED': 'Complété',
      'FAILED': 'Échoué'
    };
    return labels[status] || status;
  }

  getDepositStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'PENDING': 'pending',
      'COMPLETED': 'completed',
      'FAILED': 'failed'
    };
    return classes[status] || '';
  }

  viewSubAgentTransactions(subAgent: SubAgent): void {
    this.selectedSubAgent = subAgent;
    this.showTransactionsModal = true;
  }

  closeTransactionsModal(): void {
    this.showTransactionsModal = false;
    this.selectedSubAgent = null;
  }
}