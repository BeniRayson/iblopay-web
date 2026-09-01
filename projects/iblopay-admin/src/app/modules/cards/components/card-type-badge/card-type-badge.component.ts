import { Component, Input } from '@angular/core';
import { CardType } from '../../enums/card-type.enum';
import { CARD_TYPE_META } from '../../cards.constants';

@Component({
  selector: 'app-card-type-badge',
  templateUrl: './card-type-badge.component.html',
  styleUrls: ['./card-type-badge.component.scss']
})
export class CardTypeBadgeComponent {
  @Input() type?: CardType;

  get meta() {
    return this.type ? CARD_TYPE_META[this.type] : null;
  }
}
