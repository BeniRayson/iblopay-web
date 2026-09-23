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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
var ServicesListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-services-list',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterLink],
            templateUrl: './services-list.component.html',
            styleUrl: './services-list.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesListComponent = _classThis = /** @class */ (function () {
        function ServicesListComponent_1(servicesService, workflowsService, router, toastService) {
            this.servicesService = servicesService;
            this.workflowsService = workflowsService;
            this.router = router;
            this.toastService = toastService;
            this.services = [];
            this.filtered = [];
            this.searchTerm = '';
            this.selectedStatut = '';
            this.isLoading = true;
            // Pagination & Modal
            this.currentPage = 0;
            this.pageSize = 12;
            this.selectedService = null;
            this.stats = { total: 0, actifs: 0, brouillon: 0 };
            // ─── SCHÉMA DE WORKFLOW ───────────
            this.serviceSchemaActif = null;
            this.workflowSchemaAffiche = null;
            this.comptesSchema = [];
            this.isLoadingSchema = false;
        }
        ServicesListComponent_1.prototype.ngOnInit = function () {
            this.load();
        };
        ServicesListComponent_1.prototype.load = function () {
            var _this = this;
            this.isLoading = true;
            this.servicesService.getAll().subscribe(function (s) {
                _this.services = s;
                _this.applyFilters();
                _this.updateStats();
                _this.isLoading = false;
            });
        };
        ServicesListComponent_1.prototype.updateStats = function () {
            this.stats = {
                total: this.services.length,
                actifs: this.services.filter(function (s) { return s.statut === 'ACTIF'; }).length,
                brouillon: this.services.filter(function (s) { return s.statut === 'BROUILLON'; }).length
            };
        };
        ServicesListComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filtered = this.services.filter(function (s) {
                var matchTerm = !term ||
                    s.nom.toLowerCase().includes(term) ||
                    s.code.toLowerCase().includes(term) ||
                    (s.categorie && s.categorie.toLowerCase().includes(term)) ||
                    (s.sousCategorie && s.sousCategorie.toLowerCase().includes(term));
                var matchStatut = !_this.selectedStatut || s.statut === _this.selectedStatut;
                return matchTerm && matchStatut;
            });
            this.currentPage = 0;
        };
        ServicesListComponent_1.prototype.onSearchChange = function () {
            this.applyFilters();
        };
        Object.defineProperty(ServicesListComponent_1.prototype, "pagedServices", {
            get: function () {
                var start = this.currentPage * this.pageSize;
                return this.filtered.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesListComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filtered.length / this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        ServicesListComponent_1.prototype.changePage = function (page) {
            if (page >= 0 && page < this.totalPages) {
                this.currentPage = page;
            }
        };
        ServicesListComponent_1.prototype.mathMin = function (a, b) {
            return Math.min(a, b);
        };
        ServicesListComponent_1.prototype.toggleStatut = function (s) {
            var _this = this;
            var nouveauStatut = s.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF';
            this.servicesService.update(__assign(__assign({}, s), { statut: nouveauStatut })).subscribe(function () { return _this.load(); });
        };
        ServicesListComponent_1.prototype.deleteService = function (s) {
            var _this = this;
            if (confirm("Supprimer le service \"".concat(s.nom, "\" ?"))) {
                this.servicesService.delete(s.id).subscribe(function () { return _this.load(); });
            }
        };
        ServicesListComponent_1.prototype.ouvrirFormBuilder = function (s) {
            if (s.formulaireId) {
                this.router.navigate(['/formulaires', s.formulaireId, 'builder']);
            }
            else {
                this.router.navigate(['/formulaires/builder'], { queryParams: { serviceId: s.id } });
            }
        };
        ServicesListComponent_1.prototype.ouvrirWorkflowBuilder = function (s) {
            this.router.navigate(['/workflows/nouveau'], { queryParams: { serviceId: s.id } });
        };
        ServicesListComponent_1.prototype.voirSchemaWorkflow = function (s) {
            var _this = this;
            this.serviceSchemaActif = s;
            this.isLoadingSchema = true;
            this.workflowsService.getByServiceId(s.id).subscribe(function (w) {
                if (!w) {
                    _this.isLoadingSchema = false;
                    _this.serviceSchemaActif = null;
                    _this.toastService.error("Aucun workflow n'est encore configur\u00E9 pour \u00AB ".concat(s.nom, " \u00BB."));
                    if (confirm("Voulez-vous cr\u00E9er le workflow de \u00AB ".concat(s.nom, " \u00BB maintenant ?"))) {
                        _this.ouvrirWorkflowBuilder(s);
                    }
                    return;
                }
                _this.workflowSchemaAffiche = w;
                _this.workflowsService.getComptesByWorkflow(w.id).subscribe(function (comptes) {
                    _this.comptesSchema = comptes;
                    _this.isLoadingSchema = false;
                });
            });
        };
        ServicesListComponent_1.prototype.fermerSchemaWorkflow = function () {
            this.serviceSchemaActif = null;
            this.workflowSchemaAffiche = null;
            this.comptesSchema = [];
        };
        ServicesListComponent_1.prototype.comptesPourEtapeSchema = function (etapeId) {
            return this.comptesSchema.filter(function (c) { return c.etapeId === etapeId; });
        };
        ServicesListComponent_1.prototype.modifierWorkflowDepuisSchema = function () {
            if (!this.workflowSchemaAffiche)
                return;
            this.router.navigate(['/workflows', this.workflowSchemaAffiche.id, 'builder']);
        };
        ServicesListComponent_1.prototype.couleurCategorie = function (categorie) {
            var couleurs = {
                'Certificats': '#2563eb',
                'Autorisations': '#7c3aed',
                'Licences': '#ea580c',
                'Attestations': '#0891b2',
                'Transport': '#16a34a'
            };
            return couleurs[categorie] || '#64748b';
        };
        return ServicesListComponent_1;
    }());
    __setFunctionName(_classThis, "ServicesListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesListComponent = _classThis;
}();
export { ServicesListComponent };
//# sourceMappingURL=services-list.component.js.map