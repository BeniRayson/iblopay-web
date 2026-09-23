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
// src/app/modules/agents/components/agent-card/agent-card.component.ts
import { Component, Input } from '@angular/core';
var AgentCardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-card',
            template: "\n    <div class=\"agent-card\">\n      <div class=\"card-header\">\n        <div class=\"agent-avatar\">\n          {{ agent?.firstName?.[0] }}{{ agent?.lastName?.[0] }}\n        </div>\n        <div class=\"agent-info\">\n          <h3>{{ agent?.firstName }} {{ agent?.lastName }}</h3>\n          <p>{{ agent?.code }}</p>\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <p><strong>Email:</strong> {{ agent?.email }}</p>\n        <p><strong>T\u00E9l\u00E9phone:</strong> {{ agent?.phone }}</p>\n        <p><strong>Statut:</strong> {{ getStatusLabel(agent?.status) }}</p>\n      </div>\n    </div>\n  ",
            styles: ["\n    .agent-card {\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n      padding: 16px;\n      margin: 8px;\n      transition: transform 0.2s;\n      \n      &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 4px 8px rgba(0,0,0,0.15);\n      }\n    }\n    .card-header {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      margin-bottom: 12px;\n    }\n    .agent-avatar {\n      width: 50px;\n      height: 50px;\n      border-radius: 50%;\n      background: #1a237e;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-weight: bold;\n      font-size: 18px;\n      flex-shrink: 0;\n    }\n    .agent-info {\n      h3 {\n        margin: 0;\n        font-size: 16px;\n        color: #1a237e;\n      }\n      p {\n        margin: 4px 0 0;\n        color: #666;\n        font-size: 12px;\n      }\n    }\n    .card-body {\n      p {\n        margin: 6px 0;\n        font-size: 14px;\n        color: #444;\n        \n        strong {\n          color: #666;\n        }\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _agent_decorators;
    var _agent_initializers = [];
    var _agent_extraInitializers = [];
    var AgentCardComponent = _classThis = /** @class */ (function () {
        function AgentCardComponent_1() {
            this.agent = __runInitializers(this, _agent_initializers, void 0);
            __runInitializers(this, _agent_extraInitializers);
        }
        AgentCardComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'PENDING': 'En attente',
                'SUSPENDED': 'Suspendu',
                'BLOCKED': 'Bloqué',
                'INACTIVE': 'Inactif',
                'TERMINATED': 'Résilié'
            };
            return labels[status || ''] || status || 'Inconnu';
        };
        return AgentCardComponent_1;
    }());
    __setFunctionName(_classThis, "AgentCardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _agent_decorators = [Input()];
        __esDecorate(null, null, _agent_decorators, { kind: "field", name: "agent", static: false, private: false, access: { has: function (obj) { return "agent" in obj; }, get: function (obj) { return obj.agent; }, set: function (obj, value) { obj.agent = value; } }, metadata: _metadata }, _agent_initializers, _agent_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentCardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentCardComponent = _classThis;
}();
export { AgentCardComponent };
//# sourceMappingURL=agent-card.component.js.map