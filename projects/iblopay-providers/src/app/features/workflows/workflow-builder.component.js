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
import { RouterLink } from '@angular/router';
import { DROITS_CATALOGUE, ROLES_SUGGERES } from '../../services/workflows.service';
var WorkflowBuilderComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-workflow-builder',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterLink],
            templateUrl: './workflow-builder.component.html',
            styleUrl: './workflow-builder.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WorkflowBuilderComponent = _classThis = /** @class */ (function () {
        function WorkflowBuilderComponent_1(workflowsService, servicesService, route, router, toastService, activiteService) {
            this.workflowsService = workflowsService;
            this.servicesService = servicesService;
            this.route = route;
            this.router = router;
            this.toastService = toastService;
            this.activiteService = activiteService;
            this.etapeBuilder = 'infos';
            this.services = [];
            this.rolesSuggeres = ROLES_SUGGERES;
            this.droitsCatalogue = DROITS_CATALOGUE;
            this.isEdit = false;
            this.isSaving = false;
            this.workflow = {
                id: 0,
                serviceId: 0,
                nom: '',
                description: '',
                statut: 'ACTIF',
                etapes: []
            };
            /** Comptes du workflow, groupés en mémoire pendant l'édition (persistés à l'enregistrement). */
            this.comptes = [];
            this.etapeActiveId = null;
            this.showCompteModal = false;
            this.compteEnEdition = null;
            this.showMotDePasse = false;
            // ─── SAUVEGARDE EN TEMPS RÉEL (BROUILLON) ────────────────
            /** Horodatage de la dernière sauvegarde automatique du brouillon, affiché à l'utilisateur. */
            this.derniereSauvegardeBrouillon = null;
            this.autosaveTimer = null;
            /** Affichage du champ d'ajout d'un droit personnalisé (bouton « + »). */
            this.showAjoutDroitPersonnalise = false;
            this.nouveauDroitLibelle = '';
        }
        WorkflowBuilderComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.servicesService.getAll().subscribe(function (s) { return _this.services = s; });
            var workflowId = this.route.snapshot.paramMap.get('id');
            var serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');
            if (workflowId) {
                this.isEdit = true;
                this.workflowsService.getById(Number(workflowId)).subscribe(function (w) {
                    var _a, _b;
                    if (!w)
                        return;
                    _this.workflow = JSON.parse(JSON.stringify(w));
                    _this.workflowsService.getComptesByWorkflow(_this.workflow.id).subscribe(function (c) {
                        _this.comptes = JSON.parse(JSON.stringify(c));
                    });
                    if (_this.workflow.etapes.length) {
                        _this.etapeActiveId = (_b = (_a = _this.workflow.etapes[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
                    }
                    _this.restaurerBrouillonSiPresent();
                    _this.demarrerAutosave();
                });
            }
            else {
                if (serviceIdQuery) {
                    this.workflow.serviceId = Number(serviceIdQuery);
                }
                var restaure = this.restaurerBrouillonSiPresent();
                if (!restaure)
                    this.ajouterEtape();
                this.demarrerAutosave();
            }
        };
        WorkflowBuilderComponent_1.prototype.ngOnDestroy = function () {
            if (this.autosaveTimer)
                clearInterval(this.autosaveTimer);
        };
        /** Sauvegarde automatiquement le brouillon en cours toutes les quelques secondes. */
        WorkflowBuilderComponent_1.prototype.demarrerAutosave = function () {
            var _this = this;
            this.autosaveTimer = setInterval(function () { return _this.sauvegarderBrouillon(); }, 4000);
        };
        /** Sauvegarde immédiate du brouillon (aussi déclenchée manuellement par l'utilisateur). */
        WorkflowBuilderComponent_1.prototype.sauvegarderBrouillon = function () {
            if (!this.workflow.serviceId)
                return;
            this.workflowsService.sauvegarderBrouillonWorkflow(this.workflow.serviceId, this.workflow.id, {
                workflow: this.workflow,
                comptes: this.comptes
            });
            this.derniereSauvegardeBrouillon = new Date();
        };
        /** Restaure un brouillon existant pour ce service/workflow, s'il y en a un. Renvoie true si restauré. */
        WorkflowBuilderComponent_1.prototype.restaurerBrouillonSiPresent = function () {
            var _a, _b;
            if (!this.workflow.serviceId)
                return false;
            var brouillon = this.workflowsService.chargerBrouillonWorkflow(this.workflow.serviceId, this.workflow.id);
            if (!brouillon)
                return false;
            this.workflow = brouillon.workflow;
            this.comptes = brouillon.comptes;
            this.derniereSauvegardeBrouillon = brouillon.dateSauvegarde;
            if (this.workflow.etapes.length) {
                this.etapeActiveId = (_b = (_a = this.workflow.etapes[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
            }
            this.toastService.success('Reprise de votre brouillon précédent — tout ce que vous aviez commencé a été restauré.');
            return true;
        };
        Object.defineProperty(WorkflowBuilderComponent_1.prototype, "serviceSelectionne", {
            // ─── NAVIGATION DU WIZARD ────────────────────────────────
            get: function () {
                var _this = this;
                return this.services.find(function (s) { return s.id === _this.workflow.serviceId; });
            },
            enumerable: false,
            configurable: true
        });
        WorkflowBuilderComponent_1.prototype.allerA = function (etape) {
            var _a, _b;
            if (etape === 'etapes' && !this.workflow.serviceId) {
                this.toastService.error('Veuillez sélectionner un service avant de continuer.');
                return;
            }
            if (etape === 'comptes' && (!this.workflow.nom || this.workflow.etapes.length === 0)) {
                this.toastService.error('Veuillez définir au moins une étape avant de configurer les comptes.');
                return;
            }
            this.etapeBuilder = etape;
            if (etape === 'comptes' && !this.etapeActiveId && this.workflow.etapes.length) {
                this.etapeActiveId = (_b = (_a = this.workflow.etapes[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
            }
        };
        // ─── GESTION DES ÉTAPES ──────────────────────────────────
        WorkflowBuilderComponent_1.prototype.ajouterEtape = function () {
            var nouvelle = this.workflowsService.creerEtapeVide(this.workflow.etapes.length + 1);
            this.workflow.etapes.push(nouvelle);
            this.etapeActiveId = nouvelle.id;
            this.sauvegarderBrouillon();
        };
        WorkflowBuilderComponent_1.prototype.supprimerEtape = function (index) {
            var _a;
            var etape = this.workflow.etapes[index];
            if (!etape)
                return;
            if (!confirm("Supprimer l'\u00E9tape \u00AB ".concat(etape.nom || 'sans nom', " \u00BB et les comptes qui y sont rattach\u00E9s ?")))
                return;
            this.comptes = this.comptes.filter(function (c) { return c.etapeId !== etape.id; });
            this.workflow.etapes.splice(index, 1);
            this.workflow.etapes.forEach(function (e, i) { return e.ordre = i + 1; });
            if (this.etapeActiveId === etape.id) {
                this.etapeActiveId = ((_a = this.workflow.etapes[0]) === null || _a === void 0 ? void 0 : _a.id) || null;
            }
            this.sauvegarderBrouillon();
        };
        WorkflowBuilderComponent_1.prototype.deplacerEtape = function (index, direction) {
            var cible = index + direction;
            if (cible < 0 || cible >= this.workflow.etapes.length)
                return;
            var e = this.workflow.etapes.splice(index, 1)[0];
            if (e)
                this.workflow.etapes.splice(cible, 0, e);
            this.workflow.etapes.forEach(function (etp, i) { return etp.ordre = i + 1; });
        };
        // ─── GESTION DES COMPTES PAR ÉTAPE ───────────────────────
        WorkflowBuilderComponent_1.prototype.comptesPourEtape = function (etapeId) {
            return this.comptes.filter(function (c) { return c.etapeId === etapeId; });
        };
        Object.defineProperty(WorkflowBuilderComponent_1.prototype, "etapeActive", {
            get: function () {
                var _this = this;
                return this.workflow.etapes.find(function (e) { return e.id === _this.etapeActiveId; });
            },
            enumerable: false,
            configurable: true
        });
        WorkflowBuilderComponent_1.prototype.ouvrirNouveauCompte = function () {
            if (!this.etapeActiveId)
                return;
            this.compteEnEdition = {
                etapeId: this.etapeActiveId,
                nom: '', prenom: '', adresse: '', telephone: '', email: '',
                role: this.rolesSuggeres[0] || 'Autre',
                motDePasse: '',
                confirmationMotDePasse: '',
                droits: ['VOIR_DEMANDE']
            };
            this.showMotDePasse = false;
            this.showCompteModal = true;
        };
        WorkflowBuilderComponent_1.prototype.modifierCompte = function (c) {
            this.compteEnEdition = {
                etapeId: c.etapeId, id: c.id, nom: c.nom, prenom: c.prenom, adresse: c.adresse,
                telephone: c.telephone, email: c.email || '', role: c.role,
                motDePasse: c.motDePasse, confirmationMotDePasse: c.motDePasse,
                droits: __spreadArray([], c.droits, true)
            };
            this.showMotDePasse = false;
            this.showCompteModal = true;
        };
        WorkflowBuilderComponent_1.prototype.fermerCompteModal = function () {
            this.showCompteModal = false;
            this.compteEnEdition = null;
        };
        WorkflowBuilderComponent_1.prototype.toggleDroit = function (droit) {
            if (!this.compteEnEdition)
                return;
            var idx = this.compteEnEdition.droits.indexOf(droit);
            if (idx >= 0) {
                this.compteEnEdition.droits.splice(idx, 1);
            }
            else {
                this.compteEnEdition.droits.push(droit);
            }
        };
        WorkflowBuilderComponent_1.prototype.compteADroit = function (droit) {
            var _a;
            return !!((_a = this.compteEnEdition) === null || _a === void 0 ? void 0 : _a.droits.includes(droit));
        };
        // ─── DROIT PERSONNALISÉ (bouton « + ») ───────────────────
        WorkflowBuilderComponent_1.prototype.ouvrirAjoutDroitPersonnalise = function () {
            this.nouveauDroitLibelle = '';
            this.showAjoutDroitPersonnalise = true;
        };
        WorkflowBuilderComponent_1.prototype.annulerAjoutDroitPersonnalise = function () {
            this.showAjoutDroitPersonnalise = false;
            this.nouveauDroitLibelle = '';
        };
        WorkflowBuilderComponent_1.prototype.confirmerAjoutDroitPersonnalise = function () {
            var libelle = this.nouveauDroitLibelle.trim();
            if (!libelle) {
                this.toastService.error('Veuillez saisir un intitulé pour ce droit.');
                return;
            }
            var droit = this.workflowsService.ajouterDroitPersonnalise(libelle);
            this.droitsCatalogue = __spreadArray([], DROITS_CATALOGUE, true);
            if (this.compteEnEdition && !this.compteEnEdition.droits.includes(droit.code)) {
                this.compteEnEdition.droits.push(droit.code);
            }
            this.showAjoutDroitPersonnalise = false;
            this.nouveauDroitLibelle = '';
            this.toastService.success("Droit \u00AB ".concat(droit.label, " \u00BB ajout\u00E9 \u00E0 la liste."));
        };
        WorkflowBuilderComponent_1.prototype.enregistrerCompte = function () {
            var f = this.compteEnEdition;
            if (!f)
                return;
            if (!f.nom.trim() || !f.prenom.trim() || !f.adresse.trim() || !f.telephone.trim()) {
                this.toastService.error('Veuillez remplir le nom, le prénom, l\'adresse et le téléphone.');
                return;
            }
            if (!f.motDePasse || f.motDePasse.length < 4) {
                this.toastService.error('Le mot de passe doit contenir au moins 4 caractères.');
                return;
            }
            if (f.motDePasse !== f.confirmationMotDePasse) {
                this.toastService.error('Les deux mots de passe ne correspondent pas.');
                return;
            }
            if (f.droits.length === 0) {
                this.toastService.error('Veuillez cocher au moins un droit pour ce compte.');
                return;
            }
            var etape = this.workflow.etapes.find(function (e) { return e.id === f.etapeId; });
            if (f.id) {
                // Modification d'un compte existant
                this.comptes = this.comptes.map(function (c) { return c.id === f.id ? __assign(__assign({}, c), { nom: f.nom, prenom: f.prenom, adresse: f.adresse, telephone: f.telephone, email: f.email, role: f.role, motDePasse: f.motDePasse, droits: f.droits }) : c; });
                this.toastService.success('Compte mis à jour.');
            }
            else {
                // Nouveau compte (identifiant provisoire négatif, remplacé à l'enregistrement final)
                var identifiant = this.workflowsService.genererIdentifiant(f.prenom, f.nom);
                var nouveau = {
                    id: -(Date.now()),
                    nom: f.nom, prenom: f.prenom, adresse: f.adresse, telephone: f.telephone, email: f.email,
                    role: f.role,
                    identifiantConnexion: identifiant,
                    motDePasse: f.motDePasse,
                    statut: 'ACTIF',
                    workflowId: this.workflow.id,
                    serviceId: this.workflow.serviceId,
                    etapeId: f.etapeId,
                    etapeNom: (etape === null || etape === void 0 ? void 0 : etape.nom) || '',
                    droits: f.droits,
                    dateCreation: new Date()
                };
                this.comptes.push(nouveau);
                this.toastService.success("Compte de ".concat(f.prenom, " ").concat(f.nom, " cr\u00E9\u00E9 \u2014 identifiant : ").concat(identifiant, "."));
            }
            this.fermerCompteModal();
            this.sauvegarderBrouillon();
        };
        WorkflowBuilderComponent_1.prototype.supprimerCompte = function (c) {
            if (!confirm("Retirer le compte de ".concat(c.prenom, " ").concat(c.nom, " de cette \u00E9tape ?")))
                return;
            this.comptes = this.comptes.filter(function (x) { return x !== c; });
            this.sauvegarderBrouillon();
        };
        WorkflowBuilderComponent_1.prototype.labelDroit = function (code) {
            return this.workflowsService.labelDroit(code);
        };
        Object.defineProperty(WorkflowBuilderComponent_1.prototype, "peutEnregistrer", {
            // ─── ENREGISTREMENT FINAL ─────────────────────────────────
            get: function () {
                return !!this.workflow.serviceId && !!this.workflow.nom.trim() && this.workflow.etapes.length > 0
                    && this.workflow.etapes.every(function (e) { return !!e.nom.trim(); });
            },
            enumerable: false,
            configurable: true
        });
        WorkflowBuilderComponent_1.prototype.enregistrer = function () {
            var _this = this;
            if (!this.peutEnregistrer) {
                this.toastService.error('Veuillez compléter le nom du workflow et le nom de chaque étape.');
                return;
            }
            this.isSaving = true;
            // Met à jour les identifiants d'étape pour chaque compte + la référence croisée étape→comptes
            this.workflow.etapes.forEach(function (e) {
                e.comptesAssignesIds = _this.comptes.filter(function (c) { return c.etapeId === e.id; }).map(function (c) { return c.id; });
            });
            this.workflowsService.save(this.workflow).subscribe(function (saved) {
                _this.workflow = saved;
                var operations = _this.comptes.map(function (c) {
                    var payload = __assign(__assign({}, c), { workflowId: saved.id, serviceId: saved.serviceId });
                    if (c.id < 0) {
                        delete payload.id;
                        return _this.workflowsService.creerCompte(payload);
                    }
                    else {
                        return _this.workflowsService.modifierCompte(__assign(__assign({}, c), { workflowId: saved.id, serviceId: saved.serviceId }));
                    }
                });
                if (operations.length === 0) {
                    _this.finaliserEnregistrement();
                    return;
                }
                var restants = operations.length;
                operations.forEach(function (obs) { return obs.subscribe(function () {
                    restants--;
                    if (restants === 0)
                        _this.finaliserEnregistrement();
                }); });
            });
        };
        WorkflowBuilderComponent_1.prototype.finaliserEnregistrement = function () {
            this.isSaving = false;
            if (this.autosaveTimer)
                clearInterval(this.autosaveTimer);
            this.workflowsService.effacerBrouillonWorkflow(this.workflow.serviceId, this.workflow.id);
            this.activiteService.consigner(this.isEdit
                ? "Workflow \u00AB ".concat(this.workflow.nom, " \u00BB mis \u00E0 jour")
                : "Workflow \u00AB ".concat(this.workflow.nom, " \u00BB cr\u00E9\u00E9 avec ").concat(this.comptes.length, " compte(s)"), 'fa-solid fa-sitemap', '/workflows');
            this.toastService.success(this.isEdit
                ? "\u2705 Le workflow \u00AB ".concat(this.workflow.nom, " \u00BB a \u00E9t\u00E9 mis \u00E0 jour avec succ\u00E8s.")
                : "\u2705 Le workflow \u00AB ".concat(this.workflow.nom, " \u00BB a \u00E9t\u00E9 cr\u00E9\u00E9 avec ").concat(this.comptes.length, " compte(s)."));
            // Étape suivante de la création du service : le formulaire de demande.
            this.router.navigate(['/formulaires/builder'], { queryParams: { serviceId: this.workflow.serviceId } });
        };
        return WorkflowBuilderComponent_1;
    }());
    __setFunctionName(_classThis, "WorkflowBuilderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WorkflowBuilderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WorkflowBuilderComponent = _classThis;
}();
export { WorkflowBuilderComponent };
//# sourceMappingURL=workflow-builder.component.js.map