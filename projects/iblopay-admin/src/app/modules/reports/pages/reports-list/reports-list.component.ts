import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportDummyData } from '../../data/report-dummy.data';
import { ReportDefinition, ReportCategory } from '../../models/report.models';

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  reports: ReportDefinition[] = [];
  filteredReports: ReportDefinition[] = [];
  currentRole: 'admin' | 'agent' | 'super_agent' = 'admin';
  categoryLabels: Record<string, string> = {};
  categoryColors: Record<string, string> = {};

  // Fixed display order for categories
  readonly categoryOrder: ReportCategory[] = [
    'financial',
    'commissions',
    'trust_account',
    'cash_management',
    'offline_pos',
    'compliance_audit',
    'kyc_users',
  ];

  constructor(
    private dummy: ReportDummyData,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reports = this.dummy.reports;
    this.categoryLabels = this.dummy.categoryLabels;
    this.categoryColors = this.dummy.categoryColors;
    this.applyRoleFilter();
  }

  setRole(role: 'admin' | 'agent' | 'super_agent'): void {
    this.currentRole = role;
    this.applyRoleFilter();
  }

  private applyRoleFilter(): void {
    this.filteredReports = this.reports.filter(r => r.roles.includes(this.currentRole));
  }

  getCategoryKeys(): ReportCategory[] {
    const available = new Set(this.filteredReports.map(r => r.category));
    return this.categoryOrder.filter(c => available.has(c));
  }

  getReportsByCategory(catKey: ReportCategory): ReportDefinition[] {
    return this.filteredReports.filter(r => r.category === catKey);
  }

  openReport(route: string): void {
    this.router.navigate(['/reports', route]);
  }
}