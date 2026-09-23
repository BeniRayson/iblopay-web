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
var CoursesLiveComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-courses-live',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './courses-live.component.html',
            styleUrl: './courses-live.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CoursesLiveComponent = _classThis = /** @class */ (function () {
        function CoursesLiveComponent_1(coursesService, transportService, toastService) {
            this.coursesService = coursesService;
            this.transportService = transportService;
            this.toastService = toastService;
            this.courses = [];
            this.filtered = [];
            this.vehicules = [];
            this.chauffeurs = [];
            this.filtreType = '';
            this.filtreStatut = '';
            this.isLoading = true;
            this.currentPage = 1;
            this.pageSize = 12;
            this.showAssignationModal = false;
            this.courseAAssigner = null;
            this.vehiculeChoisiId = null;
            // ─── DÉTAIL / SUIVI EN TEMPS RÉEL D'UNE COURSE ────────────
            this.courseDetailAffichee = null;
        }
        CoursesLiveComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.transportService.getVehicules().subscribe(function (v) { return _this.vehicules = v; });
            this.transportService.getChauffeurs().subscribe(function (c) { return _this.chauffeurs = c; });
            this.sub = this.coursesService.getAll().subscribe(function (courses) {
                _this.courses = courses;
                _this.applyFilters();
                // Garde le détail affiché synchronisé avec la progression en temps réel
                if (_this.courseDetailAffichee) {
                    var maj = courses.find(function (c) { return c.id === _this.courseDetailAffichee.id; });
                    if (maj)
                        _this.courseDetailAffichee = maj;
                }
                _this.isLoading = false;
            });
        };
        CoursesLiveComponent_1.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        CoursesLiveComponent_1.prototype.applyFilters = function () {
            var _this = this;
            this.filtered = this.courses
                .filter(function (c) { return (!_this.filtreType || c.type === _this.filtreType) && (!_this.filtreStatut || c.statut === _this.filtreStatut); })
                .sort(function (a, b) { return b.dateDemande.getTime() - a.dateDemande.getTime(); });
        };
        CoursesLiveComponent_1.prototype.onFiltreChange = function () {
            this.applyFilters();
            this.currentPage = 1;
        };
        Object.defineProperty(CoursesLiveComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filtered.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CoursesLiveComponent_1.prototype, "filteredPagines", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.filtered.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        CoursesLiveComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages)
                this.currentPage = page;
        };
        Object.defineProperty(CoursesLiveComponent_1.prototype, "enCoursCount", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'EN_COURS'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CoursesLiveComponent_1.prototype, "enAttenteCount", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'DEMANDE' || c.statut === 'ACCEPTEE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CoursesLiveComponent_1.prototype, "termineesAujourdhui", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'TERMINEE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CoursesLiveComponent_1.prototype, "revenuTotalCourses", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'TERMINEE'; }).reduce(function (sum, c) { return sum + c.prix; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        CoursesLiveComponent_1.prototype.formatBIF = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
        };
        CoursesLiveComponent_1.prototype.nomVehicule = function (id) {
            if (!id)
                return '—';
            var v = this.vehicules.find(function (x) { return x.id === id; });
            return v ? v.matricule : '—';
        };
        CoursesLiveComponent_1.prototype.nomChauffeur = function (id) {
            if (!id)
                return '—';
            var c = this.chauffeurs.find(function (x) { return x.id === id; });
            return c ? "".concat(c.prenom, " ").concat(c.nom) : '—';
        };
        CoursesLiveComponent_1.prototype.telephoneChauffeur = function (id) {
            var c = this.chauffeurs.find(function (x) { return x.id === id; });
            return (c === null || c === void 0 ? void 0 : c.telephone) || '—';
        };
        CoursesLiveComponent_1.prototype.vehiculesDisponibles = function (type) {
            return this.vehicules.filter(function (v) { return v.type === type && (v.statut === 'DISPONIBLE' || v.statut === 'AU_DEPOT' || v.statut === 'EN_SERVICE'); });
        };
        CoursesLiveComponent_1.prototype.ouvrirAssignation = function (c, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.courseAAssigner = c;
            this.vehiculeChoisiId = null;
            this.showAssignationModal = true;
        };
        CoursesLiveComponent_1.prototype.fermerAssignation = function () {
            this.showAssignationModal = false;
            this.courseAAssigner = null;
        };
        CoursesLiveComponent_1.prototype.confirmerAssignation = function () {
            var _this = this;
            if (!this.courseAAssigner || !this.vehiculeChoisiId) {
                this.toastService.error('Veuillez sélectionner un véhicule.');
                return;
            }
            var vehicule = this.vehicules.find(function (v) { return v.id === _this.vehiculeChoisiId; });
            if (!vehicule || !vehicule.chauffeurId) {
                this.toastService.error('Ce véhicule n\'a pas de chauffeur assigné. Assignez-en un depuis la Flotte.');
                return;
            }
            this.coursesService.assignerVehicule(this.courseAAssigner.id, vehicule.id, vehicule.chauffeurId);
            this.toastService.success("V\u00E9hicule ".concat(vehicule.matricule, " assign\u00E9 \u00E0 la course ").concat(this.courseAAssigner.numeroReference, "."));
            this.fermerAssignation();
        };
        CoursesLiveComponent_1.prototype.demarrerCourse = function (c, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.coursesService.changerStatut(c.id, 'EN_COURS');
            this.toastService.success("Course ".concat(c.numeroReference, " d\u00E9marr\u00E9e."));
        };
        CoursesLiveComponent_1.prototype.terminerCourse = function (c, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.coursesService.changerStatut(c.id, 'TERMINEE');
            this.toastService.success("Course ".concat(c.numeroReference, " termin\u00E9e."));
        };
        CoursesLiveComponent_1.prototype.annulerCourse = function (c, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            if (!confirm("Annuler la course ".concat(c.numeroReference, " ?")))
                return;
            this.coursesService.changerStatut(c.id, 'ANNULEE');
            this.toastService.success('Course annulée.');
        };
        CoursesLiveComponent_1.prototype.statutClass = function (statut) {
            var map = {
                DEMANDE: 'badge-orange', ACCEPTEE: 'badge-blue', EN_COURS: 'badge-purple', TERMINEE: 'badge-green', ANNULEE: 'badge-red'
            };
            return map[statut];
        };
        CoursesLiveComponent_1.prototype.statutLabel = function (statut) {
            var map = {
                DEMANDE: 'Demande reçue', ACCEPTEE: 'Véhicule assigné', EN_COURS: 'En cours', TERMINEE: 'Terminée', ANNULEE: 'Annulée'
            };
            return map[statut];
        };
        CoursesLiveComponent_1.prototype.minutesEcoulees = function (date) {
            return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
        };
        // ─── DÉTAIL / CARTE DE SUIVI EN TEMPS RÉEL ────────────────
        CoursesLiveComponent_1.prototype.ouvrirDetail = function (c) {
            this.courseDetailAffichee = c;
        };
        CoursesLiveComponent_1.prototype.fermerDetail = function () {
            this.courseDetailAffichee = null;
        };
        /** Estimation du temps restant en minutes, en fonction de la progression actuelle. */
        CoursesLiveComponent_1.prototype.tempsRestantEstime = function (c) {
            if (c.statut !== 'EN_COURS' || !c.dateDebut)
                return 0;
            var ecouleMs = Date.now() - new Date(c.dateDebut).getTime();
            if (c.progression <= 0)
                return 0;
            var totalEstimeMs = (ecouleMs / c.progression) * 100;
            var restantMs = Math.max(0, totalEstimeMs - ecouleMs);
            return Math.round(restantMs / 60000);
        };
        CoursesLiveComponent_1.prototype.dureeTotale = function (c) {
            if (!c.dateDebut)
                return 0;
            var fin = c.dateFin ? new Date(c.dateFin).getTime() : Date.now();
            return Math.round((fin - new Date(c.dateDebut).getTime()) / 60000);
        };
        return CoursesLiveComponent_1;
    }());
    __setFunctionName(_classThis, "CoursesLiveComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CoursesLiveComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CoursesLiveComponent = _classThis;
}();
export { CoursesLiveComponent };
//# sourceMappingURL=courses-live.component.js.map