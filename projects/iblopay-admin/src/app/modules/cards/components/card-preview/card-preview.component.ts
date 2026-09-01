import { Component, Input } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardStatus } from '../../enums/card-status.enum';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent {
  @Input() card!: Card;

  get isDimmed(): boolean {
    return this.card.status === CardStatus.BLOCKED ||
           this.card.status === CardStatus.CLOSED ||
           this.card.status === CardStatus.REPLACED;
  }
}
