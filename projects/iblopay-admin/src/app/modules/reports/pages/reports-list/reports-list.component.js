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
var ReportsListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-reports-list',
            standalone: true,
            imports: [CommonModule],
            templateUrl: './reports-list.component.html',
            styleUrls: ['./reports-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReportsListComponent = _classThis = /** @class */ (function () {
        function ReportsListComponent_1(dummy, router) {
            this.dummy = dummy;
            this.router = router;
            this.reports = [];
            this.filteredReports = [];
            this.currentRole = 'admin';
            this.categoryLabels = {};
            this.categoryColors = {};
            // Fixed display order for categories
            this.categoryOrder = [
                'financial',
                'commissions',
                'trust_account',
                'cash_management',
                'offline_pos',
                'compliance_audit',
                'kyc_users',
            ];
        }
        ReportsListComponent_1.prototype.ngOnInit = function () {
            this.reports = this.dummy.reports;
            this.categoryLabels = this.dummy.categoryLabels;
            this.categoryColors = this.dummy.categoryColors;
            this.applyRoleFilter();
        };
        ReportsListComponent_1.prototype.setRole = function (role) {
            this.currentRole = role;
            this.applyRoleFilter();
        };
        ReportsListComponent_1.prototype.applyRoleFilter = function () {
            var _this = this;
            this.filteredReports = this.reports.filter(function (r) { return r.roles.includes(_this.currentRole); });
        };
        ReportsListComponent_1.prototype.getCategoryKeys = function () {
            var available = new Set(this.filteredReports.map(function (r) { return r.category; }));
            return this.categoryOrder.filter(function (c) { return available.has(c); });
        };
        ReportsListComponent_1.prototype.getReportsByCategory = function (catKey) {
            return this.filteredReports.filter(function (r) { return r.category === catKey; });
        };
        ReportsListComponent_1.prototype.openReport = function (route) {
            this.router.navigate(['/reports', route]);
        };
        return ReportsListComponent_1;
    }());
    __setFunctionName(_classThis, "ReportsListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportsListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportsListComponent = _classThis;
}();
export { ReportsListComponent };
//# sourceMappingURL=reports-list.component.js.map