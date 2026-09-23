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
var STATUTS_BUS = ['EN_SERVICE', 'AU_DEPOT', 'EN_PANNE', 'EN_MAINTENANCE'];
var STATUTS_TAXI = ['DISPONIBLE', 'EN_COURSE', 'HORS_SERVICE', 'EN_MAINTENANCE'];
var FlotteComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-flotte',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './flotte.component.html',
            styleUrl: './flotte.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FlotteComponent = _classThis = /** @class */ (function () {
        function FlotteComponent_1(transportService, toastService) {
            this.transportService = transportService;
            this.toastService = toastService;
            this.vueActive = 'VEHICULES';
            this.vehicules = [];
            this.vehiculesFiltres = [];
            this.chauffeurs = [];
            this.chauffeursFiltres = [];
            this.lignes = [];
            this.zones = [];
            this.filtreType = '';
            this.filtreStatutVehicule = '';
            this.filtreStatutChauffeur = '';
            this.recherche = '';
            this.isLoading = true;
            this.showVehiculeModal = false;
            this.vehiculeForm = null;
            this.showChauffeurModal = false;
            this.chauffeurForm = null;
            // ─── DÉTAIL D'UNE LIGNE (clic sur le tableau) ──────────────
            this.vehiculeDetailAffiche = null;
            this.chauffeurDetailAffiche = null;
        }
        FlotteComponent_1.prototype.ngOnInit = function () {
            this.charger();
        };
        FlotteComponent_1.prototype.charger = function () {
            var _this = this;
            this.isLoading = true;
            this.transportService.getLignes().subscribe(function (l) { return _this.lignes = l; });
            this.transportService.getZones().subscribe(function (z) { return _this.zones = z; });
            this.transportService.getVehicules().subscribe(function (v) {
                _this.vehicules = v;
                _this.appliquerFiltresVehicules();
                _this.transportService.getChauffeurs().subscribe(function (c) {
                    _this.chauffeurs = c;
                    _this.appliquerFiltresChauffeurs();
                    _this.isLoading = false;
                });
            });
        };
        FlotteComponent_1.prototype.changerVue = function (vue) {
            this.vueActive = vue;
        };
        // ─── FILTRES ─────────────────────────────────────────────
        FlotteComponent_1.prototype.appliquerFiltresVehicules = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            this.vehiculesFiltres = this.vehicules.filter(function (v) {
                var matchType = !_this.filtreType || v.type === _this.filtreType;
                var matchStatut = !_this.filtreStatutVehicule || v.statut === _this.filtreStatutVehicule;
                var matchTerm = !term || v.matricule.toLowerCase().includes(term) || v.marqueModele.toLowerCase().includes(term);
                return matchType && matchStatut && matchTerm;
            });
        };
        FlotteComponent_1.prototype.appliquerFiltresChauffeurs = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            this.chauffeursFiltres = this.chauffeurs.filter(function (c) {
                var matchStatut = !_this.filtreStatutChauffeur || c.statut === _this.filtreStatutChauffeur;
                var matchTerm = !term || "".concat(c.prenom, " ").concat(c.nom).toLowerCase().includes(term) || c.numeroPermis.toLowerCase().includes(term);
                return matchStatut && matchTerm;
            });
        };
        FlotteComponent_1.prototype.onFiltreChange = function () {
            this.appliquerFiltresVehicules();
            this.appliquerFiltresChauffeurs();
        };
        // ─── HELPERS D'AFFICHAGE ─────────────────────────────────
        FlotteComponent_1.prototype.nomChauffeur = function (id) {
            if (!id)
                return 'Non assigné';
            var c = this.chauffeurs.find(function (x) { return x.id === id; });
            return c ? "".concat(c.prenom, " ").concat(c.nom) : 'Non assigné';
        };
        FlotteComponent_1.prototype.nomLigneOuZone = function (v) {
            var _a, _b;
            if (v.type === 'BUS')
                return ((_a = this.lignes.find(function (l) { return l.id === v.ligneId; })) === null || _a === void 0 ? void 0 : _a.nom) || 'Non assignée';
            return ((_b = this.zones.find(function (z) { return z.id === v.zoneId; })) === null || _b === void 0 ? void 0 : _b.nom) || 'Non assignée';
        };
        FlotteComponent_1.prototype.vehiculeAssigne = function (chauffeurId) {
            return this.vehicules.find(function (v) { return v.chauffeurId === chauffeurId; });
        };
        FlotteComponent_1.prototype.statutsDisponibles = function (type) {
            return type === 'BUS' ? STATUTS_BUS : STATUTS_TAXI;
        };
        FlotteComponent_1.prototype.statutVehiculeClass = function (statut) {
            var map = {
                EN_SERVICE: 'badge-green', DISPONIBLE: 'badge-green', EN_COURSE: 'badge-blue',
                AU_DEPOT: 'badge-gray', EN_PANNE: 'badge-red', EN_MAINTENANCE: 'badge-orange', HORS_SERVICE: 'badge-gray'
            };
            return map[statut] || 'badge-gray';
        };
        FlotteComponent_1.prototype.statutVehiculeLabel = function (statut) {
            var map = {
                EN_SERVICE: 'En service', DISPONIBLE: 'Disponible', EN_COURSE: 'En course',
                AU_DEPOT: 'Au dépôt', EN_PANNE: 'En panne', EN_MAINTENANCE: 'En maintenance', HORS_SERVICE: 'Hors service'
            };
            return map[statut] || statut;
        };
        FlotteComponent_1.prototype.permisExpireBientot = function (date) {
            var dans60Jours = Date.now() + 60 * 24 * 3600000;
            return new Date(date).getTime() < dans60Jours;
        };
        FlotteComponent_1.prototype.motorisationLabel = function (m) {
            var map = { ESSENCE: 'Essence', DIESEL: 'Diesel', ELECTRIQUE: 'Électrique', HYBRIDE: 'Hybride' };
            return map[m] || m;
        };
        FlotteComponent_1.prototype.consommationFormatee = function (v) {
            var total = (v.kilometrage / 100) * v.consommationMoyenne100km;
            var unite = v.motorisation === 'ELECTRIQUE' ? 'kWh' : 'L';
            return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(total) + ' ' + unite;
        };
        // ─── DÉTAIL D'UNE LIGNE (clic sur le tableau) ──────────────
        FlotteComponent_1.prototype.voirDetailVehicule = function (v) {
            this.vehiculeDetailAffiche = v;
        };
        FlotteComponent_1.prototype.fermerDetailVehicule = function () {
            this.vehiculeDetailAffiche = null;
        };
        FlotteComponent_1.prototype.voirDetailChauffeur = function (c) {
            this.chauffeurDetailAffiche = c;
        };
        FlotteComponent_1.prototype.fermerDetailChauffeur = function () {
            this.chauffeurDetailAffiche = null;
        };
        // ─── CRUD VÉHICULES ──────────────────────────────────────
        FlotteComponent_1.prototype.ouvrirNouveauVehicule = function () {
            this.vehiculeForm = {
                type: 'BUS', matricule: '', marqueModele: '', capacite: 30, statut: 'AU_DEPOT',
                chauffeurId: null, ligneId: null, zoneId: null, kilometrage: 0,
                motorisation: 'DIESEL', consommationMoyenne100km: 19
            };
            this.showVehiculeModal = true;
        };
        FlotteComponent_1.prototype.modifierVehicule = function (v) {
            var _a, _b, _c, _d;
            this.vehiculeForm = {
                id: v.id, type: v.type, matricule: v.matricule, marqueModele: v.marqueModele,
                capacite: (_a = v.capacite) !== null && _a !== void 0 ? _a : null, statut: v.statut, chauffeurId: (_b = v.chauffeurId) !== null && _b !== void 0 ? _b : null,
                ligneId: (_c = v.ligneId) !== null && _c !== void 0 ? _c : null, zoneId: (_d = v.zoneId) !== null && _d !== void 0 ? _d : null, kilometrage: v.kilometrage,
                motorisation: v.motorisation, consommationMoyenne100km: v.consommationMoyenne100km
            };
            this.showVehiculeModal = true;
        };
        FlotteComponent_1.prototype.fermerVehiculeModal = function () {
            this.showVehiculeModal = false;
            this.vehiculeForm = null;
        };
        FlotteComponent_1.prototype.onChangerTypeVehicule = function () {
            if (!this.vehiculeForm)
                return;
            this.vehiculeForm.statut = this.vehiculeForm.type === 'BUS' ? 'AU_DEPOT' : 'DISPONIBLE';
            this.vehiculeForm.ligneId = null;
            this.vehiculeForm.zoneId = null;
            this.vehiculeForm.capacite = this.vehiculeForm.type === 'BUS' ? 30 : null;
        };
        FlotteComponent_1.prototype.enregistrerVehicule = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var f = this.vehiculeForm;
            if (!f)
                return;
            if (!f.matricule.trim() || !f.marqueModele.trim()) {
                this.toastService.error('Veuillez renseigner le matricule et le modèle du véhicule.');
                return;
            }
            var payload = {
                id: f.id, type: f.type, matricule: f.matricule.trim().toUpperCase(), marqueModele: f.marqueModele,
                capacite: (_a = f.capacite) !== null && _a !== void 0 ? _a : undefined, statut: f.statut,
                chauffeurId: (_b = f.chauffeurId) !== null && _b !== void 0 ? _b : undefined, ligneId: (_c = f.ligneId) !== null && _c !== void 0 ? _c : undefined, zoneId: (_d = f.zoneId) !== null && _d !== void 0 ? _d : undefined,
                kilometrage: f.kilometrage, motorisation: f.motorisation, consommationMoyenne100km: f.consommationMoyenne100km
            };
            var obs = f.id ? this.transportService.modifierVehicule(payload) : this.transportService.creerVehicule(payload);
            obs.subscribe(function (v) {
                _this.toastService.success(f.id ? "V\u00E9hicule ".concat(v.matricule, " mis \u00E0 jour.") : "V\u00E9hicule ".concat(v.matricule, " ajout\u00E9 \u00E0 la flotte."));
                _this.fermerVehiculeModal();
                _this.charger();
            });
        };
        FlotteComponent_1.prototype.supprimerVehicule = function (v) {
            var _this = this;
            if (!confirm("Retirer le v\u00E9hicule ".concat(v.matricule, " de la flotte ?")))
                return;
            this.transportService.supprimerVehicule(v.id).subscribe(function () {
                _this.toastService.success('Véhicule retiré de la flotte.');
                _this.charger();
            });
        };
        // ─── CRUD CHAUFFEURS ─────────────────────────────────────
        FlotteComponent_1.prototype.ouvrirNouveauChauffeur = function () {
            this.chauffeurForm = {
                nom: '', prenom: '', telephone: '', adresse: '', numeroPermis: '', permisValidite: '', vehiculeId: null
            };
            this.showChauffeurModal = true;
        };
        FlotteComponent_1.prototype.modifierChauffeur = function (c) {
            var _a;
            this.chauffeurForm = {
                id: c.id, nom: c.nom, prenom: c.prenom, telephone: c.telephone, adresse: c.adresse,
                numeroPermis: c.numeroPermis, permisValidite: new Date(c.permisValidite).toISOString().slice(0, 10),
                vehiculeId: (_a = c.vehiculeId) !== null && _a !== void 0 ? _a : null
            };
            this.showChauffeurModal = true;
        };
        FlotteComponent_1.prototype.fermerChauffeurModal = function () {
            this.showChauffeurModal = false;
            this.chauffeurForm = null;
        };
        FlotteComponent_1.prototype.enregistrerChauffeur = function () {
            var _this = this;
            var _a;
            var f = this.chauffeurForm;
            if (!f)
                return;
            if (!f.nom.trim() || !f.prenom.trim() || !f.telephone.trim() || !f.numeroPermis.trim() || !f.permisValidite) {
                this.toastService.error('Veuillez remplir le nom, prénom, téléphone, n° de permis et sa date de validité.');
                return;
            }
            var payload = {
                id: f.id, nom: f.nom, prenom: f.prenom, telephone: f.telephone, adresse: f.adresse,
                numeroPermis: f.numeroPermis, permisValidite: new Date(f.permisValidite),
                vehiculeId: (_a = f.vehiculeId) !== null && _a !== void 0 ? _a : undefined
            };
            var obs = f.id ? this.transportService.modifierChauffeur(payload) : this.transportService.creerChauffeur(payload);
            obs.subscribe(function (c) {
                _this.toastService.success(f.id ? "Chauffeur ".concat(c.prenom, " ").concat(c.nom, " mis \u00E0 jour.") : "Chauffeur ".concat(c.prenom, " ").concat(c.nom, " ajout\u00E9."));
                _this.fermerChauffeurModal();
                _this.charger();
            });
        };
        FlotteComponent_1.prototype.toggleStatutChauffeur = function (c, event) {
            var _this = this;
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.transportService.toggleStatutChauffeur(c.id).subscribe(function () {
                _this.toastService.success("Chauffeur ".concat(c.statut === 'ACTIF' ? 'désactivé' : 'activé', "."));
                _this.charger();
            });
        };
        FlotteComponent_1.prototype.supprimerChauffeur = function (c) {
            var _this = this;
            if (!confirm("Supprimer la fiche de ".concat(c.prenom, " ").concat(c.nom, " ?")))
                return;
            this.transportService.supprimerChauffeur(c.id).subscribe(function () {
                _this.toastService.success('Chauffeur supprimé.');
                _this.charger();
            });
        };
        return FlotteComponent_1;
    }());
    __setFunctionName(_classThis, "FlotteComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FlotteComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FlotteComponent = _classThis;
}();
export { FlotteComponent };
//# sourceMappingURL=flotte.component.js.map