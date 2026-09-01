// src/app/modules/agents/pages/agent-edit/agent-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-edit',
  template: `
    <div *ngIf="agent" class="edit-container">
      <h1>Modifier l'agent</h1>
      <div class="form-card">
        <p>Formulaire de modification en cours de développement...</p>
        <p><strong>Agent:</strong> {{ agent.firstName }} {{ agent.lastName }}</p>
        <button (click)="goBack()" class="btn-secondary">Retour</button>
      </div>
    </div>
  `,
  styles: [`
    .edit-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .form-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 20px 0;
      text-align: center;
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
export class AgentEditComponent implements OnInit {
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