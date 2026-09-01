import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardTransaction } from '../../models/card-transaction.model';
import { CardStatus } from '../../enums/card-status.enum';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  card: Card | null = null;
  isLoading = true;
  errorMessage = '';

  // Backed by CardService.getCardTransactions, which now calls a real
  // endpoint (see that service for the wallet-join assumption).
  transactions: CardTransaction[] = [];
  isLoadingTransactions = true;

  readonly CardStatus = CardStatus;

  constructor(private route: ActivatedRoute, private cardService: CardService) {}

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');
    if (!cardId) {
      this.errorMessage = 'No card id provided.';
      this.isLoading = false;
      this.isLoadingTransactions = false;
      return;
    }
    this.loadCard(cardId);
    this.loadTransactions(cardId);
  }

  loadCard(cardId: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cardService.getCardById(cardId).subscribe({
      next: (card) => {
        this.card = card;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load this card.';
        this.isLoading = false;
      }
    });
  }

  loadTransactions(cardId: string): void {
    this.isLoadingTransactions = true;
    this.cardService.getCardTransactions(cardId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.isLoadingTransactions = false;
      },
      error: () => {
        this.isLoadingTransactions = false;
      }
    });
  }

  blockCard(): void {
    if (!this.card) return;
    this.cardService.blockCard(this.card.cardId).subscribe((updated) => (this.card = updated));
  }

  activateCard(): void {
    if (!this.card) return;
    this.cardService.activateCard(this.card.cardId).subscribe((updated) => (this.card = updated));
  }
}
