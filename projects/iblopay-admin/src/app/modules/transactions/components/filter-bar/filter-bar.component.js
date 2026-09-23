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
import { Component, EventEmitter, Output } from '@angular/core';
var FilterBarComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-filter-bar',
            templateUrl: './filter-bar.component.html',
            styleUrls: ['./filter-bar.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _filterChange_decorators;
    var _filterChange_initializers = [];
    var _filterChange_extraInitializers = [];
    var _advancedFilters_decorators;
    var _advancedFilters_initializers = [];
    var _advancedFilters_extraInitializers = [];
    var FilterBarComponent = _classThis = /** @class */ (function () {
        function FilterBarComponent_1() {
            this.filterChange = __runInitializers(this, _filterChange_initializers, new EventEmitter());
            this.advancedFilters = (__runInitializers(this, _filterChange_extraInitializers), __runInitializers(this, _advancedFilters_initializers, new EventEmitter()));
            this.filter = (__runInitializers(this, _advancedFilters_extraInitializers), {
                search: '',
                type: 'Tous',
                actor: 'Tous',
                role: 'Tous',
                status: 'Tous',
                dateFrom: '01/06/2024',
                dateTo: '18/06/2024'
            });
            this.types = ['Tous', 'Transfert', 'Cash In', 'Cash Out', 'Paiement', 'Appro. SA', 'Paiement facture'];
            this.actors = ['Tous', 'Clients', 'Agents', 'Super Agents', 'Marchands', 'Admin'];
            this.roles = ['Tous', 'Expéditeur', 'Destinataire'];
            this.statuses = ['Tous', 'Réussie', 'En attente', 'Échouée'];
        }
        FilterBarComponent_1.prototype.emitChange = function () {
            this.filterChange.emit(__assign({}, this.filter));
        };
        FilterBarComponent_1.prototype.reset = function () {
            this.filter = { search: '', type: 'Tous', actor: 'Tous', role: 'Tous', status: 'Tous', dateFrom: '', dateTo: '' };
            this.emitChange();
        };
        FilterBarComponent_1.prototype.onAdvancedFilters = function () {
            this.advancedFilters.emit();
        };
        return FilterBarComponent_1;
    }());
    __setFunctionName(_classThis, "FilterBarComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _filterChange_decorators = [Output()];
        _advancedFilters_decorators = [Output()];
        __esDecorate(null, null, _filterChange_decorators, { kind: "field", name: "filterChange", static: false, private: false, access: { has: function (obj) { return "filterChange" in obj; }, get: function (obj) { return obj.filterChange; }, set: function (obj, value) { obj.filterChange = value; } }, metadata: _metadata }, _filterChange_initializers, _filterChange_extraInitializers);
        __esDecorate(null, null, _advancedFilters_decorators, { kind: "field", name: "advancedFilters", static: false, private: false, access: { has: function (obj) { return "advancedFilters" in obj; }, get: function (obj) { return obj.advancedFilters; }, set: function (obj, value) { obj.advancedFilters = value; } }, metadata: _metadata }, _advancedFilters_initializers, _advancedFilters_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FilterBarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FilterBarComponent = _classThis;
}();
export { FilterBarComponent };
//# sourceMappingURL=filter-bar.component.js.map