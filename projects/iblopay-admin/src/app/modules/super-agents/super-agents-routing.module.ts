import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAgentsListComponent } from './pages/super-agents-list/super-agents-list.component';
import { SuperAgentCreateComponent } from './pages/super-agent-create/super-agent-create.component';

const routes: Routes = [
  { path: '', component: SuperAgentsListComponent },
  { path: 'nouveau', component: SuperAgentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAgentsRoutingModule { }
