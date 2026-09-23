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
var HierarchyComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-hierarchy',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './hierarchy.component.html',
            styleUrls: ['./hierarchy.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HierarchyComponent = _classThis = /** @class */ (function () {
        function HierarchyComponent_1(commissionService) {
            this.commissionService = commissionService;
            this.hierarchies = [];
            this.isLoading = true;
            this.expandedSuperAgent = null;
            this.expandedAgent = null;
            this.activeView = 'admin';
            this.destroy$ = new Subject();
        }
        HierarchyComponent_1.prototype.ngOnInit = function () {
            this.loadData();
        };
        HierarchyComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        HierarchyComponent_1.prototype.onViewChange = function (view) {
            this.activeView = view;
        };
        HierarchyComponent_1.prototype.toggleSuperAgent = function (superAgentId) {
            this.expandedSuperAgent = this.expandedSuperAgent === superAgentId ? null : superAgentId;
            this.expandedAgent = null;
        };
        HierarchyComponent_1.prototype.toggleAgent = function (agentId) {
            this.expandedAgent = this.expandedAgent === agentId ? null : agentId;
        };
        HierarchyComponent_1.prototype.loadData = function () {
            var _this = this;
            this.isLoading = true;
            this.commissionService
                .getAgentHierarchy()
                .pipe(takeUntil(this.destroy$))
                .subscribe(function (data) {
                _this.hierarchies = data;
                _this.isLoading = false;
            });
        };
        HierarchyComponent_1.prototype.formatBif = function (amount) {
            return "".concat(amount.toLocaleString('fr-FR'), " BIF");
        };
        HierarchyComponent_1.prototype.formatDate = function (dateStr) {
            var d = new Date(dateStr);
            return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        };
        HierarchyComponent_1.prototype.statusLabel = function (status) {
            var labels = { PENDING: 'En Attente', CREDITED: 'Crédité', FAILED: 'Échoué' };
            return labels[status] || status;
        };
        HierarchyComponent_1.prototype.getStatusClass = function (status) {
            return "badge-".concat(status.toLowerCase());
        };
        return HierarchyComponent_1;
    }());
    __setFunctionName(_classThis, "HierarchyComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HierarchyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HierarchyComponent = _classThis;
}();
export { HierarchyComponent };
//# sourceMappingURL=hierarchy.component.js.map