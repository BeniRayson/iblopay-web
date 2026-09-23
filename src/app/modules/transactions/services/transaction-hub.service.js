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
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_KPI_DATA, MOCK_QUICK_ACTIONS, MOCK_TRANSACTIONS_TABLE, MOCK_TRANSACTION_DETAIL, MOCK_TRACEABILITY, MOCK_TOP_AGENTS, MOCK_TOP_CLIENTS, MOCK_TOP_MERCHANTS, MOCK_OPERATION_TYPES, MOCK_ALERTS, MOCK_SYSTEM_ACTIVITIES } from '../data/transaction-hub-data';
var TransactionHubService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionHubService = _classThis = /** @class */ (function () {
        function TransactionHubService_1() {
            this.simDelay = 300;
        }
        TransactionHubService_1.prototype.getKpiData = function () {
            return of(__assign({}, MOCK_KPI_DATA)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getQuickActions = function () {
            return of(__spreadArray([], MOCK_QUICK_ACTIONS, true)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getTransactionsTable = function (page, pageSize) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 20; }
            var start = (page - 1) * pageSize;
            var items = MOCK_TRANSACTIONS_TABLE.slice(start, start + pageSize);
            return of({ items: items, total: MOCK_TRANSACTIONS_TABLE.length }).pipe(delay(this.simDelay));
        };
        /**
         * Filter transactions by user role.
         * - regular: Mobile Money + Card transactions
         * - agent: Agent + regular user transactions
         * - super_agent: Super Agent network + Agent + regular user
         * - admin: All transactions
         */
        TransactionHubService_1.prototype.getTransactionsByRole = function (role, page, pageSize) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 20; }
            var filtered = __spreadArray([], MOCK_TRANSACTIONS_TABLE, true);
            switch (role) {
                case 'regular':
                    // Regular user only sees mobile_money and card transactions
                    filtered = filtered.filter(function (t) { return t.category === 'mobile_money' || t.category === 'card'; });
                    break;
                case 'agent':
                    // Agent sees mobile_money, card, and agent network transactions
                    filtered = filtered.filter(function (t) {
                        return t.category === 'mobile_money' || t.category === 'card' || t.category === 'agent';
                    });
                    break;
                case 'super_agent':
                    // Super agent sees everything except admin-only super_agent provisioning
                    filtered = filtered.filter(function (t) {
                        return t.category === 'mobile_money' || t.category === 'card' || t.category === 'agent' ||
                            t.category === 'super_agent';
                    });
                    break;
                case 'admin':
                    // Admin sees everything
                    filtered = __spreadArray([], MOCK_TRANSACTIONS_TABLE, true);
                    break;
            }
            var start = (page - 1) * pageSize;
            var items = filtered.slice(start, start + pageSize);
            return of({ items: items, total: filtered.length }).pipe(delay(this.simDelay));
        };
        /**
         * Filter transactions by type/category
         * - all: All transactions
         * - mobile_money: Mobile Money transactions
         * - card: Carte NFC transactions
         * - agent_network: Réseau Agent transactions
         */
        TransactionHubService_1.prototype.getTransactionsByCategory = function (filter, page, pageSize) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 20; }
            var filtered = __spreadArray([], MOCK_TRANSACTIONS_TABLE, true);
            switch (filter) {
                case 'all':
                    // All transactions
                    break;
                case 'mobile_money':
                    filtered = filtered.filter(function (t) { return t.category === 'mobile_money'; });
                    break;
                case 'card':
                    filtered = filtered.filter(function (t) { return t.category === 'card'; });
                    break;
                case 'agent_network':
                    // Agent network includes both agent and super_agent transactions
                    filtered = filtered.filter(function (t) { return t.category === 'agent' || t.category === 'super_agent'; });
                    break;
            }
            var start = (page - 1) * pageSize;
            var items = filtered.slice(start, start + pageSize);
            return of({ items: items, total: filtered.length }).pipe(delay(this.simDelay));
        };
        /**
         * Filter transactions by both role AND category
         */
        TransactionHubService_1.prototype.getFilteredTransactions = function (role, category, page, pageSize) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 20; }
            // First filter by role
            var filtered = __spreadArray([], MOCK_TRANSACTIONS_TABLE, true);
            switch (role) {
                case 'regular':
                    filtered = filtered.filter(function (t) { return t.category === 'mobile_money' || t.category === 'card'; });
                    break;
                case 'agent':
                    filtered = filtered.filter(function (t) {
                        return t.category === 'mobile_money' || t.category === 'card' || t.category === 'agent';
                    });
                    break;
                case 'super_agent':
                    filtered = filtered.filter(function (t) {
                        return t.category !== undefined;
                    } // All role-accessible categories
                    );
                    break;
                case 'admin':
                    // All transactions already set
                    break;
            }
            // Then filter by category
            if (category !== 'all') {
                switch (category) {
                    case 'mobile_money':
                        filtered = filtered.filter(function (t) { return t.category === 'mobile_money'; });
                        break;
                    case 'card':
                        filtered = filtered.filter(function (t) { return t.category === 'card'; });
                        break;
                    case 'agent_network':
                        filtered = filtered.filter(function (t) { return t.category === 'agent' || t.category === 'super_agent'; });
                        break;
                }
            }
            var start = (page - 1) * pageSize;
            var items = filtered.slice(start, start + pageSize);
            return of({ items: items, total: filtered.length }).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getTransactionDetail = function (id) {
            return of(__assign(__assign({}, MOCK_TRANSACTION_DETAIL), { transactionId: id })).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getTraceability = function () {
            return of(__assign({}, MOCK_TRACEABILITY)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getTopActors = function (tab) {
            var _a;
            var data = {
                'super-agents': MOCK_TOP_AGENTS,
                'agents': MOCK_TOP_AGENTS.map(function (a) { return (__assign(__assign({}, a), { name: a.name.replace('SA ', 'Agent ') })); }),
                'clients': MOCK_TOP_CLIENTS,
                'merchants': MOCK_TOP_MERCHANTS
            };
            var items = (_a = data[tab]) !== null && _a !== void 0 ? _a : [];
            return of(__spreadArray([], items, true)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getOperationTypes = function () {
            return of(__spreadArray([], MOCK_OPERATION_TYPES, true)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getAlerts = function () {
            return of(__spreadArray([], MOCK_ALERTS, true)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getSystemActivities = function () {
            return of(__spreadArray([], MOCK_SYSTEM_ACTIVITIES, true)).pipe(delay(this.simDelay));
        };
        TransactionHubService_1.prototype.getVolumeChartData = function (period) {
            if (period === 'today') {
                return of({
                    labels: Array.from({ length: 24 }, function (_, i) { return "".concat(i.toString().padStart(2, '0'), ":00"); }),
                    values: [120, 95, 80, 65, 55, 45, 60, 180, 320, 420, 380, 350, 410, 390, 450, 520, 480, 430, 560, 610, 580, 490, 360, 200]
                }).pipe(delay(this.simDelay));
            }
            return of({
                labels: Array.from({ length: 7 }, function (_, i) {
                    var d = new Date(2024, 5, 12 + i);
                    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
                }),
                values: [320, 345, 330, 360, 340, 356, 356]
            }).pipe(delay(this.simDelay));
        };
        return TransactionHubService_1;
    }());
    __setFunctionName(_classThis, "TransactionHubService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionHubService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionHubService = _classThis;
}();
export { TransactionHubService };
//# sourceMappingURL=transaction-hub.service.js.map