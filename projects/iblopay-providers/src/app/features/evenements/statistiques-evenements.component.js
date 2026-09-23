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
var StatistiquesEvenementsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-statistiques-evenements',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './statistiques-evenements.component.html',
            styleUrl: './statistiques-evenements.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _chartCanvas_decorators;
    var _chartCanvas_initializers = [];
    var _chartCanvas_extraInitializers = [];
    var StatistiquesEvenementsComponent = _classThis = /** @class */ (function () {
        function StatistiquesEvenementsComponent_1(evenementsService, billetsService) {
            this.evenementsService = evenementsService;
            this.billetsService = billetsService;
            this.chartCanvas = __runInitializers(this, _chartCanvas_initializers, void 0);
            this.stats = (__runInitializers(this, _chartCanvas_extraInitializers), null);
            this.statsParEvenement = [];
            this.evenements = [];
            this.historique = [];
            this.billets = [];
            this.evenementSelectionneId = null;
            this.kpisEvenement = [];
            this.isLoadingKpis = false;
        }
        StatistiquesEvenementsComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.evenementsService.getStatsGlobal().subscribe(function (s) { return _this.stats = s; });
            this.billetsService.getAll().subscribe(function (b) { return _this.billets = b; });
            this.evenementsService.getHistorique().subscribe(function (h) { return _this.historique = h; });
            this.evenementsService.getStatsParEvenement().subscribe(function (s) {
                _this.statsParEvenement = s;
                setTimeout(function () { return _this.buildChart(); }, 0);
            });
            this.evenementsService.getEvenements().subscribe(function (e) {
                _this.evenements = e;
                var premier = e[0];
                if (premier)
                    _this.selectionnerEvenement(premier.id);
            });
        };
        StatistiquesEvenementsComponent_1.prototype.ngAfterViewInit = function () { };
        StatistiquesEvenementsComponent_1.prototype.selectionnerEvenement = function (id) {
            var _this = this;
            this.evenementSelectionneId = id;
            this.isLoadingKpis = true;
            var entries = this.historique.filter(function (h) { return h.evenementId === id; });
            var valides = entries.filter(function (e) { return e.statut === 'VALIDE'; });
            var revenuTotal = valides.reduce(function (sum, e) { return sum + e.revenu; }, 0);
            var billetsVendus = valides.reduce(function (sum, e) { return sum + e.quantite; }, 0);
            var tauxAnnulation = entries.length ? Math.round(((entries.length - valides.length) / entries.length) * 100) : 0;
            var evenement = this.evenements.find(function (e) { return e.id === id; });
            var tauxRemplissage = (evenement === null || evenement === void 0 ? void 0 : evenement.capaciteTotale)
                ? Math.round((evenement.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue; }, 0) / evenement.capaciteTotale) * 100)
                : 0;
            this.kpisEvenement = [
                { icon: 'fa-solid fa-ticket', label: 'Billets vendus', valeur: String(billetsVendus), couleur: 'blue' },
                { icon: 'fa-solid fa-sack-dollar', label: 'Revenu total', valeur: this.formatBIF(revenuTotal), couleur: 'green' },
                { icon: 'fa-solid fa-gauge-high', label: 'Taux de remplissage', valeur: tauxRemplissage + '%', couleur: 'purple' },
                { icon: 'fa-solid fa-triangle-exclamation', label: 'Taux d\'annulation', valeur: tauxAnnulation + '%', couleur: 'orange' }
            ];
            setTimeout(function () { _this.isLoadingKpis = false; }, 150);
        };
        StatistiquesEvenementsComponent_1.prototype.formatBIF = function (v) {
            return new Intl.NumberFormat('fr-FR').format(v) + ' BIF';
        };
        StatistiquesEvenementsComponent_1.prototype.buildChart = function () {
            var _a;
            if (!this.chartCanvas)
                return;
            (_a = this.chart) === null || _a === void 0 ? void 0 : _a.destroy();
            var colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#dc2626', '#d97706'];
            var labelsPeriode = ['Période 1', 'Période 2', 'Période 3', 'Période 4', 'Période 5', 'Période 6'];
            var datasets = this.statsParEvenement.map(function (s, index) {
                var color = colors[index % colors.length];
                var base = Math.max(5, Math.round(s.billetsVendus / 6));
                var waveData = [
                    base, base + (index % 2 === 0 ? 12 : -8), base + (index % 2 === 0 ? -5 : 15),
                    base + (index % 2 === 0 ? 18 : -10), base + (index % 2 === 0 ? -2 : 8), s.billetsVendus - (base * 5)
                ];
                return {
                    label: s.nom, data: waveData, borderColor: color, backgroundColor: color,
                    borderWidth: 2.5, tension: 0.5, fill: false, pointRadius: 3, pointHoverRadius: 6
                };
            });
            this.chart = new Chart(this.chartCanvas.nativeElement, {
                type: 'line',
                data: { labels: labelsPeriode, datasets: datasets },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10 }, boxWidth: 10, padding: 8 } } },
                    scales: {
                        x: { ticks: { color: '#475569', font: { size: 10 } }, grid: { display: false } },
                        y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(15,23,42,0.05)' } }
                    }
                }
            });
        };
        Object.defineProperty(StatistiquesEvenementsComponent_1.prototype, "billetsVendusCount", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'PAYE' || b.statut === 'UTILISE'; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StatistiquesEvenementsComponent_1.prototype, "revenuTotalBillets", {
            get: function () {
                return this.billets.filter(function (b) { return b.statut === 'PAYE' || b.statut === 'UTILISE'; }).reduce(function (sum, b) { return sum + b.prix; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        StatistiquesEvenementsComponent_1.prototype.getWorkloadLabel = function (remplissage) {
            if (remplissage >= 75)
                return 'Forte demande';
            if (remplissage >= 50)
                return 'Demande modérée';
            return 'Demande faible';
        };
        StatistiquesEvenementsComponent_1.prototype.getWorkloadClass = function (remplissage) {
            if (remplissage >= 75)
                return 'workload-high';
            if (remplissage >= 50)
                return 'workload-medium';
            return 'workload-low';
        };
        StatistiquesEvenementsComponent_1.prototype.colorClass = function (couleur) {
            return 'kpi-' + couleur;
        };
        return StatistiquesEvenementsComponent_1;
    }());
    __setFunctionName(_classThis, "StatistiquesEvenementsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chartCanvas_decorators = [ViewChild('chartCanvas')];
        __esDecorate(null, null, _chartCanvas_decorators, { kind: "field", name: "chartCanvas", static: false, private: false, access: { has: function (obj) { return "chartCanvas" in obj; }, get: function (obj) { return obj.chartCanvas; }, set: function (obj, value) { obj.chartCanvas = value; } }, metadata: _metadata }, _chartCanvas_initializers, _chartCanvas_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StatistiquesEvenementsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StatistiquesEvenementsComponent = _classThis;
}();
export { StatistiquesEvenementsComponent };
//# sourceMappingURL=statistiques-evenements.component.js.map