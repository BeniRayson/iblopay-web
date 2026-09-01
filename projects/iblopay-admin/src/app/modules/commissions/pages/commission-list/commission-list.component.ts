import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommissionMockService } from '../../services/commission-mock.service';
import { Commission, CommissionFilter, SortConfig, CommissionStatus, CommissionType, ViewRole } from '../../models/commission.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-commission-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.scss'],
})
export class CommissionListComponent implements OnInit, OnDestroy {
  commissions: Commission[] = [];
  total = 0;
  page = 1;
  pageSize = 15;
  isLoading = true;

  // Filters
  filter: CommissionFilter = {
    dateFrom: null,
    dateTo: null,
    agentId: null,
    superAgentId: null,
    status: null,
    commissionType: null,
    search: '',
  };

  // Sort
  sort: SortConfig = { column: 'createdAt', direction: 'desc' };

  // Dropdown options
  agents: { agentId: string; agentName: string }[] = [];
  superAgents: { superAgentId: string; superAgentName: string }[] = [];
  statuses: ({ value: CommissionStatus | null; label: string })[] = [
    { value: null, label: 'Tous' },
    { value: 'PENDING', label: 'En Attente' },
    { value: 'CREDITED', label: 'Crédité' },
    { value: 'FAILED', label: 'Échoué' },
  ];
  types: ({ value: CommissionType | null; label: string })[] = [
    { value: null, label: 'Tous' },
    { value: 'AGENT_COMMISSION', label: 'Commission Agent' },
    { value: 'SUPER_AGENT_COMMISSION', label: 'Commission Super Agent' },
  ];

  // Detail panel
  selectedCommission: Commission | null = null;
  detailVisible = false;

  activeView: ViewRole = 'admin';

  private destroy$ = new Subject<void>();

  constructor(private commissionService: CommissionMockService) {}

  ngOnInit(): void {
    this.loadDropdowns();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onViewChange(view: ViewRole): void {
    this.activeView = view;
    this.page = 1;
    this.loadData();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadData();
  }

  onSort(column: string): void {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.page = 1;
    this.loadData();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadData();
  }

  onSearch(): void {
    this.page = 1;
    this.loadData();
  }

  clearFilters(): void {
    this.filter = {
      dateFrom: null,
      dateTo: null,
      agentId: null,
      superAgentId: null,
      status: null,
      commissionType: null,
      search: '',
    };
    this.page = 1;
    this.loadData();
  }

  onRowClick(commission: Commission): void {
    this.selectedCommission = commission;
    this.detailVisible = true;
  }

  closeDetail(): void {
    this.detailVisible = false;
    this.selectedCommission = null;
  }

  private loadDropdowns(): void {
    this.commissionService.getAgents().subscribe(a => (this.agents = a));
    this.commissionService.getSuperAgents().subscribe(sa => (this.superAgents = sa));
  }

  private loadData(): void {
    this.isLoading = true;
    this.commissionService
      .getFilteredCommissions(this.filter, this.sort, this.page, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.commissions = result.items;
        this.total = result.total;
        this.isLoading = false;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }
    return range;
  }

  formatBif(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} BIF`;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  formatDateShort(dateStr: string | null): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = { PENDING: 'En Attente', CREDITED: 'Crédité', FAILED: 'Échoué' };
    return labels[status] || status;
  }

  typeLabel(type: string): string {
    const labels: Record<string, string> = { AGENT_COMMISSION: 'Agent', SUPER_AGENT_COMMISSION: 'Super Agent' };
    return labels[type] || type;
  }

  getStatusClass(status: string): string {
    return `badge-${status.toLowerCase()}`;
  }

  getSortIcon(column: string): string {
    if (this.sort.column !== column) return 'bi-arrow-down-up text-muted';
    return this.sort.direction === 'asc' ? 'bi-sort-up' : 'bi-sort-down';
  }
}