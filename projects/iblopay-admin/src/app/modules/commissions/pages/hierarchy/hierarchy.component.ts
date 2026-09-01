import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommissionMockService } from '../../services/commission-mock.service';
import { AgentHierarchy, ViewRole } from '../../models/commission.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
})
export class HierarchyComponent implements OnInit, OnDestroy {
  hierarchies: AgentHierarchy[] = [];
  isLoading = true;
  expandedSuperAgent: string | null = null;
  expandedAgent: string | null = null;
  activeView: ViewRole = 'admin';

  private destroy$ = new Subject<void>();

  constructor(private commissionService: CommissionMockService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onViewChange(view: ViewRole): void {
    this.activeView = view;
  }

  toggleSuperAgent(superAgentId: string): void {
    this.expandedSuperAgent = this.expandedSuperAgent === superAgentId ? null : superAgentId;
    this.expandedAgent = null;
  }

  toggleAgent(agentId: string): void {
    this.expandedAgent = this.expandedAgent === agentId ? null : agentId;
  }

  private loadData(): void {
    this.isLoading = true;
    this.commissionService
      .getAgentHierarchy()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.hierarchies = data;
        this.isLoading = false;
      });
  }

  formatBif(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} BIF`;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = { PENDING: 'En Attente', CREDITED: 'Crédité', FAILED: 'Échoué' };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `badge-${status.toLowerCase()}`;
  }
}