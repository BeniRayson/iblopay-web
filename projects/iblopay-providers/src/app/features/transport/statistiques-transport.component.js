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
var StatistiquesTransportComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-statistiques-transport',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './statistiques-transport.component.html',
            styleUrl: './statistiques-transport.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _chartCanvas_decorators;
    var _chartCanvas_initializers = [];
    var _chartCanvas_extraInitializers = [];
    var StatistiquesTransportComponent = _classThis = /** @class */ (function () {
        function StatistiquesTransportComponent_1(transportService, coursesService) {
            this.transportService = transportService;
            this.coursesService = coursesService;
            this.chartCanvas = __runInitializers(this, _chartCanvas_initializers, void 0);
            this.stats = (__runInitializers(this, _chartCanvas_extraInitializers), null);
            this.statsParLigneOuZone = [];
            this.lignes = [];
            this.zones = [];
            this.chauffeurs = [];
            this.historique = [];
            this.courses = [];
            this.trajetSelectionneId = null; // format "LIGNE:1" ou "ZONE:2"
            this.kpisTrajet = [];
            this.isLoadingKpis = false;
        }
        StatistiquesTransportComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.transportService.getStatsGlobal().subscribe(function (s) { return _this.stats = s; });
            this.transportService.getChauffeurs().subscribe(function (c) { return _this.chauffeurs = c; });
            this.coursesService.getAll().subscribe(function (c) { return _this.courses = c; });
            this.transportService.getHistorique().subscribe(function (h) { return _this.historique = h; });
            this.transportService.getStatsParLigneOuZone().subscribe(function (s) {
                _this.statsParLigneOuZone = s;
                setTimeout(function () { return _this.buildChart(); }, 0);
            });
            this.transportService.getLignes().subscribe(function (l) {
                _this.lignes = l.filter(function (x) { return x.statut === 'ACTIVE'; });
                _this.transportService.getZones().subscribe(function (z) {
                    _this.zones = z.filter(function (x) { return x.statut === 'ACTIVE'; });
                    var premiere = _this.lignes[0];
                    if (premiere)
                        _this.selectionnerTrajet('LIGNE:' + premiere.id);
                });
            });
        };
        StatistiquesTransportComponent_1.prototype.ngAfterViewInit = function () { };
        StatistiquesTransportComponent_1.prototype.selectionnerTrajet = function (cle) {
            var _this = this;
            this.trajetSelectionneId = cle;
            this.isLoadingKpis = true;
            var _a = cle.split(':'), type = _a[0], idStr = _a[1];
            var id = Number(idStr);
            var entries = type === 'LIGNE'
                ? this.historique.filter(function (h) { return h.ligneId === id; })
                : this.historique.filter(function (h) { return h.zoneId === id; });
            var termines = entries.filter(function (e) { return e.statut === 'TERMINE'; });
            var revenuTotal = termines.reduce(function (sum, e) { return sum + e.revenu; }, 0);
            var dureeMoyenne = termines.length ? Math.round(termines.reduce(function (s, e) { return s + e.dureeMinutes; }, 0) / termines.length) : 0;
            var tauxAnnulation = entries.length ? Math.round(((entries.length - termines.length) / entries.length) * 100) : 0;
            var passagersTotal = termines.reduce(function (sum, e) { return sum + e.passagers; }, 0);
            this.kpisTrajet = [
                { icon: 'fa-solid fa-route', label: 'Trajets effectués', valeur: String(termines.length), couleur: 'blue' },
                { icon: 'fa-solid fa-sack-dollar', label: 'Revenu total', valeur: this.formatBIF(revenuTotal), couleur: 'green' },
                { icon: 'fa-solid fa-users', label: 'Passagers transportés', valeur: String(passagersTotal), couleur: 'purple' },
                { icon: 'fa-solid fa-clock', label: 'Durée moyenne', valeur: dureeMoyenne + ' min', couleur: 'cyan' },
                { icon: 'fa-solid fa-triangle-exclamation', label: 'Taux d\'annulation', valeur: tauxAnnulation + '%', couleur: 'orange' }
            ];
            setTimeout(function () { _this.isLoadingKpis = false; }, 150);
        };
        StatistiquesTransportComponent_1.prototype.formatBIF = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + ' BIF';
        };
        StatistiquesTransportComponent_1.prototype.buildChart = function () {
            var _a;
            if (!this.chartCanvas)
                return;
            (_a = this.chart) === null || _a === void 0 ? void 0 : _a.destroy();
            var colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#dc2626', '#d97706'];
            var labelsPeriode = ['Période 1', 'Période 2', 'Période 3', 'Période 4', 'Période 5', 'Période 6'];
            var datasets = this.statsParLigneOuZone.map(function (s, index) {
                var color = colors[index % colors.length];
                var base = Math.max(5, Math.round(s.courses / 6));
                var waveData = [
                    base,
                    base + (index % 2 === 0 ? 12 : -8),
                    base + (index % 2 === 0 ? -5 : 15),
                    base + (index % 2 === 0 ? 18 : -10),
                    base + (index % 2 === 0 ? -2 : 8),
                    s.courses - (base * 5)
                ];
                return {
                    label: s.nom,
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
                data: { labels: labelsPeriode, datasets: datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 } }
                    },
                    scales: {
                        x: { ticks: { color: '#475569', font: { size: 10 } }, grid: { display: false } },
                        y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(15,23,42,0.05)' } }
                    }
                }
            });
        };
        Object.defineProperty(StatistiquesTransportComponent_1.prototype, "termineesAujourdhui", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'TERMINEE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StatistiquesTransportComponent_1.prototype, "revenuTotalCourses", {
            get: function () {
                return this.courses.filter(function (c) { return c.statut === 'TERMINEE'; }).reduce(function (sum, c) { return sum + c.prix; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StatistiquesTransportComponent_1.prototype, "tauxReussite", {
            get: function () {
                var annulees = this.courses.filter(function (c) { return c.statut === 'ANNULEE'; }).length;
                var total = this.termineesAujourdhui + annulees;
                return total ? Math.round((this.termineesAujourdhui / total) * 100) : 0;
            },
            enumerable: false,
            configurable: true
        });
        StatistiquesTransportComponent_1.prototype.getWorkloadLabel = function (occupation) {
            if (occupation >= 75)
                return 'Élevée';
            if (occupation >= 50)
                return 'Modérée';
            return 'Faible';
        };
        StatistiquesTransportComponent_1.prototype.getWorkloadClass = function (occupation) {
            if (occupation >= 75)
                return 'workload-high';
            if (occupation >= 50)
                return 'workload-medium';
            return 'workload-low';
        };
        StatistiquesTransportComponent_1.prototype.colorClass = function (couleur) {
            return 'kpi-' + couleur;
        };
        return StatistiquesTransportComponent_1;
    }());
    __setFunctionName(_classThis, "StatistiquesTransportComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chartCanvas_decorators = [ViewChild('chartCanvas')];
        __esDecorate(null, null, _chartCanvas_decorators, { kind: "field", name: "chartCanvas", static: false, private: false, access: { has: function (obj) { return "chartCanvas" in obj; }, get: function (obj) { return obj.chartCanvas; }, set: function (obj, value) { obj.chartCanvas = value; } }, metadata: _metadata }, _chartCanvas_initializers, _chartCanvas_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StatistiquesTransportComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StatistiquesTransportComponent = _classThis;
}();
export { StatistiquesTransportComponent };
//# sourceMappingURL=statistiques-transport.component.js.map