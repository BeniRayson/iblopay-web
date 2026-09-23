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
// src/app/modules/agents/components/agent-search/agent-search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
var AgentSearchComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-search',
            template: "\n    <div class=\"search-container\">\n      <input \n        type=\"text\" \n        placeholder=\"\uD83D\uDD0D Rechercher un agent...\" \n        (input)=\"onSearch($event)\"\n        class=\"search-input\"\n      />\n    </div>\n  ",
            styles: ["\n    .search-container {\n      width: 100%;\n    }\n    .search-input {\n      width: 100%;\n      padding: 10px 16px;\n      border: 1px solid #ddd;\n      border-radius: 4px;\n      font-size: 14px;\n      transition: border-color 0.3s;\n      \n      &:focus {\n        outline: none;\n        border-color: #1a237e;\n      }\n      \n      &::placeholder {\n        color: #999;\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var AgentSearchComponent = _classThis = /** @class */ (function () {
        function AgentSearchComponent_1() {
            this.search = __runInitializers(this, _search_initializers, new EventEmitter());
            __runInitializers(this, _search_extraInitializers);
        }
        AgentSearchComponent_1.prototype.onSearch = function (event) {
            var input = event.target;
            this.search.emit(input.value);
        };
        return AgentSearchComponent_1;
    }());
    __setFunctionName(_classThis, "AgentSearchComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _search_decorators = [Output()];
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentSearchComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentSearchComponent = _classThis;
}();
export { AgentSearchComponent };
//# sourceMappingURL=agent-search.component.js.map