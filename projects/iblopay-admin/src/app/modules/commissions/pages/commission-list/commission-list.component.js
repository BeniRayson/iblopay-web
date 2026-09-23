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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
var CommissionListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-commission-list',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './commission-list.component.html',
            styleUrls: ['./commission-list.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommissionListComponent = _classThis = /** @class */ (function () {
        function CommissionListComponent_1(commissionService) {
            this.commissionService = commissionService;
            this.commissions = [];
            this.total = 0;
            this.page = 1;
            this.pageSize = 15;
            this.isLoading = true;
            // Filters
            this.filter = {
                dateFrom: null,
                dateTo: null,
                agentId: null,
                superAgentId: null,
                status: null,
                commissionType: null,
                search: '',
            };
            // Sort
            this.sort = { column: 'createdAt', direction: 'desc' };
            // Dropdown options
            this.agents = [];
            this.superAgents = [];
            this.statuses = [
                { value: null, label: 'Tous' },
                { value: 'PENDING', label: 'En Attente' },
                { value: 'CREDITED', label: 'Crédité' },
                { value: 'FAILED', label: 'Échoué' },
            ];
            this.types = [
                { value: null, label: 'Tous' },
                { value: 'AGENT_COMMISSION', label: 'Commission Agent' },
                { value: 'SUPER_AGENT_COMMISSION', label: 'Commission Super Agent' },
            ];
            // Detail panel
            this.selectedCommission = null;
            this.detailVisible = false;
            this.activeView = 'admin';
            this.destroy$ = new Subject();
        }
        CommissionListComponent_1.prototype.ngOnInit = function () {
            this.loadDropdowns();
            this.loadData();
        };
        CommissionListComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        CommissionListComponent_1.prototype.onViewChange = function (view) {
            this.activeView = view;
            this.page = 1;
            this.loadData();
        };
        CommissionListComponent_1.prototype.onPageChange = function (newPage) {
            this.page = newPage;
            this.loadData();
        };
        CommissionListComponent_1.prototype.onSort = function (column) {
            if (this.sort.column === column) {
                this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
            }
            else {
                this.sort.column = column;
                this.sort.direction = 'asc';
            }
            this.page = 1;
            this.loadData();
        };
        CommissionListComponent_1.prototype.onFilterChange = function () {
            this.page = 1;
            this.loadData();
        };
        CommissionListComponent_1.prototype.onSearch = function () {
            this.page = 1;
            this.loadData();
        };
        CommissionListComponent_1.prototype.clearFilters = function () {
            this.filter = {
                dateFrom: null,
                dateTo: null,
                agentId: null,
                superAgentId: null,
                status: null,
                commissionType: null,
                search: '',
            };
            this.page = 1;
            this.loadData();
        };
        CommissionListComponent_1.prototype.onRowClick = function (commission) {
            this.selectedCommission = commission;
            this.detailVisible = true;
        };
        CommissionListComponent_1.prototype.closeDetail = function () {
            this.detailVisible = false;
            this.selectedCommission = null;
        };
        CommissionListComponent_1.prototype.loadDropdowns = function () {
            var _this = this;
            this.commissionService.getAgents().subscribe(function (a) { return (_this.agents = a); });
            this.commissionService.getSuperAgents().subscribe(function (sa) { return (_this.superAgents = sa); });
        };
        CommissionListComponent_1.prototype.loadData = function () {
            var _this = this;
            this.isLoading = true;
            this.commissionService
                .getFilteredCommissions(this.filter, this.sort, this.page, this.pageSize)
                .pipe(takeUntil(this.destroy$))
                .subscribe(function (result) {
                _this.commissions = result.items;
                _this.total = result.total;
                _this.isLoading = false;
            });
        };
        Object.defineProperty(CommissionListComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.total / this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionListComponent_1.prototype, "pages", {
            get: function () {
                var total = this.totalPages;
                var current = this.page;
                var delta = 2;
                var range = [];
                for (var i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
                    range.push(i);
                }
                return range;
            },
            enumerable: false,
            configurable: true
        });
        CommissionListComponent_1.prototype.formatBif = function (amount) {
            return "".concat(amount.toLocaleString('fr-FR'), " BIF");
        };
        CommissionListComponent_1.prototype.formatDate = function (dateStr) {
            var d = new Date(dateStr);
            return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        };
        CommissionListComponent_1.prototype.formatDateShort = function (dateStr) {
            if (!dateStr)
                return '-';
            var d = new Date(dateStr);
            return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
        };
        CommissionListComponent_1.prototype.statusLabel = function (status) {
            var labels = { PENDING: 'En Attente', CREDITED: 'Crédité', FAILED: 'Échoué' };
            return labels[status] || status;
        };
        CommissionListComponent_1.prototype.typeLabel = function (type) {
            var labels = { AGENT_COMMISSION: 'Agent', SUPER_AGENT_COMMISSION: 'Super Agent' };
            return labels[type] || type;
        };
        CommissionListComponent_1.prototype.getStatusClass = function (status) {
            return "badge-".concat(status.toLowerCase());
        };
        CommissionListComponent_1.prototype.getSortIcon = function (column) {
            if (this.sort.column !== column)
                return 'bi-arrow-down-up text-muted';
            return this.sort.direction === 'asc' ? 'bi-sort-up' : 'bi-sort-down';
        };
        return CommissionListComponent_1;
    }());
    __setFunctionName(_classThis, "CommissionListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionListComponent = _classThis;
}();
export { CommissionListComponent };
//# sourceMappingURL=commission-list.component.js.map