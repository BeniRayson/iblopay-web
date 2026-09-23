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
import { delay } from 'rxjs/operators';
import { MOCK_SOUMISSIONS, MOCK_RENDEMENT_GLOBAL, MOCK_RENDEMENT_SERVICES, MOCK_SERVICE_INDICATEURS } from '../data/mock-data';
var DemandesService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DemandesService = _classThis = /** @class */ (function () {
        function DemandesService_1() {
            this.soumissions = __spreadArray([], MOCK_SOUMISSIONS, true);
        }
        DemandesService_1.prototype.getAll = function () {
            return of(this.soumissions).pipe(delay(200));
        };
        DemandesService_1.prototype.updateStatut = function (id, statut, etape) {
            this.soumissions = this.soumissions.map(function (s) { return s.id === id ? __assign(__assign({}, s), { statut: statut, etapeActuelle: etape, dateMaj: new Date() }) : s; });
            return of(this.soumissions.find(function (s) { return s.id === id; })).pipe(delay(150));
        };
        DemandesService_1.prototype.confirmerPaiement = function (id) {
            this.soumissions = this.soumissions.map(function (s) { return s.id === id ? __assign(__assign({}, s), { montantPaye: true, dateMaj: new Date() }) : s; });
            return of(this.soumissions.find(function (s) { return s.id === id; })).pipe(delay(150));
        };
        DemandesService_1.prototype.getRendementGlobal = function () {
            return of(MOCK_RENDEMENT_GLOBAL).pipe(delay(150));
        };
        DemandesService_1.prototype.getRendementParService = function () {
            return of(MOCK_RENDEMENT_SERVICES).pipe(delay(150));
        };
        DemandesService_1.prototype.getIndicateursByService = function (serviceId) {
            return of(MOCK_SERVICE_INDICATEURS.find(function (i) { return i.serviceId === serviceId; })).pipe(delay(150));
        };
        DemandesService_1.prototype.getServicesAvecIndicateurs = function () {
            return of(MOCK_SERVICE_INDICATEURS.map(function (i) { return i.serviceId; })).pipe(delay(100));
        };
        return DemandesService_1;
    }());
    __setFunctionName(_classThis, "DemandesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemandesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemandesService = _classThis;
}();
export { DemandesService };
//# sourceMappingURL=demandes.service.js.map