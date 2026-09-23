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
var ReportDummyData = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReportDummyData = _classThis = /** @class */ (function () {
        function ReportDummyData_1() {
            this.reports = [
                { id: 'financial', name: 'Transactions & Flux', description: 'Volumes et montants par type d\'opération, évolution dans le temps', category: 'financial', icon: 'fa-solid fa-money-bill-transfer', roles: ['admin', 'super_agent'], route: 'financial' },
                { id: 'commissions', name: 'Commissions Agents', description: 'Commissions gagnées par agent / super agent sur une période', category: 'commissions', icon: 'fa-solid fa-coins', roles: ['admin', 'super_agent', 'agent'], route: 'commissions' },
                { id: 'trust-account', name: 'Trust Account & Réconciliation', description: 'Solde e-money vs solde bancaire, écarts constatés', category: 'trust_account', icon: 'fa-solid fa-scale-balanced', roles: ['admin'], route: 'trust-account' },
                { id: 'cash-management', name: 'Gestion Cash Agents', description: 'Montants déclarés vs attendus par agent, alertes d\'écart', category: 'cash_management', icon: 'fa-solid fa-sack-dollar', roles: ['admin', 'super_agent'], route: 'cash-management' },
                { id: 'offline-pos', name: 'Transactions Offline / POS', description: 'Lots traités hors-ligne, taux de succès/échec', category: 'offline_pos', icon: 'fa-solid fa-tablet-screen-button', roles: ['admin', 'super_agent'], route: 'offline-pos' },
                { id: 'compliance', name: 'Conformité & Audit', description: 'Actions sensibles récentes, cartes blacklistées', category: 'compliance_audit', icon: 'fa-solid fa-shield-halved', roles: ['admin'], route: 'compliance' },
                { id: 'kyc-users', name: 'KYC & Base Utilisateurs', description: 'Utilisateurs par statut et rôle, inscriptions', category: 'kyc_users', icon: 'fa-solid fa-users-gear', roles: ['admin', 'super_agent'], route: 'kyc-users' },
            ];
            this.categoryLabels = {
                financial: 'Financier & Transactions',
                commissions: 'Commissions & Revenus',
                trust_account: 'Trust Account & Réconciliation',
                cash_management: 'Gestion Cash',
                offline_pos: 'Offline / POS',
                compliance_audit: 'Conformité & Audit',
                kyc_users: 'KYC & Utilisateurs',
            };
            this.categoryColors = {
                financial: '#3b82f6',
                commissions: '#22c55e',
                trust_account: '#a855f7',
                cash_management: '#eab308',
                offline_pos: '#f97316',
                compliance_audit: '#ef4444',
                kyc_users: '#06b6d4',
            };
            this.agents = [
                { id: 'AGT-001', name: 'Ndayishimiye Jean' },
                { id: 'AGT-002', name: 'Niyonzima Claude' },
                { id: 'AGT-003', name: 'Irakoze David' },
                { id: 'AGT-004', name: 'Bukuru Alphonse' },
                { id: 'AGT-005', name: 'Nizigiyimana Pierre' },
                { id: 'AGT-006', name: 'Hakizimana François' },
                { id: 'AGT-007', name: 'Mpoyi Kévin' },
                { id: 'AGT-008', name: 'Uwimana Béatrice' },
                { id: 'AGT-009', name: 'Manirakiza Eric' },
                { id: 'AGT-010', name: 'Bazompa Jérôme' },
                { id: 'AGT-011', name: 'Mugisha Aimable' },
                { id: 'AGT-012', name: 'Havyarimana Salvator' },
            ];
        }
        // ─── HELPERS ─────────────────────────────────────────
        ReportDummyData_1.prototype.rand = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        ReportDummyData_1.prototype.randDate = function (daysAgo) {
            var d = new Date();
            d.setDate(d.getDate() - this.rand(0, daysAgo));
            return d;
        };
        ReportDummyData_1.prototype.pickAgent = function () {
            var idx = this.rand(0, this.agents.length - 1);
            return this.agents[idx];
        };
        ReportDummyData_1.prototype.pick = function (arr) {
            var idx = this.rand(0, arr.length - 1);
            return arr[idx];
        };
        ReportDummyData_1.prototype.getAgentOptions = function () {
            return __spreadArray([{ id: '', name: 'Tous les agents' }], this.agents, true);
        };
        // ─── 1. FINANCIAL / TRANSACTIONS ─────────────────────
        ReportDummyData_1.prototype.getFinancialKpis = function () {
            return [
                { label: 'Volume Total', value: 523690000, prefix: '', suffix: ' BIF', change: 8.1, changeLabel: 'vs période préc.', icon: 'fa-solid fa-arrows-rotate', color: '#3b82f6' },
                { label: 'Nombre Transactions', value: 2847, change: 5.3, changeLabel: 'vs période préc.', icon: 'fa-solid fa-hashtag', color: '#22c55e' },
                { label: 'Montant Moyen', value: 183950, prefix: '', suffix: ' BIF', change: 2.7, changeLabel: 'vs période préc.', icon: 'fa-solid fa-chart-line', color: '#a855f7' },
                { label: 'Taux de Succès', value: '97.8', suffix: '%', change: 0.5, changeLabel: 'vs période préc.', icon: 'fa-solid fa-check-circle', color: '#22c55e' },
            ];
        };
        ReportDummyData_1.prototype.getFinancialChartTrend = function () {
            var _this = this;
            var days = ['Lun 14', 'Mar 15', 'Mer 16', 'Jeu 17', 'Ven 18', 'Sam 19', 'Dim 20'];
            return days.map(function (d) { return ({
                label: d,
                value: _this.rand(55000000, 95000000),
                secondary: _this.rand(40000000, 75000000),
            }); });
        };
        ReportDummyData_1.prototype.getFinancialByType = function () {
            return [
                { label: 'DEPOSIT', value: 35 },
                { label: 'WITHDRAWAL', value: 22 },
                { label: 'TRANSFER', value: 18 },
                { label: 'PAYMENT_NFC', value: 12 },
                { label: 'SWEEP', value: 6 },
                { label: 'COMMISSION', value: 4 },
                { label: 'REIMBURSEMENT', value: 3 },
            ];
        };
        ReportDummyData_1.prototype.getFinancialTransactions = function () {
            var types = ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT_NFC', 'SWEEP', 'COMMISSION', 'REIMBURSEMENT'];
            var statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'REVERSED'];
            var modes = ['NFC', 'USSD', 'MOBILE_APP', 'WEB', 'AGENT'];
            var rows = [];
            for (var i = 0; i < 85; i++) {
                var type = this.pick(types);
                rows.push({
                    reference: "TXN-".concat(String(202600000 + i)),
                    date: this.randDate(90),
                    type: type,
                    fromWallet: "WALLET-".concat(this.rand(100, 9999)),
                    toWallet: "WALLET-".concat(this.rand(100, 9999)),
                    amount: this.rand(1000, 5000000),
                    fee: type === 'WITHDRAWAL' ? this.rand(500, 5000) : this.rand(0, 2000),
                    status: this.pick(statuses),
                    paymentMode: this.pick(modes),
                });
            }
            return rows.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        };
        // ─── 2. COMMISSIONS ──────────────────────────────────
        ReportDummyData_1.prototype.getCommissionKpis = function () {
            return [
                { label: 'Commissions Totales', value: 3474900, suffix: ' BIF', change: 12.4, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-coins', color: '#22c55e' },
                { label: 'Agents Commissionnés', value: 186, change: 4.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-users', color: '#3b82f6' },
                { label: 'Commission Moyenne', value: 18682, suffix: ' BIF', change: 3.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-chart-simple', color: '#a855f7' },
                { label: 'Taux de Crédit', value: '94.2', suffix: '%', change: 1.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-percent', color: '#22c55e' },
            ];
        };
        ReportDummyData_1.prototype.getCommissionChart = function () {
            return [
                { label: 'Fév', value: 2100000, secondary: 1800000 },
                { label: 'Mar', value: 2400000, secondary: 2000000 },
                { label: 'Avr', value: 2800000, secondary: 2200000 },
                { label: 'Mai', value: 2600000, secondary: 2400000 },
                { label: 'Juin', value: 3100000, secondary: 2500000 },
                { label: 'Juil', value: 3470000, secondary: 2700000 },
            ];
        };
        ReportDummyData_1.prototype.getCommissionByAgent = function () {
            var _this = this;
            return this.agents.slice(0, 8).map(function (a) { return ({
                label: a.name.split(' ')[0],
                value: _this.rand(150000, 850000),
            }); });
        };
        ReportDummyData_1.prototype.getCommissionRows = function () {
            var rows = [];
            var statuses = ['PENDING', 'CREDITED', 'CREDITED', 'CREDITED', 'FAILED'];
            for (var i = 0; i < 55; i++) {
                var agent = this.pickAgent();
                rows.push({
                    agentName: agent.name,
                    agentId: agent.id,
                    transactionRef: "TXN-".concat(String(202600000 + i)),
                    date: this.randDate(60),
                    amount: this.rand(5000, 150000),
                    rate: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
                    commissionType: Math.random() > 0.3 ? 'AGENT_COMMISSION' : 'SUPER_AGENT_COMMISSION',
                    status: this.pick(statuses),
                });
            }
            return rows.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        };
        // ─── 3. TRUST ACCOUNT ────────────────────────────────
        ReportDummyData_1.prototype.getTrustAccountKpis = function () {
            return [
                { label: 'Solde e-Money', value: 1256000000, suffix: ' BIF', icon: 'fa-solid fa-wallet', color: '#3b82f6' },
                { label: 'Solde Bancaire', value: 1254800000, suffix: ' BIF', icon: 'fa-solid fa-building-columns', color: '#22c55e' },
                { label: 'Écart', value: 1200000, prefix: '', suffix: ' BIF', change: -15.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-triangle-exclamation', color: '#eab308' },
                { label: 'Jours sans écart', value: 3, icon: 'fa-solid fa-calendar-check', color: '#a855f7' },
            ];
        };
        ReportDummyData_1.prototype.getReconciliationChart = function () {
            return [
                { label: 'J-7', value: 1256000000, secondary: 1254800000 },
                { label: 'J-6', value: 1253000000, secondary: 1251000000 },
                { label: 'J-5', value: 1258000000, secondary: 1259000000 },
                { label: 'J-4', value: 1260000000, secondary: 1257000000 },
                { label: 'J-3', value: 1259000000, secondary: 1258000000 },
                { label: 'J-2', value: 1255000000, secondary: 1253000000 },
                { label: 'J-1', value: 1256000000, secondary: 1254800000 },
            ];
        };
        ReportDummyData_1.prototype.getReconciliationRows = function () {
            var rows = [];
            var statuses = ['OK', 'OK', 'OK', 'DISCREPANCY'];
            for (var i = 0; i < 30; i++) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                var emoney = 1250000000 + this.rand(0, 20000000);
                var bank = emoney + this.rand(-1500000, 1500000);
                rows.push({
                    date: d,
                    totalEmoney: emoney,
                    trustAccountBalance: bank,
                    difference: Math.abs(emoney - bank),
                    status: Math.abs(emoney - bank) < 500000 ? 'OK' : 'DISCREPANCY',
                });
            }
            return rows;
        };
        // ─── 4. CASH MANAGEMENT ────────────────────────────
        ReportDummyData_1.prototype.getCashManagementKpis = function () {
            return [
                { label: 'Déclarations Totales', value: 482, change: 6.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-file-invoice', color: '#eab308' },
                { label: 'Montant Total Déclaré', value: 184200000, suffix: ' BIF', icon: 'fa-solid fa-sack-dollar', color: '#22c55e' },
                { label: 'Écart Total', value: 4850000, prefix: '', suffix: ' BIF', change: -23.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-triangle-exclamation', color: '#ef4444' },
                { label: 'Alertes Non Résolues', value: 7, icon: 'fa-solid fa-bell', color: '#f97316' },
            ];
        };
        ReportDummyData_1.prototype.getCashManagementChart = function () {
            return [
                { label: 'Lun', value: 18200000, secondary: 17600000 },
                { label: 'Mar', value: 19500000, secondary: 19200000 },
                { label: 'Mer', value: 16800000, secondary: 17000000 },
                { label: 'Jeu', value: 20100000, secondary: 19500000 },
                { label: 'Ven', value: 22300000, secondary: 21000000 },
                { label: 'Sam', value: 14500000, secondary: 15000000 },
            ];
        };
        ReportDummyData_1.prototype.getCashManagementRows = function () {
            var statuses = ['VALIDATED', 'VALIDATED', 'VALIDATED', 'REJECTED', 'ESCALATED', 'PENDING'];
            var rows = [];
            for (var i = 0; i < 45; i++) {
                var agent = this.pickAgent();
                var expected = this.rand(500000, 8000000);
                var declared = expected + this.rand(-500000, 300000);
                rows.push({
                    agentName: agent.name,
                    agentId: agent.id,
                    declaredAmount: declared,
                    expectedAmount: expected,
                    difference: declared - expected,
                    status: this.pick(statuses),
                    date: this.randDate(30),
                });
            }
            return rows.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        };
        // ─── 5. OFFLINE / POS ────────────────────────────────
        ReportDummyData_1.prototype.getOfflineKpis = function () {
            return [
                { label: 'Lots Reçus', value: 234, change: 11.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-database', color: '#f97316' },
                { label: 'Transactions Offline', value: 2847, change: 4.6, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-hashtag', color: '#3b82f6' },
                { label: 'Taux de Succès', value: '96.3', suffix: '%', change: 2.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-check-circle', color: '#22c55e' },
                { label: 'Terminaux Actifs', value: 42, change: 3, changeLabel: 'nouveaux ce mois', icon: 'fa-solid fa-tablet-screen-button', color: '#a855f7' },
            ];
        };
        ReportDummyData_1.prototype.getOfflineChart = function () {
            return [
                { label: 'Lun', value: 28, secondary: 26 },
                { label: 'Mar', value: 35, secondary: 33 },
                { label: 'Mer', value: 22, secondary: 21 },
                { label: 'Jeu', value: 40, secondary: 38 },
                { label: 'Ven', value: 45, secondary: 42 },
                { label: 'Sam', value: 52, secondary: 50 },
            ];
        };
        ReportDummyData_1.prototype.getOfflineByStatus = function () {
            return [
                { label: 'COMPLETED', value: 68 },
                { label: 'PROCESSING', value: 18 },
                { label: 'FAILED', value: 10 },
                { label: 'RECEIVED', value: 4 },
            ];
        };
        ReportDummyData_1.prototype.getOfflineRows = function () {
            var statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PROCESSING', 'FAILED', 'RECEIVED'];
            var rows = [];
            for (var i = 0; i < 40; i++) {
                rows.push({
                    batchId: "BATCH-".concat(String(2400 + i)),
                    posTerminalId: "POS-".concat(this.rand(100, 999), "-").concat(String(this.rand(10, 99))),
                    transactionCount: this.rand(5, 150),
                    totalAmount: this.rand(50000, 5000000),
                    status: this.pick(statuses),
                    receivedAt: this.randDate(30),
                });
            }
            return rows.sort(function (a, b) { return b.receivedAt.getTime() - a.receivedAt.getTime(); });
        };
        // ─── 6. COMPLIANCE / AUDIT ──────────────────────────
        ReportDummyData_1.prototype.getComplianceKpis = function () {
            return [
                { label: 'Actions Sensibles', value: 142, change: -8.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-shield-halved', color: '#ef4444' },
                { label: 'Cartes Blacklistées', value: 23, change: 2, changeLabel: 'ce mois-ci', icon: 'fa-solid fa-ban', color: '#f97316' },
                { label: 'Tentatives Bloquées', value: 87, change: 15.6, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-lock', color: '#3b82f6' },
                { label: 'Alertes Actives', value: 5, icon: 'fa-solid fa-exclamation-triangle', color: '#eab308' },
            ];
        };
        ReportDummyData_1.prototype.getComplianceChart = function () {
            return [
                { label: 'Fév', value: 85, secondary: 156 },
                { label: 'Mar', value: 92, secondary: 148 },
                { label: 'Avr', value: 78, secondary: 162 },
                { label: 'Mai', value: 102, secondary: 138 },
                { label: 'Juin', value: 88, secondary: 145 },
                { label: 'Juil', value: 65, secondary: 142 },
            ];
        };
        ReportDummyData_1.prototype.getComplianceByAction = function () {
            return [
                { label: 'LOGIN_FAILED', value: 38 },
                { label: 'CARD_BLOCK', value: 14 },
                { label: 'WALLET_UPDATE', value: 22 },
                { label: 'EMISSION_CREATE', value: 8 },
                { label: 'PIN_CHANGE', value: 18 },
                { label: 'ROLE_CHANGE', value: 5 },
            ];
        };
        ReportDummyData_1.prototype.getComplianceRows = function () {
            var actions = ['LOGIN_FAILED', 'CARD_BLOCK', 'WALLET_UPDATE', 'EMISSION_CREATE', 'PIN_CHANGE', 'ROLE_CHANGE'];
            var users = ['Super Admin', 'Ndayishimiye J.', 'Niyonzima C.', 'Irakoze D.', 'System', 'Bukuru A.'];
            var rows = [];
            for (var i = 0; i < 50; i++) {
                rows.push({
                    user: this.pick(users),
                    actionType: this.pick(actions),
                    targetId: "UUID-".concat(this.rand(1000, 9999), "-").concat(this.rand(1000, 9999)),
                    details: "Action sur ".concat(['wallet', 'card', 'user', 'emission'][this.rand(0, 3)]),
                    ipAddress: "".concat(this.rand(10, 223), ".").concat(this.rand(0, 255), ".").concat(this.rand(0, 255), ".").concat(this.rand(1, 254)),
                    createdAt: this.randDate(30),
                });
            }
            return rows.sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); });
        };
        // ─── 7. KYC / USERS ──────────────────────────────────
        ReportDummyData_1.prototype.getKycKpis = function () {
            return [
                { label: 'Utilisateurs Total', value: 12548, change: 8.7, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-users', color: '#06b6d4' },
                { label: 'Nouveaux (30j)', value: 847, change: 12.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-user-plus', color: '#22c55e' },
                { label: 'KYC Complété', value: '94.2', suffix: '%', change: 1.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-check-double', color: '#3b82f6' },
                { label: 'Comptes Suspendus', value: 124, change: -5.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-user-lock', color: '#ef4444' },
            ];
        };
        ReportDummyData_1.prototype.getKycChart = function () {
            return [
                { label: 'Fév', value: 10800, secondary: 9200 },
                { label: 'Mar', value: 11200, secondary: 9600 },
                { label: 'Avr', value: 11600, secondary: 10100 },
                { label: 'Mai', value: 11900, secondary: 10500 },
                { label: 'Juin', value: 12300, secondary: 11000 },
                { label: 'Juil', value: 12548, secondary: 11400 },
            ];
        };
        ReportDummyData_1.prototype.getKycByStatus = function () {
            return [
                { label: 'ACTIFS', value: 11240 },
                { label: 'SUSPENDUS', value: 890 },
                { label: 'FROZEN', value: 312 },
                { label: 'CLOSED', value: 106 },
            ];
        };
        ReportDummyData_1.prototype.getKycByRole = function () {
            return [
                { label: 'Clients', value: 8540 },
                { label: 'Agents', value: 2890 },
                { label: 'Super Agents', value: 680 },
                { label: 'Admins', value: 438 },
            ];
        };
        ReportDummyData_1.prototype.getKycRows = function () {
            var statuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
            var roles = ['Client', 'Agent', 'Super Agent', 'Admin'];
            var firstNames = ['Jean', 'Claude', 'David', 'Alphonse', 'Pierre', 'François', 'Béatrice', 'Eric', 'Jérôme', 'Aimable', 'Salvator', 'Marie', 'Esther', 'Patricia', 'Olivier'];
            var lastNames = ['Ndayishimiye', 'Niyonzima', 'Irakoze', 'Bukuru', 'Nizigiyimana', 'Hakizimana', 'Mpoyi', 'Uwimana', 'Manirakiza', 'Bazompa', 'Mugisha', 'Havyarimana'];
            var rows = [];
            for (var i = 0; i < 60; i++) {
                rows.push({
                    userId: "USR-".concat(String(10000 + i)),
                    name: "".concat(this.pick(firstNames), " ").concat(this.pick(lastNames)),
                    phone: "+257 ".concat(String(70000000 + this.rand(0, 9999999)).slice(0, 8)),
                    email: "user".concat(i, "@email.com"),
                    status: this.pick(statuses),
                    role: this.pick(roles),
                    registeredAt: this.randDate(180),
                    kycCompleted: Math.random() > 0.08,
                });
            }
            return rows.sort(function (a, b) { return b.registeredAt.getTime() - a.registeredAt.getTime(); });
        };
        return ReportDummyData_1;
    }());
    __setFunctionName(_classThis, "ReportDummyData");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportDummyData = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportDummyData = _classThis;
}();
export { ReportDummyData };
//# sourceMappingURL=report-dummy.data.js.map