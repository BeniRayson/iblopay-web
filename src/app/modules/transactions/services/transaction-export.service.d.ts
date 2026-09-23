import { Transaction } from '../models/transaction.model';
export declare class TransactionExportService {
    constructor();
    /**
     * Client-side CSV export of whatever transactions are already loaded
     * (e.g. the current page in transaction-list). Fine for small/filtered
     * sets. For full-dataset exports, wire up a server-side streaming endpoint.
     */
    exportToCsv(transactions: Transaction[], filename?: string): void;
}
//# sourceMappingURL=transaction-export.service.d.ts.map