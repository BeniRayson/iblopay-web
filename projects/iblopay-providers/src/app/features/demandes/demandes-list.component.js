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
var ETAPES_WORKFLOW = [
    { code: 'SOUMIS', label: 'Soumission', icon: 'fa-solid fa-file-import' },
    { code: 'EN_VERIFICATION', label: 'Vérification', icon: 'fa-solid fa-magnifying-glass' },
    { code: 'EN_VALIDATION', label: 'Validation', icon: 'fa-solid fa-clipboard-check' },
    { code: 'EN_TRAITEMENT', label: 'Traitement', icon: 'fa-solid fa-gears' },
    { code: 'APPROUVE', label: 'Approbation', icon: 'fa-solid fa-stamp' },
    { code: 'TERMINE', label: 'Document délivré', icon: 'fa-solid fa-circle-check' }
];
var DemandesListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-demandes-list',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './demandes-list.component.html',
            styleUrl: './demandes-list.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DemandesListComponent = _classThis = /** @class */ (function () {
        function DemandesListComponent_1(demandesService, workflowsService, authService, toastService) {
            this.demandesService = demandesService;
            this.workflowsService = workflowsService;
            this.authService = authService;
            this.toastService = toastService;
            this.demandes = [];
            this.filtered = [];
            this.searchTerm = '';
            this.selectedStatut = '';
            this.demandeSelectionnee = null;
            this.documentAgrandi = null;
            this.bordereauAgrandi = null;
            this.etapeSelectionnee = null;
            this.isLoading = true;
            this.etapes = ETAPES_WORKFLOW;
            this.workflowActif = null;
            this.comptesActifs = [];
        }
        DemandesListComponent_1.prototype.ngOnInit = function () {
            this.load();
        };
        Object.defineProperty(DemandesListComponent_1.prototype, "estAdmin", {
            // ─── DROITS DE L'UTILISATEUR CONNECTÉ ───────────────────────
            get: function () {
                return this.authService.estAdmin;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "utilisateur", {
            get: function () {
                return this.authService.utilisateurActuel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "peutVoirDocuments", {
            get: function () {
                return this.authService.aLeDroit('VOIR_DOCUMENTS');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "peutEncaisser", {
            get: function () {
                return this.authService.aLeDroit('ENCAISSER_PAIEMENT');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "estResponsableEtapeActuelle", {
            /** Vrai si l'utilisateur connecté est responsable de l'étape actuelle de la demande sélectionnée. */
            get: function () {
                var _a, _b;
                if (this.estAdmin)
                    return true;
                var u = this.utilisateur;
                var d = this.demandeSelectionnee;
                if (!u || !d || u.type !== 'COMPTE')
                    return false;
                return u.serviceId === d.serviceId && u.etapeId ===
                    (((_b = (_a = this.workflowActif) === null || _a === void 0 ? void 0 : _a.etapes.find(function (e) { return e.code === d.statut; })) === null || _b === void 0 ? void 0 : _b.id) || '__aucune__');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "peutValider", {
            get: function () {
                return this.estAdmin || (this.authService.aLeDroit('VALIDER') && this.estResponsableEtapeActuelle);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "peutRejeter", {
            get: function () {
                return this.estAdmin || (this.authService.aLeDroit('REJETER') && this.estResponsableEtapeActuelle);
            },
            enumerable: false,
            configurable: true
        });
        DemandesListComponent_1.prototype.load = function () {
            var _this = this;
            this.isLoading = true;
            this.demandesService.getAll().subscribe(function (d) {
                var liste = __spreadArray([], d, true);
                var u = _this.utilisateur;
                // Un compte non-admin ne voit que les dossiers de son propre service — son périmètre de travail.
                if (u && u.type === 'COMPTE' && u.serviceId) {
                    liste = liste.filter(function (x) { return x.serviceId === u.serviceId; });
                }
                _this.demandes = liste.sort(function (a, b) { return b.dateSoumission.getTime() - a.dateSoumission.getTime(); });
                _this.applyFilters();
                _this.isLoading = false;
            });
        };
        DemandesListComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filtered = this.demandes.filter(function (d) {
                var matchTerm = !term ||
                    d.numeroReference.toLowerCase().includes(term) ||
                    d.utilisateurNom.toLowerCase().includes(term);
                var matchStatut = !_this.selectedStatut || d.statut === _this.selectedStatut;
                return matchTerm && matchStatut;
            });
        };
        DemandesListComponent_1.prototype.ouvrirDetail = function (d) {
            var _this = this;
            var _a, _b;
            this.demandeSelectionnee = d;
            this.documentAgrandi = null;
            this.bordereauAgrandi = null;
            var idx = this.etapeIndex(d.statut);
            this.etapeSelectionnee = (_b = (_a = this.etapes[idx]) !== null && _a !== void 0 ? _a : this.etapes[0]) !== null && _b !== void 0 ? _b : null;
            this.workflowActif = null;
            this.comptesActifs = [];
            this.workflowsService.getByServiceId(d.serviceId).subscribe(function (w) {
                _this.workflowActif = w || null;
                if (w) {
                    _this.workflowsService.getComptesByWorkflow(w.id).subscribe(function (comptes) { return _this.comptesActifs = comptes; });
                }
            });
        };
        DemandesListComponent_1.prototype.fermerDetail = function () {
            this.demandeSelectionnee = null;
            this.documentAgrandi = null;
            this.bordereauAgrandi = null;
            this.etapeSelectionnee = null;
            this.workflowActif = null;
            this.comptesActifs = [];
        };
        DemandesListComponent_1.prototype.selectionnerEtapeWorkflow = function (e) {
            this.etapeSelectionnee = e;
        };
        DemandesListComponent_1.prototype.getAuditInfo = function (code) {
            var d = this.demandeSelectionnee;
            if (!d)
                return { statut: 'Non atteint', agent: '-', date: '-', commentaire: '-' };
            var currentIdx = this.etapeIndex(d.statut);
            var targetIdx = this.etapes.findIndex(function (e) { return e.code === code; });
            var agentReel = this.agentAssigne(code);
            if (targetIdx < currentIdx || d.statut === 'TERMINE') {
                return {
                    statut: 'Approuvé et validé',
                    agent: agentReel || 'Agent IBLOPAY Certifié (#402)',
                    date: new Date(d.dateSoumission.getTime() + targetIdx * 3600000).toLocaleString('fr-FR'),
                    commentaire: 'Vérification conforme aux exigences réglementaires.'
                };
            }
            else if (targetIdx === currentIdx && d.statut !== 'REJETE') {
                return {
                    statut: 'En cours de traitement',
                    agent: agentReel || 'Service assigné en attente',
                    date: new Date(d.dateMaj).toLocaleString('fr-FR'),
                    commentaire: 'Dossier actuellement à cette étape.'
                };
            }
            else {
                return {
                    statut: 'En attente des étapes précédentes',
                    agent: agentReel ? "".concat(agentReel, " (\u00E0 venir)") : '-',
                    date: '-',
                    commentaire: 'Étape non encore atteinte.'
                };
            }
        };
        /** Retourne "Prénom Nom — Rôle" du/des comptes rattachés à l'étape du workflow correspondant à ce code de statut. */
        DemandesListComponent_1.prototype.agentAssigne = function (code) {
            var _a;
            var etapeWorkflow = (_a = this.workflowActif) === null || _a === void 0 ? void 0 : _a.etapes.find(function (e) { return e.code === code; });
            if (!etapeWorkflow)
                return '';
            var comptes = this.comptesActifs.filter(function (c) { return c.etapeId === etapeWorkflow.id; });
            if (comptes.length === 0)
                return '';
            return comptes.map(function (c) { return "".concat(c.prenom, " ").concat(c.nom, " (").concat(c.role, ")"); }).join(', ');
        };
        DemandesListComponent_1.prototype.voirDocument = function (r, event) {
            event.stopPropagation();
            if (!this.peutVoirDocuments) {
                this.toastService.error('Vous n\'avez pas le droit de consulter les documents.');
                return;
            }
            this.bordereauAgrandi = null;
            this.documentAgrandi = r;
        };
        DemandesListComponent_1.prototype.fermerDocument = function () {
            this.documentAgrandi = null;
        };
        DemandesListComponent_1.prototype.ouvrirBordereau = function (d, event) {
            event.stopPropagation();
            this.documentAgrandi = null;
            this.bordereauAgrandi = d;
        };
        DemandesListComponent_1.prototype.fermerBordereau = function () {
            this.bordereauAgrandi = null;
        };
        Object.defineProperty(DemandesListComponent_1.prototype, "copieOfficielle", {
            get: function () {
                var _a;
                return (_a = this.demandeSelectionnee) === null || _a === void 0 ? void 0 : _a.reponses.find(function (r) { return r.type === 'FICHIER'; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "documentsJoints", {
            get: function () {
                var _a;
                var fichiers = ((_a = this.demandeSelectionnee) === null || _a === void 0 ? void 0 : _a.reponses.filter(function (r) { return r.type === 'FICHIER'; })) || [];
                return fichiers.length > 1 ? fichiers.slice(1) : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "numeroBordereau", {
            /** Numéro de bordereau généré à partir de la référence du dossier */
            get: function () {
                var d = this.demandeSelectionnee;
                return d ? "BR-".concat(d.numeroReference) : '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DemandesListComponent_1.prototype, "numeroBordereauFull", {
            get: function () {
                var d = this.bordereauAgrandi;
                return d ? "BR-".concat(d.numeroReference) : '';
            },
            enumerable: false,
            configurable: true
        });
        DemandesListComponent_1.prototype.etapeIndex = function (statut) {
            var idx = this.etapes.findIndex(function (e) { return e.code === statut; });
            return idx === -1 ? 0 : idx;
        };
        DemandesListComponent_1.prototype.avancerEtape = function () {
            var _this = this;
            if (!this.demandeSelectionnee)
                return;
            if (!this.peutValider) {
                this.toastService.error('Vous n\'avez pas le droit de valider cette étape.');
                return;
            }
            var idx = this.etapeIndex(this.demandeSelectionnee.statut);
            if (idx >= this.etapes.length - 1)
                return;
            var suivante = this.etapes[idx + 1];
            if (!suivante)
                return;
            this.demandesService.updateStatut(this.demandeSelectionnee.id, suivante.code, suivante.label).subscribe(function (updated) {
                _this.demandeSelectionnee = updated;
                _this.etapeSelectionnee = suivante;
                _this.toastService.success('Dossier validé et transmis à l\'étape suivante.');
                _this.load();
            });
        };
        DemandesListComponent_1.prototype.rejeter = function () {
            var _this = this;
            if (!this.demandeSelectionnee)
                return;
            if (!this.peutRejeter) {
                this.toastService.error('Vous n\'avez pas le droit de rejeter cette demande.');
                return;
            }
            if (!confirm('Rejeter cette demande ?'))
                return;
            this.demandesService.updateStatut(this.demandeSelectionnee.id, 'REJETE', 'Rejeté').subscribe(function (updated) {
                _this.demandeSelectionnee = updated;
                _this.toastService.success('Demande rejetée.');
                _this.load();
            });
        };
        DemandesListComponent_1.prototype.confirmerPaiement = function () {
            var _this = this;
            if (!this.demandeSelectionnee)
                return;
            if (!this.peutEncaisser) {
                this.toastService.error('Vous n\'avez pas le droit d\'encaisser un paiement.');
                return;
            }
            this.demandesService.confirmerPaiement(this.demandeSelectionnee.id).subscribe(function (updated) {
                _this.demandeSelectionnee = updated;
                _this.toastService.success('Paiement confirmé.');
                _this.load();
            });
        };
        DemandesListComponent_1.prototype.statutClass = function (statut) {
            var map = {
                SOUMIS: 'badge-blue', PAIEMENT_EN_ATTENTE: 'badge-orange', RECU: 'badge-blue',
                EN_VERIFICATION: 'badge-orange', EN_VALIDATION: 'badge-orange', EN_TRAITEMENT: 'badge-purple',
                APPROUVE: 'badge-green', REJETE: 'badge-red', TERMINE: 'badge-green'
            };
            return map[statut] || 'badge-blue';
        };
        DemandesListComponent_1.prototype.statutLabel = function (statut) {
            var map = {
                SOUMIS: 'Soumis', PAIEMENT_EN_ATTENTE: 'Paiement en attente', RECU: 'Reçu',
                EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation', EN_TRAITEMENT: 'En traitement',
                APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
            };
            return map[statut] || statut;
        };
        return DemandesListComponent_1;
    }());
    __setFunctionName(_classThis, "DemandesListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemandesListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemandesListComponent = _classThis;
}();
export { DemandesListComponent };
//# sourceMappingURL=demandes-list.component.js.map