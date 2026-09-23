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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
var ReportsSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-reports-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './reports-settings.component.html',
            styleUrls: ['./reports-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReportsSettingsComponent = _classThis = /** @class */ (function () {
        // ========== CONSTRUCTEUR ==========
        function ReportsSettingsComponent_1() {
            this.title = 'Rapports & Business Intelligence';
            this.icon = '📈';
            this.description = 'Dashboard, rapports périodiques, exports et graphiques.';
            // ========== DONNÉES ==========
            this.sections = [
                {
                    key: 'dashboard',
                    title: 'Tableau de bord',
                    icon: '📊',
                    description: 'Vue d\'ensemble des indicateurs clés de performance',
                    open: true,
                    actions: [
                        { label: 'Chiffre d\'affaires', actionId: 'chiffre_affaires', icon: '💰' },
                        { label: 'Transactions', actionId: 'transactions', icon: '📋' },
                        { label: 'Revenus', actionId: 'revenus', icon: '💵' },
                        { label: 'Commissions', actionId: 'commissions', icon: '🏦' },
                        { label: 'Nouveaux clients', actionId: 'nouveaux_clients', icon: '👤' },
                        { label: 'Croissance', actionId: 'croissance', icon: '📈' }
                    ]
                },
                {
                    key: 'rapports',
                    title: 'Rapports par période',
                    icon: '📄',
                    description: 'Génération et consultation des rapports périodiques',
                    open: false,
                    actions: [
                        { label: 'Rapport quotidien', actionId: 'quotidien', icon: '📅' },
                        { label: 'Rapport hebdomadaire', actionId: 'hebdomadaire', icon: '📊' },
                        { label: 'Rapport mensuel', actionId: 'mensuel', icon: '📈' },
                        { label: 'Rapport annuel', actionId: 'annuel', icon: '📉' }
                    ]
                },
                {
                    key: 'exports',
                    title: 'Exports & Partage',
                    icon: '⬇️',
                    description: 'Exportez les rapports dans différents formats',
                    open: false,
                    actions: [
                        { label: 'Exporter en PDF', actionId: 'pdf', icon: '📄' },
                        { label: 'Exporter en Excel', actionId: 'excel', icon: '📊' },
                        { label: 'Exporter en CSV', actionId: 'csv', icon: '📋' },
                        { label: 'Envoyer par email', actionId: 'email', icon: '📧' },
                        { label: 'Imprimer', actionId: 'imprimer', icon: '🖨️' }
                    ]
                },
                {
                    key: 'analyses',
                    title: 'Analyses avancées',
                    icon: '🔍',
                    description: 'Analyses approfondies et Business Intelligence',
                    open: false,
                    actions: [
                        { label: 'Prévisions', actionId: 'previsions', icon: '🔮' },
                        { label: 'Tendances', actionId: 'tendances', icon: '📈' },
                        { label: 'Segmentation clients', actionId: 'segmentation', icon: '👥' },
                        { label: 'Performances', actionId: 'performances', icon: '⭐' }
                    ]
                },
                {
                    key: 'graphiques',
                    title: 'Graphiques & visualisations',
                    icon: '📈',
                    description: 'Visualisations interactives des données',
                    open: false,
                    actions: [
                        { label: 'Revenus par catégorie', actionId: 'revenus_categorie', icon: '📊' },
                        { label: 'Évolution des revenus', actionId: 'evolution_revenus', icon: '📉' },
                        { label: 'Répartition des services', actionId: 'repartition_services', icon: '🥧' },
                        { label: 'Performance des agents', actionId: 'performance_agents', icon: '📊' },
                        { label: 'Transactions par mois', actionId: 'transactions_mois', icon: '📈' }
                    ]
                },
                {
                    key: 'alertes',
                    title: 'Alertes & Notifications',
                    icon: '🔔',
                    description: 'Configurer les alertes et seuils de notification',
                    open: false,
                    actions: [
                        { label: 'Seuils de revenus', actionId: 'seuils_revenus', icon: '💰' },
                        { label: 'Anomalies de transactions', actionId: 'anomalies', icon: '⚠️', danger: true },
                        { label: 'Rapports programmés', actionId: 'rapports_programmes', icon: '⏰' },
                        { label: 'Notifications en temps réel', actionId: 'notifications', icon: '📱' }
                    ]
                }
            ];
            // ========== KPIs ==========
            this.kpiData = [
                { icon: '💰', label: 'Chiffre d\'affaires', value: '2 450 000 BIF', change: 12.5, trend: 'up', color: '#1a237e' },
                { icon: '📋', label: 'Transactions', value: '1 283', change: 8.3, trend: 'up', color: '#2e7d32' },
                { icon: '💵', label: 'Revenus', value: '1 820 000 BIF', change: -2.1, trend: 'down', color: '#e65100' },
                { icon: '🏦', label: 'Commissions', value: '245 000 BIF', change: 15.7, trend: 'up', color: '#4a148c' },
                { icon: '👤', label: 'Clients actifs', value: '342', change: 5.2, trend: 'up', color: '#0d47a1' },
                { icon: '📈', label: 'Croissance', value: '+18.4%', change: 3.8, trend: 'up', color: '#bf360c' }
            ];
            // ========== DONNÉES DE TEST ==========
            this.recentTransactions = [
                { id: 'TRX-001', date: '2025-01-15', service: 'ARCT - Autorisation réseaux', category: 'Communications', amount: 25000, status: 'valide', paymentMethod: 'Mobile Money', clientName: 'Jean Bosco NIZIGIYIMANA' },
                { id: 'TRX-002', date: '2025-01-15', service: 'OBM - Or', category: 'Mines', amount: 75000, status: 'valide', paymentMethod: 'Banque', clientName: 'Marie Claire NDIKUMANA' },
                { id: 'TRX-003', date: '2025-01-14', service: 'Education - Attestation équivalence', category: 'Éducation', amount: 15000, status: 'transfert', paymentMethod: 'Wallet', clientName: 'Pierre HAKIZIMANA' },
                { id: 'TRX-004', date: '2025-01-14', service: 'Licences - Débit de boissons', category: 'Licences', amount: 50000, status: 'collecte', paymentMethod: 'Cash', clientName: 'Françoise NIBITANGA' },
                { id: 'TRX-005', date: '2025-01-13', service: 'Transport - Permis de conduire', category: 'Transport', amount: 35000, status: 'valide', paymentMethod: 'Mobile Money', clientName: 'Emmanuel NTAKIRUTIMANA' }
            ];
            // ========== GRAPHIQUES ==========
            this.chartConfigs = [
                {
                    id: '1',
                    name: 'Revenus par catégorie',
                    type: 'bar',
                    description: 'Répartition des revenus par catégorie de service',
                    icon: '📊',
                    data: {
                        labels: ['Communications', 'Mines', 'Environnement', 'Éducation', 'Licences', 'Transport', 'Autres'],
                        datasets: [{
                                label: 'Revenus par catégorie',
                                data: [820000, 450000, 280000, 180000, 150000, 120000, 90000],
                                backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C', '#E65100', '#B8791C']
                            }]
                    }
                },
                {
                    id: '2',
                    name: 'Évolution des revenus',
                    type: 'line',
                    description: 'Évolution des revenus sur les 12 derniers mois',
                    icon: '📉',
                    data: {
                        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                        datasets: [{
                                label: 'Revenus 2025',
                                data: [120000, 135000, 98000, 165000, 142000, 189000, 210000, 178000, 220000, 195000, 245000, 280000],
                                backgroundColor: ['#0F6E5B'],
                                borderColor: '#0F6E5B'
                            }]
                    }
                },
                {
                    id: '3',
                    name: 'Répartition des services',
                    type: 'pie',
                    description: 'Répartition des revenus par service',
                    icon: '🥧',
                    data: {
                        labels: ['ARCT', 'OBM', 'OBPE', 'Éducation', 'Licences', 'Transport', 'Autres'],
                        datasets: [{
                                label: 'Répartition',
                                data: [35, 20, 15, 10, 8, 7, 5],
                                backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C', '#E65100', '#B8791C']
                            }]
                    }
                },
                {
                    id: '4',
                    name: 'Performance des agents',
                    type: 'bar',
                    description: 'Performance des agents par volume de transactions',
                    icon: '📊',
                    data: {
                        labels: ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'],
                        datasets: [{
                                label: 'Transactions',
                                data: [145, 120, 98, 85, 67],
                                backgroundColor: ['#0F6E5B', '#1A7A4A', '#0D47A1', '#4A148C', '#BF360C']
                            }]
                    }
                },
                {
                    id: '5',
                    name: 'Transactions par mois',
                    type: 'line',
                    description: 'Nombre de transactions par mois',
                    icon: '📈',
                    data: {
                        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                        datasets: [{
                                label: 'Transactions',
                                data: [85, 92, 78, 110, 95, 120, 135, 115, 140, 125, 155, 170],
                                backgroundColor: ['#1A56DB'],
                                borderColor: '#1A56DB'
                            }]
                    }
                }
            ];
            // ========== ALERTES ==========
            this.alertConfigs = [
                {
                    id: '1',
                    name: 'Seuil de revenus minimum',
                    type: 'seuil',
                    active: true,
                    threshold: 50000,
                    lastTriggered: '2025-01-10',
                    description: 'Alerte lorsque les revenus journaliers sont inférieurs à 50 000 BIF'
                },
                {
                    id: '2',
                    name: 'Anomalies de transactions',
                    type: 'anomalie',
                    active: true,
                    lastTriggered: '2025-01-12',
                    description: 'Détection des transactions suspectes ou anormales'
                },
                {
                    id: '3',
                    name: 'Rapport mensuel automatique',
                    type: 'programme',
                    active: true,
                    frequency: 'mensuel',
                    recipients: ['admin@iblopay.bi', 'finance@iblopay.bi'],
                    description: 'Envoi automatique du rapport mensuel aux destinataires'
                },
                {
                    id: '4',
                    name: 'Notification de paiement',
                    type: 'notification',
                    active: true,
                    description: 'Notification en temps réel lors des paiements importants'
                },
                {
                    id: '5',
                    name: 'Seuil de transactions par jour',
                    type: 'seuil',
                    active: false,
                    threshold: 200,
                    lastTriggered: '2025-01-08',
                    description: 'Alerte lorsque le nombre de transactions dépasse 200 par jour'
                },
                {
                    id: '6',
                    name: 'Anomalie de montant',
                    type: 'anomalie',
                    active: true,
                    lastTriggered: '2025-01-14',
                    description: 'Détection des montants anormalement élevés ou bas'
                },
                {
                    id: '7',
                    name: 'Rapport hebdomadaire',
                    type: 'programme',
                    active: true,
                    frequency: 'hebdomadaire',
                    recipients: ['direction@iblopay.bi'],
                    description: 'Résumé hebdomadaire des activités'
                },
                {
                    id: '8',
                    name: 'Alerte de dépassement de plafond',
                    type: 'notification',
                    active: false,
                    description: 'Notification lorsque les plafonds de services sont atteints'
                }
            ];
            // ========== RAPPORTS GÉNÉRÉS ==========
            this.generatedReports = [];
            // ========== FILTRES ==========
            this.filters = {
                period: 'monthly',
                dateStart: '',
                dateEnd: '',
                category: 'all',
                service: 'all',
                status: 'all'
            };
            // ========== ÉTAT ==========
            this.showModal = false;
            this.modalTitle = '';
            this.modalType = '';
            this.modalData = {};
            this.showPinModal = false;
            this.pinCode = '';
            this.toasts = [];
            this.toastSeq = 0;
            this.activeTab = 'dashboard';
            this.showReportModal = false;
            this.reportType = '';
            this.selectedPeriod = 'monthly';
            this.showGeneratedReports = false;
            this.selectedChart = null;
            this.loadData();
            this.initDates();
            this.loadGeneratedReports();
            this.loadAlertConfigs();
        }
        ReportsSettingsComponent_1.prototype.ngOnInit = function () { };
        // ========== INITIALISATION DES DATES ==========
        ReportsSettingsComponent_1.prototype.initDates = function () {
            var now = new Date();
            var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            this.filters.dateStart = firstDay.toISOString().split('T')[0] || '';
            this.filters.dateEnd = now.toISOString().split('T')[0] || '';
            if (!this.filters.dateStart)
                this.filters.dateStart = '2024-01-01';
            if (!this.filters.dateEnd)
                this.filters.dateEnd = '2024-12-31';
        };
        // ========== CHARGEMENT DES DONNÉES ==========
        ReportsSettingsComponent_1.prototype.loadData = function () {
            var saved = localStorage.getItem('reports_settings_data');
            if (saved) {
                try {
                    var data = JSON.parse(saved);
                    if (data.filters) {
                        this.filters = __assign(__assign({}, this.filters), data.filters);
                        if (!this.filters.dateStart)
                            this.filters.dateStart = '2024-01-01';
                        if (!this.filters.dateEnd)
                            this.filters.dateEnd = '2024-12-31';
                    }
                }
                catch (e) {
                    console.error('Erreur de chargement des données', e);
                }
            }
        };
        ReportsSettingsComponent_1.prototype.saveData = function () {
            var data = { filters: this.filters };
            localStorage.setItem('reports_settings_data', JSON.stringify(data));
        };
        // ========== GESTION DES RAPPORTS GÉNÉRÉS ==========
        ReportsSettingsComponent_1.prototype.loadGeneratedReports = function () {
            var saved = localStorage.getItem('generated_reports');
            if (saved) {
                try {
                    this.generatedReports = JSON.parse(saved);
                }
                catch (e) {
                    console.error('Erreur de chargement des rapports', e);
                }
            }
        };
        ReportsSettingsComponent_1.prototype.saveGeneratedReports = function () {
            localStorage.setItem('generated_reports', JSON.stringify(this.generatedReports));
        };
        ReportsSettingsComponent_1.prototype.loadAlertConfigs = function () {
            var saved = localStorage.getItem('alert_configs');
            if (saved) {
                try {
                    this.alertConfigs = JSON.parse(saved);
                }
                catch (e) {
                    console.error('Erreur de chargement des alertes', e);
                }
            }
        };
        ReportsSettingsComponent_1.prototype.saveAlertConfigs = function () {
            localStorage.setItem('alert_configs', JSON.stringify(this.alertConfigs));
        };
        // ========== ACTIONS ==========
        ReportsSettingsComponent_1.prototype.onAction = function (section, action, group) {
            console.log('[ReportsSettings]', section.key, action.actionId);
            switch (action.actionId) {
                case 'chiffre_affaires':
                case 'transactions':
                case 'revenus':
                case 'commissions':
                case 'nouveaux_clients':
                case 'croissance':
                    this.openReportModal(action.label, '📊');
                    break;
                case 'quotidien':
                case 'hebdomadaire':
                case 'mensuel':
                case 'annuel':
                    this.generateReport(action.actionId);
                    break;
                case 'pdf':
                    this.exportReport('PDF');
                    break;
                case 'excel':
                    this.exportReport('Excel');
                    break;
                case 'csv':
                    this.exportReport('CSV');
                    break;
                case 'email':
                    this.sendReportByEmail();
                    break;
                case 'imprimer':
                    this.printReport();
                    break;
                case 'previsions':
                    this.showAnalysis('previsions');
                    break;
                case 'tendances':
                    this.showAnalysis('tendances');
                    break;
                case 'segmentation':
                    this.showAnalysis('segmentation');
                    break;
                case 'performances':
                    this.showAnalysis('performances');
                    break;
                case 'revenus_categorie':
                    this.showChartById('1');
                    break;
                case 'evolution_revenus':
                    this.showChartById('2');
                    break;
                case 'repartition_services':
                    this.showChartById('3');
                    break;
                case 'performance_agents':
                    this.showChartById('4');
                    break;
                case 'transactions_mois':
                    this.showChartById('5');
                    break;
                case 'seuils_revenus':
                    this.openAlertConfig('seuils');
                    break;
                case 'anomalies':
                    this.openAlertConfig('anomalies');
                    break;
                case 'rapports_programmes':
                    this.openAlertConfig('programmes');
                    break;
                case 'notifications':
                    this.openAlertConfig('notifications');
                    break;
                default:
                    this.toast("Action ".concat(action.label, " d\u00E9clench\u00E9e"), 'info');
            }
        };
        // ========== GESTION DES RAPPORTS ==========
        ReportsSettingsComponent_1.prototype.openReportModal = function (title, icon) {
            this.modalTitle = title;
            this.modalType = 'report_detail';
            this.modalData = { icon: icon, data: this.recentTransactions };
            this.showModal = true;
        };
        ReportsSettingsComponent_1.prototype.generateReport = function (type) {
            var _this = this;
            var labels = {
                quotidien: 'Rapport quotidien',
                hebdomadaire: 'Rapport hebdomadaire',
                mensuel: 'Rapport mensuel',
                annuel: 'Rapport annuel'
            };
            this.reportType = type;
            this.showReportModal = true;
            this.toast("G\u00E9n\u00E9ration du ".concat(labels[type], " en cours..."), 'info');
            setTimeout(function () {
                var report = {
                    id: "RPT-".concat(String(100000 + _this.generatedReports.length + 1).padStart(6, '0')),
                    name: labels[type],
                    type: type,
                    date: new Date().toLocaleDateString('fr-FR'),
                    status: 'généré',
                    data: _this.recentTransactions.map(function (tx) { return (__assign({}, tx)); })
                };
                _this.generatedReports.push(report);
                _this.saveGeneratedReports();
                _this.toast("".concat(labels[type], " g\u00E9n\u00E9r\u00E9 avec succ\u00E8s"), 'success');
                _this.showReportModal = false;
                _this.showGeneratedReports = true;
                _this.modalTitle = "\uD83D\uDCC4 ".concat(labels[type]);
                _this.modalType = 'report_detail';
                _this.modalData = {
                    icon: '📄',
                    data: report.data,
                    reportInfo: {
                        id: report.id,
                        date: report.date,
                        name: report.name
                    }
                };
                _this.showModal = true;
            }, 2000);
        };
        ReportsSettingsComponent_1.prototype.closeReportModal = function () {
            this.showReportModal = false;
        };
        // ========== EXPORTS ==========
        ReportsSettingsComponent_1.prototype.exportReport = function (format) {
            var data = this.modalData.data || this.recentTransactions;
            var content = '';
            var filename = "rapport_".concat(new Date().toISOString().split('T')[0]);
            var mimeType = '';
            var headers = ['Date', 'Client', 'Service', 'Catégorie', 'Montant', 'Statut'];
            var rows = data.map(function (tx) { return [
                tx.date,
                tx.clientName,
                tx.service,
                tx.category || 'N/A',
                tx.amount.toString(),
                tx.status
            ]; });
            var csvContent = __spreadArray([headers.join(',')], rows.map(function (r) { return r.join(','); }), true).join('\n');
            switch (format) {
                case 'PDF':
                    mimeType = 'application/pdf';
                    content = csvContent;
                    filename += '.pdf';
                    break;
                case 'Excel':
                    mimeType = 'application/vnd.ms-excel';
                    content = csvContent;
                    filename += '.xls';
                    break;
                case 'CSV':
                    mimeType = 'text/csv';
                    content = csvContent;
                    filename += '.csv';
                    break;
                default:
                    mimeType = 'text/plain';
                    content = csvContent;
                    filename += '.txt';
            }
            var blob = new Blob([content], { type: "".concat(mimeType, ";charset=utf-8;") });
            var link = document.createElement('a');
            var url = URL.createObjectURL(blob);
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            this.toast("Export en ".concat(format, " termin\u00E9 avec succ\u00E8s"), 'success');
        };
        ReportsSettingsComponent_1.prototype.sendReportByEmail = function () {
            var _this = this;
            this.toast('Envoi par email en cours...', 'info');
            setTimeout(function () {
                _this.toast('Rapport envoyé par email avec succès', 'success');
            }, 1500);
        };
        ReportsSettingsComponent_1.prototype.printReport = function () {
            var _this = this;
            this.toast('Impression en cours...', 'info');
            setTimeout(function () {
                window.print();
                _this.toast('Impression terminée', 'success');
            }, 500);
        };
        // ========== ANALYSES ==========
        ReportsSettingsComponent_1.prototype.showAnalysis = function (type) {
            var titles = {
                previsions: '🔮 Prévisions',
                tendances: '📈 Tendances',
                segmentation: '👥 Segmentation clients',
                performances: '⭐ Performances'
            };
            var dataMap = {
                previsions: {
                    title: 'Analyse prédictive des revenus',
                    description: 'Prévisions des revenus pour les 12 prochains mois basées sur les données historiques.',
                    data: [
                        { mois: 'Jan 2026', prevision: '285 000 BIF', confiance: '95%', tendance: '📈' },
                        { mois: 'Fév 2026', prevision: '292 000 BIF', confiance: '93%', tendance: '📈' },
                        { mois: 'Mar 2026', prevision: '305 000 BIF', confiance: '90%', tendance: '📈' },
                        { mois: 'Avr 2026', prevision: '315 000 BIF', confiance: '88%', tendance: '📈' }
                    ]
                },
                tendances: {
                    title: 'Analyse des tendances',
                    description: 'Détection des tendances saisonnières et des cycles de revenus.',
                    data: [
                        { periode: 'Q1 2025', revenus: '450 000 BIF', croissance: '+8%', saison: '📊' },
                        { periode: 'Q2 2025', revenus: '520 000 BIF', croissance: '+15%', saison: '📈' },
                        { periode: 'Q3 2025', revenus: '580 000 BIF', croissance: '+11%', saison: '📉' },
                        { periode: 'Q4 2025', revenus: '650 000 BIF', croissance: '+12%', saison: '📈' }
                    ]
                },
                segmentation: {
                    title: 'Segmentation des clients',
                    description: 'Classification des clients par volume de transactions et valeur.',
                    data: [
                        { segment: 'Premium', clients: '45', revenus: '450 000 BIF', pourcentage: '32%' },
                        { segment: 'Standard', clients: '120', revenus: '520 000 BIF', pourcentage: '38%' },
                        { segment: 'Basique', clients: '177', revenus: '380 000 BIF', pourcentage: '30%' }
                    ]
                },
                performances: {
                    title: 'Analyse des performances',
                    description: 'Évaluation des performances par service et par catégorie.',
                    data: [
                        { service: 'ARCT', revenus: '820 000 BIF', transactions: '450', note: '⭐⭐⭐⭐⭐' },
                        { service: 'OBM', revenus: '450 000 BIF', transactions: '280', note: '⭐⭐⭐⭐' },
                        { service: 'Transport', revenus: '180 000 BIF', transactions: '120', note: '⭐⭐⭐' },
                        { service: 'Éducation', revenus: '120 000 BIF', transactions: '95', note: '⭐⭐⭐' }
                    ]
                }
            };
            this.modalTitle = titles[type] || 'Analyse';
            this.modalType = 'analysis';
            this.modalData = dataMap[type] || {
                title: 'Analyse',
                description: '',
                data: []
            };
            this.showModal = true;
        };
        // ========== GRAPHIQUES ==========
        ReportsSettingsComponent_1.prototype.showChartById = function (chartId) {
            var chart = this.chartConfigs.find(function (c) { return c.id === chartId; });
            if (chart) {
                this.selectedChart = chart;
                this.modalTitle = "\uD83D\uDCCA ".concat(chart.name);
                this.modalType = 'chart_detail';
                this.modalData = {
                    chart: chart,
                    description: chart.description
                };
                this.showModal = true;
            }
        };
        // ========== ALERTES ==========
        ReportsSettingsComponent_1.prototype.openAlertConfig = function (type) {
            var titles = {
                seuils: '🔔 Configuration des seuils de revenus',
                anomalies: '🔔 Configuration des alertes d\'anomalies',
                programmes: '🔔 Configuration des rapports programmés',
                notifications: '🔔 Configuration des notifications'
            };
            var filteredAlerts = this.alertConfigs.filter(function (a) {
                if (type === 'seuils')
                    return a.type === 'seuil';
                if (type === 'anomalies')
                    return a.type === 'anomalie';
                if (type === 'programmes')
                    return a.type === 'programme';
                if (type === 'notifications')
                    return a.type === 'notification';
                return false;
            });
            if (filteredAlerts.length === 0) {
                filteredAlerts = this.alertConfigs;
            }
            this.modalTitle = titles[type] || 'Configuration des alertes';
            this.modalType = 'alert_config';
            this.modalData = {
                type: type,
                alerts: filteredAlerts,
                allAlerts: this.alertConfigs
            };
            this.showModal = true;
        };
        ReportsSettingsComponent_1.prototype.toggleAlert = function (alert) {
            alert.active = !alert.active;
            this.saveAlertConfigs();
            this.toast("Alerte \"".concat(alert.name, "\" ").concat(alert.active ? 'activée' : 'désactivée', " avec succ\u00E8s"), 'success');
        };
        ReportsSettingsComponent_1.prototype.deleteAlert = function (alert) {
            if (confirm("Voulez-vous vraiment supprimer l'alerte \"".concat(alert.name, "\" ?"))) {
                this.alertConfigs = this.alertConfigs.filter(function (a) { return a.id !== alert.id; });
                this.saveAlertConfigs();
                this.toast("Alerte \"".concat(alert.name, "\" supprim\u00E9e avec succ\u00E8s"), 'success');
                this.openAlertConfig(this.modalData.type || 'seuils');
            }
        };
        ReportsSettingsComponent_1.prototype.addAlert = function () {
            var newAlert = {
                id: String(Date.now()),
                name: 'Nouvelle alerte',
                type: this.modalData.type === 'seuils' ? 'seuil' :
                    this.modalData.type === 'anomalies' ? 'anomalie' :
                        this.modalData.type === 'programmes' ? 'programme' : 'notification',
                active: true,
                threshold: 100000,
                frequency: 'mensuel',
                recipients: ['admin@iblopay.bi'],
                description: 'Description de la nouvelle alerte'
            };
            this.alertConfigs.push(newAlert);
            this.saveAlertConfigs();
            this.toast('Nouvelle alerte ajoutée avec succès', 'success');
            this.openAlertConfig(this.modalData.type || 'seuils');
        };
        // ========== PIN MODAL ==========
        ReportsSettingsComponent_1.prototype.openPinModal = function (title) {
            this.modalTitle = "\uD83D\uDD10 ".concat(title);
            this.pinCode = '';
            this.showPinModal = true;
        };
        ReportsSettingsComponent_1.prototype.addPinDigit = function (digit) {
            if (this.pinCode.length < 4) {
                this.pinCode += digit.toString();
            }
        };
        ReportsSettingsComponent_1.prototype.clearPin = function () {
            this.pinCode = '';
        };
        ReportsSettingsComponent_1.prototype.confirmPin = function () {
            if (this.pinCode === '1234') {
                this.showPinModal = false;
                this.toast('Configuration validée avec succès', 'success');
            }
            else {
                this.toast('Code PIN incorrect', 'danger');
                this.pinCode = '';
            }
        };
        ReportsSettingsComponent_1.prototype.closePinModal = function () {
            this.showPinModal = false;
            this.pinCode = '';
        };
        // ========== MODAL ==========
        ReportsSettingsComponent_1.prototype.closeModal = function () {
            this.showModal = false;
            this.modalData = {};
            this.selectedChart = null;
        };
        // ========== FILTRES ==========
        ReportsSettingsComponent_1.prototype.applyFilters = function () {
            if (!this.filters.dateStart)
                this.filters.dateStart = '2024-01-01';
            if (!this.filters.dateEnd)
                this.filters.dateEnd = '2024-12-31';
            this.saveData();
            this.toast('Filtres appliqués avec succès', 'success');
        };
        ReportsSettingsComponent_1.prototype.resetFilters = function () {
            var now = new Date();
            var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            this.filters = {
                period: 'monthly',
                dateStart: firstDay.toISOString().split('T')[0] || '2024-01-01',
                dateEnd: now.toISOString().split('T')[0] || '2024-12-31',
                category: 'all',
                service: 'all',
                status: 'all'
            };
            this.saveData();
            this.toast('Filtres réinitialisés', 'info');
        };
        // ========== MÉTHODES POUR LES GRAPHIQUES ==========
        ReportsSettingsComponent_1.prototype.getChartTotal = function (chart) {
            if (!chart || !chart.data || !chart.data.datasets || chart.data.datasets.length === 0) {
                return '0';
            }
            var dataset = chart.data.datasets[0];
            if (!dataset || !dataset.data) {
                return '0';
            }
            var total = dataset.data.reduce(function (a, b) { return a + b; }, 0);
            return total.toLocaleString('fr-FR');
        };
        ReportsSettingsComponent_1.prototype.getChartAverage = function (chart) {
            if (!chart || !chart.data || !chart.data.datasets || chart.data.datasets.length === 0) {
                return '0';
            }
            var dataset = chart.data.datasets[0];
            if (!dataset || !dataset.data || chart.data.labels.length === 0) {
                return '0';
            }
            var total = dataset.data.reduce(function (a, b) { return a + b; }, 0);
            var avg = total / chart.data.labels.length;
            return Math.round(avg).toLocaleString('fr-FR');
        };
        // ========== MÉTHODES POUR LES ALERTES ==========
        ReportsSettingsComponent_1.prototype.getAlertTotal = function (alerts) {
            return alerts ? alerts.length : 0;
        };
        ReportsSettingsComponent_1.prototype.getAlertActiveCount = function (alerts) {
            return alerts ? alerts.filter(function (a) { return a.active; }).length : 0;
        };
        ReportsSettingsComponent_1.prototype.getAlertInactiveCount = function (alerts) {
            return alerts ? alerts.filter(function (a) { return !a.active; }).length : 0;
        };
        // ========== MÉTHODES POUR LES GRAPHIQUES EN LIGNE ==========
        ReportsSettingsComponent_1.prototype.getLinePoints = function (data, width, height) {
            if (!data || data.length === 0)
                return '';
            var max = Math.max.apply(Math, data);
            var min = Math.min.apply(Math, data);
            var range = max - min || 1;
            var padding = 30;
            var chartWidth = width - padding * 2;
            var chartHeight = height - padding * 2;
            return data.map(function (value, index) {
                var x = padding + (index / (data.length - 1)) * chartWidth;
                var y = padding + chartHeight - ((value - min) / range) * chartHeight;
                return "".concat(x, ",").concat(y);
            }).join(' ');
        };
        ReportsSettingsComponent_1.prototype.getLinePointsArray = function (data, width, height) {
            if (!data || data.length === 0)
                return [];
            var max = Math.max.apply(Math, data);
            var min = Math.min.apply(Math, data);
            var range = max - min || 1;
            var padding = 30;
            var chartWidth = width - padding * 2;
            var chartHeight = height - padding * 2;
            return data.map(function (value, index) {
                var x = padding + (index / (data.length - 1)) * chartWidth;
                var y = padding + chartHeight - ((value - min) / range) * chartHeight;
                return { x: x, y: y };
            });
        };
        // ========== MÉTHODES POUR LES UTILITAIRES ==========
        ReportsSettingsComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                collecte: '📥 Collectée',
                transfert: '🔄 En transfert',
                valide: '✅ Validée',
                généré: '✅ Généré'
            };
            return labels[status] || status;
        };
        ReportsSettingsComponent_1.prototype.getStatusColor = function (status) {
            var colors = {
                collecte: 'status-badge--collecte',
                transfert: 'status-badge--transfert',
                valide: 'status-badge--valide',
                généré: 'status-badge--valide'
            };
            return colors[status] || '';
        };
        ReportsSettingsComponent_1.prototype.getPeriodLabel = function (period) {
            var labels = {
                daily: 'Quotidien',
                weekly: 'Hebdomadaire',
                monthly: 'Mensuel',
                yearly: 'Annuel',
                custom: 'Personnalisé'
            };
            return labels[period] || period;
        };
        ReportsSettingsComponent_1.prototype.getObjectKeys = function (obj) {
            return obj ? Object.keys(obj) : [];
        };
        ReportsSettingsComponent_1.prototype.getAlertTypeLabel = function (type) {
            var labels = {
                seuil: 'Seuil de revenus',
                anomalie: 'Anomalie',
                programme: 'Rapport programmé',
                notification: 'Notification'
            };
            return labels[type] || type;
        };
        ReportsSettingsComponent_1.prototype.getAlertStatusLabel = function (active) {
            return active ? '✅ Actif' : '⛔ Inactif';
        };
        ReportsSettingsComponent_1.prototype.getChartTypeLabel = function (type) {
            var labels = {
                bar: 'Barres',
                pie: 'Camembert',
                line: 'Ligne',
                doughnut: 'Anneau'
            };
            return labels[type] || type;
        };
        ReportsSettingsComponent_1.prototype.getChartIcon = function (type) {
            var icons = {
                bar: '📊',
                pie: '🥧',
                line: '📈',
                doughnut: '⭕'
            };
            return icons[type] || '📊';
        };
        // ========== TOASTS ==========
        ReportsSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        ReportsSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return ReportsSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "ReportsSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportsSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportsSettingsComponent = _classThis;
}();
export { ReportsSettingsComponent };
//# sourceMappingURL=reports-settings.component.js.map