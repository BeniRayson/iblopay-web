import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { PaymentMode } from '../../enums/payment-mode.enum';

@Component({
  selector: 'app-transaction-filters',
  templateUrl: './transaction-filters.component.html',
  styleUrls: ['./transaction-filters.component.scss']
})
export class TransactionFiltersComponent {
  @Output() filterChange = new EventEmitter<TransactionFilter>();

  readonly types = Object.values(TransactionType);
  readonly statuses = Object.values(TransactionStatus);
  readonly paymentModes = Object.values(PaymentMode);

  filter: TransactionFilter = {};

  emitChange(): void {
    this.filterChange.emit({ ...this.filter, page: 1 });
  }

  reset(): void {
    this.filter = {};
    this.emitChange();
  }
}
