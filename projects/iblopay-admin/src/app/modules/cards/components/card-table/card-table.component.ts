import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// ============================================================
// DÉFINITION DES ÉNUMÉRATIONS ET INTERFACES
// ============================================================

export enum CardStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
    REPLACED = 'REPLACED',
    CLOSED = 'CLOSED',
    SUSPENDED = 'SUSPENDED',
    NEUTRAL = 'NEUTRAL'
}

export enum CardType {
    PHYSICAL = 'PHYSICAL',
    VIRTUAL = 'VIRTUAL'
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

export const ADMIN_PIN = '123456';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit, OnChanges {
    @Input() cards: Card[] = [];
    @Output() actionCompleted = new EventEmitter<void>();

    selectedCard: Card | null = null;
    searchTerm: string = '';
    selectedStatus: string = '';
    selectedType: string = '';
    selectedCardType: string = '';

    // Variables de pagination
    currentPage: number = 1;
    itemsPerPage: number = 50;
    totalPages: number = 0;

    isLoading: boolean = false;

    // Données - ORIGINAL pour garder l'état initial
    private originalCards: Card[] = [];

    // Données affichées
    filteredCards: Card[] = [];
    paginatedCards: Card[] = [];

    // Variables pour le modal PIN
    showPinModal: boolean = false;
    pinInput: string = '';
    pinError: string = '';
    pendingAction: ((card: Card) => void) | null = null;
    pendingCard: Card | null = null;

    // Messages de notification
    notificationMessage: string = '';
    notificationType: 'success' | 'error' | 'info' = 'success';
    showNotification: boolean = false;

    stats: CardStats = {
        total: 0,
        active: 0,
        blocked: 0,
        suspended: 0,
        closed: 0,
        replaced: 0,
        neutral: 0,
        parentCards: 0,
        secondaryCards: 0
    };

    private searchSubject = new Subject<string>();
    readonly Math = Math;
    readonly CardStatus = CardStatus;
    readonly ADMIN_PIN = ADMIN_PIN;

    constructor() {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(() => {
            this.currentPage = 1;
            this.applyFilters();
        });
    }

    ngOnInit(): void {
        this.originalCards = this.generateMockCards(100);
        this.cards = [...this.originalCards];
        this.processCards();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['cards'] && !changes['cards'].firstChange) {
            this.originalCards = [...this.cards];
            this.processCards();
        }
    }

    processCards(): void {
        this.currentPage = 1;
        this.applyFilters();
    }

    // ============================================================
    // FILTRES ET PAGINATION - STABILITÉ TOTALE
    // ============================================================

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
    applyFilters(): void {
        const term = this.searchTerm.toLowerCase().trim();

        this.filteredCards = this.cards.filter(card => {
            const matchesSearch = !term ||
                (card.holderName?.toLowerCase().includes(term) ?? false) ||
                (card.cardNumber?.toLowerCase().includes(term) ?? false) ||
                (card.cardUid?.toLowerCase().includes(term) ?? false);

            const matchesStatus = !this.selectedStatus || card.status === this.selectedStatus;
            const matchesType = !this.selectedType || card.cardType === this.selectedType;

            let matchesCardType = true;
            if (this.selectedCardType === 'PARENT') {
                matchesCardType = card.isParent === true;
            } else if (this.selectedCardType === 'SECONDARY') {
                matchesCardType = card.isParent === false && card.parentCardId !== undefined && card.parentCardId !== null;
            }

            return matchesSearch && matchesStatus && matchesType && matchesCardType;
        });

        this.totalPages = Math.max(1, Math.ceil(this.filteredCards.length / this.itemsPerPage));

        // Si la page courante n'existe plus, on la ramène dans les limites
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredCards.length);
        this.paginatedCards = this.filteredCards.slice(startIndex, endIndex);

        this.updateStats();
    }

    // ============================================================
    // MÉTHODES DE PAGINATION
    // ============================================================

    changePage(page: number): void {
        if (page < 1 || page > this.totalPages) {
            return;
        }
        this.currentPage = page;
        this.applyFilters();
    }

    getPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // FILTRES
    // ============================================================

    onSearchChange(): void {
        this.searchSubject.next(this.searchTerm);
    }

    onFilterChange(): void {
        this.currentPage = 1;
        this.applyFilters();
    }

    clearFilters(): void {
        // ✅ CORRECTION : Retour complet à l'état initial
        //this.resetToInitialState();
    }

    // ============================================================
    // STATISTIQUES
    // ============================================================

    updateStats(): void {
        this.stats = {
            total: this.cards.length,
            active: this.cards.filter(c => c.status === CardStatus.ACTIVE).length,
            blocked: this.cards.filter(c => c.status === CardStatus.BLOCKED).length,
            suspended: this.cards.filter(c => c.status === CardStatus.SUSPENDED).length,
            closed: this.cards.filter(c => c.status === CardStatus.CLOSED).length,
            replaced: this.cards.filter(c => c.status === CardStatus.REPLACED).length,
            neutral: this.cards.filter(c => c.status === CardStatus.NEUTRAL).length,
            parentCards: this.cards.filter(c => c.isParent === true).length,
            secondaryCards: this.cards.filter(c => c.isParent === false && c.parentCardId !== undefined && c.parentCardId !== null).length
        };
    }

    // ============================================================
    // MÉTHODES UTILITAIRES
    // ============================================================

    trackByCardId(index: number, card: Card): string {
        return card.cardId;
    }

    getAvatarColor(name: string): string {
        if (!name) return '#6366f1';
        const colors: string[] = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#4f46e5';
    }

    getStatusClass(status: string): string {
        return `status-${status.toLowerCase()}`;
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            'ACTIVE': 'Active',
            'BLOCKED': 'Bloquée',
            'SUSPENDED': 'Suspendue',
            'CLOSED': 'Clôturée',
            'REPLACED': 'Remplacée',
            'NEUTRAL': 'Neutre'
        };
        return labels[status] || status;
    }

    getCardTypeLabel(card: Card): string {
        if (card.isParent) {
            return 'Parent';
        } else if (card.parentCardId) {
            return 'Secondaire';
        }
        return 'Secondaire';
    }

    getCardTypeClass(card: Card): string {
        if (card.isParent) {
            return 'type-parent';
        } else {
            return 'type-secondary';
        }
    }

    getFormattedBalance(balance: number | null | undefined): string {
        const value = balance ?? 0;
        return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value) + ' €';
    }

    showNotificationMessage(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        this.notificationMessage = message;
        this.notificationType = type;
        this.showNotification = true;
        setTimeout(() => {
            this.showNotification = false;
        }, 3000);
    }

    // ============================================================
    // MODAL PIN
    // ============================================================

    openPinModal(action: (card: Card) => void, card: Card): void {
        this.pinInput = '';
        this.pinError = '';
        this.pendingAction = action;
        this.pendingCard = card;
        this.showPinModal = true;
    }

    confirmPin(): void {
        if (this.pinInput === ADMIN_PIN) {
            this.pinError = '';
            this.showPinModal = false;
            if (this.pendingAction && this.pendingCard) {
                this.pendingAction(this.pendingCard);
            }
            this.pendingAction = null;
            this.pendingCard = null;
        } else {
            this.pinError = 'Code PIN incorrect. Veuillez réessayer.';
            this.pinInput = '';
        }
    }

    cancelPin(): void {
        this.showPinModal = false;
        this.pinInput = '';
        this.pinError = '';
        this.pendingAction = null;
        this.pendingCard = null;
    }

    // ============================================================
    // ACTIONS SUR LES CARTES (avec PIN)
    // ============================================================

    voirCarte(card: Card): void {
        this.selectedCard = card;
    }

    fermerCarte(): void {
        this.selectedCard = null;
    }

    activer(card: Card): void {
        if (card.status === CardStatus.ACTIVE) {
            this.showNotificationMessage('⚠️ La carte est déjà active', 'info');
            return;
        }
        this.openPinModal((c: Card) => {
            this.executeActiver(c);
        }, card);
    }

    bloquer(card: Card): void {
        if (card.status === CardStatus.BLOCKED) {
            this.showNotificationMessage('⚠️ La carte est déjà bloquée', 'info');
            return;
        }
        if (card.status === CardStatus.CLOSED) {
            this.showNotificationMessage('⚠️ Impossible de bloquer une carte clôturée', 'error');
            return;
        }
        this.openPinModal((c: Card) => {
            this.executeBloquer(c);
        }, card);
    }

    remplacer(card: Card): void {
        if (card.status === CardStatus.CLOSED) {
            this.showNotificationMessage('⚠️ Impossible de remplacer une carte clôturée', 'error');
            return;
        }
        this.openPinModal((c: Card) => {
            this.executeRemplacer(c);
        }, card);
    }

    cloturer(card: Card): void {
        if (card.status === CardStatus.CLOSED) {
            this.showNotificationMessage('⚠️ La carte est déjà clôturée', 'info');
            return;
        }
        this.openPinModal((c: Card) => {
            this.executeCloturer(c);
        }, card);
    }

    // ============================================================
    // EXÉCUTION DES ACTIONS - STABILITÉ GARANTIE
    // ============================================================

    private executeActiver(card: Card): void {
        const oldStatus = card.status;
        this.updateCardStatus(card, CardStatus.ACTIVE);
        this.showNotificationMessage(`✅ Carte activée avec succès ! (${oldStatus} → ACTIVE)`, 'success');
        this.actionCompleted.emit();
    }

    private executeBloquer(card: Card): void {
        const oldStatus = card.status;
        this.updateCardStatus(card, CardStatus.BLOCKED);
        this.showNotificationMessage(`🔒 Carte bloquée avec succès ! (${oldStatus} → BLOCKED)`, 'success');
        this.actionCompleted.emit();
    }

    private executeRemplacer(card: Card): void {
        const oldStatus = card.status;
        this.updateCardStatus(card, CardStatus.REPLACED);
        this.showNotificationMessage(`🔄 Carte remplacée avec succès ! (${oldStatus} → REPLACED)`, 'success');
        this.actionCompleted.emit();
    }

    private executeCloturer(card: Card): void {
        const oldStatus = card.status;
        this.updateCardStatus(card, CardStatus.CLOSED);
        this.showNotificationMessage(`❌ Carte clôturée avec succès ! (${oldStatus} → CLOSED)`, 'success');
        this.actionCompleted.emit();
    }

    // ============================================================
    // MISE À JOUR DU STATUT - PRÉSERVE L'ORDRE
    // ============================================================

    /**
     * Met à jour le statut d'une carte sans modifier l'ordre du tableau
     * La carte garde exactement la même position qu'avant
     */
    private updateCardStatus(card: Card, newStatus: CardStatus): void {
        const cardId = card.cardId;

        // Mise à jour dans originalCards (pour garder l'état initial cohérent)
        this.originalCards = this.originalCards.map(c =>
            c.cardId === cardId ? { ...c, status: newStatus } : c
        );

        // Mise à jour dans cards (le tableau actif)
        this.cards = this.cards.map(c =>
            c.cardId === cardId ? { ...c, status: newStatus } : c
        );

        // Mise à jour de la carte sélectionnée si elle est ouverte
        if (this.selectedCard && this.selectedCard.cardId === cardId) {
            this.selectedCard = { ...this.selectedCard, status: newStatus };
        }

        // Recalcul sans changer la page
        this.applyFilters();
    }

    // ============================================================
    // GÉNÉRATION DE DONNÉES DE SIMULATION
    // ============================================================

    private generateMockCards(count: number): Card[] {
        const cards: Card[] = [];

        const firstNames = [
            'Jean', 'Marie', 'Pierre', 'Sophie', 'Lucas', 'Emma', 'Thomas', 'Julie',
            'Nicolas', 'Camille', 'David', 'Laura', 'Antoine', 'Marine', 'Alexandre', 'Chloé',
            'Romain', 'Aurélie', 'Julien', 'Élodie', 'François', 'Isabelle', 'Michel', 'Catherine',
            'Philippe', 'Valérie', 'Laurent', 'Sandrine', 'Olivier', 'Nathalie', 'Patrick', 'Anne',
            'Gérard', 'Christine', 'Daniel', 'Patricia', 'Jacques', 'Monique', 'Robert', 'Nicole',
            'André', 'Martine', 'Christian', 'Sylvie', 'Alain', 'Brigitte', 'Raymond', 'Michèle',
            'Éric', 'Claudine', 'Albert', 'Bernadette', 'Charles', 'Denise', 'Étienne', 'Françoise',
            'Georges', 'Hélène', 'Ismaël', 'Jacqueline', 'Kévin', 'Laurence', 'Marcel', 'Nadine'
        ];

        const lastNames = [
            'Dupont', 'Martin', 'Bernard', 'Dubois', 'Petit', 'Robert', 'Richard', 'Moreau',
            'Laurent', 'Simon', 'Lefebvre', 'Fournier', 'Rousseau', 'Bertin', 'Leroux', 'Fontaine',
            'Charpentier', 'Boucher', 'Legrand', 'Arnaud', 'Michel', 'Lefèvre', 'Garcia', 'Martinez',
            'Lopez', 'Durand', 'Blanc', 'Roux', 'Vincent', 'Delacroix', 'Meyer', 'Schmitt',
            'Schneider', 'Fischer', 'Weber', 'Wagner', 'Braun', 'Zimmermann', 'Klein', 'Beck',
            'Hoffmann', 'Richter', 'Schulz', 'Werner', 'Neumann', 'Klein', 'Schäfer', 'Schneider'
        ];

        const statuses = [
            CardStatus.ACTIVE,
            CardStatus.BLOCKED,
            CardStatus.REPLACED,
            CardStatus.CLOSED,
            CardStatus.SUSPENDED,
            CardStatus.NEUTRAL
        ];

        const cardTypes: CardType[] = [CardType.PHYSICAL, CardType.VIRTUAL];
        const statusWeights = [0.35, 0.20, 0.15, 0.10, 0.10, 0.10];

        const getRandomItem = <T>(array: T[], defaultValue?: T): T => {
            if (!array || array.length === 0) {
                if (defaultValue !== undefined) return defaultValue;
                throw new Error('Array cannot be empty');
            }
            return array[Math.floor(Math.random() * array.length)] as T;
        };

        const getRandomDate = (yearOffset: number): Date => {
            const now = new Date();
            return new Date(
                now.getFullYear() + yearOffset,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            );
        };

        const getActivatedBy = (status: CardStatus): string | null => {
            if (status !== CardStatus.ACTIVE) return null;
            return getRandomItem(['admin', 'user', 'system'], 'admin');
        };

        const getCardNumber = (): string => {
            const prefix = Math.random() > 0.5 ? '4' : '5';
            const suffix = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
            return prefix + suffix;
        };

        const getStatus = (): CardStatus => {
            const random = Math.random();
            let cumulativeWeight = 0;
            for (let j = 0; j < statusWeights.length; j++) {
                cumulativeWeight += statusWeights[j] || 0;
                if (random <= cumulativeWeight) {
                    return statuses[j] || CardStatus.NEUTRAL;
                }
            }
            return CardStatus.NEUTRAL;
        };

        const getBalance = (): number => Math.round((Math.random() * 500000) / 10) * 10;

        for (let i = 0; i < count; i++) {
            const status = getStatus();
            const cardType = getRandomItem(cardTypes, CardType.PHYSICAL);
            const cardNumber = getCardNumber();
            const firstName = getRandomItem(firstNames, 'Jean');
            const lastName = getRandomItem(lastNames, 'Dupont');
            const fullName = `${firstName} ${lastName}`;
            const createdAt = getRandomDate(-Math.floor(Math.random() * 3));

            const isParent = Math.random() < 0.25;
            let parentCardId: string | null = null;
            let children: Card[] = [];

            if (isParent) {
                parentCardId = `parent-${String(i + 1).padStart(4, '0')}`;
                const numChildren = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < numChildren; j++) {
                    const childStatus = getStatus();
                    const childCardType = getRandomItem(cardTypes, CardType.VIRTUAL);
                    const childCardNumber = getCardNumber();
                    const childFirstName = getRandomItem(firstNames, 'Jean');
                    const childLastName = getRandomItem(lastNames, 'Dupont');
                    const childFullName = `${childFirstName} ${childLastName}`;
                    const childCreatedAt = getRandomDate(-Math.floor(Math.random() * 2));

                    const childCard: Card = {
                        cardId: `child-${String(i + 1).padStart(4, '0')}-${String(j + 1).padStart(2, '0')}`,
                        cardUid: childCardNumber,
                        userId: `user-${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
                        walletId: `wallet-${String(Math.floor(Math.random() * 200) + 1).padStart(4, '0')}`,
                        status: childStatus,
                        transactionCounter: Math.floor(Math.random() * 2000),
                        activatedAt: childStatus === CardStatus.ACTIVE ?
                            new Date(childCreatedAt.getTime() + Math.random() * 86400000 * 30).toISOString() :
                            null,
                        activatedBy: getActivatedBy(childStatus),
                        blockedAt: childStatus === CardStatus.BLOCKED ? new Date().toISOString() : null,
                        replacedAt: childStatus === CardStatus.REPLACED ? new Date().toISOString() : null,
                        oldCardId: Math.random() > 0.8 ?
                            `card-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}` :
                            null,
                        cardType: childCardType,
                        cardNumber: childCardNumber,
                        holderName: childFullName,
                        balance: getBalance(),
                        isParent: false,
                        parentCardId: parentCardId,
                        children: [],
                        createdAt: childCreatedAt
                    };
                    children.push(childCard);
                }
            }

            const card: Card = {
                cardId: isParent ? parentCardId! : `card-${String(i + 1).padStart(4, '0')}`,
                cardUid: cardNumber,
                userId: `user-${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
                walletId: `wallet-${String(Math.floor(Math.random() * 200) + 1).padStart(4, '0')}`,
                status: status,
                transactionCounter: Math.floor(Math.random() * 2000),
                activatedAt: status === CardStatus.ACTIVE ?
                    new Date(createdAt.getTime() + Math.random() * 86400000 * 30).toISOString() :
                    null,
                activatedBy: getActivatedBy(status),
                blockedAt: status === CardStatus.BLOCKED ? new Date().toISOString() : null,
                replacedAt: status === CardStatus.REPLACED ? new Date().toISOString() : null,
                oldCardId: Math.random() > 0.8 ?
                    `card-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}` :
                    null,
                cardType: cardType,
                cardNumber: cardNumber,
                holderName: fullName,
                balance: getBalance(),
                isParent: isParent,
                parentCardId: parentCardId,
                children: children,
                createdAt: createdAt
            };

            cards.push(card);
        }

        return cards;
    }
}