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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PALETTE_CHAMPS } from '../../services/formulaires.service';
var FormBuilderComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-form-builder',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterLink],
            templateUrl: './form-builder.component.html',
            styleUrl: './form-builder.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FormBuilderComponent = _classThis = /** @class */ (function () {
        function FormBuilderComponent_1(formulairesService, servicesService, activiteService, route, router) {
            this.formulairesService = formulairesService;
            this.servicesService = servicesService;
            this.activiteService = activiteService;
            this.route = route;
            this.router = router;
            this.palette = PALETTE_CHAMPS;
            this.services = [];
            this.etape = 'infos';
            this.nbColonnes = 1;
            this.showApercu = false;
            this.formulaire = {
                id: 0,
                institutionId: 1,
                serviceId: 0,
                nom: '',
                code: '',
                version: 1,
                statut: 'BROUILLON',
                champs: [],
                createdAt: new Date()
            };
            this.description = '';
            this.champSelectionne = null;
            this.draggedType = null;
            this.draggedExistingIndex = null;
            this.dragOverIndex = null;
            this.isSaving = false;
            this.notification = null;
            this.showQuickAdd = false;
            this.nouveauChampNom = '';
        }
        FormBuilderComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.servicesService.getAll().subscribe(function (s) { return _this.services = s; });
            var formId = this.route.snapshot.paramMap.get('id');
            var serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');
            if (formId) {
                this.formulairesService.getById(Number(formId)).subscribe(function (f) {
                    var _a;
                    if (f) {
                        _this.formulaire = JSON.parse(JSON.stringify(f));
                        _this.formulaire.champs.sort(function (a, b) { return a.ordre - b.ordre; });
                        _this.formulaire.champs.forEach(function (c) {
                            if (!c.configuration)
                                c.configuration = {};
                        });
                        // 🔥 Récupère la disposition
                        _this.nbColonnes = ((_a = _this.formulaire.configuration) === null || _a === void 0 ? void 0 : _a.nbColonnes) ||
                            _this.formulaire.nbColonnes || 1;
                        _this.description = _this.formulaire.description || '';
                        _this.etape = 'finalisation';
                    }
                });
            }
            else if (serviceIdQuery) {
                this.formulaire.serviceId = Number(serviceIdQuery);
                this.servicesService.getById(Number(serviceIdQuery)).subscribe(function (s) {
                    if (s) {
                        if (!_this.formulaire.nom) {
                            _this.formulaire.nom = "Formulaire \u2014 ".concat(s.nom);
                        }
                        if (!_this.formulaire.code) {
                            _this.formulaire.code = "FORM-".concat(s.code);
                        }
                    }
                });
            }
        };
        FormBuilderComponent_1.prototype.getServiceNom = function (serviceId) {
            var service = this.services.find(function (s) { return s.id === serviceId; });
            return service ? service.nom : 'Non défini';
        };
        // ================= NAVIGATION =================
        FormBuilderComponent_1.prototype.allerAuxChamps = function () {
            if (!this.formulaire.nom || !this.formulaire.code || !this.formulaire.serviceId) {
                this.afficherNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            this.etape = 'champs';
        };
        FormBuilderComponent_1.prototype.retournerInfos = function () {
            this.etape = 'infos';
        };
        FormBuilderComponent_1.prototype.allerVersFinalisation = function () {
            if (this.formulaire.champs.length === 0) {
                this.afficherNotification('Ajoutez au moins un champ.', 'error');
                return;
            }
            this.etape = 'finalisation';
        };
        FormBuilderComponent_1.prototype.retournerAuxChamps = function () {
            this.etape = 'champs';
        };
        // ================= AJOUT RAPIDE =================
        FormBuilderComponent_1.prototype.ouvrirAjoutRapide = function () {
            this.showQuickAdd = !this.showQuickAdd;
            if (this.showQuickAdd) {
                this.nouveauChampNom = '';
                setTimeout(function () {
                    var input = document.querySelector('.quick-add input');
                    if (input)
                        input.focus();
                }, 100);
            }
        };
        FormBuilderComponent_1.prototype.fermerAjoutRapide = function () {
            this.showQuickAdd = false;
            this.nouveauChampNom = '';
        };
        FormBuilderComponent_1.prototype.ajouterChampRapide = function () {
            if (!this.nouveauChampNom.trim())
                return;
            var type = 'TEXTE';
            var nouveauChamp = this.formulairesService.creerChampVide(type, this.formulaire.champs.length + 1);
            nouveauChamp.label = this.nouveauChampNom.trim();
            nouveauChamp.code = this.genererCodeChamp(this.nouveauChampNom.trim());
            this.formulaire.champs.push(nouveauChamp);
            this.reordonnerChamps();
            this.champSelectionne = nouveauChamp;
            this.afficherNotification("Champ \"".concat(nouveauChamp.label, "\" ajout\u00E9"), 'success');
            this.fermerAjoutRapide();
        };
        FormBuilderComponent_1.prototype.genererCodeChamp = function (nom) {
            var base = nom
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase()
                .substring(0, 8);
            return "CHAMP_".concat(base, "_").concat(Date.now().toString().slice(-4));
        };
        // ================= DRAG & DROP =================
        FormBuilderComponent_1.prototype.onPaletteDragStart = function (type) {
            this.draggedType = type;
            this.draggedExistingIndex = null;
        };
        FormBuilderComponent_1.prototype.onChampDragStart = function (index, event) {
            this.draggedExistingIndex = index;
            this.draggedType = null;
            event.stopPropagation();
        };
        FormBuilderComponent_1.prototype.onChampDragEnd = function () {
            this.dragOverIndex = null;
        };
        FormBuilderComponent_1.prototype.onDragOver = function (index, event) {
            event.preventDefault();
            this.dragOverIndex = index;
        };
        FormBuilderComponent_1.prototype.onDrop = function (index, event) {
            event.preventDefault();
            this.dragOverIndex = null;
            if (this.draggedType) {
                var nouveauChamp = this.formulairesService.creerChampVide(this.draggedType, index + 1);
                this.formulaire.champs.splice(index, 0, nouveauChamp);
                this.reordonnerChamps();
                this.champSelectionne = nouveauChamp;
                this.draggedType = null;
                return;
            }
            if (this.draggedExistingIndex !== null && this.draggedExistingIndex !== index) {
                var champ = this.formulaire.champs.splice(this.draggedExistingIndex, 1)[0];
                if (champ) {
                    var cibleIndex = this.draggedExistingIndex < index ? index - 1 : index;
                    this.formulaire.champs.splice(cibleIndex, 0, champ);
                    this.reordonnerChamps();
                }
                this.draggedExistingIndex = null;
            }
        };
        FormBuilderComponent_1.prototype.onCanvasDropZone = function (event) {
            event.preventDefault();
            if (this.draggedType) {
                var nouveauChamp = this.formulairesService.creerChampVide(this.draggedType, this.formulaire.champs.length + 1);
                this.formulaire.champs.push(nouveauChamp);
                this.reordonnerChamps();
                this.champSelectionne = nouveauChamp;
                this.draggedType = null;
            }
            else if (this.draggedExistingIndex !== null) {
                var champ = this.formulaire.champs.splice(this.draggedExistingIndex, 1)[0];
                if (champ) {
                    this.formulaire.champs.push(champ);
                    this.reordonnerChamps();
                }
                this.draggedExistingIndex = null;
            }
        };
        FormBuilderComponent_1.prototype.reordonnerChamps = function () {
            this.formulaire.champs.forEach(function (c, i) { return c.ordre = i + 1; });
        };
        // ================= DÉPLACEMENT =================
        FormBuilderComponent_1.prototype.deplacerChamp = function (index, direction) {
            var newIndex = index + direction;
            if (newIndex < 0 || newIndex >= this.formulaire.champs.length)
                return;
            var champ = this.formulaire.champs.splice(index, 1)[0];
            if (champ) {
                this.formulaire.champs.splice(newIndex, 0, champ);
                this.reordonnerChamps();
            }
        };
        // ================= COLONNES =================
        FormBuilderComponent_1.prototype.changerNbColonnes = function (nb) {
            this.nbColonnes = nb;
            // 🔥 Met à jour la configuration immédiatement
            if (!this.formulaire.configuration) {
                this.formulaire.configuration = {};
            }
            this.formulaire.configuration.nbColonnes = nb;
        };
        // ================= APERÇU =================
        FormBuilderComponent_1.prototype.ouvrirApercu = function () {
            if (this.formulaire.champs.length === 0) {
                this.afficherNotification('Ajoutez au moins un champ.', 'error');
                return;
            }
            this.showApercu = true;
        };
        FormBuilderComponent_1.prototype.fermerApercu = function () {
            this.showApercu = false;
        };
        // ================= ACTIONS CHAMPS =================
        FormBuilderComponent_1.prototype.selectionnerChamp = function (champ) {
            var _a;
            if (!champ.configuration)
                champ.configuration = {};
            if (((_a = this.champSelectionne) === null || _a === void 0 ? void 0 : _a.id) === champ.id)
                return;
            this.champSelectionne = champ;
        };
        FormBuilderComponent_1.prototype.supprimerChamp = function (champ, event) {
            var _a;
            event.stopPropagation();
            this.formulaire.champs = this.formulaire.champs.filter(function (c) { return c.id !== champ.id; });
            this.reordonnerChamps();
            if (((_a = this.champSelectionne) === null || _a === void 0 ? void 0 : _a.id) === champ.id) {
                this.champSelectionne = null;
            }
        };
        FormBuilderComponent_1.prototype.dupliquerChamp = function (champ, event) {
            event.stopPropagation();
            var index = this.formulaire.champs.findIndex(function (c) { return c.id === champ.id; });
            var copie = __assign(__assign({}, JSON.parse(JSON.stringify(champ))), { id: 'champ_' + Date.now() + '_' + Math.floor(Math.random() * 1000), label: champ.label + ' (copie)' });
            if (!copie.configuration)
                copie.configuration = {};
            this.formulaire.champs.splice(index + 1, 0, copie);
            this.reordonnerChamps();
        };
        // ================= OPTIONS =================
        FormBuilderComponent_1.prototype.ajouterOption = function () {
            if (!this.champSelectionne)
                return;
            if (!this.champSelectionne.configuration)
                this.champSelectionne.configuration = {};
            if (!this.champSelectionne.configuration.options)
                this.champSelectionne.configuration.options = [];
            this.champSelectionne.configuration.options.push("Option ".concat(this.champSelectionne.configuration.options.length + 1));
        };
        FormBuilderComponent_1.prototype.supprimerOption = function (index) {
            var _a, _b;
            if (!((_b = (_a = this.champSelectionne) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.options))
                return;
            this.champSelectionne.configuration.options.splice(index, 1);
        };
        // ================= UTILITAIRES =================
        FormBuilderComponent_1.prototype.iconePourType = function (type) {
            var _a;
            return ((_a = this.palette.find(function (p) { return p.type === type; })) === null || _a === void 0 ? void 0 : _a.icon) || 'fa-solid fa-square';
        };
        FormBuilderComponent_1.prototype.labelPourType = function (type) {
            var _a;
            return ((_a = this.palette.find(function (p) { return p.type === type; })) === null || _a === void 0 ? void 0 : _a.label) || type;
        };
        // ================= SAUVEGARDE =================
        FormBuilderComponent_1.prototype.enregistrer = function (publier) {
            var _this = this;
            if (publier === void 0) { publier = false; }
            if (!this.formulaire.nom || !this.formulaire.serviceId) {
                this.afficherNotification('Veuillez renseigner le nom et le service.', 'error');
                return;
            }
            if (this.formulaire.champs.length === 0) {
                this.afficherNotification('Ajoutez au moins un champ.', 'error');
                return;
            }
            this.isSaving = true;
            this.formulaire.statut = publier ? 'PUBLIE' : 'BROUILLON';
            this.formulaire.description = this.description;
            // 🔥 Sauvegarde complète de la configuration
            this.formulaire.configuration = __assign(__assign({}, this.formulaire.configuration), { nbColonnes: this.nbColonnes });
            this.formulairesService.save(this.formulaire).subscribe({
                next: function (f) {
                    var _a;
                    _this.isSaving = false;
                    _this.formulaire = f;
                    // 🔥 Restaure la configuration après sauvegarde
                    if ((_a = f.configuration) === null || _a === void 0 ? void 0 : _a.nbColonnes) {
                        _this.nbColonnes = f.configuration.nbColonnes;
                    }
                    _this.activiteService.consigner(publier ? "Formulaire \u00AB ".concat(f.nom, " \u00BB publi\u00E9") : "Formulaire \u00AB ".concat(f.nom, " \u00BB enregistr\u00E9 en brouillon"), 'fa-solid fa-file-lines', '/formulaires');
                    if (!publier) {
                        _this.afficherNotification('✅ Formulaire enregistré en brouillon.', 'success', 1500);
                        setTimeout(function () { return _this.router.navigate(['/formulaires']); }, 1500);
                        return;
                    }
                    // ─── PUBLICATION FINALE DU SERVICE ────────────────────────
                    // Le formulaire est la dernière brique de la création d'un service :
                    // une fois publié, on active/publie le service dans son ensemble.
                    if (f.serviceId) {
                        _this.servicesService.getById(f.serviceId).subscribe(function (service) {
                            if (service && service.statut !== 'ACTIF') {
                                _this.servicesService.update(__assign(__assign({}, service), { statut: 'ACTIF' })).subscribe(function (serviceMisAJour) {
                                    _this.activiteService.consigner("Service \u00AB ".concat(serviceMisAJour.nom, " \u00BB publi\u00E9 \u2014 accessible aux demandeurs"), 'fa-solid fa-circle-check', '/services');
                                    _this.afficherNotification("\u2705 Formulaire publi\u00E9 et service \u00AB ".concat(serviceMisAJour.nom, " \u00BB enti\u00E8rement publi\u00E9 ! Il est d\u00E9sormais actif."), 'success', 2600);
                                    setTimeout(function () { return _this.router.navigate(['/services']); }, 2600);
                                });
                            }
                            else {
                                _this.afficherNotification('✅ Formulaire publié avec succès !', 'success', 2200);
                                setTimeout(function () { return _this.router.navigate(['/formulaires']); }, 2200);
                            }
                        });
                    }
                    else {
                        _this.afficherNotification('✅ Formulaire publié avec succès !', 'success', 2200);
                        setTimeout(function () { return _this.router.navigate(['/formulaires']); }, 2200);
                    }
                },
                error: function (err) {
                    _this.isSaving = false;
                    _this.afficherNotification('❌ Erreur lors de l\'enregistrement.', 'error');
                    console.error(err);
                }
            });
        };
        FormBuilderComponent_1.prototype.afficherNotification = function (message, type, dureeMs) {
            var _this = this;
            if (dureeMs === void 0) { dureeMs = 3000; }
            this.notification = { message: message, type: type };
            setTimeout(function () { return _this.notification = null; }, dureeMs);
        };
        return FormBuilderComponent_1;
    }());
    __setFunctionName(_classThis, "FormBuilderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormBuilderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormBuilderComponent = _classThis;
}();
export { FormBuilderComponent };
//# sourceMappingURL=form-builder.component.js.map