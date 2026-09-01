import { Component, Input } from '@angular/core';
import { QuickAction } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent {
  @Input() actions: QuickAction[] = [];
}