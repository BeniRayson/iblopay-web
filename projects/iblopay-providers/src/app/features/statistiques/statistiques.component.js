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
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register.apply(Chart, registerables);
var StatistiquesComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-statistiques',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './statistiques.component.html',
            styleUrl: './statistiques.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _chartCanvas_decorators;
    var _chartCanvas_initializers = [];
    var _chartCanvas_extraInitializers = [];
    var _pieCanvas_decorators;
    var _pieCanvas_initializers = [];
    var _pieCanvas_extraInitializers = [];
    var StatistiquesComponent = _classThis = /** @class */ (function () {
        function StatistiquesComponent_1(demandesService, servicesService) {
            this.demandesService = demandesService;
            this.servicesService = servicesService;
            this.chartCanvas = __runInitializers(this, _chartCanvas_initializers, void 0);
            this.pieCanvas = (__runInitializers(this, _chartCanvas_extraInitializers), __runInitializers(this, _pieCanvas_initializers, void 0));
            this.rendement = __runInitializers(this, _pieCanvas_extraInitializers);
            this.rendementServices = [];
            this.services = [];
            this.serviceSelectionneId = null;
            this.indicateursService = null;
            this.isLoadingIndicateurs = false;
        }
        StatistiquesComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.demandesService.getRendementGlobal().subscribe(function (r) { return _this.rendement = r; });
            this.demandesService.getRendementParService().subscribe(function (r) {
                _this.rendementServices = r;
                setTimeout(function () { return _this.buildChart(); }, 0);
            });
            this.servicesService.getAll().subscribe(function (s) {
                _this.services = s.filter(function (sv) { return sv.statut === 'ACTIF'; });
                _this.demandesService.getServicesAvecIndicateurs().subscribe(function (ids) {
                    var premier = _this.services.find(function (sv) { return ids.includes(sv.id); });
                    if (premier) {
                        _this.selectionnerService(premier.id);
                    }
                });
            });
        };
        StatistiquesComponent_1.prototype.ngAfterViewInit = function () { };
        StatistiquesComponent_1.prototype.selectionnerService = function (serviceId) {
            var _this = this;
            this.serviceSelectionneId = serviceId;
            this.isLoadingIndicateurs = true;
            this.demandesService.getIndicateursByService(serviceId).subscribe(function (ind) {
                _this.indicateursService = ind || null;
                _this.isLoadingIndicateurs = false;
                setTimeout(function () { return _this.buildPieChart(); }, 0);
            });
        };
        StatistiquesComponent_1.prototype.buildChart = function () {
            var _a;
            if (!this.chartCanvas)
                return;
            (_a = this.chart) === null || _a === void 0 ? void 0 : _a.destroy();
            var colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#dc2626', '#d97706'];
            var labelsPeriode = ['Période 1', 'Période 2', 'Période 3', 'Période 4', 'Période 5', 'Période 6'];
            var datasets = this.rendementServices.map(function (s, index) {
                var color = colors[index % colors.length];
                var base = Math.max(5, Math.round(s.demandes / 6));
                var waveData = [
                    base,
                    base + (index % 2 === 0 ? 12 : -8),
                    base + (index % 2 === 0 ? -5 : 15),
                    base + (index % 2 === 0 ? 18 : -10),
                    base + (index % 2 === 0 ? -2 : 8),
                    s.demandes - (base * 5)
                ];
                return {
                    label: s.serviceNom,
                    data: waveData,
                    borderColor: color,
                    backgroundColor: color,
                    borderWidth: 2.5,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 6
                };
            });
            this.chart = new Chart(this.chartCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: labelsPeriode,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#475569', font: { size: 10 } },
                            grid: { display: false }
                        },
                        y: {
                            ticks: { color: '#475569', font: { size: 10 } },
                            grid: { color: 'rgba(15,23,42,0.05)' }
                        }
                    }
                }
            });
        };
        StatistiquesComponent_1.prototype.buildPieChart = function () {
            var _a;
            if (!this.pieCanvas || !this.indicateursService)
                return;
            (_a = this.pieChart) === null || _a === void 0 ? void 0 : _a.destroy();
            var rep = this.indicateursService.repartition;
            this.pieChart = new Chart(this.pieCanvas.nativeElement, {
                type: 'pie',
                data: {
                    labels: rep.map(function (r) { return r.label; }),
                    datasets: [{
                            data: rep.map(function (r) { return r.valeur; }),
                            backgroundColor: rep.map(function (r) { return r.couleur; }),
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 } }
                    }
                }
            });
        };
        StatistiquesComponent_1.prototype.tauxTraitement = function (s) {
            if (!s.demandes)
                return 0;
            return Math.round((s.traitees / s.demandes) * 100);
        };
        StatistiquesComponent_1.prototype.getWorkloadLabel = function (enAttente) {
            if (enAttente > 20)
                return 'Surchargé';
            if (enAttente > 10)
                return 'Modéré';
            return 'Fluide';
        };
        StatistiquesComponent_1.prototype.getWorkloadClass = function (enAttente) {
            if (enAttente > 20)
                return 'workload-high';
            if (enAttente > 10)
                return 'workload-medium';
            return 'workload-low';
        };
        StatistiquesComponent_1.prototype.colorClass = function (couleur) {
            return 'kpi-' + couleur;
        };
        return StatistiquesComponent_1;
    }());
    __setFunctionName(_classThis, "StatistiquesComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chartCanvas_decorators = [ViewChild('chartCanvas')];
        _pieCanvas_decorators = [ViewChild('pieCanvas')];
        __esDecorate(null, null, _chartCanvas_decorators, { kind: "field", name: "chartCanvas", static: false, private: false, access: { has: function (obj) { return "chartCanvas" in obj; }, get: function (obj) { return obj.chartCanvas; }, set: function (obj, value) { obj.chartCanvas = value; } }, metadata: _metadata }, _chartCanvas_initializers, _chartCanvas_extraInitializers);
        __esDecorate(null, null, _pieCanvas_decorators, { kind: "field", name: "pieCanvas", static: false, private: false, access: { has: function (obj) { return "pieCanvas" in obj; }, get: function (obj) { return obj.pieCanvas; }, set: function (obj, value) { obj.pieCanvas = value; } }, metadata: _metadata }, _pieCanvas_initializers, _pieCanvas_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StatistiquesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StatistiquesComponent = _classThis;
}();
export { StatistiquesComponent };
//# sourceMappingURL=statistiques.component.js.map