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
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVICES_PUBLICS_MOCK_COMPLETE } from '../data/services-publics.mock';
var ServicesPublicsService = function () {
    var _classDecorators = [Injectable({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesPublicsService = _classThis = /** @class */ (function () {
        function ServicesPublicsService_1(http) {
            this.http = http;
            this.apiUrl = '/api/services-publics';
        }
        // ============================================================
        // SERVICES PUBLICS
        // ============================================================
        /**
         * Récupère la liste complète des services publics
         */
        ServicesPublicsService_1.prototype.getAll = function () {
            return of(SERVICES_PUBLICS_MOCK_COMPLETE);
        };
        /**
         * Récupère un service public par son ID
         * @param id - ID du service
         */
        ServicesPublicsService_1.prototype.getById = function (id) {
            return this.getAll().pipe(map(function (services) { return services.find(function (s) { return s.id === id; }); }));
        };
        /**
         * Met à jour un service public
         * @param service - Service à mettre à jour
         */
        ServicesPublicsService_1.prototype.update = function (service) {
            // Simulation d'une mise à jour
            return of(service);
        };
        /**
         * Crée un nouveau service public
         * @param service - Service à créer
         */
        ServicesPublicsService_1.prototype.create = function (service) {
            return of(__assign(__assign({}, service), { id: Date.now() }));
        };
        /**
         * Supprime un service public
         * @param id - ID du service à supprimer
         */
        ServicesPublicsService_1.prototype.delete = function (id) {
            return of(void 0);
        };
        // ============================================================
        // CATÉGORIES
        // ============================================================
        /**
         * Récupère toutes les catégories d'un service
         * @param serviceId - ID du service
         */
        ServicesPublicsService_1.prototype.getCategories = function (serviceId) {
            return this.getById(serviceId).pipe(map(function (service) { return (service === null || service === void 0 ? void 0 : service.categories) || []; }));
        };
        /**
         * Récupère une catégorie par son ID
         * @param serviceId - ID du service
         * @param categorieId - ID de la catégorie
         */
        ServicesPublicsService_1.prototype.getCategorieById = function (serviceId, categorieId) {
            return this.getCategories(serviceId).pipe(map(function (categories) { return categories.find(function (c) { return c.id === categorieId; }); }));
        };
        /**
         * Crée une nouvelle catégorie
         * @param serviceId - ID du service
         * @param categorie - Catégorie à créer
         */
        ServicesPublicsService_1.prototype.createCategorie = function (serviceId, categorie) {
            return of(__assign(__assign({}, categorie), { id: Date.now(), serviceId: serviceId }));
        };
        /**
         * Met à jour une catégorie
         * @param serviceId - ID du service
         * @param categorie - Catégorie à mettre à jour
         */
        ServicesPublicsService_1.prototype.updateCategorie = function (serviceId, categorie) {
            return of(__assign(__assign({}, categorie), { dateModification: new Date() }));
        };
        /**
         * Supprime une catégorie
         * @param serviceId - ID du service
         * @param categorieId - ID de la catégorie à supprimer
         */
        ServicesPublicsService_1.prototype.deleteCategorie = function (serviceId, categorieId) {
            return of(void 0);
        };
        // ============================================================
        // TYPES RNF
        // ============================================================
        /**
         * Récupère tous les types RNF d'un service
         * @param serviceId - ID du service
         */
        ServicesPublicsService_1.prototype.getTypesRNF = function (serviceId) {
            return this.getById(serviceId).pipe(map(function (service) { return (service === null || service === void 0 ? void 0 : service.typesRNF) || []; }));
        };
        /**
         * Récupère un type RNF par son ID
         * @param serviceId - ID du service
         * @param typeRNFId - ID du type RNF
         */
        ServicesPublicsService_1.prototype.getTypeRNFById = function (serviceId, typeRNFId) {
            return this.getTypesRNF(serviceId).pipe(map(function (types) { return types.find(function (t) { return t.id === typeRNFId; }); }));
        };
        /**
         * Crée un nouveau type RNF
         * @param serviceId - ID du service
         * @param typeRNF - Type RNF à créer
         */
        ServicesPublicsService_1.prototype.createTypeRNF = function (serviceId, typeRNF) {
            return of(__assign(__assign({}, typeRNF), { id: Date.now(), serviceId: serviceId }));
        };
        /**
         * Met à jour un type RNF
         * @param serviceId - ID du service
         * @param typeRNF - Type RNF à mettre à jour
         */
        ServicesPublicsService_1.prototype.updateTypeRNF = function (serviceId, typeRNF) {
            return of(typeRNF);
        };
        /**
         * Supprime un type RNF
         * @param serviceId - ID du service
         * @param typeRNFId - ID du type RNF à supprimer
         */
        ServicesPublicsService_1.prototype.deleteTypeRNF = function (serviceId, typeRNFId) {
            return of(void 0);
        };
        // ============================================================
        // SOUS-TYPES RNF
        // ============================================================
        /**
         * Récupère tous les sous-types d'un type RNF
         * @param serviceId - ID du service
         * @param typeRNFId - ID du type RNF
         */
        ServicesPublicsService_1.prototype.getSousTypesRNF = function (serviceId, typeRNFId) {
            return this.getTypeRNFById(serviceId, typeRNFId).pipe(map(function (type) { return (type === null || type === void 0 ? void 0 : type.sousTypes) || []; }));
        };
        /**
         * Crée un nouveau sous-type RNF
         * @param serviceId - ID du service
         * @param typeRNFId - ID du type RNF parent
         * @param sousType - Sous-type à créer
         */
        ServicesPublicsService_1.prototype.createSousTypeRNF = function (serviceId, typeRNFId, sousType) {
            return of(__assign(__assign({}, sousType), { id: Date.now(), typeRNFId: typeRNFId }));
        };
        /**
         * Met à jour un sous-type RNF
         * @param serviceId - ID du service
         * @param sousType - Sous-type à mettre à jour
         */
        ServicesPublicsService_1.prototype.updateSousTypeRNF = function (serviceId, sousType) {
            return of(sousType);
        };
        /**
         * Supprime un sous-type RNF
         * @param serviceId - ID du service
         * @param sousTypeId - ID du sous-type à supprimer
         */
        ServicesPublicsService_1.prototype.deleteSousTypeRNF = function (serviceId, sousTypeId) {
            return of(void 0);
        };
        // ============================================================
        // PAIEMENTS RNF
        // ============================================================
        /**
         * Récupère tous les paiements RNF d'un service
         * @param serviceId - ID du service
         */
        ServicesPublicsService_1.prototype.getPaiementsRNF = function (serviceId) {
            return this.getById(serviceId).pipe(map(function (service) { return (service === null || service === void 0 ? void 0 : service.paiements) || []; }));
        };
        /**
         * Récupère un paiement RNF par son ID
         * @param serviceId - ID du service
         * @param paiementId - ID du paiement
         */
        ServicesPublicsService_1.prototype.getPaiementRNFById = function (serviceId, paiementId) {
            return this.getPaiementsRNF(serviceId).pipe(map(function (paiements) { return paiements.find(function (p) { return p.id === paiementId; }); }));
        };
        /**
         * Crée un nouveau paiement RNF
         * @param serviceId - ID du service
         * @param paiement - Paiement à créer
         */
        ServicesPublicsService_1.prototype.createPaiementRNF = function (serviceId, paiement) {
            return of(__assign(__assign({}, paiement), { id: Date.now(), serviceId: serviceId }));
        };
        /**
         * Met à jour un paiement RNF
         * @param serviceId - ID du service
         * @param paiement - Paiement à mettre à jour
         */
        ServicesPublicsService_1.prototype.updatePaiementRNF = function (serviceId, paiement) {
            return of(paiement);
        };
        /**
         * Supprime un paiement RNF
         * @param serviceId - ID du service
         * @param paiementId - ID du paiement à supprimer
         */
        ServicesPublicsService_1.prototype.deletePaiementRNF = function (serviceId, paiementId) {
            return of(void 0);
        };
        /**
         * Valide un paiement RNF (change le statut à PAYE)
         * @param serviceId - ID du service
         * @param paiementId - ID du paiement à valider
         */
        ServicesPublicsService_1.prototype.validerPaiementRNF = function (serviceId, paiementId) {
            return this.getPaiementRNFById(serviceId, paiementId).pipe(map(function (paiement) {
                if (paiement) {
                    return __assign(__assign({}, paiement), { statut: 'PAYE' });
                }
                throw new Error('Paiement non trouvé');
            }));
        };
        /**
         * Annule un paiement RNF (change le statut à ANNULE)
         * @param serviceId - ID du service
         * @param paiementId - ID du paiement à annuler
         */
        ServicesPublicsService_1.prototype.annulerPaiementRNF = function (serviceId, paiementId) {
            return this.getPaiementRNFById(serviceId, paiementId).pipe(map(function (paiement) {
                if (paiement) {
                    return __assign(__assign({}, paiement), { statut: 'ANNULE' });
                }
                throw new Error('Paiement non trouvé');
            }));
        };
        // ============================================================
        // UTILISATEURS
        // ============================================================
        /**
         * Récupère tous les utilisateurs d'un service
         * @param serviceId - ID du service
         */
        ServicesPublicsService_1.prototype.getUtilisateurs = function (serviceId) {
            return this.getById(serviceId).pipe(map(function (service) { return (service === null || service === void 0 ? void 0 : service.utilisateurs) || []; }));
        };
        /**
         * Récupère un utilisateur par son ID
         * @param serviceId - ID du service
         * @param utilisateurId - ID de l'utilisateur
         */
        ServicesPublicsService_1.prototype.getUtilisateurById = function (serviceId, utilisateurId) {
            return this.getUtilisateurs(serviceId).pipe(map(function (utilisateurs) { return utilisateurs.find(function (u) { return u.id === utilisateurId; }); }));
        };
        /**
         * Crée un nouvel utilisateur
         * @param serviceId - ID du service
         * @param utilisateur - Utilisateur à créer
         */
        ServicesPublicsService_1.prototype.createUtilisateur = function (serviceId, utilisateur) {
            return of(__assign(__assign({}, utilisateur), { id: Date.now(), serviceId: serviceId }));
        };
        /**
         * Met à jour un utilisateur
         * @param serviceId - ID du service
         * @param utilisateur - Utilisateur à mettre à jour
         */
        ServicesPublicsService_1.prototype.updateUtilisateur = function (serviceId, utilisateur) {
            return of(utilisateur);
        };
        /**
         * Supprime un utilisateur
         * @param serviceId - ID du service
         * @param utilisateurId - ID de l'utilisateur à supprimer
         */
        ServicesPublicsService_1.prototype.deleteUtilisateur = function (serviceId, utilisateurId) {
            return of(void 0);
        };
        /**
         * Change le statut d'un utilisateur
         * @param serviceId - ID du service
         * @param utilisateurId - ID de l'utilisateur
         * @param statut - Nouveau statut
         */
        ServicesPublicsService_1.prototype.changerStatutUtilisateur = function (serviceId, utilisateurId, statut) {
            return this.getUtilisateurById(serviceId, utilisateurId).pipe(map(function (utilisateur) {
                if (utilisateur) {
                    return __assign(__assign({}, utilisateur), { statut: statut });
                }
                throw new Error('Utilisateur non trouvé');
            }));
        };
        return ServicesPublicsService_1;
    }());
    __setFunctionName(_classThis, "ServicesPublicsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesPublicsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesPublicsService = _classThis;
}();
export { ServicesPublicsService };
//# sourceMappingURL=services-publics.service.js.map