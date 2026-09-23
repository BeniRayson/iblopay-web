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
var TopActorsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-top-actors',
            templateUrl: './top-actors.component.html',
            styleUrls: ['./top-actors.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _actors_decorators;
    var _actors_initializers = [];
    var _actors_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var TopActorsComponent = _classThis = /** @class */ (function () {
        function TopActorsComponent_1() {
            this.actors = __runInitializers(this, _actors_initializers, []);
            this.title = (__runInitializers(this, _actors_extraInitializers), __runInitializers(this, _title_initializers, 'Top acteurs par volume'));
            this.selectedTab = (__runInitializers(this, _title_extraInitializers), 'super-agents');
            this.tabs = [
                { key: 'super-agents', label: 'Super Agents' },
                { key: 'agents', label: 'Agents' },
                { key: 'clients', label: 'Clients' },
                { key: 'merchants', label: 'Marchands' }
            ];
        }
        TopActorsComponent_1.prototype.setTab = function (key) {
            this.selectedTab = key;
        };
        return TopActorsComponent_1;
    }());
    __setFunctionName(_classThis, "TopActorsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _actors_decorators = [Input()];
        _title_decorators = [Input()];
        __esDecorate(null, null, _actors_decorators, { kind: "field", name: "actors", static: false, private: false, access: { has: function (obj) { return "actors" in obj; }, get: function (obj) { return obj.actors; }, set: function (obj, value) { obj.actors = value; } }, metadata: _metadata }, _actors_initializers, _actors_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TopActorsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TopActorsComponent = _classThis;
}();
export { TopActorsComponent };
//# sourceMappingURL=top-actors.component.js.map