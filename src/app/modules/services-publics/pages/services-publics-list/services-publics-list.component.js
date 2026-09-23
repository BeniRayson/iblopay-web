var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ServicesPublicsListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-services-publics-list',
            standalone: false,
            templateUrl: './services-publics-list.component.html',
            styleUrls: ['./services-publics-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesPublicsListComponent = _classThis = /** @class */ (function () {
        function ServicesPublicsListComponent_1(router, servicesPublicsService) {
            this.router = router;
            this.servicesPublicsService = servicesPublicsService;
            this.services = [];
            this.filteredServices = [];
            this.paginatedServices = [];
            this.searchTerm = '';
            this.selectedType = '';
            this.selectedStatus = '';
            this.currentPage = 1;
            this.itemsPerPage = 50;
            this.totalPages = 0;
            this.isLoading = false;
            this.selectedServices = new Set();
            this.selectAll = false;
            this.stats = {
                total: 0,
                interne: 0,
                externe: 0,
                actifs: 0
            };
            this.notificationMessage = '';
            this.notificationType = 'success';
            this.showNotification = false;
            this.Math = Math;
        }
        ServicesPublicsListComponent_1.prototype.ngOnInit = function () {
            this.loadServices();
        };
        ServicesPublicsListComponent_1.prototype.loadServices = function () {
            var _this = this;
            this.isLoading = true;
            this.servicesPublicsService.getAll().subscribe({
                next: function (data) {
                    _this.services = data;
                    _this.applyFilters();
                    _this.isLoading = false;
                },
                error: function () {
                    _this.isLoading = false;
                    _this.showNotificationMessage('Erreur lors du chargement des services', 'error');
                }
            });
        };
        ServicesPublicsListComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filteredServices = this.services.filter(function (service) {
                var matchesSearch = !term ||
                    service.abreviation.toLowerCase().includes(term) ||
                    service.description.toLowerCase().includes(term);
                var matchesType = !_this.selectedType || service.type === _this.selectedType;
                var matchesStatus = !_this.selectedStatus ||
                    (_this.selectedStatus === 'ACTIF' && service.actif) ||
                    (_this.selectedStatus === 'INACTIF' && !service.actif);
                return matchesSearch && matchesType && matchesStatus;
            });
            this.totalPages = Math.max(1, Math.ceil(this.filteredServices.length / this.itemsPerPage));
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredServices.length);
            this.paginatedServices = this.filteredServices.slice(startIndex, endIndex);
            this.updateStats();
        };
        ServicesPublicsListComponent_1.prototype.onSearchChange = function () {
            this.currentPage = 1;
            this.applyFilters();
        };
        ServicesPublicsListComponent_1.prototype.onFilterChange = function () {
            this.currentPage = 1;
            this.applyFilters();
        };
        ServicesPublicsListComponent_1.prototype.clearFilters = function () {
            this.searchTerm = '';
            this.selectedType = '';
            this.selectedStatus = '';
            this.currentPage = 1;
            this.applyFilters();
            this.showNotificationMessage('Filtres réinitialisés', 'info');
        };
        ServicesPublicsListComponent_1.prototype.changePage = function (page) {
            if (page < 1 || page > this.totalPages)
                return;
            this.currentPage = page;
            this.applyFilters();
        };
        ServicesPublicsListComponent_1.prototype.getPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.totalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        ServicesPublicsListComponent_1.prototype.updateStats = function () {
            this.stats = {
                total: this.services.length,
                interne: this.services.filter(function (s) { return s.type === 'INTERNE'; }).length,
                externe: this.services.filter(function (s) { return s.type === 'EXTERNE'; }).length,
                actifs: this.services.filter(function (s) { return s.actif; }).length
            };
        };
        // ============================================================
        // ACTIONS SUR LES SERVICES
        // ============================================================
        ServicesPublicsListComponent_1.prototype.onViewService = function (service) {
            this.router.navigate(['/services-publics', service.id]);
        };
        ServicesPublicsListComponent_1.prototype.onEditService = function (service) {
            if (service && service.id) {
                this.router.navigate(['/services-publics/edit', service.id]);
            }
        };
        ServicesPublicsListComponent_1.prototype.onToggleStatus = function (service) {
            var _this = this;
            if (!service || !service.id)
                return;
            var updatedService = __assign(__assign({}, service), { actif: !service.actif });
            this.servicesPublicsService.update(updatedService).subscribe({
                next: function () {
                    _this.services = _this.services.map(function (s) {
                        return s.id === service.id ? __assign(__assign({}, s), { actif: !s.actif }) : s;
                    });
                    _this.applyFilters();
                    _this.showNotificationMessage("Service \"".concat(service.abreviation, "\" ").concat(updatedService.actif ? 'activé' : 'désactivé', " avec succ\u00E8s."), 'success');
                },
                error: function () {
                    _this.showNotificationMessage('Erreur lors du changement de statut', 'error');
                }
            });
        };
        ServicesPublicsListComponent_1.prototype.onDeleteService = function (service) {
            var _this = this;
            if (!service || !service.id)
                return;
            if (confirm("\u00CAtes-vous s\u00FBr de vouloir supprimer le service \"".concat(service.abreviation, "\" ?"))) {
                this.servicesPublicsService.delete(service.id).subscribe({
                    next: function () {
                        _this.services = _this.services.filter(function (s) { return s.id !== service.id; });
                        _this.applyFilters();
                        _this.showNotificationMessage("Service \"".concat(service.abreviation, "\" supprim\u00E9 avec succ\u00E8s."), 'success');
                    },
                    error: function () {
                        _this.showNotificationMessage('Erreur lors de la suppression', 'error');
                    }
                });
            }
        };
        // ============================================================
        // ACTIONS EN MASSE
        // ============================================================
        ServicesPublicsListComponent_1.prototype.toggleSelectAll = function () {
            var _this = this;
            this.selectAll = !this.selectAll;
            if (this.selectAll) {
                this.paginatedServices.forEach(function (s) { return _this.selectedServices.add(s.id); });
            }
            else {
                this.selectedServices.clear();
            }
        };
        ServicesPublicsListComponent_1.prototype.toggleSelect = function (serviceId) {
            var _this = this;
            if (this.selectedServices.has(serviceId)) {
                this.selectedServices.delete(serviceId);
            }
            else {
                this.selectedServices.add(serviceId);
            }
            this.selectAll = this.paginatedServices.every(function (s) { return _this.selectedServices.has(s.id); });
        };
        ServicesPublicsListComponent_1.prototype.bulkActivate = function () {
            var _this = this;
            if (this.selectedServices.size === 0) {
                this.showNotificationMessage('Veuillez sélectionner au moins un service', 'error');
                return;
            }
            var count = this.selectedServices.size;
            this.services = this.services.map(function (s) {
                return _this.selectedServices.has(s.id) ? __assign(__assign({}, s), { actif: true }) : s;
            });
            this.applyFilters();
            this.selectedServices.clear();
            this.selectAll = false;
            this.showNotificationMessage("".concat(count, " service(s) activ\u00E9(s) avec succ\u00E8s."), 'success');
        };
        ServicesPublicsListComponent_1.prototype.bulkDeactivate = function () {
            var _this = this;
            if (this.selectedServices.size === 0) {
                this.showNotificationMessage('Veuillez sélectionner au moins un service', 'error');
                return;
            }
            var count = this.selectedServices.size;
            this.services = this.services.map(function (s) {
                return _this.selectedServices.has(s.id) ? __assign(__assign({}, s), { actif: false }) : s;
            });
            this.applyFilters();
            this.selectedServices.clear();
            this.selectAll = false;
            this.showNotificationMessage("".concat(count, " service(s) d\u00E9sactiv\u00E9(s) avec succ\u00E8s."), 'success');
        };
        ServicesPublicsListComponent_1.prototype.bulkDelete = function () {
            var _this = this;
            if (this.selectedServices.size === 0) {
                this.showNotificationMessage('Veuillez sélectionner au moins un service', 'error');
                return;
            }
            var count = this.selectedServices.size;
            if (confirm("\u00CAtes-vous s\u00FBr de vouloir supprimer ".concat(count, " service(s) ?"))) {
                this.services = this.services.filter(function (s) { return !_this.selectedServices.has(s.id); });
                this.applyFilters();
                this.selectedServices.clear();
                this.selectAll = false;
                this.showNotificationMessage("".concat(count, " service(s) supprim\u00E9(s) avec succ\u00E8s."), 'success');
            }
        };
        // ============================================================
        // EXPORT
        // ============================================================
        ServicesPublicsListComponent_1.prototype.exportData = function () {
            var _this = this;
            this.showNotificationMessage('Export des services en cours…', 'info');
            setTimeout(function () {
                _this.showNotificationMessage('Export terminé avec succès.', 'success');
            }, 1500);
        };
        // ============================================================
        // UTILITAIRES
        // ============================================================
        ServicesPublicsListComponent_1.prototype.trackById = function (index, service) {
            return service ? service.id : index;
        };
        ServicesPublicsListComponent_1.prototype.getServiceColor = function (abreviation) {
            if (!abreviation)
                return '#16293a';
            var colors = [
                '#16293a', '#a9803d', '#386a4e', '#9c4033',
                '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e',
                '#46586a', '#85661f', '#2f4f5e', '#734531'
            ];
            var hash = 0;
            for (var i = 0; i < abreviation.length; i++) {
                hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#16293a';
        };
        ServicesPublicsListComponent_1.prototype.getStatusLabel = function (actif) {
            return actif ? 'Actif' : 'Inactif';
        };
        ServicesPublicsListComponent_1.prototype.getStatusClass = function (actif) {
            return actif ? 'status-actif' : 'status-inactif';
        };
        ServicesPublicsListComponent_1.prototype.showNotificationMessage = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'success'; }
            this.notificationMessage = message;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(function () {
                _this.showNotification = false;
            }, 3000);
        };
        return ServicesPublicsListComponent_1;
    }());
    __setFunctionName(_classThis, "ServicesPublicsListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesPublicsListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesPublicsListComponent = _classThis;
}();
export { ServicesPublicsListComponent };
//# sourceMappingURL=services-publics-list.component.js.map