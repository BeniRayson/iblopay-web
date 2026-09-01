import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TRANSACTION_TYPE_META, formatMinorAmount } from '../../transactions.constants';

// Types where money is leaving the "from" wallet's perspective — used to
// decide the +/- sign shown next to the amount. Adjust if your sign
// convention differs (e.g. if amount is already signed by the backend).
const OUTBOUND_TYPES = new Set([TransactionType.WITHDRAWAL, TransactionType.TRANSFER, TransactionType.PAYMENT_NFC]);

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;

  get typeMeta() {
    return TRANSACTION_TYPE_META[this.transaction.transactionType];
  }

  get isOutbound(): boolean {
    return OUTBOUND_TYPES.has(this.transaction.transactionType);
  }

  get formattedAmount(): string {
    const sign = this.isOutbound ? '-' : '+';
    return `${sign}${formatMinorAmount(this.transaction.amount)}`;
  }
}
