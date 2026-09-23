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
var StatCardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-stat-card',
            template: "\n    <div class=\"stat-card\" [class.highlight]=\"stat.highlight\" [class.services]=\"stat.isService\">\n      <div class=\"stat-top\">\n        <div class=\"stat-icon\" [style.background]=\"'linear-gradient(135deg, ' + getIconColor(stat.iconColor) + ', ' + getIconColor(stat.iconColor) + 'dd)'\">\n          <i [class]=\"stat.icon\"></i>\n        </div>\n        <div class=\"stat-label\">{{ stat.label }}</div>\n      </div>\n      <div class=\"stat-value\">{{ formatNumber(stat.value) }}</div>\n      <div class=\"stat-change\" [class.positive]=\"stat.change >= 0\" [class.negative]=\"stat.change < 0\">\n        {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%\n        <span class=\"stat-change-sub\">{{ stat.changeLabel }}</span>\n      </div>\n      <div class=\"stat-footer\">\n        <a [routerLink]=\"stat.link\" class=\"voir-plus\">Voir plus <i class=\"fa-solid fa-arrow-right\"></i></a>\n      </div>\n    </div>\n  ",
            styles: ["\n    .stat-card {\n      background: linear-gradient(180deg, rgba(18, 40, 66, 0.95), rgba(10, 28, 49, 0.95));\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      border-radius: 12px;\n      padding: 12px;\n      transition: all 0.3s ease;\n      cursor: default;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);\n      position: relative;\n      overflow: hidden;\n    }\n    .stat-card::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: linear-gradient(90deg, transparent, #3b82f6, transparent);\n      opacity: 0;\n      transition: all 0.3s ease;\n    }\n    .stat-card:hover {\n      transform: translateY(-4px);\n      border-color: #243150;\n      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);\n    }\n    .stat-card:hover::before {\n      opacity: 1;\n    }\n    .stat-card:hover .stat-icon {\n      transform: scale(1.05) rotate(-3deg);\n    }\n    .stat-card.highlight {\n      border-color: #fbbf24;\n      box-shadow: 0 0 30px rgba(251, 191, 36, 0.15);\n    }\n    .stat-card.highlight::before {\n      background: linear-gradient(90deg, transparent, #f5c842, transparent);\n      opacity: 1;\n    }\n    .stat-card.highlight .stat-label {\n      color: #f5c842;\n      font-weight: 700;\n      letter-spacing: 0.4px;\n      font-size: 10px;\n    }\n    .stat-card.highlight .stat-value {\n      font-size: 20px;\n      color: #f5c842;\n    }\n    .stat-card.services {\n      border-color: #ec4899;\n      box-shadow: 0 0 30px rgba(236, 72, 153, 0.15);\n    }\n    .stat-card.services::before {\n      background: linear-gradient(90deg, transparent, #ec4899, transparent);\n      opacity: 1;\n    }\n    .stat-card.services .stat-label {\n      color: #ec4899;\n      font-weight: 700;\n      letter-spacing: 0.4px;\n      font-size: 10px;\n    }\n    .stat-card.services .stat-value {\n      font-size: 20px;\n      color: #ec4899;\n    }\n    .stat-card .stat-top {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      margin-bottom: 4px;\n    }\n    .stat-card .stat-top .stat-icon {\n      width: 34px;\n      height: 34px;\n      border-radius: 10px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      flex-shrink: 0;\n      transition: all 0.3s ease;\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);\n      color: #fff;\n    }\n    .stat-card .stat-top .stat-label {\n      font-size: 9px;\n      color: #8896b3;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.4px;\n    }\n    .stat-card .stat-value {\n      font-size: 18px;\n      font-weight: 800;\n      color: #fff;\n      margin: 2px 0 2px;\n      letter-spacing: -0.3px;\n      line-height: 1.1;\n    }\n    .stat-card .stat-change {\n      font-size: 10px;\n      font-weight: 600;\n      line-height: 1.3;\n    }\n    .stat-card .stat-change.positive {\n      color: #22c55e;\n    }\n    .stat-card .stat-change.negative {\n      color: #ef4444;\n    }\n    .stat-card .stat-change .stat-change-sub {\n      font-size: 9px;\n      color: #5c6986;\n      margin-left: 3px;\n      font-weight: 400;\n    }\n    .stat-card .stat-footer {\n      margin-top: 6px;\n      padding-top: 6px;\n      border-top: 1px solid rgba(255, 255, 255, 0.06);\n      display: flex;\n      justify-content: center;\n    }\n    .stat-card .stat-footer .voir-plus {\n      font-size: 9px;\n      color: #60a5fa;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      padding: 2px 10px;\n      border-radius: 4px;\n      text-decoration: none;\n      display: flex;\n      align-items: center;\n      gap: 4px;\n    }\n    .stat-card .stat-footer .voir-plus:hover {\n      color: #fff;\n      background: rgba(59, 130, 246, 0.15);\n    }\n    .stat-card .stat-footer .voir-plus.pink:hover {\n      background: rgba(236, 72, 153, 0.15);\n    }\n    :host-context(body.light-mode) .stat-card {\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));\n      border-color: #e2e8f0;\n    }\n    :host-context(body.light-mode) .stat-card .stat-value {\n      color: #0f172a;\n    }\n    :host-context(body.light-mode) .stat-card .stat-label {\n      color: #475569;\n    }\n    :host-context(body.light-mode) .stat-card.highlight {\n      border-color: #fbbf24;\n      box-shadow: 0 0 30px rgba(251, 191, 36, 0.15);\n    }\n    :host-context(body.light-mode) .stat-card.highlight .stat-value {\n      color: #b77900;\n    }\n    :host-context(body.light-mode) .stat-card.highlight .stat-label {\n      color: #b77900;\n    }\n    :host-context(body.light-mode) .stat-card.services {\n      border-color: #ec4899;\n      box-shadow: 0 0 30px rgba(236, 72, 153, 0.15);\n    }\n    :host-context(body.light-mode) .stat-card.services .stat-value {\n      color: #be185d;\n    }\n    :host-context(body.light-mode) .stat-card.services .stat-label {\n      color: #be185d;\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _stat_decorators;
    var _stat_initializers = [];
    var _stat_extraInitializers = [];
    var StatCardComponent = _classThis = /** @class */ (function () {
        function StatCardComponent_1() {
            this.stat = __runInitializers(this, _stat_initializers, void 0);
            __runInitializers(this, _stat_extraInitializers);
        }
        StatCardComponent_1.prototype.ngOnInit = function () { };
        StatCardComponent_1.prototype.getIconColor = function (color) {
            var colors = {
                blue: '#3b82f6',
                green: '#22c55e',
                purple: '#a855f7',
                orange: '#f97316',
                teal: '#14b8a6',
                cyan: '#06b6d4',
                gold: '#f5c842',
                pink: '#ec4899'
            };
            return colors[color] || '#3b82f6';
        };
        StatCardComponent_1.prototype.formatNumber = function (value) {
            if (typeof value === 'string') {
                return value;
            }
            return value.toLocaleString('fr-FR');
        };
        return StatCardComponent_1;
    }());
    __setFunctionName(_classThis, "StatCardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _stat_decorators = [Input()];
        __esDecorate(null, null, _stat_decorators, { kind: "field", name: "stat", static: false, private: false, access: { has: function (obj) { return "stat" in obj; }, get: function (obj) { return obj.stat; }, set: function (obj, value) { obj.stat = value; } }, metadata: _metadata }, _stat_initializers, _stat_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StatCardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StatCardComponent = _classThis;
}();
export { StatCardComponent };
//# sourceMappingURL=stat-card.component.js.map