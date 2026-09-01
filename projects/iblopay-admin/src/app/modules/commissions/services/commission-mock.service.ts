import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Commission,
  CommissionFilter,
  SortConfig,
  PaginatedResult,
  LeaderboardEntry,
  AgentHierarchy,
  KpiCardData,
  ViewRole,
} from '../models/commission.model';
import {
  MOCK_COMMISSIONS,
  computeDashboardKpis,
  getCommissionTrendData,
  getCommissionTypeBreakdown,
  getCommissionStatusBreakdown,
  getAgentLeaderboard,
  getSuperAgentLeaderboard,
  getAgentHierarchy,
  MOCK_AGENTS,
  MOCK_SUPER_AGENTS,
} from '../data/commission-mock.data';

@Injectable({ providedIn: 'root' })
export class CommissionMockService {
  private readonly simDelay = 250;

  getAllCommissions(): Observable<Commission[]> {
    return of([...MOCK_COMMISSIONS]).pipe(delay(this.simDelay));
  }

  getCommissionById(id: string): Observable<Commission | undefined> {
    const commission = MOCK_COMMISSIONS.find(c => c.commissionId === id);
    return of(commission).pipe(delay(this.simDelay));
  }

  getFilteredCommissions(
    filter: CommissionFilter,
    sort: SortConfig,
    page: number,
    pageSize: number
  ): Observable<PaginatedResult<Commission>> {
    let filtered = [...MOCK_COMMISSIONS];

    // Apply filters
    if (filter.dateFrom) {
      const from = new Date(filter.dateFrom);
      filtered = filtered.filter(c => new Date(c.createdAt) >= from);
    }
    if (filter.dateTo) {
      const to = new Date(filter.dateTo);
      to.setHours(23, 59, 59, 999);
      filtered = filtered.filter(c => new Date(c.createdAt) <= to);
    }
    if (filter.agentId) {
      filtered = filtered.filter(c => c.agentId === filter.agentId);
    }
    if (filter.superAgentId) {
      filtered = filtered.filter(c => c.superAgentId === filter.superAgentId);
    }
    if (filter.status) {
      filtered = filtered.filter(c => c.status === filter.status);
    }
    if (filter.commissionType) {
      filtered = filtered.filter(c => c.commissionType === filter.commissionType);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.agentName.toLowerCase().includes(search) ||
          c.superAgentName.toLowerCase().includes(search) ||
          c.transactionReference.toLowerCase().includes(search) ||
          c.commissionId.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sort.column) {
        case 'createdAt':
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'rate':
          cmp = a.rate - b.rate;
          break;
        case 'agentName':
          cmp = a.agentName.localeCompare(b.agentName);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'commissionType':
          cmp = a.commissionType.localeCompare(b.commissionType);
          break;
        case 'creditedAt':
          if (!a.creditedAt && !b.creditedAt) cmp = 0;
          else if (!a.creditedAt) cmp = 1;
          else if (!b.creditedAt) cmp = -1;
          else cmp = new Date(a.creditedAt).getTime() - new Date(b.creditedAt).getTime();
          break;
        default:
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sort.direction === 'asc' ? cmp : -cmp;
    });

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({ items, total, page, pageSize }).pipe(delay(this.simDelay));
  }

  getDashboardKpis(viewRole: ViewRole): Observable<KpiCardData[]> {
    const kpis = computeDashboardKpis(MOCK_COMMISSIONS);
    let cards: KpiCardData[];

    const totalFormatted = this.formatBif(kpis.totalCommissions);
    const pendingFormatted = this.formatBif(kpis.totalPending);
    const creditedFormatted = this.formatBif(kpis.totalCredited);

    if (viewRole === 'agent') {
      // Agent sees only their own data (simulate with first agent)
      const agentId = 'AGT-001';
      const agentComms = MOCK_COMMISSIONS.filter(c => c.agentId === agentId);
      const agentKpis = computeDashboardKpis(agentComms);
      cards = [
        { label: 'Mes Commissions Totales', value: this.formatBif(agentKpis.totalCommissions), delta: '+12.5%', deltaType: 'increase', icon: 'bi-cash-stack', color: '#3b82f6' },
        { label: 'En Attente', value: this.formatBif(agentKpis.totalPending), delta: '3 transactions', deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
        { label: 'Créditées', value: this.formatBif(agentKpis.totalCredited), delta: '28 jours', deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
        { label: 'Taux Moyen', value: `${agentKpis.averageRate.toFixed(2)}%`, delta: '+0.15%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
      ];
    } else if (viewRole === 'super_agent') {
      // Super agent sees rolled-up data for their team
      const saId = 'SA-001';
      const teamComms = MOCK_COMMISSIONS.filter(c => c.superAgentId === saId);
      const teamKpis = computeDashboardKpis(teamComms);
      cards = [
        { label: "Commissions de l'Équipe", value: this.formatBif(teamKpis.totalCommissions), delta: '+18.3%', deltaType: 'increase', icon: 'bi-people', color: '#3b82f6' },
        { label: 'En Attente Équipe', value: this.formatBif(teamKpis.totalPending), delta: `${teamComms.filter(c => c.status === 'PENDING').length} transactions`, deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
        { label: 'Créditées Équipe', value: this.formatBif(teamKpis.totalCredited), delta: `${teamComms.filter(c => c.status === 'CREDITED').length} transactions`, deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
        { label: 'Taux Moyen Équipe', value: `${teamKpis.averageRate.toFixed(2)}%`, delta: '+0.22%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
      ];
    } else {
      // Admin sees everything
      const txCount = MOCK_COMMISSIONS.length;
      const creditedCount = MOCK_COMMISSIONS.filter(c => c.status === 'CREDITED').length;
      cards = [
        { label: 'Commissions Totales', value: totalFormatted, delta: '+15.8%', deltaType: 'increase', icon: 'bi-cash-stack', color: '#3b82f6' },
        { label: 'En Attente', value: pendingFormatted, delta: `${MOCK_COMMISSIONS.filter(c => c.status === 'PENDING').length} transactions`, deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
        { label: 'Créditées', value: creditedFormatted, delta: `${creditedCount}/${txCount} transactions`, deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
        { label: 'Taux Moyen', value: `${kpis.averageRate.toFixed(2)}%`, delta: '+0.18%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
        { label: 'Transactions', value: `${txCount}`, delta: '+23 vs période préc.', deltaType: 'increase', icon: 'bi-arrow-left-right', color: '#14b8a6' },
      ];
    }

    return of(cards).pipe(delay(this.simDelay));
  }

  getCommissionTrend(days: number): Observable<{ labels: string[]; agentValues: number[]; superAgentValues: number[] }> {
    const data = getCommissionTrendData(days);
    return of(data).pipe(delay(this.simDelay));
  }

  getTypeBreakdown(): Observable<{ type: string; amount: number; count: number }[]> {
    return of(getCommissionTypeBreakdown()).pipe(delay(this.simDelay));
  }

  getStatusBreakdown(): Observable<{ status: string; amount: number; count: number }[]> {
    return of(getCommissionStatusBreakdown()).pipe(delay(this.simDelay));
  }

  getAgentLeaderboard(): Observable<LeaderboardEntry[]> {
    const data = getAgentLeaderboard();
    return of(data.map((entry, index) => ({ ...entry, rank: index + 1 }))).pipe(delay(this.simDelay));
  }

  getSuperAgentLeaderboard(): Observable<LeaderboardEntry[]> {
    const data = getSuperAgentLeaderboard();
    return of(data.map((entry, index) => ({ ...entry, rank: index + 1 }))).pipe(delay(this.simDelay));
  }

  getAgentHierarchy(): Observable<AgentHierarchy[]> {
    return of(getAgentHierarchy()).pipe(delay(this.simDelay));
  }

  getAgents(): Observable<{ agentId: string; agentName: string }[]> {
    return of([...MOCK_AGENTS]).pipe(delay(this.simDelay));
  }

  getSuperAgents(): Observable<{ superAgentId: string; superAgentName: string }[]> {
    return of([...MOCK_SUPER_AGENTS]).pipe(delay(this.simDelay));
  }

  getChartData(days: number): Observable<{ labels: string[]; agentValues: number[]; superAgentValues: number[] }> {
    return this.getCommissionTrend(days);
  }

  private formatBif(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} BIF`;
  }
}