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
import { FormsModule } from '@angular/forms';
var BilletterieLiveComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-billetterie-live',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './billetterie-live.component.html',
            styleUrl: './billetterie-live.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BilletterieLiveComponent = _classThis = /** @class */ (function () {
        function BilletterieLiveComponent_1(billetsService, evenementsService, toastService) {
            this.billetsService = billetsService;
            this.evenementsService = evenementsService;
            this.toastService = toastService;
            this.vueActive = 'TEMPS_REEL';
            this.billets = [];
            this.filtered = [];
            this.evenements = [];
            this.filtreEvenement = '';
            this.filtreStatut = '';
            this.filtreNumero = '';
            this.isLoading = true;
            this.currentPage = 1;
            this.pageSize = 12;
            this.billetDetailAffiche = null;
            // ─── HISTORIQUE (billets confirmés par événement & catégorie) ────
            this.historique = [];
            this.historiqueFiltre = [];
            this.historiqueFiltreEvenement = '';
            this.historiqueFiltreCategorie = '';
            this.historiquePage = 1;
            this.historiquePageSize = 15;
            this.isLoadingHistorique = false;
        }
        BilletterieLiveComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.evenementsService.getEvenements().subscribe(function (e) { return _this.evenements = e; });
            this.sub = this.billetsService.getAll().subscribe(function (billets) {
                _this.billets = billets;
                _this.applyFilters();
                if (_this.billetDetailAffiche) {
                    var maj = billets.find(function (b) { return b.id === _this.billetDetailAffiche.id; });
                    if (maj)
                        _this.billetDetailAffiche = maj;
                }
                _this.isLoading = false;
            });
        };
        BilletterieLiveComponent_1.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        BilletterieLiveComponent_1.prototype.changerVue = function (vue) {
            this.vueActive = vue;
            if (vue === 'HISTORIQUE' && this.historique.length === 0) {
                this.chargerHistorique();
            }
        };
        BilletterieLiveComponent_1.prototype.chargerHistorique = function () {
            var _this = this;
            this.isLoadingHistorique = true;
            this.evenementsService.getHistorique().subscribe(function (h) {
                _this.historique = h;
                _this.appliquerFiltresHistorique();
                _this.isLoadingHistorique = false;
            });
        };
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "categoriesHistoriqueDisponibles", {
            /** Catégories disponibles pour l'événement sélectionné dans l'historique (ou toutes si aucun événement choisi). */
            get: function () {
                var _this = this;
                var source = this.historiqueFiltreEvenement
                    ? this.historique.filter(function (h) { return h.evenementId === Number(_this.historiqueFiltreEvenement); })
                    : this.historique;
                return __spreadArray([], new Set(source.map(function (h) { return h.categorieNom; })), true).sort();
            },
            enumerable: false,
            configurable: true
        });
        BilletterieLiveComponent_1.prototype.appliquerFiltresHistorique = function () {
            var _this = this;
            this.historiquePage = 1;
            this.historiqueFiltre = this.historique
                .filter(function (h) { return h.statut === 'VALIDE'; })
                .filter(function (h) { return !_this.historiqueFiltreEvenement || h.evenementId === Number(_this.historiqueFiltreEvenement); })
                .filter(function (h) { return !_this.historiqueFiltreCategorie || h.categorieNom === _this.historiqueFiltreCategorie; })
                .sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        };
        BilletterieLiveComponent_1.prototype.reinitialiserFiltresHistorique = function () {
            this.historiqueFiltreEvenement = '';
            this.historiqueFiltreCategorie = '';
            this.appliquerFiltresHistorique();
        };
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "historiqueRevenuTotal", {
            get: function () {
                return this.historiqueFiltre.reduce(function (sum, h) { return sum + h.revenu; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "historiqueBilletsTotal", {
            get: function () {
                return this.historiqueFiltre.reduce(function (sum, h) { return sum + h.quantite; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "historiqueTotalPages", {
            get: function () {
                return Math.ceil(this.historiqueFiltre.length / this.historiquePageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "historiquePagine", {
            get: function () {
                var start = (this.historiquePage - 1) * this.historiquePageSize;
                return this.historiqueFiltre.slice(start, start + this.historiquePageSize);
            },
            enumerable: false,
            configurable: true
        });
        BilletterieLiveComponent_1.prototype.changerPageHistorique = function (page) {
            if (page >= 1 && page <= this.historiqueTotalPages)
                this.historiquePage = page;
        };
        BilletterieLiveComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.filtreNumero.toLowerCase().trim();
            this.filtered = this.billets
                .filter(function (b) {
                return (!_this.filtreEvenement || b.evenementId === Number(_this.filtreEvenement)) &&
                    (!_this.filtreStatut || b.statut === _this.filtreStatut) &&
                    (!term || b.numeroReference.toLowerCase().includes(term));
            })
                .sort(function (a, b) { return b.dateAchat.getTime() - a.dateAchat.getTime(); });
        };
        BilletterieLiveComponent_1.prototype.onFiltreChange = function () {
            this.applyFilters();
            this.currentPage = 1;
        };
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filtered.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "filteredPagines", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.filtered.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        BilletterieLiveComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages)
                this.currentPage = page;
        };
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "reservesCount", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'RESERVE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "payesCount", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'PAYE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "utilisesCount", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'UTILISE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BilletterieLiveComponent_1.prototype, "revenuTotal", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'PAYE' || b.statut === 'UTILISE'; }).reduce(function (sum, b) { return sum + b.prix; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        BilletterieLiveComponent_1.prototype.formatBIF = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
        };
        BilletterieLiveComponent_1.prototype.nomEvenement = function (id) {
            var _a;
            return ((_a = this.evenements.find(function (e) { return e.id === id; })) === null || _a === void 0 ? void 0 : _a.nom) || '—';
        };
        BilletterieLiveComponent_1.prototype.statutClass = function (statut) {
            var map = { RESERVE: 'badge-orange', PAYE: 'badge-blue', UTILISE: 'badge-green', ANNULE: 'badge-red' };
            return map[statut];
        };
        BilletterieLiveComponent_1.prototype.statutLabel = function (statut) {
            var map = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
            return map[statut];
        };
        BilletterieLiveComponent_1.prototype.minutesEcoulees = function (date) {
            return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
        };
        BilletterieLiveComponent_1.prototype.ouvrirDetail = function (b) {
            this.billetDetailAffiche = b;
        };
        BilletterieLiveComponent_1.prototype.fermerDetail = function () {
            this.billetDetailAffiche = null;
        };
        BilletterieLiveComponent_1.prototype.confirmerPaiement = function (b, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.billetsService.changerStatut(b.id, 'PAYE');
            this.toastService.success("Billet ".concat(b.numeroReference, " marqu\u00E9 comme pay\u00E9."));
        };
        BilletterieLiveComponent_1.prototype.validerEntree = function (b, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.billetsService.changerStatut(b.id, 'UTILISE');
            this.toastService.success("Entr\u00E9e valid\u00E9e pour le billet ".concat(b.numeroReference, "."));
        };
        BilletterieLiveComponent_1.prototype.annulerBillet = function (b, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            if (!confirm("Annuler le billet ".concat(b.numeroReference, " ?")))
                return;
            this.billetsService.changerStatut(b.id, 'ANNULE');
            this.toastService.success('Billet annulé.');
        };
        return BilletterieLiveComponent_1;
    }());
    __setFunctionName(_classThis, "BilletterieLiveComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BilletterieLiveComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BilletterieLiveComponent = _classThis;
}();
export { BilletterieLiveComponent };
//# sourceMappingURL=billetterie-live.component.js.map