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
var ProvinceListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-province-list',
            template: "\n    <div class=\"province-list\">\n      <div class=\"list-header\" *ngIf=\"totalLabel\">\n        <span class=\"total-label\">{{ totalLabel }}</span>\n        <span class=\"total-value\" [class]=\"colorClass\">{{ total | number:'1.0-0':'fr' }} Fbu</span>\n        <span class=\"change-badge\" [class.positive]=\"change >= 0\" [class.negative]=\"change < 0\" *ngIf=\"change !== 0\">\n          {{ change > 0 ? '+' : '' }}{{ change }}%\n        </span>\n      </div>\n      <div class=\"province-items\">\n        <div class=\"province-item\" *ngFor=\"let item of data\">\n          <span class=\"province-name\">\n            <i class=\"fa-solid fa-location-dot\"></i>\n            {{ item.name }}\n          </span>\n          <span class=\"province-amount\" [class]=\"item.color || getColorClass(item.amount)\">\n            {{ item.amount | number:'1.0-0':'fr' }} Fbu\n          </span>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .province-list {\n      display: flex;\n      flex-direction: column;\n      flex: 1;\n    }\n    .province-list .list-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n    }\n    .province-list .list-header .total-label {\n      font-size: 13px;\n      color: #8896b3;\n    }\n    .province-list .list-header .total-value {\n      font-size: 18px;\n      font-weight: 800;\n    }\n    .province-list .list-header .total-value.green { color: #22c55e; }\n    .province-list .list-header .total-value.blue { color: #60a5fa; }\n    .province-list .list-header .total-value.purple { color: #a855f7; }\n    .province-list .list-header .total-value.gold { color: #f5c842; }\n    .province-list .list-header .total-value.orange { color: #f97316; }\n    .province-list .list-header .total-value.cyan { color: #06b6d4; }\n    .province-list .list-header .change-badge {\n      font-size: 11px;\n      font-weight: 600;\n    }\n    .province-list .list-header .change-badge.positive { color: #22c55e; }\n    .province-list .list-header .change-badge.negative { color: #ef4444; }\n    .province-list .province-items {\n      flex: 1;\n    }\n    .province-list .province-items .province-item {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 5px 8px;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.04);\n      font-size: 12px;\n      transition: all 0.3s ease;\n      border-radius: 4px;\n    }\n    .province-list .province-items .province-item:hover {\n      background: rgba(255, 255, 255, 0.04);\n      padding-left: 12px;\n    }\n    .province-list .province-items .province-item .province-name {\n      color: #8896b3;\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n    .province-list .province-items .province-item .province-name i {\n      font-size: 14px;\n      opacity: 0.7;\n    }\n    .province-list .province-items .province-item .province-amount {\n      font-weight: 700;\n      font-size: 12px;\n      font-family: 'Inter', monospace;\n    }\n    .province-list .province-items .province-item .province-amount.green { color: #22c55e; }\n    .province-list .province-items .province-item .province-amount.blue { color: #60a5fa; }\n    .province-list .province-items .province-item .province-amount.orange { color: #f97316; }\n    .province-list .province-items .province-item .province-amount.purple { color: #a855f7; }\n    .province-list .province-items .province-item .province-amount.gold { color: #f5c842; }\n    .province-list .province-items .province-item .province-amount.cyan { color: #06b6d4; }\n    :host-context(body.light-mode) .province-item .province-name {\n      color: #475569;\n    }\n    :host-context(body.light-mode) .province-item .province-amount {\n      color: #0f172a;\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _totalLabel_decorators;
    var _totalLabel_initializers = [];
    var _totalLabel_extraInitializers = [];
    var _colorClass_decorators;
    var _colorClass_initializers = [];
    var _colorClass_extraInitializers = [];
    var _showTotal_decorators;
    var _showTotal_initializers = [];
    var _showTotal_extraInitializers = [];
    var _change_decorators;
    var _change_initializers = [];
    var _change_extraInitializers = [];
    var ProvinceListComponent = _classThis = /** @class */ (function () {
        function ProvinceListComponent_1() {
            this.data = __runInitializers(this, _data_initializers, []);
            this.total = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _total_initializers, 0));
            this.totalLabel = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _totalLabel_initializers, 'Total'));
            this.colorClass = (__runInitializers(this, _totalLabel_extraInitializers), __runInitializers(this, _colorClass_initializers, 'green'));
            this.showTotal = (__runInitializers(this, _colorClass_extraInitializers), __runInitializers(this, _showTotal_initializers, true));
            this.change = (__runInitializers(this, _showTotal_extraInitializers), __runInitializers(this, _change_initializers, 0));
            __runInitializers(this, _change_extraInitializers);
        }
        ProvinceListComponent_1.prototype.ngOnInit = function () { };
        ProvinceListComponent_1.prototype.getColorClass = function (amount) {
            if (amount > 50000000)
                return 'gold';
            if (amount > 25000000)
                return 'blue';
            if (amount > 10000000)
                return 'green';
            if (amount > 5000000)
                return 'orange';
            return 'purple';
        };
        ProvinceListComponent_1.prototype.formatAmount = function (amount) {
            return amount.toLocaleString('fr-FR') + ' Fbu';
        };
        return ProvinceListComponent_1;
    }());
    __setFunctionName(_classThis, "ProvinceListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _data_decorators = [Input()];
        _total_decorators = [Input()];
        _totalLabel_decorators = [Input()];
        _colorClass_decorators = [Input()];
        _showTotal_decorators = [Input()];
        _change_decorators = [Input()];
        __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _totalLabel_decorators, { kind: "field", name: "totalLabel", static: false, private: false, access: { has: function (obj) { return "totalLabel" in obj; }, get: function (obj) { return obj.totalLabel; }, set: function (obj, value) { obj.totalLabel = value; } }, metadata: _metadata }, _totalLabel_initializers, _totalLabel_extraInitializers);
        __esDecorate(null, null, _colorClass_decorators, { kind: "field", name: "colorClass", static: false, private: false, access: { has: function (obj) { return "colorClass" in obj; }, get: function (obj) { return obj.colorClass; }, set: function (obj, value) { obj.colorClass = value; } }, metadata: _metadata }, _colorClass_initializers, _colorClass_extraInitializers);
        __esDecorate(null, null, _showTotal_decorators, { kind: "field", name: "showTotal", static: false, private: false, access: { has: function (obj) { return "showTotal" in obj; }, get: function (obj) { return obj.showTotal; }, set: function (obj, value) { obj.showTotal = value; } }, metadata: _metadata }, _showTotal_initializers, _showTotal_extraInitializers);
        __esDecorate(null, null, _change_decorators, { kind: "field", name: "change", static: false, private: false, access: { has: function (obj) { return "change" in obj; }, get: function (obj) { return obj.change; }, set: function (obj, value) { obj.change = value; } }, metadata: _metadata }, _change_initializers, _change_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProvinceListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProvinceListComponent = _classThis;
}();
export { ProvinceListComponent };
//# sourceMappingURL=province-list.component.js.map