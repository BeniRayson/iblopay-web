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
import { MOCK_COMMISSIONS, computeDashboardKpis, getCommissionTrendData, getCommissionTypeBreakdown, getCommissionStatusBreakdown, getAgentLeaderboard, getSuperAgentLeaderboard, getAgentHierarchy, MOCK_AGENTS, MOCK_SUPER_AGENTS, } from '../data/commission-mock.data';
var CommissionMockService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommissionMockService = _classThis = /** @class */ (function () {
        function CommissionMockService_1() {
            this.simDelay = 250;
        }
        CommissionMockService_1.prototype.getAllCommissions = function () {
            return of(__spreadArray([], MOCK_COMMISSIONS, true)).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getCommissionById = function (id) {
            var commission = MOCK_COMMISSIONS.find(function (c) { return c.commissionId === id; });
            return of(commission).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getFilteredCommissions = function (filter, sort, page, pageSize) {
            var filtered = __spreadArray([], MOCK_COMMISSIONS, true);
            // Apply filters
            if (filter.dateFrom) {
                var from_1 = new Date(filter.dateFrom);
                filtered = filtered.filter(function (c) { return new Date(c.createdAt) >= from_1; });
            }
            if (filter.dateTo) {
                var to_1 = new Date(filter.dateTo);
                to_1.setHours(23, 59, 59, 999);
                filtered = filtered.filter(function (c) { return new Date(c.createdAt) <= to_1; });
            }
            if (filter.agentId) {
                filtered = filtered.filter(function (c) { return c.agentId === filter.agentId; });
            }
            if (filter.superAgentId) {
                filtered = filtered.filter(function (c) { return c.superAgentId === filter.superAgentId; });
            }
            if (filter.status) {
                filtered = filtered.filter(function (c) { return c.status === filter.status; });
            }
            if (filter.commissionType) {
                filtered = filtered.filter(function (c) { return c.commissionType === filter.commissionType; });
            }
            if (filter.search) {
                var search_1 = filter.search.toLowerCase();
                filtered = filtered.filter(function (c) {
                    return c.agentName.toLowerCase().includes(search_1) ||
                        c.superAgentName.toLowerCase().includes(search_1) ||
                        c.transactionReference.toLowerCase().includes(search_1) ||
                        c.commissionId.toLowerCase().includes(search_1);
                });
            }
            // Apply sorting
            filtered.sort(function (a, b) {
                var cmp = 0;
                switch (sort.column) {
                    case 'createdAt':
                        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        break;
                    case 'amount':
                        cmp = a.amount - b.amount;
                        break;
                    case 'rate':
                        cmp = a.rate - b.rate;
                        break;
                    case 'agentName':
                        cmp = a.agentName.localeCompare(b.agentName);
                        break;
                    case 'status':
                        cmp = a.status.localeCompare(b.status);
                        break;
                    case 'commissionType':
                        cmp = a.commissionType.localeCompare(b.commissionType);
                        break;
                    case 'creditedAt':
                        if (!a.creditedAt && !b.creditedAt)
                            cmp = 0;
                        else if (!a.creditedAt)
                            cmp = 1;
                        else if (!b.creditedAt)
                            cmp = -1;
                        else
                            cmp = new Date(a.creditedAt).getTime() - new Date(b.creditedAt).getTime();
                        break;
                    default:
                        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
                return sort.direction === 'asc' ? cmp : -cmp;
            });
            var total = filtered.length;
            var start = (page - 1) * pageSize;
            var items = filtered.slice(start, start + pageSize);
            return of({ items: items, total: total, page: page, pageSize: pageSize }).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getDashboardKpis = function (viewRole) {
            var kpis = computeDashboardKpis(MOCK_COMMISSIONS);
            var cards;
            var totalFormatted = this.formatBif(kpis.totalCommissions);
            var pendingFormatted = this.formatBif(kpis.totalPending);
            var creditedFormatted = this.formatBif(kpis.totalCredited);
            if (viewRole === 'agent') {
                // Agent sees only their own data (simulate with first agent)
                var agentId_1 = 'AGT-001';
                var agentComms = MOCK_COMMISSIONS.filter(function (c) { return c.agentId === agentId_1; });
                var agentKpis = computeDashboardKpis(agentComms);
                cards = [
                    { label: 'Mes Commissions Totales', value: this.formatBif(agentKpis.totalCommissions), delta: '+12.5%', deltaType: 'increase', icon: 'bi-cash-stack', color: '#3b82f6' },
                    { label: 'En Attente', value: this.formatBif(agentKpis.totalPending), delta: '3 transactions', deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
                    { label: 'Créditées', value: this.formatBif(agentKpis.totalCredited), delta: '28 jours', deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
                    { label: 'Taux Moyen', value: "".concat(agentKpis.averageRate.toFixed(2), "%"), delta: '+0.15%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
                ];
            }
            else if (viewRole === 'super_agent') {
                // Super agent sees rolled-up data for their team
                var saId_1 = 'SA-001';
                var teamComms = MOCK_COMMISSIONS.filter(function (c) { return c.superAgentId === saId_1; });
                var teamKpis = computeDashboardKpis(teamComms);
                cards = [
                    { label: "Commissions de l'Équipe", value: this.formatBif(teamKpis.totalCommissions), delta: '+18.3%', deltaType: 'increase', icon: 'bi-people', color: '#3b82f6' },
                    { label: 'En Attente Équipe', value: this.formatBif(teamKpis.totalPending), delta: "".concat(teamComms.filter(function (c) { return c.status === 'PENDING'; }).length, " transactions"), deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
                    { label: 'Créditées Équipe', value: this.formatBif(teamKpis.totalCredited), delta: "".concat(teamComms.filter(function (c) { return c.status === 'CREDITED'; }).length, " transactions"), deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
                    { label: 'Taux Moyen Équipe', value: "".concat(teamKpis.averageRate.toFixed(2), "%"), delta: '+0.22%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
                ];
            }
            else {
                // Admin sees everything
                var txCount = MOCK_COMMISSIONS.length;
                var creditedCount = MOCK_COMMISSIONS.filter(function (c) { return c.status === 'CREDITED'; }).length;
                cards = [
                    { label: 'Commissions Totales', value: totalFormatted, delta: '+15.8%', deltaType: 'increase', icon: 'bi-cash-stack', color: '#3b82f6' },
                    { label: 'En Attente', value: pendingFormatted, delta: "".concat(MOCK_COMMISSIONS.filter(function (c) { return c.status === 'PENDING'; }).length, " transactions"), deltaType: 'neutral', icon: 'bi-hourglass-split', color: '#f97316' },
                    { label: 'Créditées', value: creditedFormatted, delta: "".concat(creditedCount, "/").concat(txCount, " transactions"), deltaType: 'increase', icon: 'bi-check-circle', color: '#22c55e' },
                    { label: 'Taux Moyen', value: "".concat(kpis.averageRate.toFixed(2), "%"), delta: '+0.18%', deltaType: 'increase', icon: 'bi-percent', color: '#a855f7' },
                    { label: 'Transactions', value: "".concat(txCount), delta: '+23 vs période préc.', deltaType: 'increase', icon: 'bi-arrow-left-right', color: '#14b8a6' },
                ];
            }
            return of(cards).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getCommissionTrend = function (days) {
            var data = getCommissionTrendData(days);
            return of(data).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getTypeBreakdown = function () {
            return of(getCommissionTypeBreakdown()).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getStatusBreakdown = function () {
            return of(getCommissionStatusBreakdown()).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getAgentLeaderboard = function () {
            var data = getAgentLeaderboard();
            return of(data.map(function (entry, index) { return (__assign(__assign({}, entry), { rank: index + 1 })); })).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getSuperAgentLeaderboard = function () {
            var data = getSuperAgentLeaderboard();
            return of(data.map(function (entry, index) { return (__assign(__assign({}, entry), { rank: index + 1 })); })).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getAgentHierarchy = function () {
            return of(getAgentHierarchy()).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getAgents = function () {
            return of(__spreadArray([], MOCK_AGENTS, true)).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getSuperAgents = function () {
            return of(__spreadArray([], MOCK_SUPER_AGENTS, true)).pipe(delay(this.simDelay));
        };
        CommissionMockService_1.prototype.getChartData = function (days) {
            return this.getCommissionTrend(days);
        };
        CommissionMockService_1.prototype.formatBif = function (amount) {
            return "".concat(amount.toLocaleString('fr-FR'), " BIF");
        };
        return CommissionMockService_1;
    }());
    __setFunctionName(_classThis, "CommissionMockService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionMockService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionMockService = _classThis;
}();
export { CommissionMockService };
//# sourceMappingURL=commission-mock.service.js.map