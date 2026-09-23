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
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MOCK_SERVICES } from '../data/mock-data';
var ServicesService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesService = _classThis = /** @class */ (function () {
        function ServicesService_1() {
            this.services = __spreadArray([], MOCK_SERVICES, true);
            this.nextId = Math.max.apply(Math, this.services.map(function (s) { return s.id; })) + 1;
        }
        ServicesService_1.prototype.getAll = function () {
            return of(this.services).pipe(delay(200));
        };
        ServicesService_1.prototype.getById = function (id) {
            return this.getAll().pipe(map(function (list) { return list.find(function (s) { return s.id === id; }); }));
        };
        ServicesService_1.prototype.create = function (service) {
            var created = __assign({ id: this.nextId++, nom: service.nom || '', code: service.code || '', description: service.description || '', categorie: service.categorie || '', sousCategorie: service.sousCategorie || '', devise: service.devise || 'BIF', documentsRequis: service.documentsRequis || [], statut: service.statut || 'BROUILLON', dateCreation: new Date(), demandesRecues: 0, demandesTraitees: 0 }, (service.prix ? { prix: service.prix } : {}));
            this.services = __spreadArray([created], this.services, true);
            return of(created).pipe(delay(200));
        };
        ServicesService_1.prototype.update = function (service) {
            this.services = this.services.map(function (s) { return s.id === service.id ? __assign(__assign({}, s), service) : s; });
            return of(service).pipe(delay(200));
        };
        ServicesService_1.prototype.delete = function (id) {
            this.services = this.services.filter(function (s) { return s.id !== id; });
            return of(void 0).pipe(delay(150));
        };
        return ServicesService_1;
    }());
    __setFunctionName(_classThis, "ServicesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesService = _classThis;
}();
export { ServicesService };
//# sourceMappingURL=services.service.js.map