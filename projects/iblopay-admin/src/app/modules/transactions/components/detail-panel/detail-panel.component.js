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
import { Component, EventEmitter, Input, Output } from '@angular/core';
var DetailPanelComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-detail-panel',
            templateUrl: './detail-panel.component.html',
            styleUrls: ['./detail-panel.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _detail_decorators;
    var _detail_initializers = [];
    var _detail_extraInitializers = [];
    var _visible_decorators;
    var _visible_initializers = [];
    var _visible_extraInitializers = [];
    var _close_decorators;
    var _close_initializers = [];
    var _close_extraInitializers = [];
    var DetailPanelComponent = _classThis = /** @class */ (function () {
        function DetailPanelComponent_1() {
            this.detail = __runInitializers(this, _detail_initializers, null);
            this.visible = (__runInitializers(this, _detail_extraInitializers), __runInitializers(this, _visible_initializers, false));
            this.close = (__runInitializers(this, _visible_extraInitializers), __runInitializers(this, _close_initializers, new EventEmitter()));
            __runInitializers(this, _close_extraInitializers);
        }
        return DetailPanelComponent_1;
    }());
    __setFunctionName(_classThis, "DetailPanelComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _detail_decorators = [Input()];
        _visible_decorators = [Input()];
        _close_decorators = [Output()];
        __esDecorate(null, null, _detail_decorators, { kind: "field", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; }, set: function (obj, value) { obj.detail = value; } }, metadata: _metadata }, _detail_initializers, _detail_extraInitializers);
        __esDecorate(null, null, _visible_decorators, { kind: "field", name: "visible", static: false, private: false, access: { has: function (obj) { return "visible" in obj; }, get: function (obj) { return obj.visible; }, set: function (obj, value) { obj.visible = value; } }, metadata: _metadata }, _visible_initializers, _visible_extraInitializers);
        __esDecorate(null, null, _close_decorators, { kind: "field", name: "close", static: false, private: false, access: { has: function (obj) { return "close" in obj; }, get: function (obj) { return obj.close; }, set: function (obj, value) { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DetailPanelComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DetailPanelComponent = _classThis;
}();
export { DetailPanelComponent };
//# sourceMappingURL=detail-panel.component.js.map