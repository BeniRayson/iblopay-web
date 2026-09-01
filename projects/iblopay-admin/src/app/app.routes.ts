// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    // Routes pour tous les modules du menu
    {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'agents',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/agents/agents.module').then(m => m.AgentsModule)
    },
    {
        path: 'super-agents',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/super-agents/super-agents.module').then(m => m.SuperAgentsModule)
    },
    {
        path: 'merchants',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/merchants/merchants.module').then(m => m.MerchantsModule)
    },
    {
        path: 'clients',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
    },
    {
        path: 'commissions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/commissions/commissions.module').then(m => m.CommissionsModule)
    },
    {
        path: 'transactions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule)
    },
    {
        path: 'services-publics',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/services-publics/services-publics.module').then(m => m.ServicesPublicsModule)
    },
    {
        path: 'requests',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
    },
    {
        path: 'workflows',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/workflows/workflows.module').then(m => m.WorkflowsModule)
    },
    {
        path: 'intra-agricole',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/intra-agricole/intra-agricole.module').then(m => m.IntraAgricoleModule)
    },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
    },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: '**',
        redirectTo: '/authentication'
    }
];