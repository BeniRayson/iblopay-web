import { Component, Input } from '@angular/core';
import { KpiCard } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.scss']
})
export class KpiCardsComponent {
  @Input() cards: KpiCard[] = [];

  get maxSparkline(): number {
    let max = 0;
    for (const card of this.cards) {
      if (card.sparkline) {
        for (const v of card.sparkline) {
          if (v > max) max = v;
        }
      }
    }
    return max || 1;
  }
}
