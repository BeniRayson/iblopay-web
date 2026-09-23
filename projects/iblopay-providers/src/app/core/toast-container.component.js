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
var ToastContainerComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-toast-container',
            standalone: true,
            imports: [CommonModule],
            template: "\n    <div class=\"toast-stack\">\n      <div class=\"toast-card\" *ngFor=\"let t of toasts$ | async\" [ngClass]=\"t.type\">\n        <i [class]=\"t.icon\"></i>\n        <span>{{ t.message }}</span>\n        <button (click)=\"dismiss(t.id)\"><i class=\"fa-solid fa-xmark\"></i></button>\n      </div>\n    </div>\n  ",
            styles: ["\n    .toast-stack {\n      position: fixed;\n      top: 76px;\n      right: 24px;\n      z-index: 500;\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n      max-width: 320px;\n    }\n    .toast-card {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      background: var(--bg-card, #fff);\n      border: 1px solid var(--border-color, #e6e9f0);\n      border-radius: 12px;\n      padding: 12px 14px;\n      font-size: 13px;\n      font-weight: 600;\n      color: var(--text-primary, #0f172a);\n      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);\n      animation: slideIn 0.2s ease;\n    }\n    .toast-card.success { border-left: 3px solid #16a34a; }\n    .toast-card.success i:first-child { color: #16a34a; }\n    .toast-card.error { border-left: 3px solid #dc2626; }\n    .toast-card.error i:first-child { color: #dc2626; }\n    .toast-card.info { border-left: 3px solid #2563eb; }\n    .toast-card.info i:first-child { color: #2563eb; }\n    .toast-card span { flex: 1; }\n    .toast-card button {\n      background: transparent;\n      border: none;\n      color: var(--text-muted, #94a3b8);\n      cursor: pointer;\n      font-size: 11px;\n    }\n    @keyframes slideIn {\n      from { opacity: 0; transform: translateY(-8px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ToastContainerComponent = _classThis = /** @class */ (function () {
        function ToastContainerComponent_1(toastService) {
            this.toastService = toastService;
            this.toasts$ = this.toastService.toasts$;
        }
        ToastContainerComponent_1.prototype.dismiss = function (id) {
            this.toastService.dismiss(id);
        };
        return ToastContainerComponent_1;
    }());
    __setFunctionName(_classThis, "ToastContainerComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ToastContainerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ToastContainerComponent = _classThis;
}();
export { ToastContainerComponent };
//# sourceMappingURL=toast-container.component.js.map