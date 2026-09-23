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
import { TransactionType } from '../../enums/transaction-type.enum';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { PaymentMode } from '../../enums/payment-mode.enum';
var TransactionFiltersComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-filters',
            templateUrl: './transaction-filters.component.html',
            styleUrls: ['./transaction-filters.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _filterChange_decorators;
    var _filterChange_initializers = [];
    var _filterChange_extraInitializers = [];
    var TransactionFiltersComponent = _classThis = /** @class */ (function () {
        function TransactionFiltersComponent_1() {
            this.filterChange = __runInitializers(this, _filterChange_initializers, new EventEmitter());
            this.types = (__runInitializers(this, _filterChange_extraInitializers), Object.values(TransactionType));
            this.statuses = Object.values(TransactionStatus);
            this.paymentModes = Object.values(PaymentMode);
            this.filter = {};
        }
        TransactionFiltersComponent_1.prototype.emitChange = function () {
            this.filterChange.emit(__assign(__assign({}, this.filter), { page: 1 }));
        };
        TransactionFiltersComponent_1.prototype.reset = function () {
            this.filter = {};
            this.emitChange();
        };
        return TransactionFiltersComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionFiltersComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _filterChange_decorators = [Output()];
        __esDecorate(null, null, _filterChange_decorators, { kind: "field", name: "filterChange", static: false, private: false, access: { has: function (obj) { return "filterChange" in obj; }, get: function (obj) { return obj.filterChange; }, set: function (obj, value) { obj.filterChange = value; } }, metadata: _metadata }, _filterChange_initializers, _filterChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionFiltersComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionFiltersComponent = _classThis;
}();
export { TransactionFiltersComponent };
//# sourceMappingURL=transaction-filters.component.js.map