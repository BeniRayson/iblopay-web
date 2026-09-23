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
import { Component, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register.apply(Chart, registerables);
var ChartWidgetComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-chart-widget',
            templateUrl: './chart-widget.component.html',
            styleUrls: ['./chart-widget.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _chartCanvas_decorators;
    var _chartCanvas_initializers = [];
    var _chartCanvas_extraInitializers = [];
    var _period_decorators;
    var _period_initializers = [];
    var _period_extraInitializers = [];
    var ChartWidgetComponent = _classThis = /** @class */ (function () {
        function ChartWidgetComponent_1() {
            this.chartCanvas = __runInitializers(this, _chartCanvas_initializers, void 0);
            this.period = (__runInitializers(this, _chartCanvas_extraInitializers), __runInitializers(this, _period_initializers, 30));
            this.chartInstance = (__runInitializers(this, _period_extraInitializers), null);
        }
        ChartWidgetComponent_1.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.initChart();
            }, 300);
        };
        ChartWidgetComponent_1.prototype.ngOnChanges = function (changes) {
            if (changes['period'] && !changes['period'].firstChange) {
                this.updateChart();
            }
        };
        ChartWidgetComponent_1.prototype.initChart = function () {
            if (!this.chartCanvas)
                return;
            var ctx = this.chartCanvas.nativeElement.getContext('2d');
            if (!ctx)
                return;
            var data = this.generateChartData(this.period);
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Dépôts (M Fbu)',
                            data: data.depots,
                            borderColor: '#3b82f6',
                            backgroundColor: this.createGradient(ctx, '#3b82f6'),
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 3,
                            pointBackgroundColor: '#3b82f6',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 7,
                            pointHoverBackgroundColor: '#3b82f6',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
                        },
                        {
                            label: 'Retraits (M Fbu)',
                            data: data.retraits,
                            borderColor: '#ef4444',
                            backgroundColor: this.createGradient(ctx, '#ef4444'),
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 3,
                            pointBackgroundColor: '#ef4444',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 7,
                            pointHoverBackgroundColor: '#ef4444',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
                        },
                        {
                            label: 'Services Publics (M Fbu)',
                            data: data.services,
                            borderColor: '#ec4899',
                            backgroundColor: this.createGradient(ctx, '#ec4899'),
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 3,
                            pointBackgroundColor: '#ec4899',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 7,
                            pointHoverBackgroundColor: '#ec4899',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2,
                            borderDash: [6, 4]
                        }
                    ]
                },
                options: this.getChartOptions()
            });
        };
        ChartWidgetComponent_1.prototype.updateChart = function () {
            if (!this.chartInstance) {
                this.initChart();
                return;
            }
            var data = this.generateChartData(this.period);
            if (this.chartInstance.data && this.chartInstance.data.datasets) {
                this.chartInstance.data.labels = data.labels;
                if (this.chartInstance.data.datasets[0]) {
                    this.chartInstance.data.datasets[0].data = data.depots;
                }
                if (this.chartInstance.data.datasets[1]) {
                    this.chartInstance.data.datasets[1].data = data.retraits;
                }
                if (this.chartInstance.data.datasets[2]) {
                    this.chartInstance.data.datasets[2].data = data.services;
                }
                this.chartInstance.update();
            }
        };
        ChartWidgetComponent_1.prototype.generateChartData = function (points) {
            var labels = [];
            var depots = [];
            var retraits = [];
            var services = [];
            var startDate = new Date(2025, 5, 29);
            for (var i = points - 1; i >= 0; i--) {
                var date = new Date(startDate);
                date.setDate(date.getDate() - i);
                if (i % Math.max(1, Math.floor(points / 12)) === 0 || i === points - 1) {
                    labels.push("".concat(String(date.getDate()).padStart(2, '0'), "/").concat(String(date.getMonth() + 1).padStart(2, '0')));
                }
                else {
                    labels.push('');
                }
                var d = 40 + 20 * Math.sin((i / points) * 2 * Math.PI * 1.5) + (Math.random() - 0.5) * 3;
                var r = 25 + 15 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 0.8) + (Math.random() - 0.5) * 2.5;
                var s = 18 + 12 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 1.6) + (Math.random() - 0.5) * 2;
                depots.push(Math.round(d * 10) / 10);
                retraits.push(Math.round(r * 10) / 10);
                services.push(Math.round(s * 10) / 10);
            }
            return { labels: labels, depots: depots, retraits: retraits, services: services };
        };
        ChartWidgetComponent_1.prototype.createGradient = function (ctx, color) {
            var gradient = ctx.createLinearGradient(0, 0, 0, 180);
            var rgb = this.hexToRgb(color);
            if (rgb) {
                gradient.addColorStop(0, "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", 0.35)"));
                gradient.addColorStop(1, "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", 0)"));
            }
            return gradient;
        };
        ChartWidgetComponent_1.prototype.hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result && result[1] && result[2] && result[3]) {
                return {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                };
            }
            return null;
        };
        ChartWidgetComponent_1.prototype.getChartOptions = function () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#8896b3',
                            font: { size: 11, weight: 500 },
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(13,26,47,.95)',
                        borderColor: '#1a2a45',
                        borderWidth: 1,
                        titleColor: '#fff',
                        bodyColor: '#8896b3',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                return "".concat(context.dataset.label, ": ").concat(context.parsed.y.toFixed(1), " M Fbu");
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#5c6986',
                            font: { size: 9, weight: 500 },
                            maxRotation: 45,
                            autoSkip: true,
                            maxTicksLimit: 15
                        }
                    },
                    y: {
                        grid: { color: 'rgba(255,255,255,.06)' },
                        ticks: {
                            color: '#5c6986',
                            font: { size: 10, weight: 500 },
                            callback: function (value) { return value + 'M'; }
                        },
                        beginAtZero: true
                    }
                },
                interaction: { intersect: false, mode: 'index' },
                hover: { mode: 'index', intersect: false }
            };
        };
        return ChartWidgetComponent_1;
    }());
    __setFunctionName(_classThis, "ChartWidgetComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chartCanvas_decorators = [ViewChild('chartCanvas')];
        _period_decorators = [Input()];
        __esDecorate(null, null, _chartCanvas_decorators, { kind: "field", name: "chartCanvas", static: false, private: false, access: { has: function (obj) { return "chartCanvas" in obj; }, get: function (obj) { return obj.chartCanvas; }, set: function (obj, value) { obj.chartCanvas = value; } }, metadata: _metadata }, _chartCanvas_initializers, _chartCanvas_extraInitializers);
        __esDecorate(null, null, _period_decorators, { kind: "field", name: "period", static: false, private: false, access: { has: function (obj) { return "period" in obj; }, get: function (obj) { return obj.period; }, set: function (obj, value) { obj.period = value; } }, metadata: _metadata }, _period_initializers, _period_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChartWidgetComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChartWidgetComponent = _classThis;
}();
export { ChartWidgetComponent };
//# sourceMappingURL=chart-widget.component.js.map