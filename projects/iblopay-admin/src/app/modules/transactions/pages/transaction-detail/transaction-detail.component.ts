import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { SweepTransaction } from '../../models/sweep-transaction.model';
import { CommissionTransaction } from '../../models/commission-transaction.model';
import { TransactionType } from '../../enums/transaction-type.enum';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | null = null;
  isLoading = true;
  errorMessage = '';

  sweep: SweepTransaction | null = null;
  isLoadingSweep = false;

  commission: CommissionTransaction | null = null;
  isLoadingCommission = false;

  readonly TransactionType = TransactionType;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) {}

  ngOnInit(): void {
    const transactionId = this.route.snapshot.paramMap.get('id');
    if (!transactionId) {
      this.errorMessage = 'No transaction id provided.';
      this.isLoading = false;
      return;
    }
    this.loadTransaction(transactionId);
  }

  loadTransaction(transactionId: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.transactionService.getTransactionById(transactionId).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isLoading = false;

        if (transaction.transactionType === TransactionType.SWEEP ||
            transaction.transactionType === TransactionType.SWEEP_INVERSE) {
          this.loadSweep(transactionId);
        }
        if (transaction.transactionType === TransactionType.COMMISSION) {
          this.loadCommission(transactionId);
        }
      },
      error: () => {
        this.errorMessage = 'Unable to load this transaction.';
        this.isLoading = false;
      }
    });
  }

  private loadSweep(transactionId: string): void {
    this.isLoadingSweep = true;
    this.transactionService.getSweepDetails(transactionId).subscribe({
      next: (sweep) => {
        this.sweep = sweep;
        this.isLoadingSweep = false;
      },
      error: () => {
        this.isLoadingSweep = false;
      }
    });
  }

  private loadCommission(transactionId: string): void {
    this.isLoadingCommission = true;
    this.transactionService.getCommissionDetails(transactionId).subscribe({
      next: (commission) => {
        this.commission = commission;
        this.isLoadingCommission = false;
      },
      error: () => {
        this.isLoadingCommission = false;
      }
    });
  }
}
