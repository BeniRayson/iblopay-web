import { EventEmitter } from '@angular/core';
import { TransactionTableRow } from '../../models/transaction-hub.model';
export declare class TransactionTableComponent {
    rows: TransactionTableRow[];
    total: number;
    currentPage: number;
    pageSize: number;
    pageChange: EventEmitter<number>;
    rowClick: EventEmitter<string>;
    reverseClick: EventEmitter<string>;
    get totalPages(): number;
    get startRecord(): number;
    get endRecord(): number;
    get pages(): number[];
    getCanalLabel(channel: string): string;
    onRowClick(transactionNo: string): void;
    onReverseClick(event: MouseEvent, transactionNo: string): void;
}
//# sourceMappingURL=transaction-table.component.d.ts.map