import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionDashboardComponent } from './pages/commission-dashboard/commission-dashboard.component';
import { CommissionListComponent } from './pages/commission-list/commission-list.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { HierarchyComponent } from './pages/hierarchy/hierarchy.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CommissionDashboardComponent },
  { path: 'list', component: CommissionListComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'hierarchy', component: HierarchyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionsRoutingModule { }