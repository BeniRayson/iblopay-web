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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
var EvenementsDashboardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-evenements-dashboard',
            standalone: true,
            imports: [CommonModule, RouterLink],
            templateUrl: './evenements-dashboard.component.html',
            styleUrl: './evenements-dashboard.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EvenementsDashboardComponent = _classThis = /** @class */ (function () {
        function EvenementsDashboardComponent_1(evenementsService, billetsService) {
            this.evenementsService = evenementsService;
            this.billetsService = billetsService;
            this.evenements = [];
            this.organisateurs = [];
            this.billets = [];
            this.reclamations = [];
            this.statsParEvenement = [];
            this.dernieresVentes = [];
            this.meilleursOrganisateurs = [];
            this.isLoading = true;
            this.today = new Date();
            this.colors = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#4f46e5', '#0d9488'];
        }
        EvenementsDashboardComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.evenementsService.getEvenements().subscribe(function (e) { return _this.evenements = e; });
            this.evenementsService.getOrganisateurs().subscribe(function (o) {
                _this.organisateurs = o;
                _this.meilleursOrganisateurs = __spreadArray([], o, true).sort(function (a, b) { return (b.revenuTotal || 0) - (a.revenuTotal || 0); }).slice(0, 10);
            });
            this.evenementsService.getStatsGlobal().subscribe(function (s) { return _this.stats = s; });
            this.evenementsService.getStatsParEvenement().subscribe(function (s) { return _this.statsParEvenement = s.sort(function (a, b) { return b.revenu - a.revenu; }); });
            this.evenementsService.getReclamations().subscribe(function (r) { return _this.reclamations = r; });
            this.billetsService.getAll().subscribe(function (billets) {
                _this.billets = billets;
                _this.dernieresVentes = __spreadArray([], billets, true).sort(function (a, b) { return b.dateAchat.getTime() - a.dateAchat.getTime(); }).slice(0, 5);
                _this.isLoading = false;
            });
        };
        Object.defineProperty(EvenementsDashboardComponent_1.prototype, "evenementsAVenir", {
            get: function () {
                return this.evenements.filter(function (e) { return e.statut === 'PROGRAMME'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EvenementsDashboardComponent_1.prototype, "evenementsEnCours", {
            get: function () {
                return this.evenements.filter(function (e) { return e.statut === 'EN_COURS'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EvenementsDashboardComponent_1.prototype, "reclamationsOuvertes", {
            get: function () {
                return this.reclamations.filter(function (r) { return r.statut !== 'RESOLU'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EvenementsDashboardComponent_1.prototype, "organisateursActifs", {
            get: function () {
                return this.organisateurs.filter(function (o) { return o.statut === 'ACTIF'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EvenementsDashboardComponent_1.prototype, "billetsVendusCount", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'PAYE' || b.statut === 'UTILISE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        EvenementsDashboardComponent_1.prototype.getEvenementColor = function (nom) {
            var index = this.statsParEvenement.findIndex(function (s) { return s.nom === nom; });
            var colorIndex;
            if (index !== -1) {
                colorIndex = index % this.colors.length;
            }
            else {
                var hash = 0;
                for (var i = 0; i < nom.length; i++)
                    hash = nom.charCodeAt(i) + ((hash << 5) - hash);
                colorIndex = Math.abs(hash) % this.colors.length;
            }
            return this.colors[colorIndex] || '#2563eb';
        };
        EvenementsDashboardComponent_1.prototype.formatBIFComplet = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
        };
        EvenementsDashboardComponent_1.prototype.nomEvenement = function (id) {
            var _a;
            return ((_a = this.evenements.find(function (e) { return e.id === id; })) === null || _a === void 0 ? void 0 : _a.nom) || '—';
        };
        EvenementsDashboardComponent_1.prototype.statutBilletClass = function (statut) {
            var map = { RESERVE: 'badge-orange', PAYE: 'badge-blue', UTILISE: 'badge-green', ANNULE: 'badge-red' };
            return map[statut] || 'badge-blue';
        };
        EvenementsDashboardComponent_1.prototype.statutBilletLabel = function (statut) {
            var map = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
            return map[statut] || statut;
        };
        return EvenementsDashboardComponent_1;
    }());
    __setFunctionName(_classThis, "EvenementsDashboardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EvenementsDashboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EvenementsDashboardComponent = _classThis;
}();
export { EvenementsDashboardComponent };
//# sourceMappingURL=evenements-dashboard.component.js.map