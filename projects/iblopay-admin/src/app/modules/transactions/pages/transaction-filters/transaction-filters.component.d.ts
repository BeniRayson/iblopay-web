import { EventEmitter } from '@angular/core';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { PaymentMode } from '../../enums/payment-mode.enum';
export declare class TransactionFiltersComponent {
    filterChange: EventEmitter<TransactionFilter>;
    readonly types: TransactionType[];
    readonly statuses: TransactionStatus[];
    readonly paymentModes: PaymentMode[];
    filter: TransactionFilter;
    emitChange(): void;
    reset(): void;
}
//# sourceMappingURL=transaction-filters.component.d.ts.map