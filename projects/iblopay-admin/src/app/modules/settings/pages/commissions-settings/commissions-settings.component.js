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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
var CommissionsSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-commissions-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './commissions-settings.component.html',
            styleUrls: ['./commissions-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommissionsSettingsComponent = _classThis = /** @class */ (function () {
        function CommissionsSettingsComponent_1() {
            this.title = 'Gestion des Commissions';
            this.icon = '💵';
            this.pageSize = 100;
            this.STORAGE_KEY = 'commissions_data_v2';
            this.agents = [];
            this.commissions = [];
            this.historique = [];
            this.transfertsEtat = [];
            this.toastSeq = 0;
            this.activeTab = 'dashboard';
            this.modalOpen = false;
            this.modalTitle = '';
            this.modalType = '';
            this.modalIcon = '';
            this.selectedItem = null;
            this.formData = {};
            this.toasts = [];
            this.pinCode = '';
            this.showPinModal = false;
            this.currentPages = {
                commissions: 1,
                historique: 1,
                transferts: 1,
                agents: 1,
                super_agents: 1
            };
            this.tabs = [
                { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
                { key: 'agents', label: 'Agents', icon: '👤' },
                { key: 'super_agents', label: 'Super Agents', icon: '⭐' },
                { key: 'etat', label: 'État', icon: '🏛️' },
                { key: 'commissions', label: 'Commissions', icon: '💰' },
                { key: 'historique', label: 'Historique', icon: '📋' },
                { key: 'transferts', label: 'Transferts État', icon: '🏦' }
            ];
            this.loadData();
            this.initializeData();
        }
        CommissionsSettingsComponent_1.prototype.ngOnInit = function () {
            this.updateCounts();
        };
        // ========== GENERATION DES NOMS ==========
        CommissionsSettingsComponent_1.prototype.generateAgentNames = function (count, prefix, role) {
            var prenoms = [
                'Pierre', 'Claire', 'Jean-Bosco', 'Marie', 'Emmanuel', 'David', 'Esther', 'Fabrice',
                'Gracieuse', 'Hervé', 'Isabelle', 'Jean-Pierre', 'Karine', 'Léonard', 'Martine',
                'Noël', 'Odette', 'Patrick', 'Rose', 'Samuel', 'Thérèse', 'Urbain', 'Valérie',
                'William', 'Xavier', 'Yvonne', 'Zacharie', 'Anne', 'Benoît', 'Céline', 'Alain',
                'Bernadette', 'Charles', 'Dominique', 'Emilie', 'Françoise', 'Gisèle', 'Henri',
                'Inès', 'Jacques', 'Katherine', 'Louis', 'Madeleine', 'Nicolas', 'Odile',
                'Philippe', 'Quentin', 'Rachel', 'Stéphane', 'Ursula', 'Victor', 'Wendy',
                'Xénia', 'Yves', 'Zoé', 'Antoine', 'Béatrice', 'Christophe', 'Diane', 'Éric',
                'Florence', 'Gérard', 'Hélène', 'Irène', 'Joël', 'Laurence', 'Michel',
                'Nathalie', 'Olivier', 'Pascale', 'René', 'Sandrine', 'Thierry', 'Véronique'
            ];
            var noms = [
                'NIZIGIYIMANA', 'NDIKUMANA', 'NSABIMANA', 'NTAKIRUTIMANA', 'NDAYISABA',
                'NIYONKURU', 'HAKIZIMANA', 'NIBITANGA', 'NDAYIZEYE', 'KARORERO',
                'MANIRAKIZA', 'NIMUBONA', 'NISHIMWE', 'NTIRANDEKURA', 'NZAJIMANA',
                'BIGIRIMANA', 'BUCUMI', 'HABONIMANA', 'HATEGEKIMANA', 'IRAKOZE',
                'KABAYIZA', 'KAMANA', 'MANIRAKIZA', 'MPOZENZI', 'MUNYAKAZI',
                'NAHAYO', 'NDAYISENGA', 'NDIKUMANA', 'NIBISHAKA', 'NIMUBONA'
            ];
            var result = [];
            var prefixId = prefix === 'AG' ? 'AG' : 'SA';
            for (var i = 1; i <= count; i++) {
                var prenomIndex = (i - 1) % prenoms.length;
                var nomIndex = (i - 1) % noms.length;
                var id = "".concat(prefixId, "-").concat(String(100 + i).padStart(3, '0'));
                var nom = "".concat(prenoms[prenomIndex], " ").concat(noms[nomIndex]);
                result.push({ id: id, nom: nom });
            }
            return result;
        };
        // ========== INITIALISATION ==========
        CommissionsSettingsComponent_1.prototype.initializeData = function () {
            if (this.agents.length > 0)
                return;
            var agentsData = [];
            // 100 Agents normaux
            var agentNames = this.generateAgentNames(100, 'AG', 'agent');
            for (var i = 0; i < agentNames.length; i++) {
                var a = agentNames[i];
                if (a) {
                    var solde = 50000 + Math.floor(Math.random() * 450000);
                    agentsData.push({
                        id: a.id,
                        nom: a.nom,
                        role: 'agent',
                        email: "".concat(a.nom.toLowerCase().replace(' ', '.'), "@email.com"),
                        telephone: "+257 79 ".concat(String(100 + i).padStart(3, '0'), " ").concat(String(100 + i * 3).padStart(3, '0')),
                        dateCreation: "2024-".concat(String(1 + (i % 12)).padStart(2, '0'), "-").concat(String(1 + (i % 28)).padStart(2, '0')),
                        solde: solde,
                        transactions: 0
                    });
                }
            }
            // 100 Super Agents
            var superAgentNames = this.generateAgentNames(100, 'SA', 'super_agent');
            for (var i = 0; i < superAgentNames.length; i++) {
                var a = superAgentNames[i];
                if (a) {
                    var solde = 200000 + Math.floor(Math.random() * 800000);
                    agentsData.push({
                        id: a.id,
                        nom: a.nom,
                        role: 'super_agent',
                        email: "".concat(a.nom.toLowerCase().replace(' ', '.'), "@super.email.com"),
                        telephone: "+257 79 ".concat(String(200 + i).padStart(3, '0'), " ").concat(String(200 + i * 3).padStart(3, '0')),
                        dateCreation: "2024-".concat(String(1 + (i % 12)).padStart(2, '0'), "-").concat(String(1 + (i % 28)).padStart(2, '0')),
                        solde: solde,
                        transactions: 0
                    });
                }
            }
            // État
            agentsData.push({
                id: 'ET-001',
                nom: 'Trésor Public - État',
                role: 'etat',
                email: 'tresor@finance.gov.bi',
                telephone: '+257 22 123 456',
                dateCreation: '2024-01-01',
                solde: 0,
                transactions: 0
            });
            this.agents = agentsData.map(function (a) { return (__assign(__assign({}, a), { commissionTotal: 0, volumeTotal: 0, statut: 'actif' })); });
            this.generateCommissions();
            this.generateTransfertsInitiaux();
            this.saveData();
        };
        CommissionsSettingsComponent_1.prototype.generateCommissions = function () {
            var _this = this;
            var agents = this.agents.filter(function (a) { return a.role !== 'etat'; });
            var statuts = ['calculee', 'payee', 'en_attente'];
            agents.forEach(function (agent) {
                var nbCommissions = 2 + Math.floor(Math.random() * 4);
                var totalCommission = 0;
                var totalVolume = 0;
                for (var i = 0; i < nbCommissions; i++) {
                    var nbTransactions = 3 + Math.floor(Math.random() * 30);
                    var volume = 20000 + Math.floor(Math.random() * 500000);
                    var taux = agent.role === 'super_agent' ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3;
                    var montant = volume * (taux / 100);
                    var commissionEtat = montant * 0.1;
                    var statusIndex = i % statuts.length;
                    var commission = {
                        id: "COM-".concat(String(100000 + _this.commissions.length + 1).padStart(6, '0')),
                        agentId: agent.id,
                        agentNom: agent.nom,
                        agentRole: agent.role,
                        nbTransactions: nbTransactions,
                        volume: volume,
                        taux: Math.round(taux * 10) / 10,
                        montant: Math.round(montant),
                        statut: statuts[statusIndex] || 'en_attente',
                        date: new Date(Date.now() - (i * 86400000 * 2)).toLocaleDateString('fr-FR'),
                        commissionEtat: Math.round(commissionEtat)
                    };
                    _this.commissions.push(commission);
                    totalCommission += montant;
                    totalVolume += volume;
                }
                var agentIndex = _this.agents.findIndex(function (a) { return a.id === agent.id; });
                if (agentIndex !== -1) {
                    var agentToUpdate = _this.agents[agentIndex];
                    if (agentToUpdate) {
                        agentToUpdate.commissionTotal = Math.round(totalCommission);
                        agentToUpdate.volumeTotal = totalVolume;
                        agentToUpdate.transactions = nbCommissions;
                    }
                }
            });
            var etat = this.agents.find(function (a) { return a.role === 'etat'; });
            if (etat) {
                var totalEtat = this.commissions.reduce(function (sum, c) { return sum + (c.commissionEtat || 0); }, 0);
                etat.solde = totalEtat;
                etat.volumeTotal = totalEtat;
                etat.transactions = this.commissions.filter(function (c) { return c.statut === 'payee'; }).length;
            }
            this.generateHistorique();
        };
        CommissionsSettingsComponent_1.prototype.generateHistorique = function () {
            var _this = this;
            var agents = this.agents.filter(function (a) { return a.role !== 'etat'; });
            var statuts = ['effectue', 'effectue', 'en_attente', 'echoue'];
            agents.forEach(function (agent) {
                for (var i = 0; i < 2; i++) {
                    var commission = _this.commissions.find(function (c) { return c.agentId === agent.id; });
                    if (commission) {
                        var statusIndex = i % statuts.length;
                        _this.historique.push({
                            id: "HIS-".concat(String(100000 + _this.historique.length + 1).padStart(6, '0')),
                            date: new Date(Date.now() - (i * 86400000 * 3)).toLocaleDateString('fr-FR'),
                            agentId: agent.id,
                            agentNom: agent.nom,
                            agentRole: agent.role,
                            montant: commission.montant * (0.5 + Math.random() * 0.5),
                            type: agent.role === 'super_agent' ? 'commission_super' : 'commission_agent',
                            reference: "REF-".concat(String(100000 + _this.historique.length + 1).padStart(6, '0')),
                            statut: statuts[statusIndex] || 'effectue',
                            description: "Commission ".concat(agent.role === 'super_agent' ? 'Super ' : '').concat(agent.nom)
                        });
                    }
                }
            });
        };
        CommissionsSettingsComponent_1.prototype.generateTransfertsInitiaux = function () {
            for (var i = 0; i < 5; i++) {
                var montant = 30000 + Math.random() * 150000;
                this.transfertsEtat.push({
                    id: "TRF-".concat(String(100000 + i + 1).padStart(6, '0')),
                    date: new Date(Date.now() - (i * 86400000 * 5)).toLocaleDateString('fr-FR'),
                    montant: Math.round(montant),
                    reference: "REF-ETAT-".concat(String(100000 + i + 1).padStart(6, '0')),
                    statut: i === 0 ? 'en_attente' : 'effectue',
                    description: "Transfert des commissions \u00C9tat (".concat(2 + i, " commissions)"),
                    source: 'Commissions payées',
                    destination: 'compte_etat',
                    commissionIds: ["COM-".concat(String(100000 + i + 1).padStart(6, '0'))]
                });
            }
        };
        // ========== DATA PERSISTENCE ==========
        CommissionsSettingsComponent_1.prototype.loadData = function () {
            var saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try {
                    var data = JSON.parse(saved);
                    if (data.agents)
                        this.agents = data.agents;
                    if (data.commissions)
                        this.commissions = data.commissions;
                    if (data.historique)
                        this.historique = data.historique;
                    if (data.transferts)
                        this.transfertsEtat = data.transferts;
                }
                catch (e) {
                    console.error('Erreur de chargement des données', e);
                }
            }
        };
        CommissionsSettingsComponent_1.prototype.saveData = function () {
            var data = {
                agents: this.agents,
                commissions: this.commissions,
                historique: this.historique,
                transferts: this.transfertsEtat
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        };
        // ========== GETTERS ==========
        CommissionsSettingsComponent_1.prototype.getAgents = function () {
            return this.agents.filter(function (a) { return a.role === 'agent'; });
        };
        CommissionsSettingsComponent_1.prototype.getSuperAgents = function () {
            return this.agents.filter(function (a) { return a.role === 'super_agent'; });
        };
        CommissionsSettingsComponent_1.prototype.getEtat = function () {
            return this.agents.filter(function (a) { return a.role === 'etat'; });
        };
        CommissionsSettingsComponent_1.prototype.getCommissions = function () {
            return this.commissions;
        };
        CommissionsSettingsComponent_1.prototype.getHistorique = function () {
            return this.historique.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        };
        CommissionsSettingsComponent_1.prototype.getTransfertsEtat = function () {
            return this.transfertsEtat.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        };
        // ========== PAGINATION ==========
        CommissionsSettingsComponent_1.prototype.getCurrentPage = function (type) {
            return this.currentPages[type] || 1;
        };
        CommissionsSettingsComponent_1.prototype.getTotalPages = function (type) {
            var items = [];
            switch (type) {
                case 'commissions':
                    items = this.getCommissions();
                    break;
                case 'historique':
                    items = this.getHistorique();
                    break;
                case 'transferts':
                    items = this.getTransfertsEtat();
                    break;
                case 'agents':
                    items = this.getAgents();
                    break;
                case 'super_agents':
                    items = this.getSuperAgents();
                    break;
                default: return 1;
            }
            return Math.ceil(items.length / this.pageSize);
        };
        CommissionsSettingsComponent_1.prototype.getPaginatedItems = function (type) {
            var page = this.currentPages[type] || 1;
            var start = (page - 1) * this.pageSize;
            var items = [];
            switch (type) {
                case 'commissions':
                    items = this.getCommissions();
                    break;
                case 'historique':
                    items = this.getHistorique();
                    break;
                case 'transferts':
                    items = this.getTransfertsEtat();
                    break;
                case 'agents':
                    items = this.getAgents();
                    break;
                case 'super_agents':
                    items = this.getSuperAgents();
                    break;
                default: return [];
            }
            return items.slice(start, start + this.pageSize);
        };
        CommissionsSettingsComponent_1.prototype.nextPage = function (type) {
            var total = this.getTotalPages(type);
            var current = this.currentPages[type] || 1;
            if (current < total)
                this.currentPages[type] = current + 1;
        };
        CommissionsSettingsComponent_1.prototype.prevPage = function (type) {
            var current = this.currentPages[type] || 1;
            if (current > 1)
                this.currentPages[type] = current - 1;
        };
        CommissionsSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPages[tab] = 1;
        };
        CommissionsSettingsComponent_1.prototype.updateCounts = function () {
            var _this = this;
            this.tabs = this.tabs.map(function (tab) {
                switch (tab.key) {
                    case 'commissions': return __assign(__assign({}, tab), { count: _this.commissions.length });
                    case 'historique': return __assign(__assign({}, tab), { count: _this.historique.length });
                    case 'transferts': return __assign(__assign({}, tab), { count: _this.transfertsEtat.length });
                    case 'agents': return __assign(__assign({}, tab), { count: _this.getAgents().length });
                    case 'super_agents': return __assign(__assign({}, tab), { count: _this.getSuperAgents().length });
                    default: return tab;
                }
            });
        };
        // ========== KPI DATA ==========
        CommissionsSettingsComponent_1.prototype.getKpiData = function () {
            var totalCommissions = this.commissions.reduce(function (sum, c) { return sum + c.montant; }, 0);
            var totalPayees = this.commissions.filter(function (c) { return c.statut === 'payee'; }).length;
            var totalEnAttente = this.commissions.filter(function (c) { return c.statut === 'en_attente'; }).length;
            var totalEtat = this.commissions.reduce(function (sum, c) { return sum + (c.commissionEtat || 0); }, 0);
            var totalAgents = this.getAgents().length;
            var totalSuperAgents = this.getSuperAgents().length;
            var totalTransferts = this.transfertsEtat.reduce(function (sum, t) { return sum + t.montant; }, 0);
            return [
                {
                    icon: '💰',
                    label: 'Total Com.',
                    value: totalCommissions.toLocaleString('fr-FR') + ' BIF',
                    color: '#1a1a2e',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: '+12%'
                },
                {
                    icon: '✅',
                    label: 'Payées',
                    value: totalPayees.toString(),
                    color: '#2e7d32',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalPayees)
                },
                {
                    icon: '⏳',
                    label: 'Attente',
                    value: totalEnAttente.toString(),
                    color: '#e65100',
                    textColor: '#ffffff',
                    trend: 'down',
                    trendValue: "".concat(totalEnAttente)
                },
                {
                    icon: '🏛️',
                    label: 'État',
                    value: totalEtat.toLocaleString('fr-FR') + ' BIF',
                    color: '#1a237e',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalTransferts.toLocaleString('fr-FR'))
                },
                {
                    icon: '👤',
                    label: 'Agents',
                    value: totalAgents.toString(),
                    color: '#1a237e',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalAgents)
                },
                {
                    icon: '⭐',
                    label: 'Super A.',
                    value: totalSuperAgents.toString(),
                    color: '#4a148c',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalSuperAgents)
                }
            ];
        };
        // ========== PIN MODAL ==========
        CommissionsSettingsComponent_1.prototype.openPinModal = function () {
            this.pinCode = '';
            this.showPinModal = true;
        };
        CommissionsSettingsComponent_1.prototype.addPinDigit = function (digit) {
            if (this.pinCode.length < 4) {
                this.pinCode += digit.toString();
            }
        };
        CommissionsSettingsComponent_1.prototype.clearPin = function () {
            this.pinCode = '';
        };
        CommissionsSettingsComponent_1.prototype.confirmPin = function () {
            if (this.pinCode === '1234') {
                this.showPinModal = false;
                this.openTransfertEtat();
            }
            else {
                this.toast('Code PIN incorrect. Veuillez réessayer.', 'danger');
                this.pinCode = '';
            }
        };
        CommissionsSettingsComponent_1.prototype.closePinModal = function () {
            this.showPinModal = false;
            this.pinCode = '';
        };
        // ========== TRANSFERT VERS L'ÉTAT ==========
        CommissionsSettingsComponent_1.prototype.openTransfertEtat = function () {
            var commissionsPayees = this.commissions.filter(function (c) { return c.statut === 'payee' && c.commissionEtat && c.commissionEtat > 0; });
            this.modalType = 'transfert_etat';
            this.modalTitle = '🏦 Transférer à l\'État';
            this.modalIcon = '🏦';
            this.formData = {
                commissions: commissionsPayees
            };
            this.modalOpen = true;
        };
        CommissionsSettingsComponent_1.prototype.transfererVersEtat = function () {
            var commissionsToTransfer = this.commissions.filter(function (c) { return c.statut === 'payee' && c.commissionEtat && c.commissionEtat > 0; });
            if (commissionsToTransfer.length === 0) {
                this.toast('Aucune commission à transférer à l\'État.', 'warning');
                return;
            }
            var totalMontant = commissionsToTransfer.reduce(function (sum, c) { return sum + (c.commissionEtat || 0); }, 0);
            var transfert = {
                id: "TRF-".concat(String(100000 + this.transfertsEtat.length + 1).padStart(6, '0')),
                date: new Date().toLocaleDateString('fr-FR'),
                montant: Math.round(totalMontant),
                reference: "REF-ETAT-".concat(String(100000 + this.transfertsEtat.length + 1).padStart(6, '0')),
                statut: 'effectue',
                description: "Transfert des commissions \u00C9tat (".concat(commissionsToTransfer.length, " commissions)"),
                source: 'Commissions payées',
                destination: 'compte_etat',
                commissionIds: commissionsToTransfer.map(function (c) { return c.id; })
            };
            this.transfertsEtat.push(transfert);
            var etat = this.agents.find(function (a) { return a.role === 'etat'; });
            if (etat) {
                etat.solde = (etat.solde || 0) + totalMontant;
            }
            this.historique.push({
                id: "HIS-".concat(String(100000 + this.historique.length + 1).padStart(6, '0')),
                date: new Date().toLocaleDateString('fr-FR'),
                agentId: 'ET-001',
                agentNom: 'Trésor Public - État',
                agentRole: 'etat',
                montant: Math.round(totalMontant),
                type: 'transfert_etat',
                reference: transfert.reference,
                statut: 'effectue',
                description: "Transfert de ".concat(Math.round(totalMontant).toLocaleString('fr-FR'), " BIF vers le compte \u00C9tat")
            });
            this.saveData();
            this.updateCounts();
            this.toast("Transfert de ".concat(Math.round(totalMontant).toLocaleString('fr-FR'), " BIF vers l'\u00C9tat effectu\u00E9 avec succ\u00E8s."), 'success');
            this.closeModal();
        };
        // ========== MODALES ==========
        CommissionsSettingsComponent_1.prototype.openVoirCommission = function (item) {
            this.selectedItem = item;
            this.modalType = 'voir_commission';
            this.modalTitle = '👁️ Détails de la Commission';
            this.modalIcon = '👁️';
            this.modalOpen = true;
        };
        CommissionsSettingsComponent_1.prototype.openPayerCommission = function (item) {
            this.selectedItem = item;
            this.modalType = 'payer_commission';
            this.modalTitle = '💵 Payer la Commission';
            this.modalIcon = '💵';
            this.formData = { methode: 'wallet', reference: '', commentaire: '' };
            this.modalOpen = true;
        };
        CommissionsSettingsComponent_1.prototype.openVoirHistorique = function (item) {
            this.selectedItem = item;
            this.modalType = 'voir_historique';
            this.modalTitle = '📋 Détails de l\'Historique';
            this.modalIcon = '📋';
            this.modalOpen = true;
        };
        CommissionsSettingsComponent_1.prototype.openVoirTransfert = function (item) {
            this.selectedItem = item;
            this.modalType = 'voir_transfert';
            this.modalTitle = '🏦 Détails du Transfert';
            this.modalIcon = '🏦';
            this.modalOpen = true;
        };
        CommissionsSettingsComponent_1.prototype.closeModal = function () {
            this.modalOpen = false;
            this.selectedItem = null;
        };
        CommissionsSettingsComponent_1.prototype.confirmModal = function () {
            switch (this.modalType) {
                case 'transfert_etat':
                    this.transfererVersEtat();
                    break;
                case 'payer_commission':
                    this.payerCommission();
                    break;
            }
            this.closeModal();
        };
        CommissionsSettingsComponent_1.prototype.payerCommission = function () {
            if (!this.selectedItem)
                return;
            this.selectedItem.statut = 'payee';
            this.historique.push({
                id: "HIS-".concat(String(100000 + this.historique.length + 1).padStart(6, '0')),
                date: new Date().toLocaleDateString('fr-FR'),
                agentId: this.selectedItem.agentId,
                agentNom: this.selectedItem.agentNom,
                agentRole: this.selectedItem.agentRole,
                montant: this.selectedItem.montant,
                type: this.selectedItem.agentRole === 'super_agent' ? 'commission_super' : 'commission_agent',
                reference: this.formData.reference || "PAY-".concat(String(100000 + this.historique.length + 1).padStart(6, '0')),
                statut: 'effectue',
                description: "Paiement commission ".concat(this.selectedItem.agentNom)
            });
            this.saveData();
            this.updateCounts();
            this.toast("Commission pay\u00E9e \u00E0 ".concat(this.selectedItem.agentNom), 'success');
        };
        // ========== TOASTS ==========
        CommissionsSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        CommissionsSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        // ========== MÉTHODES POUR LE TEMPLATE ==========
        CommissionsSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                calculee: '✅ Calculée',
                payee: '💵 Payée',
                en_attente: '⏳ En attente',
                effectue: '✅ Effectué',
                echoue: '❌ Échoué',
                actif: '✅ Actif',
                inactif: '⛔ Inactif'
            };
            return labels[statut] || statut;
        };
        CommissionsSettingsComponent_1.prototype.getRoleLabel = function (role) {
            var labels = {
                agent: '👤 Agent',
                super_agent: '⭐ Super Agent',
                etat: '🏛️ État'
            };
            return labels[role] || role;
        };
        CommissionsSettingsComponent_1.prototype.getTypeLabel = function (type) {
            var labels = {
                commission_agent: 'Commission Agent',
                commission_super: 'Commission Super Agent',
                commission_etat: 'Commission État',
                transfert_etat: 'Transfert État'
            };
            return labels[type] || type;
        };
        CommissionsSettingsComponent_1.prototype.getMontantTotal = function (type) {
            switch (type) {
                case 'agent': return this.getAgents().reduce(function (sum, a) { return sum + a.commissionTotal; }, 0);
                case 'super': return this.getSuperAgents().reduce(function (sum, a) { return sum + a.commissionTotal; }, 0);
                case 'etat': return this.commissions.reduce(function (sum, c) { return sum + (c.commissionEtat || 0); }, 0);
                default: return 0;
            }
        };
        CommissionsSettingsComponent_1.prototype.getNombreTransactions = function (type) {
            switch (type) {
                case 'agent': return this.getAgents().reduce(function (sum, a) { return sum + a.transactions; }, 0);
                case 'super': return this.getSuperAgents().reduce(function (sum, a) { return sum + a.transactions; }, 0);
                case 'etat': return this.commissions.filter(function (c) { return c.statut === 'payee'; }).length;
                default: return 0;
            }
        };
        CommissionsSettingsComponent_1.prototype.getTransfertsCount = function () {
            return this.transfertsEtat.length;
        };
        CommissionsSettingsComponent_1.prototype.getTotalTransfertsFormatted = function () {
            var total = this.transfertsEtat.reduce(function (sum, t) { return sum + t.montant; }, 0);
            return total.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getTotalCommissionsEtatFormatted = function () {
            var _a;
            var total = ((_a = this.formData.commissions) === null || _a === void 0 ? void 0 : _a.reduce(function (sum, c) { return sum + (c.commissionEtat || 0); }, 0)) || 0;
            return total.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getNbCommissionsPayees = function () {
            var _a;
            return ((_a = this.formData.commissions) === null || _a === void 0 ? void 0 : _a.length) || 0;
        };
        CommissionsSettingsComponent_1.prototype.hasCommissionsPayees = function () {
            return this.formData.commissions && this.formData.commissions.length > 0;
        };
        CommissionsSettingsComponent_1.prototype.getTransfertMontant = function (transfert) {
            return transfert.montant.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getCommissionEtatMontant = function (commission) {
            return (commission.commissionEtat || 0).toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getAgentSolde = function (agent) {
            return agent.solde.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getAgentCommissionTotal = function (agent) {
            return agent.commissionTotal.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getAgentVolumeTotal = function (agent) {
            return agent.volumeTotal.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getCommissionMontant = function (commission) {
            return commission.montant.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getCommissionVolume = function (commission) {
            return commission.volume.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getHistoriqueMontant = function (historique) {
            return historique.montant.toLocaleString('fr-FR');
        };
        CommissionsSettingsComponent_1.prototype.getDetailInfo = function (detail, field) {
            return detail[field] || 'N/A';
        };
        return CommissionsSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "CommissionsSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionsSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionsSettingsComponent = _classThis;
}();
export { CommissionsSettingsComponent };
//# sourceMappingURL=commissions-settings.component.js.map