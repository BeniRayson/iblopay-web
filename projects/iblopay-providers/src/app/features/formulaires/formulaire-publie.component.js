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
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var FormulairePublieComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-formulaire-publie',
            standalone: true,
            imports: [CommonModule],
            templateUrl: './formulaire-publie.component.html',
            styleUrl: './formulaire-publie.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _formulaireId_decorators;
    var _formulaireId_initializers = [];
    var _formulaireId_extraInitializers = [];
    var FormulairePublieComponent = _classThis = /** @class */ (function () {
        function FormulairePublieComponent_1(route, formulairesService) {
            this.route = route;
            this.formulairesService = formulairesService;
            this.formulaireId = __runInitializers(this, _formulaireId_initializers, void 0);
            this.formulaire = (__runInitializers(this, _formulaireId_extraInitializers), {
                id: 0,
                institutionId: 1,
                serviceId: 0,
                nom: '',
                code: '',
                version: 1,
                statut: 'PUBLIE',
                champs: [],
                createdAt: new Date()
            });
            this.nbColonnes = 1;
        }
        FormulairePublieComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var id = this.formulaireId || Number(this.route.snapshot.paramMap.get('id'));
            if (id) {
                this.formulairesService.getById(id).subscribe(function (f) {
                    if (f) {
                        _this.formulaire = f;
                        _this.formulaire.champs.sort(function (a, b) { return a.ordre - b.ordre; });
                        // 🔥 Récupère le nombre de colonnes depuis la configuration
                        _this.nbColonnes = _this.getNbColonnes();
                    }
                });
            }
        };
        FormulairePublieComponent_1.prototype.getNbColonnes = function () {
            var _a;
            // 🔥 Priorité 1: configuration.nbColonnes
            if ((_a = this.formulaire.configuration) === null || _a === void 0 ? void 0 : _a.nbColonnes) {
                return this.formulaire.configuration.nbColonnes;
            }
            // 🔥 Priorité 2: propriété directe (pour compatibilité)
            if (this.formulaire.nbColonnes) {
                return this.formulaire.nbColonnes;
            }
            // 🔥 Priorité 3: estimation basée sur le nombre de champs
            var totalChamps = this.formulaire.champs.length;
            if (totalChamps <= 4)
                return 1;
            if (totalChamps <= 8)
                return 2;
            if (totalChamps <= 12)
                return 3;
            return 4;
        };
        return FormulairePublieComponent_1;
    }());
    __setFunctionName(_classThis, "FormulairePublieComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _formulaireId_decorators = [Input()];
        __esDecorate(null, null, _formulaireId_decorators, { kind: "field", name: "formulaireId", static: false, private: false, access: { has: function (obj) { return "formulaireId" in obj; }, get: function (obj) { return obj.formulaireId; }, set: function (obj, value) { obj.formulaireId = value; } }, metadata: _metadata }, _formulaireId_initializers, _formulaireId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormulairePublieComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormulairePublieComponent = _classThis;
}();
export { FormulairePublieComponent };
//# sourceMappingURL=formulaire-publie.component.js.map