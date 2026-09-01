import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionDetail } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss']
})
export class DetailPanelComponent {
  @Input() detail: TransactionDetail | null = null;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
}