import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionFilter } from '../models/transaction-filter.model';
import { TransactionSummary } from '../models/transaction-summary.model';
import { SweepTransaction } from '../models/sweep-transaction.model';
import { CommissionTransaction } from '../models/commission-transaction.model';
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
export declare class TransactionService {
    private transactions;
    private sweeps;
    private commissions;
    private readonly simDelay;
    getTransactions(filter?: TransactionFilter): Observable<PagedResult<Transaction>>;
    getTransactionById(transactionId: string): Observable<Transaction>;
    getTransactionsByWallet(walletId: string, filter?: TransactionFilter): Observable<PagedResult<Transaction>>;
    getSummary(filter?: TransactionFilter): Observable<TransactionSummary>;
    getSweepDetails(transactionId: string): Observable<SweepTransaction>;
    getCommissionDetails(transactionId: string): Observable<CommissionTransaction>;
}
//# sourceMappingURL=transaction.service.d.ts.map