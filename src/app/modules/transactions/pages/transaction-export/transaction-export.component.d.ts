import { TransactionService } from '../../services/transaction.service';
import { TransactionExportService } from '../../services/transaction-export.service';
export declare class TransactionExportComponent {
    private transactionService;
    private exportService;
    dateFrom: string;
    dateTo: string;
    isExporting: boolean;
    errorMessage: string;
    constructor(transactionService: TransactionService, exportService: TransactionExportService);
    export(): void;
}
//# sourceMappingURL=transaction-export.component.d.ts.map