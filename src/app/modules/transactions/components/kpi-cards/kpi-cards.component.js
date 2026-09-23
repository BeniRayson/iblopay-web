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
import { Component, Input } from '@angular/core';
var KpiCardsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-kpi-cards',
            templateUrl: './kpi-cards.component.html',
            styleUrls: ['./kpi-cards.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _cards_decorators;
    var _cards_initializers = [];
    var _cards_extraInitializers = [];
    var KpiCardsComponent = _classThis = /** @class */ (function () {
        function KpiCardsComponent_1() {
            this.cards = __runInitializers(this, _cards_initializers, []);
            __runInitializers(this, _cards_extraInitializers);
        }
        Object.defineProperty(KpiCardsComponent_1.prototype, "maxSparkline", {
            get: function () {
                var max = 0;
                for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
                    var card = _a[_i];
                    if (card.sparkline) {
                        for (var _b = 0, _c = card.sparkline; _b < _c.length; _b++) {
                            var v = _c[_b];
                            if (v > max)
                                max = v;
                        }
                    }
                }
                return max || 1;
            },
            enumerable: false,
            configurable: true
        });
        return KpiCardsComponent_1;
    }());
    __setFunctionName(_classThis, "KpiCardsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _cards_decorators = [Input()];
        __esDecorate(null, null, _cards_decorators, { kind: "field", name: "cards", static: false, private: false, access: { has: function (obj) { return "cards" in obj; }, get: function (obj) { return obj.cards; }, set: function (obj, value) { obj.cards = value; } }, metadata: _metadata }, _cards_initializers, _cards_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        KpiCardsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return KpiCardsComponent = _classThis;
}();
export { KpiCardsComponent };
//# sourceMappingURL=kpi-cards.component.js.map