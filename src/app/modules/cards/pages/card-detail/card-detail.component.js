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
import { Component } from '@angular/core';
import { CardStatus } from '../../enums/card-status.enum';
var CardDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-card-detail',
            templateUrl: './card-detail.component.html',
            styleUrls: ['./card-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardDetailComponent = _classThis = /** @class */ (function () {
        function CardDetailComponent_1(route, cardService) {
            this.route = route;
            this.cardService = cardService;
            this.card = null;
            this.isLoading = true;
            this.errorMessage = '';
            // Backed by CardService.getCardTransactions, which now calls a real
            // endpoint (see that service for the wallet-join assumption).
            this.transactions = [];
            this.isLoadingTransactions = true;
            this.CardStatus = CardStatus;
        }
        CardDetailComponent_1.prototype.ngOnInit = function () {
            var cardId = this.route.snapshot.paramMap.get('id');
            if (!cardId) {
                this.errorMessage = 'No card id provided.';
                this.isLoading = false;
                this.isLoadingTransactions = false;
                return;
            }
            this.loadCard(cardId);
            this.loadTransactions(cardId);
        };
        CardDetailComponent_1.prototype.loadCard = function (cardId) {
            var _this = this;
            this.isLoading = true;
            this.errorMessage = '';
            this.cardService.getCardById(cardId).subscribe({
                next: function (card) {
                    _this.card = card;
                    _this.isLoading = false;
                },
                error: function () {
                    _this.errorMessage = 'Unable to load this card.';
                    _this.isLoading = false;
                }
            });
        };
        CardDetailComponent_1.prototype.loadTransactions = function (cardId) {
            var _this = this;
            this.isLoadingTransactions = true;
            this.cardService.getCardTransactions(cardId).subscribe({
                next: function (transactions) {
                    _this.transactions = transactions;
                    _this.isLoadingTransactions = false;
                },
                error: function () {
                    _this.isLoadingTransactions = false;
                }
            });
        };
        CardDetailComponent_1.prototype.blockCard = function () {
            var _this = this;
            if (!this.card)
                return;
            this.cardService.blockCard(this.card.cardId).subscribe(function (updated) { return (_this.card = updated); });
        };
        CardDetailComponent_1.prototype.activateCard = function () {
            var _this = this;
            if (!this.card)
                return;
            this.cardService.activateCard(this.card.cardId).subscribe(function (updated) { return (_this.card = updated); });
        };
        return CardDetailComponent_1;
    }());
    __setFunctionName(_classThis, "CardDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardDetailComponent = _classThis;
}();
export { CardDetailComponent };
//# sourceMappingURL=card-detail.component.js.map