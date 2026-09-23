/**
 * Routes du module Paramètres Administrateur IBLOPAY.
 * À importer dans app.routes.ts, ex:
 *   { path: 'settings', loadChildren: () => import('./modules/settings/settings.routes').then(m => m.SETTINGS_ROUTES) }
 */
export var SETTINGS_ROUTES = [
    {
        path: '',
        loadComponent: function () {
            return import('./pages/settings-list/settings-list.component').then(function (m) { return m.SettingsListComponent; });
        }
    },
    {
        path: 'users',
        loadComponent: function () {
            return import('./pages/users-settings/users-settings.component').then(function (m) { return m.UsersSettingsComponent; });
        }
    },
    {
        path: 'wallets',
        loadComponent: function () {
            return import('./pages/wallet-settings/wallet-settings.component').then(function (m) { return m.WalletSettingsComponent; });
        }
    },
    {
        path: 'cards',
        loadComponent: function () {
            return import('./pages/cards-settings/cards-settings.component').then(function (m) { return m.CardsSettingsComponent; });
        }
    },
    {
        path: 'transactions',
        loadComponent: function () {
            return import('./pages/transactions-settings/transactions-settings.component').then(function (m) { return m.TransactionsSettingsComponent; });
        }
    },
    {
        path: 'financial',
        loadComponent: function () {
            return import('./pages/financial-settings/financial-settings.component').then(function (m) { return m.FinancialSettingsComponent; });
        }
    },
    {
        path: 'commissions',
        loadComponent: function () {
            return import('./pages/commissions-settings/commissions-settings.component').then(function (m) { return m.CommissionsSettingsComponent; });
        }
    },
    {
        path: 'services',
        loadComponent: function () {
            return import('./pages/services-settings/services-settings.component').then(function (m) { return m.ServicesSettingsComponent; });
        }
    },
    {
        path: 'reports',
        loadComponent: function () {
            return import('./pages/reports-settings/reports-settings.component').then(function (m) { return m.ReportsSettingsComponent; });
        }
    },
    {
        path: 'security',
        loadComponent: function () {
            return import('./pages/security-settings/security-settings.component').then(function (m) { return m.SecuritySettingsComponent; });
        }
    },
    {
        path: 'system',
        loadComponent: function () {
            return import('./pages/system-settings/system-settings.component').then(function (m) { return m.SystemSettingsComponent; });
        }
    },
    {
        path: 'partners',
        loadComponent: function () {
            return import('./pages/partners-settings/partners-settings.component').then(function (m) { return m.PartnersSettingsComponent; });
        }
    }
];
//# sourceMappingURL=settings.routes.js.map