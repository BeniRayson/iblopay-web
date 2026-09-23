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
// src/app/modules/users/components/users-fund/users-fund.component.ts
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
var UsersFundComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-users-fund',
            templateUrl: './users-fund.component.html',
            styleUrls: ['./users-fund.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersFundComponent = _classThis = /** @class */ (function () {
        function UsersFundComponent_1(route, router, location, fb) {
            this.route = route;
            this.router = router;
            this.location = location;
            this.fb = fb;
            this.user = null;
            this.isLoading = true;
            this.isDarkMode = false;
            this.fundLoading = false;
            this.fundError = '';
            this.fundSuccess = '';
            // Données
            this.transactions = [];
            this.commissions = [];
            this.fundHistory = [];
            // Filtres
            this.transactionFilter = '';
            this.commissionFilter = '';
            // Statistiques
            this.totalTransactions = 0;
            this.totalCommissions = 0;
            this.totalFunds = 0;
            // Données simulées pour les transactions
            this.clientNames = ['Alain Niyonzima', 'Claire Mukiza', 'Pierre Nkurunziza', 'Marie Uwimana', 'David Niyongabo'];
            this.agentNames = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Niyonzima', 'Claire Mukiza'];
            this.superAgentNames = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Niyonzima'];
        }
        UsersFundComponent_1.prototype.ngOnInit = function () {
            var userId = this.route.snapshot.paramMap.get('id');
            if (userId) {
                this.loadUser(userId);
            }
            else {
                this.goBack();
            }
            this.loadTheme();
            this.initFundForm();
            this.loadMockData();
        };
        UsersFundComponent_1.prototype.initFundForm = function () {
            this.fundForm = this.fb.group({
                amount: ['', [Validators.required, Validators.min(100)]],
                reason: ['', Validators.required],
                description: ['']
            });
        };
        UsersFundComponent_1.prototype.loadTheme = function () {
            var saved = localStorage.getItem('iblopay-theme');
            if (saved === 'dark') {
                this.isDarkMode = true;
                document.body.classList.add('dark-mode');
            }
        };
        UsersFundComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
        };
        UsersFundComponent_1.prototype.loadUser = function (id) {
            var _this = this;
            this.isLoading = true;
            setTimeout(function () {
                _this.user = _this.getMockUser(id);
                _this.isLoading = false;
            }, 500);
        };
        UsersFundComponent_1.prototype.getMockUser = function (id) {
            return {
                id: id || 'user-0001',
                firstName: 'Jean',
                lastName: 'Ndayishimiye',
                email: 'jean.ndayishimiye@iblopay.bi',
                phone: '+257 61234567',
                photoUrl: '',
                role: 'AGENT',
                status: 'ACTIVE',
                cardNumber: 'CARD-2024-001',
                cniNumber: 'CNI-123456',
                address: {
                    zone: 'Nyakabiga',
                    commune: 'Mukaza',
                    province: 'Bujumbura Mairie',
                    fullAddress: 'Nyakabiga; Mukaza; Bujumbura Mairie'
                },
                createdAt: new Date(2024, 0, 15),
                createdBy: {
                    id: 'super-001',
                    firstName: 'Marie',
                    lastName: 'Uwimana',
                    role: 'SUPER_AGENT'
                },
                accountNumber: 'IBL-123456789',
                walletBalance: 150000
            };
        };
        UsersFundComponent_1.prototype.loadMockData = function () {
            var _a, _b, _c;
            // Générer des transactions selon le rôle
            if (((_a = this.user) === null || _a === void 0 ? void 0 : _a.role) === 'CLIENT') {
                this.transactions = this.generateClientTransactions();
            }
            else if (((_b = this.user) === null || _b === void 0 ? void 0 : _b.role) === 'AGENT') {
                this.transactions = this.generateAgentTransactions();
                this.commissions = this.generateAgentCommissions();
            }
            else if (((_c = this.user) === null || _c === void 0 ? void 0 : _c.role) === 'SUPER_AGENT') {
                this.transactions = this.generateSuperAgentTransactions();
                this.commissions = this.generateSuperAgentCommissions();
            }
            // Historique d'approvisionnement commun à tous
            this.fundHistory = this.generateFundHistory();
            this.calculateStats();
        };
        UsersFundComponent_1.prototype.generateClientTransactions = function () {
            return [
                {
                    id: 'txn-001',
                    type: 'DEPOSIT',
                    amount: 50000,
                    date: new Date(Date.now() - 1800000),
                    description: 'Dépôt en espèces',
                    status: 'COMPLETED',
                    from: 'Jean Ndayishimiye',
                    to: 'Wallet Client',
                    reference: 'DEP-2024-001'
                },
                {
                    id: 'txn-002',
                    type: 'WITHDRAWAL',
                    amount: 25000,
                    date: new Date(Date.now() - 7200000),
                    description: 'Retrait en espèces',
                    status: 'COMPLETED',
                    from: 'Wallet Client',
                    to: 'Jean Ndayishimiye',
                    reference: 'WTH-2024-001'
                },
                {
                    id: 'txn-003',
                    type: 'DEPOSIT',
                    amount: 75000,
                    date: new Date(Date.now() - 14400000),
                    description: 'Dépôt virement bancaire',
                    status: 'COMPLETED',
                    from: 'Jean Ndayishimiye',
                    to: 'Wallet Client',
                    reference: 'DEP-2024-002'
                },
                {
                    id: 'txn-004',
                    type: 'WITHDRAWAL',
                    amount: 30000,
                    date: new Date(Date.now() - 36000000),
                    description: 'Retrait ATM',
                    status: 'COMPLETED',
                    from: 'Wallet Client',
                    to: 'Jean Ndayishimiye',
                    reference: 'WTH-2024-002'
                },
                {
                    id: 'txn-005',
                    type: 'DEPOSIT',
                    amount: 100000,
                    date: new Date(Date.now() - 72000000),
                    description: 'Dépôt chèque',
                    status: 'PENDING',
                    from: 'Jean Ndayishimiye',
                    to: 'Wallet Client',
                    reference: 'DEP-2024-003'
                }
            ];
        };
        UsersFundComponent_1.prototype.generateAgentTransactions = function () {
            var transactions = [];
            var types = ['TRANSFER', 'DEPOSIT', 'WITHDRAWAL'];
            var statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING'];
            var amounts = [25000, 50000, 30000, 75000, 40000, 60000, 20000];
            var descriptions = [
                'Transfert vers client',
                'Dépôt client',
                'Retrait client',
                'Transfert entre agents',
                'Dépôt en espèces',
                'Retrait ATM',
                'Transfert commission'
            ];
            for (var i = 1; i <= 12; i++) {
                var typeIndex = i % types.length;
                var statusIndex = i % statuses.length;
                var amountIndex = i % amounts.length;
                var descIndex = i % descriptions.length;
                var clientIndex = i % this.clientNames.length;
                var type = types[typeIndex] || 'TRANSFER';
                var status_1 = statuses[statusIndex] || 'COMPLETED';
                var amount = amounts[amountIndex] || 25000;
                var from = i % 2 === 0 ? 'Jean Ndayishimiye' : this.clientNames[clientIndex] || 'Client';
                var to = i % 2 === 0 ? this.clientNames[clientIndex] || 'Client' : 'Jean Ndayishimiye';
                var commission = type === 'TRANSFER' ? Math.round(amount * 0.02) : Math.round(amount * 0.01);
                transactions.push({
                    id: "txn-".concat(String(i).padStart(3, '0')),
                    type: type,
                    amount: amount,
                    date: new Date(Date.now() - (i * 3600000 * 2)),
                    description: "".concat(descriptions[descIndex] || 'Transaction', " ").concat(this.clientNames[clientIndex] || 'Client'),
                    status: status_1,
                    from: from,
                    to: to,
                    reference: "".concat(type === 'TRANSFER' ? 'TXN' : type === 'DEPOSIT' ? 'DEP' : 'WTH', "-2024-").concat(String(i).padStart(3, '0')),
                    commission: commission
                });
            }
            return transactions;
        };
        UsersFundComponent_1.prototype.generateAgentCommissions = function () {
            var commissions = [];
            var commissionAmounts = [500, 1000, 750, 1250, 600, 800, 950, 1100];
            for (var i = 1; i <= 8; i++) {
                var amountIndex = i % commissionAmounts.length;
                var clientIndex = i % this.clientNames.length;
                var amount = commissionAmounts[amountIndex] || 500;
                var from = this.clientNames[clientIndex] || 'Client';
                commissions.push({
                    id: "com-".concat(String(i).padStart(3, '0')),
                    amount: amount,
                    date: new Date(Date.now() - (i * 3600000 * 3)),
                    from: from,
                    forTransaction: "TXN-2024-".concat(String(i).padStart(3, '0')),
                    type: 'RECEIVE',
                    status: i % 5 === 0 ? 'PENDING' : 'COMPLETED'
                });
            }
            return commissions;
        };
        UsersFundComponent_1.prototype.generateSuperAgentTransactions = function () {
            var transactions = [];
            var types = ['TRANSFER', 'DEPOSIT'];
            var statuses = ['COMPLETED', 'COMPLETED', 'PENDING'];
            var amounts = [150000, 200000, 100000, 250000, 80000, 120000, 180000];
            for (var i = 1; i <= 10; i++) {
                var typeIndex = i % types.length;
                var statusIndex = i % statuses.length;
                var amountIndex = i % amounts.length;
                var agentIndex = i % this.agentNames.length;
                var type = types[typeIndex] || 'TRANSFER';
                var status_2 = statuses[statusIndex] || 'COMPLETED';
                var amount = amounts[amountIndex] || 150000;
                var from = i % 2 === 0 ? 'Jean Ndayishimiye' : this.agentNames[agentIndex] || 'Agent';
                var to = i % 2 === 0 ? this.agentNames[agentIndex] || 'Agent' : 'Jean Ndayishimiye';
                var commission = Math.round(amount * 0.02);
                transactions.push({
                    id: "txn-SA-".concat(String(i).padStart(3, '0')),
                    type: type,
                    amount: amount,
                    date: new Date(Date.now() - (i * 3600000 * 2.5)),
                    description: "".concat(type === 'TRANSFER' ? 'Transfert vers' : 'Dépôt de', " ").concat(this.agentNames[agentIndex] || 'Agent'),
                    status: status_2,
                    from: from,
                    to: to,
                    reference: "".concat(type === 'TRANSFER' ? 'TXN' : 'DEP', "-SA-2024-").concat(String(i).padStart(3, '0')),
                    commission: commission
                });
            }
            return transactions;
        };
        UsersFundComponent_1.prototype.generateSuperAgentCommissions = function () {
            var commissions = [];
            var commissionAmounts = [2000, 3000, 1500, 2500, 1800, 2200, 2800];
            for (var i = 1; i <= 7; i++) {
                var amountIndex = i % commissionAmounts.length;
                var agentIndex = i % this.agentNames.length;
                var amount = commissionAmounts[amountIndex] || 2000;
                var from = this.agentNames[agentIndex] || 'Agent';
                commissions.push({
                    id: "com-SA-".concat(String(i).padStart(3, '0')),
                    amount: amount,
                    date: new Date(Date.now() - (i * 3600000 * 3.5)),
                    from: from,
                    forTransaction: "TXN-SA-2024-".concat(String(i).padStart(3, '0')),
                    type: 'RECEIVE',
                    status: i % 4 === 0 ? 'PENDING' : 'COMPLETED'
                });
            }
            return commissions;
        };
        UsersFundComponent_1.prototype.generateFundHistory = function () {
            var reasons = ['Perte de fonds', 'Fuite de transaction', 'Erreur de rechargement', 'Ajustement commission'];
            var descriptions = [
                'Réapprovisionnement après perte de transaction',
                'Correction suite à une fuite de fonds',
                'Ajustement pour erreur de rechargement',
                'Réapprovisionnement commission'
            ];
            var amounts = [100000, 50000, 75000, 25000, 150000, 30000];
            var history = [];
            for (var i = 1; i <= 6; i++) {
                var reasonIndex = i % reasons.length;
                var descIndex = i % descriptions.length;
                var amountIndex = i % amounts.length;
                history.push({
                    id: "fund-".concat(String(i).padStart(3, '0')),
                    amount: amounts[amountIndex] || 50000,
                    date: new Date(Date.now() - (i * 3600000 * 6)),
                    reason: reasons[reasonIndex] || 'Autre',
                    description: descriptions[descIndex] || 'Réapprovisionnement',
                    status: i % 5 === 0 ? 'PENDING' : 'COMPLETED',
                    adminName: 'Admin IBLOPAY'
                });
            }
            return history;
        };
        UsersFundComponent_1.prototype.calculateStats = function () {
            this.totalTransactions = this.transactions.length;
            this.totalCommissions = this.commissions.reduce(function (sum, c) { return sum + c.amount; }, 0);
            this.totalFunds = this.fundHistory.reduce(function (sum, f) { return sum + f.amount; }, 0);
        };
        UsersFundComponent_1.prototype.goBack = function () {
            this.location.back();
        };
        // ─── APPROVISIONNEMENT ────────────────────────────────────
        UsersFundComponent_1.prototype.onSubmitFund = function () {
            var _this = this;
            if (this.fundForm.invalid) {
                this.fundForm.markAllAsTouched();
                return;
            }
            if (!this.user)
                return;
            this.fundLoading = true;
            this.fundError = '';
            this.fundSuccess = '';
            var formData = this.fundForm.value;
            var amount = Number(formData.amount);
            var reason = formData.reason;
            setTimeout(function () {
                var fundEntry = {
                    id: "fund-".concat(Date.now()),
                    amount: amount,
                    date: new Date(),
                    reason: reason,
                    description: formData.description || '',
                    status: 'COMPLETED',
                    adminName: 'Admin IBLOPAY'
                };
                _this.fundHistory.unshift(fundEntry);
                _this.user.walletBalance += amount;
                _this.transactions.unshift({
                    id: "txn-".concat(Date.now()),
                    type: 'FUND',
                    amount: amount,
                    date: new Date(),
                    description: reason || 'Réapprovisionnement du wallet',
                    status: 'COMPLETED',
                    reference: "FUND-".concat(Date.now())
                });
                _this.calculateStats();
                _this.fundLoading = false;
                _this.fundSuccess = "\u2705 ".concat(amount.toLocaleString(), " Fbu cr\u00E9dit\u00E9s avec succ\u00E8s !");
                _this.fundForm.reset({
                    amount: '',
                    reason: '',
                    description: ''
                });
                setTimeout(function () {
                    _this.fundSuccess = '';
                }, 3000);
            }, 1500);
        };
        Object.defineProperty(UsersFundComponent_1.prototype, "filteredTransactions", {
            // ─── FILTRES ──────────────────────────────────────────────
            get: function () {
                if (!this.transactionFilter)
                    return this.transactions;
                var term = this.transactionFilter.toLowerCase();
                return this.transactions.filter(function (t) {
                    var _a, _b, _c;
                    return t.description.toLowerCase().includes(term) ||
                        ((_a = t.reference) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) ||
                        ((_b = t.from) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(term)) ||
                        ((_c = t.to) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(term));
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersFundComponent_1.prototype, "filteredCommissions", {
            get: function () {
                if (!this.commissionFilter)
                    return this.commissions;
                var term = this.commissionFilter.toLowerCase();
                return this.commissions.filter(function (c) {
                    return c.from.toLowerCase().includes(term) ||
                        c.forTransaction.toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersFundComponent_1.prototype, "allTransactions", {
            // ─── MÉTHODES POUR L'HISTORIQUE COMPLET ──────────────────
            get: function () {
                return this.transactions;
            },
            enumerable: false,
            configurable: true
        });
        UsersFundComponent_1.prototype.getDeposits = function () {
            return this.transactions.filter(function (t) { return t.type === 'DEPOSIT'; });
        };
        UsersFundComponent_1.prototype.getWithdrawals = function () {
            return this.transactions.filter(function (t) { return t.type === 'WITHDRAWAL'; });
        };
        UsersFundComponent_1.prototype.getTransfers = function () {
            return this.transactions.filter(function (t) { return t.type === 'TRANSFER'; });
        };
        UsersFundComponent_1.prototype.getTotalDeposits = function () {
            return this.getDeposits().reduce(function (sum, t) { return sum + t.amount; }, 0);
        };
        UsersFundComponent_1.prototype.getTotalWithdrawals = function () {
            return this.getWithdrawals().reduce(function (sum, t) { return sum + t.amount; }, 0);
        };
        UsersFundComponent_1.prototype.getTotalTransfers = function () {
            return this.getTransfers().reduce(function (sum, t) { return sum + t.amount; }, 0);
        };
        // ─── MÉTHODES UTILITAIRES ─────────────────────────────────
        UsersFundComponent_1.prototype.getFieldError = function (fieldName) {
            var control = this.fundForm.get(fieldName);
            if (!control || !control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Ce champ est requis';
            if (control.errors['min'])
                return 'Le montant minimum est de 100 Fbu';
            return 'Valeur invalide';
        };
        UsersFundComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat(firstName.charAt(0)).concat(lastName.charAt(0)).toUpperCase();
        };
        UsersFundComponent_1.prototype.getAvatarColor = function (id) {
            var colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#4f46e5';
        };
        UsersFundComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'SUSPENDED': 'Suspendu',
                'FROZEN': 'Gelé',
                'CLOSED': 'Fermé'
            };
            return labels[status] || status;
        };
        UsersFundComponent_1.prototype.getStatusClass = function (status) {
            return "status-".concat(status.toLowerCase());
        };
        UsersFundComponent_1.prototype.getRoleLabel = function (role) {
            var labels = {
                'CLIENT': 'Client',
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || role;
        };
        UsersFundComponent_1.prototype.getRoleClass = function (role) {
            return "role-".concat(role.toLowerCase().replace('_', '-'));
        };
        UsersFundComponent_1.prototype.getTransactionTypeLabel = function (type) {
            var labels = {
                'TRANSFER': 'Transfert',
                'DEPOSIT': 'Dépôt',
                'WITHDRAWAL': 'Retrait',
                'FUND': 'Approvisionnement',
                'COMMISSION': 'Commission'
            };
            return labels[type] || type;
        };
        UsersFundComponent_1.prototype.getTransactionTypeClass = function (type) {
            var classes = {
                'TRANSFER': 'type-transfer',
                'DEPOSIT': 'type-deposit',
                'WITHDRAWAL': 'type-withdrawal',
                'FUND': 'type-fund',
                'COMMISSION': 'type-commission'
            };
            return classes[type] || '';
        };
        UsersFundComponent_1.prototype.getTransactionStatusClass = function (status) {
            var classes = {
                'COMPLETED': 'status-completed',
                'PENDING': 'status-pending',
                'FAILED': 'status-failed'
            };
            return classes[status] || '';
        };
        UsersFundComponent_1.prototype.getTransactionStatusLabel = function (status) {
            var labels = {
                'COMPLETED': '✅ Complété',
                'PENDING': '⏳ En attente',
                'FAILED': '❌ Échoué'
            };
            return labels[status] || status;
        };
        UsersFundComponent_1.prototype.getCommissionStatusClass = function (status) {
            return "commission-".concat(status.toLowerCase());
        };
        UsersFundComponent_1.prototype.getCommissionStatusLabel = function (status) {
            var labels = {
                'COMPLETED': '✅ Validée',
                'PENDING': '⏳ En attente'
            };
            return labels[status] || status;
        };
        UsersFundComponent_1.prototype.getFundReasonLabel = function (reason) {
            var labels = {
                'Perte de fonds': '💰 Perte de fonds',
                'Fuite de transaction': '🔒 Fuite de transaction',
                'Erreur de rechargement': '🔄 Erreur de rechargement',
                'Ajustement commission': '📊 Ajustement commission',
                'Autre': '📝 Autre'
            };
            return labels[reason] || reason;
        };
        UsersFundComponent_1.prototype.getFundStatusClass = function (status) {
            return "fund-".concat(status.toLowerCase());
        };
        UsersFundComponent_1.prototype.getFundStatusLabel = function (status) {
            var labels = {
                'COMPLETED': '✅ Complété',
                'PENDING': '⏳ En attente',
                'FAILED': '❌ Échoué'
            };
            return labels[status] || status;
        };
        UsersFundComponent_1.prototype.formatDate = function (date) {
            return new Date(date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        UsersFundComponent_1.prototype.formatCurrency = function (amount) {
            return amount.toLocaleString('fr-FR') + ' Fbu';
        };
        // ─── ACTIONS ──────────────────────────────────────────────
        UsersFundComponent_1.prototype.onFund = function () {
            // Déjà dans l'onglet approprié
        };
        return UsersFundComponent_1;
    }());
    __setFunctionName(_classThis, "UsersFundComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersFundComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersFundComponent = _classThis;
}();
export { UsersFundComponent };
//# sourceMappingURL=users-fund.component.js.map