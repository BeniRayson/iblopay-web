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
import { MOCK_COURSES } from '../data/mock-transport-data';
var CoursesService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CoursesService = _classThis = /** @class */ (function () {
        function CoursesService_1() {
            this.coursesSubject = new BehaviorSubject(__spreadArray([], MOCK_COURSES, true));
            this.courses$ = this.coursesSubject.asObservable();
            this.nextId = Math.max.apply(Math, __spreadArray([0], MOCK_COURSES.map(function (c) { return c.id; }), false)) + 1;
            this.intervalId = null;
            this.demarrerSimulationTempsReel();
        }
        CoursesService_1.prototype.getAll = function () {
            return this.courses$;
        };
        /** Fait avancer légèrement les courses en cours pour simuler un suivi en temps réel. */
        CoursesService_1.prototype.demarrerSimulationTempsReel = function () {
            var _this = this;
            if (this.intervalId)
                return;
            this.intervalId = setInterval(function () {
                var courses = _this.coursesSubject.value.map(function (c) {
                    if (c.statut !== 'EN_COURS')
                        return c;
                    var nouvelleProgression = Math.min(100, c.progression + Math.floor(Math.random() * 6) + 2);
                    if (nouvelleProgression >= 100) {
                        return __assign(__assign({}, c), { progression: 100, statut: 'TERMINEE', dateFin: new Date() });
                    }
                    return __assign(__assign({}, c), { progression: nouvelleProgression });
                });
                _this.coursesSubject.next(courses);
            }, 4000);
        };
        CoursesService_1.prototype.arreterSimulation = function () {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        };
        CoursesService_1.prototype.changerStatut = function (id, statut) {
            var courses = this.coursesSubject.value.map(function (c) {
                if (c.id !== id)
                    return c;
                var maj = __assign(__assign({}, c), { statut: statut });
                if (statut === 'ACCEPTEE')
                    maj.progression = 5;
                if (statut === 'EN_COURS' && !c.dateDebut)
                    maj.dateDebut = new Date();
                if (statut === 'TERMINEE') {
                    maj.progression = 100;
                    maj.dateFin = new Date();
                }
                if (statut === 'ANNULEE')
                    maj.progression = 0;
                return maj;
            });
            this.coursesSubject.next(courses);
        };
        CoursesService_1.prototype.assignerVehicule = function (id, vehiculeId, chauffeurId) {
            var courses = this.coursesSubject.value.map(function (c) {
                return c.id === id ? __assign(__assign({}, c), { vehiculeId: vehiculeId, chauffeurId: chauffeurId, statut: 'ACCEPTEE', progression: 5 }) : c;
            });
            this.coursesSubject.next(courses);
        };
        CoursesService_1.prototype.creerCourse = function (course) {
            var nouvelle = {
                id: this.nextId++,
                numeroReference: "CRS-".concat(9000 + this.nextId),
                type: course.type || 'TAXI',
                clientNom: course.clientNom || '',
                clientTelephone: course.clientTelephone || '',
                depart: course.depart || '',
                destination: course.destination || '',
                distanceKm: course.distanceKm || 0,
                prix: course.prix || 0,
                statut: 'DEMANDE',
                progression: 0,
                dateDemande: new Date()
            };
            this.coursesSubject.next(__spreadArray([nouvelle], this.coursesSubject.value, true));
        };
        return CoursesService_1;
    }());
    __setFunctionName(_classThis, "CoursesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CoursesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CoursesService = _classThis;
}();
export { CoursesService };
//# sourceMappingURL=courses.service.js.map