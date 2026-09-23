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
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesPublicsListComponent } from './pages/services-publics-list/services-publics-list.component';
import { ServicesPublicsDetailComponent } from './pages/services-publics-detail/services-publics-detail.component';
import { ServicesPublicsEditComponent } from './pages/services-publics-edit/services-publics-edit.component';
import { CategoriesListComponent } from './pages/categories/categories-list.component';
var routes = [
    {
        path: '',
        component: ServicesPublicsListComponent,
        data: { title: 'Liste des services publics' }
    },
    {
        path: ':id',
        component: ServicesPublicsDetailComponent,
        data: { title: 'Détail du service public' }
    },
    {
        path: 'edit/:id',
        component: ServicesPublicsEditComponent,
        data: { title: 'Modifier un service public' }
    },
    {
        path: ':id/edit',
        redirectTo: 'edit/:id'
    },
    {
        path: ':id/categories',
        component: CategoriesListComponent,
        data: { title: 'Catégories du service' }
    }
];
var ServicesPublicsRoutingModule = function () {
    var _classDecorators = [NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesPublicsRoutingModule = _classThis = /** @class */ (function () {
        function ServicesPublicsRoutingModule_1() {
        }
        return ServicesPublicsRoutingModule_1;
    }());
    __setFunctionName(_classThis, "ServicesPublicsRoutingModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesPublicsRoutingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesPublicsRoutingModule = _classThis;
}();
export { ServicesPublicsRoutingModule };
//# sourceMappingURL=services-publics-routing.module.js.map