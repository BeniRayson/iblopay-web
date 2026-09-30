import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-stats',
  templateUrl: './agent-stats.component.html',
  styleUrls: ['./agent-stats.component.scss']})
export class AgentStatsComponent {
  @Input() totalAgents = 0;
  @Input() activeAgents = 0;
  @Input() pendingAgents = 0;
  @Input() blockedAgents = 0;
}
