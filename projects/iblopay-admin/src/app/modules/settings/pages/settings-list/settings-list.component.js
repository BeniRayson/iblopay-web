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
var SettingsListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-settings-list',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './settings-list.component.html',
            styleUrls: ['./settings-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SettingsListComponent = _classThis = /** @class */ (function () {
        function SettingsListComponent_1(router) {
            this.router = router;
            this.searchTerm = '';
            this.categories = [
                { key: 'users', title: 'Gestion des utilisateurs', icon: '👥',
                    description: 'Clients, Agents, Super Agents et Administrateurs',
                    route: '/settings/users', sectionCount: 4 },
                { key: 'wallets', title: 'Gestion des Wallets', icon: '💰',
                    description: 'Wallet Client, Agent, Super Agent et Institution',
                    route: '/settings/wallets', sectionCount: 4 },
                { key: 'cards', title: 'Gestion des Cartes', icon: '💳',
                    description: 'Émission, association, stocks et inventaire des cartes',
                    route: '/settings/cards', sectionCount: 2 },
                { key: 'transactions', title: 'Gestion des Transactions', icon: '💸',
                    description: 'Historique, filtres, types et actions sur les transactions',
                    route: '/settings/transactions', sectionCount: 3 },
                { key: 'financial', title: 'Gestion Financière', icon: '🏦',
                    description: 'Trust Account, liquidité et comptabilité',
                    route: '/settings/financial', sectionCount: 3 },
                { key: 'commissions', title: 'Gestion des Commissions', icon: '💵',
                    description: 'Configuration, paiement et historique des commissions',
                    route: '/settings/commissions', sectionCount: 3 },
                { key: 'services', title: 'Gestion des Services', icon: '🏛',
                    description: 'Eau, électricité, internet, taxes, assurance, etc.',
                    route: '/settings/services', sectionCount: 2 },
                { key: 'reports', title: 'Rapports & Business Intelligence', icon: '📈',
                    description: 'Dashboard, rapports, exports et graphiques',
                    route: '/settings/reports', sectionCount: 4 },
                { key: 'security', title: 'Sécurité & Conformité', icon: '🔐',
                    description: 'Authentification, permissions, audit, fraude, KYC/AML',
                    route: '/settings/security', sectionCount: 6 },
                { key: 'system', title: 'Configuration Générale', icon: '⚙',
                    description: 'Frais, limites, notifications et paramètres système',
                    route: '/settings/system', sectionCount: 4 },
                { key: 'partners', title: 'Gestion des Partenaires', icon: '🌍',
                    description: 'Banques, opérateurs télécom, marchands, institutions',
                    route: '/settings/partners', sectionCount: 1 }
            ];
        }
        Object.defineProperty(SettingsListComponent_1.prototype, "filteredCategories", {
            get: function () {
                var term = this.searchTerm.trim().toLowerCase();
                if (!term)
                    return this.categories;
                return this.categories.filter(function (c) {
                    return c.title.toLowerCase().includes(term) ||
                        c.description.toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        SettingsListComponent_1.prototype.goTo = function (category) {
            this.router.navigateByUrl(category.route);
        };
        return SettingsListComponent_1;
    }());
    __setFunctionName(_classThis, "SettingsListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SettingsListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SettingsListComponent = _classThis;
}();
export { SettingsListComponent };
//# sourceMappingURL=settings-list.component.js.map