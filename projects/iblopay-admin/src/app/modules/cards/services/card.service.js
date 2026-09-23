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
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CardStatus } from '../enums/card-status.enum';
import { DUMMY_CARDS, DUMMY_CARD_TRANSACTIONS } from '../data/card-dummy.data';
/**
 * Card service backed by in-memory dummy data so the UI displays real-looking
 * content during development. Replace the method bodies with real HTTP calls
 * once the cards API is available.
 */
var CardService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardService = _classThis = /** @class */ (function () {
        function CardService_1() {
            this.cards = __spreadArray([], DUMMY_CARDS, true);
            this.transactions = __spreadArray([], DUMMY_CARD_TRANSACTIONS, true);
            this.simDelay = 400; // ms — simulate network latency
        }
        CardService_1.prototype.getCards = function () {
            return of(__spreadArray([], this.cards, true)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.getCardById = function (cardId) {
            var card = this.cards.find(function (c) { return c.cardId === cardId; });
            if (!card) {
                return throwError(function () { return new Error('Card not found'); }).pipe(delay(this.simDelay));
            }
            return of(__assign({}, card)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.generateId = function () {
            return 'card-' + Math.random().toString(36).substring(2, 8);
        };
        CardService_1.prototype.generateUid = function () {
            return '04' + Array.from({ length: 10 }, function () {
                return Math.floor(Math.random() * 16).toString(16).toUpperCase();
            }).join('');
        };
        CardService_1.prototype.createCard = function (payload) {
            var newCard = {
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
            };
            if (payload.cardType) {
                newCard.cardType = payload.cardType;
            }
            this.cards.unshift(newCard);
            return of(__assign({}, newCard)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.activateCard = function (cardId) {
            var card = this.cards.find(function (c) { return c.cardId === cardId; });
            if (!card) {
                return throwError(function () { return new Error('Card not found'); }).pipe(delay(this.simDelay));
            }
            card.status = CardStatus.ACTIVE;
            card.activatedAt = new Date().toISOString();
            return of(__assign({}, card)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.blockCard = function (cardId, _reason) {
            var card = this.cards.find(function (c) { return c.cardId === cardId; });
            if (!card) {
                return throwError(function () { return new Error('Card not found'); }).pipe(delay(this.simDelay));
            }
            card.status = CardStatus.BLOCKED;
            card.blockedAt = new Date().toISOString();
            return of(__assign({}, card)).pipe(delay(this.simDelay));
        };
        /** Marks a card as closed. Terminal state — a closed card cannot be reactivated. */
        // Le service reste le même, mais voici la méthode closeCard améliorée
        CardService_1.prototype.closeCard = function (cardId) {
            var card = this.cards.find(function (c) { return c.cardId === cardId; });
            if (!card) {
                return throwError(function () { return new Error('Card not found'); }).pipe(delay(this.simDelay));
            }
            // On change le statut mais on garde toutes les autres propriétés
            card.status = CardStatus.CLOSED;
            // On garde toutes les autres données (activatedAt, blockedAt, etc.)
            return of(__assign({}, card)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.replaceCard = function (cardId) {
            var card = this.cards.find(function (c) { return c.cardId === cardId; });
            if (!card) {
                return throwError(function () { return new Error('Card not found'); }).pipe(delay(this.simDelay));
            }
            card.status = CardStatus.REPLACED;
            card.replacedAt = new Date().toISOString();
            var replacement = {
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
            };
            if (card.cardType) {
                replacement.cardType = card.cardType;
            }
            this.cards.unshift(replacement);
            return of(__assign({}, replacement)).pipe(delay(this.simDelay));
        };
        CardService_1.prototype.getCardTransactions = function (cardId) {
            var txns = this.transactions.filter(function (t) { return t.cardId === cardId; });
            return of(__spreadArray([], txns, true)).pipe(delay(this.simDelay));
        };
        return CardService_1;
    }());
    __setFunctionName(_classThis, "CardService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardService = _classThis;
}();
export { CardService };
//# sourceMappingURL=card.service.js.map