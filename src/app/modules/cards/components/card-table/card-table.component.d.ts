import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare enum CardStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    REPLACED = "REPLACED",
    CLOSED = "CLOSED",
    SUSPENDED = "SUSPENDED",
    NEUTRAL = "NEUTRAL"
}
export declare enum CardType {
    PHYSICAL = "PHYSICAL",
    VIRTUAL = "VIRTUAL"
}
export interface Card {
    cardId: string;
    cardUid: string;
    userId: string;
    walletId: string;
    status: CardStatus;
    transactionCounter: number;
    activatedAt: string | null;
    activatedBy: string | null;
    blockedAt: string | null;
    replacedAt: string | null;
    oldCardId: string | null;
    cardType: CardType;
    cardNumber: string;
    holderName: string;
    balance: number;
    isParent?: boolean;
    children?: Card[];
    parentCardId?: string | null;
    createdAt?: Date;
}
interface CardStats {
    total: number;
    active: number;
    blocked: number;
    suspended: number;
    closed: number;
    replaced: number;
    neutral: number;
    parentCards: number;
    secondaryCards: number;
}
export declare const ADMIN_PIN = "123456";
export declare class CardTableComponent implements OnInit, OnChanges {
    cards: Card[];
    actionCompleted: EventEmitter<void>;
    selectedCard: Card | null;
    searchTerm: string;
    selectedStatus: string;
    selectedType: string;
    selectedCardType: string;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    isLoading: boolean;
    private originalCards;
    filteredCards: Card[];
    paginatedCards: Card[];
    showPinModal: boolean;
    pinInput: string;
    pinError: string;
    pendingAction: ((card: Card) => void) | null;
    pendingCard: Card | null;
    notificationMessage: string;
    notificationType: 'success' | 'error' | 'info';
    showNotification: boolean;
    stats: CardStats;
    private searchSubject;
    readonly Math: Math;
    readonly CardStatus: typeof CardStatus;
    readonly ADMIN_PIN = "123456";
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    processCards(): void;
    /**
     * Réinitialise complètement le tableau à son état initial
     * Utilisé quand on revient à "All statuses"

    resetToInitialState(): void {
        // Restaurer les cartes originales
        this.cards = [...this.originalCards];
        // Réinitialiser tous les filtres
        this.searchTerm = '';
        this.selectedStatus = '';
        this.selectedType = '';
        this.selectedCardType = '';
        // Revenir à la page 1
        this.currentPage = 1;
        // Recalculer
        this.applyFilters();
    }
         */
    /**
     * Applique les filtres et met à jour l'affichage
     * Ne modifie PAS l'ordre des cartes
     */
    applyFilters(): void;
    changePage(page: number): void;
    getPaginationPages(): number[];
    onSearchChange(): void;
    onFilterChange(): void;
    clearFilters(): void;
    updateStats(): void;
    trackByCardId(index: number, card: Card): string;
    getAvatarColor(name: string): string;
    getStatusClass(status: string): string;
    getStatusLabel(status: string): string;
    getCardTypeLabel(card: Card): string;
    getCardTypeClass(card: Card): string;
    getFormattedBalance(balance: number | null | undefined): string;
    showNotificationMessage(message: string, type?: 'success' | 'error' | 'info'): void;
    openPinModal(action: (card: Card) => void, card: Card): void;
    confirmPin(): void;
    cancelPin(): void;
    voirCarte(card: Card): void;
    fermerCarte(): void;
    activer(card: Card): void;
    bloquer(card: Card): void;
    remplacer(card: Card): void;
    cloturer(card: Card): void;
    private executeActiver;
    private executeBloquer;
    private executeRemplacer;
    private executeCloturer;
    /**
     * Met à jour le statut d'une carte sans modifier l'ordre du tableau
     * La carte garde exactement la même position qu'avant
     */
    private updateCardStatus;
    private generateMockCards;
}
export {};
//# sourceMappingURL=card-table.component.d.ts.map