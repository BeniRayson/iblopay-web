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
var PartnersSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-partners-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './partners-settings.component.html',
            styleUrls: ['./partners-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PartnersSettingsComponent = _classThis = /** @class */ (function () {
        function PartnersSettingsComponent_1() {
            this.Math = Math;
            this.activeTab = 'tous';
            this.showModal = false;
            this.modalTitle = '';
            this.modalType = '';
            this.selectedItem = null;
            this.formData = {};
            this.toasts = [];
            this.toastSeq = 0;
            // Filters
            this.searchTerm = '';
            this.categoryFilter = '';
            this.statusFilter = '';
            // Pagination
            this.pageSize = 12;
            this.currentPage = 1;
            this.filteredPartners = [];
            // Tri (liste)
            this.sortColumn = 'name';
            this.sortDirection = 'asc';
            this.tabs = [
                { key: 'tous', label: 'Tous les partenaires', icon: '🤝' },
                { key: 'categories', label: 'Par catégorie', icon: '📂' },
                { key: 'integrations', label: 'Intégrations', icon: '🔌' },
                { key: 'commissions', label: 'Commissions', icon: '💰' }
            ];
            this.categories = [
                'Banque',
                'Opérateur Télécom',
                'Fournisseur de services',
                'Marchand',
                'Institution publique'
            ];
            this.partners = [
                {
                    id: '1',
                    name: 'Banque de la République du Burundi',
                    code: 'BRB',
                    swiftCode: 'BRBUBI01',
                    accountNumber: '20001160001',
                    isActive: true,
                    category: 'Banque'
                },
                {
                    id: '2',
                    name: 'Banque Commerciale du Burundi (BANCOBU)',
                    code: 'BCOBU',
                    swiftCode: 'BCBUBI01',
                    accountNumber: '20002260002',
                    isActive: true,
                    category: 'Banque'
                },
                {
                    id: '3',
                    name: 'Banque de Crédit de Bujumbura',
                    code: 'BCB',
                    swiftCode: 'BCBIBI01',
                    accountNumber: '20003360003',
                    isActive: true,
                    category: 'Banque'
                },
                {
                    id: '4',
                    name: 'Interbank Burundi',
                    code: 'IBK',
                    swiftCode: 'IBKBBU01',
                    accountNumber: '20004460004',
                    isActive: true,
                    category: 'Banque'
                },
                {
                    id: '5',
                    name: 'Ecobank Burundi',
                    code: 'ECOB',
                    swiftCode: 'ECOBBI01',
                    accountNumber: '20005560005',
                    isActive: false,
                    category: 'Banque'
                },
                {
                    id: '6',
                    name: 'FinBank',
                    code: 'FINB',
                    swiftCode: 'FINBBI01',
                    accountNumber: '20006660006',
                    isActive: false,
                    category: 'Banque'
                }
            ];
            this.integrations = [
                {
                    id: '1',
                    name: 'API Banque',
                    icon: '🏦',
                    type: 'REST API',
                    version: 'v2.1.0',
                    partner: 'Banque de la République',
                    endpoint: 'https://api.brb.bi/v2',
                    lastSync: '2024-06-20 14:30',
                    apiKey: 'brb_sk_12345',
                    autoSync: true,
                    webhookEnabled: true,
                    active: true
                },
                {
                    id: '2',
                    name: 'API Econet',
                    icon: '📱',
                    type: 'SOAP',
                    version: 'v1.3.2',
                    partner: 'Econet Burundi',
                    endpoint: 'https://api.econet.bi/soap',
                    lastSync: '2024-06-20 15:00',
                    apiKey: 'eco_sk_67890',
                    autoSync: true,
                    webhookEnabled: false,
                    active: true
                },
                {
                    id: '3',
                    name: 'API PayTech',
                    icon: '💳',
                    type: 'GraphQL',
                    version: 'v3.0.0',
                    partner: 'PayTech Services',
                    endpoint: 'https://api.paytech.bi/graphql',
                    lastSync: '2024-06-19 18:45',
                    apiKey: 'pts_sk_24680',
                    autoSync: false,
                    webhookEnabled: true,
                    active: true
                },
                {
                    id: '4',
                    name: 'API Orange',
                    icon: '📱',
                    type: 'REST API',
                    version: 'v1.0.0',
                    partner: 'Orange Burundi',
                    endpoint: 'https://api.orange.bi/v1',
                    lastSync: '2024-06-18 09:15',
                    apiKey: 'ora_sk_13579',
                    autoSync: false,
                    webhookEnabled: false,
                    active: false
                }
            ];
            this.commissionRules = [
                {
                    id: '1',
                    partner: 'Banque de la République',
                    icon: '🏦',
                    type: 'pourcentage',
                    rate: '0.5%',
                    minAmount: 1000,
                    maxAmount: 1000000,
                    category: 'Banque',
                    active: true
                },
                {
                    id: '2',
                    partner: 'Econet Burundi',
                    icon: '📱',
                    type: 'mixte',
                    rate: '1.2% + 100 BIF',
                    minAmount: 500,
                    maxAmount: 500000,
                    category: 'Opérateur Télécom',
                    active: true
                },
                {
                    id: '3',
                    partner: 'PayTech Services',
                    icon: '💳',
                    type: 'pourcentage',
                    rate: '2.0%',
                    minAmount: 200,
                    maxAmount: 200000,
                    category: 'Fournisseur de services',
                    active: true
                },
                {
                    id: '4',
                    partner: 'Super Marché Central',
                    icon: '🛍️',
                    type: 'fixe',
                    rate: '250 BIF',
                    minAmount: 0,
                    maxAmount: 0,
                    category: 'Marchand',
                    active: true
                }
            ];
        }
        PartnersSettingsComponent_1.prototype.ngOnInit = function () {
            this.applyFilters();
        };
        // ========== NAVIGATION ==========
        PartnersSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
        };
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "totalPartners", {
            // ========== COMPTES ==========
            get: function () {
                return this.partners.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "activePartners", {
            get: function () {
                return this.partners.filter(function (p) { return p.isActive; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "inactivePartners", {
            get: function () {
                return this.partners.filter(function (p) { return !p.isActive; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "totalCategories", {
            get: function () {
                return new Set(this.partners.map(function (p) { var _a; return (_a = p.category) !== null && _a !== void 0 ? _a : 'Banque'; })).size;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "activeIntegrations", {
            get: function () {
                return this.integrations.filter(function (i) { return i.active; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "categoryStats", {
            // ========== CATEGORY STATS ==========
            get: function () {
                var _this = this;
                var stats = this.categories.map(function (cat) {
                    var partners = _this.partners.filter(function (p) { var _a; return ((_a = p.category) !== null && _a !== void 0 ? _a : 'Banque') === cat; });
                    var active = partners.filter(function (p) { return p.isActive; }).length;
                    var inactive = partners.filter(function (p) { return !p.isActive; }).length;
                    return {
                        name: cat,
                        icon: _this.getCategoryIcon(cat),
                        count: partners.length,
                        active: active,
                        inactive: inactive
                    };
                });
                return stats.filter(function (s) { return s.count > 0; });
            },
            enumerable: false,
            configurable: true
        });
        PartnersSettingsComponent_1.prototype.getCategoryIcon = function (category) {
            var icons = {
                'Banque': '🏦',
                'Opérateur Télécom': '📱',
                'Fournisseur de services': '💳',
                'Marchand': '🛍️',
                'Institution publique': '🏛️'
            };
            return icons[category] || '🤝';
        };
        // ========== FILTERS ==========
        PartnersSettingsComponent_1.prototype.applyFilters = function () {
            var _this = this;
            var filtered = __spreadArray([], this.partners, true);
            if (this.searchTerm.trim()) {
                var term_1 = this.searchTerm.toLowerCase().trim();
                filtered = filtered.filter(function (p) {
                    var _a, _b;
                    return p.name.toLowerCase().includes(term_1) ||
                        p.code.toLowerCase().includes(term_1) ||
                        ((_a = p.swiftCode) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(term_1) ||
                        ((_b = p.accountNumber) !== null && _b !== void 0 ? _b : '').toLowerCase().includes(term_1);
                });
            }
            if (this.categoryFilter) {
                filtered = filtered.filter(function (p) { var _a; return ((_a = p.category) !== null && _a !== void 0 ? _a : 'Banque') === _this.categoryFilter; });
            }
            if (this.statusFilter) {
                var active_1 = this.statusFilter === 'active';
                filtered = filtered.filter(function (p) { return p.isActive === active_1; });
            }
            this.filteredPartners = filtered;
            this.currentPage = 1;
        };
        PartnersSettingsComponent_1.prototype.resetFilters = function () {
            this.searchTerm = '';
            this.categoryFilter = '';
            this.statusFilter = '';
            this.applyFilters();
        };
        PartnersSettingsComponent_1.prototype.filterByCategory = function (category) {
            this.categoryFilter = category;
            this.activeTab = 'tous';
            this.applyFilters();
        };
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "paginatedPartners", {
            // ========== PAGINATION & TRI ==========
            get: function () {
                var _this = this;
                var sorted = __spreadArray([], this.filteredPartners, true).sort(function (a, b) {
                    var _a, _b;
                    var av = String((_a = a[_this.sortColumn]) !== null && _a !== void 0 ? _a : '').toLowerCase();
                    var bv = String((_b = b[_this.sortColumn]) !== null && _b !== void 0 ? _b : '').toLowerCase();
                    var cmp = av.localeCompare(bv);
                    return _this.sortDirection === 'asc' ? cmp : -cmp;
                });
                var start = (this.currentPage - 1) * this.pageSize;
                var end = start + this.pageSize;
                return sorted.slice(start, end);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PartnersSettingsComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.filteredPartners.length / this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        PartnersSettingsComponent_1.prototype.previousPage = function () {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        };
        PartnersSettingsComponent_1.prototype.nextPage = function () {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        };
        PartnersSettingsComponent_1.prototype.onSort = function (column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }
        };
        PartnersSettingsComponent_1.prototype.getSortMarker = function (column) {
            if (this.sortColumn !== column)
                return '↕';
            return this.sortDirection === 'asc' ? '↑' : '↓';
        };
        // ========== STATUS HELPERS ==========
        PartnersSettingsComponent_1.prototype.getStatusLabel = function (active) {
            return active ? 'Actif' : 'Inactif';
        };
        PartnersSettingsComponent_1.prototype.getStatusBadgeClass = function (active) {
            return active ? 'status-badge--success' : 'status-badge--danger';
        };
        // ========== PARTNER ACTIONS ==========
        PartnersSettingsComponent_1.prototype.viewPartner = function (partner) {
            this.selectedItem = partner;
            this.modalType = 'partner_detail';
            this.modalTitle = partner.name;
            this.formData = __assign({}, partner);
            this.showModal = true;
        };
        PartnersSettingsComponent_1.prototype.addPartner = function () {
            this.selectedItem = null;
            this.modalType = 'partner_add';
            this.modalTitle = 'Ajouter une banque partenaire';
            this.formData = {
                name: '',
                code: '',
                swiftCode: '',
                accountNumber: '',
                isActive: true,
                category: 'Banque'
            };
            this.showModal = true;
        };
        PartnersSettingsComponent_1.prototype.editPartner = function (partner) {
            this.selectedItem = partner;
            this.modalType = 'partner_edit';
            this.modalTitle = 'Modifier ' + partner.name;
            this.formData = __assign({}, partner);
            this.showModal = true;
        };
        PartnersSettingsComponent_1.prototype.savePartner = function () {
            if (this.modalType === 'partner_add') {
                var newPartner = __assign(__assign({}, this.formData), { id: (this.partners.length + 1).toString(), category: this.formData.category || 'Banque' });
                this.partners.push(newPartner);
                this.toast("Banque partenaire \"".concat(newPartner.name, "\" ajout\u00E9e avec succ\u00E8s"), 'success');
            }
            else if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Partenaire \"".concat(this.selectedItem.name, "\" modifi\u00E9 avec succ\u00E8s"), 'success');
            }
            this.closeModal();
            this.applyFilters();
        };
        PartnersSettingsComponent_1.prototype.togglePartnerStatus = function (partner) {
            partner.isActive = !partner.isActive;
            this.toast("Partenaire \"".concat(partner.name, "\" ").concat(partner.isActive ? 'activé' : 'désactivé'), partner.isActive ? 'success' : 'danger');
        };
        PartnersSettingsComponent_1.prototype.deletePartner = function (partner) {
            if (confirm("Voulez-vous vraiment supprimer \"".concat(partner.name, "\" ?"))) {
                this.partners = this.partners.filter(function (p) { return p.id !== partner.id; });
                this.toast("Partenaire \"".concat(partner.name, "\" supprim\u00E9"), 'danger');
                this.applyFilters();
            }
        };
        // ========== INTEGRATION ACTIONS ==========
        PartnersSettingsComponent_1.prototype.configureIntegration = function (integration) {
            this.selectedItem = integration;
            this.modalType = 'integration_config';
            this.modalTitle = 'Configuration - ' + integration.name;
            this.formData = __assign({}, integration);
            this.showModal = true;
        };
        PartnersSettingsComponent_1.prototype.testIntegration = function (integration) {
            var _this = this;
            this.toast("Test de l'int\u00E9gration \"".concat(integration.name, "\" en cours..."), 'info');
            setTimeout(function () {
                _this.toast("Test de \"".concat(integration.name, "\" r\u00E9ussi"), 'success');
            }, 1500);
        };
        PartnersSettingsComponent_1.prototype.toggleIntegration = function (integration) {
            integration.active = !integration.active;
            this.toast("Int\u00E9gration \"".concat(integration.name, "\" ").concat(integration.active ? 'activée' : 'désactivée'), integration.active ? 'success' : 'danger');
        };
        PartnersSettingsComponent_1.prototype.syncIntegration = function (integration) {
            var _this = this;
            this.toast("Synchronisation de \"".concat(integration.name, "\" en cours..."), 'info');
            setTimeout(function () {
                integration.lastSync = new Date().toLocaleString('fr-FR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
                _this.toast("Synchronisation de \"".concat(integration.name, "\" termin\u00E9e"), 'success');
            }, 2000);
        };
        PartnersSettingsComponent_1.prototype.saveIntegration = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Int\u00E9gration \"".concat(this.selectedItem.name, "\" configur\u00E9e avec succ\u00E8s"), 'success');
                this.closeModal();
            }
        };
        // ========== COMMISSION ACTIONS ==========
        PartnersSettingsComponent_1.prototype.editCommission = function (rule) {
            this.selectedItem = rule;
            this.modalType = 'commission_edit';
            this.modalTitle = 'Commission - ' + rule.partner;
            this.formData = __assign({}, rule);
            this.showModal = true;
        };
        PartnersSettingsComponent_1.prototype.toggleCommission = function (rule) {
            rule.active = !rule.active;
            this.toast("Commission \"".concat(rule.partner, "\" ").concat(rule.active ? 'activée' : 'désactivée'), rule.active ? 'success' : 'danger');
        };
        PartnersSettingsComponent_1.prototype.saveCommission = function () {
            if (this.selectedItem) {
                Object.assign(this.selectedItem, this.formData);
                this.toast("Commission \"".concat(this.selectedItem.partner, "\" sauvegard\u00E9e avec succ\u00E8s"), 'success');
                this.closeModal();
            }
        };
        // ========== MODAL ==========
        PartnersSettingsComponent_1.prototype.closeModal = function () {
            this.showModal = false;
            this.selectedItem = null;
            this.formData = {};
        };
        // ========== TOASTS ==========
        PartnersSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        PartnersSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return PartnersSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "PartnersSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PartnersSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PartnersSettingsComponent = _classThis;
}();
export { PartnersSettingsComponent };
//# sourceMappingURL=partners-settings.component.js.map