import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionExportService } from '../../services/transaction-export.service';
import { TransactionFilter } from '../../models/transaction-filter.model';

const EXPORT_PAGE_SIZE = 1000; // client-side export cap; large ranges should use requestServerExport instead

@Component({
  selector: 'app-transaction-export',
  templateUrl: './transaction-export.component.html',
  styleUrls: ['./transaction-export.component.scss']
})
export class TransactionExportComponent {
  dateFrom = '';
  dateTo = '';
  isExporting = false;
  errorMessage = '';

  constructor(
    private transactionService: TransactionService,
    private exportService: TransactionExportService
  ) {}

  export(): void {
    this.isExporting = true;
    this.errorMessage = '';

    const filter: TransactionFilter = {
      page: 1,
      pageSize: EXPORT_PAGE_SIZE
    } as TransactionFilter;
    if (this.dateFrom) {
      filter.dateFrom = this.dateFrom;
    }
    if (this.dateTo) {
      filter.dateTo = this.dateTo;
    }

    this.transactionService.getTransactions(filter).subscribe({
      next: ({ items, total }) => {
        this.exportService.exportToCsv(items, 'transactions.csv');
        this.isExporting = false;
        if (total > EXPORT_PAGE_SIZE) {
          this.errorMessage = `Only the first ${EXPORT_PAGE_SIZE} of ${total} matching transactions were exported. Narrow your date range for a complete export.`;
        }
      },
      error: () => {
        this.errorMessage = 'Export failed. Please try again.';
        this.isExporting = false;
      }
    });
  }
}
