import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionTableRow } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent {
  @Input() rows: TransactionTableRow[] = [];
  @Input() total = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 20;
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowClick = new EventEmitter<string>();
  @Output() reverseClick = new EventEmitter<string>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get startRecord(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.total);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const range: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  getCanalLabel(channel: string): string {
    const map: Record<string, string> = {
      wallet: 'Wallet',
      card: 'Carte',
      attribué: 'Attribué',
      mobile: 'Mobile',
      agent: 'Agent',
      web: 'Web',
      nfc: 'NFC',
      ussd: 'USSD'
    };
    return map[channel] || channel;
  }

  onRowClick(transactionNo: string): void {
    this.rowClick.emit(transactionNo);
  }

  onReverseClick(event: MouseEvent, transactionNo: string): void {
    event.stopPropagation();
    this.reverseClick.emit(transactionNo);
  }
}