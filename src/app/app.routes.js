import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';
export var routes = [
    {
        path: '',
        redirectTo: '/authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        canActivate: [NoAuthGuard],
        loadChildren: function () { return import('./modules/auth/auth.module').then(function (m) { return m.AuthModule; }); }
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/dashboard/dashboard.module').then(function (m) { return m.DashboardModule; }); }
    },
    // Routes pour tous les modules du menu
    {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/users/users.module').then(function (m) { return m.UsersModule; }); }
    },
    {
        path: 'agents',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/agents/agents.module').then(function (m) { return m.AgentsModule; }); }
    },
    {
        path: 'super-agents',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/super-agents/super-agents.module').then(function (m) { return m.SuperAgentsModule; }); }
    },
    {
        path: 'merchants',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/merchants/merchants.module').then(function (m) { return m.MerchantsModule; }); }
    },
    {
        path: 'clients',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/clients/clients.module').then(function (m) { return m.ClientsModule; }); }
    },
    {
        path: 'commissions',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/commissions/commissions.module').then(function (m) { return m.CommissionsModule; }); }
    },
    {
        path: 'transactions',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/transactions/transactions.module').then(function (m) { return m.TransactionsModule; }); }
    },
    {
        path: 'services-publics',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/services-publics/services-publics.module').then(function (m) { return m.ServicesPublicsModule; }); }
    },
    {
        path: 'requests',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/requests/requests.module').then(function (m) { return m.RequestsModule; }); }
    },
    {
        path: 'workflows',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/workflows/workflows.module').then(function (m) { return m.WorkflowsModule; }); }
    },
    {
        path: 'intra-agricole',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/intra-agricole/intra-agricole.module').then(function (m) { return m.IntraAgricoleModule; }); }
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/reports/reports.module').then(function (m) { return m.ReportsModule; }); }
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/notifications/notifications.module').then(function (m) { return m.NotificationsModule; }); }
    },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: function () { return import('./modules/settings/settings.module').then(function (m) { return m.SettingsModule; }); }
    },
    {
        path: '**',
        redirectTo: '/authentication'
    }
];
//# sourceMappingURL=app.routes.js.map