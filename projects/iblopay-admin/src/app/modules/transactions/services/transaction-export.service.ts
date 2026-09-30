import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionExportService {
  constructor() {}


  exportToCsv(transactions: Transaction[], filename = 'transactions.csv'): void {
    const header = ['Transaction ID', 'Reference', 'Type', 'Status', 'Amount', 'Fee', 'From Wallet', 'To Wallet', 'Created At'];
    const rows = transactions.map((t) => [
      t.transactionId,
      t.reference ?? '',
      t.transactionType,
      t.status,
      String(t.amount),
      String(t.fee),
      t.fromWalletId ?? '',
      t.toWalletId ?? '',
      t.createdAt
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
