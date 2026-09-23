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
import { TransactionType } from '../../enums/transaction-type.enum';
var TransactionDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-detail',
            templateUrl: './transaction-detail.component.html',
            styleUrls: ['./transaction-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionDetailComponent = _classThis = /** @class */ (function () {
        function TransactionDetailComponent_1(route, transactionService) {
            this.route = route;
            this.transactionService = transactionService;
            this.transaction = null;
            this.isLoading = true;
            this.errorMessage = '';
            this.sweep = null;
            this.isLoadingSweep = false;
            this.commission = null;
            this.isLoadingCommission = false;
            this.TransactionType = TransactionType;
        }
        TransactionDetailComponent_1.prototype.ngOnInit = function () {
            var transactionId = this.route.snapshot.paramMap.get('id');
            if (!transactionId) {
                this.errorMessage = 'No transaction id provided.';
                this.isLoading = false;
                return;
            }
            this.loadTransaction(transactionId);
        };
        TransactionDetailComponent_1.prototype.loadTransaction = function (transactionId) {
            var _this = this;
            this.isLoading = true;
            this.errorMessage = '';
            this.transactionService.getTransactionById(transactionId).subscribe({
                next: function (transaction) {
                    _this.transaction = transaction;
                    _this.isLoading = false;
                    if (transaction.transactionType === TransactionType.SWEEP ||
                        transaction.transactionType === TransactionType.SWEEP_INVERSE) {
                        _this.loadSweep(transactionId);
                    }
                    if (transaction.transactionType === TransactionType.COMMISSION) {
                        _this.loadCommission(transactionId);
                    }
                },
                error: function () {
                    _this.errorMessage = 'Unable to load this transaction.';
                    _this.isLoading = false;
                }
            });
        };
        TransactionDetailComponent_1.prototype.loadSweep = function (transactionId) {
            var _this = this;
            this.isLoadingSweep = true;
            this.transactionService.getSweepDetails(transactionId).subscribe({
                next: function (sweep) {
                    _this.sweep = sweep;
                    _this.isLoadingSweep = false;
                },
                error: function () {
                    _this.isLoadingSweep = false;
                }
            });
        };
        TransactionDetailComponent_1.prototype.loadCommission = function (transactionId) {
            var _this = this;
            this.isLoadingCommission = true;
            this.transactionService.getCommissionDetails(transactionId).subscribe({
                next: function (commission) {
                    _this.commission = commission;
                    _this.isLoadingCommission = false;
                },
                error: function () {
                    _this.isLoadingCommission = false;
                }
            });
        };
        return TransactionDetailComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionDetailComponent = _classThis;
}();
export { TransactionDetailComponent };
//# sourceMappingURL=transaction-detail.component.js.map