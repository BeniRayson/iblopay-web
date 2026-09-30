import {
  Component,
  OnInit
} from '@angular/core';

import {
  CardService
} from '../../services/card.service';

import {
  Card
} from '../../models/card.model';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  cards: Card[] = [];

  isLoading = true;

  errorMessage = '';


  constructor(
    private cardService: CardService
  ) {}


  ngOnInit(): void {
    this.loadCards();
  }


  // silent = true : rafraîchit les données sans détruire le tableau
  // (le panneau de détail ouvert reste affiché).
  loadCards(silent = false): void {

    if (!silent) {
      this.isLoading = true;
    }

    this.errorMessage = '';

    this.cardService
      .getCards()
      .subscribe({

        next: cards => {
          this.cards = cards;
          this.isLoading = false;
        },

        error: () => {
          this.errorMessage =
            'Une erreur est survenue pendant le chargement des cartes.';
          this.isLoading = false;
        }

      });

  }

}
