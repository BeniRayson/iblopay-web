import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommissionMockService } from '../../services/commission-mock.service';
import { LeaderboardEntry, ViewRole } from '../../models/commission.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  activeTab: 'agents' | 'super_agents' = 'agents';
  entries: LeaderboardEntry[] = [];
  isLoading = true;
  activeView: ViewRole = 'admin';
  readonly Math = Math;

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

  onTabChange(tab: 'agents' | 'super_agents'): void {
    this.activeTab = tab;
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    const obs = this.activeTab === 'agents'
      ? this.commissionService.getAgentLeaderboard()
      : this.commissionService.getSuperAgentLeaderboard();

    obs.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.entries = data;
      this.isLoading = false;
    });
  }

  formatBif(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} BIF`;
  }

  getTrendIcon(trend: string): string {
    if (trend === 'up') return 'bi-arrow-up-circle-fill';
    if (trend === 'down') return 'bi-arrow-down-circle-fill';
    return 'bi-dash-circle-fill';
  }

  getTrendColor(trend: string): string {
    if (trend === 'up') return '#22c55e';
    if (trend === 'down') return '#ef4444';
    return '#8896b3';
  }

  getRankClass(rank: number): string {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return '';
  }
}