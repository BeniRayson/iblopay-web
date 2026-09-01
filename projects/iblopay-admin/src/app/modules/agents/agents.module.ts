// src/app/modules/agents/agents.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 Ajoutez ReactiveFormsModule
import { RouterModule } from '@angular/router';

import { AgentListComponent } from './pages/agent-list/agent-list.component';
import { AgentDetailComponent } from './pages/agent-detail/agent-detail.component';
import { AgentCreateComponent } from './pages/agent-create/agent-create.component';
import { AgentApprovisionnementComponent } from './pages/agent-approvisionnement/agent-approvisionnement.component';

import { AgentsRoutingModule } from './agents-routing.module';

@NgModule({
  declarations: [
    AgentListComponent,
    AgentDetailComponent,
    AgentCreateComponent,
    AgentApprovisionnementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // 👈 AJOUTEZ CETTE LIGNE
    RouterModule,
    AgentsRoutingModule
  ]
})
export class AgentsModule { }