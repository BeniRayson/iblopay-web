import { Component, Input } from '@angular/core';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']})
export class AgentCardComponent {
  @Input() agent!: Agent;

  getStatusLabel(status: string | undefined): string {
    const labels: { [key: string]: string } = {
      'ACTIVE': 'Actif',
      'PENDING': 'En attente',
      'SUSPENDED': 'Suspendu',
      'BLOCKED': 'Bloqué',
      'INACTIVE': 'Inactif',
      'TERMINATED': 'Résilié'
    };
    return labels[status || ''] || status || 'Inconnu';
  }
}
