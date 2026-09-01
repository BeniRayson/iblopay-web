// src/app/modules/agents/components/agent-card/agent-card.component.ts
import { Component, Input } from '@angular/core';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-card',
  template: `
    <div class="agent-card">
      <div class="card-header">
        <div class="agent-avatar">
          {{ agent?.firstName?.[0] }}{{ agent?.lastName?.[0] }}
        </div>
        <div class="agent-info">
          <h3>{{ agent?.firstName }} {{ agent?.lastName }}</h3>
          <p>{{ agent?.code }}</p>
        </div>
      </div>
      <div class="card-body">
        <p><strong>Email:</strong> {{ agent?.email }}</p>
        <p><strong>Téléphone:</strong> {{ agent?.phone }}</p>
        <p><strong>Statut:</strong> {{ getStatusLabel(agent?.status) }}</p>
      </div>
    </div>
  `,
  styles: [`
    .agent-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 16px;
      margin: 8px;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .agent-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #1a237e;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      flex-shrink: 0;
    }
    .agent-info {
      h3 {
        margin: 0;
        font-size: 16px;
        color: #1a237e;
      }
      p {
        margin: 4px 0 0;
        color: #666;
        font-size: 12px;
      }
    }
    .card-body {
      p {
        margin: 6px 0;
        font-size: 14px;
        color: #444;
        
        strong {
          color: #666;
        }
      }
    }
  `]
})
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