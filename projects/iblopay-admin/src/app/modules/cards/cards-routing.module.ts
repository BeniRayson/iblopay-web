import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { CardActivationComponent } from './pages/card-activation/card-activation.component';
import { CardDistributionComponent } from './pages/card-distribution/card-distribution.component';
import { CardStockComponent } from './pages/card-stock/card-stock.component';

// IMPORTANT: 'stock' / 'distribution' / 'activation' must stay ABOVE ':id',
// otherwise the ':id' route swallows them (e.g. a request for /cards/stock
// would resolve as card detail for id="stock").
const routes: Routes = [
  { path: '', component: CardListComponent },
  { path: 'stock', component: CardStockComponent },
  { path: 'distribution', component: CardDistributionComponent },
  { path: 'activation', component: CardActivationComponent },
  { path: ':id', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule {}
