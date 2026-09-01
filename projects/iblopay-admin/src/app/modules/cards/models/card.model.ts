import { CardStatus } from '../enums/card-status.enum';
import { CardType } from '../enums/card-type.enum';

// Maps 1:1 to the `cards` table columns (camelCased).
export interface Card {
  cardId: string;              // card_id
  cardUid: string;              // card_uid
  userId: string | null;        // user_id
  walletId: string | null;      // wallet_id
  status: CardStatus;           // status
  transactionCounter: number;   // transaction_counter
  activatedAt: string | null;   // activated_at
  activatedBy: string | null;   // activated_by
  blockedAt: string | null;     // blocked_at
  replacedAt: string | null;    // replaced_at
  oldCardId: string | null;     // old_card_id

  // UI-only, NOT columns on `cards` — populate via a join or a separate
  // card-details endpoint if/when available. Optional so views degrade
  // gracefully if the backend doesn't send them.
  cardType?: CardType;
  maskedPan?: string;
  holderName?: string;
  balance?: number;             // owner's wallet balance (UI display only)
}

// Payload shape for creating a card (server generates cardId/cardUid).
export interface CreateCardPayload {
  userId: string;
  walletId: string;
  cardType?: CardType;
}