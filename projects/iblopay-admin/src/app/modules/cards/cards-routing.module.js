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
import { RouterModule } from '@angular/router';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { CardActivationComponent } from './pages/card-activation/card-activation.component';
import { CardDistributionComponent } from './pages/card-distribution/card-distribution.component';
import { CardStockComponent } from './pages/card-stock/card-stock.component';
// IMPORTANT: 'stock' / 'distribution' / 'activation' must stay ABOVE ':id',
// otherwise the ':id' route swallows them (e.g. a request for /cards/stock
// would resolve as card detail for id="stock").
var routes = [
    { path: '', component: CardListComponent },
    { path: 'stock', component: CardStockComponent },
    { path: 'distribution', component: CardDistributionComponent },
    { path: 'activation', component: CardActivationComponent },
    { path: ':id', component: CardDetailComponent }
];
var CardsRoutingModule = function () {
    var _classDecorators = [NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardsRoutingModule = _classThis = /** @class */ (function () {
        function CardsRoutingModule_1() {
        }
        return CardsRoutingModule_1;
    }());
    __setFunctionName(_classThis, "CardsRoutingModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardsRoutingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardsRoutingModule = _classThis;
}();
export { CardsRoutingModule };
//# sourceMappingURL=cards-routing.module.js.map