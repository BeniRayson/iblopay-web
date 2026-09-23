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
var SystemSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-system-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './system-settings.component.html',
            styleUrls: ['./system-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SystemSettingsComponent = _classThis = /** @class */ (function () {
        function SystemSettingsComponent_1() {
            this.Math = Math;
            this.activeTab = 'frais';
            this.showModal = false;
            this.modalTitle = '';
            this.modalType = '';
            this.selectedItem = null;
            this.formData = {};
            this.toasts = [];
            this.toastSeq = 0;
            // État pour les barèmes
            this.sectionBaremeOuverte = null;
            this.modeEditionBareme = false;
            this.enregistrementBaremeEnCours = false;
            this.availableEvents = [
                'Transaction',
                'Depot',
                'Retrait',
                'Transfert',
                'Commission',
                'Taxe',
                'Connexion',
                'Securite',
                'Maintenance'
            ];
            this.tabs = [
                { key: 'frais', label: 'Frais', icon: '💲' },
                { key: 'limites', label: 'Limites', icon: '📏' },
                { key: 'notifications', label: 'Notifications', icon: '🔔' },
                { key: 'parametres', label: 'Paramètres', icon: '🧩' },
                { key: 'baremes', label: 'Barèmes', icon: '📊' }
            ];
            this.fees = [
                {
                    id: '1',
                    name: 'Frais de Depot',
                    icon: '💰',
                    type: 'pourcentage',
                    rate: '1.5%',
                    minAmount: 1000,
                    maxAmount: 500000,
                    appliesTo: 'Tous les utilisateurs',
                    active: true
                },
                {
                    id: '2',
                    name: 'Frais de Retrait',
                    icon: '🏦',
                    type: 'mixte',
                    rate: '1% + 500 BIF',
                    minAmount: 500,
                    maxAmount: 1000000,
                    appliesTo: 'Agents et clients',
                    active: true
                },
                {
                    id: '3',
                    name: 'Frais de Transfert',
                    icon: '🔄',
                    type: 'pourcentage',
                    rate: '0.8%',
                    minAmount: 100,
                    maxAmount: 200000,
                    appliesTo: 'Entre agents',
                    active: true
                },
                {
                    id: '4',
                    name: 'Frais de Paiement',
                    icon: '💳',
                    type: 'fixe',
                    rate: '250 BIF',
                    minAmount: 0,
                    maxAmount: 0,
                    appliesTo: 'Paiements marchands',
                    active: false
                }
            ];
            this.limits = [
                {
                    id: '1',
                    name: 'Depot max par transaction',
                    icon: '💰',
                    value: 5000000,
                    period: 'illimite',
                    currentUsage: 2500000,
                    description: 'Montant maximum par depot',
                    active: true
                },
                {
                    id: '2',
                    name: 'Retrait max par transaction',
                    icon: '🏦',
                    value: 3000000,
                    period: 'illimite',
                    currentUsage: 1200000,
                    description: 'Montant maximum par retrait',
                    active: true
                },
                {
                    id: '3',
                    name: 'Plafond journalier',
                    icon: '📅',
                    value: 10000000,
                    period: 'jour',
                    currentUsage: 4500000,
                    description: 'Montant total des transactions par jour',
                    active: true
                },
                {
                    id: '4',
                    name: 'Plafond mensuel',
                    icon: '📆',
                    value: 50000000,
                    period: 'mois',
                    currentUsage: 25000000,
                    description: 'Montant total des transactions par mois',
                    active: true
                }
            ];
            this.notifications = [
                {
                    id: '1',
                    name: 'Notification SMS',
                    icon: '📱',
                    channel: 'sms',
                    config: '+257 79 123 456',
                    events: ['Transaction', 'Depot', 'Retrait'],
                    active: true
                },
                {
                    id: '2',
                    name: 'Notification Email',
                    icon: '📧',
                    channel: 'email',
                    config: 'notifications@iblopay.bi',
                    events: ['Transaction', 'Securite', 'Commission', 'Taxe'],
                    active: true
                },
                {
                    id: '3',
                    name: 'Notification Push',
                    icon: '🔔',
                    channel: 'push',
                    config: 'Mobile App',
                    events: ['Transaction', 'Depot', 'Retrait', 'Transfert'],
                    active: true
                },
                {
                    id: '4',
                    name: 'Webhook',
                    icon: '🔌',
                    channel: 'webhook',
                    config: 'https://api.iblopay.bi/webhook',
                    events: ['Transaction', 'Maintenance', 'Securite'],
                    active: false
                }
            ];
            this.systemParams = [
                {
                    id: '1',
                    name: 'Devise principale',
                    icon: '💵',
                    value: 'BIF',
                    description: 'Devise utilisee pour toutes les transactions',
                    options: ['BIF', 'USD', 'EUR', 'GBP'],
                    active: true
                },
                {
                    id: '2',
                    name: 'Fuseau horaire',
                    icon: '🕐',
                    value: 'Africa/Bujumbura',
                    description: 'Fuseau horaire du systeme',
                    options: ['Africa/Bujumbura', 'Africa/Kigali', 'Africa/Nairobi', 'UTC'],
                    active: true
                },
                {
                    id: '3',
                    name: 'Langue',
                    icon: '🌍',
                    value: 'Francais',
                    description: 'Langue par defaut de l\'interface',
                    options: ['Francais', 'English', 'Kirundi', 'Kiswahili'],
                    active: true
                },
                {
                    id: '4',
                    name: 'Mode Maintenance',
                    icon: '🛠️',
                    value: 'Desactive',
                    description: 'Mode maintenance du systeme',
                    options: ['Active', 'Desactive'],
                    danger: true,
                    active: true
                }
            ];
            // ============================================================
            // BARÈMES DE COMMISSION (D'APRÈS LES IMAGES)
            // ============================================================
            // Barème 1 : Retrait Client
            this.baremeRetraitClient = {
                id: 'retrait-client',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikishije (FBU)",
                tranches: [
                    { min: 100, max: 999, total: 10, agent: 9, sa: 1 },
                    { min: 1000, max: 4999, total: 30, agent: 27, sa: 3 },
                    { min: 5000, max: 9999, total: 80, agent: 72, sa: 8 },
                    { min: 10000, max: 19999, total: 100, agent: 90, sa: 10 },
                    { min: 20000, max: 29999, total: 200, agent: 180, sa: 20 },
                    { min: 30000, max: 39999, total: 270, agent: 243, sa: 27 },
                    { min: 40000, max: 49999, total: 360, agent: 324, sa: 36 },
                    { min: 50000, max: 59999, total: 450, agent: 405, sa: 45 },
                    { min: 60000, max: 69999, total: 520, agent: 468, sa: 52 },
                    { min: 70000, max: 79999, total: 600, agent: 540, sa: 60 },
                    { min: 80000, max: 89999, total: 700, agent: 630, sa: 70 },
                    { min: 90000, max: 99999, total: 750, agent: 675, sa: 75 },
                    { min: 100000, max: 199999, total: 800, agent: 720, sa: 80 },
                    { min: 200000, max: 299999, total: 1100, agent: 990, sa: 110 },
                    { min: 300000, max: 399999, total: 1300, agent: 1170, sa: 130 },
                    { min: 400000, max: 499999, total: 1500, agent: 1350, sa: 150 },
                    { min: 500000, max: 1000000, total: 2400, agent: 2160, sa: 240 },
                ]
            };
            // Barème 2 : Retrait Marchand
            this.baremeRetraitMarchand = {
                id: 'retrait-marchand',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umudandaza abikuye (FBU)",
                tranches: [
                    { min: 0, max: 50000, agent: 0, sa: null },
                    { min: 50001, max: 70000, agent: 100, sa: null },
                    { min: 70001, max: 100000, agent: 200, sa: null },
                    { min: 100001, max: 150000, agent: 300, sa: null },
                    { min: 150001, max: 200000, agent: 400, sa: null },
                    { min: 200001, max: 300000, agent: 500, sa: null },
                    { min: 300001, max: 400000, agent: 600, sa: null },
                    { min: 400001, max: 500000, agent: 700, sa: null },
                    { min: 500001, max: 600000, agent: 800, sa: null },
                    { min: 600001, max: 700000, agent: 900, sa: null },
                    { min: 700001, max: 999999999, agent: 1000, sa: null },
                ]
            };
            // Barème 3 : Recharge Client
            this.baremeRechargeClient = {
                id: 'recharge-client',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikuye (FBU)",
                tranches: [
                    { min: 100, max: 999, total: null, agent: null, sa: null },
                    { min: 1000, max: 4999, total: 70, agent: 63, sa: 7 },
                    { min: 5000, max: 9999, total: 120, agent: 108, sa: 12 },
                    { min: 10000, max: 19999, total: 180, agent: 162, sa: 18 },
                    { min: 20000, max: 29999, total: 230, agent: 207, sa: 23 },
                    { min: 30000, max: 39999, total: 350, agent: 315, sa: 35 },
                    { min: 40000, max: 49999, total: 450, agent: 405, sa: 45 },
                    { min: 50000, max: 59999, total: 550, agent: 495, sa: 55 },
                    { min: 60000, max: 69999, total: 650, agent: 585, sa: 65 },
                    { min: 70000, max: 79999, total: 750, agent: 675, sa: 75 },
                    { min: 80000, max: 89999, total: 850, agent: 765, sa: 85 },
                    { min: 90000, max: 99999, total: 950, agent: 855, sa: 95 },
                    { min: 100000, max: 199999, total: 1100, agent: 990, sa: 110 },
                    { min: 200000, max: 299999, total: 1800, agent: 1620, sa: 180 },
                    { min: 300000, max: 399999, total: 2200, agent: 1980, sa: 220 },
                    { min: 400000, max: 499999, total: 2600, agent: 2340, sa: 260 },
                    { min: 500000, max: 1000000, total: 4000, agent: 3600, sa: 240 },
                ]
            };
            // Barème 4 : Carte Agent
            this.baremeCarteAgent = {
                id: 'carte-agent',
                titre: 'Ibiciro — Frais de depot et de retrait (carte agent)',
                tranches: [
                    { min: 100, max: 999, depot: null, retrait: null },
                    { min: 1000, max: 4999, depot: 168, retrait: 720 },
                    { min: 5000, max: 9999, depot: 384, retrait: 1380 },
                    { min: 10000, max: 19999, depot: 540, retrait: 1740 },
                    { min: 20000, max: 29999, depot: 840, retrait: 2280 },
                    { min: 30000, max: 39999, depot: 1020, retrait: 2760 },
                    { min: 40000, max: 49999, depot: 1110, retrait: 3000 },
                    { min: 50000, max: 59999, depot: 1200, retrait: 3240 },
                    { min: 60000, max: 69999, depot: 1500, retrait: 3960 },
                    { min: 70000, max: 79999, depot: 1710, retrait: 4320 },
                    { min: 80000, max: 89999, depot: 1860, retrait: 4620 },
                    { min: 90000, max: 99999, depot: 1920, retrait: 4680 },
                    { min: 100000, max: 199999, depot: 2640, retrait: 5880 },
                    { min: 200000, max: 299999, depot: 3600, retrait: 8160 },
                    { min: 300000, max: 399999, depot: 4080, retrait: 9480 },
                    { min: 400000, max: 499999, depot: 4800, retrait: 11520 },
                    { min: 500000, max: 1000000, depot: 5760, retrait: 17040 },
                ]
            };
            // Sauvegarde pour annulation
            this.snapshotBaremes = null;
        }
        SystemSettingsComponent_1.prototype.ngOnInit = function () { };
        // ========== NAVIGATION ==========
        SystemSettingsComponent_1.prototype.setActiveTab = function (tab) {
            if (this.modeEditionBareme && tab !== 'baremes') {
                if (!confirm('Vous avez des modifications non sauvegardees dans les baremes. Voulez-vous continuer ?')) {
                    return;
                }
                this.annulerEditionBaremes();
            }
            this.activeTab = tab;
        };
        // ========== COMPTES ==========
        SystemSettingsComponent_1.prototype.getActiveFeesCount = function () {
            return this.fees.filter(function (f) { return f.active; }).length;
        };
        SystemSettingsComponent_1.prototype.getActiveLimitsCount = function () {
            return this.limits.filter(function (l) { return l.active; }).length;
        };
        SystemSettingsComponent_1.prototype.getActiveNotificationsCount = function () {
            return this.notifications.filter(function (n) { return n.active; }).length;
        };
        SystemSettingsComponent_1.prototype.getActiveParamsCount = function () {
            return this.systemParams.filter(function (p) { return p.active; }).length;
        };
        // ========== LIMITS SUMMARY ==========
        SystemSettingsComponent_1.prototype.getLimitsSummary = function () {
            return this.limits.filter(function (l) { return l.active && l.currentUsage !== undefined; }).map(function (l) {
                var percentage = Math.min((l.currentUsage || 0) / l.value * 100, 100);
                var color = '#0F6E5B';
                if (percentage > 80)
                    color = '#D64545';
                else if (percentage > 60)
                    color = '#F2A93B';
                return {
                    label: l.name,
                    current: l.currentUsage || 0,
                    max: l.value,
                    percentage: Math.round(percentage),
                    color: color
                };
            });
        };
        // ========== FEE ACTIONS ==========
        SystemSettingsComponent_1.prototype.configureFee = function (fee) {
            this.selectedItem = fee;
            this.modalType = 'fee_config';
            this.modalTitle = "\uD83D\uDCB2 Configuration - ".concat(fee.name);
            this.formData = __assign({}, fee);
            this.showModal = true;
        };
        SystemSettingsComponent_1.prototype.toggleFee = function (fee) {
            fee.active = !fee.active;
            this.toast("Frais \"".concat(fee.name, "\" ").concat(fee.active ? 'active' : 'desactive'), fee.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.saveFee = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Frais \"".concat(this.selectedItem.name, "\" sauvegarde avec succes"), 'success');
                this.closeModal();
            }
        };
        // ========== LIMIT ACTIONS ==========
        SystemSettingsComponent_1.prototype.configureLimit = function (limit) {
            this.selectedItem = limit;
            this.modalType = 'limit_config';
            this.modalTitle = "\uD83D\uDCCF Configuration - ".concat(limit.name);
            this.formData = __assign({}, limit);
            this.showModal = true;
        };
        SystemSettingsComponent_1.prototype.toggleLimit = function (limit) {
            limit.active = !limit.active;
            this.toast("Limite \"".concat(limit.name, "\" ").concat(limit.active ? 'activee' : 'desactivee'), limit.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.saveLimit = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Limite \"".concat(this.selectedItem.name, "\" sauvegardee avec succes"), 'success');
                this.closeModal();
            }
        };
        // ========== NOTIFICATION ACTIONS ==========
        SystemSettingsComponent_1.prototype.configureNotification = function (notification) {
            this.selectedItem = notification;
            this.modalType = 'notification_config';
            this.modalTitle = "\uD83D\uDD14 Configuration - ".concat(notification.name);
            this.formData = __assign(__assign({}, notification), { selectedEvents: __spreadArray([], notification.events, true) });
            this.showModal = true;
        };
        SystemSettingsComponent_1.prototype.toggleNotification = function (notification) {
            notification.active = !notification.active;
            this.toast("Notification \"".concat(notification.name, "\" ").concat(notification.active ? 'activee' : 'desactivee'), notification.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.testNotification = function (notification) {
            this.toast("Test de notification \"".concat(notification.name, "\" envoye"), 'info');
        };
        SystemSettingsComponent_1.prototype.isEventSelected = function (event) {
            var _a;
            return ((_a = this.formData.selectedEvents) === null || _a === void 0 ? void 0 : _a.includes(event)) || false;
        };
        SystemSettingsComponent_1.prototype.toggleEventSelection = function (event) {
            if (!this.formData.selectedEvents) {
                this.formData.selectedEvents = [];
            }
            var index = this.formData.selectedEvents.indexOf(event);
            if (index > -1) {
                this.formData.selectedEvents.splice(index, 1);
            }
            else {
                this.formData.selectedEvents.push(event);
            }
        };
        SystemSettingsComponent_1.prototype.saveNotification = function () {
            if (this.selectedItem) {
                this.selectedItem.events = __spreadArray([], this.formData.selectedEvents, true);
                this.selectedItem.channel = this.formData.channel;
                this.selectedItem.config = this.formData.config;
                this.toast("Notification \"".concat(this.selectedItem.name, "\" sauvegardee avec succes"), 'success');
                this.closeModal();
            }
        };
        // ========== PARAM ACTIONS ==========
        SystemSettingsComponent_1.prototype.configureParam = function (param) {
            this.selectedItem = param;
            this.modalType = 'param_config';
            this.modalTitle = "\uD83E\uDDE9 Configuration - ".concat(param.name);
            this.formData = __assign({}, param);
            this.showModal = true;
        };
        SystemSettingsComponent_1.prototype.toggleParam = function (param) {
            param.active = !param.active;
            this.toast("Parametre \"".concat(param.name, "\" ").concat(param.active ? 'active' : 'desactive'), param.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.resetParam = function (param) {
            if (confirm("Voulez-vous vraiment reinitialiser \"".concat(param.name, "\" a sa valeur par defaut ?"))) {
                this.toast("Parametre \"".concat(param.name, "\" reinitialise avec succes"), 'success');
            }
        };
        SystemSettingsComponent_1.prototype.saveParam = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Parametre \"".concat(this.selectedItem.name, "\" sauvegarde avec succes"), 'success');
                this.closeModal();
            }
        };
        // ============================================================
        // ACTIONS BARÈMES
        // ============================================================
        SystemSettingsComponent_1.prototype.basculerSectionBareme = function (section) {
            if (this.sectionBaremeOuverte === section) {
                this.sectionBaremeOuverte = null;
            }
            else {
                this.sectionBaremeOuverte = section;
            }
        };
        SystemSettingsComponent_1.prototype.activerEditionBaremes = function () {
            this.snapshotBaremes = JSON.stringify({
                retraitClient: this.baremeRetraitClient,
                retraitMarchand: this.baremeRetraitMarchand,
                rechargeClient: this.baremeRechargeClient,
                carteAgent: this.baremeCarteAgent,
            });
            this.modeEditionBareme = true;
        };
        SystemSettingsComponent_1.prototype.annulerEditionBaremes = function () {
            if (this.snapshotBaremes) {
                var data = JSON.parse(this.snapshotBaremes);
                this.baremeRetraitClient = data.retraitClient;
                this.baremeRetraitMarchand = data.retraitMarchand;
                this.baremeRechargeClient = data.rechargeClient;
                this.baremeCarteAgent = data.carteAgent;
            }
            this.modeEditionBareme = false;
        };
        SystemSettingsComponent_1.prototype.enregistrerBaremes = function () {
            var _this = this;
            this.enregistrementBaremeEnCours = true;
            var payload = {
                retraitClient: this.baremeRetraitClient,
                retraitMarchand: this.baremeRetraitMarchand,
                rechargeClient: this.baremeRechargeClient,
                carteAgent: this.baremeCarteAgent,
            };
            setTimeout(function () {
                console.log('Baremes a publier :', payload);
                _this.enregistrementBaremeEnCours = false;
                _this.modeEditionBareme = false;
                _this.toast('Baremes sauvegardes avec succes', 'success');
            }, 600);
        };
        SystemSettingsComponent_1.prototype.formatMontant = function (valeur) {
            if (valeur === null || valeur === undefined) {
                return 'N/A';
            }
            return valeur.toLocaleString('fr-FR');
        };
        // ========== SYSTEM ACTIONS ==========
        SystemSettingsComponent_1.prototype.clearCache = function () {
            if (confirm('Voulez-vous vraiment vider le cache systeme ?')) {
                this.toast('Cache systeme vide avec succes', 'success');
            }
        };
        SystemSettingsComponent_1.prototype.rebuildIndex = function () {
            if (confirm('Voulez-vous vraiment reconstruire les index ?')) {
                this.toast('Reconstruction des index lancee', 'info');
            }
        };
        SystemSettingsComponent_1.prototype.resetAll = function () {
            if (confirm('⚠️ Voulez-vous vraiment reinitialiser tous les parametres ? Cette action est irreversible !')) {
                if (confirm('⚠️⚠️ Confirmation finale : reinitialiser tous les parametres ?')) {
                    this.toast('Tous les parametres ont ete reinitialises', 'danger');
                }
            }
        };
        SystemSettingsComponent_1.prototype.exportData = function () {
            this.toast('Export des donnees demarre', 'info');
        };
        // ========== MODAL ==========
        SystemSettingsComponent_1.prototype.closeModal = function () {
            this.showModal = false;
            this.selectedItem = null;
            this.formData = {};
        };
        // ========== TOASTS ==========
        SystemSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        SystemSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return SystemSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "SystemSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SystemSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SystemSettingsComponent = _classThis;
}();
export { SystemSettingsComponent };
//# sourceMappingURL=system-settings.component.js.map