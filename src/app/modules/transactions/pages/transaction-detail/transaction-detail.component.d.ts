import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { SweepTransaction } from '../../models/sweep-transaction.model';
import { CommissionTransaction } from '../../models/commission-transaction.model';
import { TransactionType } from '../../enums/transaction-type.enum';
export declare class TransactionDetailComponent implements OnInit {
    private route;
    private transactionService;
    transaction: Transaction | null;
    isLoading: boolean;
    errorMessage: string;
    sweep: SweepTransaction | null;
    isLoadingSweep: boolean;
    commission: CommissionTransaction | null;
    isLoadingCommission: boolean;
    readonly TransactionType: typeof TransactionType;
    constructor(route: ActivatedRoute, transactionService: TransactionService);
    ngOnInit(): void;
    loadTransaction(transactionId: string): void;
    private loadSweep;
    private loadCommission;
}
//# sourceMappingURL=transaction-detail.component.d.ts.map