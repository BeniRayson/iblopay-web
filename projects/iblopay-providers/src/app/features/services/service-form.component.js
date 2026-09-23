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
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
var ServiceFormComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-service-form',
            standalone: true,
            imports: [CommonModule, ReactiveFormsModule, RouterLink],
            templateUrl: './service-form.component.html',
            styleUrl: './service-form.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServiceFormComponent = _classThis = /** @class */ (function () {
        function ServiceFormComponent_1(fb, servicesService, route, router, toastService, activiteService) {
            this.fb = fb;
            this.servicesService = servicesService;
            this.route = route;
            this.router = router;
            this.toastService = toastService;
            this.activiteService = activiteService;
            this.isEdit = false;
            this.isSaving = false;
            this.isConfirmOpen = false;
            /** Une fois le service enregistré, la carte récapitulative s'affiche avec le bouton « Étape suivante ». */
            this.serviceEnregistre = null;
            this.dernierCodeAuto = '';
            this.form = this.fb.group({
                nom: ['', Validators.required],
                code: [''],
                description: ['', Validators.required],
                categorie: ['', Validators.required],
                sousCategorie: [''],
                prix: [null],
                devise: ['BIF', Validators.required],
                statut: ['BROUILLON', Validators.required],
                documentsRequis: this.fb.array([])
            });
        }
        ServiceFormComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var idParam = this.route.snapshot.paramMap.get('id');
            if (idParam) {
                this.isEdit = true;
                this.serviceId = Number(idParam);
                this.servicesService.getById(this.serviceId).subscribe(function (s) {
                    if (!s)
                        return;
                    _this.form.patchValue(s);
                    s.documentsRequis.forEach(function (doc) { return _this.documents.push(_this.fb.control(doc)); });
                    _this.form.get('nom').valueChanges.subscribe(function (nom) { return _this.autoGenererCode(nom); });
                });
            }
            else {
                this.ajouterDocument();
                this.form.get('nom').valueChanges.subscribe(function (nom) {
                    var codeControl = _this.form.get('code');
                    var valeurActuelle = (codeControl.value || '').trim();
                    if (!valeurActuelle || valeurActuelle === _this.dernierCodeAuto) {
                        var nouveauCode = _this.genererCode(nom || '');
                        _this.dernierCodeAuto = nouveauCode;
                        codeControl.setValue(nouveauCode, { emitEvent: false });
                    }
                });
                var nomInitial = this.form.get('nom').value;
                if (nomInitial) {
                    var code = this.genererCode(nomInitial);
                    this.dernierCodeAuto = code;
                    this.form.get('code').setValue(code, { emitEvent: false });
                }
            }
        };
        Object.defineProperty(ServiceFormComponent_1.prototype, "documents", {
            get: function () {
                return this.form.get('documentsRequis');
            },
            enumerable: false,
            configurable: true
        });
        ServiceFormComponent_1.prototype.ajouterDocument = function () {
            this.documents.push(this.fb.control(''));
        };
        ServiceFormComponent_1.prototype.supprimerDocument = function (index) {
            this.documents.removeAt(index);
        };
        ServiceFormComponent_1.prototype.autoGenererCode = function (nom) {
            var codeControl = this.form.get('code');
            var valeurActuelle = (codeControl.value || '').trim();
            if (!valeurActuelle || valeurActuelle === this.dernierCodeAuto) {
                var nouveauCode = this.genererCode(nom || '');
                this.dernierCodeAuto = nouveauCode;
                codeControl.setValue(nouveauCode, { emitEvent: false });
            }
        };
        ServiceFormComponent_1.prototype.genererCode = function (nom) {
            var motsVides = ['de', 'du', 'des', 'le', 'la', 'les', 'un', 'une', "d'", "l'", 'et', 'pour'];
            var mots = nom
                .trim()
                .split(/\s+/)
                .filter(function (w) { return w && !motsVides.includes(w.toLowerCase()); });
            var base = (mots[0] || 'SRV')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z]/g, '')
                .toUpperCase()
                .substring(0, 4) || 'SRV';
            var suffixe = String(Math.floor(100 + Math.random() * 900));
            return "".concat(base, "-").concat(suffixe);
        };
        ServiceFormComponent_1.prototype.demanderConfirmation = function () {
            if (this.form.invalid) {
                this.form.markAllAsTouched();
                this.toastService.error('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            this.isConfirmOpen = true;
        };
        ServiceFormComponent_1.prototype.annulerConfirmation = function () {
            this.isConfirmOpen = false;
        };
        /** Enregistre le service uniquement (pas de publication). La carte récapitulative s'affiche ensuite. */
        ServiceFormComponent_1.prototype.confirmerEtEnregistrer = function () {
            var _this = this;
            var _a;
            this.isSaving = true;
            var payload = __assign(__assign({}, this.form.value), { 
                // Un service nouvellement créé (ou en cours de complétion) reste en brouillon
                // tant que le workflow et le formulaire n'ont pas été finalisés et publiés.
                statut: this.isEdit ? this.form.value.statut : 'BROUILLON', prix: (_a = this.form.value.prix) !== null && _a !== void 0 ? _a : undefined, documentsRequis: this.form.value.documentsRequis.filter(function (d) { return !!(d === null || d === void 0 ? void 0 : d.trim()); }) });
            var obs = this.isEdit && this.serviceId
                ? this.servicesService.update(__assign({ id: this.serviceId }, payload))
                : this.servicesService.create(payload);
            obs.subscribe({
                next: function (service) {
                    _this.isSaving = false;
                    _this.isConfirmOpen = false;
                    _this.serviceId = service.id;
                    _this.isEdit = true;
                    _this.serviceEnregistre = service;
                    _this.activiteService.consigner("Service \u00AB ".concat(service.nom, " \u00BB enregistr\u00E9"), 'fa-solid fa-layer-group', '/services');
                    _this.toastService.success("\u2705 Le service \u00AB ".concat(service.nom, " \u00BB a \u00E9t\u00E9 enregistr\u00E9."));
                },
                error: function (error) {
                    _this.isSaving = false;
                    _this.toastService.error('❌ Une erreur est survenue lors de l\'enregistrement.');
                    console.error(error);
                }
            });
        };
        /** Depuis la carte récapitulative : direction la création du workflow de ce service. */
        ServiceFormComponent_1.prototype.allerVersWorkflow = function () {
            if (!this.serviceEnregistre)
                return;
            this.router.navigate(['/workflows/nouveau'], { queryParams: { serviceId: this.serviceEnregistre.id } });
        };
        ServiceFormComponent_1.prototype.fermerRecapitulatif = function () {
            this.serviceEnregistre = null;
            this.router.navigate(['/services']);
        };
        Object.defineProperty(ServiceFormComponent_1.prototype, "documentsNonVides", {
            get: function () {
                return (this.form.value.documentsRequis || []).filter(function (d) { return !!(d === null || d === void 0 ? void 0 : d.trim()); });
            },
            enumerable: false,
            configurable: true
        });
        return ServiceFormComponent_1;
    }());
    __setFunctionName(_classThis, "ServiceFormComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServiceFormComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServiceFormComponent = _classThis;
}();
export { ServiceFormComponent };
//# sourceMappingURL=service-form.component.js.map