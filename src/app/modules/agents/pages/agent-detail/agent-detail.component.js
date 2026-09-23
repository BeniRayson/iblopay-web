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
// src/app/modules/agents/pages/agent-detail/agent-detail.component.ts
import { Component } from '@angular/core';
var AgentDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-detail',
            templateUrl: './agent-detail.component.html',
            styleUrls: ['./agent-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentDetailComponent = _classThis = /** @class */ (function () {
        function AgentDetailComponent_1(route, router, agentService) {
            this.route = route;
            this.router = router;
            this.agentService = agentService;
            this.agent = null;
            this.isLoading = true;
            this.isDarkMode = false;
            this.activeTab = 'profile';
            this.selectedSubAgent = null;
            this.showTransactionsModal = false;
            // Variables pour les filtres
            this.movementSearchTerm = '';
            this.depositSearchTerm = '';
            this.commissionSearchTerm = '';
            this.colorPalette = [
                ['#4f46e5', '#7c3aed'],
                ['#ec4899', '#f43f5e'],
                ['#8b5cf6', '#6d28d9'],
                ['#3b82f6', '#2563eb'],
                ['#10b981', '#059669'],
                ['#f59e0b', '#d97706'],
                ['#ef4444', '#dc2626'],
                ['#14b8a6', '#0d9488']
            ];
            // Cartes pour les agents
            this.agentCards = {
                '2': 'CARTE-AG-2024-001',
                '3': 'CARTE-AG-2024-002',
                '4': 'CARTE-AG-2024-003',
                '5': 'CARTE-AG-2024-004',
                '6': 'CARTE-AG-2024-005',
                '7': 'CARTE-AG-2024-006',
                '8': 'CARTE-AG-2024-007',
                '9': 'CARTE-AG-2024-008',
                '10': 'CARTE-AG-2024-009',
                '11': 'CARTE-AG-2024-010',
                '12': 'CARTE-AG-2024-011',
                '13': 'CARTE-AG-2024-012',
                '14': 'CARTE-AG-2024-013',
                '15': 'CARTE-AG-2024-014',
                '16': 'CARTE-AG-2024-015',
                '17': 'CARTE-AG-2024-016',
                '18': 'CARTE-AG-2024-017',
                '19': 'CARTE-AG-2024-018',
                '20': 'CARTE-AG-2024-019',
                '21': 'CARTE-AG-2024-020',
                '22': 'CARTE-AG-2024-021',
                '23': 'CARTE-AG-2024-022',
                '24': 'CARTE-AG-2024-023',
                '25': 'CARTE-AG-2024-024',
                '26': 'CARTE-AG-2024-025',
                '27': 'CARTE-AG-2024-026',
                '28': 'CARTE-AG-2024-027',
                '29': 'CARTE-AG-2024-028',
                '30': 'CARTE-AG-2024-029',
                '31': 'CARTE-AG-2024-030'
            };
        }
        AgentDetailComponent_1.prototype.ngOnInit = function () {
            var id = this.route.snapshot.paramMap.get('id');
            if (id)
                this.loadAgent(id);
            this.loadTheme();
        };
        AgentDetailComponent_1.prototype.loadTheme = function () {
            var saved = localStorage.getItem('iblopay-theme');
            if (saved === 'light') {
                this.isDarkMode = false;
                document.body.classList.add('light-mode');
            }
        };
        AgentDetailComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('light-mode');
            localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
        };
        AgentDetailComponent_1.prototype.loadAgent = function (id) {
            var _this = this;
            this.isLoading = true;
            this.agentService.getAgentById(id).subscribe({
                next: function (data) {
                    var _a;
                    _this.agent = data;
                    _this.isLoading = false;
                    console.log('Agents affiliés:', (_a = _this.agent) === null || _a === void 0 ? void 0 : _a.agents);
                },
                error: function () {
                    _this.isLoading = false;
                    _this.router.navigate(['/agents']);
                }
            });
        };
        Object.defineProperty(AgentDetailComponent_1.prototype, "filteredAgentsForMovement", {
            // ================================================================
            // FILTRE POUR LES MOUVEMENTS
            // ================================================================
            get: function () {
                var _this = this;
                var _a;
                if (!((_a = this.agent) === null || _a === void 0 ? void 0 : _a.agents))
                    return [];
                if (!this.movementSearchTerm.trim())
                    return this.agent.agents;
                var term = this.movementSearchTerm.toLowerCase().trim();
                return this.agent.agents.filter(function (sub) {
                    return sub.firstName.toLowerCase().includes(term) ||
                        sub.lastName.toLowerCase().includes(term) ||
                        sub.code.toLowerCase().includes(term) ||
                        _this.getAgentCardNumber(sub.id).toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        AgentDetailComponent_1.prototype.onMovementSearch = function (event) {
            this.movementSearchTerm = event.target.value;
        };
        AgentDetailComponent_1.prototype.clearMovementSearch = function () {
            this.movementSearchTerm = '';
            var input = document.querySelector('.search-filter input');
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        };
        Object.defineProperty(AgentDetailComponent_1.prototype, "filteredDeposits", {
            // ================================================================
            // FILTRE POUR LES DÉPÔTS
            // ================================================================
            get: function () {
                var _this = this;
                var _a;
                if (!((_a = this.agent) === null || _a === void 0 ? void 0 : _a.deposits))
                    return [];
                if (!this.depositSearchTerm.trim())
                    return this.agent.deposits;
                var term = this.depositSearchTerm.toLowerCase().trim();
                return this.agent.deposits.filter(function (d) {
                    return d.agentName.toLowerCase().includes(term) ||
                        d.reference.toLowerCase().includes(term) ||
                        _this.getDepositCardNumber(d.agentId).toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        AgentDetailComponent_1.prototype.onDepositSearch = function (event) {
            this.depositSearchTerm = event.target.value;
        };
        AgentDetailComponent_1.prototype.clearDepositSearch = function () {
            this.depositSearchTerm = '';
            var input = document.querySelector('.search-filter input');
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        };
        Object.defineProperty(AgentDetailComponent_1.prototype, "filteredAgentsForCommission", {
            // ================================================================
            // FILTRE POUR LES COMMISSIONS
            // ================================================================
            get: function () {
                var _this = this;
                var _a;
                if (!((_a = this.agent) === null || _a === void 0 ? void 0 : _a.agents))
                    return [];
                if (!this.commissionSearchTerm.trim())
                    return this.agent.agents;
                var term = this.commissionSearchTerm.toLowerCase().trim();
                return this.agent.agents.filter(function (sub) {
                    return sub.firstName.toLowerCase().includes(term) ||
                        sub.lastName.toLowerCase().includes(term) ||
                        sub.code.toLowerCase().includes(term) ||
                        _this.getAgentCardNumber(sub.id).toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        AgentDetailComponent_1.prototype.onCommissionSearch = function (event) {
            this.commissionSearchTerm = event.target.value;
        };
        AgentDetailComponent_1.prototype.clearCommissionSearch = function () {
            this.commissionSearchTerm = '';
            var input = document.querySelector('.search-filter input');
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        };
        // ================================================================
        // MÉTHODES UTILITAIRES
        // ================================================================
        AgentDetailComponent_1.prototype.getColor = function (id, index) {
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            var colorIndex = Math.abs(hash % this.colorPalette.length);
            var colorPair = this.colorPalette[colorIndex];
            if (colorPair && colorPair.length > 0) {
                var selectedIndex = index % colorPair.length;
                return colorPair[selectedIndex] || '#4f46e5';
            }
            return index % 2 === 0 ? '#4f46e5' : '#7c3aed';
        };
        AgentDetailComponent_1.prototype.getAgentCardNumber = function (agentId) {
            return this.agentCards[agentId] || 'CARTE-NON-TROUVEE';
        };
        AgentDetailComponent_1.prototype.getTotalSentAmount = function (agentId) {
            var _a, _b;
            if (!this.agent)
                return 0;
            var subAgent = (_a = this.agent.agents) === null || _a === void 0 ? void 0 : _a.find(function (a) { return a.id === agentId; });
            if (!subAgent)
                return 0;
            return ((_b = subAgent.transactions) === null || _b === void 0 ? void 0 : _b.reduce(function (sum, t) { return sum + t.amount; }, 0)) || 0;
        };
        AgentDetailComponent_1.prototype.getCommissionReceived = function (agentId) {
            var _a, _b;
            if (!this.agent)
                return 0;
            var subAgent = (_a = this.agent.agents) === null || _a === void 0 ? void 0 : _a.find(function (a) { return a.id === agentId; });
            if (!subAgent)
                return 0;
            var total = ((_b = subAgent.transactions) === null || _b === void 0 ? void 0 : _b.reduce(function (sum, t) { return sum + t.amount; }, 0)) || 0;
            return Math.round(total * 0.02);
        };
        AgentDetailComponent_1.prototype.getInitialsAgent = function (name) {
            if (!name)
                return '?';
            var parts = name.split(' ');
            return parts.map(function (p) { return p.charAt(0); }).join('').toUpperCase().substring(0, 2);
        };
        AgentDetailComponent_1.prototype.getDepositCardNumber = function (agentId) {
            return this.agentCards[agentId] || 'CARTE-DEP-001';
        };
        AgentDetailComponent_1.prototype.getTotalCommissions = function () {
            var _this = this;
            if (!this.agent || !this.agent.agents)
                return 0;
            var total = 0;
            this.agent.agents.forEach(function (sub) {
                total += _this.getCommissionReceived(sub.id);
            });
            return total;
        };
        AgentDetailComponent_1.prototype.goBack = function () {
            this.router.navigate(['/agents']);
        };
        AgentDetailComponent_1.prototype.setTab = function (tab) {
            this.activeTab = tab;
        };
        AgentDetailComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'PENDING': 'En attente',
                'SUSPENDED': 'Suspendu',
                'BLOCKED': 'Bloqué',
                'INACTIVE': 'Inactif'
            };
            return labels[status] || status;
        };
        AgentDetailComponent_1.prototype.getStatusClass = function (status) {
            var classes = {
                'ACTIVE': 'active',
                'PENDING': 'pending',
                'SUSPENDED': 'suspended',
                'BLOCKED': 'blocked',
                'INACTIVE': 'inactive'
            };
            return classes[status] || '';
        };
        AgentDetailComponent_1.prototype.getTransactionTypeIcon = function (type) {
            var icons = {
                'DEPOSIT': 'fa-arrow-down',
                'TRANSFER': 'fa-exchange-alt',
                'WITHDRAWAL': 'fa-arrow-up'
            };
            return icons[type] || 'fa-circle';
        };
        AgentDetailComponent_1.prototype.getTransactionTypeLabel = function (type) {
            var labels = {
                'DEPOSIT': 'Dépôt',
                'TRANSFER': 'Transfert',
                'WITHDRAWAL': 'Retrait'
            };
            return labels[type] || type;
        };
        AgentDetailComponent_1.prototype.getTransactionTypeClass = function (type) {
            var classes = {
                'DEPOSIT': 'deposit',
                'TRANSFER': 'transfer',
                'WITHDRAWAL': 'withdrawal'
            };
            return classes[type] || '';
        };
        AgentDetailComponent_1.prototype.getTransactionStatusLabel = function (status) {
            var labels = {
                'PENDING': 'En attente',
                'COMPLETED': 'Complété',
                'FAILED': 'Échoué',
                'CANCELLED': 'Annulé'
            };
            return labels[status] || status;
        };
        AgentDetailComponent_1.prototype.getTransactionStatusClass = function (status) {
            var classes = {
                'PENDING': 'pending',
                'COMPLETED': 'completed',
                'FAILED': 'failed',
                'CANCELLED': 'cancelled'
            };
            return classes[status] || '';
        };
        AgentDetailComponent_1.prototype.getElectronicStatusClass = function (status) {
            var classes = {
                'ACTIVE': 'active',
                'INACTIVE': 'inactive',
                'MAINTENANCE': 'maintenance',
                'LOST': 'lost'
            };
            return classes[status] || '';
        };
        AgentDetailComponent_1.prototype.getElectronicStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'INACTIVE': 'Inactif',
                'MAINTENANCE': 'En maintenance',
                'LOST': 'Perdu'
            };
            return labels[status] || status;
        };
        AgentDetailComponent_1.prototype.getElectronicTypeLabel = function (type) {
            var labels = {
                'PHONE': 'Téléphone',
                'TABLET': 'Tablette',
                'POS_TERMINAL': 'Terminal POS',
                'OTHER': 'Autre'
            };
            return labels[type] || type;
        };
        AgentDetailComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat((firstName === null || firstName === void 0 ? void 0 : firstName.charAt(0)) || '').concat((lastName === null || lastName === void 0 ? void 0 : lastName.charAt(0)) || '').toUpperCase();
        };
        AgentDetailComponent_1.prototype.getDepositStatusLabel = function (status) {
            var labels = {
                'PENDING': 'En attente',
                'COMPLETED': 'Complété',
                'FAILED': 'Échoué'
            };
            return labels[status] || status;
        };
        AgentDetailComponent_1.prototype.getDepositStatusClass = function (status) {
            var classes = {
                'PENDING': 'pending',
                'COMPLETED': 'completed',
                'FAILED': 'failed'
            };
            return classes[status] || '';
        };
        AgentDetailComponent_1.prototype.viewSubAgentTransactions = function (subAgent) {
            this.selectedSubAgent = subAgent;
            this.showTransactionsModal = true;
        };
        AgentDetailComponent_1.prototype.closeTransactionsModal = function () {
            this.showTransactionsModal = false;
            this.selectedSubAgent = null;
        };
        return AgentDetailComponent_1;
    }());
    __setFunctionName(_classThis, "AgentDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentDetailComponent = _classThis;
}();
export { AgentDetailComponent };
//# sourceMappingURL=agent-detail.component.js.map