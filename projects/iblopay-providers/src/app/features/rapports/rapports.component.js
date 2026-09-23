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
var STATUTS_LABELS = {
    SOUMIS: 'Soumis', PAIEMENT_EN_ATTENTE: 'Paiement en attente', RECU: 'Reçu',
    EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation', EN_TRAITEMENT: 'En traitement',
    APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
};
// Libellé de l'étape du dossier (distinct du statut global) quand aucune étape
// de workflow précise n'est trouvée pour la demande.
var ETAPE_FALLBACK_LABELS = {
    SOUMIS: 'Dossier déposé, en attente de prise en charge',
    PAIEMENT_EN_ATTENTE: "En attente du paiement du demandeur",
    RECU: 'Dossier réceptionné par le service',
    EN_VERIFICATION: 'Vérification des pièces en cours',
    EN_VALIDATION: 'En attente de validation du responsable',
    EN_TRAITEMENT: 'Traitement du dossier en cours',
    APPROUVE: 'Dossier approuvé, finalisation en cours',
    REJETE: 'Dossier clôturé (rejeté)',
    TERMINE: 'Dossier clôturé (terminé)'
};
var RapportsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-rapports',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './rapports.component.html',
            styleUrl: './rapports.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RapportsComponent = _classThis = /** @class */ (function () {
        function RapportsComponent_1(demandesService, servicesService, workflowsService, exportUtils) {
            this.demandesService = demandesService;
            this.servicesService = servicesService;
            this.workflowsService = workflowsService;
            this.exportUtils = exportUtils;
            this.isLoading = true;
            // Données brutes
            this.demandes = [];
            this.services = [];
            this.comptes = [];
            this.workflows = [];
            // Filtres
            this.typeRapport = 'DEMANDES';
            this.dateDebut = '';
            this.dateFin = '';
            this.serviceId = '';
            this.statut = '';
            this.role = '';
            this.recherche = '';
            // Résultats
            this.colonnes = [];
            this.lignes = [];
            // Pagination
            this.currentPage = 1;
            this.pageSize = 15;
            this.statutsDisponibles = Object.keys(STATUTS_LABELS);
        }
        RapportsComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.isLoading = true;
            this.servicesService.getAll().subscribe(function (services) {
                _this.services = services;
                _this.demandesService.getAll().subscribe(function (demandes) {
                    _this.demandes = demandes;
                    _this.workflowsService.getAllComptes().subscribe(function (comptes) {
                        _this.comptes = comptes;
                        _this.workflowsService.getAll().subscribe(function (workflows) {
                            _this.workflows = workflows;
                            _this.genererRapport();
                            _this.isLoading = false;
                        });
                    });
                });
            });
        };
        // ─── FILTRES ───────────────────────────────────────────────
        RapportsComponent_1.prototype.changerType = function (type) {
            this.typeRapport = type;
            this.currentPage = 1;
            this.genererRapport();
        };
        RapportsComponent_1.prototype.reinitialiserFiltres = function () {
            this.dateDebut = '';
            this.dateFin = '';
            this.serviceId = '';
            this.statut = '';
            this.role = '';
            this.recherche = '';
            this.currentPage = 1;
            this.genererRapport();
        };
        Object.defineProperty(RapportsComponent_1.prototype, "rolesDisponibles", {
            get: function () {
                return __spreadArray([], new Set(this.comptes.map(function (c) { return c.role; })), true).sort();
            },
            enumerable: false,
            configurable: true
        });
        RapportsComponent_1.prototype.dansPeriode = function (date) {
            var d = new Date(date).getTime();
            if (this.dateDebut && d < new Date(this.dateDebut).getTime())
                return false;
            if (this.dateFin && d > new Date(this.dateFin).getTime() + 24 * 3600 * 1000 - 1)
                return false;
            return true;
        };
        // ─── GÉNÉRATION DU RAPPORT ─────────────────────────────────
        RapportsComponent_1.prototype.genererRapport = function () {
            this.currentPage = 1;
            if (this.typeRapport === 'DEMANDES') {
                this.genererRapportDemandes();
            }
            else if (this.typeRapport === 'REVENUS') {
                this.genererRapportRevenus();
            }
            else {
                this.genererRapportComptes();
            }
        };
        RapportsComponent_1.prototype.demandesFiltrees = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            return this.demandes.filter(function (d) {
                var matchDate = _this.dansPeriode(d.dateSoumission);
                var matchService = !_this.serviceId || d.serviceId === Number(_this.serviceId);
                var matchStatut = !_this.statut || d.statut === _this.statut;
                var matchTerm = !term ||
                    d.numeroReference.toLowerCase().includes(term) ||
                    d.utilisateurNom.toLowerCase().includes(term) ||
                    d.serviceNom.toLowerCase().includes(term);
                return matchDate && matchService && matchStatut && matchTerm;
            });
        };
        RapportsComponent_1.prototype.genererRapportDemandes = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'reference', label: 'Référence' },
                { cle: 'demandeur', label: 'Demandeur' },
                { cle: 'telephone', label: 'Téléphone' },
                { cle: 'service', label: 'Service' },
                { cle: 'etapeActuelle', label: 'Où en est le dossier' },
                { cle: 'responsable', label: 'Responsable actuel' },
                { cle: 'dateSoumission', label: 'Soumis le' },
                { cle: 'derniereMaj', label: 'Dernière mise à jour' },
                { cle: 'joursEcoules', label: 'Jours écoulés' },
                { cle: 'statut', label: 'Statut' },
                { cle: 'montant', label: 'Montant (BIF)' },
                { cle: 'paiement', label: 'Paiement' }
            ];
            var maintenant = Date.now();
            this.lignes = this.demandesFiltrees()
                .sort(function (a, b) { return b.dateSoumission.getTime() - a.dateSoumission.getTime(); })
                .map(function (d) {
                var workflow = _this.workflows.find(function (w) { return w.serviceId === d.serviceId; });
                var etapeWorkflow = workflow === null || workflow === void 0 ? void 0 : workflow.etapes.find(function (e) { return e.code === d.statut; });
                var responsables = etapeWorkflow
                    ? _this.comptes.filter(function (c) { return c.etapeId === etapeWorkflow.id; }).map(function (c) { return "".concat(c.prenom, " ").concat(c.nom); }).join(', ')
                    : '';
                var joursEcoules = Math.floor((maintenant - new Date(d.dateSoumission).getTime()) / 86400000);
                return {
                    reference: d.numeroReference,
                    demandeur: d.utilisateurNom,
                    telephone: d.utilisateurTelephone,
                    service: d.serviceNom,
                    etapeActuelle: (etapeWorkflow === null || etapeWorkflow === void 0 ? void 0 : etapeWorkflow.nom) || ETAPE_FALLBACK_LABELS[d.statut] || _this.statutLabel(d.statut),
                    responsable: responsables || (d.statut === 'TERMINE' || d.statut === 'REJETE' ? '—' : 'Non assigné'),
                    dateSoumission: new Date(d.dateSoumission).toLocaleDateString('fr-FR'),
                    derniereMaj: new Date(d.dateMaj).toLocaleDateString('fr-FR'),
                    joursEcoules: joursEcoules,
                    statut: _this.statutLabel(d.statut),
                    montant: d.montant,
                    paiement: d.montantPaye ? 'Payé' : 'Non payé'
                };
            });
        };
        RapportsComponent_1.prototype.genererRapportRevenus = function () {
            this.colonnes = [
                { cle: 'service', label: 'Service' },
                { cle: 'nbDemandes', label: 'Nb demandes' },
                { cle: 'nbPayees', label: 'Payées' },
                { cle: 'tauxPaiement', label: 'Taux de paiement' },
                { cle: 'revenuEncaisse', label: 'Revenu encaissé (BIF)' },
                { cle: 'revenuAttente', label: 'Revenu en attente (BIF)' }
            ];
            var filtrees = this.demandesFiltrees();
            var parService = new Map();
            for (var _i = 0, filtrees_1 = filtrees; _i < filtrees_1.length; _i++) {
                var d = filtrees_1[_i];
                if (!parService.has(d.serviceId)) {
                    parService.set(d.serviceId, { service: d.serviceNom, nbDemandes: 0, nbPayees: 0, revenuEncaisse: 0, revenuAttente: 0 });
                }
                var s = parService.get(d.serviceId);
                s.nbDemandes++;
                if (d.montantPaye) {
                    s.nbPayees++;
                    s.revenuEncaisse += d.montant || 0;
                }
                else {
                    s.revenuAttente += d.montant || 0;
                }
            }
            this.lignes = Array.from(parService.values())
                .sort(function (a, b) { return b.revenuEncaisse - a.revenuEncaisse; })
                .map(function (s) { return (__assign(__assign({}, s), { tauxPaiement: s.nbDemandes ? Math.round((s.nbPayees / s.nbDemandes) * 100) + '%' : '0%' })); });
        };
        RapportsComponent_1.prototype.genererRapportComptes = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'nom', label: 'Nom complet' },
                { cle: 'identifiant', label: 'Identifiant de connexion' },
                { cle: 'role', label: 'Rôle' },
                { cle: 'service', label: 'Service' },
                { cle: 'etape', label: 'Étape assignée' },
                { cle: 'droits', label: 'Droits accordés' },
                { cle: 'adresse', label: 'Adresse' },
                { cle: 'telephone', label: 'Téléphone' },
                { cle: 'statut', label: 'Statut du compte' }
            ];
            var term = this.recherche.toLowerCase().trim();
            this.lignes = this.comptes
                .filter(function (c) {
                var matchService = !_this.serviceId || c.serviceId === Number(_this.serviceId);
                var matchRole = !_this.role || c.role === _this.role;
                var matchTerm = !term ||
                    "".concat(c.prenom, " ").concat(c.nom).toLowerCase().includes(term) ||
                    c.role.toLowerCase().includes(term);
                var matchDate = _this.dansPeriode(c.dateCreation);
                return matchService && matchRole && matchTerm && matchDate;
            })
                .map(function (c) {
                var _a;
                return ({
                    nom: "".concat(c.prenom, " ").concat(c.nom),
                    identifiant: c.identifiantConnexion,
                    role: c.role,
                    service: ((_a = _this.services.find(function (s) { return s.id === c.serviceId; })) === null || _a === void 0 ? void 0 : _a.nom) || '-',
                    etape: c.etapeNom || '-',
                    droits: c.droits.map(function (d) { return _this.workflowsService.labelDroit(d); }).join(', '),
                    adresse: c.adresse,
                    telephone: c.telephone,
                    statut: c.statut === 'ACTIF' ? 'Actif' : 'Inactif'
                });
            });
        };
        RapportsComponent_1.prototype.statutLabel = function (statut) {
            return STATUTS_LABELS[statut] || statut;
        };
        Object.defineProperty(RapportsComponent_1.prototype, "totalPages", {
            // ─── PAGINATION ────────────────────────────────────────────
            get: function () {
                return Math.ceil(this.lignes.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsComponent_1.prototype, "lignesPaginees", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.lignes.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        RapportsComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages)
                this.currentPage = page;
        };
        Object.defineProperty(RapportsComponent_1.prototype, "totalLignes", {
            // ─── RÉSUMÉ / KPI RAPIDES ──────────────────────────────────
            get: function () {
                return this.lignes.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsComponent_1.prototype, "montantTotal", {
            get: function () {
                if (this.typeRapport === 'DEMANDES') {
                    return this.demandesFiltrees().filter(function (d) { return d.montantPaye; }).reduce(function (sum, d) { return sum + (d.montant || 0); }, 0);
                }
                if (this.typeRapport === 'REVENUS') {
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['revenuEncaisse']) || 0); }, 0);
                }
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        // ─── EXPORT EXCEL ──────────────────────────────────────────
        RapportsComponent_1.prototype.exporterExcel = function () {
            if (this.lignes.length === 0)
                return;
            this.exportUtils.exporterExcel(this.colonnes, this.lignes, "rapport_".concat(this.typeRapport.toLowerCase()), this.typeRapport);
        };
        // ─── IMPRESSION ────────────────────────────────────────────
        RapportsComponent_1.prototype.imprimer = function () {
            var _this = this;
            var _a;
            var titreType = {
                DEMANDES: 'Rapport des demandes',
                REVENUS: 'Rapport des revenus par service',
                COMPTES: 'Rapport des comptes & workflows'
            };
            var filtresTexte = [];
            if (this.dateDebut)
                filtresTexte.push("Du ".concat(new Date(this.dateDebut).toLocaleDateString('fr-FR')));
            if (this.dateFin)
                filtresTexte.push("au ".concat(new Date(this.dateFin).toLocaleDateString('fr-FR')));
            if (this.serviceId)
                filtresTexte.push("Service : ".concat(((_a = this.services.find(function (s) { return s.id === Number(_this.serviceId); })) === null || _a === void 0 ? void 0 : _a.nom) || ''));
            if (this.statut)
                filtresTexte.push("Statut : ".concat(this.statutLabel(this.statut)));
            if (this.role)
                filtresTexte.push("R\u00F4le : ".concat(this.role));
            if (this.recherche)
                filtresTexte.push("Recherche : \"".concat(this.recherche, "\""));
            this.exportUtils.imprimer(titreType[this.typeRapport], 'IBLOPAY — Espace prestataire', filtresTexte, this.colonnes, this.lignes);
        };
        return RapportsComponent_1;
    }());
    __setFunctionName(_classThis, "RapportsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RapportsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RapportsComponent = _classThis;
}();
export { RapportsComponent };
//# sourceMappingURL=rapports.component.js.map