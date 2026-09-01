import { Component, Input } from '@angular/core';
import { TransactionSummary } from '../../models/transaction-summary.model';
import { formatMinorAmount } from '../../transactions.constants';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent {
  @Input() summary: TransactionSummary | null = null;

  get formattedTotalAmount(): string {
    return this.summary ? formatMinorAmount(this.summary.totalAmount) : '—';
  }

  get formattedTotalFees(): string {
    return this.summary ? formatMinorAmount(this.summary.totalFees) : '—';
  }
}
