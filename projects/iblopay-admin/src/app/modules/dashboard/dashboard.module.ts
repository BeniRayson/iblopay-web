import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { StatCardComponent } from './widgets/stat-card/stat-card.component';
import { ProvinceListComponent } from './widgets/province-list/province-list.component';
import { ChartWidgetComponent } from './widgets/chart-widget/chart-widget.component';
import { QuickAccessComponent } from './widgets/quick-access/quick-access.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatCardComponent,
    ProvinceListComponent,
    ChartWidgetComponent,
    QuickAccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }