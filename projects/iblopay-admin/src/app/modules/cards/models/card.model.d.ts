import { CardStatus } from '../enums/card-status.enum';
import { CardType } from '../enums/card-type.enum';
export interface Card {
    cardId: string;
    cardUid: string;
    userId: string | null;
    walletId: string | null;
    status: CardStatus;
    transactionCounter: number;
    activatedAt: string | null;
    activatedBy: string | null;
    blockedAt: string | null;
    replacedAt: string | null;
    oldCardId: string | null;
    cardType?: CardType;
    maskedPan?: string;
    holderName?: string;
    balance?: number;
}
export interface CreateCardPayload {
    userId: string;
    walletId: string;
    cardType?: CardType;
}
//# sourceMappingURL=card.model.d.ts.map