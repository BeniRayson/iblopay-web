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
import { MOCK_BILLETS } from '../data/mock-events-data';
var BilletsService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BilletsService = _classThis = /** @class */ (function () {
        function BilletsService_1() {
            this.billetsSubject = new BehaviorSubject(__spreadArray([], MOCK_BILLETS, true));
            this.billets$ = this.billetsSubject.asObservable();
            this.nextId = Math.max.apply(Math, __spreadArray([0], MOCK_BILLETS.map(function (b) { return b.id; }), false)) + 1;
            this.intervalId = null;
            this.demarrerSimulationTempsReel();
        }
        BilletsService_1.prototype.getAll = function () {
            return this.billets$;
        };
        /** Simule l'arrivée de nouvelles ventes/réservations de billets en temps réel. */
        BilletsService_1.prototype.demarrerSimulationTempsReel = function () {
            var _this = this;
            if (this.intervalId)
                return;
            var noms = ['Ndayishimiye Jean', 'Bukuru Marie', 'Hakizimana Eric', 'Irakoze Sandrine', 'Nshimirimana Pascal', 'Bigirimana Alice', 'Ntahonkuriye Gérard', 'Minani Chantal'];
            this.intervalId = setInterval(function () {
                var billets = _this.billetsSubject.value.map(function (b) { return b; });
                // Certaines réservations passent automatiquement à "Payé" puis "Utilisé"
                var misAJour = billets.map(function (b) {
                    if (b.statut === 'RESERVE' && Math.random() > 0.6) {
                        return __assign(__assign({}, b), { statut: 'PAYE' });
                    }
                    if (b.statut === 'PAYE' && Math.random() > 0.85) {
                        return __assign(__assign({}, b), { statut: 'UTILISE', dateUtilisation: new Date() });
                    }
                    return b;
                });
                // De temps en temps, une nouvelle vente arrive
                if (Math.random() > 0.5) {
                    var nouveau = {
                        id: _this.nextId++,
                        numeroReference: "BIL-".concat(7000 + _this.nextId),
                        evenementId: [1, 2, 3][Math.floor(Math.random() * 3)],
                        categorieNom: ['Standard', 'Tribune', 'VIP', 'Populaire'][Math.floor(Math.random() * 4)],
                        clientNom: noms[Math.floor(Math.random() * noms.length)],
                        clientTelephone: '+257 79 ' + Math.floor(100000 + Math.random() * 900000),
                        prix: [5000, 8000, 12000, 15000, 20000, 30000][Math.floor(Math.random() * 6)],
                        statut: 'RESERVE',
                        dateAchat: new Date()
                    };
                    _this.billetsSubject.next(__spreadArray([nouveau], misAJour, true));
                }
                else {
                    _this.billetsSubject.next(misAJour);
                }
            }, 5000);
        };
        BilletsService_1.prototype.arreterSimulation = function () {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        };
        BilletsService_1.prototype.changerStatut = function (id, statut) {
            var billets = this.billetsSubject.value.map(function (b) {
                if (b.id !== id)
                    return b;
                var maj = __assign(__assign({}, b), { statut: statut });
                if (statut === 'UTILISE')
                    maj.dateUtilisation = new Date();
                return maj;
            });
            this.billetsSubject.next(billets);
        };
        return BilletsService_1;
    }());
    __setFunctionName(_classThis, "BilletsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BilletsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BilletsService = _classThis;
}();
export { BilletsService };
//# sourceMappingURL=billets.service.js.map