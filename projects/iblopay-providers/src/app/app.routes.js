import { LayoutComponent } from './core/layout/layout.component';
import { authGuard, adminGuard, transportGuard, evenementsGuard, droitGuard, invitesGuard } from './core/auth.guard';
export var routes = [
    {
        path: 'login',
        canActivate: [invitesGuard],
        loadComponent: function () { return import('./core/auth/login.component').then(function (m) { return m.LoginComponent; }); }
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/dashboard/dashboard.component').then(function (m) { return m.DashboardComponent; }); }
            },
            {
                path: 'services',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/services/services-list.component').then(function (m) { return m.ServicesListComponent; }); }
            },
            {
                path: 'services/nouveau',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/services/service-form.component').then(function (m) { return m.ServiceFormComponent; }); }
            },
            {
                path: 'services/:id/edit',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/services/service-form.component').then(function (m) { return m.ServiceFormComponent; }); }
            },
            {
                path: 'formulaires',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/formulaires/formulaires-list.component').then(function (m) { return m.FormulairesListComponent; }); }
            },
            {
                path: 'formulaires/builder',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/formulaires/form-builder.component').then(function (m) { return m.FormBuilderComponent; }); }
            },
            {
                path: 'formulaires/:id/builder',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/formulaires/form-builder.component').then(function (m) { return m.FormBuilderComponent; }); }
            },
            {
                path: 'formulaires/document',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/formulaires/document-formulaire.component').then(function (m) { return m.DocumentFormulaireComponent; }); }
            },
            {
                path: 'formulaires/document/:id',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/formulaires/document-formulaire.component').then(function (m) { return m.DocumentFormulaireComponent; }); }
            },
            {
                path: 'workflows',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/workflows/workflows-list.component').then(function (m) { return m.WorkflowsListComponent; }); }
            },
            {
                path: 'workflows/nouveau',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/workflows/workflow-builder.component').then(function (m) { return m.WorkflowBuilderComponent; }); }
            },
            {
                path: 'workflows/:id/builder',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/workflows/workflow-builder.component').then(function (m) { return m.WorkflowBuilderComponent; }); }
            },
            {
                path: 'transport',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/transport-dashboard.component').then(function (m) { return m.TransportDashboardComponent; }); }
            },
            {
                path: 'transport/flotte',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/flotte.component').then(function (m) { return m.FlotteComponent; }); }
            },
            {
                path: 'transport/lignes-tarifs',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/lignes-tarifs.component').then(function (m) { return m.LignesTarifsComponent; }); }
            },
            {
                path: 'transport/courses',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/courses-live.component').then(function (m) { return m.CoursesLiveComponent; }); }
            },
            {
                path: 'transport/statistiques',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/statistiques-transport.component').then(function (m) { return m.StatistiquesTransportComponent; }); }
            },
            {
                path: 'transport/rapports',
                canActivate: [transportGuard],
                loadComponent: function () { return import('./features/transport/rapports-transport.component').then(function (m) { return m.RapportsTransportComponent; }); }
            },
            {
                path: 'evenements',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/evenements-dashboard.component').then(function (m) { return m.EvenementsDashboardComponent; }); }
            },
            {
                path: 'evenements/gestion',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/gestion-evenements.component').then(function (m) { return m.GestionEvenementsComponent; }); }
            },
            {
                path: 'evenements/lieux',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/lieux.component').then(function (m) { return m.LieuxComponent; }); }
            },
            {
                path: 'evenements/billetterie',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/billetterie-live.component').then(function (m) { return m.BilletterieLiveComponent; }); }
            },
            {
                path: 'evenements/statistiques',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/statistiques-evenements.component').then(function (m) { return m.StatistiquesEvenementsComponent; }); }
            },
            {
                path: 'evenements/rapports',
                canActivate: [evenementsGuard],
                loadComponent: function () { return import('./features/evenements/rapports-evenements.component').then(function (m) { return m.RapportsEvenementsComponent; }); }
            },
            {
                path: 'demandes',
                canActivate: [droitGuard('VOIR_DEMANDE')],
                loadComponent: function () { return import('./features/demandes/demandes-list.component').then(function (m) { return m.DemandesListComponent; }); }
            },
            {
                path: 'utilisateurs',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/utilisateurs/utilisateurs-list.component').then(function (m) { return m.UtilisateursListComponent; }); }
            },
            {
                path: 'statistiques',
                canActivate: [droitGuard('VOIR_STATISTIQUES')],
                loadComponent: function () { return import('./features/statistiques/statistiques.component').then(function (m) { return m.StatistiquesComponent; }); }
            },
            {
                path: 'rapports',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/rapports/rapports.component').then(function (m) { return m.RapportsComponent; }); }
            },
            {
                path: 'parametres',
                canActivate: [adminGuard],
                loadComponent: function () { return import('./features/parametres/parametres.component').then(function (m) { return m.ParametresComponent; }); }
            }
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];
//# sourceMappingURL=app.routes.js.map