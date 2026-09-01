import { Component, Input } from '@angular/core';
import { CardStatus } from '../../enums/card-status.enum';
import { CARD_STATUS_META } from '../../cards.constants';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.scss']
})
export class CardStatusComponent {
  @Input() status: CardStatus = CardStatus.NEUTRAL;

  get meta() {
    return CARD_STATUS_META[this.status];
  }
}
