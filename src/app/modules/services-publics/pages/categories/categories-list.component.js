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
var CategoriesListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-categories-list',
            standalone: false,
            templateUrl: './categories-list.component.html',
            styleUrls: ['./categories-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CategoriesListComponent = _classThis = /** @class */ (function () {
        function CategoriesListComponent_1(route, router, servicesPublicsService) {
            this.route = route;
            this.router = router;
            this.servicesPublicsService = servicesPublicsService;
            this.categories = [];
            this.loading = false;
            this.showNotification = false;
            this.notificationMessage = '';
            this.notificationType = 'success';
        }
        CategoriesListComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var id = Number(this.route.snapshot.paramMap.get('id'));
            this.loading = true;
            this.servicesPublicsService.getById(id).subscribe({
                next: function (data) {
                    _this.service = data;
                    _this.categories = (data === null || data === void 0 ? void 0 : data.categories) || [];
                    _this.loading = false;
                },
                error: function () {
                    _this.loading = false;
                }
            });
        };
        CategoriesListComponent_1.prototype.goBack = function () {
            var _a;
            this.router.navigate(['/services-publics', (_a = this.service) === null || _a === void 0 ? void 0 : _a.id]);
        };
        CategoriesListComponent_1.prototype.getCategoryColor = function (code) {
            var colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
            var hash = 0;
            for (var i = 0; i < code.length; i++) {
                hash = code.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#16293a';
        };
        CategoriesListComponent_1.prototype.onAddCategory = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', 'new']);
            }
        };
        CategoriesListComponent_1.prototype.onViewCategory = function (category) {
            if (this.service) {
                this.router.navigate(['/services-publics', this.service.id, 'categories', category.id]);
            }
        };
        CategoriesListComponent_1.prototype.onEditCategory = function (category) {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', category.id]);
            }
        };
        CategoriesListComponent_1.prototype.onToggleCategory = function (category) {
            category.actif = !category.actif;
            this.showNotificationMessage("Cat\u00E9gorie \"".concat(category.nom, "\" ").concat(category.actif ? 'activée' : 'désactivée', " avec succ\u00E8s."), 'success');
        };
        CategoriesListComponent_1.prototype.exportData = function () {
            var _this = this;
            this.showNotificationMessage('Export des catégories en cours…', 'info');
            setTimeout(function () {
                _this.showNotificationMessage('Export terminé avec succès.', 'success');
            }, 1200);
        };
        CategoriesListComponent_1.prototype.showNotificationMessage = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'success'; }
            this.notificationMessage = message;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(function () {
                _this.showNotification = false;
            }, 3000);
        };
        return CategoriesListComponent_1;
    }());
    __setFunctionName(_classThis, "CategoriesListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CategoriesListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CategoriesListComponent = _classThis;
}();
export { CategoriesListComponent };
//# sourceMappingURL=categories-list.component.js.map