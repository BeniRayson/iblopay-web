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
            this.availableEvents = [
                'Transaction',
                'Dépôt',
                'Retrait',
                'Transfert',
                'Commission',
                'Taxe',
                'Connexion',
                'Sécurité',
                'Maintenance'
            ];
            this.tabs = [
                { key: 'frais', label: 'Frais', icon: '💲' },
                { key: 'limites', label: 'Limites', icon: '📏' },
                { key: 'notifications', label: 'Notifications', icon: '🔔' },
                { key: 'parametres', label: 'Paramètres', icon: '🧩' }
            ];
            this.fees = [
                {
                    id: '1',
                    name: 'Frais de Dépôt',
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
                    name: 'Dépôt max par transaction',
                    icon: '💰',
                    value: 5000000,
                    period: 'illimite',
                    currentUsage: 2500000,
                    description: 'Montant maximum par dépôt',
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
                    events: ['Transaction', 'Dépôt', 'Retrait'],
                    active: true
                },
                {
                    id: '2',
                    name: 'Notification Email',
                    icon: '📧',
                    channel: 'email',
                    config: 'notifications@iblopay.bi',
                    events: ['Transaction', 'Sécurité', 'Commission', 'Taxe'],
                    active: true
                },
                {
                    id: '3',
                    name: 'Notification Push',
                    icon: '🔔',
                    channel: 'push',
                    config: 'Mobile App',
                    events: ['Transaction', 'Dépôt', 'Retrait', 'Transfert'],
                    active: true
                },
                {
                    id: '4',
                    name: 'Webhook',
                    icon: '🔌',
                    channel: 'webhook',
                    config: 'https://api.iblopay.bi/webhook',
                    events: ['Transaction', 'Maintenance', 'Sécurité'],
                    active: false
                }
            ];
            this.systemParams = [
                {
                    id: '1',
                    name: 'Devise principale',
                    icon: '💵',
                    value: 'BIF',
                    description: 'Devise utilisée pour toutes les transactions',
                    options: ['BIF', 'USD', 'EUR', 'GBP'],
                    active: true
                },
                {
                    id: '2',
                    name: 'Fuseau horaire',
                    icon: '🕐',
                    value: 'Africa/Bujumbura',
                    description: 'Fuseau horaire du système',
                    options: ['Africa/Bujumbura', 'Africa/Kigali', 'Africa/Nairobi', 'UTC'],
                    active: true
                },
                {
                    id: '3',
                    name: 'Langue',
                    icon: '🌍',
                    value: 'Français',
                    description: 'Langue par défaut de l\'interface',
                    options: ['Français', 'English', 'Kirundi', 'Kiswahili'],
                    active: true
                },
                {
                    id: '4',
                    name: 'Mode Maintenance',
                    icon: '🛠️',
                    value: 'Désactivé',
                    description: 'Mode maintenance du système',
                    options: ['Activé', 'Désactivé'],
                    danger: true,
                    active: true
                }
            ];
        }
        SystemSettingsComponent_1.prototype.ngOnInit = function () { };
        // ========== NAVIGATION ==========
        SystemSettingsComponent_1.prototype.setActiveTab = function (tab) {
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
            this.toast("Frais \"".concat(fee.name, "\" ").concat(fee.active ? 'activé' : 'désactivé'), fee.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.saveFee = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Frais \"".concat(this.selectedItem.name, "\" sauvegard\u00E9 avec succ\u00E8s"), 'success');
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
            this.toast("Limite \"".concat(limit.name, "\" ").concat(limit.active ? 'activée' : 'désactivée'), limit.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.saveLimit = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Limite \"".concat(this.selectedItem.name, "\" sauvegard\u00E9e avec succ\u00E8s"), 'success');
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
            this.toast("Notification \"".concat(notification.name, "\" ").concat(notification.active ? 'activée' : 'désactivée'), notification.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.testNotification = function (notification) {
            this.toast("Test de notification \"".concat(notification.name, "\" envoy\u00E9"), 'info');
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
                this.toast("Notification \"".concat(this.selectedItem.name, "\" sauvegard\u00E9e avec succ\u00E8s"), 'success');
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
            this.toast("Param\u00E8tre \"".concat(param.name, "\" ").concat(param.active ? 'activé' : 'désactivé'), param.active ? 'success' : 'danger');
        };
        SystemSettingsComponent_1.prototype.resetParam = function (param) {
            if (confirm("Voulez-vous vraiment r\u00E9initialiser \"".concat(param.name, "\" \u00E0 sa valeur par d\u00E9faut ?"))) {
                // Simuler une réinitialisation
                this.toast("Param\u00E8tre \"".concat(param.name, "\" r\u00E9initialis\u00E9 avec succ\u00E8s"), 'success');
            }
        };
        SystemSettingsComponent_1.prototype.saveParam = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Param\u00E8tre \"".concat(this.selectedItem.name, "\" sauvegard\u00E9 avec succ\u00E8s"), 'success');
                this.closeModal();
            }
        };
        // ========== SYSTEM ACTIONS ==========
        SystemSettingsComponent_1.prototype.clearCache = function () {
            if (confirm('Voulez-vous vraiment vider le cache système ?')) {
                this.toast('Cache système vidé avec succès', 'success');
            }
        };
        SystemSettingsComponent_1.prototype.rebuildIndex = function () {
            if (confirm('Voulez-vous vraiment reconstruire les index ?')) {
                this.toast('Reconstruction des index lancée', 'info');
            }
        };
        SystemSettingsComponent_1.prototype.resetAll = function () {
            if (confirm('⚠️ Voulez-vous vraiment réinitialiser tous les paramètres ? Cette action est irréversible !')) {
                if (confirm('⚠️⚠️ Confirmation finale : réinitialiser tous les paramètres ?')) {
                    this.toast('Tous les paramètres ont été réinitialisés', 'danger');
                }
            }
        };
        SystemSettingsComponent_1.prototype.exportData = function () {
            this.toast('Export des données démarré', 'info');
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