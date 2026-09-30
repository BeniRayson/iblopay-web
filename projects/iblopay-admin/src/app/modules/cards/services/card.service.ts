import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Card, CreateCardPayload } from '../models/card.model';
import { CardTransaction } from '../models/card-transaction.model';
import { CardStatus } from '../enums/card-status.enum';
import { DUMMY_CARDS, DUMMY_CARD_TRANSACTIONS } from '../data/card-dummy.data';


@Injectable({ providedIn: 'root' })
export class CardService {
  private cards: Card[] = [...DUMMY_CARDS];
  private transactions: CardTransaction[] = [...DUMMY_CARD_TRANSACTIONS];

  private readonly simDelay = 400;

  getCards(): Observable<Card[]> {
    return of([...this.cards]).pipe(delay(this.simDelay));
  }

  getCardById(cardId: string): Observable<Card> {
    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card) {
      return throwError(() => new Error('Card not found')).pipe(delay(this.simDelay));
    }
    return of({ ...card }).pipe(delay(this.simDelay));
  }

  private generateId(): string {
    return 'card-' + Math.random().toString(36).substring(2, 8);
  }

  private generateUid(): string {
    return '04' + Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 16).toString(16).toUpperCase()
    ).join('');
  }

  createCard(payload: CreateCardPayload): Observable<Card> {
    const newCard: Card = {
      cardId: this.generateId(),
      cardUid: this.generateUid(),
      userId: payload.userId,
      walletId: payload.walletId,
      status: CardStatus.NEUTRAL,
      transactionCounter: 0,
      activatedAt: null,
      activatedBy: null,
      blockedAt: null,
      replacedAt: null,
      oldCardId: null
    } as Card;
    if (payload.cardType) {
      newCard.cardType = payload.cardType;
    }
    this.cards.unshift(newCard);
    return of({ ...newCard }).pipe(delay(this.simDelay));
  }

  activateCard(cardId: string): Observable<Card> {
    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card) {
      return throwError(() => new Error('Card not found')).pipe(delay(this.simDelay));
    }
    card.status = CardStatus.ACTIVE;
    card.activatedAt = new Date().toISOString();
    return of({ ...card }).pipe(delay(this.simDelay));
  }

  blockCard(cardId: string, _reason?: string): Observable<Card> {
    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card) {
      return throwError(() => new Error('Card not found')).pipe(delay(this.simDelay));
    }
    card.status = CardStatus.BLOCKED;
    card.blockedAt = new Date().toISOString();
    return of({ ...card }).pipe(delay(this.simDelay));
  }


  closeCard(cardId: string): Observable<Card> {
    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card) {
      return throwError(() => new Error('Card not found')).pipe(delay(this.simDelay));
    }
    card.status = CardStatus.CLOSED;
    return of({ ...card }).pipe(delay(this.simDelay));
  }

  replaceCard(cardId: string): Observable<Card> {
    const card = this.cards.find((c) => c.cardId === cardId);
    if (!card) {
      return throwError(() => new Error('Card not found')).pipe(delay(this.simDelay));
    }
    card.status = CardStatus.REPLACED;
    card.replacedAt = new Date().toISOString();

    const replacement: Card = {
      cardId: this.generateId(),
      cardUid: this.generateUid(),
      userId: card.userId,
      walletId: card.walletId,
      status: CardStatus.NEUTRAL,
      transactionCounter: 0,
      activatedAt: null,
      activatedBy: null,
      blockedAt: null,
      replacedAt: null,
      oldCardId: card.cardId
    } as Card;
    if (card.cardType) {
      replacement.cardType = card.cardType;
    }
    this.cards.unshift(replacement);
    return of({ ...replacement }).pipe(delay(this.simDelay));
  }

  getCardTransactions(cardId: string): Observable<CardTransaction[]> {
    const txns = this.transactions.filter((t) => t.cardId === cardId);
    return of([...txns]).pipe(delay(this.simDelay));
  }
}
