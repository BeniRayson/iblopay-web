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
import { IblopayWatermarkComponent } from '../../core/iblopay-watermark.component';
var UtilisateursListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-utilisateurs-list',
            standalone: true,
            imports: [CommonModule, FormsModule, IblopayWatermarkComponent],
            templateUrl: './utilisateurs-list.component.html',
            styleUrl: './utilisateurs-list.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UtilisateursListComponent = _classThis = /** @class */ (function () {
        function UtilisateursListComponent_1(demandesService, workflowsService, toastService) {
            this.demandesService = demandesService;
            this.workflowsService = workflowsService;
            this.toastService = toastService;
            this.vueActive = 'CITOYENS';
            this.utilisateurs = [];
            this.filtered = [];
            this.searchTerm = '';
            this.isLoading = true;
            // Comptes internes (staff rattachés aux workflows)
            this.comptes = [];
            this.comptesFiltres = [];
            this.searchTermComptes = '';
            this.isLoadingComptes = true;
            this.compteSelectionne = null;
            // Pagination (50 éléments par page)
            this.currentPage = 1;
            this.pageSize = 50;
            this.utilisateurSelectionne = null;
            // Propriété pour la visionneuse de document administratif
            this.documentActif = null;
        }
        UtilisateursListComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.isLoading = true;
            this.demandesService.getAll().subscribe(function (demandes) {
                var toutesDemandes = demandes || [];
                // Simulation pour atteindre / dépasser 50 utilisateurs si nécessaire
                if (toutesDemandes.length < 55) {
                    toutesDemandes = _this.genererDemandesSimulation(toutesDemandes);
                }
                _this.utilisateurs = _this.regrouperParUtilisateur(toutesDemandes);
                _this.applyFilters();
                _this.isLoading = false;
            });
            this.chargerComptes();
        };
        UtilisateursListComponent_1.prototype.chargerComptes = function () {
            var _this = this;
            this.isLoadingComptes = true;
            this.workflowsService.getAllComptes().subscribe(function (comptes) {
                _this.comptes = comptes;
                _this.applyFiltersComptes();
                _this.isLoadingComptes = false;
            });
        };
        UtilisateursListComponent_1.prototype.changerVue = function (vue) {
            this.vueActive = vue;
        };
        UtilisateursListComponent_1.prototype.applyFiltersComptes = function () {
            var term = this.searchTermComptes.toLowerCase().trim();
            this.comptesFiltres = this.comptes.filter(function (c) {
                return !term ||
                    "".concat(c.prenom, " ").concat(c.nom).toLowerCase().includes(term) ||
                    c.role.toLowerCase().includes(term) ||
                    (c.etapeNom || '').toLowerCase().includes(term);
            });
        };
        UtilisateursListComponent_1.prototype.ouvrirDetailCompte = function (c) {
            this.compteSelectionne = c;
        };
        UtilisateursListComponent_1.prototype.fermerDetailCompte = function () {
            this.compteSelectionne = null;
        };
        UtilisateursListComponent_1.prototype.toggleStatutCompte = function (c, event) {
            var _this = this;
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.workflowsService.toggleStatutCompte(c.id).subscribe(function () {
                _this.toastService.success("Le compte de ".concat(c.prenom, " ").concat(c.nom, " a \u00E9t\u00E9 ").concat(c.statut === 'ACTIF' ? 'désactivé' : 'activé', "."));
                _this.chargerComptes();
            });
        };
        UtilisateursListComponent_1.prototype.reinitialiserMotDePasse = function (c) {
            var _this = this;
            var nouveau = prompt("Nouveau mot de passe pour ".concat(c.prenom, " ").concat(c.nom, " (identifiant : ").concat(c.identifiantConnexion, ") :"), '');
            if (!nouveau)
                return;
            if (nouveau.length < 4) {
                this.toastService.error('Le mot de passe doit contenir au moins 4 caractères.');
                return;
            }
            this.workflowsService.reinitialiserMotDePasse(c.id, nouveau).subscribe(function (updated) {
                _this.toastService.success("Mot de passe de ".concat(c.prenom, " ").concat(c.nom, " r\u00E9initialis\u00E9. Communiquez-le-lui en toute s\u00E9curit\u00E9."));
                _this.compteSelectionne = updated;
                _this.chargerComptes();
            });
        };
        UtilisateursListComponent_1.prototype.labelDroit = function (code) {
            return this.workflowsService.labelDroit(code);
        };
        UtilisateursListComponent_1.prototype.genererDemandesSimulation = function (demandesExistantes) {
            var prenoms = ['Jean', 'Marie', 'Patrick', 'Diane', 'Eric', 'Claudine', 'Olivier', 'Aline', 'Gérard', 'Chantal', 'Thierry', 'Sandrine', 'Michel', 'Beatrice', 'Alain'];
            var noms = ['Nkurunziza', 'Habimana', 'Ndayishimiye', 'Mugisha', 'Bucumi', 'Ntahimpera', 'Bizimana', 'Niyonkuru', 'Minani', 'Kamanzi'];
            var services = ['Acte de Naissance', 'Casier Judiciaire', 'Certificat de Résidence', 'Légalisation de Document', 'Permis de Conduire'];
            var statuts = ['SOUMIS', 'EN_VERIFICATION', 'APPROUVE', 'TERMINE', 'EN_TRAITEMENT'];
            var simulation = __spreadArray([], demandesExistantes, true);
            for (var i = 1; i <= 65; i++) {
                var prenom = prenoms[i % prenoms.length];
                var nom = noms[i % noms.length];
                var tel = "+257 79 ".concat((10 + (i % 89)) * 10000 + i);
                var service = services[i % services.length];
                var montantPayeFlag = i % 3 !== 0;
                var montantVal = 5000 + (i * 1200) % 25000;
                // Utilisation de "as any" pour contourner strictement les contraintes du modèle provider.model.ts sur les données simulées
                simulation.push({
                    id: i + 1000,
                    numeroReference: "REF-2026-".concat(1000 + i),
                    utilisateurNom: "".concat(prenom, " ").concat(nom),
                    utilisateurTelephone: tel,
                    serviceNom: service,
                    dateSoumission: new Date(2026, 6, (i % 28) + 1),
                    montant: montantVal,
                    montantPaye: montantPayeFlag,
                    statut: statuts[i % statuts.length],
                    reponses: [
                        { label: 'Nom complet du déclarant', valeur: "".concat(prenom, " ").concat(nom), type: 'TEXTE' },
                        { label: 'Motif de la demande', valeur: "Renouvellement et v\u00E9rification administrative", type: 'TEXTE' },
                        { label: 'Pièce justificative officielle', valeur: 'justificatif.pdf', type: 'FICHIER', apercuUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600' }
                    ]
                });
            }
            return simulation;
        };
        UtilisateursListComponent_1.prototype.regrouperParUtilisateur = function (demandes) {
            var map = new Map();
            for (var _i = 0, demandes_1 = demandes; _i < demandes_1.length; _i++) {
                var d = demandes_1[_i];
                var cle = d.utilisateurTelephone || d.utilisateurNom;
                if (!map.has(cle)) {
                    map.set(cle, {
                        nom: d.utilisateurNom,
                        telephone: d.utilisateurTelephone,
                        nombreDemandes: 0,
                        montantTotalPaye: 0,
                        montantEnAttente: 0,
                        derniereDemande: d.dateSoumission ? new Date(d.dateSoumission) : new Date(),
                        demandes: []
                    });
                }
                var u = map.get(cle);
                u.nombreDemandes += 1;
                var montant = d.montant || 0;
                if (d.montantPaye) {
                    u.montantTotalPaye += montant;
                }
                else {
                    u.montantEnAttente += montant;
                }
                var dateDemande = d.dateSoumission ? new Date(d.dateSoumission) : new Date();
                if (dateDemande > u.derniereDemande) {
                    u.derniereDemande = dateDemande;
                }
                u.demandes.push(d);
            }
            return Array.from(map.values()).sort(function (a, b) { return b.derniereDemande.getTime() - a.derniereDemande.getTime(); });
        };
        UtilisateursListComponent_1.prototype.applyFilters = function () {
            var term = this.searchTerm.toLowerCase().trim();
            this.filtered = this.utilisateurs.filter(function (u) {
                return !term || u.nom.toLowerCase().includes(term) || u.telephone.toLowerCase().includes(term);
            });
            this.currentPage = 1;
        };
        UtilisateursListComponent_1.prototype.onSearchChange = function () {
            this.applyFilters();
        };
        Object.defineProperty(UtilisateursListComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filtered.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UtilisateursListComponent_1.prototype, "paginatedUtilisateurs", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.filtered.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UtilisateursListComponent_1.prototype, "startIndex", {
            get: function () {
                return (this.currentPage - 1) * this.pageSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UtilisateursListComponent_1.prototype, "endIndex", {
            get: function () {
                return Math.min(this.startIndex + this.pageSize, this.filtered.length);
            },
            enumerable: false,
            configurable: true
        });
        UtilisateursListComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        };
        UtilisateursListComponent_1.prototype.ouvrirDetail = function (u) {
            this.utilisateurSelectionne = u;
        };
        UtilisateursListComponent_1.prototype.fermerDetail = function () {
            this.utilisateurSelectionne = null;
            this.documentActif = null;
        };
        UtilisateursListComponent_1.prototype.voirDocument = function (reponse, demande, utilisateur, event) {
            event.stopPropagation();
            this.documentActif = { reponse: reponse, demande: demande, utilisateur: utilisateur };
        };
        UtilisateursListComponent_1.prototype.fermerDocument = function () {
            this.documentActif = null;
        };
        UtilisateursListComponent_1.prototype.statutClass = function (statut) {
            var map = {
                SOUMIS: 'badge-blue', EN_VERIFICATION: 'badge-orange', EN_VALIDATION: 'badge-orange',
                EN_TRAITEMENT: 'badge-purple', APPROUVE: 'badge-green', REJETE: 'badge-red', TERMINE: 'badge-green'
            };
            return map[statut] || 'badge-blue';
        };
        UtilisateursListComponent_1.prototype.statutLabel = function (statut) {
            var map = {
                SOUMIS: 'Soumis', EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation',
                EN_TRAITEMENT: 'En traitement', APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
            };
            return map[statut] || statut;
        };
        return UtilisateursListComponent_1;
    }());
    __setFunctionName(_classThis, "UtilisateursListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UtilisateursListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UtilisateursListComponent = _classThis;
}();
export { UtilisateursListComponent };
//# sourceMappingURL=utilisateurs-list.component.js.map