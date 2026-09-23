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
import { MOCK_VEHICULES, MOCK_CHAUFFEURS, MOCK_LIGNES_BUS, MOCK_ZONES_TAXI, MOCK_HISTORIQUE_TRAJETS, MOCK_INCIDENTS_TRANSPORT } from '../data/mock-transport-data';
var TransportService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransportService = _classThis = /** @class */ (function () {
        function TransportService_1() {
            /** Tarif fixé par l'État pour le transport en commun (BIF par kilomètre). Non modifiable par l'admin. */
            this.TARIF_ETAT_PAR_KM = 65;
            this.vehicules = __spreadArray([], MOCK_VEHICULES, true);
            this.chauffeurs = __spreadArray([], MOCK_CHAUFFEURS, true);
            this.lignes = __spreadArray([], MOCK_LIGNES_BUS, true);
            this.zones = __spreadArray([], MOCK_ZONES_TAXI, true);
            this.historique = __spreadArray([], MOCK_HISTORIQUE_TRAJETS, true);
            this.incidents = __spreadArray([], MOCK_INCIDENTS_TRANSPORT, true);
            this.nextVehiculeId = Math.max.apply(Math, __spreadArray([0], this.vehicules.map(function (v) { return v.id; }), false)) + 1;
            this.nextChauffeurId = Math.max.apply(Math, __spreadArray([0], this.chauffeurs.map(function (c) { return c.id; }), false)) + 1;
            this.nextLigneId = Math.max.apply(Math, __spreadArray([0], this.lignes.map(function (l) { return l.id; }), false)) + 1;
            this.nextZoneId = Math.max.apply(Math, __spreadArray([0], this.zones.map(function (z) { return z.id; }), false)) + 1;
        }
        /** Calcule le tarif officiel d'un trajet de bus, arrondi aux 50 BIF les plus proches. */
        TransportService_1.prototype.calculerTarifEtat = function (distanceKm) {
            var brut = distanceKm * this.TARIF_ETAT_PAR_KM;
            return Math.max(300, Math.round(brut / 50) * 50);
        };
        // ─── VÉHICULES ───────────────────────────────────────────
        TransportService_1.prototype.getVehicules = function () {
            return of(this.vehicules).pipe(delay(200));
        };
        TransportService_1.prototype.getVehiculeById = function (id) {
            return this.getVehicules().pipe(map(function (list) { return list.find(function (v) { return v.id === id; }); }));
        };
        TransportService_1.prototype.creerVehicule = function (v) {
            var _a;
            var created = __assign(__assign(__assign(__assign(__assign({ id: this.nextVehiculeId++, type: v.type || 'BUS', matricule: v.matricule || '', marqueModele: v.marqueModele || '', statut: v.statut || (v.type === 'TAXI' ? 'DISPONIBLE' : 'AU_DEPOT'), kilometrage: v.kilometrage || 0, motorisation: v.motorisation || 'DIESEL', consommationMoyenne100km: (_a = v.consommationMoyenne100km) !== null && _a !== void 0 ? _a : (v.type === 'BUS' ? 19 : 7.5), dateMiseEnService: v.dateMiseEnService || new Date() }, (v.capacite !== undefined ? { capacite: v.capacite } : {})), (v.chauffeurId !== undefined ? { chauffeurId: v.chauffeurId } : {})), (v.ligneId !== undefined ? { ligneId: v.ligneId } : {})), (v.zoneId !== undefined ? { zoneId: v.zoneId } : {})), (v.prochaineMaintenanceKm !== undefined ? { prochaineMaintenanceKm: v.prochaineMaintenanceKm } : {}));
            this.vehicules = __spreadArray([created], this.vehicules, true);
            return of(created).pipe(delay(200));
        };
        TransportService_1.prototype.modifierVehicule = function (v) {
            this.vehicules = this.vehicules.map(function (x) { return x.id === v.id ? __assign({}, v) : x; });
            return of(v).pipe(delay(200));
        };
        TransportService_1.prototype.supprimerVehicule = function (id) {
            this.vehicules = this.vehicules.filter(function (v) { return v.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        // ─── CHAUFFEURS ──────────────────────────────────────────
        TransportService_1.prototype.getChauffeurs = function () {
            return of(this.chauffeurs).pipe(delay(200));
        };
        TransportService_1.prototype.getChauffeurById = function (id) {
            return this.getChauffeurs().pipe(map(function (list) { return list.find(function (c) { return c.id === id; }); }));
        };
        TransportService_1.prototype.creerChauffeur = function (c) {
            var created = __assign({ id: this.nextChauffeurId++, nom: c.nom || '', prenom: c.prenom || '', telephone: c.telephone || '', adresse: c.adresse || '', numeroPermis: c.numeroPermis || '', permisValidite: c.permisValidite || new Date(), statut: 'ACTIF', note: c.note || 0, nombreCourses: c.nombreCourses || 0, dateEmbauche: c.dateEmbauche || new Date() }, (c.vehiculeId !== undefined ? { vehiculeId: c.vehiculeId } : {}));
            this.chauffeurs = __spreadArray([created], this.chauffeurs, true);
            return of(created).pipe(delay(200));
        };
        TransportService_1.prototype.modifierChauffeur = function (c) {
            this.chauffeurs = this.chauffeurs.map(function (x) { return x.id === c.id ? __assign({}, c) : x; });
            return of(c).pipe(delay(200));
        };
        TransportService_1.prototype.toggleStatutChauffeur = function (id) {
            this.chauffeurs = this.chauffeurs.map(function (c) { return c.id === id ? __assign(__assign({}, c), { statut: c.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' }) : c; });
            return of(this.chauffeurs.find(function (c) { return c.id === id; })).pipe(delay(150));
        };
        TransportService_1.prototype.supprimerChauffeur = function (id) {
            this.chauffeurs = this.chauffeurs.filter(function (c) { return c.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        // ─── LIGNES DE BUS ───────────────────────────────────────
        TransportService_1.prototype.getLignes = function () {
            return of(this.lignes).pipe(delay(200));
        };
        TransportService_1.prototype.creerLigne = function (l) {
            var created = {
                id: this.nextLigneId++,
                nom: l.nom || '',
                code: l.code || '',
                arrets: l.arrets || [],
                tarif: l.tarif || 0,
                distanceKm: l.distanceKm || 0,
                dureeMinutesEstimee: l.dureeMinutesEstimee || 0,
                frequenceMinutes: l.frequenceMinutes || 15,
                statut: l.statut || 'ACTIVE'
            };
            this.lignes = __spreadArray([created], this.lignes, true);
            return of(created).pipe(delay(200));
        };
        TransportService_1.prototype.modifierLigne = function (l) {
            this.lignes = this.lignes.map(function (x) { return x.id === l.id ? __assign({}, l) : x; });
            return of(l).pipe(delay(200));
        };
        TransportService_1.prototype.supprimerLigne = function (id) {
            this.lignes = this.lignes.filter(function (l) { return l.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        // ─── ZONES TAXI ──────────────────────────────────────────
        TransportService_1.prototype.getZones = function () {
            return of(this.zones).pipe(delay(200));
        };
        TransportService_1.prototype.creerZone = function (z) {
            var created = __assign(__assign({ id: this.nextZoneId++, nom: z.nom || '', tarification: z.tarification || 'COMPTEUR', tarifBase: z.tarifBase || 0, statut: z.statut || 'ACTIVE' }, (z.tarifParKm !== undefined ? { tarifParKm: z.tarifParKm } : {})), (z.forfaitMoyen !== undefined ? { forfaitMoyen: z.forfaitMoyen } : {}));
            this.zones = __spreadArray([created], this.zones, true);
            return of(created).pipe(delay(200));
        };
        TransportService_1.prototype.modifierZone = function (z) {
            this.zones = this.zones.map(function (x) { return x.id === z.id ? __assign({}, z) : x; });
            return of(z).pipe(delay(200));
        };
        TransportService_1.prototype.supprimerZone = function (id) {
            this.zones = this.zones.filter(function (z) { return z.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        // ─── STATISTIQUES ────────────────────────────────────────
        TransportService_1.prototype.getStatsGlobal = function () {
            var actifs = this.vehicules.filter(function (v) { return v.statut === 'EN_SERVICE' || v.statut === 'DISPONIBLE' || v.statut === 'EN_COURSE'; }).length;
            var stats = {
                totalVehicules: this.vehicules.length,
                vehiculesActifs: actifs,
                totalChauffeurs: this.chauffeurs.filter(function (c) { return c.statut === 'ACTIF'; }).length,
                coursesAujourdhui: 246,
                revenuAujourdhui: 2340000,
                distanceTotaleKm: this.vehicules.reduce(function (sum, v) { return sum + v.kilometrage; }, 0),
                tauxOccupationMoyen: 68,
                incidentsOuverts: 2
            };
            return of(stats).pipe(delay(150));
        };
        TransportService_1.prototype.getStatsParLigneOuZone = function () {
            var statsLignes = this.lignes.filter(function (l) { return l.statut === 'ACTIVE'; }).map(function (l, i) { return ({
                id: l.id, nom: l.nom, type: 'BUS', courses: 80 + i * 12, revenu: (80 + i * 12) * l.tarif, tauxOccupation: 55 + i * 8
            }); });
            var statsZones = this.zones.filter(function (z) { return z.statut === 'ACTIVE'; }).map(function (z, i) { return ({
                id: z.id, nom: z.nom, type: 'TAXI', courses: 40 + i * 20, revenu: (40 + i * 20) * (z.tarifBase + (z.tarifParKm || 0) * 6), tauxOccupation: 60 + i * 5
            }); });
            return of(__spreadArray(__spreadArray([], statsLignes, true), statsZones, true)).pipe(delay(150));
        };
        // ─── HISTORIQUE DES TRAJETS ──────────────────────────────
        TransportService_1.prototype.getHistorique = function () {
            return of(this.historique).pipe(delay(200));
        };
        TransportService_1.prototype.getHistoriqueParLigne = function (ligneId) {
            return this.getHistorique().pipe(map(function (list) {
                return list.filter(function (h) { return h.ligneId === ligneId; }).sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
            }));
        };
        TransportService_1.prototype.getHistoriqueParZone = function (zoneId) {
            return this.getHistorique().pipe(map(function (list) {
                return list.filter(function (h) { return h.zoneId === zoneId; }).sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
            }));
        };
        /** Vrai si un véhicule de cette ligne a une course EN_COURS actuellement (utilisé pour badge de statut). */
        TransportService_1.prototype.ligneEstEnCours = function (ligneId, vehiculesEnCourseIds) {
            return this.vehicules.some(function (v) { return v.ligneId === ligneId && vehiculesEnCourseIds.includes(v.id); });
        };
        // ─── INCIDENTS ────────────────────────────────────────────
        TransportService_1.prototype.getIncidents = function () {
            return of(this.incidents).pipe(delay(150));
        };
        return TransportService_1;
    }());
    __setFunctionName(_classThis, "TransportService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransportService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransportService = _classThis;
}();
export { TransportService };
//# sourceMappingURL=transport.service.js.map