import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { TransactionSummary } from '../../models/transaction-summary.model';
export declare class TransactionListComponent implements OnInit {
    private transactionService;
    private router;
    transactions: Transaction[];
    summary: TransactionSummary | null;
    total: number;
    isLoading: boolean;
    isLoadingSummary: boolean;
    errorMessage: string;
    filter: TransactionFilter;
    constructor(transactionService: TransactionService, router: Router);
    ngOnInit(): void;
    get summaryStats(): {
        label: string;
        value: any;
        icon: string;
        color: string;
    }[];
    onFilterChange(filter: TransactionFilter): void;
    loadTransactions(): void;
    loadSummary(): void;
    goToPage(page: number): void;
    get totalPages(): number;
    get currentPage(): number;
    openTransaction(transaction: Transaction): void;
}
//# sourceMappingURL=transaction-list.component.d.ts.map