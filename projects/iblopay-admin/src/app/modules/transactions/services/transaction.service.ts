import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { TransactionFilter } from '../models/transaction-filter.model';
import { TransactionSummary } from '../models/transaction-summary.model';
import { SweepTransaction } from '../models/sweep-transaction.model';
import { CommissionTransaction } from '../models/commission-transaction.model';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import {
  DUMMY_TRANSACTIONS,
  DUMMY_SWEEPS,
  DUMMY_COMMISSIONS
} from '../data/transaction-dummy.data';

export interface PagedResult<T> {
  items: T[];
  total: number;
}

/**
 * Transaction service backed by in-memory dummy data so the UI displays
 * real-looking content during development. Supports filtering, pagination,
 * summaries, sweep details, and commission details.
 * Replace the method bodies with real HTTP calls once the API is available.
 */
@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactions: Transaction[] = [...DUMMY_TRANSACTIONS];
  private sweeps: SweepTransaction[] = [...DUMMY_SWEEPS];
  private commissions: CommissionTransaction[] = [...DUMMY_COMMISSIONS];

  private readonly simDelay = 400; // ms — simulate network latency

  getTransactions(filter: TransactionFilter = {}): Observable<PagedResult<Transaction>> {
    let filtered = [...this.transactions];

    if (filter.type) {
      filtered = filtered.filter((t) => t.transactionType === filter.type);
    }
    if (filter.status) {
      filtered = filtered.filter((t) => t.status === filter.status);
    }
    if (filter.paymentMode) {
      filtered = filtered.filter((t) => t.paymentMode === filter.paymentMode);
    }
    if (filter.walletId) {
      filtered = filtered.filter(
        (t) => t.fromWalletId === filter.walletId || t.toWalletId === filter.walletId
      );
    }
    if (filter.dateFrom) {
      const from = new Date(filter.dateFrom).getTime();
      filtered = filtered.filter((t) => new Date(t.createdAt).getTime() >= from);
    }
    if (filter.dateTo) {
      const to = new Date(filter.dateTo).getTime();
      filtered = filtered.filter((t) => new Date(t.createdAt).getTime() <= to);
    }
    if (filter.minAmount !== undefined) {
      filtered = filtered.filter((t) => t.amount >= filter.minAmount!);
    }
    if (filter.maxAmount !== undefined) {
      filtered = filtered.filter((t) => t.amount <= filter.maxAmount!);
    }

    const total = filtered.length;
    const page = filter.page ?? 1;
    const pageSize = filter.pageSize ?? 20;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({ items, total }).pipe(delay(this.simDelay));
  }

  getTransactionById(transactionId: string): Observable<Transaction> {
    const tx = this.transactions.find((t) => t.transactionId === transactionId);
    if (!tx) {
      return throwError(() => new Error('Transaction not found')).pipe(delay(this.simDelay));
    }
    return of({ ...tx }).pipe(delay(this.simDelay));
  }

  getTransactionsByWallet(walletId: string, filter: TransactionFilter = {}): Observable<PagedResult<Transaction>> {
    return this.getTransactions({ ...filter, walletId });
  }

  getSummary(filter: TransactionFilter = {}): Observable<TransactionSummary> {
    let filtered = [...this.transactions];

    if (filter.type) {
      filtered = filtered.filter((t) => t.transactionType === filter.type);
    }
    if (filter.status) {
      filtered = filtered.filter((t) => t.status === filter.status);
    }
    if (filter.paymentMode) {
      filtered = filtered.filter((t) => t.paymentMode === filter.paymentMode);
    }
    if (filter.walletId) {
      filtered = filtered.filter(
        (t) => t.fromWalletId === filter.walletId || t.toWalletId === filter.walletId
      );
    }
    if (filter.dateFrom) {
      const from = new Date(filter.dateFrom).getTime();
      filtered = filtered.filter((t) => new Date(t.createdAt).getTime() >= from);
    }
    if (filter.dateTo) {
      const to = new Date(filter.dateTo).getTime();
      filtered = filtered.filter((t) => new Date(t.createdAt).getTime() <= to);
    }

    const totalCount = filtered.length;
    const totalAmount = filtered.reduce((sum, t) => sum + t.amount, 0);
    const totalFees = filtered.reduce((sum, t) => sum + t.fee, 0);

    const countByStatus: Partial<Record<TransactionStatus, number>> = {};
    const countByType: Partial<Record<TransactionType, number>> = {};

    for (const tx of filtered) {
      countByStatus[tx.status] = (countByStatus[tx.status] ?? 0) + 1;
      countByType[tx.transactionType] = (countByType[tx.transactionType] ?? 0) + 1;
    }

    const summary: TransactionSummary = {
      totalCount,
      totalAmount,
      totalFees,
      countByStatus,
      countByType
    };

    return of(summary).pipe(delay(this.simDelay));
  }

  getSweepDetails(transactionId: string): Observable<SweepTransaction> {
    const sweep = this.sweeps.find((s) => s.transactionId === transactionId);
    if (!sweep) {
      return throwError(() => new Error('Sweep details not found')).pipe(delay(this.simDelay));
    }
    return of({ ...sweep }).pipe(delay(this.simDelay));
  }

  getCommissionDetails(transactionId: string): Observable<CommissionTransaction> {
    const commission = this.commissions.find((c) => c.transactionId === transactionId);
    if (!commission) {
      return throwError(() => new Error('Commission details not found')).pipe(delay(this.simDelay));
    }
    return of({ ...commission }).pipe(delay(this.simDelay));
  }
}