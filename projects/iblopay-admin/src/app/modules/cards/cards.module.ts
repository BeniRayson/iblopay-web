import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardsRoutingModule } from './cards-routing.module';

import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { CardActivationComponent } from './pages/card-activation/card-activation.component';
import { CardDistributionComponent } from './pages/card-distribution/card-distribution.component';
import { CardStockComponent } from './pages/card-stock/card-stock.component';

import { CardPreviewComponent } from './components/card-preview/card-preview.component';
import { CardStatusComponent } from './components/card-status/card-status.component';
import { CardQrScannerComponent } from './components/card-qr-scanner/card-qr-scanner.component';
import { CardTypeBadgeComponent } from './components/card-type-badge/card-type-badge.component';
import { CardTableComponent } from './components/card-table/card-table.component';

@NgModule({
  declarations: [
    CardListComponent,
    CardDetailComponent,
    CardActivationComponent,
    CardDistributionComponent,
    CardStockComponent,
    CardPreviewComponent,
    CardStatusComponent,
    CardQrScannerComponent,
    CardTypeBadgeComponent,
    CardTableComponent
  ],
  imports: [CommonModule, FormsModule, CardsRoutingModule]
  // CardService is providedIn: 'root', so it doesn't need to be listed here.
})
export class CardsModule { }