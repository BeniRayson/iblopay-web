import { Component, Input } from '@angular/core';
import { TraceabilityData } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-traceability-timeline',
  templateUrl: './traceability-timeline.component.html',
  styleUrls: ['./traceability-timeline.component.scss']
})
export class TraceabilityTimelineComponent {
  @Input() data: TraceabilityData | null = null;
}