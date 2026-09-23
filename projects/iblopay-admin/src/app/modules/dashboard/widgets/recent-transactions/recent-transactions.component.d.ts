import { Transaction } from '../../models/dashboard.model';
export declare class RecentTransactionsComponent {
    transactions: Transaction[];
    getTransactionTypeLabel(type: string): string;
    getTransactionStatusLabel(status: string): string;
    getStatusClass(status: string): string;
    formatCurrency(amount: number): string;
}
//# sourceMappingURL=recent-transactions.component.d.ts.map