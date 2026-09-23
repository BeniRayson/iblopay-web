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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsRoutingModule } from './transactions-routing.module';
// Pages
import { TransactionHubComponent } from './pages/transaction-hub/transaction-hub.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './pages/transaction-detail/transaction-detail.component';
import { TransactionFiltersComponent } from './pages/transaction-filters/transaction-filters.component';
import { TransactionExportComponent } from './pages/transaction-export/transaction-export.component';
// Existing Components
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionStatusBadgeComponent } from './components/transaction-status-badge/transaction-status-badge.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';
// Hub Components
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { TraceabilityTimelineComponent } from './components/traceability-timeline/traceability-timeline.component';
import { VolumeChartComponent } from './components/volume-chart/volume-chart.component';
import { TopActorsComponent } from './components/top-actors/top-actors.component';
import { OperationTypesDonutComponent } from './components/operation-types-donut/operation-types-donut.component';
import { AlertsListComponent } from './components/alerts-list/alerts-list.component';
import { SystemActivitiesComponent } from './components/system-activities/system-activities.component';
var TransactionsModule = function () {
    var _classDecorators = [NgModule({
            declarations: [
                // Pages
                TransactionHubComponent,
                TransactionListComponent,
                TransactionDetailComponent,
                TransactionFiltersComponent,
                TransactionExportComponent,
                // Existing Components
                TransactionCardComponent,
                TransactionStatusBadgeComponent,
                TransactionChartComponent,
                TransactionSummaryComponent,
                // Hub Components
                KpiCardsComponent,
                QuickActionsComponent,
                FilterBarComponent,
                TransactionTableComponent,
                DetailPanelComponent,
                TraceabilityTimelineComponent,
                VolumeChartComponent,
                TopActorsComponent,
                OperationTypesDonutComponent,
                AlertsListComponent,
                SystemActivitiesComponent
            ],
            imports: [CommonModule, FormsModule, TransactionsRoutingModule]
            // TransactionService, TransactionExportService, and TransactionHubService
            // are all providedIn: 'root', so they don't need to be listed here.
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionsModule = _classThis = /** @class */ (function () {
        function TransactionsModule_1() {
        }
        return TransactionsModule_1;
    }());
    __setFunctionName(_classThis, "TransactionsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionsModule = _classThis;
}();
export { TransactionsModule };
//# sourceMappingURL=transactions.module.js.map