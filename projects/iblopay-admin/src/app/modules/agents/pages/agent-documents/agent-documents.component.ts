// src/app/modules/agents/pages/agent-documents/agent-documents.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-documents',
  template: `
    <div *ngIf="agent" class="documents-container">
      <h1>Documents de l'agent</h1>
      <div class="info-card">
        <p><strong>Agent:</strong> {{ agent.firstName }} {{ agent.lastName }}</p>
        <p><strong>Code:</strong> {{ agent.code }}</p>
      </div>
      <div class="documents-list">
        <p>Aucun document disponible</p>
      </div>
      <button (click)="goBack()" class="btn-secondary">Retour</button>
    </div>
  `,
  styles: [`
    .documents-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .info-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 20px 0;
    }
    .documents-list {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 20px 0;
      text-align: center;
      color: #666;
      padding: 60px 20px;
    }
    .btn-secondary {
      background: #666;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AgentDocumentsComponent implements OnInit {
  agent: Agent | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.agent = data['agent'];
    });
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }
}