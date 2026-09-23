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
var SecuritySettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-security-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './security-settings.component.html',
            styleUrls: ['./security-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SecuritySettingsComponent = _classThis = /** @class */ (function () {
        function SecuritySettingsComponent_1() {
            this.title = 'Sécurité & Conformité';
            this.icon = '🔐';
            this.Math = Math;
            this.activeTab = 'dashboard';
            this.showModal = false;
            this.modalTitle = '';
            this.modalType = '';
            this.modalData = {};
            this.selectedItem = null;
            this.formData = {};
            this.toasts = [];
            this.toastSeq = 0;
            // Audit filters
            this.auditSearchTerm = '';
            this.auditTypeFilter = '';
            this.auditDateFrom = '';
            this.auditDateTo = '';
            this.auditStatusFilter = '';
            this.filteredAuditLogs = [];
            // Audit pagination
            this.auditPageSize = 100;
            this.auditCurrentPage = 1;
            // AML filters
            this.amlStatusFilter = '';
            this.amlRiskFilter = '';
            this.filteredAMLLogs = [];
            // AML pagination
            this.amlPageSize = 50;
            this.amlCurrentPage = 1;
            this.tabs = [
                { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
                { key: 'audit', label: 'Audit Complet', icon: '📋' },
                { key: 'fraude', label: 'Détection de fraude', icon: '🚨' },
                { key: 'kyc', label: 'KYC', icon: '🪪' },
                { key: 'aml', label: 'AML', icon: '⚖️' }
            ];
            this.kpiData = [
                { icon: '🛡️', label: 'Sécurité', value: '98%', change: '+2%', trend: 'up', color: '#2e7d32' },
                { icon: '💰', label: 'Transactions', value: '12 450', change: '+8%', trend: 'up', color: '#1a237e' },
                { icon: '📋', label: 'Audit logs', value: '1 890', change: '+12%', trend: 'up', color: '#0d47a1' },
                { icon: '🚨', label: 'Alertes', value: '3', change: '-1', trend: 'down', color: '#e65100' },
                { icon: '🪪', label: 'KYC en attente', value: '156', change: '+5%', trend: 'up', color: '#4a148c' },
                { icon: '🏦', label: 'Commissions', value: '245 000 BIF', change: '+15%', trend: 'up', color: '#bf360c' }
            ];
            this.recentActivities = [
                { time: '14:32', user: 'Jean B.', action: 'Connexion réussie', status: 'success' },
                { time: '14:28', user: 'Marie C.', action: 'Transfert de 150 000 BIF', status: 'success', description: 'Compte Agent' },
                { time: '14:15', user: 'Pierre H.', action: 'Tentative de connexion échouée', status: 'danger' },
                { time: '14:00', user: 'Françoise N.', action: 'Commission Super Agent calculée', status: 'success', description: '12 500 BIF' },
                { time: '13:45', user: 'Emmanuel N.', action: 'Taxe État prélevée', status: 'success', description: '8 200 BIF' },
                { time: '13:30', user: 'David N.', action: 'Dépôt client effectué', status: 'success', description: '500 000 BIF' },
                { time: '13:15', user: 'Esther N.', action: 'Commission IBLOPAY générée', status: 'warning', description: '6 800 BIF' }
            ];
            this.auditLogs = [
                { id: '1', date: '15/01', time: '14:32', user: 'Jean B.', type: 'connexion', action: 'Connexion réussie', description: 'Utilisateur connecté depuis Chrome/Windows', amount: 0, ip: '192.168.1.100', status: 'success' },
                { id: '2', date: '15/01', time: '14:28', user: 'Marie C.', type: 'transfert', action: 'Transfert client', description: 'Transfert de 150 000 BIF vers compte Agent', amount: 150000, ip: '192.168.1.101', status: 'success', service: 'Agent', reference: 'TRX-001' },
                { id: '3', date: '15/01', time: '14:15', user: 'Pierre H.', type: 'connexion', action: 'Tentative de connexion', description: '3 tentatives échouées en 2 minutes', amount: 0, ip: '10.0.0.50', status: 'danger' },
                { id: '4', date: '15/01', time: '14:00', user: 'Françoise N.', type: 'commission', action: 'Commission Super Agent', description: 'Commission calculée pour Super Agent', amount: 12500, ip: '192.168.1.102', status: 'success', service: 'Super Agent', reference: 'COM-001' },
                { id: '5', date: '15/01', time: '13:45', user: 'Emmanuel N.', type: 'taxe', action: 'Taxe État', description: 'Prélèvement taxe État sur transaction', amount: 8200, ip: '192.168.1.103', status: 'success', service: 'État', reference: 'TAX-001' },
                { id: '6', date: '15/01', time: '13:30', user: 'David N.', type: 'transaction', action: 'Dépôt client', description: 'Dépôt de 500 000 BIF effectué', amount: 500000, ip: '192.168.1.104', status: 'success', service: 'Client', reference: 'DEP-001' },
                { id: '7', date: '15/01', time: '13:15', user: 'Esther N.', type: 'commission', action: 'Commission IBLOPAY', description: 'Commission générée pour IBLOPAY', amount: 6800, ip: '192.168.1.105', status: 'warning', service: 'IBLOPAY', reference: 'COM-002' },
                { id: '8', date: '15/01', time: '13:00', user: 'Système', type: 'systeme', action: 'Backup journalier', description: 'Sauvegarde des données effectuée', amount: 0, ip: 'localhost', status: 'success' },
                { id: '9', date: '15/01', time: '12:45', user: 'Jean B.', type: 'commission', action: 'Commission Agent', description: 'Commission calculée pour Agent', amount: 8500, ip: '192.168.1.100', status: 'success', service: 'Agent', reference: 'COM-003' },
                { id: '10', date: '15/01', time: '12:30', user: 'Marie C.', type: 'transfert', action: 'Transfert inter-comptes', description: 'Transfert de 75 000 BIF entre comptes', amount: 75000, ip: '192.168.1.101', status: 'success', service: 'IBLOPAY', reference: 'TRX-002' },
                { id: '11', date: '15/01', time: '12:15', user: 'Pierre H.', type: 'taxe', action: 'Taxe sur transaction', description: 'Taxe prélevée sur transaction', amount: 4500, ip: '10.0.0.50', status: 'danger', service: 'État', reference: 'TAX-002' },
                { id: '12', date: '15/01', time: '12:00', user: 'Françoise N.', type: 'transaction', action: 'Retrait client', description: 'Retrait de 200 000 BIF effectué', amount: 200000, ip: '192.168.1.102', status: 'success', service: 'Client', reference: 'RET-001' },
                // Ajout de transactions > 1 million pour tester l'alerte
                { id: '13', date: '15/01', time: '11:45', user: 'Test User', type: 'transaction', action: 'Dépôt exceptionnel', description: 'Dépôt de 2 500 000 BIF', amount: 2500000, ip: '192.168.1.106', status: 'success', service: 'Client', reference: 'DEP-002' },
                { id: '14', date: '15/01', time: '11:30', user: 'VIP Client', type: 'transfert', action: 'Transfert important', description: 'Transfert de 1 500 000 BIF', amount: 1500000, ip: '192.168.1.107', status: 'success', service: 'Agent', reference: 'TRX-003' }
            ];
            this.fraudRules = [
                {
                    id: '1',
                    name: 'Transactions multiples',
                    icon: '🔄',
                    description: 'Détection des transactions multiples en peu de temps',
                    category: 'transaction',
                    threshold: '5 en 15 min',
                    detected: 12,
                    active: true,
                    config: {
                        transactionCount: 5,
                        timeWindow: 15,
                        alertLevel: 'high',
                        action: 'block',
                        velocityCheck: true,
                        anomalyDetection: true,
                        notifyEmail: 'fraude@iblopay.bi',
                        notifyPhone: '+257 79 123 456'
                    }
                },
                {
                    id: '2',
                    name: 'Montant anormal',
                    icon: '💰',
                    description: 'Détection des montants anormalement élevés',
                    category: 'transaction',
                    threshold: '> 1 000 000 BIF',
                    detected: 8,
                    active: true,
                    config: {
                        minAmount: 500000,
                        maxAmount: 1000000,
                        alertLevel: 'critical',
                        action: 'review',
                        anomalyDetection: true,
                        notifyEmail: 'securite@iblopay.bi',
                        notifyPhone: '+257 79 789 012'
                    }
                },
                {
                    id: '3',
                    name: 'IP suspecte',
                    icon: '🌐',
                    description: 'Détection des connexions depuis IP à risque',
                    category: 'connexion',
                    threshold: 'Liste noire IP',
                    detected: 3,
                    active: false,
                    config: {
                        ipBlacklist: ['192.168.0.0', '10.0.0.0', '172.16.0.0'],
                        countryBlacklist: ['XX', 'YY'],
                        alertLevel: 'high',
                        action: 'block',
                        deviceFingerprint: true,
                        notifyEmail: 'security@iblopay.bi'
                    }
                },
                {
                    id: '4',
                    name: 'Comportement suspect',
                    icon: '👤',
                    description: 'Détection des comportements anormaux des utilisateurs',
                    category: 'comportement',
                    threshold: 'Déviation > 3 écarts-types',
                    detected: 5,
                    active: true,
                    config: {
                        velocityCheck: true,
                        deviceFingerprint: true,
                        anomalyDetection: true,
                        alertLevel: 'medium',
                        action: 'alert',
                        notifyEmail: 'fraude@iblopay.bi'
                    }
                }
            ];
            this.kycVerifications = [
                { id: '1', user: 'Jean B. NIZIGIYIMANA', documentType: 'CNI', submittedDate: '2025-01-10', status: 'approved', documentId: 'CNI-001', expiryDate: '2030-01-10' },
                { id: '2', user: 'Marie C. NDIKUMANA', documentType: 'Passeport', submittedDate: '2025-01-08', status: 'pending', documentId: 'PAS-002', expiryDate: '2025-07-08' },
                { id: '3', user: 'Pierre HAKIZIMANA', documentType: 'Permis', submittedDate: '2025-01-05', status: 'rejected', documentId: 'PER-003', expiryDate: '2025-12-05' },
                { id: '4', user: 'Françoise NIBITANGA', documentType: 'CNI', submittedDate: '2025-01-12', status: 'approved', documentId: 'CNI-004', expiryDate: '2030-01-12' },
                { id: '5', user: 'Emmanuel NTAKIRUTIMANA', documentType: 'Passeport', submittedDate: '2025-01-14', status: 'pending', documentId: 'PAS-005', expiryDate: '2025-06-14' },
                { id: '6', user: 'David NDAYISABA', documentType: 'CNI', submittedDate: '2025-01-13', status: 'pending', documentId: 'CNI-006', expiryDate: '2030-01-13' }
            ];
            this.amlAlerts = [
                { id: '1', date: '15/01 14:20', type: 'Opération inhabituelle', description: 'Transfert de 5 000 000 BIF en 3 transactions', amount: 5000000, status: 'new', riskLevel: 'high', transactionId: 'TRX-001', userId: 'USR-001' },
                { id: '2', date: '15/01 11:30', type: 'Seuil dépassé', description: 'Dépassement du seuil journalier de 2 000 000 BIF', amount: 2500000, status: 'reviewing', riskLevel: 'medium', transactionId: 'TRX-002', userId: 'USR-002' },
                { id: '3', date: '14/01 16:00', type: 'Pays à risque', description: 'Transaction vers un pays à risque élevé', amount: 150000, status: 'reported', riskLevel: 'high', transactionId: 'TRX-003', userId: 'USR-003' },
                { id: '4', date: '14/01 09:45', type: 'Multiple transactions', description: '5 transactions en 15 minutes', amount: 750000, status: 'closed', riskLevel: 'low', transactionId: 'TRX-004', userId: 'USR-004' },
                { id: '5', date: '13/01 08:30', type: 'Transfert suspect', description: 'Transfert vers compte externe non vérifié', amount: 1200000, status: 'new', riskLevel: 'high', transactionId: 'TRX-005', userId: 'USR-005' }
            ];
        }
        SecuritySettingsComponent_1.prototype.ngOnInit = function () {
            this.applyAuditFilters();
            this.applyAMLFilters();
        };
        // ========== MÉTHODES POUR LES COMPTES ==========
        SecuritySettingsComponent_1.prototype.getActiveFraudRulesCount = function () {
            return this.fraudRules.filter(function (r) { return r.active; }).length;
        };
        SecuritySettingsComponent_1.prototype.getPendingKYCCount = function () {
            return this.kycVerifications.filter(function (k) { return k.status === 'pending'; }).length;
        };
        SecuritySettingsComponent_1.prototype.getActiveAMLAlertsCount = function () {
            return this.amlAlerts.filter(function (a) { return a.status === 'new' || a.status === 'reviewing'; }).length;
        };
        // ========== AUDIT FILTERS ==========
        SecuritySettingsComponent_1.prototype.applyAuditFilters = function () {
            var _this = this;
            var filtered = __spreadArray([], this.auditLogs, true);
            // Search filter
            if (this.auditSearchTerm.trim()) {
                var term_1 = this.auditSearchTerm.toLowerCase().trim();
                filtered = filtered.filter(function (log) {
                    return log.user.toLowerCase().includes(term_1) ||
                        log.action.toLowerCase().includes(term_1) ||
                        log.description.toLowerCase().includes(term_1) ||
                        log.ip.includes(term_1) ||
                        (log.reference && log.reference.toLowerCase().includes(term_1));
                });
            }
            // Type filter
            if (this.auditTypeFilter) {
                filtered = filtered.filter(function (log) { return log.type === _this.auditTypeFilter; });
            }
            // Status filter
            if (this.auditStatusFilter) {
                filtered = filtered.filter(function (log) { return log.status === _this.auditStatusFilter; });
            }
            // Date range filter
            if (this.auditDateFrom) {
                filtered = filtered.filter(function (log) { return log.date >= _this.auditDateFrom; });
            }
            if (this.auditDateTo) {
                filtered = filtered.filter(function (log) { return log.date <= _this.auditDateTo; });
            }
            this.filteredAuditLogs = filtered;
            this.auditCurrentPage = 1;
        };
        SecuritySettingsComponent_1.prototype.resetAuditFilters = function () {
            this.auditSearchTerm = '';
            this.auditTypeFilter = '';
            this.auditDateFrom = '';
            this.auditDateTo = '';
            this.auditStatusFilter = '';
            this.applyAuditFilters();
        };
        Object.defineProperty(SecuritySettingsComponent_1.prototype, "paginatedAuditLogs", {
            // ========== AUDIT PAGINATION ==========
            get: function () {
                var start = (this.auditCurrentPage - 1) * this.auditPageSize;
                var end = start + this.auditPageSize;
                return this.filteredAuditLogs.slice(start, end);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SecuritySettingsComponent_1.prototype, "auditTotalPages", {
            get: function () {
                return Math.ceil(this.filteredAuditLogs.length / this.auditPageSize);
            },
            enumerable: false,
            configurable: true
        });
        SecuritySettingsComponent_1.prototype.auditPreviousPage = function () {
            if (this.auditCurrentPage > 1) {
                this.auditCurrentPage--;
            }
        };
        SecuritySettingsComponent_1.prototype.auditNextPage = function () {
            if (this.auditCurrentPage < this.auditTotalPages) {
                this.auditCurrentPage++;
            }
        };
        // ========== AML FILTERS ==========
        SecuritySettingsComponent_1.prototype.applyAMLFilters = function () {
            var _this = this;
            var filtered = __spreadArray([], this.amlAlerts, true);
            if (this.amlStatusFilter) {
                filtered = filtered.filter(function (alert) { return alert.status === _this.amlStatusFilter; });
            }
            if (this.amlRiskFilter) {
                filtered = filtered.filter(function (alert) { return alert.riskLevel === _this.amlRiskFilter; });
            }
            this.filteredAMLLogs = filtered;
            this.amlCurrentPage = 1;
        };
        Object.defineProperty(SecuritySettingsComponent_1.prototype, "paginatedAMLLogs", {
            // ========== AML PAGINATION ==========
            get: function () {
                var start = (this.amlCurrentPage - 1) * this.amlPageSize;
                var end = start + this.amlPageSize;
                return this.filteredAMLLogs.slice(start, end);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SecuritySettingsComponent_1.prototype, "amlTotalPages", {
            get: function () {
                return Math.ceil(this.filteredAMLLogs.length / this.amlPageSize);
            },
            enumerable: false,
            configurable: true
        });
        SecuritySettingsComponent_1.prototype.amlPreviousPage = function () {
            if (this.amlCurrentPage > 1) {
                this.amlCurrentPage--;
            }
        };
        SecuritySettingsComponent_1.prototype.amlNextPage = function () {
            if (this.amlCurrentPage < this.amlTotalPages) {
                this.amlCurrentPage++;
            }
        };
        // ========== HIGH VALUE TRANSACTIONS ==========
        SecuritySettingsComponent_1.prototype.getHighValueTransactions = function () {
            return this.auditLogs.filter(function (log) { return log.amount > 1000000; });
        };
        // ========== ACTIONS ==========
        SecuritySettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
        };
        SecuritySettingsComponent_1.prototype.viewAuditDetail = function (log) {
            this.selectedItem = log;
            this.modalType = 'audit_detail';
            this.modalTitle = "\uD83D\uDCCB D\u00E9tails de l'audit";
            this.formData = __assign({}, log);
            this.showModal = true;
        };
        SecuritySettingsComponent_1.prototype.configureFraudRule = function (rule) {
            this.selectedItem = rule;
            this.modalType = 'fraud_config';
            this.modalTitle = "\u2699\uFE0F Configuration - ".concat(rule.name);
            this.formData = __assign(__assign({}, rule.config), { name: rule.name });
            this.showModal = true;
        };
        SecuritySettingsComponent_1.prototype.toggleFraudRule = function (rule) {
            rule.active = !rule.active;
            this.toast("R\u00E8gle \"".concat(rule.name, "\" ").concat(rule.active ? 'activée' : 'désactivée'), rule.active ? 'success' : 'danger');
        };
        SecuritySettingsComponent_1.prototype.saveFraudRule = function () {
            if (this.selectedItem) {
                this.selectedItem.config = __assign({}, this.formData);
                this.toast("R\u00E8gle \"".concat(this.selectedItem.name, "\" configur\u00E9e avec succ\u00E8s"), 'success');
                this.closeModal();
            }
        };
        SecuritySettingsComponent_1.prototype.viewKYC = function (kyc) {
            this.selectedItem = kyc;
            this.modalType = 'kyc_detail';
            this.modalTitle = "\uD83E\uDEAA D\u00E9tails KYC - ".concat(kyc.user);
            this.formData = __assign({}, kyc);
            this.showModal = true;
        };
        SecuritySettingsComponent_1.prototype.approveKYC = function (kyc) {
            kyc.status = 'approved';
            this.toast("KYC de ".concat(kyc.user, " approuv\u00E9"), 'success');
            this.closeModal();
        };
        SecuritySettingsComponent_1.prototype.rejectKYC = function (kyc) {
            kyc.status = 'rejected';
            this.toast("KYC de ".concat(kyc.user, " rejet\u00E9"), 'danger');
            this.closeModal();
        };
        SecuritySettingsComponent_1.prototype.viewAMLAlert = function (alert) {
            this.selectedItem = alert;
            this.modalType = 'aml_detail';
            this.modalTitle = "\u2696\uFE0F D\u00E9tails AML - ".concat(alert.type);
            this.formData = __assign({}, alert);
            this.showModal = true;
        };
        SecuritySettingsComponent_1.prototype.updateAMLStatus = function (alert, status) {
            alert.status = status;
            this.toast("Alerte AML mise \u00E0 jour: ".concat(status), 'success');
            this.closeModal();
        };
        SecuritySettingsComponent_1.prototype.closeModal = function () {
            this.showModal = false;
            this.selectedItem = null;
            this.formData = {};
        };
        // ========== TOASTS ==========
        SecuritySettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        SecuritySettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        // ========== UTILITAIRES ==========
        SecuritySettingsComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                success: '✅ Succès',
                warning: '⚠️ Attention',
                danger: '❌ Danger',
                pending: '⏳ En attente',
                approved: '✅ Approuvé',
                rejected: '❌ Rejeté',
                new: '🆕 Nouveau',
                reviewing: '📝 En révision',
                reported: '📋 Signalé',
                closed: '✅ Clos',
                low: '🟢 Faible',
                medium: '🟡 Moyen',
                high: '🟠 Élevé',
                critical: '🔴 Critique'
            };
            return labels[status] || status;
        };
        SecuritySettingsComponent_1.prototype.getStatusColor = function (status) {
            var colors = {
                success: 'status-badge--success',
                warning: 'status-badge--warning',
                danger: 'status-badge--danger',
                pending: 'status-badge--pending',
                approved: 'status-badge--approved',
                rejected: 'status-badge--rejected',
                new: 'status-badge--info',
                reviewing: 'status-badge--warning',
                reported: 'status-badge--warning',
                closed: 'status-badge--success',
                low: 'status-badge--info',
                medium: 'status-badge--warning',
                high: 'status-badge--danger',
                critical: 'status-badge--danger'
            };
            return colors[status] || 'status-badge--info';
        };
        SecuritySettingsComponent_1.prototype.getActivityIcon = function (status) {
            var icons = {
                success: '✅',
                warning: '⚠️',
                danger: '❌'
            };
            return icons[status] || 'ℹ️';
        };
        SecuritySettingsComponent_1.prototype.getAuditTypeLabel = function (type) {
            var labels = {
                connexion: '🔌 Connexion',
                transaction: '💰 Transaction',
                commission: '💵 Commission',
                taxe: '🏛️ Taxe',
                transfert: '🔄 Transfert',
                systeme: '⚙️ Système'
            };
            return labels[type] || type;
        };
        return SecuritySettingsComponent_1;
    }());
    __setFunctionName(_classThis, "SecuritySettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SecuritySettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SecuritySettingsComponent = _classThis;
}();
export { SecuritySettingsComponent };
//# sourceMappingURL=security-settings.component.js.map