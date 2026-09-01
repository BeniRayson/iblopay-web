import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';

// Pages
import { TransactionHubComponent } from './pages/transaction-hub/transaction-hub.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './pages/transaction-detail/transaction-detail.component';
import { TransactionFiltersComponent } from './pages/transaction-filters/transaction-filters.component';
import { TransactionExportComponent } from './pages/transaction-export/transaction-export.component';

// Existing Components
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionStatusBadgeComponent } from './components/transaction-status-badge/transaction-status-badge.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';

// Hub Components
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { TraceabilityTimelineComponent } from './components/traceability-timeline/traceability-timeline.component';
import { VolumeChartComponent } from './components/volume-chart/volume-chart.component';
import { TopActorsComponent } from './components/top-actors/top-actors.component';
import { OperationTypesDonutComponent } from './components/operation-types-donut/operation-types-donut.component';
import { AlertsListComponent } from './components/alerts-list/alerts-list.component';
import { SystemActivitiesComponent } from './components/system-activities/system-activities.component';

@NgModule({
  declarations: [
    // Pages
    TransactionHubComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    TransactionFiltersComponent,
    TransactionExportComponent,

    // Existing Components
    TransactionCardComponent,
    TransactionStatusBadgeComponent,
    TransactionChartComponent,
    TransactionSummaryComponent,

    // Hub Components
    KpiCardsComponent,
    QuickActionsComponent,
    FilterBarComponent,
    TransactionTableComponent,
    DetailPanelComponent,
    TraceabilityTimelineComponent,
    VolumeChartComponent,
    TopActorsComponent,
    OperationTypesDonutComponent,
    AlertsListComponent,
    SystemActivitiesComponent
  ],
  imports: [CommonModule, FormsModule, TransactionsRoutingModule]
  // TransactionService, TransactionExportService, and TransactionHubService
  // are all providedIn: 'root', so they don't need to be listed here.
})
export class TransactionsModule {}
