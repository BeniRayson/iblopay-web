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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
var FormulairesListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-formulaires-list',
            standalone: true,
            imports: [CommonModule, RouterLink],
            templateUrl: './formulaires-list.component.html',
            styleUrl: './formulaires-list.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FormulairesListComponent = _classThis = /** @class */ (function () {
        function FormulairesListComponent_1(formulairesService, servicesService, router) {
            this.formulairesService = formulairesService;
            this.servicesService = servicesService;
            this.router = router;
            this.formulaires = [];
            this.services = [];
            this.isLoading = true;
        }
        FormulairesListComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.servicesService.getAll().subscribe(function (s) { return _this.services = s; });
            this.formulairesService.getAll().subscribe(function (f) {
                _this.formulaires = f;
                _this.isLoading = false;
            });
        };
        FormulairesListComponent_1.prototype.serviceNom = function (serviceId) {
            var _a;
            return ((_a = this.services.find(function (s) { return s.id === serviceId; })) === null || _a === void 0 ? void 0 : _a.nom) || '—';
        };
        FormulairesListComponent_1.prototype.ouvrirFormulaire = function (f) {
            if (f.typeFormulaire === 'DOCUMENT') {
                this.router.navigate(['/formulaires/document', f.id]);
            }
            else {
                this.router.navigate(['/formulaires', f.id, 'builder']);
            }
        };
        return FormulairesListComponent_1;
    }());
    __setFunctionName(_classThis, "FormulairesListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormulairesListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormulairesListComponent = _classThis;
}();
export { FormulairesListComponent };
//# sourceMappingURL=formulaires-list.component.js.map