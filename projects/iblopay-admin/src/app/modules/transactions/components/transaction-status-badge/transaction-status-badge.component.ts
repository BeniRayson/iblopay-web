import { Component, Input } from '@angular/core';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { TRANSACTION_STATUS_META } from '../../transactions.constants';

@Component({
  selector: 'app-transaction-status-badge',
  templateUrl: './transaction-status-badge.component.html',
  styleUrls: ['./transaction-status-badge.component.scss']
})
export class TransactionStatusBadgeComponent {
  @Input() status: TransactionStatus = TransactionStatus.PENDING;

  get meta() {
    return TRANSACTION_STATUS_META[this.status];
  }
}
