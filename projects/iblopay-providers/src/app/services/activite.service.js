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
import { BehaviorSubject } from 'rxjs';
/**
 * Journal des actions effectuées dans l'application (création de service,
 * de workflow, de compte, publication, validation de demande...).
 * Alimente la cloche de notifications en haut de l'interface, ainsi que
 * la page « Notifications ». Purement en mémoire (+ localStorage) pour
 * cette démonstration, mais conçu pour être branché sur un vrai backend.
 */
var CLE_STOCKAGE = 'iblopay_providers_activites';
var MAX_ENTREES = 100;
var ActiviteService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ActiviteService = _classThis = /** @class */ (function () {
        function ActiviteService_1() {
            var _a;
            this.activitesSubject = new BehaviorSubject(this.restaurer());
            this.activites$ = this.activitesSubject.asObservable();
            this.prochainId = (((_a = this.activitesSubject.value[0]) === null || _a === void 0 ? void 0 : _a.id) || 0) + 1;
        }
        Object.defineProperty(ActiviteService_1.prototype, "activites", {
            get: function () {
                return this.activitesSubject.value;
            },
            enumerable: false,
            configurable: true
        });
        ActiviteService_1.prototype.consigner = function (message, icone, lien) {
            if (icone === void 0) { icone = 'fa-solid fa-circle-info'; }
            var entree = {
                id: this.prochainId++,
                icone: icone,
                message: message,
                lien: lien,
                date: new Date()
            };
            var liste = __spreadArray([entree], this.activitesSubject.value, true).slice(0, MAX_ENTREES);
            this.activitesSubject.next(liste);
            this.sauvegarder(liste);
        };
        ActiviteService_1.prototype.marquerToutesVues = function () {
            // Réservé pour une future distinction lu/non-lu.
        };
        ActiviteService_1.prototype.sauvegarder = function (liste) {
            try {
                localStorage.setItem(CLE_STOCKAGE, JSON.stringify(liste));
            }
            catch ( /* stockage indisponible */_a) { /* stockage indisponible */ }
        };
        ActiviteService_1.prototype.restaurer = function () {
            try {
                var brut = localStorage.getItem(CLE_STOCKAGE);
                if (!brut)
                    return [];
                var liste = JSON.parse(brut);
                return liste.map(function (a) { return (__assign(__assign({}, a), { date: new Date(a.date) })); });
            }
            catch (_a) {
                return [];
            }
        };
        return ActiviteService_1;
    }());
    __setFunctionName(_classThis, "ActiviteService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ActiviteService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ActiviteService = _classThis;
}();
export { ActiviteService };
//# sourceMappingURL=activite.service.js.map