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
// src/app/modules/agents/components/agent-stats/agent-stats.component.ts
import { Component, Input } from '@angular/core';
var AgentStatsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-stats',
            template: "\n    <div class=\"stats-container\">\n      <div class=\"stat-card\">\n        <div class=\"stat-number\">{{ totalAgents }}</div>\n        <div class=\"stat-label\">Total Agents</div>\n      </div>\n      <div class=\"stat-card\">\n        <div class=\"stat-number\">{{ activeAgents }}</div>\n        <div class=\"stat-label\">Agents Actifs</div>\n      </div>\n      <div class=\"stat-card\">\n        <div class=\"stat-number\">{{ pendingAgents }}</div>\n        <div class=\"stat-label\">En Attente</div>\n      </div>\n      <div class=\"stat-card\">\n        <div class=\"stat-number\">{{ blockedAgents }}</div>\n        <div class=\"stat-label\">Bloqu\u00E9s</div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .stats-container {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n      gap: 16px;\n      margin-bottom: 24px;\n    }\n    .stat-card {\n      background: white;\n      padding: 16px;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n      text-align: center;\n      \n      .stat-number {\n        font-size: 28px;\n        font-weight: bold;\n        color: #1a237e;\n      }\n      \n      .stat-label {\n        font-size: 14px;\n        color: #666;\n        margin-top: 4px;\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _totalAgents_decorators;
    var _totalAgents_initializers = [];
    var _totalAgents_extraInitializers = [];
    var _activeAgents_decorators;
    var _activeAgents_initializers = [];
    var _activeAgents_extraInitializers = [];
    var _pendingAgents_decorators;
    var _pendingAgents_initializers = [];
    var _pendingAgents_extraInitializers = [];
    var _blockedAgents_decorators;
    var _blockedAgents_initializers = [];
    var _blockedAgents_extraInitializers = [];
    var AgentStatsComponent = _classThis = /** @class */ (function () {
        function AgentStatsComponent_1() {
            this.totalAgents = __runInitializers(this, _totalAgents_initializers, 0);
            this.activeAgents = (__runInitializers(this, _totalAgents_extraInitializers), __runInitializers(this, _activeAgents_initializers, 0));
            this.pendingAgents = (__runInitializers(this, _activeAgents_extraInitializers), __runInitializers(this, _pendingAgents_initializers, 0));
            this.blockedAgents = (__runInitializers(this, _pendingAgents_extraInitializers), __runInitializers(this, _blockedAgents_initializers, 0));
            __runInitializers(this, _blockedAgents_extraInitializers);
        }
        return AgentStatsComponent_1;
    }());
    __setFunctionName(_classThis, "AgentStatsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _totalAgents_decorators = [Input()];
        _activeAgents_decorators = [Input()];
        _pendingAgents_decorators = [Input()];
        _blockedAgents_decorators = [Input()];
        __esDecorate(null, null, _totalAgents_decorators, { kind: "field", name: "totalAgents", static: false, private: false, access: { has: function (obj) { return "totalAgents" in obj; }, get: function (obj) { return obj.totalAgents; }, set: function (obj, value) { obj.totalAgents = value; } }, metadata: _metadata }, _totalAgents_initializers, _totalAgents_extraInitializers);
        __esDecorate(null, null, _activeAgents_decorators, { kind: "field", name: "activeAgents", static: false, private: false, access: { has: function (obj) { return "activeAgents" in obj; }, get: function (obj) { return obj.activeAgents; }, set: function (obj, value) { obj.activeAgents = value; } }, metadata: _metadata }, _activeAgents_initializers, _activeAgents_extraInitializers);
        __esDecorate(null, null, _pendingAgents_decorators, { kind: "field", name: "pendingAgents", static: false, private: false, access: { has: function (obj) { return "pendingAgents" in obj; }, get: function (obj) { return obj.pendingAgents; }, set: function (obj, value) { obj.pendingAgents = value; } }, metadata: _metadata }, _pendingAgents_initializers, _pendingAgents_extraInitializers);
        __esDecorate(null, null, _blockedAgents_decorators, { kind: "field", name: "blockedAgents", static: false, private: false, access: { has: function (obj) { return "blockedAgents" in obj; }, get: function (obj) { return obj.blockedAgents; }, set: function (obj, value) { obj.blockedAgents = value; } }, metadata: _metadata }, _blockedAgents_initializers, _blockedAgents_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentStatsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentStatsComponent = _classThis;
}();
export { AgentStatsComponent };
//# sourceMappingURL=agent-stats.component.js.map