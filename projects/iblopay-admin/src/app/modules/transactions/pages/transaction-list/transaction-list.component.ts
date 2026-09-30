import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { TransactionSummary } from '../../models/transaction-summary.model';

const DEFAULT_PAGE_SIZE = 10;
const LIVE_REFRESH_INTERVAL = 6000;

interface SummaryStat {
  label: string;
  value: number;
  icon: string;
  className: string;
}

interface DetailRow {
  label: string;
  value: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = [];
  summary: TransactionSummary | null = null;

  total = 0;
  isLoading = true;
  isLoadingSummary = true;
  errorMessage = '';

  filter: TransactionFilter = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE
  };

  selectedTransaction: Transaction | null = null;

  private refreshSubscription?: Subscription;
  private transactionSubscription?: Subscription;
  private summarySubscription?: Subscription;

  constructor(
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.reloadAll();
    this.startLiveRefresh();
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
    this.transactionSubscription?.unsubscribe();
    this.summarySubscription?.unsubscribe();
  }

  /* =========================================================
     STATS
  ========================================================= */

  get summaryStats(): SummaryStat[] {
    const total = this.summary?.totalCount ?? this.total;
    const counts: any = this.summary?.countByStatus ?? {};

    return [
      {
        label: 'Total',
        value: total,
        icon: 'fas fa-arrow-right-arrow-left',
        className: 'stat-icon--blue'
      },
      {
        label: 'En attente',
        value: Number(counts.PENDING ?? 0),
        icon: 'far fa-clock',
        className: 'stat-icon--orange'
      },
      {
        label: 'Réussies',
        value: Number(counts.COMPLETED ?? 0),
        icon: 'far fa-circle-check',
        className: 'stat-icon--green'
      },
      {
        label: 'Échouées',
        value: Number(counts.FAILED ?? 0),
        icon: 'far fa-circle-xmark',
        className: 'stat-icon--red'
      }
    ];
  }

  /* =========================================================
     FILTRES
  ========================================================= */

  onFilterChange(filter: TransactionFilter): void {
    this.filter = {
      ...filter,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE
    };

    this.reloadAll();
  }

  /* =========================================================
     CHARGEMENT
  ========================================================= */

  reloadAll(): void {
    this.loadTransactions();
    this.loadSummary();
  }

  loadTransactions(silent = false): void {
    if (!silent) {
      this.isLoading = true;
    }

    this.errorMessage = '';

    this.transactionSubscription?.unsubscribe();

    this.transactionSubscription = this.transactionService
      .getTransactions(this.filter)
      .subscribe({
        next: ({ items, total }) => {
          this.transactions = Array.isArray(items)
            ? items
            : [];

          this.total = Number(total || 0);
          this.isLoading = false;
        },
        error: () => {
          if (!silent) {
            this.errorMessage =
              'Impossible de charger les transactions.';
          }

          this.isLoading = false;
        }
      });
  }

  loadSummary(silent = false): void {
    if (!silent) {
      this.isLoadingSummary = true;
    }

    this.summarySubscription?.unsubscribe();

    this.summarySubscription = this.transactionService
      .getSummary(this.filter)
      .subscribe({
        next: summary => {
          this.summary = summary;
          this.isLoadingSummary = false;
        },
        error: () => {
          this.isLoadingSummary = false;
        }
      });
  }

  /*
   * Même principe que transaction-hub :
   * rafraîchissement périodique des KPI et transactions,
   * sans recharger toute la page.
   */
  private startLiveRefresh(): void {
    this.refreshSubscription = interval(
      LIVE_REFRESH_INTERVAL
    ).subscribe(() => {
      this.loadTransactions(true);
      this.loadSummary(true);
    });
  }

  /* =========================================================
     PAGINATION
  ========================================================= */

  goToPage(page: number): void {
    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.filter = {
      ...this.filter,
      page,
      pageSize: DEFAULT_PAGE_SIZE
    };

    this.loadTransactions();
  }

  get totalPages(): number {
    const size =
      this.filter.pageSize ??
      DEFAULT_PAGE_SIZE;

    return Math.max(
      1,
      Math.ceil(this.total / size)
    );
  }

  get currentPage(): number {
    return this.filter.page ?? 1;
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 5) {
      return Array.from(
        { length: total },
        (_, i) => i + 1
      );
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  }

  /* =========================================================
     DETAILS
  ========================================================= */

  showTransactionDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }

  closeTransactionDetails(): void {
    this.selectedTransaction = null;
  }

  get selectedTransactionDetails(): DetailRow[] {
    if (!this.selectedTransaction) {
      return [];
    }

    const tx: any = this.selectedTransaction;

    const rows: DetailRow[] = [
      {
        label: 'ID transaction',
        value: this.getTransactionId(tx)
      },
      {
        label: 'Référence',
        value: this.getTransactionReference(tx)
      },
      {
        label: 'Type',
        value: this.getTransactionTypeLabel(tx)
      },
      {
        label: 'Expéditeur',
        value: this.getSenderName(tx)
      },
      {
        label: 'Compte expéditeur',
        value: this.getSenderAccount(tx)
      },
      {
        label: 'Bénéficiaire',
        value: this.getReceiverName(tx)
      },
      {
        label: 'Compte bénéficiaire',
        value: this.getReceiverAccount(tx)
      },
      {
        label: 'Montant',
        value: this.formatAmount(tx)
      },
      {
        label: 'Commission',
        value: this.formatOptionalAmount(
          tx.commission ??
          tx.commissionAmount ??
          tx.fee
        )
      },
      {
        label: 'Canal',
        value: this.safeText(
          tx.channel ??
          tx.transactionChannel ??
          tx.source
        )
      },
      {
        label: 'Description',
        value: this.safeText(
          tx.description ??
          tx.note ??
          tx.reason
        )
      },
      {
        label: 'Date',
        value:
          `${this.formatTransactionDate(tx)} ${this.formatTransactionTime(tx)}`
      },
      {
        label: 'Statut',
        value: this.getStatusLabel(tx)
      }
    ];

    return rows.filter(
      item =>
        item.value &&
        item.value !== '—'
    );
  }

  /* =========================================================
     TABLE HELPERS
  ========================================================= */

  getTransactionId(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.transactionId ??
      tx.id ??
      tx.uuid
    );
  }

  getTransactionReference(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.reference ??
      tx.transactionReference ??
      tx.transactionNo ??
      tx.transactionNumber ??
      tx.transactionId ??
      tx.id
    );
  }

  getTransactionTypeLabel(transaction: Transaction): string {
    const raw = this.rawType(transaction);

    const labels: Record<string, string> = {
      TRANSFER: 'Transfert',
      SEND: 'Transfert',
      DEPOSIT: 'Dépôt',
      CASH_IN: 'Dépôt',
      WITHDRAWAL: 'Retrait',
      CASH_OUT: 'Retrait',
      PAYMENT: 'Paiement',
      MERCHANT_PAYMENT: 'Paiement marchand',
      FUND: 'Approvisionnement',
      COMMISSION: 'Commission',
      REFUND: 'Remboursement'
    };

    return labels[raw] || this.formatEnum(raw);
  }

  getTransactionTypeClass(transaction: Transaction): string {
    const type = this.rawType(transaction);

    if (
      type.includes('DEPOSIT') ||
      type.includes('CASH_IN') ||
      type.includes('FUND')
    ) {
      return 'transaction-type-icon--green';
    }

    if (
      type.includes('WITHDRAW') ||
      type.includes('CASH_OUT')
    ) {
      return 'transaction-type-icon--orange';
    }

    if (
      type.includes('PAYMENT') ||
      type.includes('MERCHANT')
    ) {
      return 'transaction-type-icon--purple';
    }

    return 'transaction-type-icon--blue';
  }

  getTransactionTypeIcon(transaction: Transaction): string {
    const type = this.rawType(transaction);

    if (
      type.includes('DEPOSIT') ||
      type.includes('CASH_IN')
    ) {
      return 'fas fa-arrow-down';
    }

    if (
      type.includes('WITHDRAW') ||
      type.includes('CASH_OUT')
    ) {
      return 'fas fa-arrow-up';
    }

    if (
      type.includes('PAYMENT') ||
      type.includes('MERCHANT')
    ) {
      return 'fas fa-cart-shopping';
    }

    if (type.includes('COMMISSION')) {
      return 'fas fa-coins';
    }

    return 'fas fa-arrow-right-arrow-left';
  }

  getSenderName(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.senderName ??
      tx.sender?.name ??
      tx.sender?.fullName ??
      tx.fromName ??
      tx.from?.name ??
      tx.from
    );
  }

  getSenderAccount(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.senderAccount ??
      tx.senderWallet ??
      tx.sender?.accountNumber ??
      tx.fromAccount ??
      tx.fromWallet
    );
  }

  getReceiverName(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.receiverName ??
      tx.receiver?.name ??
      tx.receiver?.fullName ??
      tx.beneficiaryName ??
      tx.toName ??
      tx.to?.name ??
      tx.to
    );
  }

  getReceiverAccount(transaction: Transaction): string {
    const tx: any = transaction;

    return this.safeText(
      tx.receiverAccount ??
      tx.receiverWallet ??
      tx.receiver?.accountNumber ??
      tx.beneficiaryAccount ??
      tx.toAccount ??
      tx.toWallet
    );
  }

  formatAmount(transaction: Transaction): string {
    const tx: any = transaction;

    const value = Number(
      tx.amount ??
      tx.transactionAmount ??
      tx.value ??
      0
    );

    return `${this.numberFormat(value)} BIF`;
  }

  formatTransactionDate(transaction: Transaction): string {
    const date = this.getTransactionDate(transaction);

    if (!date) {
      return '—';
    }

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  formatTransactionTime(transaction: Transaction): string {
    const date = this.getTransactionDate(transaction);

    if (!date) {
      return '';
    }

    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getStatusLabel(transaction: Transaction): string {
    const tx: any = transaction;

    return this.formatStatus(
      tx.status ??
      tx.transactionStatus
    );
  }

  getStatusClass(transaction: Transaction): string {
    const tx: any = transaction;

    return this.statusClass(
      tx.status ??
      tx.transactionStatus
    );
  }

  trackByTransaction(
    index: number,
    transaction: Transaction
  ): string | number {
    return this.getTransactionId(transaction) || index;
  }

  /* =========================================================
     IMPRESSION
  ========================================================= */

  printSelectedTransaction(): void {
    if (!this.selectedTransaction) {
      return;
    }

    const rows = this.selectedTransactionDetails
      .map(item => `
        <tr>
          <td>${this.escapeHtml(item.label)}</td>
          <td>${this.escapeHtml(item.value)}</td>
        </tr>
      `)
      .join('');

    const popup = window.open(
      '',
      '_blank',
      'width=850,height=650'
    );

    if (!popup) {
      return;
    }

    popup.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Détails transaction</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #172554;
              padding: 28px;
            }
            h1 {
              margin: 0 0 8px;
              font-size: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            td {
              padding: 9px;
              border-bottom: 1px solid #e2e8f0;
            }
            td:first-child {
              width: 38%;
              color: #64748b;
            }
            td:last-child {
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <h1>Détails de la transaction</h1>
          <table>${rows}</table>
          <script>
            window.onload = function () {
              window.print();
            };
          <\/script>
        </body>
      </html>
    `);

    popup.document.close();
  }

  /* =========================================================
     UTILITAIRES
  ========================================================= */

  private rawType(transaction: Transaction): string {
    const tx: any = transaction;

    return String(
      tx.type ??
      tx.transactionType ??
      tx.operationType ??
      ''
    ).toUpperCase();
  }

  private getTransactionDate(
    transaction: Transaction
  ): Date | null {
    const tx: any = transaction;

    const value =
      tx.createdAt ??
      tx.transactionDate ??
      tx.date ??
      tx.createdDate ??
      tx.timestamp;

    if (!value) {
      return null;
    }

    const parsed = new Date(value);

    return Number.isNaN(parsed.getTime())
      ? null
      : parsed;
  }

  private formatStatus(value: unknown): string {
    const status = String(value || '').toUpperCase();

    const labels: Record<string, string> = {
      COMPLETED: 'Réussie',
      SUCCESS: 'Réussie',
      SUCCESSFUL: 'Réussie',
      PENDING: 'En attente',
      PROCESSING: 'En cours',
      FAILED: 'Échouée',
      FAILURE: 'Échouée',
      CANCELLED: 'Annulée',
      CANCELED: 'Annulée'
    };

    return labels[status] || this.formatEnum(status);
  }

  private statusClass(value: unknown): string {
    const status = String(value || '').toUpperCase();

    if (
      status === 'COMPLETED' ||
      status === 'SUCCESS' ||
      status === 'SUCCESSFUL'
    ) {
      return 'status-badge--success';
    }

    if (
      status === 'FAILED' ||
      status === 'FAILURE'
    ) {
      return 'status-badge--failed';
    }

    if (
      status === 'CANCELLED' ||
      status === 'CANCELED'
    ) {
      return 'status-badge--cancelled';
    }

    return 'status-badge--pending';
  }

  private formatOptionalAmount(value: unknown): string {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    const amount = Number(value);

    if (Number.isNaN(amount)) {
      return this.safeText(value);
    }

    return `${this.numberFormat(amount)} BIF`;
  }

  private numberFormat(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0
    }).format(value);
  }

  private safeText(value: unknown): string {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    if (typeof value === 'object') {
      const item: any = value;

      return String(
        item.name ??
        item.fullName ??
        item.label ??
        '—'
      );
    }

    return String(value);
  }

  private formatEnum(value: unknown): string {
    const text = String(value || '');

    if (!text) {
      return '—';
    }

    return text
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  private escapeHtml(value: string): string {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
