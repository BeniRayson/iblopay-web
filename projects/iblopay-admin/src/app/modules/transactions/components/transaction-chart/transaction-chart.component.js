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
import { Component, Input } from '@angular/core';
import { TRANSACTION_TYPE_META } from '../../transactions.constants';
var TransactionChartComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-chart',
            templateUrl: './transaction-chart.component.html',
            styleUrls: ['./transaction-chart.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _summary_decorators;
    var _summary_initializers = [];
    var _summary_extraInitializers = [];
    var TransactionChartComponent = _classThis = /** @class */ (function () {
        function TransactionChartComponent_1() {
            this.summary = __runInitializers(this, _summary_initializers, null);
            __runInitializers(this, _summary_extraInitializers);
        }
        Object.defineProperty(TransactionChartComponent_1.prototype, "bars", {
            get: function () {
                if (!this.summary)
                    return [];
                var entries = Object.entries(this.summary.countByType);
                var max = Math.max.apply(Math, __spreadArray([1], entries.map(function (_a) {
                    var count = _a[1];
                    return count;
                }), false));
                return entries
                    .filter(function (_a) {
                    var count = _a[1];
                    return count > 0;
                })
                    .sort(function (_a, _b) {
                    var a = _a[1];
                    var b = _b[1];
                    return b - a;
                })
                    .map(function (_a) {
                    var type = _a[0], count = _a[1];
                    return ({
                        label: TRANSACTION_TYPE_META[type].label,
                        icon: TRANSACTION_TYPE_META[type].icon,
                        count: count,
                        widthPercent: (count / max) * 100
                    });
                });
            },
            enumerable: false,
            configurable: true
        });
        return TransactionChartComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionChartComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _summary_decorators = [Input()];
        __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: function (obj) { return "summary" in obj; }, get: function (obj) { return obj.summary; }, set: function (obj, value) { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionChartComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionChartComponent = _classThis;
}();
export { TransactionChartComponent };
//# sourceMappingURL=transaction-chart.component.js.map