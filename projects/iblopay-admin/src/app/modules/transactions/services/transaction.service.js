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
import { DUMMY_TRANSACTIONS, DUMMY_SWEEPS, DUMMY_COMMISSIONS } from '../data/transaction-dummy.data';
/**
 * Transaction service backed by in-memory dummy data so the UI displays
 * real-looking content during development. Supports filtering, pagination,
 * summaries, sweep details, and commission details.
 * Replace the method bodies with real HTTP calls once the API is available.
 */
var TransactionService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionService = _classThis = /** @class */ (function () {
        function TransactionService_1() {
            this.transactions = __spreadArray([], DUMMY_TRANSACTIONS, true);
            this.sweeps = __spreadArray([], DUMMY_SWEEPS, true);
            this.commissions = __spreadArray([], DUMMY_COMMISSIONS, true);
            this.simDelay = 400; // ms — simulate network latency
        }
        TransactionService_1.prototype.getTransactions = function (filter) {
            var _a, _b;
            if (filter === void 0) { filter = {}; }
            var filtered = __spreadArray([], this.transactions, true);
            if (filter.type) {
                filtered = filtered.filter(function (t) { return t.transactionType === filter.type; });
            }
            if (filter.status) {
                filtered = filtered.filter(function (t) { return t.status === filter.status; });
            }
            if (filter.paymentMode) {
                filtered = filtered.filter(function (t) { return t.paymentMode === filter.paymentMode; });
            }
            if (filter.walletId) {
                filtered = filtered.filter(function (t) { return t.fromWalletId === filter.walletId || t.toWalletId === filter.walletId; });
            }
            if (filter.dateFrom) {
                var from_1 = new Date(filter.dateFrom).getTime();
                filtered = filtered.filter(function (t) { return new Date(t.createdAt).getTime() >= from_1; });
            }
            if (filter.dateTo) {
                var to_1 = new Date(filter.dateTo).getTime();
                filtered = filtered.filter(function (t) { return new Date(t.createdAt).getTime() <= to_1; });
            }
            if (filter.minAmount !== undefined) {
                filtered = filtered.filter(function (t) { return t.amount >= filter.minAmount; });
            }
            if (filter.maxAmount !== undefined) {
                filtered = filtered.filter(function (t) { return t.amount <= filter.maxAmount; });
            }
            var total = filtered.length;
            var page = (_a = filter.page) !== null && _a !== void 0 ? _a : 1;
            var pageSize = (_b = filter.pageSize) !== null && _b !== void 0 ? _b : 20;
            var start = (page - 1) * pageSize;
            var items = filtered.slice(start, start + pageSize);
            return of({ items: items, total: total }).pipe(delay(this.simDelay));
        };
        TransactionService_1.prototype.getTransactionById = function (transactionId) {
            var tx = this.transactions.find(function (t) { return t.transactionId === transactionId; });
            if (!tx) {
                return throwError(function () { return new Error('Transaction not found'); }).pipe(delay(this.simDelay));
            }
            return of(__assign({}, tx)).pipe(delay(this.simDelay));
        };
        TransactionService_1.prototype.getTransactionsByWallet = function (walletId, filter) {
            if (filter === void 0) { filter = {}; }
            return this.getTransactions(__assign(__assign({}, filter), { walletId: walletId }));
        };
        TransactionService_1.prototype.getSummary = function (filter) {
            var _a, _b;
            if (filter === void 0) { filter = {}; }
            var filtered = __spreadArray([], this.transactions, true);
            if (filter.type) {
                filtered = filtered.filter(function (t) { return t.transactionType === filter.type; });
            }
            if (filter.status) {
                filtered = filtered.filter(function (t) { return t.status === filter.status; });
            }
            if (filter.paymentMode) {
                filtered = filtered.filter(function (t) { return t.paymentMode === filter.paymentMode; });
            }
            if (filter.walletId) {
                filtered = filtered.filter(function (t) { return t.fromWalletId === filter.walletId || t.toWalletId === filter.walletId; });
            }
            if (filter.dateFrom) {
                var from_2 = new Date(filter.dateFrom).getTime();
                filtered = filtered.filter(function (t) { return new Date(t.createdAt).getTime() >= from_2; });
            }
            if (filter.dateTo) {
                var to_2 = new Date(filter.dateTo).getTime();
                filtered = filtered.filter(function (t) { return new Date(t.createdAt).getTime() <= to_2; });
            }
            var totalCount = filtered.length;
            var totalAmount = filtered.reduce(function (sum, t) { return sum + t.amount; }, 0);
            var totalFees = filtered.reduce(function (sum, t) { return sum + t.fee; }, 0);
            var countByStatus = {};
            var countByType = {};
            for (var _i = 0, filtered_1 = filtered; _i < filtered_1.length; _i++) {
                var tx = filtered_1[_i];
                countByStatus[tx.status] = ((_a = countByStatus[tx.status]) !== null && _a !== void 0 ? _a : 0) + 1;
                countByType[tx.transactionType] = ((_b = countByType[tx.transactionType]) !== null && _b !== void 0 ? _b : 0) + 1;
            }
            var summary = {
                totalCount: totalCount,
                totalAmount: totalAmount,
                totalFees: totalFees,
                countByStatus: countByStatus,
                countByType: countByType
            };
            return of(summary).pipe(delay(this.simDelay));
        };
        TransactionService_1.prototype.getSweepDetails = function (transactionId) {
            var sweep = this.sweeps.find(function (s) { return s.transactionId === transactionId; });
            if (!sweep) {
                return throwError(function () { return new Error('Sweep details not found'); }).pipe(delay(this.simDelay));
            }
            return of(__assign({}, sweep)).pipe(delay(this.simDelay));
        };
        TransactionService_1.prototype.getCommissionDetails = function (transactionId) {
            var commission = this.commissions.find(function (c) { return c.transactionId === transactionId; });
            if (!commission) {
                return throwError(function () { return new Error('Commission details not found'); }).pipe(delay(this.simDelay));
            }
            return of(__assign({}, commission)).pipe(delay(this.simDelay));
        };
        return TransactionService_1;
    }());
    __setFunctionName(_classThis, "TransactionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionService = _classThis;
}();
export { TransactionService };
//# sourceMappingURL=transaction.service.js.map