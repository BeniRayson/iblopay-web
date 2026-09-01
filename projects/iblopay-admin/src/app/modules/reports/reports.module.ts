import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './pages/reports-list/reports-list.component';
import { ReportDetailComponent } from './pages/report-detail/report-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    ReportsListComponent,
    ReportDetailComponent,
  ]
})
export class ReportsModule { }