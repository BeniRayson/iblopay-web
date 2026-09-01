import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentListComponent } from './pages/agent-list/agent-list.component';
import { AgentDetailComponent } from './pages/agent-detail/agent-detail.component';
import { AgentCreateComponent } from './pages/agent-create/agent-create.component';
import { AgentApprovisionnementComponent } from './pages/agent-approvisionnement/agent-approvisionnement.component';

const routes: Routes = [
  {
    path: '',
    component: AgentListComponent
  },
  {
    path: 'create',
    component: AgentCreateComponent
  },
  {
    path: ':id',
    component: AgentDetailComponent
  },
  {
    path: ':id/approvisionnement',
    component: AgentApprovisionnementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }