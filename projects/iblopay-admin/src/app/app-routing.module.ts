// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    // Toutes les routes protégées sous le layout commun (header + sidebar)
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'agents',
                loadChildren: () => import('./modules/agents/agents.module').then(m => m.AgentsModule)
            },
            {
                path: 'super-agents',
                loadChildren: () => import('./modules/super-agents/super-agents.module').then(m => m.SuperAgentsModule)
            },
            {
                path: 'merchants',
                loadChildren: () => import('./modules/merchants/merchants.module').then(m => m.MerchantsModule)
            },
            {
                path: 'clients',
                loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
            },
            {
                path: 'commissions',
                loadChildren: () => import('./modules/commissions/commissions.module').then(m => m.CommissionsModule)
            },
            {
                path: 'transactions',
                loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule)
            },
            {
                path: 'services-publics',
                loadChildren: () => import('./modules/services-publics/services-publics.module').then(m => m.ServicesPublicsModule)
            },
            {
                path: 'requests',
                loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
            },
            {
                path: 'workflows',
                loadChildren: () => import('./modules/workflows/workflows.module').then(m => m.WorkflowsModule)
            },
            {
                path: 'intra-agricole',
                loadChildren: () => import('./modules/intra-agricole/intra-agricole.module').then(m => m.IntraAgricoleModule)
            },
            {
                path: 'cards',
                loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
            },
            {
                path: 'notifications',
                loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }