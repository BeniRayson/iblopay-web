import { Component, Input } from '@angular/core';
import { AlertNotification } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent {
  @Input() alerts: AlertNotification[] = [];
}