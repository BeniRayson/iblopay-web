import { Transaction } from '../../models/transaction.model';
export declare class TransactionCardComponent {
    transaction: Transaction;
    get typeMeta(): {
        label: string;
        icon: string;
    };
    get isOutbound(): boolean;
    get formattedAmount(): string;
}
//# sourceMappingURL=transaction-card.component.d.ts.map