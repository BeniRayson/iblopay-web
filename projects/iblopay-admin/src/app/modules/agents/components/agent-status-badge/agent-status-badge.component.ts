// src/app/modules/agents/components/agent-status-badge/agent-status-badge.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-status-badge',
  template: `
    <span class="status-badge" [class]="statusClass">
      {{ label }}
    </span>
  `,
  styles: [`
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      
      &.active {
        background: #e8f5e9;
        color: #2e7d32;
      }
      &.pending {
        background: #fff3e0;
        color: #e65100;
      }
      &.suspended {
        background: #fff8e1;
        color: #f57f17;
      }
      &.blocked {
        background: #ffebee;
        color: #c62828;
      }
      &.inactive {
        background: #f5f5f5;
        color: #616161;
      }
      &.terminated {
        background: #ffebee;
        color: #b71c1c;
      }
    }
  `]
})
export class AgentStatusBadgeComponent {
  @Input() status: string = '';

  get label(): string {
    const labels: { [key: string]: string } = {
      'ACTIVE': 'Actif',
      'PENDING': 'En attente',
      'SUSPENDED': 'Suspendu',
      'BLOCKED': 'Bloqué',
      'INACTIVE': 'Inactif',
      'TERMINATED': 'Résilié'
    };
    return labels[this.status] || this.status;
  }

  get statusClass(): string {
    return this.status.toLowerCase();
  }
}