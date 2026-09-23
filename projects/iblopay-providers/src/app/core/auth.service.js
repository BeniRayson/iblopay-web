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
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
/** Identifiants de l'administrateur des SERVICES (services, workflows, comptes, demandes...). */
export var ADMIN_SERVICES_IDENTIFIANT = '72483021';
export var ADMIN_SERVICES_PIN = '1234';
/** Identifiants de l'administrateur TRANSPORT (bus & taxis). */
export var ADMIN_TRANSPORT_IDENTIFIANT = '67391031';
export var ADMIN_TRANSPORT_PIN = '1234';
/** Identifiants de l'administrateur ÉVÉNEMENTS (matchs, concerts, conférences...). */
export var ADMIN_EVENEMENTS_IDENTIFIANT = '64001001';
export var ADMIN_EVENEMENTS_PIN = '1234';
var CLE_SESSION = 'iblopay_providers_session';
var AuthService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(workflowsService) {
            this.workflowsService = workflowsService;
            this.utilisateurSubject = new BehaviorSubject(this.restaurerSession());
            this.utilisateur$ = this.utilisateurSubject.asObservable();
        }
        Object.defineProperty(AuthService_1.prototype, "utilisateurActuel", {
            get: function () {
                return this.utilisateurSubject.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthService_1.prototype, "estConnecte", {
            get: function () {
                return !!this.utilisateurActuel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthService_1.prototype, "estAdmin", {
            get: function () {
                var _a;
                return ((_a = this.utilisateurActuel) === null || _a === void 0 ? void 0 : _a.type) === 'ADMIN';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthService_1.prototype, "estAdminServices", {
            get: function () {
                var _a;
                return this.estAdmin && ((_a = this.utilisateurActuel) === null || _a === void 0 ? void 0 : _a.secteur) === 'SERVICES';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthService_1.prototype, "estAdminTransport", {
            get: function () {
                var _a;
                return this.estAdmin && ((_a = this.utilisateurActuel) === null || _a === void 0 ? void 0 : _a.secteur) === 'TRANSPORT';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthService_1.prototype, "estAdminEvenements", {
            get: function () {
                var _a;
                return this.estAdmin && ((_a = this.utilisateurActuel) === null || _a === void 0 ? void 0 : _a.secteur) === 'EVENEMENTS';
            },
            enumerable: false,
            configurable: true
        });
        /** Vérifie si l'utilisateur connecté possède un droit donné (l'admin services a implicitement tous les droits). */
        AuthService_1.prototype.aLeDroit = function (droit) {
            var u = this.utilisateurActuel;
            if (!u)
                return false;
            if (u.type === 'ADMIN')
                return u.secteur === 'SERVICES';
            return u.droits.includes(droit);
        };
        AuthService_1.prototype.connecter = function (identifiant, motDePasse) {
            var _this = this;
            var id = (identifiant || '').trim();
            var mdp = (motDePasse || '').trim();
            if (!id || !mdp) {
                return of({ succes: false, message: 'Veuillez renseigner votre identifiant et votre mot de passe.' }).pipe(delay(200));
            }
            if (id === ADMIN_SERVICES_IDENTIFIANT && mdp === ADMIN_SERVICES_PIN) {
                var utilisateur = {
                    type: 'ADMIN', id: 'admin', nom: 'Administrateur Services', role: 'Administrateur', identifiant: id, droits: [], secteur: 'SERVICES'
                };
                this.definirSession(utilisateur);
                return of({ succes: true, utilisateur: utilisateur }).pipe(delay(300));
            }
            if (id === ADMIN_TRANSPORT_IDENTIFIANT && mdp === ADMIN_TRANSPORT_PIN) {
                var utilisateur = {
                    type: 'ADMIN', id: 'admin', nom: 'Administrateur Transport', role: 'Administrateur Transport', identifiant: id, droits: [], secteur: 'TRANSPORT'
                };
                this.definirSession(utilisateur);
                return of({ succes: true, utilisateur: utilisateur }).pipe(delay(300));
            }
            if (id === ADMIN_EVENEMENTS_IDENTIFIANT && mdp === ADMIN_EVENEMENTS_PIN) {
                var utilisateur = {
                    type: 'ADMIN', id: 'admin', nom: 'Administrateur Événements', role: 'Administrateur Événements', identifiant: id, droits: [], secteur: 'EVENEMENTS'
                };
                this.definirSession(utilisateur);
                return of({ succes: true, utilisateur: utilisateur }).pipe(delay(300));
            }
            return this.workflowsService.authentifier(id, mdp).pipe(delay(300), map(function (compte) {
                if (!compte) {
                    return { succes: false, message: 'Identifiant ou mot de passe incorrect.' };
                }
                if (compte.statut !== 'ACTIF') {
                    return { succes: false, message: 'Ce compte a été désactivé. Contactez votre administrateur.' };
                }
                var utilisateur = {
                    type: 'COMPTE', id: compte.id, nom: compte.nom, prenom: compte.prenom, role: compte.role,
                    identifiant: compte.identifiantConnexion, droits: compte.droits, secteur: 'SERVICES',
                    serviceId: compte.serviceId, workflowId: compte.workflowId, etapeId: compte.etapeId, etapeNom: compte.etapeNom || ''
                };
                _this.definirSession(utilisateur);
                return { succes: true, utilisateur: utilisateur };
            }));
        };
        AuthService_1.prototype.deconnecter = function () {
            try {
                localStorage.removeItem(CLE_SESSION);
            }
            catch ( /* SSR ou stockage indisponible */_a) { /* SSR ou stockage indisponible */ }
            this.utilisateurSubject.next(null);
        };
        AuthService_1.prototype.definirSession = function (u) {
            try {
                localStorage.setItem(CLE_SESSION, JSON.stringify(u));
            }
            catch ( /* SSR ou stockage indisponible */_a) { /* SSR ou stockage indisponible */ }
            this.utilisateurSubject.next(u);
        };
        AuthService_1.prototype.restaurerSession = function () {
            try {
                var brut = localStorage.getItem(CLE_SESSION);
                return brut ? JSON.parse(brut) : null;
            }
            catch (_a) {
                return null;
            }
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
export { AuthService };
//# sourceMappingURL=auth.service.js.map