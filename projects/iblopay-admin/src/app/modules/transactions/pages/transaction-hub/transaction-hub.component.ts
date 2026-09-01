import { Component, OnInit } from '@angular/core';
import { TransactionHubService } from '../../services/transaction-hub.service';
import { KpiData, KpiCard, QuickAction, TransactionTableRow, TransactionDetail, TraceabilityData, TopActor, OperationTypeStats, AlertNotification, SystemActivity } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-transaction-hub',
  templateUrl: './transaction-hub.component.html',
  styleUrls: ['./transaction-hub.component.scss']
})
export class TransactionHubComponent implements OnInit {
  kpiCards: KpiCard[] = [];
  quickActions: QuickAction[] = [];
  transactions: TransactionTableRow[] = [];
  totalTransactions = 0;
  currentPage = 1;
  selectedDetail: TransactionDetail | null = null;
  detailVisible = false;
  traceability: TraceabilityData | null = null;
  topActors: TopActor[] = [];
  operationTypes: OperationTypeStats[] = [];
  alerts: AlertNotification[] = [];
  systemActivities: SystemActivity[] = [];
  chartLabels: string[] = [];
  chartValues: number[] = [];

  isLoading = true;

  constructor(private hubService: TransactionHubService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.isLoading = true;

    this.hubService.getKpiData().subscribe(data => {
      this.kpiCards = Object.values(data);
    });

    this.hubService.getQuickActions().subscribe(actions => {
      this.quickActions = actions;
    });

    this.hubService.getTransactionsTable(1).subscribe(result => {
      this.transactions = result.items;
      this.totalTransactions = result.total;
    });

    this.hubService.getTraceability().subscribe(data => {
      this.traceability = data;
    });

    this.hubService.getTopActors('super-agents').subscribe(actors => {
      this.topActors = actors;
    });

    this.hubService.getOperationTypes().subscribe(types => {
      this.operationTypes = types;
    });

    this.hubService.getAlerts().subscribe(alerts => {
      this.alerts = alerts;
    });

    this.hubService.getSystemActivities().subscribe(activities => {
      this.systemActivities = activities;
    });

    this.hubService.getVolumeChartData('today').subscribe(chart => {
      this.chartLabels = chart.labels;
      this.chartValues = chart.values;
    });

    this.isLoading = false;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.hubService.getTransactionsTable(page).subscribe(result => {
      this.transactions = result.items;
    });
  }

  onRowClick(transactionNo: string): void {
    this.hubService.getTransactionDetail(transactionNo).subscribe(detail => {
      this.selectedDetail = detail;
      this.detailVisible = true;
    });
  }

  onReverseClick(transactionNo: string): void {
    // Placeholder for reverse transaction logic
    console.log('Reverse transaction:', transactionNo);
    // In production, this would call a service to reverse the transaction
  }

  closeDetail(): void {
    this.detailVisible = false;
    this.selectedDetail = null;
  }
}