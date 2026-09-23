import { Observable } from 'rxjs';
import { Card, CreateCardPayload } from '../models/card.model';
import { CardTransaction } from '../models/card-transaction.model';
/**
 * Card service backed by in-memory dummy data so the UI displays real-looking
 * content during development. Replace the method bodies with real HTTP calls
 * once the cards API is available.
 */
export declare class CardService {
    private cards;
    private transactions;
    private readonly simDelay;
    getCards(): Observable<Card[]>;
    getCardById(cardId: string): Observable<Card>;
    private generateId;
    private generateUid;
    createCard(payload: CreateCardPayload): Observable<Card>;
    activateCard(cardId: string): Observable<Card>;
    blockCard(cardId: string, _reason?: string): Observable<Card>;
    /** Marks a card as closed. Terminal state — a closed card cannot be reactivated. */
    closeCard(cardId: string): Observable<Card>;
    replaceCard(cardId: string): Observable<Card>;
    getCardTransactions(cardId: string): Observable<CardTransaction[]>;
}
//# sourceMappingURL=card.service.d.ts.map