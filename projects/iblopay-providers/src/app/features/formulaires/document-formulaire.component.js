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
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
var DocumentFormulaireComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-document-formulaire',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterLink],
            templateUrl: './document-formulaire.component.html',
            styleUrl: './document-formulaire.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _zoneEdition_decorators;
    var _zoneEdition_initializers = [];
    var _zoneEdition_extraInitializers = [];
    var DocumentFormulaireComponent = _classThis = /** @class */ (function () {
        function DocumentFormulaireComponent_1(formulairesService, servicesService, route, router, toastService, sanitizer) {
            this.formulairesService = formulairesService;
            this.servicesService = servicesService;
            this.route = route;
            this.router = router;
            this.toastService = toastService;
            this.sanitizer = sanitizer;
            this.zoneEdition = __runInitializers(this, _zoneEdition_initializers, void 0);
            this.services = (__runInitializers(this, _zoneEdition_extraInitializers), []);
            this.isEdit = false;
            this.isSaving = false;
            this.showApercu = false;
            this.contenuApercu = '';
            this.formulaire = {
                id: 0,
                institutionId: 1,
                serviceId: 0,
                nom: '',
                code: '',
                version: 1,
                statut: 'BROUILLON',
                champs: [],
                createdAt: new Date(),
                typeFormulaire: 'DOCUMENT',
                contenuDocument: ''
            };
            this.contenuInitial = '';
        }
        DocumentFormulaireComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.servicesService.getAll().subscribe(function (s) { return _this.services = s; });
            var id = this.route.snapshot.paramMap.get('id');
            var serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');
            if (id) {
                this.isEdit = true;
                this.formulairesService.getById(Number(id)).subscribe(function (f) {
                    if (!f)
                        return;
                    _this.formulaire = JSON.parse(JSON.stringify(f));
                    _this.contenuInitial = _this.formulaire.contenuDocument || '';
                    if (_this.zoneEdition)
                        _this.zoneEdition.nativeElement.innerHTML = _this.contenuInitial;
                });
            }
            else if (serviceIdQuery) {
                this.formulaire.serviceId = Number(serviceIdQuery);
            }
        };
        DocumentFormulaireComponent_1.prototype.ngAfterViewInit = function () {
            if (this.contenuInitial && this.zoneEdition) {
                this.zoneEdition.nativeElement.innerHTML = this.contenuInitial;
            }
        };
        // ─── BARRE D'OUTILS DE MISE EN FORME (façon Word) ─────────
        DocumentFormulaireComponent_1.prototype.appliquerCommande = function (commande, valeur) {
            var _a;
            (_a = this.zoneEdition) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            document.execCommand(commande, false, valeur);
        };
        DocumentFormulaireComponent_1.prototype.onContenuModifie = function () {
            if (this.zoneEdition) {
                this.formulaire.contenuDocument = this.zoneEdition.nativeElement.innerHTML;
            }
        };
        Object.defineProperty(DocumentFormulaireComponent_1.prototype, "contenuEstVide", {
            get: function () {
                var _a;
                var texte = (_a = this.formulaire.contenuDocument) === null || _a === void 0 ? void 0 : _a.replace(/<[^>]*>/g, '').trim();
                return !texte;
            },
            enumerable: false,
            configurable: true
        });
        // ─── APERÇU ────────────────────────────────────────────────
        DocumentFormulaireComponent_1.prototype.ouvrirApercu = function () {
            this.onContenuModifie();
            if (!this.formulaire.nom.trim() || this.contenuEstVide) {
                this.toastService.error('Ajoutez un titre et du contenu avant de visualiser.');
                return;
            }
            this.contenuApercu = this.sanitizer.bypassSecurityTrustHtml(this.formulaire.contenuDocument || '');
            this.showApercu = true;
        };
        DocumentFormulaireComponent_1.prototype.fermerApercu = function () {
            this.showApercu = false;
        };
        Object.defineProperty(DocumentFormulaireComponent_1.prototype, "nomService", {
            get: function () {
                var _this = this;
                var _a;
                return ((_a = this.services.find(function (s) { return s.id === _this.formulaire.serviceId; })) === null || _a === void 0 ? void 0 : _a.nom) || 'Service non sélectionné';
            },
            enumerable: false,
            configurable: true
        });
        // ─── ENREGISTREMENT ────────────────────────────────────────
        DocumentFormulaireComponent_1.prototype.validerAvantEnregistrement = function () {
            this.onContenuModifie();
            if (!this.formulaire.nom.trim()) {
                this.toastService.error('Veuillez donner un nom à ce formulaire.');
                return false;
            }
            if (!this.formulaire.serviceId) {
                this.toastService.error('Veuillez sélectionner le service concerné.');
                return false;
            }
            if (this.contenuEstVide) {
                this.toastService.error('Le contenu du document est vide. Écrivez ou collez le texte de la lettre/du formulaire.');
                return false;
            }
            return true;
        };
        DocumentFormulaireComponent_1.prototype.enregistrerBrouillon = function () {
            if (!this.validerAvantEnregistrement())
                return;
            this.sauvegarder('BROUILLON', 'Brouillon enregistré.');
        };
        DocumentFormulaireComponent_1.prototype.publier = function () {
            if (!this.validerAvantEnregistrement())
                return;
            if (!confirm('Publier ce formulaire ? Il sera visible et utilisable par les demandeurs du service concerné.'))
                return;
            this.sauvegarder('PUBLIE', '✅ Formulaire publié avec succès.');
        };
        DocumentFormulaireComponent_1.prototype.sauvegarder = function (statut, message) {
            var _this = this;
            this.isSaving = true;
            if (!this.formulaire.code) {
                this.formulaire.code = 'DOC_' + this.formulaire.nom.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').slice(0, 30);
            }
            this.formulaire.statut = statut;
            this.formulaire.typeFormulaire = 'DOCUMENT';
            this.formulairesService.save(this.formulaire).subscribe(function (saved) {
                _this.formulaire = saved;
                _this.isSaving = false;
                _this.toastService.success(message);
                _this.router.navigate(['/formulaires']);
            });
        };
        return DocumentFormulaireComponent_1;
    }());
    __setFunctionName(_classThis, "DocumentFormulaireComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _zoneEdition_decorators = [ViewChild('zoneEdition')];
        __esDecorate(null, null, _zoneEdition_decorators, { kind: "field", name: "zoneEdition", static: false, private: false, access: { has: function (obj) { return "zoneEdition" in obj; }, get: function (obj) { return obj.zoneEdition; }, set: function (obj, value) { obj.zoneEdition = value; } }, metadata: _metadata }, _zoneEdition_initializers, _zoneEdition_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DocumentFormulaireComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DocumentFormulaireComponent = _classThis;
}();
export { DocumentFormulaireComponent };
//# sourceMappingURL=document-formulaire.component.js.map