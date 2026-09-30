import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type SuperAgentStatus = 'Actif' | 'Suspendu' | 'Bloqué';

interface SuperAgent {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  region: string;
  commune: string;
  users: number;
  transactions: number;
  commissions: number;
  status: SuperAgentStatus;
  createdAt: string;
}

@Component({
  selector: 'app-super-agents-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './super-agents-list.component.html',
  styleUrl: './super-agents-list.component.scss'
})
export class SuperAgentsListComponent {
  searchTerm = '';
  statusFilter = 'Tous';
  regionFilter = 'Toutes';
  communeFilter = 'Toutes';
  currentPage = 1;
  pageSize = 10;

  agents: SuperAgent[] = [
    { id: 1, firstName: 'Jean', lastName: 'Nkurunziza', phone: '+257 79 123 456', email: 'nkurunziza@gmail.com', region: 'Bujumbura', commune: 'Mukaza', users: 125, transactions: 1245, commissions: 1250000, status: 'Actif', createdAt: '12/08/2026 10:30' },
    { id: 2, firstName: 'Sylvie', lastName: 'Bizimana', phone: '+257 79 234 567', email: 'bizimana@gmail.com', region: 'Gitega', commune: 'Gitega', users: 98, transactions: 856, commissions: 856000, status: 'Actif', createdAt: '15/07/2026 14:20' },
    { id: 3, firstName: 'Alain', lastName: 'Ndayishimiye', phone: '+257 79 345 678', email: 'alain.nday@gmail.com', region: 'Ngozi', commune: 'Ngozi', users: 210, transactions: 2134, commissions: 2134000, status: 'Actif', createdAt: '10/06/2026 09:15' },
    { id: 4, firstName: 'Emile', lastName: 'Tuvisenge', phone: '+257 79 456 789', email: 'tuvisenge@gmail.com', region: 'Kayanza', commune: 'Kayanza', users: 67, transactions: 523, commissions: 523000, status: 'Suspendu', createdAt: '05/06/2026 16:40' },
    { id: 5, firstName: 'Chantal', lastName: 'Irakoze', phone: '+257 79 567 890', email: 'irakoze@gmail.com', region: 'Bubanza', commune: 'Bubanza', users: 142, transactions: 1456, commissions: 1456000, status: 'Actif', createdAt: '20/05/2026 11:25' },
    { id: 6, firstName: 'David', lastName: 'Muryango', phone: '+257 79 678 901', email: 'muryango@gmail.com', region: 'Muyinga', commune: 'Muyinga', users: 34, transactions: 210, commissions: 210000, status: 'Bloqué', createdAt: '12/05/2026 08:50' },
    { id: 7, firstName: 'Grace', lastName: 'Habonimana', phone: '+257 79 789 012', email: 'habonimana@gmail.com', region: 'Makamba', commune: 'Makamba', users: 89, transactions: 764, commissions: 764000, status: 'Actif', createdAt: '30/04/2026 13:10' },
    { id: 8, firstName: 'Pascal', lastName: 'Kimenyi', phone: '+257 79 890 123', email: 'kimenyi@gmail.com', region: 'Cibitoke', commune: 'Cibitoke', users: 56, transactions: 398, commissions: 398000, status: 'Actif', createdAt: '25/04/2026 15:35' },
    { id: 9, firstName: 'Josiane', lastName: 'Ntamavukiro', phone: '+257 79 901 234', email: 'ntamavukiro@gmail.com', region: 'Karusi', commune: 'Karusi', users: 73, transactions: 612, commissions: 612000, status: 'Suspendu', createdAt: '18/04/2026 10:05' },
    { id: 10, firstName: 'Eric', lastName: 'Dushimana', phone: '+257 79 012 345', email: 'dushimana@gmail.com', region: 'Cankuzo', commune: 'Cankuzo', users: 41, transactions: 289, commissions: 289000, status: 'Actif', createdAt: '10/04/2026 09:40' },
    { id: 11, firstName: 'Aline', lastName: 'Niyonkuru', phone: '+257 71 111 101', email: 'aline.n@gmail.com', region: 'Bujumbura', commune: 'Muha', users: 93, transactions: 721, commissions: 721000, status: 'Actif', createdAt: '07/04/2026 13:20' },
    { id: 12, firstName: 'Claude', lastName: 'Nkezabahizi', phone: '+257 71 111 102', email: 'claude.n@gmail.com', region: 'Gitega', commune: 'Bugendana', users: 61, transactions: 502, commissions: 502000, status: 'Actif', createdAt: '04/04/2026 11:15' }
  ];

  constructor(private router: Router) {}

  get regions(): string[] {
    return [...new Set(this.agents.map(agent => agent.region))].sort();
  }

  get communes(): string[] {
    const list = this.regionFilter === 'Toutes'
      ? this.agents
      : this.agents.filter(agent => agent.region === this.regionFilter);
    return [...new Set(list.map(agent => agent.commune))].sort();
  }

  get filteredAgents(): SuperAgent[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.agents.filter(agent => {
      const matchesSearch = !query || [agent.firstName, agent.lastName, agent.phone, agent.email, agent.region, agent.commune]
        .join(' ').toLowerCase().includes(query);
      const matchesStatus = this.statusFilter === 'Tous' || agent.status === this.statusFilter;
      const matchesRegion = this.regionFilter === 'Toutes' || agent.region === this.regionFilter;
      const matchesCommune = this.communeFilter === 'Toutes' || agent.commune === this.communeFilter;
      return matchesSearch && matchesStatus && matchesRegion && matchesCommune;
    });
  }

  get paginatedAgents(): SuperAgent[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAgents.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAgents.length / this.pageSize));
  }

  get totalAgents(): number { return this.agents.length; }
  get activeAgents(): number { return this.agents.filter(a => a.status === 'Actif').length; }
  get suspendedAgents(): number { return this.agents.filter(a => a.status === 'Suspendu').length; }
  get blockedAgents(): number { return this.agents.filter(a => a.status === 'Bloqué').length; }

  onFilterChange(): void {
    this.currentPage = 1;
    if (this.regionFilter !== 'Toutes' && !this.communes.includes(this.communeFilter)) {
      this.communeFilter = 'Toutes';
    }
  }

  createSuperAgent(): void {
    this.router.navigate(['/super-agents/nouveau']);
  }

  viewAgent(agent: SuperAgent): void {
    alert(`Super Agent : ${agent.firstName} ${agent.lastName}\nTéléphone : ${agent.phone}\nEmail : ${agent.email}\nZone : ${agent.region} / ${agent.commune}`);
  }

  editAgent(agent: SuperAgent): void {
    this.router.navigate(['/super-agents/nouveau'], { queryParams: { edit: agent.id } });
  }

  deleteAgent(agent: SuperAgent): void {
    const confirmed = confirm(`Supprimer ${agent.firstName} ${agent.lastName} de la liste des Super Agents ?`);
    if (!confirmed) return;
    this.agents = this.agents.filter(item => item.id !== agent.id);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  exportCsv(): void {
    const headers = ['Nom', 'Prénom', 'Téléphone', 'Email', 'Région', 'Commune', 'Utilisateurs', 'Transactions', 'Commissions', 'Statut', 'Date création'];
    const rows = this.filteredAgents.map(a => [a.lastName, a.firstName, a.phone, a.email, a.region, a.commune, a.users, a.transactions, a.commissions, a.status, a.createdAt]);
    const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'super-agents.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  initials(agent: SuperAgent): string {
    return `${agent.lastName.charAt(0)}${agent.firstName.charAt(0)}`.toUpperCase();
  }

  formatAmount(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value) + ' BIF';
  }

  trackByAgent(_: number, agent: SuperAgent): number { return agent.id; }
}
