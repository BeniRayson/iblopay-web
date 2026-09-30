import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-status-badge',
  templateUrl: './agent-status-badge.component.html',
  styleUrls: ['./agent-status-badge.component.scss']})
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
