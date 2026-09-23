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
var ServicesPublicsEditComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-services-publics-edit',
            standalone: false,
            templateUrl: './services-publics-edit.component.html',
            styleUrls: ['./services-publics-edit.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesPublicsEditComponent = _classThis = /** @class */ (function () {
        function ServicesPublicsEditComponent_1(route, router, servicesPublicsService) {
            this.route = route;
            this.router = router;
            this.servicesPublicsService = servicesPublicsService;
            this.loading = false;
            this.error = '';
            this.isNew = false;
        }
        ServicesPublicsEditComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var id = this.route.snapshot.paramMap.get('id');
            if (id === 'new') {
                this.isNew = true;
                this.service = this.getEmptyService();
                this.loading = false;
            }
            else {
                this.isNew = false;
                this.loading = true;
                this.servicesPublicsService.getById(Number(id)).subscribe({
                    next: function (data) {
                        if (data) {
                            _this.service = data;
                        }
                        else {
                            _this.error = 'Service non trouvé';
                        }
                        _this.loading = false;
                    },
                    error: function (err) {
                        _this.error = 'Erreur lors du chargement du service';
                        _this.loading = false;
                        console.error(err);
                    }
                });
            }
        };
        ServicesPublicsEditComponent_1.prototype.getEmptyService = function () {
            return {
                id: 0,
                numero: 0,
                abreviation: '',
                description: '',
                type: 'INTERNE',
                actif: true,
                dateCreation: new Date(),
                version: '1.0.0',
                responsable: '',
                email: '',
                telephone: '',
                siteWeb: '',
                utilisateurs: [],
                categories: [],
                typesRNF: [],
                paiements: []
            };
        };
        ServicesPublicsEditComponent_1.prototype.goBack = function () {
            this.router.navigate(['/services-publics']);
        };
        ServicesPublicsEditComponent_1.prototype.cancel = function () {
            this.router.navigate(['/services-publics']);
        };
        ServicesPublicsEditComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (!this.service)
                return;
            // Validation
            if (!this.service.abreviation || !this.service.description) {
                this.error = 'Veuillez remplir tous les champs obligatoires';
                return;
            }
            var operation = this.service.id === 0
                ? this.servicesPublicsService.create(this.service)
                : this.servicesPublicsService.update(this.service);
            operation.subscribe({
                next: function (result) {
                    _this.router.navigate(['/services-publics']);
                },
                error: function (err) {
                    _this.error = 'Erreur lors de l\'enregistrement du service';
                    console.error(err);
                }
            });
        };
        ServicesPublicsEditComponent_1.prototype.getServiceColor = function (abreviation) {
            if (!abreviation)
                return '#16293a';
            var colors = [
                '#16293a', '#a9803d', '#386a4e', '#9c4033',
                '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e',
                '#46586a', '#85661f', '#2f4f5e', '#734531',
                '#4d6650', '#8a6a2e', '#603a33', '#3f5a6e'
            ];
            var hash = 0;
            for (var i = 0; i < abreviation.length; i++) {
                hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
            }
            var index = Math.abs(hash) % colors.length;
            return colors[index] || '#16293a';
        };
        return ServicesPublicsEditComponent_1;
    }());
    __setFunctionName(_classThis, "ServicesPublicsEditComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesPublicsEditComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesPublicsEditComponent = _classThis;
}();
export { ServicesPublicsEditComponent };
//# sourceMappingURL=services-publics-edit.component.js.map