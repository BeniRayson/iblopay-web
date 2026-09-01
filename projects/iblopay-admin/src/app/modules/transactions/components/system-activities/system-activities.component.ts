import { Component, Input } from '@angular/core';
import { SystemActivity } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-system-activities',
  templateUrl: './system-activities.component.html',
  styleUrls: ['./system-activities.component.scss']
})
export class SystemActivitiesComponent {
  @Input() activities: SystemActivity[] = [];
}