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
// src/app/modules/agents/components/agent-status-badge/agent-status-badge.component.ts
import { Component, Input } from '@angular/core';
var AgentStatusBadgeComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-status-badge',
            template: "\n    <span class=\"status-badge\" [class]=\"statusClass\">\n      {{ label }}\n    </span>\n  ",
            styles: ["\n    .status-badge {\n      padding: 4px 12px;\n      border-radius: 12px;\n      font-size: 12px;\n      font-weight: 500;\n      display: inline-block;\n      \n      &.active {\n        background: #e8f5e9;\n        color: #2e7d32;\n      }\n      &.pending {\n        background: #fff3e0;\n        color: #e65100;\n      }\n      &.suspended {\n        background: #fff8e1;\n        color: #f57f17;\n      }\n      &.blocked {\n        background: #ffebee;\n        color: #c62828;\n      }\n      &.inactive {\n        background: #f5f5f5;\n        color: #616161;\n      }\n      &.terminated {\n        background: #ffebee;\n        color: #b71c1c;\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var AgentStatusBadgeComponent = _classThis = /** @class */ (function () {
        function AgentStatusBadgeComponent_1() {
            this.status = __runInitializers(this, _status_initializers, '');
            __runInitializers(this, _status_extraInitializers);
        }
        Object.defineProperty(AgentStatusBadgeComponent_1.prototype, "label", {
            get: function () {
                var labels = {
                    'ACTIVE': 'Actif',
                    'PENDING': 'En attente',
                    'SUSPENDED': 'Suspendu',
                    'BLOCKED': 'Bloqué',
                    'INACTIVE': 'Inactif',
                    'TERMINATED': 'Résilié'
                };
                return labels[this.status] || this.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgentStatusBadgeComponent_1.prototype, "statusClass", {
            get: function () {
                return this.status.toLowerCase();
            },
            enumerable: false,
            configurable: true
        });
        return AgentStatusBadgeComponent_1;
    }());
    __setFunctionName(_classThis, "AgentStatusBadgeComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _status_decorators = [Input()];
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentStatusBadgeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentStatusBadgeComponent = _classThis;
}();
export { AgentStatusBadgeComponent };
//# sourceMappingURL=agent-status-badge.component.js.map