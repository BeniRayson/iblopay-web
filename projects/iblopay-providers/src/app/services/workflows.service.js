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
import { MOCK_WORKFLOWS, MOCK_COMPTES } from '../data/mock-data';
/** Catalogue des droits pouvant être accordés à un compte sur une étape de workflow. */
export var DROITS_CATALOGUE = [
    { code: 'VOIR_DEMANDE', label: 'Voir les demandes arrivées à cette étape', icon: 'fa-solid fa-eye' },
    { code: 'VOIR_DOCUMENTS', label: 'Voir les documents / pièces jointes', icon: 'fa-solid fa-file' },
    { code: 'VALIDER', label: 'Valider / approuver le dossier', icon: 'fa-solid fa-check' },
    { code: 'REJETER', label: 'Rejeter le dossier', icon: 'fa-solid fa-xmark' },
    { code: 'MODIFIER_INFOS', label: 'Modifier les informations du dossier', icon: 'fa-solid fa-pen' },
    { code: 'ENCAISSER_PAIEMENT', label: 'Encaisser / confirmer un paiement', icon: 'fa-solid fa-money-bill' },
    { code: 'VOIR_STATISTIQUES', label: 'Consulter les statistiques du service', icon: 'fa-solid fa-chart-line' }
];
/** Rôles/postes suggérés pour accélérer la création des comptes (liste libre, modifiable). */
export var ROLES_SUGGERES = [
    'Secrétaire', 'Agent de vérification', 'Agent de traitement', 'Agent de guichet',
    'Validateur', 'Superviseur', 'Caissier', 'Chef de service', 'Autre'
];
var WorkflowsService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WorkflowsService = _classThis = /** @class */ (function () {
        function WorkflowsService_1() {
            this.workflows = __spreadArray([], MOCK_WORKFLOWS, true);
            this.comptes = __spreadArray([], MOCK_COMPTES, true);
            this.nextWorkflowId = Math.max.apply(Math, __spreadArray([0], this.workflows.map(function (w) { return w.id; }), false)) + 1;
            this.nextCompteId = Math.max.apply(Math, __spreadArray([0], this.comptes.map(function (c) { return c.id; }), false)) + 1;
            this.restaurerCatalogueDroitsPersonnalises();
        }
        // ─── WORKFLOWS ───────────────────────────────────────────
        WorkflowsService_1.prototype.getAll = function () {
            return of(this.workflows).pipe(delay(200));
        };
        WorkflowsService_1.prototype.getById = function (id) {
            return this.getAll().pipe(map(function (list) { return list.find(function (w) { return w.id === id; }); }));
        };
        WorkflowsService_1.prototype.getByServiceId = function (serviceId) {
            return this.getAll().pipe(map(function (list) { return list.find(function (w) { return w.serviceId === serviceId; }); }));
        };
        WorkflowsService_1.prototype.save = function (workflow) {
            if (workflow.id) {
                this.workflows = this.workflows.map(function (w) { return w.id === workflow.id ? __assign({}, workflow) : w; });
            }
            else {
                workflow.id = this.nextWorkflowId++;
                workflow.dateCreation = new Date();
                this.workflows = __spreadArray([workflow], this.workflows, true);
            }
            return of(workflow).pipe(delay(250));
        };
        WorkflowsService_1.prototype.toggleStatut = function (id) {
            this.workflows = this.workflows.map(function (w) { return w.id === id ? __assign(__assign({}, w), { statut: w.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' }) : w; });
            return of(this.workflows.find(function (w) { return w.id === id; })).pipe(delay(150));
        };
        WorkflowsService_1.prototype.delete = function (id) {
            this.workflows = this.workflows.filter(function (w) { return w.id !== id; });
            this.comptes = this.comptes.filter(function (c) { return c.workflowId !== id; });
            return of(void 0).pipe(delay(150));
        };
        WorkflowsService_1.prototype.creerEtapeVide = function (ordre) {
            return {
                id: 'etape_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                nom: '',
                code: 'ETAPE_' + ordre,
                ordre: ordre,
                responsable: '',
                delaiHeures: 24,
                actions: ['Valider'],
                notifications: true,
                ceQuIlValide: '',
                comptesAssignesIds: []
            };
        };
        // ─── COMPTES (STAFF) ─────────────────────────────────────
        WorkflowsService_1.prototype.getAllComptes = function () {
            return of(this.comptes).pipe(delay(200));
        };
        WorkflowsService_1.prototype.getComptesByWorkflow = function (workflowId) {
            return this.getAllComptes().pipe(map(function (list) { return list.filter(function (c) { return c.workflowId === workflowId; }); }));
        };
        WorkflowsService_1.prototype.getComptesByEtape = function (etapeId) {
            return this.getAllComptes().pipe(map(function (list) { return list.filter(function (c) { return c.etapeId === etapeId; }); }));
        };
        WorkflowsService_1.prototype.genererIdentifiant = function (prenom, nom) {
            var norm = function (s) { return (s || '').trim().toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z]/g, ''); };
            var base = "".concat(norm(prenom), ".").concat(norm(nom));
            var existants = this.comptes.filter(function (c) { return c.identifiantConnexion.startsWith(base); }).length;
            return existants > 0 ? "".concat(base).concat(existants + 1) : base;
        };
        WorkflowsService_1.prototype.creerCompte = function (compte) {
            var created = {
                id: this.nextCompteId++,
                nom: compte.nom || '',
                prenom: compte.prenom || '',
                adresse: compte.adresse || '',
                telephone: compte.telephone || '',
                email: compte.email || '',
                role: compte.role || 'Autre',
                identifiantConnexion: compte.identifiantConnexion || this.genererIdentifiant(compte.prenom || '', compte.nom || ''),
                motDePasse: compte.motDePasse || '1234',
                statut: 'ACTIF',
                workflowId: compte.workflowId || 0,
                serviceId: compte.serviceId || 0,
                etapeId: compte.etapeId || '',
                etapeNom: compte.etapeNom || '',
                droits: compte.droits || ['VOIR_DEMANDE'],
                dateCreation: new Date()
            };
            this.comptes = __spreadArray([created], this.comptes, true);
            return of(created).pipe(delay(200));
        };
        WorkflowsService_1.prototype.modifierCompte = function (compte) {
            this.comptes = this.comptes.map(function (c) { return c.id === compte.id ? __assign({}, compte) : c; });
            return of(compte).pipe(delay(150));
        };
        WorkflowsService_1.prototype.toggleStatutCompte = function (id) {
            this.comptes = this.comptes.map(function (c) { return c.id === id ? __assign(__assign({}, c), { statut: c.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF' }) : c; });
            return of(this.comptes.find(function (c) { return c.id === id; })).pipe(delay(150));
        };
        WorkflowsService_1.prototype.supprimerCompte = function (id) {
            this.comptes = this.comptes.filter(function (c) { return c.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        WorkflowsService_1.prototype.labelDroit = function (code) {
            var _a;
            return ((_a = DROITS_CATALOGUE.find(function (d) { return d.code === code; })) === null || _a === void 0 ? void 0 : _a.label) || code;
        };
        /**
         * Ajoute un droit personnalisé au catalogue (bouton « + » dans le builder de workflow),
         * pour les droits qui ne figurent pas encore dans la liste proposée par défaut.
         */
        WorkflowsService_1.prototype.ajouterDroitPersonnalise = function (libelle) {
            var code = ('CUSTOM_' + libelle.trim().toUpperCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^A-Z0-9]+/g, '_')
                .replace(/^_+|_+$/g, ''));
            var existant = DROITS_CATALOGUE.find(function (d) { return d.code === code; });
            if (existant)
                return existant;
            var nouveau = { code: code, label: libelle.trim(), icon: 'fa-solid fa-star' };
            DROITS_CATALOGUE.push(nouveau);
            this.sauvegarderCatalogueDroitsPersonnalises();
            return nouveau;
        };
        WorkflowsService_1.prototype.sauvegarderCatalogueDroitsPersonnalises = function () {
            try {
                var personnalises = DROITS_CATALOGUE.filter(function (d) { return d.code.toString().startsWith('CUSTOM_'); });
                localStorage.setItem('iblopay_providers_droits_personnalises', JSON.stringify(personnalises));
            }
            catch ( /* stockage indisponible */_a) { /* stockage indisponible */ }
        };
        WorkflowsService_1.prototype.restaurerCatalogueDroitsPersonnalises = function () {
            try {
                var brut = localStorage.getItem('iblopay_providers_droits_personnalises');
                if (!brut)
                    return;
                var personnalises = JSON.parse(brut);
                personnalises.forEach(function (d) {
                    if (!DROITS_CATALOGUE.find(function (x) { return x.code === d.code; }))
                        DROITS_CATALOGUE.push(d);
                });
            }
            catch ( /* stockage indisponible */_a) { /* stockage indisponible */ }
        };
        // ─── BROUILLONS DE WORKFLOW (sauvegarde en temps réel) ────────────
        // Permet de quitter le builder de workflow en cours de route et de
        // retrouver exactement où on en était à la réouverture, tant que le
        // workflow n'a pas été enregistré définitivement.
        WorkflowsService_1.prototype.cleBrouillon = function (serviceId, workflowId) {
            return "iblopay_providers_brouillon_workflow_".concat(workflowId || 'nouveau', "_").concat(serviceId);
        };
        WorkflowsService_1.prototype.sauvegarderBrouillonWorkflow = function (serviceId, workflowId, donnees) {
            try {
                localStorage.setItem(this.cleBrouillon(serviceId, workflowId), JSON.stringify(__assign(__assign({}, donnees), { dateSauvegarde: new Date() })));
            }
            catch ( /* stockage indisponible */_a) { /* stockage indisponible */ }
        };
        WorkflowsService_1.prototype.chargerBrouillonWorkflow = function (serviceId, workflowId) {
            try {
                var brut = localStorage.getItem(this.cleBrouillon(serviceId, workflowId));
                if (!brut)
                    return null;
                var data = JSON.parse(brut);
                return __assign(__assign({}, data), { dateSauvegarde: new Date(data.dateSauvegarde) });
            }
            catch (_a) {
                return null;
            }
        };
        WorkflowsService_1.prototype.effacerBrouillonWorkflow = function (serviceId, workflowId) {
            try {
                localStorage.removeItem(this.cleBrouillon(serviceId, workflowId));
            }
            catch ( /* stockage indisponible */_a) { /* stockage indisponible */ }
        };
        /** Recherche un compte par identifiant + mot de passe (utilisé par l'authentification). */
        WorkflowsService_1.prototype.authentifier = function (identifiant, motDePasse) {
            return this.getAllComptes().pipe(map(function (list) { return list.find(function (c) { return c.identifiantConnexion === identifiant.trim() && c.motDePasse === motDePasse; }); }));
        };
        WorkflowsService_1.prototype.reinitialiserMotDePasse = function (id, nouveauMotDePasse) {
            this.comptes = this.comptes.map(function (c) { return c.id === id ? __assign(__assign({}, c), { motDePasse: nouveauMotDePasse }) : c; });
            return of(this.comptes.find(function (c) { return c.id === id; })).pipe(delay(150));
        };
        return WorkflowsService_1;
    }());
    __setFunctionName(_classThis, "WorkflowsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WorkflowsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WorkflowsService = _classThis;
}();
export { WorkflowsService };
//# sourceMappingURL=workflows.service.js.map