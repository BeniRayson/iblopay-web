import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportDummyData } from '../../data/report-dummy.data';
import { ReportDefinition, KpiCard, ChartDataPoint } from '../../models/report.models';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type SortDir = 'asc' | 'desc';
type ReportDataType = 'financial' | 'commissions' | 'trust-account' | 'cash-management' | 'offline-pos' | 'compliance' | 'kyc-users';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('trendCanvas') trendCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('breakdownCanvas') breakdownCanvasRef!: ElementRef<HTMLCanvasElement>;

  Math = Math;
  reportDef: ReportDefinition | null = null;
  reportType: ReportDataType = 'financial';

  dateFrom: string = '';
  dateTo: string = '';
  selectedAgent: string = '';
  selectedType: string = '';
  selectedStatus: string = '';
  agentOptions: { id: string; name: string }[] = [];
  typeOptions: string[] = [];
  statusOptions: string[] = [];

  kpis: KpiCard[] = [];
  chartTrend: ChartDataPoint[] = [];
  chartBreakdown: ChartDataPoint[] = [];
  private trendChart: Chart | null = null;
  private breakdownChart: Chart | null = null;

  tableColumns: { key: string; label: string; sortable: boolean; format?: string }[] = [];
  allRows: any[] = [];
  filteredRows: any[] = [];
  sortColumn: string = '';
  sortDir: SortDir = 'desc';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  hoveredRowIndex: number | null = null;
  exporting: boolean = false;

  constructor(
    private dummy: ReportDummyData,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type') as ReportDataType;
      if (type) {
        this.reportType = type;
        this.loadReport();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawCharts(), 200);
  }

  private loadReport(): void {
    this.currentPage = 1;
    this.sortColumn = '';
    this.sortDir = 'desc';
    this.reportDef = this.dummy.reports.find(r => r.route === this.reportType) || null;
    this.agentOptions = this.dummy.getAgentOptions();

    switch (this.reportType) {
      case 'financial': this.loadFinancial(); break;
      case 'commissions': this.loadCommissions(); break;
      case 'trust-account': this.loadTrustAccount(); break;
      case 'cash-management': this.loadCashManagement(); break;
      case 'offline-pos': this.loadOffline(); break;
      case 'compliance': this.loadCompliance(); break;
      case 'kyc-users': this.loadKyc(); break;
    }
    setTimeout(() => this.drawCharts(), 200);
  }

  private loadFinancial(): void {
    this.kpis = this.dummy.getFinancialKpis();
    this.chartTrend = this.dummy.getFinancialChartTrend();
    this.chartBreakdown = this.dummy.getFinancialByType();
    this.typeOptions = ['TOUS', 'DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT_NFC', 'SWEEP', 'COMMISSION', 'REIMBURSEMENT'];
    this.statusOptions = ['TOUS', 'COMPLETED', 'PENDING', 'FAILED', 'REVERSED'];
    this.tableColumns = [
      { key: 'reference', label: 'Référence', sortable: true },
      { key: 'date', label: 'Date', sortable: true, format: 'date' },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'fromWallet', label: 'Wallet Source', sortable: true },
      { key: 'toWallet', label: 'Wallet Dest.', sortable: true },
      { key: 'amount', label: 'Montant', sortable: true, format: 'currency' },
      { key: 'fee', label: 'Frais', sortable: true, format: 'currency' },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
      { key: 'paymentMode', label: 'Mode', sortable: true },
    ];
    this.allRows = this.dummy.getFinancialTransactions();
    this.applyFilters();
  }

  private loadCommissions(): void {
    this.kpis = this.dummy.getCommissionKpis();
    this.chartTrend = this.dummy.getCommissionChart();
    this.chartBreakdown = this.dummy.getCommissionByAgent();
    this.typeOptions = ['TOUS', 'AGENT_COMMISSION', 'SUPER_AGENT_COMMISSION'];
    this.statusOptions = ['TOUS', 'CREDITED', 'PENDING', 'FAILED'];
    this.tableColumns = [
      { key: 'agentName', label: 'Agent', sortable: true },
      { key: 'agentId', label: 'ID Agent', sortable: true },
      { key: 'transactionRef', label: 'Transaction', sortable: true },
      { key: 'date', label: 'Date', sortable: true, format: 'date' },
      { key: 'amount', label: 'Commission', sortable: true, format: 'currency' },
      { key: 'rate', label: 'Taux', sortable: true, format: 'percent' },
      { key: 'commissionType', label: 'Type', sortable: true },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
    ];
    this.allRows = this.dummy.getCommissionRows();
    this.applyFilters();
  }

  private loadTrustAccount(): void {
    this.kpis = this.dummy.getTrustAccountKpis();
    this.chartTrend = this.dummy.getReconciliationChart();
    this.typeOptions = [];
    this.statusOptions = ['TOUS', 'OK', 'DISCREPANCY'];
    this.tableColumns = [
      { key: 'date', label: 'Date', sortable: true, format: 'date' },
      { key: 'totalEmoney', label: 'e-Money', sortable: true, format: 'currency' },
      { key: 'trustAccountBalance', label: 'Solde Bancaire', sortable: true, format: 'currency' },
      { key: 'difference', label: 'Écart', sortable: true, format: 'currency' },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
    ];
    this.allRows = this.dummy.getReconciliationRows();
    this.applyFilters();
  }

  private loadCashManagement(): void {
    this.kpis = this.dummy.getCashManagementKpis();
    this.chartTrend = this.dummy.getCashManagementChart();
    this.typeOptions = [];
    this.statusOptions = ['TOUS', 'VALIDATED', 'PENDING', 'REJECTED', 'ESCALATED'];
    this.tableColumns = [
      { key: 'agentName', label: 'Agent', sortable: true },
      { key: 'agentId', label: 'ID Agent', sortable: true },
      { key: 'date', label: 'Date', sortable: true, format: 'date' },
      { key: 'declaredAmount', label: 'Déclaré', sortable: true, format: 'currency' },
      { key: 'expectedAmount', label: 'Attendu', sortable: true, format: 'currency' },
      { key: 'difference', label: 'Écart', sortable: true, format: 'currency' },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
    ];
    this.allRows = this.dummy.getCashManagementRows();
    this.applyFilters();
  }

  private loadOffline(): void {
    this.kpis = this.dummy.getOfflineKpis();
    this.chartTrend = this.dummy.getOfflineChart();
    this.chartBreakdown = this.dummy.getOfflineByStatus();
    this.typeOptions = [];
    this.statusOptions = ['TOUS', 'COMPLETED', 'PROCESSING', 'FAILED', 'RECEIVED'];
    this.tableColumns = [
      { key: 'batchId', label: 'Lot', sortable: true },
      { key: 'posTerminalId', label: 'Terminal POS', sortable: true },
      { key: 'receivedAt', label: 'Reçu le', sortable: true, format: 'date' },
      { key: 'transactionCount', label: 'Nb Transactions', sortable: true },
      { key: 'totalAmount', label: 'Montant Total', sortable: true, format: 'currency' },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
    ];
    this.allRows = this.dummy.getOfflineRows();
    this.applyFilters();
  }

  private loadCompliance(): void {
    this.kpis = this.dummy.getComplianceKpis();
    this.chartTrend = this.dummy.getComplianceChart();
    this.chartBreakdown = this.dummy.getComplianceByAction();
    this.typeOptions = [];
    this.statusOptions = ['TOUS', 'LOGIN_FAILED', 'CARD_BLOCK', 'WALLET_UPDATE', 'EMISSION_CREATE', 'PIN_CHANGE', 'ROLE_CHANGE'];
    this.tableColumns = [
      { key: 'user', label: 'Utilisateur', sortable: true },
      { key: 'actionType', label: 'Action', sortable: true },
      { key: 'targetId', label: 'Cible', sortable: true },
      { key: 'details', label: 'Détails', sortable: true },
      { key: 'ipAddress', label: 'IP', sortable: true },
      { key: 'createdAt', label: 'Date', sortable: true, format: 'date' },
    ];
    this.allRows = this.dummy.getComplianceRows();
    this.applyFilters();
  }

  private loadKyc(): void {
    this.kpis = this.dummy.getKycKpis();
    this.chartTrend = this.dummy.getKycChart();
    this.chartBreakdown = this.dummy.getKycByRole();
    this.typeOptions = ['TOUS', 'Client', 'Agent', 'Super Agent', 'Admin'];
    this.statusOptions = ['TOUS', 'ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
    this.tableColumns = [
      { key: 'userId', label: 'ID', sortable: true },
      { key: 'name', label: 'Nom', sortable: true },
      { key: 'phone', label: 'Téléphone', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: 'Statut', sortable: true, format: 'status' },
      { key: 'role', label: 'Rôle', sortable: true },
      { key: 'registeredAt', label: 'Inscription', sortable: true, format: 'date' },
    ];
    this.allRows = this.dummy.getKycRows();
    this.applyFilters();
  }

  // ─── CHARTS ──────────────────────────────────────────

  private drawCharts(): void {
    this.destroyCharts();
    this.drawTrendChart();
    this.drawBreakdownChart();
  }

  private destroyCharts(): void {
    if (this.trendChart) { this.trendChart.destroy(); this.trendChart = null; }
    if (this.breakdownChart) { this.breakdownChart.destroy(); this.breakdownChart = null; }
  }

  private drawTrendChart(): void {
    if (!this.trendCanvasRef) return;
    const canvas = this.trendCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hasSecondary = this.chartTrend.length > 0 && this.chartTrend[0]?.secondary !== undefined;

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartTrend.map(d => d.label),
        datasets: [
          {
            label: 'Principal',
            data: this.chartTrend.map(d => d.value),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#3b82f6',
          },
          ...(hasSecondary ? [{
            label: 'Période préc.',
            data: this.chartTrend.map(d => d.secondary!),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#22c55e',
            borderDash: [5, 3],
          }] : []),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1b2559',
            titleColor: '#ffffff',
            bodyColor: '#a3b1cc',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: { color: '#64748b', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.04)' },
          },
          y: {
            ticks: {
              color: '#64748b',
              font: { size: 10 },
              callback: (v: any) => this.formatTrendValue(v),
            },
            grid: { color: 'rgba(255,255,255,0.04)' },
          },
        },
      },
    });
  }

  private drawBreakdownChart(): void {
    if (!this.breakdownCanvasRef || this.chartBreakdown.length === 0) return;
    const canvas = this.breakdownCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#a855f7', '#f97316', '#06b6d4', '#ec4899'];

    this.breakdownChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.chartBreakdown.map(d => d.label),
        datasets: [{
          data: this.chartBreakdown.map(d => d.value),
          backgroundColor: this.chartBreakdown.map((_, i) => colors[i % colors.length]),
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#a3b1cc',
              font: { size: 10 },
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: '#1b2559',
            titleColor: '#ffffff',
            bodyColor: '#a3b1cc',
          },
        },
      },
    });
  }

  // ─── FILTERS ─────────────────────────────────────────

  applyFilters(): void {
    this.currentPage = 1;
    let rows = [...this.allRows];

    if (this.dateFrom) {
      const from = new Date(this.dateFrom);
      rows = rows.filter(r => new Date(r.date || r.createdAt || r.registeredAt || r.receivedAt) >= from);
    }
    if (this.dateTo) {
      const to = new Date(this.dateTo);
      to.setHours(23, 59, 59);
      rows = rows.filter(r => new Date(r.date || r.createdAt || r.registeredAt || r.receivedAt) <= to);
    }

    if (this.selectedAgent && rows.length > 0 && 'agentId' in rows[0]) {
      rows = rows.filter((r: any) => r.agentId === this.selectedAgent);
    }

    if (this.selectedType && this.selectedType !== 'TOUS') {
      const key = this.reportType === 'kyc-users' ? 'role' : this.reportType === 'commissions' ? 'commissionType' : 'type';
      rows = rows.filter((r: any) => r[key] === this.selectedType);
    }

    if (this.selectedStatus && this.selectedStatus !== 'TOUS') {
      rows = rows.filter((r: any) => r.status === this.selectedStatus);
    }

    this.filteredRows = rows;
    this.totalPages = Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize));
    this.sortData();
  }

  resetFilters(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.selectedAgent = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  // ─── SORT ────────────────────────────────────────────

  setSort(col: string): void {
    if (this.sortColumn === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDir = 'desc';
    }
    this.sortData();
  }

  private sortData(): void {
    if (!this.sortColumn) return;
    this.filteredRows.sort((a: any, b: any) => {
      let va = a[this.sortColumn];
      let vb = b[this.sortColumn];
      if (va instanceof Date) va = va.getTime();
      if (vb instanceof Date) vb = vb.getTime();
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  getSortIcon(col: string): string {
    if (this.sortColumn !== col) return 'fa-solid fa-sort';
    return this.sortDir === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
  }

  // ─── PAGINATION ──────────────────────────────────────

  get pagedRows(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRows.slice(start, start + this.pageSize);
  }

  prevPage(): void { if (this.currentPage > 1) this.currentPage--; }

  nextPage(): void { if (this.currentPage < this.totalPages) this.currentPage++; }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // ─── EXPORT ──────────────────────────────────────────

  exportCSV(): void {
    this.exporting = true;
    setTimeout(() => {
      const headers = this.tableColumns.map(c => c.label).join(',');
      const data = this.filteredRows.map((r: any) =>
        this.tableColumns.map(c => {
          let v = r[c.key];
          if (v instanceof Date) v = v.toLocaleDateString('fr-FR');
          if (typeof v === 'number') v = v.toLocaleString('fr-FR');
          return `"${v}"`;
        }).join(',')
      ).join('\n');
      const csv = '\uFEFF' + headers + '\n' + data;
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.reportType}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      this.exporting = false;
    }, 500);
  }

  exportPDF(): void {
    this.exporting = true;
    setTimeout(() => { window.print(); this.exporting = false; }, 300);
  }

  // ─── FORMATTERS ──────────────────────────────────────

  formatCurrency(v: number): string {
    return v.toLocaleString('fr-FR') + ' BIF';
  }

  formatDate(v: Date): string {
    return new Date(v).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'COMPLETED': 'status-success', 'CREDITED': 'status-success', 'VALIDATED': 'status-success',
      'OK': 'status-success', 'ACTIVE': 'status-success',
      'PENDING': 'status-warning', 'PROCESSING': 'status-warning',
      'FAILED': 'status-danger', 'REJECTED': 'status-danger', 'DISCREPANCY': 'status-danger',
      'ESCALATED': 'status-danger', 'SUSPENDED': 'status-danger', 'FROZEN': 'status-danger',
      'CLOSED': 'status-muted', 'REVERSED': 'status-muted',
    };
    return map[status] || 'status-default';
  }

  formatTrendValue(v: number): string {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M';
    if (v >= 1000) return (v / 1000).toFixed(1) + 'K';
    return v.toString();
  }

  goBack(): void {
    this.router.navigate(['/reports']);
  }
}