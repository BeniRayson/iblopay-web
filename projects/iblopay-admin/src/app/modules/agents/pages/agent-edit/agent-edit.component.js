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
// src/app/modules/agents/pages/agent-edit/agent-edit.component.ts
import { Component } from '@angular/core';
var AgentEditComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-edit',
            template: "\n    <div *ngIf=\"agent\" class=\"edit-container\">\n      <h1>Modifier l'agent</h1>\n      <div class=\"form-card\">\n        <p>Formulaire de modification en cours de d\u00E9veloppement...</p>\n        <p><strong>Agent:</strong> {{ agent.firstName }} {{ agent.lastName }}</p>\n        <button (click)=\"goBack()\" class=\"btn-secondary\">Retour</button>\n      </div>\n    </div>\n  ",
            styles: ["\n    .edit-container {\n      padding: 20px;\n      max-width: 800px;\n      margin: 0 auto;\n    }\n    .form-card {\n      background: white;\n      padding: 20px;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n      margin: 20px 0;\n      text-align: center;\n      padding: 60px 20px;\n    }\n    .btn-secondary {\n      background: #666;\n      color: white;\n      border: none;\n      padding: 10px 20px;\n      border-radius: 4px;\n      cursor: pointer;\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentEditComponent = _classThis = /** @class */ (function () {
        function AgentEditComponent_1(route, router) {
            this.route = route;
            this.router = router;
            this.agent = null;
        }
        AgentEditComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.subscribe(function (data) {
                _this.agent = data['agent'];
            });
        };
        AgentEditComponent_1.prototype.goBack = function () {
            this.router.navigate(['/agents']);
        };
        return AgentEditComponent_1;
    }());
    __setFunctionName(_classThis, "AgentEditComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentEditComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentEditComponent = _classThis;
}();
export { AgentEditComponent };
//# sourceMappingURL=agent-edit.component.js.map