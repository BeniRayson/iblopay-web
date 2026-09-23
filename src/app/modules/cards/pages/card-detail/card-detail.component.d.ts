import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardTransaction } from '../../models/card-transaction.model';
import { CardStatus } from '../../enums/card-status.enum';
export declare class CardDetailComponent implements OnInit {
    private route;
    private cardService;
    card: Card | null;
    isLoading: boolean;
    errorMessage: string;
    transactions: CardTransaction[];
    isLoadingTransactions: boolean;
    readonly CardStatus: typeof CardStatus;
    constructor(route: ActivatedRoute, cardService: CardService);
    ngOnInit(): void;
    loadCard(cardId: string): void;
    loadTransactions(cardId: string): void;
    blockCard(): void;
    activateCard(): void;
}
//# sourceMappingURL=card-detail.component.d.ts.map