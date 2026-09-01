import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardStatus } from '../../enums/card-status.enum';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  isLoading = true;
  errorMessage = '';

  statusFilter: CardStatus | 'ALL' = 'ALL';
  readonly statusOptions: (CardStatus | 'ALL')[] = [
    'ALL',
    CardStatus.NEUTRAL,
    CardStatus.ACTIVE,
    CardStatus.BLOCKED,
    CardStatus.REPLACED,
    CardStatus.CLOSED
  ];

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cardService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load cards. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get filteredCards(): Card[] {
    if (this.statusFilter === 'ALL') {
      return this.cards;
    }
    return this.cards.filter((c) => c.status === this.statusFilter);
  }

  openCard(card: Card): void {
    this.router.navigate(['/cards', card.cardId]);
  }
}
