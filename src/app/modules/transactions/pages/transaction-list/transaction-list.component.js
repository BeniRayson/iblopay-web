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
import { Component } from '@angular/core';
var DEFAULT_PAGE_SIZE = 20;
var TransactionListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-list',
            templateUrl: './transaction-list.component.html',
            styleUrls: ['./transaction-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionListComponent = _classThis = /** @class */ (function () {
        function TransactionListComponent_1(transactionService, router) {
            this.transactionService = transactionService;
            this.router = router;
            this.transactions = [];
            this.summary = null;
            this.total = 0;
            this.isLoading = true;
            this.isLoadingSummary = true;
            this.errorMessage = '';
            this.filter = { page: 1, pageSize: DEFAULT_PAGE_SIZE };
        }
        TransactionListComponent_1.prototype.ngOnInit = function () {
            this.loadTransactions();
            this.loadSummary();
        };
        Object.defineProperty(TransactionListComponent_1.prototype, "summaryStats", {
            // ============================================
            // summaryStats - Pour les cartes de stats compactes
            // ============================================
            get: function () {
                if (!this.summary) {
                    return [
                        { label: 'Total', value: 0, icon: 'fas fa-arrow-right-arrow-left', color: '#4f46e5' },
                        { label: 'En attente', value: 0, icon: 'fas fa-clock', color: '#f59e0b' },
                        { label: 'Réussies', value: 0, icon: 'fas fa-check-circle', color: '#10b981' },
                        { label: 'Échouées', value: 0, icon: 'fas fa-times-circle', color: '#ef4444' }
                    ];
                }
                // 👇 Utilise 'as any' pour accéder aux propriétés
                var s = this.summary;
                return [
                    {
                        label: 'Total',
                        value: s.totalTransactions || s.total || 0,
                        icon: 'fas fa-arrow-right-arrow-left',
                        color: '#4f46e5'
                    },
                    {
                        label: 'En attente',
                        value: s.pendingTransactions || s.pending || 0,
                        icon: 'fas fa-clock',
                        color: '#f59e0b'
                    },
                    {
                        label: 'Réussies',
                        value: s.successfulTransactions || s.success || 0,
                        icon: 'fas fa-check-circle',
                        color: '#10b981'
                    },
                    {
                        label: 'Échouées',
                        value: s.failedTransactions || s.failed || 0,
                        icon: 'fas fa-times-circle',
                        color: '#ef4444'
                    }
                ];
            },
            enumerable: false,
            configurable: true
        });
        TransactionListComponent_1.prototype.onFilterChange = function (filter) {
            this.filter = __assign(__assign({}, filter), { pageSize: DEFAULT_PAGE_SIZE });
            this.loadTransactions();
            this.loadSummary();
        };
        TransactionListComponent_1.prototype.loadTransactions = function () {
            var _this = this;
            this.isLoading = true;
            this.errorMessage = '';
            this.transactionService.getTransactions(this.filter).subscribe({
                next: function (_a) {
                    var items = _a.items, total = _a.total;
                    _this.transactions = items;
                    _this.total = total;
                    _this.isLoading = false;
                },
                error: function () {
                    _this.errorMessage = 'Unable to load transactions.';
                    _this.isLoading = false;
                }
            });
        };
        TransactionListComponent_1.prototype.loadSummary = function () {
            var _this = this;
            this.isLoadingSummary = true;
            this.transactionService.getSummary(this.filter).subscribe({
                next: function (summary) {
                    _this.summary = summary;
                    console.log('📊 Structure de TransactionSummary:', summary); // Pour voir la structure réelle
                    _this.isLoadingSummary = false;
                },
                error: function () {
                    _this.isLoadingSummary = false;
                }
            });
        };
        TransactionListComponent_1.prototype.goToPage = function (page) {
            this.filter = __assign(__assign({}, this.filter), { page: page });
            this.loadTransactions();
        };
        Object.defineProperty(TransactionListComponent_1.prototype, "totalPages", {
            get: function () {
                var _a;
                var pageSize = (_a = this.filter.pageSize) !== null && _a !== void 0 ? _a : DEFAULT_PAGE_SIZE;
                return Math.max(1, Math.ceil(this.total / pageSize));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionListComponent_1.prototype, "currentPage", {
            get: function () {
                var _a;
                return (_a = this.filter.page) !== null && _a !== void 0 ? _a : 1;
            },
            enumerable: false,
            configurable: true
        });
        TransactionListComponent_1.prototype.openTransaction = function (transaction) {
            this.router.navigate(['/transactions', transaction.transactionId]);
        };
        return TransactionListComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionListComponent = _classThis;
}();
export { TransactionListComponent };
//# sourceMappingURL=transaction-list.component.js.map