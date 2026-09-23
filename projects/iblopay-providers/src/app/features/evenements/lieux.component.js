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
var LieuxComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-lieux',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './lieux.component.html',
            styleUrl: './lieux.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LieuxComponent = _classThis = /** @class */ (function () {
        function LieuxComponent_1(evenementsService, toastService) {
            this.evenementsService = evenementsService;
            this.toastService = toastService;
            this.lieux = [];
            this.lieuxFiltres = [];
            this.evenements = [];
            this.recherche = '';
            this.filtreType = '';
            this.filtreStatut = '';
            this.typesDisponibles = [];
            this.isLoading = true;
            this.showModal = false;
            this.form = null;
            this.lieuDetailAffiche = null;
        }
        LieuxComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.charger();
            this.evenementsService.getTypesLieux().subscribe(function (t) { return _this.typesDisponibles = t; });
        };
        LieuxComponent_1.prototype.charger = function () {
            var _this = this;
            this.isLoading = true;
            this.evenementsService.getEvenements().subscribe(function (e) { return _this.evenements = e; });
            this.evenementsService.getLieux().subscribe(function (l) {
                _this.lieux = l;
                _this.appliquerFiltres();
                _this.isLoading = false;
            });
        };
        LieuxComponent_1.prototype.appliquerFiltres = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            this.lieuxFiltres = this.lieux.filter(function (l) {
                var matchType = !_this.filtreType || l.type === _this.filtreType;
                var matchStatut = !_this.filtreStatut || l.statut === _this.filtreStatut;
                var matchTerm = !term || l.nom.toLowerCase().includes(term) || l.ville.toLowerCase().includes(term);
                return matchType && matchStatut && matchTerm;
            });
        };
        LieuxComponent_1.prototype.reinitialiserFiltres = function () {
            this.recherche = '';
            this.filtreType = '';
            this.filtreStatut = '';
            this.appliquerFiltres();
        };
        LieuxComponent_1.prototype.typeLabel = function (type) {
            return type || 'Autre';
        };
        LieuxComponent_1.prototype.evenementsDuLieu = function (lieuId) {
            return this.evenements.filter(function (e) { return e.lieuId === lieuId && (e.statut === 'PROGRAMME' || e.statut === 'EN_COURS'); });
        };
        LieuxComponent_1.prototype.voirDetail = function (l) {
            this.lieuDetailAffiche = l;
        };
        LieuxComponent_1.prototype.fermerDetail = function () {
            this.lieuDetailAffiche = null;
        };
        LieuxComponent_1.prototype.ouvrirNouveau = function () {
            this.form = { nom: '', ville: '', adresse: '', type: this.typesDisponibles[0] || 'Autre', capaciteMax: 1000, statut: 'ACTIF' };
            this.showModal = true;
        };
        LieuxComponent_1.prototype.modifier = function (l) {
            this.form = { id: l.id, nom: l.nom, ville: l.ville, adresse: l.adresse, type: l.type, capaciteMax: l.capaciteMax, statut: l.statut };
            this.showModal = true;
        };
        LieuxComponent_1.prototype.fermerModal = function () {
            this.showModal = false;
            this.form = null;
        };
        LieuxComponent_1.prototype.enregistrer = function () {
            var _this = this;
            var f = this.form;
            if (!f)
                return;
            if (!f.nom.trim() || !f.ville.trim()) {
                this.toastService.error('Veuillez renseigner le nom et la ville.');
                return;
            }
            var obs = f.id ? this.evenementsService.modifierLieu(f) : this.evenementsService.creerLieu(f);
            obs.subscribe(function (l) {
                _this.toastService.success(f.id ? "Lieu \u00AB ".concat(l.nom, " \u00BB mis \u00E0 jour.") : "Lieu \u00AB ".concat(l.nom, " \u00BB cr\u00E9\u00E9."));
                _this.fermerModal();
                _this.charger();
            });
        };
        LieuxComponent_1.prototype.supprimer = function (l) {
            var _this = this;
            if (!confirm("Supprimer le lieu \u00AB ".concat(l.nom, " \u00BB ?")))
                return;
            this.evenementsService.supprimerLieu(l.id).subscribe(function () {
                _this.toastService.success('Lieu supprimé.');
                _this.charger();
            });
        };
        LieuxComponent_1.prototype.toggleStatut = function (l) {
            var _this = this;
            this.evenementsService.toggleStatutLieu(l).subscribe(function () {
                _this.toastService.success("Lieu ".concat(l.statut === 'ACTIF' ? 'désactivé' : 'activé', "."));
                _this.charger();
            });
        };
        LieuxComponent_1.prototype.ajouterType = function () {
            var _this = this;
            var nom = prompt('Nom du nouveau type de lieu :', '');
            if (!nom || !nom.trim())
                return;
            this.evenementsService.ajouterTypeLieu(nom);
            this.evenementsService.getTypesLieux().subscribe(function (t) {
                _this.typesDisponibles = t;
                if (_this.form)
                    _this.form.type = nom.trim();
                _this.toastService.success("Type \u00AB ".concat(nom.trim(), " \u00BB ajout\u00E9."));
            });
        };
        return LieuxComponent_1;
    }());
    __setFunctionName(_classThis, "LieuxComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LieuxComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LieuxComponent = _classThis;
}();
export { LieuxComponent };
//# sourceMappingURL=lieux.component.js.map