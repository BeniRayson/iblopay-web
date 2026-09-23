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
var QuickAccessComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-quick-access',
            template: "\n    <div class=\"quick-grid\">\n      <a *ngFor=\"let item of items\" [routerLink]=\"item.link\" class=\"quick-btn\" [class]=\"item.colorClass\">\n        <i class=\"qicon\" [class]=\"item.icon\"></i>\n        {{ item.label }}\n      </a>\n    </div>\n  ",
            styles: ["\n    .quick-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 11px;\n    }\n    .quick-btn {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 4px;\n      padding: 14px 8px;\n      border-radius: 14px;\n      font-size: 11px;\n      font-weight: 700;\n      text-align: center;\n      color: #fff;\n      transition: all 0.3s ease;\n      border: none;\n      cursor: pointer;\n      min-height: 82px;\n      position: relative;\n      overflow: hidden;\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.13);\n      text-decoration: none;\n    }\n    .quick-btn:hover {\n      transform: translateY(-4px) scale(1.02);\n      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);\n    }\n    .quick-btn .qicon {\n      font-size: 22px;\n      display: block;\n      margin-bottom: 2px;\n    }\n    .quick-btn.b1 { background: linear-gradient(135deg, #1d4ed8, #1e40af); }\n    .quick-btn.b2 { background: linear-gradient(135deg, #15803d, #166534); }\n    .quick-btn.b3 { background: linear-gradient(135deg, #a16207, #854d0e); }\n    .quick-btn.b4 { background: linear-gradient(135deg, #7e22ce, #6b21a8); }\n    .quick-btn.b5 { background: linear-gradient(135deg, #1e40af, #1e3a8a); }\n    .quick-btn.b6 { background: linear-gradient(135deg, #b91c1c, #991b1b); }\n    .quick-btn.b7 { background: linear-gradient(135deg, #0f766e, #115e59); }\n    .quick-btn.b8 { background: linear-gradient(135deg, #475569, #334155); }\n    .quick-btn.b9 { background: linear-gradient(135deg, #9a3412, #7c2d12); }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var QuickAccessComponent = _classThis = /** @class */ (function () {
        function QuickAccessComponent_1() {
            this.items = __runInitializers(this, _items_initializers, []);
            __runInitializers(this, _items_extraInitializers);
        }
        QuickAccessComponent_1.prototype.ngOnInit = function () { };
        return QuickAccessComponent_1;
    }());
    __setFunctionName(_classThis, "QuickAccessComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [Input()];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QuickAccessComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuickAccessComponent = _classThis;
}();
export { QuickAccessComponent };
//# sourceMappingURL=quick-access.component.js.map