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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
var LignesTarifsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-lignes-tarifs',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './lignes-tarifs.component.html',
            styleUrl: './lignes-tarifs.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LignesTarifsComponent = _classThis = /** @class */ (function () {
        function LignesTarifsComponent_1(transportService, coursesService, toastService) {
            this.transportService = transportService;
            this.coursesService = coursesService;
            this.toastService = toastService;
            this.vueActive = 'LIGNES';
            this.lignes = [];
            this.zones = [];
            this.vehicules = [];
            this.chauffeurs = [];
            this.coursesActives = [];
            this.isLoading = true;
            this.showLigneModal = false;
            this.ligneForm = null;
            this.nouvelArret = '';
            this.showZoneModal = false;
            this.zoneForm = null;
            // ─── DÉTAILS D'UN TRAJET (bus ou zone) ─────────────────────
            this.ligneDetailAffichee = null;
            this.zoneDetailAffichee = null;
            // ─── HISTORIQUE (avec pagination) ──────────────────────────
            this.historiqueOuvert = false;
            this.historiqueTitre = '';
            this.historiqueLignes = [];
            this.historiquePage = 1;
            this.historiquePageSize = 10;
        }
        LignesTarifsComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.charger();
            this.coursesService.getAll().subscribe(function (courses) { return _this.coursesActives = courses; });
        };
        LignesTarifsComponent_1.prototype.charger = function () {
            var _this = this;
            this.isLoading = true;
            this.transportService.getVehicules().subscribe(function (v) { return _this.vehicules = v; });
            this.transportService.getChauffeurs().subscribe(function (c) { return _this.chauffeurs = c; });
            this.transportService.getLignes().subscribe(function (l) {
                _this.lignes = l;
                _this.transportService.getZones().subscribe(function (z) {
                    _this.zones = z;
                    _this.isLoading = false;
                });
            });
        };
        LignesTarifsComponent_1.prototype.changerVue = function (vue) {
            this.vueActive = vue;
        };
        // ─── STATUT EN COURS / TERMINÉ ───────────────────────────
        /** Véhicules actuellement EN_COURS sur cette ligne (permet le badge de statut + affichage détail). */
        LignesTarifsComponent_1.prototype.vehiculesEnCoursPourLigne = function (ligneId) {
            var vehiculeIdsEnCourse = new Set(this.coursesActives.filter(function (c) { return c.statut === 'EN_COURS' && c.type === 'BUS'; }).map(function (c) { return c.vehiculeId; }));
            return this.vehicules.filter(function (v) { return v.ligneId === ligneId && v.id !== undefined && vehiculeIdsEnCourse.has(v.id); });
        };
        LignesTarifsComponent_1.prototype.ligneEnCours = function (ligneId) {
            return this.vehiculesEnCoursPourLigne(ligneId).length > 0;
        };
        LignesTarifsComponent_1.prototype.vehiculesEnCoursPourZone = function (zoneId) {
            var vehiculeIdsEnCourse = new Set(this.coursesActives.filter(function (c) { return c.statut === 'EN_COURS' && c.type === 'TAXI'; }).map(function (c) { return c.vehiculeId; }));
            return this.vehicules.filter(function (v) { return v.zoneId === zoneId && v.id !== undefined && vehiculeIdsEnCourse.has(v.id); });
        };
        LignesTarifsComponent_1.prototype.zoneEnCours = function (zoneId) {
            return this.vehiculesEnCoursPourZone(zoneId).length > 0;
        };
        // ─── VÉHICULES / CHAUFFEURS ASSIGNÉS (pour le détail) ────
        LignesTarifsComponent_1.prototype.vehiculesDeLaLigne = function (ligneId) {
            return this.vehicules.filter(function (v) { return v.ligneId === ligneId; });
        };
        LignesTarifsComponent_1.prototype.vehiculesDeLaZone = function (zoneId) {
            return this.vehicules.filter(function (v) { return v.zoneId === zoneId; });
        };
        LignesTarifsComponent_1.prototype.nomChauffeur = function (id) {
            if (!id)
                return 'Aucun chauffeur assigné';
            var c = this.chauffeurs.find(function (x) { return x.id === id; });
            return c ? "".concat(c.prenom, " ").concat(c.nom) : 'Aucun chauffeur assigné';
        };
        // ─── DÉTAIL D'UN TRAJET ───────────────────────────────────
        LignesTarifsComponent_1.prototype.voirDetailLigne = function (l) {
            this.ligneDetailAffichee = l;
        };
        LignesTarifsComponent_1.prototype.fermerDetailLigne = function () {
            this.ligneDetailAffichee = null;
        };
        LignesTarifsComponent_1.prototype.voirDetailZone = function (z) {
            this.zoneDetailAffichee = z;
        };
        LignesTarifsComponent_1.prototype.fermerDetailZone = function () {
            this.zoneDetailAffichee = null;
        };
        // ─── HISTORIQUE PAGINÉ ────────────────────────────────────
        LignesTarifsComponent_1.prototype.ouvrirHistoriqueLigne = function (l) {
            var _this = this;
            this.historiqueTitre = "Historique du trajet \u00AB ".concat(l.nom, " \u00BB");
            this.historiquePage = 1;
            this.transportService.getHistoriqueParLigne(l.id).subscribe(function (h) {
                _this.historiqueLignes = h;
                _this.historiqueOuvert = true;
            });
        };
        LignesTarifsComponent_1.prototype.ouvrirHistoriqueZone = function (z) {
            var _this = this;
            this.historiqueTitre = "Historique de la zone \u00AB ".concat(z.nom, " \u00BB");
            this.historiquePage = 1;
            this.transportService.getHistoriqueParZone(z.id).subscribe(function (h) {
                _this.historiqueLignes = h;
                _this.historiqueOuvert = true;
            });
        };
        LignesTarifsComponent_1.prototype.fermerHistorique = function () {
            this.historiqueOuvert = false;
            this.historiqueLignes = [];
        };
        Object.defineProperty(LignesTarifsComponent_1.prototype, "historiqueRevenuTotal", {
            get: function () {
                return this.historiqueLignes.filter(function (h) { return h.statut === 'TERMINE'; }).reduce(function (sum, h) { return sum + h.revenu; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LignesTarifsComponent_1.prototype, "historiqueTrajetsTermines", {
            get: function () {
                return this.historiqueLignes.filter(function (h) { return h.statut === 'TERMINE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LignesTarifsComponent_1.prototype, "historiqueTotalPages", {
            get: function () {
                return Math.ceil(this.historiqueLignes.length / this.historiquePageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LignesTarifsComponent_1.prototype, "historiquePagine", {
            get: function () {
                var start = (this.historiquePage - 1) * this.historiquePageSize;
                return this.historiqueLignes.slice(start, start + this.historiquePageSize);
            },
            enumerable: false,
            configurable: true
        });
        LignesTarifsComponent_1.prototype.changerPageHistorique = function (page) {
            if (page >= 1 && page <= this.historiqueTotalPages)
                this.historiquePage = page;
        };
        // ─── LIGNES DE BUS (CRUD) ─────────────────────────────────
        LignesTarifsComponent_1.prototype.ouvrirNouvelleLigne = function () {
            this.ligneForm = { nom: '', code: '', arrets: [], tarif: this.transportService.calculerTarifEtat(10), distanceKm: 10, dureeMinutesEstimee: 30, frequenceMinutes: 15, statut: 'ACTIVE' };
            this.nouvelArret = '';
            this.showLigneModal = true;
        };
        LignesTarifsComponent_1.prototype.modifierLigne = function (l) {
            this.ligneForm = { id: l.id, nom: l.nom, code: l.code, arrets: __spreadArray([], l.arrets, true), tarif: l.tarif, distanceKm: l.distanceKm, dureeMinutesEstimee: l.dureeMinutesEstimee, frequenceMinutes: l.frequenceMinutes, statut: l.statut };
            this.nouvelArret = '';
            this.showLigneModal = true;
        };
        /** Le tarif est fixé par l'État (barème officiel) : recalculé automatiquement à chaque changement de distance, jamais saisi à la main. */
        LignesTarifsComponent_1.prototype.recalculerTarifEtat = function () {
            if (!this.ligneForm)
                return;
            this.ligneForm.tarif = this.transportService.calculerTarifEtat(this.ligneForm.distanceKm);
        };
        Object.defineProperty(LignesTarifsComponent_1.prototype, "tarifParKmEtat", {
            get: function () {
                return this.transportService.TARIF_ETAT_PAR_KM;
            },
            enumerable: false,
            configurable: true
        });
        LignesTarifsComponent_1.prototype.fermerLigneModal = function () {
            this.showLigneModal = false;
            this.ligneForm = null;
        };
        LignesTarifsComponent_1.prototype.ajouterArret = function () {
            if (!this.ligneForm || !this.nouvelArret.trim())
                return;
            this.ligneForm.arrets.push(this.nouvelArret.trim());
            this.nouvelArret = '';
        };
        LignesTarifsComponent_1.prototype.supprimerArret = function (index) {
            var _a;
            (_a = this.ligneForm) === null || _a === void 0 ? void 0 : _a.arrets.splice(index, 1);
        };
        LignesTarifsComponent_1.prototype.enregistrerLigne = function () {
            var _this = this;
            var f = this.ligneForm;
            if (!f)
                return;
            if (!f.nom.trim() || !f.code.trim()) {
                this.toastService.error('Veuillez renseigner le nom et le code du trajet.');
                return;
            }
            if (f.arrets.length < 2) {
                this.toastService.error('Ajoutez au moins deux arrêts (départ et destination).');
                return;
            }
            var obs = f.id ? this.transportService.modifierLigne(f) : this.transportService.creerLigne(f);
            obs.subscribe(function (l) {
                _this.toastService.success(f.id ? "Trajet \u00AB ".concat(l.nom, " \u00BB mis \u00E0 jour.") : "Trajet \u00AB ".concat(l.nom, " \u00BB cr\u00E9\u00E9."));
                _this.fermerLigneModal();
                _this.charger();
            });
        };
        LignesTarifsComponent_1.prototype.supprimerLigne = function (l) {
            var _this = this;
            if (!confirm("Supprimer le trajet \u00AB ".concat(l.nom, " \u00BB ?")))
                return;
            this.transportService.supprimerLigne(l.id).subscribe(function () {
                _this.toastService.success('Trajet supprimé.');
                _this.charger();
            });
        };
        LignesTarifsComponent_1.prototype.toggleStatutLigne = function (l) {
            var _this = this;
            this.transportService.modifierLigne(__assign(__assign({}, l), { statut: l.statut === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })).subscribe(function () {
                _this.toastService.success("Trajet ".concat(l.statut === 'ACTIVE' ? 'désactivé' : 'activé', "."));
                _this.charger();
            });
        };
        // ─── ZONES TAXI (CRUD) ────────────────────────────────────
        LignesTarifsComponent_1.prototype.ouvrirNouvelleZone = function () {
            this.zoneForm = { nom: '', tarification: 'COMPTEUR', tarifBase: 2000, tarifParKm: 800, forfaitMoyen: null, statut: 'ACTIVE' };
            this.showZoneModal = true;
        };
        LignesTarifsComponent_1.prototype.modifierZone = function (z) {
            var _a, _b;
            this.zoneForm = { id: z.id, nom: z.nom, tarification: z.tarification, tarifBase: z.tarifBase, tarifParKm: (_a = z.tarifParKm) !== null && _a !== void 0 ? _a : null, forfaitMoyen: (_b = z.forfaitMoyen) !== null && _b !== void 0 ? _b : null, statut: z.statut };
            this.showZoneModal = true;
        };
        LignesTarifsComponent_1.prototype.fermerZoneModal = function () {
            this.showZoneModal = false;
            this.zoneForm = null;
        };
        LignesTarifsComponent_1.prototype.enregistrerZone = function () {
            var _this = this;
            var _a, _b;
            var f = this.zoneForm;
            if (!f)
                return;
            if (!f.nom.trim()) {
                this.toastService.error('Veuillez renseigner le nom de la zone.');
                return;
            }
            var payload = {
                id: f.id, nom: f.nom, tarification: f.tarification, tarifBase: f.tarifBase,
                tarifParKm: (_a = f.tarifParKm) !== null && _a !== void 0 ? _a : undefined, forfaitMoyen: (_b = f.forfaitMoyen) !== null && _b !== void 0 ? _b : undefined, statut: f.statut
            };
            var obs = f.id ? this.transportService.modifierZone(payload) : this.transportService.creerZone(payload);
            obs.subscribe(function (z) {
                _this.toastService.success(f.id ? "Zone \u00AB ".concat(z.nom, " \u00BB mise \u00E0 jour.") : "Zone \u00AB ".concat(z.nom, " \u00BB cr\u00E9\u00E9e."));
                _this.fermerZoneModal();
                _this.charger();
            });
        };
        LignesTarifsComponent_1.prototype.supprimerZone = function (z) {
            var _this = this;
            if (!confirm("Supprimer la zone \u00AB ".concat(z.nom, " \u00BB ?")))
                return;
            this.transportService.supprimerZone(z.id).subscribe(function () {
                _this.toastService.success('Zone supprimée.');
                _this.charger();
            });
        };
        LignesTarifsComponent_1.prototype.toggleStatutZone = function (z) {
            var _this = this;
            this.transportService.modifierZone(__assign(__assign({}, z), { statut: z.statut === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })).subscribe(function () {
                _this.toastService.success("Zone ".concat(z.statut === 'ACTIVE' ? 'désactivée' : 'activée', "."));
                _this.charger();
            });
        };
        return LignesTarifsComponent_1;
    }());
    __setFunctionName(_classThis, "LignesTarifsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LignesTarifsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LignesTarifsComponent = _classThis;
}();
export { LignesTarifsComponent };
//# sourceMappingURL=lignes-tarifs.component.js.map