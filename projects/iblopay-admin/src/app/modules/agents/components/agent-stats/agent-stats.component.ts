// src/app/modules/agents/components/agent-stats/agent-stats.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-stats',
  template: `
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-number">{{ totalAgents }}</div>
        <div class="stat-label">Total Agents</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ activeAgents }}</div>
        <div class="stat-label">Agents Actifs</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ pendingAgents }}</div>
        <div class="stat-label">En Attente</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ blockedAgents }}</div>
        <div class="stat-label">Bloqués</div>
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
      
      .stat-number {
        font-size: 28px;
        font-weight: bold;
        color: #1a237e;
      }
      
      .stat-label {
        font-size: 14px;
        color: #666;
        margin-top: 4px;
      }
    }
  `]
})
export class AgentStatsComponent {
  @Input() totalAgents = 0;
  @Input() activeAgents = 0;
  @Input() pendingAgents = 0;
  @Input() blockedAgents = 0;
}