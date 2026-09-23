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
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CLIENTS, AGENTS, SUPER_AGENTS, PROVINCE_NAMES, communesOf, zonesOf, collinesOf } from './users-mock-data';
var QUICK_ACTION_IDS = new Set(['modifier', 'suspendre', 'reactiver', 'supprimer']);
var UsersSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-users-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './users-settings.component.html',
            styleUrls: ['./users-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _fileInput_decorators;
    var _fileInput_initializers = [];
    var _fileInput_extraInitializers = [];
    var UsersSettingsComponent = _classThis = /** @class */ (function () {
        function UsersSettingsComponent_1() {
            this.fileInput = __runInitializers(this, _fileInput_initializers, void 0);
            this.title = (__runInitializers(this, _fileInput_extraInitializers), 'Gestion des utilisateurs');
            this.icon = '👥';
            this.currentYear = new Date().getFullYear();
            this.today = new Date();
            this.Math = Math;
            this.tabs = [
                { key: 'clients', label: 'Clients', icon: '🧑' },
                { key: 'agents', label: 'Agents', icon: '🧍' },
                { key: 'super-agents', label: 'Super Agents', icon: '🧑‍💼' }
            ];
            this.activeTab = 'clients';
            this.clients = __spreadArray([], CLIENTS, true);
            this.agents = __spreadArray([], AGENTS, true);
            this.superAgents = __spreadArray([], SUPER_AGENTS, true);
            this.searchTerm = '';
            this.statutFilter = 'tous';
            this.kycFilter = 'tous';
            this.currentPage = 1;
            this.pageSize = 8;
            this.openMenuId = null;
            this.drawerOpen = false;
            this.drawerUser = null;
            this.drawerType = null;
            this.drawerTab = 'infos';
            this.folderOpen = false;
            this.wizardOpen = false;
            this.wizardMode = 'create';
            this.wizardData = {};
            this.wizardStep = 0;
            this.otpSent = false;
            this.otpVerified = false;
            this.otpGenerated = '';
            this.otpInput = '';
            this.otpError = false;
            this.editingUser = null;
            this.provinces = PROVINCE_NAMES;
            this.confirm = null;
            this.toasts = [];
            this.toastSeq = 0;
            // ---------- Réaffectation ----------
            this.assignModalOpen = false;
            this.assignTargetUser = null;
            this.assignTargetSuperAgentId = '';
        }
        Object.defineProperty(UsersSettingsComponent_1.prototype, "rawList", {
            get: function () {
                switch (this.activeTab) {
                    case 'clients': return this.clients;
                    case 'agents': return this.agents;
                    case 'super-agents': return this.superAgents;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "filteredList", {
            get: function () {
                var _this = this;
                var term = this.searchTerm.trim().toLowerCase();
                return this.rawList.filter(function (u) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    var matchesTerm = !term ||
                        ((_a = u.nom) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) ||
                        ((_b = u.id) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(term)) ||
                        ((_c = u.telephone) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(term)) ||
                        ((_d = u.email) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(term)) ||
                        ((_e = u.cni) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(term)) ||
                        ((_f = u.numeroCarte) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes(term));
                    var matchesStatut = _this.statutFilter === 'tous' || u.statut === _this.statutFilter;
                    var matchesKyc = _this.kycFilter === 'tous' || ((_g = u.kycLevel) === null || _g === void 0 ? void 0 : _g.toString()) === _this.kycFilter;
                    return matchesTerm && matchesStatut && matchesKyc;
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "paginatedList", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.filteredList.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "pageNumbers", {
            get: function () {
                return Array.from({ length: this.totalPages }, function (_, i) { return i + 1; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "activeTabLabel", {
            get: function () {
                var _this = this;
                var _a, _b;
                return (_b = (_a = this.tabs.find(function (t) { return t.key === _this.activeTab; })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : '';
            },
            enumerable: false,
            configurable: true
        });
        UsersSettingsComponent_1.prototype.setTab = function (tab) {
            this.activeTab = tab;
            this.searchTerm = '';
            this.statutFilter = 'tous';
            this.kycFilter = 'tous';
            this.currentPage = 1;
            this.openMenuId = null;
        };
        UsersSettingsComponent_1.prototype.goToPage = function (p) {
            if (p >= 1 && p <= this.totalPages)
                this.currentPage = p;
        };
        UsersSettingsComponent_1.prototype.onFilterChange = function () {
            this.currentPage = 1;
        };
        UsersSettingsComponent_1.prototype.initials = function (nom) {
            return (nom || '')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(function (w) { var _a; return (_a = w[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase(); })
                .join('');
        };
        UsersSettingsComponent_1.prototype.actionsFor = function (user) {
            switch (this.activeTab) {
                case 'clients':
                    return [
                        { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
                        user.statut === 'suspendu'
                            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
                            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
                        { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
                        { label: 'Réinitialiser le PIN', actionId: 'reset_pin', icon: '🔢' },
                        { label: "Vérifier l'identité (KYC)", actionId: 'verifier_kyc', icon: '🪪' },
                        { label: 'Consulter le portefeuille', actionId: 'voir_wallet', icon: '👛' },
                        { label: 'Consulter les cartes', actionId: 'voir_cartes', icon: '💳' },
                        { label: 'Historique des transactions', actionId: 'voir_historique', icon: '📋' },
                        { label: 'Journal des connexions', actionId: 'voir_connexions', icon: '📶' }
                    ];
                case 'agents':
                    return [
                        { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
                        user.statut === 'suspendu'
                            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
                            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
                        { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
                        { label: 'Dossier officiel', actionId: 'voir_documents', icon: '📁' },
                        { label: 'Limites journalières', actionId: 'voir_limites', icon: '📏' },
                        { label: 'Performance', actionId: 'voir_performance', icon: '📈' },
                        { label: 'Historique des commissions', actionId: 'voir_commissions', icon: '💵' },
                        { label: 'Changer de Super Agent', actionId: 'changer_super_agent', icon: '🔀' }
                    ];
                case 'super-agents':
                    return [
                        { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
                        user.statut === 'suspendu'
                            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
                            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
                        { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
                        { label: 'Dossier officiel', actionId: 'voir_documents', icon: '📁' },
                        { label: 'Performance', actionId: 'voir_performance', icon: '📈' },
                        { label: 'Historique des commissions', actionId: 'voir_commissions', icon: '💵' },
                        { label: 'Voir tous les agents', actionId: 'voir_agents', icon: '🧍' },
                        { label: 'Gestion des stocks', actionId: 'voir_stocks', icon: '📦' }
                    ];
            }
        };
        UsersSettingsComponent_1.prototype.moreActionsFor = function (user) {
            return this.actionsFor(user).filter(function (a) { return !QUICK_ACTION_IDS.has(a.actionId); });
        };
        UsersSettingsComponent_1.prototype.toggleMenu = function (id) {
            this.openMenuId = this.openMenuId === id ? null : id;
        };
        UsersSettingsComponent_1.prototype.toggleFolder = function () {
            this.folderOpen = !this.folderOpen;
        };
        UsersSettingsComponent_1.prototype.handleAction = function (user, actionId) {
            var _this = this;
            this.openMenuId = null;
            switch (actionId) {
                case 'modifier':
                    this.openEditFlow(user);
                    break;
                case 'suspendre':
                    this.confirmAction('Suspendre ce compte', "Confirmer la suspension de \u00AB ".concat(user.nom, " \u00BB (").concat(user.id, ") ? Le compte perdra l'acc\u00E8s imm\u00E9diatement."), true, function () { return _this.setStatut(user, 'suspendu'); });
                    break;
                case 'reactiver':
                    this.setStatut(user, 'actif');
                    this.toast("\u00AB ".concat(user.nom, " \u00BB a \u00E9t\u00E9 r\u00E9activ\u00E9."), 'success');
                    break;
                case 'supprimer':
                    this.confirmAction('Archiver ce compte', "\u00AB ".concat(user.nom, " \u00BB (").concat(user.id, ") sera archiv\u00E9 et retir\u00E9 des listes actives. Cette action est r\u00E9versible depuis le filtre \u00AB Archiv\u00E9 \u00BB."), true, function () { return _this.setStatut(user, 'archive'); });
                    break;
                case 'reset_pin':
                    this.toast("PIN r\u00E9initialis\u00E9 pour ".concat(user.nom, ". Un SMS a \u00E9t\u00E9 envoy\u00E9 au ").concat(user.telephone, "."), 'info');
                    break;
                case 'reset_password':
                    this.toast("Mot de passe r\u00E9initialis\u00E9 pour ".concat(user.nom, "."), 'info');
                    break;
                case 'verifier_kyc': {
                    var c = user;
                    if (c.kycLevel < 3) {
                        c.kycLevel = Math.min(3, c.kycLevel + 1);
                        this.toast("KYC de ".concat(user.nom, " mis \u00E0 jour : niveau ").concat(c.kycLevel, "."), 'success');
                    }
                    else {
                        this.toast("KYC de ".concat(user.nom, " est d\u00E9j\u00E0 au niveau maximum (3)."), 'info');
                    }
                    break;
                }
                case 'voir_wallet':
                case 'voir_cartes':
                case 'voir_beneficiaires':
                case 'voir_historique':
                case 'voir_connexions':
                case 'voir_limites':
                case 'voir_soldes':
                case 'voir_performance':
                case 'voir_commissions':
                case 'voir_documents':
                case 'voir_agents':
                case 'voir_stocks':
                    this.openDrawer(user, this.mapActionToDrawerTab(actionId));
                    break;
                case 'changer_super_agent':
                    this.openAssignModal(user);
                    break;
                default:
                    this.toast("Action \"".concat(actionId, "\" d\u00E9clench\u00E9e pour ").concat(user.nom), 'info');
            }
        };
        UsersSettingsComponent_1.prototype.mapActionToDrawerTab = function (actionId) {
            var _a;
            var map = {
                voir_wallet: 'wallet',
                voir_cartes: 'cartes',
                voir_beneficiaires: 'beneficiaires',
                voir_historique: 'historique',
                voir_connexions: 'connexions',
                voir_limites: 'limites',
                voir_soldes: 'infos',
                voir_performance: 'performance',
                voir_commissions: 'commissions',
                voir_documents: 'documents',
                voir_agents: 'reseau',
                voir_stocks: 'stocks'
            };
            return (_a = map[actionId]) !== null && _a !== void 0 ? _a : 'infos';
        };
        UsersSettingsComponent_1.prototype.setStatut = function (user, statut) {
            user.statut = statut;
            if (statut === 'suspendu') {
                this.toast("\u00AB ".concat(user.nom, " \u00BB a \u00E9t\u00E9 suspendu."), 'danger');
            }
            else if (statut === 'archive') {
                this.toast("\u00AB ".concat(user.nom, " \u00BB a \u00E9t\u00E9 archiv\u00E9."), 'danger');
            }
        };
        UsersSettingsComponent_1.prototype.drawerTabsFor = function (type) {
            switch (type) {
                case 'clients':
                    return [
                        { key: 'infos', label: 'Infos' },
                        { key: 'wallet', label: 'Wallet' },
                        { key: 'cartes', label: 'Cartes' },
                        { key: 'beneficiaires', label: 'Bénéficiaires' },
                        { key: 'historique', label: 'Historique' },
                        { key: 'connexions', label: 'Connexions' }
                    ];
                case 'agents':
                    return [
                        { key: 'infos', label: 'Infos' },
                        { key: 'limites', label: 'Limites' },
                        { key: 'performance', label: 'Performance' },
                        { key: 'commissions', label: 'Commissions' },
                        { key: 'documents', label: 'Documents' }
                    ];
                case 'super-agents':
                    return [
                        { key: 'infos', label: 'Infos' },
                        { key: 'reseau', label: "Réseau" },
                        { key: 'performance', label: 'Performance' },
                        { key: 'commissions', label: 'Commissions' },
                        { key: 'documents', label: 'Documents' },
                        { key: 'stocks', label: 'Stocks' }
                    ];
            }
        };
        UsersSettingsComponent_1.prototype.openDrawer = function (user, tab) {
            if (tab === void 0) { tab = 'infos'; }
            this.drawerUser = user;
            this.drawerType = this.activeTab;
            this.drawerTab = tab;
            this.drawerOpen = true;
            this.openMenuId = null;
            this.folderOpen = false;
        };
        UsersSettingsComponent_1.prototype.closeDrawer = function () {
            this.drawerOpen = false;
            this.drawerUser = null;
            this.drawerType = null;
        };
        UsersSettingsComponent_1.prototype.agentsOfSuperAgent = function (superAgentId) {
            return this.agents.filter(function (a) { return a.superAgentId === superAgentId; });
        };
        // MÉTHODE CORRIGÉE AVEC DES VALEURS PAR DÉFAUT
        UsersSettingsComponent_1.prototype.getHistoriqueDetail = function (id) {
            var types = [
                { type: 'depot', typeLabel: 'Dépôt', prefix: '+' },
                { type: 'retrait', typeLabel: 'Retrait', prefix: '-' },
                { type: 'transfert', typeLabel: 'Transfert', prefix: '-' },
                { type: 'paiement', typeLabel: 'Paiement', prefix: '-' }
            ];
            var destinataires = [
                'Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA',
                'Claire NDIKUMANA', 'IBLOPAY SA', 'Mobile Money', 'Banque de la République',
                'John DOE', 'Jane SMITH', 'IBLOPAY Agent 001'
            ];
            var montants = [15000, 25000, 50000, 75000, 100000, 200000, 35000, 45000, 120000, 80000];
            var statuts = ['actif', 'actif', 'actif', 'actif', 'actif'];
            var result = [];
            var count = 5 + Math.floor(Math.random() * 5);
            for (var i = 0; i < count; i++) {
                var typeIndex = i % types.length;
                // Utilisation de l'opérateur ! pour affirmer que la valeur n'est pas undefined
                var type = types[typeIndex];
                var montantIndex = i % montants.length;
                var montant = montants[montantIndex] * (1 + Math.floor(Math.random() * 3));
                var destIndex = i % destinataires.length;
                var dest = destinataires[destIndex];
                var statutIndex = i % statuts.length;
                var statut = statuts[statutIndex];
                var date = new Date(Date.now() - i * 86400000 * (1 + Math.floor(Math.random() * 3)));
                result.push({
                    date: date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                    type: type.type,
                    typeLabel: type.typeLabel,
                    montant: (type.prefix === '+' ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
                    destinataire: type.prefix === '+' ? 'IBLOPAY' : dest,
                    statut: statut
                });
            }
            return result;
        };
        // MÉTHODE CORRIGÉE AVEC DES VALEURS PAR DÉFAUT
        UsersSettingsComponent_1.prototype.getConnexions = function (id) {
            var localisations = ['Bujumbura', 'Gitega', 'Ngozi', 'Muyinga', 'Bururi', 'Rumonge', 'Kayanza', 'Cibitoke'];
            var appareils = ['Android - App IBLOPAY', 'iOS - App IBLOPAY', 'Web - Chrome', 'Web - Firefox', 'Android - Mobile Web'];
            var result = [];
            var count = 3 + Math.floor(Math.random() * 5);
            for (var i = 0; i < count; i++) {
                var appareilIndex = i % appareils.length;
                var localisationIndex = i % localisations.length;
                result.push({
                    date: new Date(Date.now() - i * 3600000 * (1 + Math.floor(Math.random() * 4))).toLocaleString('fr-FR'),
                    ip: "41.207.".concat((id.length * (i + 3) + i * 7) % 255, ".").concat((i * 17 + id.length * 3) % 255),
                    appareil: appareils[appareilIndex],
                    localisation: localisations[localisationIndex] + ', Burundi'
                });
            }
            return result;
        };
        UsersSettingsComponent_1.prototype.getLimitPercentage = function (agent) {
            return Math.min(100, Math.round((agent.soldeEMoney / agent.limiteJournaliere) * 100));
        };
        UsersSettingsComponent_1.prototype.exportCSV = function () {
            var headers = ['ID', 'Nom', 'Téléphone', 'CNI', 'Carte', 'Province', 'Commune', 'Statut'];
            var rows = this.filteredList.map(function (u) { return [
                u.id, u.nom, u.telephone, u.cni, u.numeroCarte,
                u.province, u.commune, u.statut
            ]; });
            var csv = __spreadArray([headers.join(',')], rows.map(function (r) { return r.join(','); }), true).join('\n');
            var blob = new Blob([csv], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "utilisateurs_".concat(this.activeTab, "_").concat(new Date().toISOString().slice(0, 10), ".csv");
            a.click();
            window.URL.revokeObjectURL(url);
            this.toast('Export CSV effectué avec succès.', 'success');
        };
        UsersSettingsComponent_1.prototype.printDocument = function () {
            this.toast('Impression du document en cours...', 'info');
            window.print();
        };
        Object.defineProperty(UsersSettingsComponent_1.prototype, "needsProfessionalStep", {
            // ---------- Wizard ----------
            get: function () {
                return this.activeTab === 'agents' || this.activeTab === 'super-agents';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "wizardSteps", {
            get: function () {
                var steps = [
                    { key: 'carte', label: 'Carte' },
                    { key: 'identite', label: 'Identité' },
                    { key: 'adresse', label: 'Adresse' }
                ];
                if (this.needsProfessionalStep)
                    steps.push({ key: 'professionnel', label: 'Infos pro' });
                steps.push({ key: 'recap', label: 'Récap' });
                return steps;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "currentStepKey", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.wizardSteps[this.wizardStep]) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : 'carte';
            },
            enumerable: false,
            configurable: true
        });
        UsersSettingsComponent_1.prototype.openCreateModal = function () {
            var _a, _b, _c, _d;
            this.editingUser = null;
            this.wizardMode = 'create';
            this.wizardStep = 0;
            this.otpSent = false;
            this.otpVerified = false;
            this.otpInput = '';
            this.otpError = false;
            this.otpGenerated = this.generateOtpCode();
            this.wizardData = {
                uid: 'NFC-' + this.generateNFC(),
                nom: '', telephone: '', cni: '',
                numeroCarte: this.generateCardNumber(),
                province: '', commune: '', zone: '', colline: '',
                superAgentId: (_b = (_a = this.superAgents[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '',
                agentId: (_d = (_c = this.agents[0]) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : '',
                region: 'Région Centre',
                nif: '', rccm: '', documentAcceptationNom: '',
                kycLevel: 1,
                tempPassword: this.generateTempPassword()
            };
            this.wizardOpen = true;
        };
        UsersSettingsComponent_1.prototype.openEditFlow = function (user) {
            var _a;
            this.openMenuId = null;
            this.editingUser = user;
            this.wizardMode = 'edit';
            this.wizardStep = 1;
            this.otpVerified = true;
            this.otpSent = true;
            this.wizardData = __assign(__assign({}, user), { uid: 'NFC-' + this.generateNFC(), documentAcceptationNom: (_a = user.documentAcceptation) !== null && _a !== void 0 ? _a : '' });
            this.wizardOpen = true;
        };
        UsersSettingsComponent_1.prototype.closeWizard = function () {
            this.wizardOpen = false;
            this.editingUser = null;
        };
        UsersSettingsComponent_1.prototype.generateOtpCode = function () {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
        UsersSettingsComponent_1.prototype.generateNFC = function () {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var out = '';
            for (var i = 0; i < 8; i++) {
                out += chars[Math.floor(Math.random() * chars.length)];
            }
            return out;
        };
        UsersSettingsComponent_1.prototype.generateCardNumber = function () {
            var prefix = this.activeTab === 'clients' ? '6521' : this.activeTab === 'agents' ? '6304' : '6390';
            var g = function () { return Math.floor(1000 + Math.random() * 9000); };
            return "".concat(prefix, " ").concat(g(), " ").concat(g(), " ").concat(g());
        };
        UsersSettingsComponent_1.prototype.generateTempPassword = function () {
            var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            var out = '';
            for (var i = 0; i < 8; i++)
                out += chars[Math.floor(Math.random() * chars.length)];
            return out;
        };
        UsersSettingsComponent_1.prototype.regenerateCard = function () {
            this.wizardData.numeroCarte = this.generateCardNumber();
            this.wizardData.uid = 'NFC-' + this.generateNFC();
            this.otpSent = false;
            this.otpVerified = false;
            this.otpInput = '';
            this.otpGenerated = this.generateOtpCode();
        };
        UsersSettingsComponent_1.prototype.sendOtp = function () {
            this.otpGenerated = this.generateOtpCode();
            this.otpSent = true;
            this.otpError = false;
            this.otpInput = '';
            this.toast("Code OTP envoy\u00E9 au ".concat(this.wizardData.telephone || 'numéro fourni', "."), 'info');
        };
        UsersSettingsComponent_1.prototype.verifyOtp = function () {
            if (this.otpInput.trim() === this.otpGenerated) {
                this.otpVerified = true;
                this.otpError = false;
                this.toast('Carte activée avec succès.', 'success');
            }
            else {
                this.otpError = true;
                this.otpVerified = false;
            }
        };
        Object.defineProperty(UsersSettingsComponent_1.prototype, "availableCommunes", {
            get: function () {
                return this.wizardData.province ? communesOf(this.wizardData.province) : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "availableZones", {
            get: function () {
                return this.wizardData.province && this.wizardData.commune
                    ? zonesOf(this.wizardData.province, this.wizardData.commune) : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersSettingsComponent_1.prototype, "availableCollines", {
            get: function () {
                return this.wizardData.province && this.wizardData.commune && this.wizardData.zone
                    ? collinesOf(this.wizardData.province, this.wizardData.commune, this.wizardData.zone) : [];
            },
            enumerable: false,
            configurable: true
        });
        UsersSettingsComponent_1.prototype.onProvinceChange = function () {
            this.wizardData.commune = '';
            this.wizardData.zone = '';
            this.wizardData.colline = '';
        };
        UsersSettingsComponent_1.prototype.onCommuneChange = function () {
            this.wizardData.zone = '';
            this.wizardData.colline = '';
        };
        UsersSettingsComponent_1.prototype.onZoneChange = function () {
            this.wizardData.colline = '';
        };
        UsersSettingsComponent_1.prototype.onDocumentSelected = function (event) {
            var input = event.target;
            var file = input.files && input.files[0];
            this.wizardData.documentAcceptationNom = file ? file.name : '';
        };
        UsersSettingsComponent_1.prototype.canGoNext = function () {
            var _a, _b, _c, _d, _e;
            switch (this.currentStepKey) {
                case 'carte':
                    return !!((_a = this.wizardData.telephone) === null || _a === void 0 ? void 0 : _a.trim()) && this.otpVerified;
                case 'identite':
                    return !!(((_b = this.wizardData.nom) === null || _b === void 0 ? void 0 : _b.trim()) && ((_c = this.wizardData.cni) === null || _c === void 0 ? void 0 : _c.trim()));
                case 'adresse':
                    return !!(this.wizardData.province && this.wizardData.commune && this.wizardData.zone && this.wizardData.colline);
                case 'professionnel':
                    return !!(((_d = this.wizardData.nif) === null || _d === void 0 ? void 0 : _d.trim()) && ((_e = this.wizardData.rccm) === null || _e === void 0 ? void 0 : _e.trim()) && this.wizardData.documentAcceptationNom);
                default:
                    return true;
            }
        };
        UsersSettingsComponent_1.prototype.wizardNext = function () {
            if (!this.canGoNext())
                return;
            if (this.wizardStep < this.wizardSteps.length - 1)
                this.wizardStep++;
        };
        UsersSettingsComponent_1.prototype.wizardPrev = function () {
            if (this.wizardStep > 0)
                this.wizardStep--;
        };
        UsersSettingsComponent_1.prototype.goToStep = function (i) {
            if (i <= this.wizardStep || this.wizardMode === 'edit')
                this.wizardStep = i;
        };
        UsersSettingsComponent_1.prototype.submitWizard = function () {
            if (this.wizardMode === 'create') {
                this.createUserFromWizard();
            }
            else {
                this.applyEditFromWizard();
            }
            this.wizardOpen = false;
        };
        UsersSettingsComponent_1.prototype.createUserFromWizard = function () {
            var _a, _b, _c;
            var d = this.wizardData;
            var seq = this.rawList.length + 1;
            var base = { province: d.province, commune: d.commune, zone: d.zone, colline: d.colline };
            switch (this.activeTab) {
                case 'clients': {
                    var agent = this.agents.find(function (a) { return a.id === d.agentId; });
                    this.clients.unshift(__assign(__assign({ id: "CL-".concat(pad3(seq), "-N"), nom: d.nom, telephone: d.telephone, email: d.email || "client".concat(pad3(seq), "@iblopay.bi"), cni: d.cni, numeroCarte: d.numeroCarte, agentId: d.agentId, agentNom: (_a = agent === null || agent === void 0 ? void 0 : agent.nom) !== null && _a !== void 0 ? _a : '—' }, base), { statut: 'actif', kycLevel: (_b = d.kycLevel) !== null && _b !== void 0 ? _b : 1, soldeWallet: 0, nbCartes: 1, nbBeneficiaires: 0, dateCreation: new Date().toLocaleDateString('fr-FR'), derniereConnexion: '—' }));
                    break;
                }
                case 'agents': {
                    var sa = this.superAgents.find(function (s) { return s.id === d.superAgentId; });
                    this.agents.unshift(__assign(__assign({ id: "AG-".concat(pad3(seq), "-N"), nom: d.nom, telephone: d.telephone, cni: d.cni, numeroCarte: d.numeroCarte, nif: d.nif, rccm: d.rccm, documentAcceptation: d.documentAcceptationNom, superAgentId: d.superAgentId, superAgentNom: (_c = sa === null || sa === void 0 ? void 0 : sa.nom.split(' (')[0]) !== null && _c !== void 0 ? _c : '—' }, base), { statut: 'actif', soldeEMoney: 0, soldeCash: 0, limiteJournaliere: 500000, performance: 0, commissionsMois: 0, dateCreation: new Date().toLocaleDateString('fr-FR') }));
                    break;
                }
                case 'super-agents':
                    this.superAgents.unshift(__assign(__assign({ id: "SA-".concat(pad3(seq), "-N"), nom: d.nom, telephone: d.telephone, cni: d.cni, numeroCarte: d.numeroCarte, nif: d.nif, rccm: d.rccm, documentAcceptation: d.documentAcceptationNom, region: d.region }, base), { statut: 'actif', nbAgents: 0, soldeDistribution: 0, performanceGlobale: 0, commissionsMois: 0, dateCreation: new Date().toLocaleDateString('fr-FR') }));
                    break;
            }
            this.toast("\u00AB ".concat(d.nom, " \u00BB cr\u00E9\u00E9 avec succ\u00E8s. Mot de passe initial : ").concat(d.tempPassword), 'success');
        };
        UsersSettingsComponent_1.prototype.applyEditFromWizard = function () {
            var _this = this;
            var _a, _b;
            if (!this.editingUser)
                return;
            Object.assign(this.editingUser, {
                nom: this.wizardData.nom,
                telephone: this.wizardData.telephone,
                cni: this.wizardData.cni,
                numeroCarte: this.wizardData.numeroCarte,
                province: this.wizardData.province,
                commune: this.wizardData.commune,
                zone: this.wizardData.zone,
                colline: this.wizardData.colline
            });
            if (this.activeTab === 'clients') {
                var agent = this.agents.find(function (a) { return a.id === _this.wizardData.agentId; });
                Object.assign(this.editingUser, { agentId: this.wizardData.agentId, agentNom: (_a = agent === null || agent === void 0 ? void 0 : agent.nom) !== null && _a !== void 0 ? _a : '—' });
            }
            if (this.activeTab === 'agents' || this.activeTab === 'super-agents') {
                Object.assign(this.editingUser, {
                    nif: this.wizardData.nif,
                    rccm: this.wizardData.rccm,
                    documentAcceptation: this.wizardData.documentAcceptationNom
                });
            }
            if (this.activeTab === 'agents') {
                var sa = this.superAgents.find(function (s) { return s.id === _this.wizardData.superAgentId; });
                Object.assign(this.editingUser, { superAgentId: this.wizardData.superAgentId, superAgentNom: (_b = sa === null || sa === void 0 ? void 0 : sa.nom.split(' (')[0]) !== null && _b !== void 0 ? _b : '—' });
            }
            if (this.activeTab === 'super-agents') {
                Object.assign(this.editingUser, { region: this.wizardData.region });
            }
            this.toast("\u00AB ".concat(this.wizardData.nom, " \u00BB mis \u00E0 jour."), 'success');
        };
        UsersSettingsComponent_1.prototype.openAssignModal = function (user) {
            this.assignTargetUser = user;
            this.assignTargetSuperAgentId = user.superAgentId;
            this.assignModalOpen = true;
            this.openMenuId = null;
        };
        UsersSettingsComponent_1.prototype.closeAssignModal = function () {
            this.assignModalOpen = false;
            this.assignTargetUser = null;
        };
        UsersSettingsComponent_1.prototype.confirmAssign = function () {
            var _this = this;
            var _a;
            if (!this.assignTargetUser)
                return;
            var sa = this.superAgents.find(function (s) { return s.id === _this.assignTargetSuperAgentId; });
            this.assignTargetUser.superAgentId = this.assignTargetSuperAgentId;
            this.assignTargetUser.superAgentNom = (_a = sa === null || sa === void 0 ? void 0 : sa.nom.split(' (')[0]) !== null && _a !== void 0 ? _a : '—';
            this.toast("".concat(this.assignTargetUser.nom, " rattach\u00E9 \u00E0 ").concat(this.assignTargetUser.superAgentNom, "."), 'success');
            this.closeAssignModal();
        };
        UsersSettingsComponent_1.prototype.confirmAction = function (title, message, danger, onConfirm) {
            this.confirm = { title: title, message: message, danger: danger, onConfirm: onConfirm };
        };
        UsersSettingsComponent_1.prototype.resolveConfirm = function () {
            var _a;
            (_a = this.confirm) === null || _a === void 0 ? void 0 : _a.onConfirm();
            this.confirm = null;
        };
        UsersSettingsComponent_1.prototype.cancelConfirm = function () {
            this.confirm = null;
        };
        UsersSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        UsersSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        UsersSettingsComponent_1.prototype.statutLabel = function (statut) {
            var _a;
            var labels = {
                actif: 'Actif', suspendu: 'Suspendu', archive: 'Archivé'
            };
            return (_a = labels[statut]) !== null && _a !== void 0 ? _a : statut;
        };
        UsersSettingsComponent_1.prototype.formatBIF = function (n) {
            return new Intl.NumberFormat('fr-FR').format(n) + ' BIF';
        };
        UsersSettingsComponent_1.prototype.formatDate = function (date) {
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        };
        UsersSettingsComponent_1.prototype.trackById = function (_i, item) {
            return item.id;
        };
        UsersSettingsComponent_1.prototype.asClient = function (u) { return u; };
        UsersSettingsComponent_1.prototype.asAgent = function (u) { return u; };
        UsersSettingsComponent_1.prototype.asSuperAgent = function (u) { return u; };
        UsersSettingsComponent_1.prototype.range = function (n) {
            return Array.from({ length: Math.max(0, n) }, function (_, i) { return i; });
        };
        return UsersSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "UsersSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _fileInput_decorators = [ViewChild('fileInput')];
        __esDecorate(null, null, _fileInput_decorators, { kind: "field", name: "fileInput", static: false, private: false, access: { has: function (obj) { return "fileInput" in obj; }, get: function (obj) { return obj.fileInput; }, set: function (obj, value) { obj.fileInput = value; } }, metadata: _metadata }, _fileInput_initializers, _fileInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersSettingsComponent = _classThis;
}();
export { UsersSettingsComponent };
function pad3(n) {
    return n.toString().padStart(3, '0');
}
//# sourceMappingURL=users-settings.component.js.map