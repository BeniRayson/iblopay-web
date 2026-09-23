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
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register.apply(Chart, registerables);
var ReportDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-report-detail',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './report-detail.component.html',
            styleUrls: ['./report-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _trendCanvasRef_decorators;
    var _trendCanvasRef_initializers = [];
    var _trendCanvasRef_extraInitializers = [];
    var _breakdownCanvasRef_decorators;
    var _breakdownCanvasRef_initializers = [];
    var _breakdownCanvasRef_extraInitializers = [];
    var ReportDetailComponent = _classThis = /** @class */ (function () {
        function ReportDetailComponent_1(dummy, route, router) {
            this.dummy = dummy;
            this.route = route;
            this.router = router;
            this.trendCanvasRef = __runInitializers(this, _trendCanvasRef_initializers, void 0);
            this.breakdownCanvasRef = (__runInitializers(this, _trendCanvasRef_extraInitializers), __runInitializers(this, _breakdownCanvasRef_initializers, void 0));
            this.Math = (__runInitializers(this, _breakdownCanvasRef_extraInitializers), Math);
            this.reportDef = null;
            this.reportType = 'financial';
            this.dateFrom = '';
            this.dateTo = '';
            this.selectedAgent = '';
            this.selectedType = '';
            this.selectedStatus = '';
            this.agentOptions = [];
            this.typeOptions = [];
            this.statusOptions = [];
            this.kpis = [];
            this.chartTrend = [];
            this.chartBreakdown = [];
            this.trendChart = null;
            this.breakdownChart = null;
            this.tableColumns = [];
            this.allRows = [];
            this.filteredRows = [];
            this.sortColumn = '';
            this.sortDir = 'desc';
            this.currentPage = 1;
            this.pageSize = 10;
            this.totalPages = 1;
            this.hoveredRowIndex = null;
            this.exporting = false;
        }
        ReportDetailComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.route.paramMap.subscribe(function (params) {
                var type = params.get('type');
                if (type) {
                    _this.reportType = type;
                    _this.loadReport();
                }
            });
        };
        ReportDetailComponent_1.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.drawCharts(); }, 200);
        };
        ReportDetailComponent_1.prototype.loadReport = function () {
            var _this = this;
            this.currentPage = 1;
            this.sortColumn = '';
            this.sortDir = 'desc';
            this.reportDef = this.dummy.reports.find(function (r) { return r.route === _this.reportType; }) || null;
            this.agentOptions = this.dummy.getAgentOptions();
            switch (this.reportType) {
                case 'financial':
                    this.loadFinancial();
                    break;
                case 'commissions':
                    this.loadCommissions();
                    break;
                case 'trust-account':
                    this.loadTrustAccount();
                    break;
                case 'cash-management':
                    this.loadCashManagement();
                    break;
                case 'offline-pos':
                    this.loadOffline();
                    break;
                case 'compliance':
                    this.loadCompliance();
                    break;
                case 'kyc-users':
                    this.loadKyc();
                    break;
            }
            setTimeout(function () { return _this.drawCharts(); }, 200);
        };
        ReportDetailComponent_1.prototype.loadFinancial = function () {
            this.kpis = this.dummy.getFinancialKpis();
            this.chartTrend = this.dummy.getFinancialChartTrend();
            this.chartBreakdown = this.dummy.getFinancialByType();
            this.typeOptions = ['TOUS', 'DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT_NFC', 'SWEEP', 'COMMISSION', 'REIMBURSEMENT'];
            this.statusOptions = ['TOUS', 'COMPLETED', 'PENDING', 'FAILED', 'REVERSED'];
            this.tableColumns = [
                { key: 'reference', label: 'Référence', sortable: true },
                { key: 'date', label: 'Date', sortable: true, format: 'date' },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'fromWallet', label: 'Wallet Source', sortable: true },
                { key: 'toWallet', label: 'Wallet Dest.', sortable: true },
                { key: 'amount', label: 'Montant', sortable: true, format: 'currency' },
                { key: 'fee', label: 'Frais', sortable: true, format: 'currency' },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
                { key: 'paymentMode', label: 'Mode', sortable: true },
            ];
            this.allRows = this.dummy.getFinancialTransactions();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadCommissions = function () {
            this.kpis = this.dummy.getCommissionKpis();
            this.chartTrend = this.dummy.getCommissionChart();
            this.chartBreakdown = this.dummy.getCommissionByAgent();
            this.typeOptions = ['TOUS', 'AGENT_COMMISSION', 'SUPER_AGENT_COMMISSION'];
            this.statusOptions = ['TOUS', 'CREDITED', 'PENDING', 'FAILED'];
            this.tableColumns = [
                { key: 'agentName', label: 'Agent', sortable: true },
                { key: 'agentId', label: 'ID Agent', sortable: true },
                { key: 'transactionRef', label: 'Transaction', sortable: true },
                { key: 'date', label: 'Date', sortable: true, format: 'date' },
                { key: 'amount', label: 'Commission', sortable: true, format: 'currency' },
                { key: 'rate', label: 'Taux', sortable: true, format: 'percent' },
                { key: 'commissionType', label: 'Type', sortable: true },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
            ];
            this.allRows = this.dummy.getCommissionRows();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadTrustAccount = function () {
            this.kpis = this.dummy.getTrustAccountKpis();
            this.chartTrend = this.dummy.getReconciliationChart();
            this.typeOptions = [];
            this.statusOptions = ['TOUS', 'OK', 'DISCREPANCY'];
            this.tableColumns = [
                { key: 'date', label: 'Date', sortable: true, format: 'date' },
                { key: 'totalEmoney', label: 'e-Money', sortable: true, format: 'currency' },
                { key: 'trustAccountBalance', label: 'Solde Bancaire', sortable: true, format: 'currency' },
                { key: 'difference', label: 'Écart', sortable: true, format: 'currency' },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
            ];
            this.allRows = this.dummy.getReconciliationRows();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadCashManagement = function () {
            this.kpis = this.dummy.getCashManagementKpis();
            this.chartTrend = this.dummy.getCashManagementChart();
            this.typeOptions = [];
            this.statusOptions = ['TOUS', 'VALIDATED', 'PENDING', 'REJECTED', 'ESCALATED'];
            this.tableColumns = [
                { key: 'agentName', label: 'Agent', sortable: true },
                { key: 'agentId', label: 'ID Agent', sortable: true },
                { key: 'date', label: 'Date', sortable: true, format: 'date' },
                { key: 'declaredAmount', label: 'Déclaré', sortable: true, format: 'currency' },
                { key: 'expectedAmount', label: 'Attendu', sortable: true, format: 'currency' },
                { key: 'difference', label: 'Écart', sortable: true, format: 'currency' },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
            ];
            this.allRows = this.dummy.getCashManagementRows();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadOffline = function () {
            this.kpis = this.dummy.getOfflineKpis();
            this.chartTrend = this.dummy.getOfflineChart();
            this.chartBreakdown = this.dummy.getOfflineByStatus();
            this.typeOptions = [];
            this.statusOptions = ['TOUS', 'COMPLETED', 'PROCESSING', 'FAILED', 'RECEIVED'];
            this.tableColumns = [
                { key: 'batchId', label: 'Lot', sortable: true },
                { key: 'posTerminalId', label: 'Terminal POS', sortable: true },
                { key: 'receivedAt', label: 'Reçu le', sortable: true, format: 'date' },
                { key: 'transactionCount', label: 'Nb Transactions', sortable: true },
                { key: 'totalAmount', label: 'Montant Total', sortable: true, format: 'currency' },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
            ];
            this.allRows = this.dummy.getOfflineRows();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadCompliance = function () {
            this.kpis = this.dummy.getComplianceKpis();
            this.chartTrend = this.dummy.getComplianceChart();
            this.chartBreakdown = this.dummy.getComplianceByAction();
            this.typeOptions = [];
            this.statusOptions = ['TOUS', 'LOGIN_FAILED', 'CARD_BLOCK', 'WALLET_UPDATE', 'EMISSION_CREATE', 'PIN_CHANGE', 'ROLE_CHANGE'];
            this.tableColumns = [
                { key: 'user', label: 'Utilisateur', sortable: true },
                { key: 'actionType', label: 'Action', sortable: true },
                { key: 'targetId', label: 'Cible', sortable: true },
                { key: 'details', label: 'Détails', sortable: true },
                { key: 'ipAddress', label: 'IP', sortable: true },
                { key: 'createdAt', label: 'Date', sortable: true, format: 'date' },
            ];
            this.allRows = this.dummy.getComplianceRows();
            this.applyFilters();
        };
        ReportDetailComponent_1.prototype.loadKyc = function () {
            this.kpis = this.dummy.getKycKpis();
            this.chartTrend = this.dummy.getKycChart();
            this.chartBreakdown = this.dummy.getKycByRole();
            this.typeOptions = ['TOUS', 'Client', 'Agent', 'Super Agent', 'Admin'];
            this.statusOptions = ['TOUS', 'ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
            this.tableColumns = [
                { key: 'userId', label: 'ID', sortable: true },
                { key: 'name', label: 'Nom', sortable: true },
                { key: 'phone', label: 'Téléphone', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'status', label: 'Statut', sortable: true, format: 'status' },
                { key: 'role', label: 'Rôle', sortable: true },
                { key: 'registeredAt', label: 'Inscription', sortable: true, format: 'date' },
            ];
            this.allRows = this.dummy.getKycRows();
            this.applyFilters();
        };
        // ─── CHARTS ──────────────────────────────────────────
        ReportDetailComponent_1.prototype.drawCharts = function () {
            this.destroyCharts();
            this.drawTrendChart();
            this.drawBreakdownChart();
        };
        ReportDetailComponent_1.prototype.destroyCharts = function () {
            if (this.trendChart) {
                this.trendChart.destroy();
                this.trendChart = null;
            }
            if (this.breakdownChart) {
                this.breakdownChart.destroy();
                this.breakdownChart = null;
            }
        };
        ReportDetailComponent_1.prototype.drawTrendChart = function () {
            var _this = this;
            var _a;
            if (!this.trendCanvasRef)
                return;
            var canvas = this.trendCanvasRef.nativeElement;
            var ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            var hasSecondary = this.chartTrend.length > 0 && ((_a = this.chartTrend[0]) === null || _a === void 0 ? void 0 : _a.secondary) !== undefined;
            this.trendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.chartTrend.map(function (d) { return d.label; }),
                    datasets: __spreadArray([
                        {
                            label: 'Principal',
                            data: this.chartTrend.map(function (d) { return d.value; }),
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.35,
                            pointRadius: 3,
                            pointBackgroundColor: '#3b82f6',
                        }
                    ], (hasSecondary ? [{
                            label: 'Période préc.',
                            data: this.chartTrend.map(function (d) { return d.secondary; }),
                            borderColor: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.08)',
                            fill: true,
                            tension: 0.35,
                            pointRadius: 3,
                            pointBackgroundColor: '#22c55e',
                            borderDash: [5, 3],
                        }] : []), true),
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#1b2559',
                            titleColor: '#ffffff',
                            bodyColor: '#a3b1cc',
                            borderColor: 'rgba(255,255,255,0.08)',
                            borderWidth: 1,
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#64748b', font: { size: 10 } },
                            grid: { color: 'rgba(255,255,255,0.04)' },
                        },
                        y: {
                            ticks: {
                                color: '#64748b',
                                font: { size: 10 },
                                callback: function (v) { return _this.formatTrendValue(v); },
                            },
                            grid: { color: 'rgba(255,255,255,0.04)' },
                        },
                    },
                },
            });
        };
        ReportDetailComponent_1.prototype.drawBreakdownChart = function () {
            if (!this.breakdownCanvasRef || this.chartBreakdown.length === 0)
                return;
            var canvas = this.breakdownCanvasRef.nativeElement;
            var ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            var colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#a855f7', '#f97316', '#06b6d4', '#ec4899'];
            this.breakdownChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.chartBreakdown.map(function (d) { return d.label; }),
                    datasets: [{
                            data: this.chartBreakdown.map(function (d) { return d.value; }),
                            backgroundColor: this.chartBreakdown.map(function (_, i) { return colors[i % colors.length]; }),
                            borderWidth: 0,
                        }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#a3b1cc',
                                font: { size: 10 },
                                padding: 12,
                                usePointStyle: true,
                                pointStyle: 'circle',
                            },
                        },
                        tooltip: {
                            backgroundColor: '#1b2559',
                            titleColor: '#ffffff',
                            bodyColor: '#a3b1cc',
                        },
                    },
                },
            });
        };
        // ─── FILTERS ─────────────────────────────────────────
        ReportDetailComponent_1.prototype.applyFilters = function () {
            var _this = this;
            this.currentPage = 1;
            var rows = __spreadArray([], this.allRows, true);
            if (this.dateFrom) {
                var from_1 = new Date(this.dateFrom);
                rows = rows.filter(function (r) { return new Date(r.date || r.createdAt || r.registeredAt || r.receivedAt) >= from_1; });
            }
            if (this.dateTo) {
                var to_1 = new Date(this.dateTo);
                to_1.setHours(23, 59, 59);
                rows = rows.filter(function (r) { return new Date(r.date || r.createdAt || r.registeredAt || r.receivedAt) <= to_1; });
            }
            if (this.selectedAgent && rows.length > 0 && 'agentId' in rows[0]) {
                rows = rows.filter(function (r) { return r.agentId === _this.selectedAgent; });
            }
            if (this.selectedType && this.selectedType !== 'TOUS') {
                var key_1 = this.reportType === 'kyc-users' ? 'role' : this.reportType === 'commissions' ? 'commissionType' : 'type';
                rows = rows.filter(function (r) { return r[key_1] === _this.selectedType; });
            }
            if (this.selectedStatus && this.selectedStatus !== 'TOUS') {
                rows = rows.filter(function (r) { return r.status === _this.selectedStatus; });
            }
            this.filteredRows = rows;
            this.totalPages = Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize));
            this.sortData();
        };
        ReportDetailComponent_1.prototype.resetFilters = function () {
            this.dateFrom = '';
            this.dateTo = '';
            this.selectedAgent = '';
            this.selectedType = '';
            this.selectedStatus = '';
            this.applyFilters();
        };
        // ─── SORT ────────────────────────────────────────────
        ReportDetailComponent_1.prototype.setSort = function (col) {
            if (this.sortColumn === col) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            }
            else {
                this.sortColumn = col;
                this.sortDir = 'desc';
            }
            this.sortData();
        };
        ReportDetailComponent_1.prototype.sortData = function () {
            var _this = this;
            if (!this.sortColumn)
                return;
            this.filteredRows.sort(function (a, b) {
                var va = a[_this.sortColumn];
                var vb = b[_this.sortColumn];
                if (va instanceof Date)
                    va = va.getTime();
                if (vb instanceof Date)
                    vb = vb.getTime();
                if (typeof va === 'string')
                    va = va.toLowerCase();
                if (typeof vb === 'string')
                    vb = vb.toLowerCase();
                var cmp = va < vb ? -1 : va > vb ? 1 : 0;
                return _this.sortDir === 'asc' ? cmp : -cmp;
            });
        };
        ReportDetailComponent_1.prototype.getSortIcon = function (col) {
            if (this.sortColumn !== col)
                return 'fa-solid fa-sort';
            return this.sortDir === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
        };
        Object.defineProperty(ReportDetailComponent_1.prototype, "pagedRows", {
            // ─── PAGINATION ──────────────────────────────────────
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.filteredRows.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        ReportDetailComponent_1.prototype.prevPage = function () { if (this.currentPage > 1)
            this.currentPage--; };
        ReportDetailComponent_1.prototype.nextPage = function () { if (this.currentPage < this.totalPages)
            this.currentPage++; };
        ReportDetailComponent_1.prototype.getPageNumbers = function () {
            var pages = [];
            var start = Math.max(1, this.currentPage - 2);
            var end = Math.min(this.totalPages, this.currentPage + 2);
            for (var i = start; i <= end; i++)
                pages.push(i);
            return pages;
        };
        // ─── EXPORT ──────────────────────────────────────────
        ReportDetailComponent_1.prototype.exportCSV = function () {
            var _this = this;
            this.exporting = true;
            setTimeout(function () {
                var headers = _this.tableColumns.map(function (c) { return c.label; }).join(',');
                var data = _this.filteredRows.map(function (r) {
                    return _this.tableColumns.map(function (c) {
                        var v = r[c.key];
                        if (v instanceof Date)
                            v = v.toLocaleDateString('fr-FR');
                        if (typeof v === 'number')
                            v = v.toLocaleString('fr-FR');
                        return "\"".concat(v, "\"");
                    }).join(',');
                }).join('\n');
                var csv = '\uFEFF' + headers + '\n' + data;
                var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "".concat(_this.reportType, "_").concat(new Date().toISOString().slice(0, 10), ".csv");
                a.click();
                URL.revokeObjectURL(url);
                _this.exporting = false;
            }, 500);
        };
        ReportDetailComponent_1.prototype.exportPDF = function () {
            var _this = this;
            this.exporting = true;
            setTimeout(function () { window.print(); _this.exporting = false; }, 300);
        };
        // ─── FORMATTERS ──────────────────────────────────────
        ReportDetailComponent_1.prototype.formatCurrency = function (v) {
            return v.toLocaleString('fr-FR') + ' BIF';
        };
        ReportDetailComponent_1.prototype.formatDate = function (v) {
            return new Date(v).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
        };
        ReportDetailComponent_1.prototype.getStatusClass = function (status) {
            var map = {
                'COMPLETED': 'status-success', 'CREDITED': 'status-success', 'VALIDATED': 'status-success',
                'OK': 'status-success', 'ACTIVE': 'status-success',
                'PENDING': 'status-warning', 'PROCESSING': 'status-warning',
                'FAILED': 'status-danger', 'REJECTED': 'status-danger', 'DISCREPANCY': 'status-danger',
                'ESCALATED': 'status-danger', 'SUSPENDED': 'status-danger', 'FROZEN': 'status-danger',
                'CLOSED': 'status-muted', 'REVERSED': 'status-muted',
            };
            return map[status] || 'status-default';
        };
        ReportDetailComponent_1.prototype.formatTrendValue = function (v) {
            if (v >= 1000000)
                return (v / 1000000).toFixed(1) + 'M';
            if (v >= 1000)
                return (v / 1000).toFixed(1) + 'K';
            return v.toString();
        };
        ReportDetailComponent_1.prototype.goBack = function () {
            this.router.navigate(['/reports']);
        };
        return ReportDetailComponent_1;
    }());
    __setFunctionName(_classThis, "ReportDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _trendCanvasRef_decorators = [ViewChild('trendCanvas')];
        _breakdownCanvasRef_decorators = [ViewChild('breakdownCanvas')];
        __esDecorate(null, null, _trendCanvasRef_decorators, { kind: "field", name: "trendCanvasRef", static: false, private: false, access: { has: function (obj) { return "trendCanvasRef" in obj; }, get: function (obj) { return obj.trendCanvasRef; }, set: function (obj, value) { obj.trendCanvasRef = value; } }, metadata: _metadata }, _trendCanvasRef_initializers, _trendCanvasRef_extraInitializers);
        __esDecorate(null, null, _breakdownCanvasRef_decorators, { kind: "field", name: "breakdownCanvasRef", static: false, private: false, access: { has: function (obj) { return "breakdownCanvasRef" in obj; }, get: function (obj) { return obj.breakdownCanvasRef; }, set: function (obj, value) { obj.breakdownCanvasRef = value; } }, metadata: _metadata }, _breakdownCanvasRef_initializers, _breakdownCanvasRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportDetailComponent = _classThis;
}();
export { ReportDetailComponent };
//# sourceMappingURL=report-detail.component.js.map