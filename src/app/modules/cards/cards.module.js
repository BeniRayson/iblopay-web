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
import { CardsRoutingModule } from './cards-routing.module';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { CardActivationComponent } from './pages/card-activation/card-activation.component';
import { CardDistributionComponent } from './pages/card-distribution/card-distribution.component';
import { CardStockComponent } from './pages/card-stock/card-stock.component';
import { CardPreviewComponent } from './components/card-preview/card-preview.component';
import { CardStatusComponent } from './components/card-status/card-status.component';
import { CardQrScannerComponent } from './components/card-qr-scanner/card-qr-scanner.component';
import { CardTypeBadgeComponent } from './components/card-type-badge/card-type-badge.component';
import { CardTableComponent } from './components/card-table/card-table.component';
var CardsModule = function () {
    var _classDecorators = [NgModule({
            declarations: [
                CardListComponent,
                CardDetailComponent,
                CardActivationComponent,
                CardDistributionComponent,
                CardStockComponent,
                CardPreviewComponent,
                CardStatusComponent,
                CardQrScannerComponent,
                CardTypeBadgeComponent,
                CardTableComponent
            ],
            imports: [CommonModule, FormsModule, CardsRoutingModule]
            // CardService is providedIn: 'root', so it doesn't need to be listed here.
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardsModule = _classThis = /** @class */ (function () {
        function CardsModule_1() {
        }
        return CardsModule_1;
    }());
    __setFunctionName(_classThis, "CardsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardsModule = _classThis;
}();
export { CardsModule };
//# sourceMappingURL=cards.module.js.map