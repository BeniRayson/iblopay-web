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
var WorkflowsListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-workflows-list',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterLink],
            templateUrl: './workflows-list.component.html',
            styleUrl: './workflows-list.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WorkflowsListComponent = _classThis = /** @class */ (function () {
        function WorkflowsListComponent_1(workflowsService, servicesService, router, toastService) {
            this.workflowsService = workflowsService;
            this.servicesService = servicesService;
            this.router = router;
            this.toastService = toastService;
            this.lignes = [];
            this.filtered = [];
            this.services = [];
            this.comptes = [];
            this.searchTerm = '';
            this.selectedStatut = '';
            this.isLoading = true;
            this.workflowSelectionne = null;
            this.comptesDuWorkflowSelectionne = [];
            this.stats = { total: 0, actifs: 0, comptes: 0 };
        }
        WorkflowsListComponent_1.prototype.ngOnInit = function () {
            this.load();
        };
        WorkflowsListComponent_1.prototype.load = function () {
            var _this = this;
            this.isLoading = true;
            this.servicesService.getAll().subscribe(function (services) {
                _this.services = services;
                _this.workflowsService.getAll().subscribe(function (workflows) {
                    _this.workflowsService.getAllComptes().subscribe(function (comptes) {
                        _this.comptes = comptes;
                        _this.lignes = workflows.map(function (w) {
                            var _a;
                            return (__assign(__assign({}, w), { serviceNom: ((_a = services.find(function (s) { return s.id === w.serviceId; })) === null || _a === void 0 ? void 0 : _a.nom) || 'Service inconnu', nombreComptes: comptes.filter(function (c) { return c.workflowId === w.id; }).length }));
                        });
                        _this.applyFilters();
                        _this.updateStats();
                        _this.isLoading = false;
                    });
                });
            });
        };
        WorkflowsListComponent_1.prototype.updateStats = function () {
            this.stats = {
                total: this.lignes.length,
                actifs: this.lignes.filter(function (w) { return w.statut === 'ACTIF'; }).length,
                comptes: this.comptes.filter(function (c) { return c.statut === 'ACTIF'; }).length
            };
        };
        WorkflowsListComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filtered = this.lignes.filter(function (w) {
                var matchTerm = !term ||
                    w.nom.toLowerCase().includes(term) ||
                    w.serviceNom.toLowerCase().includes(term);
                var matchStatut = !_this.selectedStatut || w.statut === _this.selectedStatut;
                return matchTerm && matchStatut;
            });
        };
        Object.defineProperty(WorkflowsListComponent_1.prototype, "servicesSansWorkflow", {
            /** Services qui n'ont pas encore de workflow configuré. */
            get: function () {
                var idsAvecWorkflow = new Set(this.lignes.map(function (w) { return w.serviceId; }));
                return this.services.filter(function (s) { return !idsAvecWorkflow.has(s.id); });
            },
            enumerable: false,
            configurable: true
        });
        WorkflowsListComponent_1.prototype.ouvrirDetail = function (w) {
            this.workflowSelectionne = w;
            this.comptesDuWorkflowSelectionne = this.comptes.filter(function (c) { return c.workflowId === w.id; });
        };
        WorkflowsListComponent_1.prototype.fermerDetail = function () {
            this.workflowSelectionne = null;
            this.comptesDuWorkflowSelectionne = [];
        };
        WorkflowsListComponent_1.prototype.modifier = function (w) {
            this.router.navigate(['/workflows', w.id, 'builder']);
        };
        WorkflowsListComponent_1.prototype.toggleStatut = function (w, event) {
            var _this = this;
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.workflowsService.toggleStatut(w.id).subscribe(function () {
                _this.toastService.success("Le workflow \u00AB ".concat(w.nom, " \u00BB a \u00E9t\u00E9 ").concat(w.statut === 'ACTIF' ? 'désactivé' : 'activé', "."));
                _this.load();
            });
        };
        WorkflowsListComponent_1.prototype.supprimer = function (w, event) {
            var _this = this;
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            if (!confirm("Supprimer le workflow \u00AB ".concat(w.nom, " \u00BB et tous ses comptes rattach\u00E9s ?")))
                return;
            this.workflowsService.delete(w.id).subscribe(function () {
                _this.toastService.success('Workflow supprimé.');
                _this.fermerDetail();
                _this.load();
            });
        };
        WorkflowsListComponent_1.prototype.statutClass = function (statut) {
            return statut === 'ACTIF' ? 'badge-green' : 'badge-gray';
        };
        WorkflowsListComponent_1.prototype.comptesPourEtape = function (etapeId) {
            return this.comptesDuWorkflowSelectionne.filter(function (c) { return c.etapeId === etapeId; });
        };
        return WorkflowsListComponent_1;
    }());
    __setFunctionName(_classThis, "WorkflowsListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WorkflowsListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WorkflowsListComponent = _classThis;
}();
export { WorkflowsListComponent };
//# sourceMappingURL=workflows-list.component.js.map