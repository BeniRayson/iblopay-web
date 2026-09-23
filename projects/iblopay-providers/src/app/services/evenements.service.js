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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MOCK_LIEUX, MOCK_ORGANISATEURS, MOCK_EVENEMENTS, MOCK_HISTORIQUE_VENTES, MOCK_RECLAMATIONS_EVENEMENTS } from '../data/mock-events-data';
var EvenementsService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EvenementsService = _classThis = /** @class */ (function () {
        function EvenementsService_1() {
            this.lieux = __spreadArray([], MOCK_LIEUX, true);
            this.organisateurs = __spreadArray([], MOCK_ORGANISATEURS, true);
            this.evenements = __spreadArray([], MOCK_EVENEMENTS, true);
            this.historique = __spreadArray([], MOCK_HISTORIQUE_VENTES, true);
            this.reclamations = __spreadArray([], MOCK_RECLAMATIONS_EVENEMENTS, true);
            this.typesLieux = ['Stade', 'Salle de concert', 'Salle de conférence', 'Plein air', 'Autre'];
            this.nextLieuId = Math.max.apply(Math, __spreadArray([0], this.lieux.map(function (l) { return l.id; }), false)) + 1;
            this.nextOrganisateurId = Math.max.apply(Math, __spreadArray([0], this.organisateurs.map(function (o) { return o.id; }), false)) + 1;
            this.nextEvenementId = Math.max.apply(Math, __spreadArray([0], this.evenements.map(function (e) { return e.id; }), false)) + 1;
        }
        // ─── TYPES DE LIEUX (extensibles) ─────────────────────────
        EvenementsService_1.prototype.getTypesLieux = function () {
            return of(this.typesLieux).pipe(delay(100));
        };
        EvenementsService_1.prototype.ajouterTypeLieu = function (nom) {
            var propre = nom.trim();
            if (propre && !this.typesLieux.some(function (t) { return t.toLowerCase() === propre.toLowerCase(); })) {
                this.typesLieux = __spreadArray(__spreadArray([], this.typesLieux, true), [propre], false);
            }
        };
        // ─── LIEUX ───────────────────────────────────────────────
        EvenementsService_1.prototype.getLieux = function () {
            return of(this.lieux).pipe(delay(200));
        };
        EvenementsService_1.prototype.creerLieu = function (l) {
            var created = {
                id: this.nextLieuId++, nom: l.nom || '', ville: l.ville || '', adresse: l.adresse || '',
                type: l.type || 'Autre', capaciteMax: l.capaciteMax || 0, statut: l.statut || 'ACTIF'
            };
            if (created.type)
                this.ajouterTypeLieu(created.type);
            this.lieux = __spreadArray([created], this.lieux, true);
            return of(created).pipe(delay(200));
        };
        EvenementsService_1.prototype.modifierLieu = function (l) {
            this.lieux = this.lieux.map(function (x) { return x.id === l.id ? __assign({}, l) : x; });
            return of(l).pipe(delay(200));
        };
        EvenementsService_1.prototype.supprimerLieu = function (id) {
            this.lieux = this.lieux.filter(function (l) { return l.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        EvenementsService_1.prototype.toggleStatutLieu = function (l) {
            return this.modifierLieu(__assign(__assign({}, l), { statut: l.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' }));
        };
        // ─── ORGANISATEURS ───────────────────────────────────────
        EvenementsService_1.prototype.getOrganisateurs = function () {
            return of(this.organisateurs).pipe(delay(200));
        };
        EvenementsService_1.prototype.creerOrganisateur = function (o) {
            var created = __assign(__assign({ id: this.nextOrganisateurId++, nom: o.nom || '', prenom: o.prenom || '', telephone: o.telephone || '', adresse: o.adresse || '', statut: 'ACTIF', nombreEvenements: o.nombreEvenements || 0, revenuTotal: o.revenuTotal || 0, dateInscription: new Date() }, (o.entreprise !== undefined ? { entreprise: o.entreprise } : {})), (o.email !== undefined ? { email: o.email } : {}));
            this.organisateurs = __spreadArray([created], this.organisateurs, true);
            return of(created).pipe(delay(200));
        };
        EvenementsService_1.prototype.modifierOrganisateur = function (o) {
            this.organisateurs = this.organisateurs.map(function (x) { return x.id === o.id ? __assign({}, o) : x; });
            return of(o).pipe(delay(200));
        };
        EvenementsService_1.prototype.toggleStatutOrganisateur = function (id) {
            this.organisateurs = this.organisateurs.map(function (o) { return o.id === id ? __assign(__assign({}, o), { statut: o.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' }) : o; });
            return of(this.organisateurs.find(function (o) { return o.id === id; })).pipe(delay(150));
        };
        EvenementsService_1.prototype.supprimerOrganisateur = function (id) {
            this.organisateurs = this.organisateurs.filter(function (o) { return o.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        // ─── ÉVÉNEMENTS ──────────────────────────────────────────
        EvenementsService_1.prototype.getEvenements = function () {
            return of(this.evenements).pipe(delay(200));
        };
        EvenementsService_1.prototype.getEvenementById = function (id) {
            return this.getEvenements().pipe(map(function (list) { return list.find(function (e) { return e.id === id; }); }));
        };
        EvenementsService_1.prototype.creerEvenement = function (e) {
            var created = {
                id: this.nextEvenementId++, nom: e.nom || '', type: e.type || 'AUTRE', lieuId: e.lieuId || 0,
                organisateurId: e.organisateurId || 0, dateDebut: e.dateDebut || new Date(), dateFin: e.dateFin || new Date(),
                description: e.description || '', capaciteTotale: e.capaciteTotale || 0,
                categoriesBillets: e.categoriesBillets || [], statut: e.statut || 'PROGRAMME', dateCreation: new Date()
            };
            this.evenements = __spreadArray([created], this.evenements, true);
            return of(created).pipe(delay(200));
        };
        EvenementsService_1.prototype.modifierEvenement = function (e) {
            this.evenements = this.evenements.map(function (x) { return x.id === e.id ? __assign({}, e) : x; });
            return of(e).pipe(delay(200));
        };
        EvenementsService_1.prototype.supprimerEvenement = function (id) {
            this.evenements = this.evenements.filter(function (e) { return e.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        EvenementsService_1.prototype.toggleStatutEvenement = function (e, statut) {
            return this.modifierEvenement(__assign(__assign({}, e), { statut: statut }));
        };
        // ─── STATISTIQUES ────────────────────────────────────────
        EvenementsService_1.prototype.getStatsGlobal = function () {
            var actifs = this.evenements.filter(function (e) { return e.statut === 'PROGRAMME' || e.statut === 'EN_COURS'; }).length;
            var billetsVendusTotal = this.evenements.reduce(function (sum, e) {
                return sum + e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue; }, 0);
            }, 0);
            var revenuTotal = this.evenements.reduce(function (sum, e) {
                return sum + e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue * c.prix; }, 0);
            }, 0);
            var capaciteTotale = this.evenements.reduce(function (sum, e) { return sum + e.capaciteTotale; }, 0);
            var stats = {
                totalEvenements: this.evenements.length,
                evenementsActifs: actifs,
                totalOrganisateurs: this.organisateurs.filter(function (o) { return o.statut === 'ACTIF'; }).length,
                billetsVendusAujourdhui: Math.round(billetsVendusTotal * 0.04) || 32,
                revenuAujourdhui: Math.round(revenuTotal * 0.04) || 480000,
                tauxRemplissageMoyen: capaciteTotale ? Math.round((billetsVendusTotal / capaciteTotale) * 100) : 0,
                reclamationsOuvertes: this.reclamations.filter(function (r) { return r.statut !== 'RESOLU'; }).length
            };
            return of(stats).pipe(delay(150));
        };
        EvenementsService_1.prototype.getStatsParEvenement = function () {
            var stats = this.evenements.map(function (e) {
                var billetsVendus = e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue; }, 0);
                var revenu = e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue * c.prix; }, 0);
                return {
                    id: e.id, nom: e.nom, type: e.type,
                    billetsVendus: billetsVendus,
                    revenu: revenu,
                    tauxRemplissage: e.capaciteTotale ? Math.round((billetsVendus / e.capaciteTotale) * 100) : 0
                };
            });
            return of(stats).pipe(delay(150));
        };
        // ─── HISTORIQUE DES VENTES ───────────────────────────────
        EvenementsService_1.prototype.getHistorique = function () {
            return of(this.historique).pipe(delay(200));
        };
        EvenementsService_1.prototype.getHistoriqueParEvenement = function (evenementId) {
            return this.getHistorique().pipe(map(function (list) {
                return list.filter(function (h) { return h.evenementId === evenementId; }).sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
            }));
        };
        // ─── RÉCLAMATIONS ────────────────────────────────────────
        EvenementsService_1.prototype.getReclamations = function () {
            return of(this.reclamations).pipe(delay(150));
        };
        return EvenementsService_1;
    }());
    __setFunctionName(_classThis, "EvenementsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EvenementsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EvenementsService = _classThis;
}();
export { EvenementsService };
//# sourceMappingURL=evenements.service.js.map