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
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MOCK_FORMULAIRES } from '../data/mock-data';
export var PALETTE_CHAMPS = [
    { type: 'TEXTE', label: 'Texte', icon: 'fa-solid fa-font' },
    { type: 'NOMBRE', label: 'Nombre', icon: 'fa-solid fa-hashtag' },
    { type: 'DATE', label: 'Date', icon: 'fa-solid fa-calendar-days' },
    { type: 'EMAIL', label: 'Email', icon: 'fa-solid fa-envelope' },
    { type: 'TELEPHONE', label: 'Téléphone', icon: 'fa-solid fa-phone' },
    { type: 'SELECT', label: 'Select', icon: 'fa-solid fa-list' },
    { type: 'CHECKBOX', label: 'Checkbox', icon: 'fa-regular fa-square-check' },
    { type: 'FICHIER', label: 'Fichier', icon: 'fa-solid fa-paperclip' },
    { type: 'ADRESSE', label: 'Adresse', icon: 'fa-solid fa-location-dot' }
];
var FormulairesService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FormulairesService = _classThis = /** @class */ (function () {
        function FormulairesService_1() {
            this.formulaires = __spreadArray([], MOCK_FORMULAIRES, true);
            this.nextId = Math.max.apply(Math, this.formulaires.map(function (f) { return f.id; })) + 1;
        }
        FormulairesService_1.prototype.getAll = function () {
            return of(this.formulaires).pipe(delay(200));
        };
        FormulairesService_1.prototype.getByServiceId = function (serviceId) {
            return this.getAll().pipe(map(function (list) { return list.find(function (f) { return f.serviceId === serviceId; }); }));
        };
        FormulairesService_1.prototype.getById = function (id) {
            return this.getAll().pipe(map(function (list) { return list.find(function (f) { return f.id === id; }); }));
        };
        FormulairesService_1.prototype.save = function (formulaire) {
            if (formulaire.id) {
                this.formulaires = this.formulaires.map(function (f) { return f.id === formulaire.id ? formulaire : f; });
            }
            else {
                formulaire.id = this.nextId++;
                formulaire.createdAt = new Date();
                this.formulaires = __spreadArray([formulaire], this.formulaires, true);
            }
            return of(formulaire).pipe(delay(250));
        };
        FormulairesService_1.prototype.creerChampVide = function (type, ordre) {
            var item = PALETTE_CHAMPS.find(function (p) { return p.type === type; });
            return {
                id: 'champ_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                typeChamp: type,
                label: item.label,
                code: item.label.toLowerCase().replace(/\s+/g, '_'),
                obligatoire: false,
                ordre: ordre,
                configuration: type === 'SELECT' ? { options: ['Option 1', 'Option 2'] } : {}
            };
        };
        return FormulairesService_1;
    }());
    __setFunctionName(_classThis, "FormulairesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormulairesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormulairesService = _classThis;
}();
export { FormulairesService };
//# sourceMappingURL=formulaires.service.js.map