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
// Stub: no scanning library wired up yet. Emits scannedUid when integrated
// with e.g. ngx-scanner / zxing. Kept as a component so card-activation can
// already depend on the (selector, output) contract.
var CardQrScannerComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-card-qr-scanner',
            templateUrl: './card-qr-scanner.component.html',
            styleUrls: ['./card-qr-scanner.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _scannedUid_decorators;
    var _scannedUid_initializers = [];
    var _scannedUid_extraInitializers = [];
    var CardQrScannerComponent = _classThis = /** @class */ (function () {
        function CardQrScannerComponent_1() {
            this.scannedUid = __runInitializers(this, _scannedUid_initializers, new EventEmitter());
            __runInitializers(this, _scannedUid_extraInitializers);
        }
        return CardQrScannerComponent_1;
    }());
    __setFunctionName(_classThis, "CardQrScannerComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scannedUid_decorators = [Output()];
        __esDecorate(null, null, _scannedUid_decorators, { kind: "field", name: "scannedUid", static: false, private: false, access: { has: function (obj) { return "scannedUid" in obj; }, get: function (obj) { return obj.scannedUid; }, set: function (obj, value) { obj.scannedUid = value; } }, metadata: _metadata }, _scannedUid_initializers, _scannedUid_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardQrScannerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardQrScannerComponent = _classThis;
}();
export { CardQrScannerComponent };
//# sourceMappingURL=card-qr-scanner.component.js.map