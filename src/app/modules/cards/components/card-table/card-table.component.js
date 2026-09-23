var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// ============================================================
// DÉFINITION DES ÉNUMÉRATIONS ET INTERFACES
// ============================================================
export var CardStatus;
(function (CardStatus) {
    CardStatus["ACTIVE"] = "ACTIVE";
    CardStatus["BLOCKED"] = "BLOCKED";
    CardStatus["REPLACED"] = "REPLACED";
    CardStatus["CLOSED"] = "CLOSED";
    CardStatus["SUSPENDED"] = "SUSPENDED";
    CardStatus["NEUTRAL"] = "NEUTRAL";
})(CardStatus || (CardStatus = {}));
export var CardType;
(function (CardType) {
    CardType["PHYSICAL"] = "PHYSICAL";
    CardType["VIRTUAL"] = "VIRTUAL";
})(CardType || (CardType = {}));
export var ADMIN_PIN = '123456';
var CardTableComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-card-table',
            templateUrl: './card-table.component.html',
            styleUrls: ['./card-table.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _cards_decorators;
    var _cards_initializers = [];
    var _cards_extraInitializers = [];
    var _actionCompleted_decorators;
    var _actionCompleted_initializers = [];
    var _actionCompleted_extraInitializers = [];
    var CardTableComponent = _classThis = /** @class */ (function () {
        function CardTableComponent_1() {
            var _this = this;
            this.cards = __runInitializers(this, _cards_initializers, []);
            this.actionCompleted = (__runInitializers(this, _cards_extraInitializers), __runInitializers(this, _actionCompleted_initializers, new EventEmitter()));
            this.selectedCard = (__runInitializers(this, _actionCompleted_extraInitializers), null);
            this.searchTerm = '';
            this.selectedStatus = '';
            this.selectedType = '';
            this.selectedCardType = '';
            // Variables de pagination
            this.currentPage = 1;
            this.itemsPerPage = 50;
            this.totalPages = 0;
            this.isLoading = false;
            // Données - ORIGINAL pour garder l'état initial
            this.originalCards = [];
            // Données affichées
            this.filteredCards = [];
            this.paginatedCards = [];
            // Variables pour le modal PIN
            this.showPinModal = false;
            this.pinInput = '';
            this.pinError = '';
            this.pendingAction = null;
            this.pendingCard = null;
            // Messages de notification
            this.notificationMessage = '';
            this.notificationType = 'success';
            this.showNotification = false;
            this.stats = {
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
            this.searchSubject = new Subject();
            this.Math = Math;
            this.CardStatus = CardStatus;
            this.ADMIN_PIN = ADMIN_PIN;
            this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(function () {
                _this.currentPage = 1;
                _this.applyFilters();
            });
        }
        CardTableComponent_1.prototype.ngOnInit = function () {
            this.originalCards = this.generateMockCards(100);
            this.cards = __spreadArray([], this.originalCards, true);
            this.processCards();
        };
        CardTableComponent_1.prototype.ngOnChanges = function (changes) {
            if (changes['cards'] && !changes['cards'].firstChange) {
                this.originalCards = __spreadArray([], this.cards, true);
                this.processCards();
            }
        };
        CardTableComponent_1.prototype.processCards = function () {
            this.currentPage = 1;
            this.applyFilters();
        };
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
        CardTableComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filteredCards = this.cards.filter(function (card) {
                var _a, _b, _c, _d, _e, _f;
                var matchesSearch = !term ||
                    ((_b = (_a = card.holderName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) !== null && _b !== void 0 ? _b : false) ||
                    ((_d = (_c = card.cardNumber) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(term)) !== null && _d !== void 0 ? _d : false) ||
                    ((_f = (_e = card.cardUid) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(term)) !== null && _f !== void 0 ? _f : false);
                var matchesStatus = !_this.selectedStatus || card.status === _this.selectedStatus;
                var matchesType = !_this.selectedType || card.cardType === _this.selectedType;
                var matchesCardType = true;
                if (_this.selectedCardType === 'PARENT') {
                    matchesCardType = card.isParent === true;
                }
                else if (_this.selectedCardType === 'SECONDARY') {
                    matchesCardType = card.isParent === false && card.parentCardId !== undefined && card.parentCardId !== null;
                }
                return matchesSearch && matchesStatus && matchesType && matchesCardType;
            });
            this.totalPages = Math.max(1, Math.ceil(this.filteredCards.length / this.itemsPerPage));
            // Si la page courante n'existe plus, on la ramène dans les limites
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredCards.length);
            this.paginatedCards = this.filteredCards.slice(startIndex, endIndex);
            this.updateStats();
        };
        // ============================================================
        // MÉTHODES DE PAGINATION
        // ============================================================
        CardTableComponent_1.prototype.changePage = function (page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }
            this.currentPage = page;
            this.applyFilters();
        };
        CardTableComponent_1.prototype.getPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.totalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        // ============================================================
        // FILTRES
        // ============================================================
        CardTableComponent_1.prototype.onSearchChange = function () {
            this.searchSubject.next(this.searchTerm);
        };
        CardTableComponent_1.prototype.onFilterChange = function () {
            this.currentPage = 1;
            this.applyFilters();
        };
        CardTableComponent_1.prototype.clearFilters = function () {
            // ✅ CORRECTION : Retour complet à l'état initial
            //this.resetToInitialState();
        };
        // ============================================================
        // STATISTIQUES
        // ============================================================
        CardTableComponent_1.prototype.updateStats = function () {
            this.stats = {
                total: this.cards.length,
                active: this.cards.filter(function (c) { return c.status === CardStatus.ACTIVE; }).length,
                blocked: this.cards.filter(function (c) { return c.status === CardStatus.BLOCKED; }).length,
                suspended: this.cards.filter(function (c) { return c.status === CardStatus.SUSPENDED; }).length,
                closed: this.cards.filter(function (c) { return c.status === CardStatus.CLOSED; }).length,
                replaced: this.cards.filter(function (c) { return c.status === CardStatus.REPLACED; }).length,
                neutral: this.cards.filter(function (c) { return c.status === CardStatus.NEUTRAL; }).length,
                parentCards: this.cards.filter(function (c) { return c.isParent === true; }).length,
                secondaryCards: this.cards.filter(function (c) { return c.isParent === false && c.parentCardId !== undefined && c.parentCardId !== null; }).length
            };
        };
        // ============================================================
        // MÉTHODES UTILITAIRES
        // ============================================================
        CardTableComponent_1.prototype.trackByCardId = function (index, card) {
            return card.cardId;
        };
        CardTableComponent_1.prototype.getAvatarColor = function (name) {
            if (!name)
                return '#6366f1';
            var colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
            var hash = 0;
            for (var i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#4f46e5';
        };
        CardTableComponent_1.prototype.getStatusClass = function (status) {
            return "status-".concat(status.toLowerCase());
        };
        CardTableComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Active',
                'BLOCKED': 'Bloquée',
                'SUSPENDED': 'Suspendue',
                'CLOSED': 'Clôturée',
                'REPLACED': 'Remplacée',
                'NEUTRAL': 'Neutre'
            };
            return labels[status] || status;
        };
        CardTableComponent_1.prototype.getCardTypeLabel = function (card) {
            if (card.isParent) {
                return 'Parent';
            }
            else if (card.parentCardId) {
                return 'Secondaire';
            }
            return 'Secondaire';
        };
        CardTableComponent_1.prototype.getCardTypeClass = function (card) {
            if (card.isParent) {
                return 'type-parent';
            }
            else {
                return 'type-secondary';
            }
        };
        CardTableComponent_1.prototype.getFormattedBalance = function (balance) {
            var value = balance !== null && balance !== void 0 ? balance : 0;
            return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value) + ' €';
        };
        CardTableComponent_1.prototype.showNotificationMessage = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'success'; }
            this.notificationMessage = message;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(function () {
                _this.showNotification = false;
            }, 3000);
        };
        // ============================================================
        // MODAL PIN
        // ============================================================
        CardTableComponent_1.prototype.openPinModal = function (action, card) {
            this.pinInput = '';
            this.pinError = '';
            this.pendingAction = action;
            this.pendingCard = card;
            this.showPinModal = true;
        };
        CardTableComponent_1.prototype.confirmPin = function () {
            if (this.pinInput === ADMIN_PIN) {
                this.pinError = '';
                this.showPinModal = false;
                if (this.pendingAction && this.pendingCard) {
                    this.pendingAction(this.pendingCard);
                }
                this.pendingAction = null;
                this.pendingCard = null;
            }
            else {
                this.pinError = 'Code PIN incorrect. Veuillez réessayer.';
                this.pinInput = '';
            }
        };
        CardTableComponent_1.prototype.cancelPin = function () {
            this.showPinModal = false;
            this.pinInput = '';
            this.pinError = '';
            this.pendingAction = null;
            this.pendingCard = null;
        };
        // ============================================================
        // ACTIONS SUR LES CARTES (avec PIN)
        // ============================================================
        CardTableComponent_1.prototype.voirCarte = function (card) {
            this.selectedCard = card;
        };
        CardTableComponent_1.prototype.fermerCarte = function () {
            this.selectedCard = null;
        };
        CardTableComponent_1.prototype.activer = function (card) {
            var _this = this;
            if (card.status === CardStatus.ACTIVE) {
                this.showNotificationMessage('⚠️ La carte est déjà active', 'info');
                return;
            }
            this.openPinModal(function (c) {
                _this.executeActiver(c);
            }, card);
        };
        CardTableComponent_1.prototype.bloquer = function (card) {
            var _this = this;
            if (card.status === CardStatus.BLOCKED) {
                this.showNotificationMessage('⚠️ La carte est déjà bloquée', 'info');
                return;
            }
            if (card.status === CardStatus.CLOSED) {
                this.showNotificationMessage('⚠️ Impossible de bloquer une carte clôturée', 'error');
                return;
            }
            this.openPinModal(function (c) {
                _this.executeBloquer(c);
            }, card);
        };
        CardTableComponent_1.prototype.remplacer = function (card) {
            var _this = this;
            if (card.status === CardStatus.CLOSED) {
                this.showNotificationMessage('⚠️ Impossible de remplacer une carte clôturée', 'error');
                return;
            }
            this.openPinModal(function (c) {
                _this.executeRemplacer(c);
            }, card);
        };
        CardTableComponent_1.prototype.cloturer = function (card) {
            var _this = this;
            if (card.status === CardStatus.CLOSED) {
                this.showNotificationMessage('⚠️ La carte est déjà clôturée', 'info');
                return;
            }
            this.openPinModal(function (c) {
                _this.executeCloturer(c);
            }, card);
        };
        // ============================================================
        // EXÉCUTION DES ACTIONS - STABILITÉ GARANTIE
        // ============================================================
        CardTableComponent_1.prototype.executeActiver = function (card) {
            var oldStatus = card.status;
            this.updateCardStatus(card, CardStatus.ACTIVE);
            this.showNotificationMessage("\u2705 Carte activ\u00E9e avec succ\u00E8s ! (".concat(oldStatus, " \u2192 ACTIVE)"), 'success');
            this.actionCompleted.emit();
        };
        CardTableComponent_1.prototype.executeBloquer = function (card) {
            var oldStatus = card.status;
            this.updateCardStatus(card, CardStatus.BLOCKED);
            this.showNotificationMessage("\uD83D\uDD12 Carte bloqu\u00E9e avec succ\u00E8s ! (".concat(oldStatus, " \u2192 BLOCKED)"), 'success');
            this.actionCompleted.emit();
        };
        CardTableComponent_1.prototype.executeRemplacer = function (card) {
            var oldStatus = card.status;
            this.updateCardStatus(card, CardStatus.REPLACED);
            this.showNotificationMessage("\uD83D\uDD04 Carte remplac\u00E9e avec succ\u00E8s ! (".concat(oldStatus, " \u2192 REPLACED)"), 'success');
            this.actionCompleted.emit();
        };
        CardTableComponent_1.prototype.executeCloturer = function (card) {
            var oldStatus = card.status;
            this.updateCardStatus(card, CardStatus.CLOSED);
            this.showNotificationMessage("\u274C Carte cl\u00F4tur\u00E9e avec succ\u00E8s ! (".concat(oldStatus, " \u2192 CLOSED)"), 'success');
            this.actionCompleted.emit();
        };
        // ============================================================
        // MISE À JOUR DU STATUT - PRÉSERVE L'ORDRE
        // ============================================================
        /**
         * Met à jour le statut d'une carte sans modifier l'ordre du tableau
         * La carte garde exactement la même position qu'avant
         */
        CardTableComponent_1.prototype.updateCardStatus = function (card, newStatus) {
            var cardId = card.cardId;
            // Mise à jour dans originalCards (pour garder l'état initial cohérent)
            this.originalCards = this.originalCards.map(function (c) {
                return c.cardId === cardId ? __assign(__assign({}, c), { status: newStatus }) : c;
            });
            // Mise à jour dans cards (le tableau actif)
            this.cards = this.cards.map(function (c) {
                return c.cardId === cardId ? __assign(__assign({}, c), { status: newStatus }) : c;
            });
            // Mise à jour de la carte sélectionnée si elle est ouverte
            if (this.selectedCard && this.selectedCard.cardId === cardId) {
                this.selectedCard = __assign(__assign({}, this.selectedCard), { status: newStatus });
            }
            // Recalcul sans changer la page
            this.applyFilters();
        };
        // ============================================================
        // GÉNÉRATION DE DONNÉES DE SIMULATION
        // ============================================================
        CardTableComponent_1.prototype.generateMockCards = function (count) {
            var cards = [];
            var firstNames = [
                'Jean', 'Marie', 'Pierre', 'Sophie', 'Lucas', 'Emma', 'Thomas', 'Julie',
                'Nicolas', 'Camille', 'David', 'Laura', 'Antoine', 'Marine', 'Alexandre', 'Chloé',
                'Romain', 'Aurélie', 'Julien', 'Élodie', 'François', 'Isabelle', 'Michel', 'Catherine',
                'Philippe', 'Valérie', 'Laurent', 'Sandrine', 'Olivier', 'Nathalie', 'Patrick', 'Anne',
                'Gérard', 'Christine', 'Daniel', 'Patricia', 'Jacques', 'Monique', 'Robert', 'Nicole',
                'André', 'Martine', 'Christian', 'Sylvie', 'Alain', 'Brigitte', 'Raymond', 'Michèle',
                'Éric', 'Claudine', 'Albert', 'Bernadette', 'Charles', 'Denise', 'Étienne', 'Françoise',
                'Georges', 'Hélène', 'Ismaël', 'Jacqueline', 'Kévin', 'Laurence', 'Marcel', 'Nadine'
            ];
            var lastNames = [
                'Dupont', 'Martin', 'Bernard', 'Dubois', 'Petit', 'Robert', 'Richard', 'Moreau',
                'Laurent', 'Simon', 'Lefebvre', 'Fournier', 'Rousseau', 'Bertin', 'Leroux', 'Fontaine',
                'Charpentier', 'Boucher', 'Legrand', 'Arnaud', 'Michel', 'Lefèvre', 'Garcia', 'Martinez',
                'Lopez', 'Durand', 'Blanc', 'Roux', 'Vincent', 'Delacroix', 'Meyer', 'Schmitt',
                'Schneider', 'Fischer', 'Weber', 'Wagner', 'Braun', 'Zimmermann', 'Klein', 'Beck',
                'Hoffmann', 'Richter', 'Schulz', 'Werner', 'Neumann', 'Klein', 'Schäfer', 'Schneider'
            ];
            var statuses = [
                CardStatus.ACTIVE,
                CardStatus.BLOCKED,
                CardStatus.REPLACED,
                CardStatus.CLOSED,
                CardStatus.SUSPENDED,
                CardStatus.NEUTRAL
            ];
            var cardTypes = [CardType.PHYSICAL, CardType.VIRTUAL];
            var statusWeights = [0.35, 0.20, 0.15, 0.10, 0.10, 0.10];
            var getRandomItem = function (array, defaultValue) {
                if (!array || array.length === 0) {
                    if (defaultValue !== undefined)
                        return defaultValue;
                    throw new Error('Array cannot be empty');
                }
                return array[Math.floor(Math.random() * array.length)];
            };
            var getRandomDate = function (yearOffset) {
                var now = new Date();
                return new Date(now.getFullYear() + yearOffset, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
            };
            var getActivatedBy = function (status) {
                if (status !== CardStatus.ACTIVE)
                    return null;
                return getRandomItem(['admin', 'user', 'system'], 'admin');
            };
            var getCardNumber = function () {
                var prefix = Math.random() > 0.5 ? '4' : '5';
                var suffix = Array.from({ length: 15 }, function () { return Math.floor(Math.random() * 10); }).join('');
                return prefix + suffix;
            };
            var getStatus = function () {
                var random = Math.random();
                var cumulativeWeight = 0;
                for (var j = 0; j < statusWeights.length; j++) {
                    cumulativeWeight += statusWeights[j] || 0;
                    if (random <= cumulativeWeight) {
                        return statuses[j] || CardStatus.NEUTRAL;
                    }
                }
                return CardStatus.NEUTRAL;
            };
            var getBalance = function () { return Math.round((Math.random() * 500000) / 10) * 10; };
            for (var i = 0; i < count; i++) {
                var status_1 = getStatus();
                var cardType = getRandomItem(cardTypes, CardType.PHYSICAL);
                var cardNumber = getCardNumber();
                var firstName = getRandomItem(firstNames, 'Jean');
                var lastName = getRandomItem(lastNames, 'Dupont');
                var fullName = "".concat(firstName, " ").concat(lastName);
                var createdAt = getRandomDate(-Math.floor(Math.random() * 3));
                var isParent = Math.random() < 0.25;
                var parentCardId = null;
                var children = [];
                if (isParent) {
                    parentCardId = "parent-".concat(String(i + 1).padStart(4, '0'));
                    var numChildren = Math.floor(Math.random() * 3) + 1;
                    for (var j = 0; j < numChildren; j++) {
                        var childStatus = getStatus();
                        var childCardType = getRandomItem(cardTypes, CardType.VIRTUAL);
                        var childCardNumber = getCardNumber();
                        var childFirstName = getRandomItem(firstNames, 'Jean');
                        var childLastName = getRandomItem(lastNames, 'Dupont');
                        var childFullName = "".concat(childFirstName, " ").concat(childLastName);
                        var childCreatedAt = getRandomDate(-Math.floor(Math.random() * 2));
                        var childCard = {
                            cardId: "child-".concat(String(i + 1).padStart(4, '0'), "-").concat(String(j + 1).padStart(2, '0')),
                            cardUid: childCardNumber,
                            userId: "user-".concat(String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')),
                            walletId: "wallet-".concat(String(Math.floor(Math.random() * 200) + 1).padStart(4, '0')),
                            status: childStatus,
                            transactionCounter: Math.floor(Math.random() * 2000),
                            activatedAt: childStatus === CardStatus.ACTIVE ?
                                new Date(childCreatedAt.getTime() + Math.random() * 86400000 * 30).toISOString() :
                                null,
                            activatedBy: getActivatedBy(childStatus),
                            blockedAt: childStatus === CardStatus.BLOCKED ? new Date().toISOString() : null,
                            replacedAt: childStatus === CardStatus.REPLACED ? new Date().toISOString() : null,
                            oldCardId: Math.random() > 0.8 ?
                                "card-".concat(String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')) :
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
                var card = {
                    cardId: isParent ? parentCardId : "card-".concat(String(i + 1).padStart(4, '0')),
                    cardUid: cardNumber,
                    userId: "user-".concat(String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')),
                    walletId: "wallet-".concat(String(Math.floor(Math.random() * 200) + 1).padStart(4, '0')),
                    status: status_1,
                    transactionCounter: Math.floor(Math.random() * 2000),
                    activatedAt: status_1 === CardStatus.ACTIVE ?
                        new Date(createdAt.getTime() + Math.random() * 86400000 * 30).toISOString() :
                        null,
                    activatedBy: getActivatedBy(status_1),
                    blockedAt: status_1 === CardStatus.BLOCKED ? new Date().toISOString() : null,
                    replacedAt: status_1 === CardStatus.REPLACED ? new Date().toISOString() : null,
                    oldCardId: Math.random() > 0.8 ?
                        "card-".concat(String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')) :
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
        };
        return CardTableComponent_1;
    }());
    __setFunctionName(_classThis, "CardTableComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _cards_decorators = [Input()];
        _actionCompleted_decorators = [Output()];
        __esDecorate(null, null, _cards_decorators, { kind: "field", name: "cards", static: false, private: false, access: { has: function (obj) { return "cards" in obj; }, get: function (obj) { return obj.cards; }, set: function (obj, value) { obj.cards = value; } }, metadata: _metadata }, _cards_initializers, _cards_extraInitializers);
        __esDecorate(null, null, _actionCompleted_decorators, { kind: "field", name: "actionCompleted", static: false, private: false, access: { has: function (obj) { return "actionCompleted" in obj; }, get: function (obj) { return obj.actionCompleted; }, set: function (obj, value) { obj.actionCompleted = value; } }, metadata: _metadata }, _actionCompleted_initializers, _actionCompleted_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardTableComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardTableComponent = _classThis;
}();
export { CardTableComponent };
//# sourceMappingURL=card-table.component.js.map