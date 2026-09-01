import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { TransactionSummary } from '../../models/transaction-summary.model';

const DEFAULT_PAGE_SIZE = 20;

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  summary: TransactionSummary | null = null;
  total = 0;

  isLoading = true;
  isLoadingSummary = true;
  errorMessage = '';

  filter: TransactionFilter = { page: 1, pageSize: DEFAULT_PAGE_SIZE };

  constructor(private transactionService: TransactionService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadSummary();
  }

  // ============================================
  // summaryStats - Pour les cartes de stats compactes
  // ============================================
  get summaryStats() {
    if (!this.summary) {
      return [
        { label: 'Total', value: 0, icon: 'fas fa-arrow-right-arrow-left', color: '#4f46e5' },
        { label: 'En attente', value: 0, icon: 'fas fa-clock', color: '#f59e0b' },
        { label: 'Réussies', value: 0, icon: 'fas fa-check-circle', color: '#10b981' },
        { label: 'Échouées', value: 0, icon: 'fas fa-times-circle', color: '#ef4444' }
      ];
    }

    // 👇 Utilise 'as any' pour accéder aux propriétés
    const s = this.summary as any;

    return [
      { 
        label: 'Total', 
        value: s.totalTransactions || s.total || 0, 
        icon: 'fas fa-arrow-right-arrow-left', 
        color: '#4f46e5' 
      },
      { 
        label: 'En attente', 
        value: s.pendingTransactions || s.pending || 0, 
        icon: 'fas fa-clock', 
        color: '#f59e0b' 
      },
      { 
        label: 'Réussies', 
        value: s.successfulTransactions || s.success || 0, 
        icon: 'fas fa-check-circle', 
        color: '#10b981' 
      },
      { 
        label: 'Échouées', 
        value: s.failedTransactions || s.failed || 0, 
        icon: 'fas fa-times-circle', 
        color: '#ef4444' 
      }
    ];
  }

  onFilterChange(filter: TransactionFilter): void {
    this.filter = { ...filter, pageSize: DEFAULT_PAGE_SIZE };
    this.loadTransactions();
    this.loadSummary();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.transactionService.getTransactions(this.filter).subscribe({
      next: ({ items, total }) => {
        this.transactions = items;
        this.total = total;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load transactions.';
        this.isLoading = false;
      }
    });
  }

  loadSummary(): void {
    this.isLoadingSummary = true;
    this.transactionService.getSummary(this.filter).subscribe({
      next: (summary) => {
        this.summary = summary;
        console.log('📊 Structure de TransactionSummary:', summary); // Pour voir la structure réelle
        this.isLoadingSummary = false;
      },
      error: () => {
        this.isLoadingSummary = false;
      }
    });
  }

  goToPage(page: number): void {
    this.filter = { ...this.filter, page };
    this.loadTransactions();
  }

  get totalPages(): number {
    const pageSize = this.filter.pageSize ?? DEFAULT_PAGE_SIZE;
    return Math.max(1, Math.ceil(this.total / pageSize));
  }

  get currentPage(): number {
    return this.filter.page ?? 1;
  }

  openTransaction(transaction: Transaction): void {
    this.router.navigate(['/transactions', transaction.transactionId]);
  }
}