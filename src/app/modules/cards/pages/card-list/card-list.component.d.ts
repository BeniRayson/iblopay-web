import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { CardStatus } from '../../enums/card-status.enum';
export declare class CardListComponent implements OnInit {
    private cardService;
    private router;
    cards: Card[];
    isLoading: boolean;
    errorMessage: string;
    statusFilter: CardStatus | 'ALL';
    readonly statusOptions: (CardStatus | 'ALL')[];
    constructor(cardService: CardService, router: Router);
    ngOnInit(): void;
    loadCards(): void;
    get filteredCards(): Card[];
    openCard(card: Card): void;
}
//# sourceMappingURL=card-list.component.d.ts.map