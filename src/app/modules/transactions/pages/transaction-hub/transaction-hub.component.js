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
var TransactionHubComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-hub',
            templateUrl: './transaction-hub.component.html',
            styleUrls: ['./transaction-hub.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionHubComponent = _classThis = /** @class */ (function () {
        function TransactionHubComponent_1(hubService) {
            this.hubService = hubService;
            this.kpiCards = [];
            this.quickActions = [];
            this.transactions = [];
            this.totalTransactions = 0;
            this.currentPage = 1;
            this.selectedDetail = null;
            this.detailVisible = false;
            this.traceability = null;
            this.topActors = [];
            this.operationTypes = [];
            this.alerts = [];
            this.systemActivities = [];
            this.chartLabels = [];
            this.chartValues = [];
            this.isLoading = true;
        }
        TransactionHubComponent_1.prototype.ngOnInit = function () {
            this.loadAll();
        };
        TransactionHubComponent_1.prototype.loadAll = function () {
            var _this = this;
            this.isLoading = true;
            this.hubService.getKpiData().subscribe(function (data) {
                _this.kpiCards = Object.values(data);
            });
            this.hubService.getQuickActions().subscribe(function (actions) {
                _this.quickActions = actions;
            });
            this.hubService.getTransactionsTable(1).subscribe(function (result) {
                _this.transactions = result.items;
                _this.totalTransactions = result.total;
            });
            this.hubService.getTraceability().subscribe(function (data) {
                _this.traceability = data;
            });
            this.hubService.getTopActors('super-agents').subscribe(function (actors) {
                _this.topActors = actors;
            });
            this.hubService.getOperationTypes().subscribe(function (types) {
                _this.operationTypes = types;
            });
            this.hubService.getAlerts().subscribe(function (alerts) {
                _this.alerts = alerts;
            });
            this.hubService.getSystemActivities().subscribe(function (activities) {
                _this.systemActivities = activities;
            });
            this.hubService.getVolumeChartData('today').subscribe(function (chart) {
                _this.chartLabels = chart.labels;
                _this.chartValues = chart.values;
            });
            this.isLoading = false;
        };
        TransactionHubComponent_1.prototype.onPageChange = function (page) {
            var _this = this;
            this.currentPage = page;
            this.hubService.getTransactionsTable(page).subscribe(function (result) {
                _this.transactions = result.items;
            });
        };
        TransactionHubComponent_1.prototype.onRowClick = function (transactionNo) {
            var _this = this;
            this.hubService.getTransactionDetail(transactionNo).subscribe(function (detail) {
                _this.selectedDetail = detail;
                _this.detailVisible = true;
            });
        };
        TransactionHubComponent_1.prototype.onReverseClick = function (transactionNo) {
            // Placeholder for reverse transaction logic
            console.log('Reverse transaction:', transactionNo);
            // In production, this would call a service to reverse the transaction
        };
        TransactionHubComponent_1.prototype.closeDetail = function () {
            this.detailVisible = false;
            this.selectedDetail = null;
        };
        return TransactionHubComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionHubComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionHubComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionHubComponent = _classThis;
}();
export { TransactionHubComponent };
//# sourceMappingURL=transaction-hub.component.js.map