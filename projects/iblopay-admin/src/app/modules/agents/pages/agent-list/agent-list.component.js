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
// src/app/modules/agents/pages/agent-list/agent-list.component.ts
import { Component } from '@angular/core';
var AgentListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-list',
            templateUrl: './agent-list.component.html',
            styleUrls: ['./agent-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentListComponent = _classThis = /** @class */ (function () {
        function AgentListComponent_1(agentService, router) {
            this.agentService = agentService;
            this.router = router;
            this.agents = [];
            this.filteredAgents = [];
            this.isLoading = false;
            this.searchTerm = '';
            this.selectedStatus = '';
            this.isDarkMode = false;
            this.showNotifications = false;
            // ─── Modal OTP ──────────────────────────────
            this.showOtpModal = false;
            this.otpCode = '';
            this.otpError = '';
            this.otpLoading = false;
            this.otpCooldown = 0;
            this.otpCanResend = false;
            this.agentToBlock = null;
            this.blockAction = 'bloquer';
            this.notifications = [
                {
                    id: 1,
                    title: 'Nouveau Super Agent',
                    message: 'Jean Mukiza a été ajouté comme Super Agent',
                    type: 'success',
                    time: 'Il y a 5 minutes',
                    read: false
                },
                {
                    id: 2,
                    title: 'Transaction importante',
                    message: 'Une transaction de 5 000 000 Fbu a été effectuée',
                    type: 'info',
                    time: 'Il y a 15 minutes',
                    read: false
                },
                {
                    id: 3,
                    title: 'Agent bloqué',
                    message: 'Henry Muhirwa a été bloqué suite à une fraude',
                    type: 'error',
                    time: 'Il y a 1 heure',
                    read: false
                },
                {
                    id: 4,
                    title: 'Mise à jour système',
                    message: 'Le système sera mis à jour le 15/07/2024 à 02:00',
                    type: 'warning',
                    time: 'Il y a 2 heures',
                    read: false
                }
            ];
            this.stats = {
                total: 0,
                active: 0,
                pending: 0,
                blocked: 0,
                totalElectronics: 0,
                totalElectronicsAmount: 0,
                totalAgents: 0,
                totalDeposits: 0,
                totalDepositAmount: 0,
                totalTransactionAmount: 0
            };
            this.statuses = [
                { value: '', label: 'Tous les statuts' },
                { value: 'ACTIVE', label: 'Actif' },
                { value: 'PENDING', label: 'En attente' },
                { value: 'SUSPENDED', label: 'Suspendu' },
                { value: 'BLOCKED', label: 'Bloqué' },
                { value: 'INACTIVE', label: 'Inactif' }
            ];
            this.currentPage = 1;
            this.itemsPerPage = 10;
        }
        AgentListComponent_1.prototype.ngOnInit = function () {
            this.loadAgents();
            this.loadTheme();
        };
        AgentListComponent_1.prototype.ngOnDestroy = function () {
            this.clearOtpTimer();
        };
        AgentListComponent_1.prototype.loadTheme = function () {
            var saved = localStorage.getItem('iblopay-theme');
            if (saved === 'dark') {
                this.isDarkMode = true;
                document.body.classList.add('dark-mode');
            }
        };
        AgentListComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
        };
        AgentListComponent_1.prototype.toggleNotifications = function () {
            this.showNotifications = !this.showNotifications;
        };
        AgentListComponent_1.prototype.markAllRead = function () {
            this.notifications.forEach(function (n) { return n.read = true; });
        };
        AgentListComponent_1.prototype.removeNotification = function (id) {
            this.notifications = this.notifications.filter(function (n) { return n.id !== id; });
        };
        AgentListComponent_1.prototype.loadAgents = function () {
            var _this = this;
            this.isLoading = true;
            this.agentService.getAgents().subscribe({
                next: function (data) {
                    _this.agents = data;
                    _this.filteredAgents = data;
                    _this.isLoading = false;
                    _this.loadStats();
                },
                error: function () {
                    _this.isLoading = false;
                }
            });
        };
        AgentListComponent_1.prototype.loadStats = function () {
            var _this = this;
            this.agentService.getAgentStats().subscribe({
                next: function (stats) {
                    var totalElectronicsAmount = 0;
                    _this.agents.forEach(function (agent) {
                        var _a;
                        (_a = agent.electronics) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                            totalElectronicsAmount += e.amountInCirculation || 0;
                        });
                    });
                    _this.stats = __assign(__assign({}, stats), { totalElectronicsAmount: totalElectronicsAmount });
                }
            });
        };
        AgentListComponent_1.prototype.applyFilters = function () {
            var _this = this;
            this.filteredAgents = this.agents.filter(function (agent) {
                var searchLower = _this.searchTerm.toLowerCase().trim();
                var matchesSearch = _this.searchTerm === '' ||
                    agent.firstName.toLowerCase().includes(searchLower) ||
                    agent.lastName.toLowerCase().includes(searchLower) ||
                    agent.phone.includes(searchLower) ||
                    agent.cardNumber.toLowerCase().includes(searchLower) ||
                    agent.code.toLowerCase().includes(searchLower) ||
                    agent.address.completeAddress.toLowerCase().includes(searchLower);
                var matchesStatus = _this.selectedStatus === '' || agent.status === _this.selectedStatus;
                return matchesSearch && matchesStatus;
            });
            this.currentPage = 1;
        };
        AgentListComponent_1.prototype.onSearch = function (event) {
            this.searchTerm = event.target.value;
            this.applyFilters();
        };
        AgentListComponent_1.prototype.onStatusChange = function (event) {
            this.selectedStatus = event.target.value;
            this.applyFilters();
        };
        AgentListComponent_1.prototype.resetFilters = function () {
            this.searchTerm = '';
            this.selectedStatus = '';
            this.applyFilters();
        };
        AgentListComponent_1.prototype.viewAgent = function (agent) {
            this.router.navigate(['/agents', agent.id]);
        };
        AgentListComponent_1.prototype.createAgent = function () {
            this.router.navigate(['/agents/create']);
        };
        // ─── Approvisionnement - Redirection vers page dédiée ───────
        /**
         * Ouvre la page d'approvisionnement pour un agent spécifique
         * @param agent L'agent à approvisionner
         */
        AgentListComponent_1.prototype.openFunding = function (agent) {
            this.router.navigate(['/agents', agent.id, 'approvisionnement']);
        };
        // ─── OTP Modal pour blocage/déblocage ───────
        AgentListComponent_1.prototype.openBlockOtpModal = function (agent) {
            this.agentToBlock = agent;
            this.blockAction = agent.status === 'BLOCKED' ? 'débloquer' : 'bloquer';
            this.otpCode = '';
            this.otpError = '';
            this.showOtpModal = true;
            this.sendOtpSimulation();
        };
        AgentListComponent_1.prototype.closeOtpModal = function () {
            this.showOtpModal = false;
            this.agentToBlock = null;
            this.otpCode = '';
            this.otpError = '';
            this.otpLoading = false;
            this.clearOtpTimer();
        };
        AgentListComponent_1.prototype.sendOtpSimulation = function () {
            this.otpCooldown = 30;
            this.otpCanResend = false;
            this.startOtpTimer();
            console.log('[SIMULATION] Code OTP envoyé : 123456');
        };
        AgentListComponent_1.prototype.startOtpTimer = function () {
            var _this = this;
            this.clearOtpTimer();
            this.otpTimerInterval = setInterval(function () {
                if (_this.otpCooldown > 0) {
                    _this.otpCooldown--;
                }
                else {
                    _this.otpCanResend = true;
                    _this.clearOtpTimer();
                }
            }, 1000);
        };
        AgentListComponent_1.prototype.clearOtpTimer = function () {
            if (this.otpTimerInterval) {
                clearInterval(this.otpTimerInterval);
                this.otpTimerInterval = null;
            }
        };
        AgentListComponent_1.prototype.resendOtp = function () {
            if (!this.otpCanResend)
                return;
            this.otpError = '';
            this.sendOtpSimulation();
        };
        AgentListComponent_1.prototype.verifyOtpAndBlock = function () {
            var _this = this;
            if (!this.otpCode || this.otpCode.length < 4) {
                this.otpError = 'Veuillez entrer le code OTP reçu';
                return;
            }
            this.otpLoading = true;
            this.otpError = '';
            setTimeout(function () {
                if (_this.otpCode === '123456') {
                    _this.executeBlock();
                }
                else {
                    _this.otpLoading = false;
                    _this.otpError = 'Code OTP invalide. Veuillez réessayer.';
                }
            }, 1000);
        };
        AgentListComponent_1.prototype.executeBlock = function () {
            var _this = this;
            if (!this.agentToBlock) {
                this.otpLoading = false;
                return;
            }
            var agent = this.agentToBlock;
            var newStatus = agent.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
            this.agentService.updateAgent(agent.id, { status: newStatus }).subscribe({
                next: function () {
                    _this.otpLoading = false;
                    _this.closeOtpModal();
                    _this.loadAgents();
                    _this.notifications.unshift({
                        id: Date.now(),
                        title: "Agent ".concat(_this.blockAction === 'bloquer' ? 'bloqué' : 'débloqué'),
                        message: "".concat(agent.firstName, " ").concat(agent.lastName, " a \u00E9t\u00E9 ").concat(_this.blockAction === 'bloquer' ? 'bloqué' : 'débloqué', " avec succ\u00E8s"),
                        type: _this.blockAction === 'bloquer' ? 'error' : 'success',
                        time: 'À l\'instant',
                        read: false
                    });
                },
                error: function () {
                    _this.otpLoading = false;
                    _this.otpError = 'Erreur lors du blocage/déblocage';
                }
            });
        };
        AgentListComponent_1.prototype.getTotalElectronicsAmount = function (agent) {
            if (!agent.electronics || agent.electronics.length === 0) {
                return 0;
            }
            return agent.electronics.reduce(function (total, e) { return total + (e.amountInCirculation || 0); }, 0);
        };
        AgentListComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'PENDING': 'En attente',
                'SUSPENDED': 'Suspendu',
                'BLOCKED': 'Bloqué',
                'INACTIVE': 'Inactif'
            };
            return labels[status] || status;
        };
        AgentListComponent_1.prototype.getStatusClass = function (status) {
            var classes = {
                'ACTIVE': 'active',
                'PENDING': 'pending',
                'SUSPENDED': 'suspended',
                'BLOCKED': 'blocked',
                'INACTIVE': 'inactive'
            };
            return classes[status] || '';
        };
        AgentListComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat((firstName === null || firstName === void 0 ? void 0 : firstName.charAt(0)) || '').concat((lastName === null || lastName === void 0 ? void 0 : lastName.charAt(0)) || '').toUpperCase();
        };
        Object.defineProperty(AgentListComponent_1.prototype, "paginatedAgents", {
            get: function () {
                var start = (this.currentPage - 1) * this.itemsPerPage;
                var end = start + this.itemsPerPage;
                return this.filteredAgents.slice(start, end);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgentListComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filteredAgents.length / this.itemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        AgentListComponent_1.prototype.changePage = function (direction) {
            if (direction === 'prev' && this.currentPage > 1) {
                this.currentPage--;
            }
            else if (direction === 'next' && this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        };
        AgentListComponent_1.prototype.goToPage = function (page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        };
        AgentListComponent_1.prototype.getStartIndex = function () {
            return this.filteredAgents.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
        };
        AgentListComponent_1.prototype.getEndIndex = function () {
            return Math.min(this.currentPage * this.itemsPerPage, this.filteredAgents.length);
        };
        return AgentListComponent_1;
    }());
    __setFunctionName(_classThis, "AgentListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentListComponent = _classThis;
}();
export { AgentListComponent };
//# sourceMappingURL=agent-list.component.js.map