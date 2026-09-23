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
import { CommonModule } from '@angular/common';
var IblopayWatermarkComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-iblopay-watermark',
            standalone: true,
            imports: [CommonModule],
            template: "\n    <div class=\"iblopay-watermark\" [class.small]=\"size === 'small'\">\n      <div class=\"iw-logo\">IB</div>\n      <span *ngIf=\"size !== 'small'\">IBLOPAY \u00B7 S\u00E9curis\u00E9</span>\n    </div>\n  ",
            styles: ["\n    .iblopay-watermark {\n      position: absolute;\n      bottom: 8px;\n      right: 8px;\n      display: flex;\n      align-items: center;\n      gap: 5px;\n      background: rgba(15, 23, 42, 0.72);\n      color: #fff;\n      padding: 4px 9px 4px 4px;\n      border-radius: 20px;\n      font-size: 10px;\n      font-weight: 700;\n      letter-spacing: 0.3px;\n      pointer-events: none;\n      user-select: none;\n      backdrop-filter: blur(2px);\n    }\n    .iw-logo {\n      width: 16px;\n      height: 16px;\n      border-radius: 5px;\n      background: linear-gradient(135deg, #2563eb, #7c3aed);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 8px;\n      font-weight: 800;\n    }\n    .iblopay-watermark.small {\n      padding: 3px;\n      bottom: 4px;\n      right: 4px;\n    }\n    .iblopay-watermark.small .iw-logo {\n      width: 14px;\n      height: 14px;\n      font-size: 7px;\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _size_decorators;
    var _size_initializers = [];
    var _size_extraInitializers = [];
    var IblopayWatermarkComponent = _classThis = /** @class */ (function () {
        function IblopayWatermarkComponent_1() {
            this.size = __runInitializers(this, _size_initializers, 'normal');
            __runInitializers(this, _size_extraInitializers);
        }
        return IblopayWatermarkComponent_1;
    }());
    __setFunctionName(_classThis, "IblopayWatermarkComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _size_decorators = [Input()];
        __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: function (obj) { return "size" in obj; }, get: function (obj) { return obj.size; }, set: function (obj, value) { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IblopayWatermarkComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IblopayWatermarkComponent = _classThis;
}();
export { IblopayWatermarkComponent };
//# sourceMappingURL=iblopay-watermark.component.js.map