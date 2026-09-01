import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent } from './pages/reports-list/reports-list.component';
import { ReportDetailComponent } from './pages/report-detail/report-detail.component';

const routes: Routes = [
  { path: '', component: ReportsListComponent },
  { path: ':type', component: ReportDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }