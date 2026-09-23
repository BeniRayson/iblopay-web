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
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
Chart.register.apply(Chart, registerables);
var DashboardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _chartCanvas_decorators;
    var _chartCanvas_initializers = [];
    var _chartCanvas_extraInitializers = [];
    var DashboardComponent = _classThis = /** @class */ (function () {
        function DashboardComponent_1(router) {
            this.router = router;
            this.currentDate = new Date(2026, 6, 15);
            this.currentTime = '';
            this.currentDay = '';
            this.isRefreshing = false;
            this.isDarkMode = true;
            this.chartCanvas = __runInitializers(this, _chartCanvas_initializers, void 0);
            this.chartInstance = (__runInitializers(this, _chartCanvas_extraInitializers), null);
            this.statsData = {
                users: 1248532,
                agents: 18532,
                superAgents: 1245,
                merchants: 45892,
                transactionsToday: 523690000,
                commissionEtat: 1245800000,
                commissionIblopay: 2229100000,
                servicesPublics: 128456
            };
            this.provinceData = {
                depots: [
                    { name: 'Butanyerera', amount: 42300000 },
                    { name: 'Burunga', amount: 28700000 },
                    { name: 'Buhumuza', amount: 22100000 },
                    { name: 'Gitega', amount: 19800000 },
                    { name: 'Bujumbura', amount: 122780000 }
                ],
                transactions: [
                    { name: 'Butanyerera', amount: 98400000 },
                    { name: 'Burunga', amount: 67200000 },
                    { name: 'Buhumuza', amount: 52800000 },
                    { name: 'Gitega', amount: 45600000 },
                    { name: 'Bujumbura', amount: 259690000 }
                ],
                commissions: [
                    { name: 'Butanyerera', amount: 945000 },
                    { name: 'Burunga', amount: 820000 },
                    { name: 'Buhumuza', amount: 680000 },
                    { name: 'Gitega', amount: 590000 },
                    { name: 'Bujumbura', amount: 439900 }
                ]
            };
            this.provinceTotals = {
                depots: 235680000,
                transactions: 523690000,
                commissions: 3474900
            };
            this.servicesStats = {
                total: 128456,
                traitees: 112345,
                enCours: 12453,
                rejetees: 3658
            };
            this.services = [
                { name: 'Permis de construire', total: 28456, traitees: 24987, enCours: 2675, rejetees: 794 },
                { name: 'Certificat de résidence', total: 24125, traitees: 21652, enCours: 1842, rejetees: 631 },
                { name: 'Extrait de naissance', total: 18984, traitees: 16852, enCours: 1556, rejetees: 576 },
                { name: 'Certificat de célibat', total: 15236, traitees: 13497, enCours: 1210, rejetees: 529 },
                { name: "Autorisation d'exploiter", total: 11655, traitees: 9357, enCours: 1170, rejetees: 1128 }
            ];
            this.recentRegistrations = [
                { name: 'Marie Nduwimana', type: 'Nouveau client' },
                { name: 'Samuel Niyonkuru', type: 'Nouvel agent' },
                { name: 'Smart Shop', type: 'Nouveau marchand' },
                { name: 'Innocent Manirakiza', type: 'Nouveau super agent' },
                { name: 'Permis de construire', type: 'Nouveau service public' }
            ];
            this.pendingRequests = [
                { label: 'Ouverture de compte marchand', value: 12 },
                { label: "Demande d'augmentation de plafond", value: 8 },
                { label: 'Validation de documents KYC', value: 23 },
                { label: "Demande d'habilitation agent", value: 5 },
                { label: 'Création de service public', value: 7 }
            ];
            this.agentActivities = [
                { label: 'Transactions effectuées', value: '412 589' },
                { label: 'Volume total', value: '98 600 000 Fbu' },
                { label: 'Nouveaux clients enregistrés', value: '32 458' },
                { label: 'Dépôts effectués', value: '45 200 000 Fbu' },
                { label: 'Retraits effectués', value: '32 100 000 Fbu' }
            ];
        }
        DashboardComponent_1.prototype.ngOnInit = function () {
            this.initClock();
            this.loadTheme();
        };
        DashboardComponent_1.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.initChart();
            }, 300);
        };
        DashboardComponent_1.prototype.ngOnDestroy = function () {
            if (this.clockSubscription) {
                this.clockSubscription.unsubscribe();
            }
            if (this.chartInstance) {
                this.chartInstance.destroy();
                this.chartInstance = null;
            }
        };
        DashboardComponent_1.prototype.initClock = function () {
            this.updateClock();
            this.clockSubscription = new Subscription();
        };
        DashboardComponent_1.prototype.updateClock = function () {
            var now = new Date();
            var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            this.currentDay = "".concat(days[this.currentDate.getDay()], " ").concat(this.currentDate.getDate(), " ").concat(months[this.currentDate.getMonth()], " ").concat(this.currentDate.getFullYear());
            this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        };
        DashboardComponent_1.prototype.generateSinusoidalData = function (points) {
            var dataDepots = [];
            var dataRetraits = [];
            var dataServices = [];
            for (var i = 0; i < points; i++) {
                var depots = 40 + 20 * Math.sin((i / points) * 2 * Math.PI * 1.5) + (Math.random() - 0.5) * 3;
                var retraits = 25 + 15 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 0.8) + (Math.random() - 0.5) * 2.5;
                var services = 18 + 12 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 1.6) + (Math.random() - 0.5) * 2;
                dataDepots.push(Math.round(depots * 10) / 10);
                dataRetraits.push(Math.round(retraits * 10) / 10);
                dataServices.push(Math.round(services * 10) / 10);
            }
            return { depots: dataDepots, retraits: dataRetraits, services: dataServices };
        };
        DashboardComponent_1.prototype.generateLabels = function (points) {
            var labels = [];
            var startDate = new Date(2025, 5, 29);
            for (var i = points - 1; i >= 0; i--) {
                var date = new Date(startDate);
                date.setDate(date.getDate() - i);
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                if (i % Math.max(1, Math.floor(points / 12)) === 0 || i === points - 1) {
                    labels.push("".concat(day, "/").concat(month));
                }
                else {
                    labels.push('');
                }
            }
            return labels;
        };
        DashboardComponent_1.prototype.initChart = function () {
            if (!this.chartCanvas)
                return;
            var ctx = this.chartCanvas.nativeElement.getContext('2d');
            if (!ctx)
                return;
            this.createChart(ctx, 30);
        };
        /**
         * Construit le graphique "Évolution des transactions" (Dépôts / Retraits / Services publics).
         * Utilisée à la fois pour l'affichage initial et pour le changement de période.
         */
        DashboardComponent_1.prototype.createChart = function (ctx, period) {
            var evolutionData = this.generateSinusoidalData(period);
            var labels = this.generateLabels(period);
            // Extraction des variables CSS dynamiques selon le mode (Clair/Sombre)
            var computedStyles = getComputedStyle(document.body);
            var textDimColor = computedStyles.getPropertyValue('--text-dim').trim() || '#a3b1cc';
            var textFaintColor = computedStyles.getPropertyValue('--text-faint').trim() || '#64748b';
            var surfaceColor = computedStyles.getPropertyValue('--surface').trim() || '#111c44';
            var gradientDepots = ctx.createLinearGradient(0, 0, 0, 200);
            gradientDepots.addColorStop(0, 'rgba(59,130,246,.35)');
            gradientDepots.addColorStop(1, 'rgba(59,130,246,0)');
            var gradientRetraits = ctx.createLinearGradient(0, 0, 0, 200);
            gradientRetraits.addColorStop(0, 'rgba(239,68,68,.3)');
            gradientRetraits.addColorStop(1, 'rgba(239,68,68,0)');
            var gradientServices = ctx.createLinearGradient(0, 0, 0, 200);
            gradientServices.addColorStop(0, 'rgba(236,72,153,.3)');
            gradientServices.addColorStop(1, 'rgba(236,72,153,0)');
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Dépôts (M Fbu)',
                            data: evolutionData.depots,
                            borderColor: '#3b82f6',
                            backgroundColor: gradientDepots,
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 2,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Retraits (M Fbu)',
                            data: evolutionData.retraits,
                            borderColor: '#ef4444',
                            backgroundColor: gradientRetraits,
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 2,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Services Publics (M Fbu)',
                            data: evolutionData.services,
                            borderColor: '#ec4899',
                            backgroundColor: gradientServices,
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 2,
                            pointHoverRadius: 6,
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 600,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: textDimColor,
                                font: { size: 11, weight: 500 },
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: surfaceColor,
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1,
                            titleColor: textDimColor,
                            bodyColor: textDimColor,
                            padding: 10,
                            cornerRadius: 8,
                            callbacks: {
                                label: function (ctx) { var _a; return "".concat(ctx.dataset.label, ": ").concat(((_a = ctx.parsed.y) !== null && _a !== void 0 ? _a : 0).toFixed(1), " M Fbu"); }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: textFaintColor,
                                font: { size: 10 }
                            }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,.05)' },
                            ticks: {
                                color: textFaintColor,
                                font: { size: 10 },
                                callback: function (v) { return v + 'M'; }
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        };
        DashboardComponent_1.prototype.updateChartPeriod = function (event) {
            var _a;
            var select = event.target;
            var period = parseInt(select.value, 10);
            if (this.chartInstance) {
                this.chartInstance.destroy();
                this.chartInstance = null;
            }
            var canvas = (_a = this.chartCanvas) === null || _a === void 0 ? void 0 : _a.nativeElement;
            if (canvas) {
                var ctx = canvas.getContext('2d');
                if (ctx) {
                    this.createChart(ctx, period);
                }
            }
        };
        DashboardComponent_1.prototype.loadTheme = function () {
            var savedTheme = localStorage.getItem('iblopay_theme');
            this.isDarkMode = savedTheme !== 'light';
        };
        DashboardComponent_1.prototype.refreshData = function () {
            var _this = this;
            this.isRefreshing = true;
            setTimeout(function () {
                _this.isRefreshing = false;
                if (_this.chartInstance) {
                    _this.chartInstance.destroy();
                    _this.chartInstance = null;
                }
                _this.initChart();
            }, 1000);
        };
        DashboardComponent_1.prototype.formatNumber = function (value) {
            if (typeof value === 'string')
                return value;
            return value.toLocaleString('fr-FR');
        };
        DashboardComponent_1.prototype.formatAmount = function (amount) {
            return amount.toLocaleString('fr-FR') + ' Fbu';
        };
        DashboardComponent_1.prototype.getChangeClass = function (change) {
            return change >= 0 ? 'positive' : 'negative';
        };
        DashboardComponent_1.prototype.getChangeSymbol = function (change) {
            return change >= 0 ? '+' : '';
        };
        return DashboardComponent_1;
    }());
    __setFunctionName(_classThis, "DashboardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chartCanvas_decorators = [ViewChild('chartCanvas')];
        __esDecorate(null, null, _chartCanvas_decorators, { kind: "field", name: "chartCanvas", static: false, private: false, access: { has: function (obj) { return "chartCanvas" in obj; }, get: function (obj) { return obj.chartCanvas; }, set: function (obj, value) { obj.chartCanvas = value; } }, metadata: _metadata }, _chartCanvas_initializers, _chartCanvas_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardComponent = _classThis;
}();
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map