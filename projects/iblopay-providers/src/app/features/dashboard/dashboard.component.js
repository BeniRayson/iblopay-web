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
var DashboardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-dashboard',
            standalone: true,
            imports: [CommonModule, RouterLink],
            templateUrl: './dashboard.component.html',
            styleUrl: './dashboard.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DashboardComponent = _classThis = /** @class */ (function () {
        function DashboardComponent_1(servicesService, demandesService, formulairesService) {
            this.servicesService = servicesService;
            this.demandesService = demandesService;
            this.formulairesService = formulairesService;
            this.services = [];
            this.formulaires = [];
            this.rendementServices = [];
            this.demandes = [];
            this.dernieresDemandes = [];
            this.derniersUtilisateurs = [];
            this.isLoading = true;
            this.today = new Date();
            // Palette de couleurs professionnelles
            this.colors = [
                '#2563eb', '#7c3aed', '#0891b2', '#059669',
                '#d97706', '#dc2626', '#4f46e5', '#0d9488',
                '#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444',
                '#8b5cf6', '#06b6d4', '#10b981', '#f472b6'
            ];
        }
        DashboardComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.servicesService.getAll().subscribe(function (s) { return _this.services = s; });
            this.formulairesService.getAll().subscribe(function (f) { return _this.formulaires = f; });
            this.demandesService.getRendementGlobal().subscribe(function (r) { return _this.rendement = r; });
            this.demandesService.getRendementParService().subscribe(function (r) {
                _this.rendementServices = r;
            });
            this.demandesService.getAll().subscribe(function (d) {
                _this.demandes = d;
                // 5 dernières demandes
                _this.dernieresDemandes = __spreadArray([], d, true).sort(function (a, b) { return b.dateSoumission.getTime() - a.dateSoumission.getTime(); })
                    .slice(0, 5);
                // 10 derniers utilisateurs uniques avec leurs infos
                var uniqueUsers = new Map();
                __spreadArray([], d, true).sort(function (a, b) { return b.dateSoumission.getTime() - a.dateSoumission.getTime(); })
                    .forEach(function (demande) {
                    if (!uniqueUsers.has(demande.utilisateurTelephone)) {
                        uniqueUsers.set(demande.utilisateurTelephone, demande);
                    }
                });
                _this.derniersUtilisateurs = Array.from(uniqueUsers.values()).slice(0, 10);
                _this.isLoading = false;
            });
        };
        Object.defineProperty(DashboardComponent_1.prototype, "servicesActifs", {
            get: function () {
                return this.services.filter(function (s) { return s.statut === 'ACTIF'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "servicesBrouillon", {
            get: function () {
                return this.services.filter(function (s) { return s.statut === 'BROUILLON'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "formulairesPublies", {
            get: function () {
                return this.formulaires.filter(function (f) { return f.statut === 'PUBLIE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "formulairesBrouillon", {
            get: function () {
                return this.formulaires.filter(function (f) { return f.statut === 'BROUILLON'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "utilisateursDistincts", {
            get: function () {
                return new Set(this.demandes.map(function (d) { return d.utilisateurTelephone; })).size;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "demandesEnCours", {
            get: function () {
                return this.demandes.filter(function (d) { return !['TERMINE', 'REJETE'].includes(d.statut); }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DashboardComponent_1.prototype, "demandesUrgentes", {
            get: function () {
                var deuxJours = 2 * 24 * 60 * 60 * 1000;
                return this.demandes.filter(function (d) {
                    return !['TERMINE', 'REJETE'].includes(d.statut) &&
                        (Date.now() - d.dateSoumission.getTime()) > deuxJours;
                });
            },
            enumerable: false,
            configurable: true
        });
        // Récupère la couleur d'un service
        DashboardComponent_1.prototype.getServiceColor = function (serviceNom) {
            var index = this.rendementServices.findIndex(function (s) { return s.serviceNom === serviceNom; });
            var colorIndex;
            if (index !== -1) {
                colorIndex = index % this.colors.length;
            }
            else {
                var hash = 0;
                for (var i = 0; i < serviceNom.length; i++) {
                    hash = serviceNom.charCodeAt(i) + ((hash << 5) - hash);
                }
                colorIndex = Math.abs(hash) % this.colors.length;
            }
            if (colorIndex < 0 || colorIndex >= this.colors.length) {
                colorIndex = 0;
            }
            var color = this.colors[colorIndex];
            return color || '#2563eb';
        };
        // 🔥 Format BIF avec espace insécable pour garder le montant et BIF sur une seule ligne
        DashboardComponent_1.prototype.formatBIFComplet = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
        };
        // Format BIF abrégé (pour les affichages plus compacts)
        DashboardComponent_1.prototype.formatBIF = function (v) {
            if (v >= 1000000) {
                return (v / 1000000).toFixed(1) + 'M BIF';
            }
            if (v >= 1000) {
                return (v / 1000).toFixed(0) + 'K BIF';
            }
            return new Intl.NumberFormat('fr-FR').format(v) + ' BIF';
        };
        DashboardComponent_1.prototype.statutClass = function (statut) {
            var map = {
                SOUMIS: 'badge-blue',
                PAIEMENT_EN_ATTENTE: 'badge-orange',
                RECU: 'badge-blue',
                EN_VERIFICATION: 'badge-orange',
                EN_VALIDATION: 'badge-orange',
                EN_TRAITEMENT: 'badge-purple',
                APPROUVE: 'badge-green',
                REJETE: 'badge-red',
                TERMINE: 'badge-green'
            };
            return map[statut] || 'badge-blue';
        };
        DashboardComponent_1.prototype.statutLabel = function (statut) {
            var map = {
                SOUMIS: 'Soumis',
                PAIEMENT_EN_ATTENTE: 'Paiement en attente',
                RECU: 'Reçu',
                EN_VERIFICATION: 'En vérification',
                EN_VALIDATION: 'En validation',
                EN_TRAITEMENT: 'En traitement',
                APPROUVE: 'Approuvé',
                REJETE: 'Rejeté',
                TERMINE: 'Terminé'
            };
            return map[statut] || statut;
        };
        return DashboardComponent_1;
    }());
    __setFunctionName(_classThis, "DashboardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardComponent = _classThis;
}();
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map