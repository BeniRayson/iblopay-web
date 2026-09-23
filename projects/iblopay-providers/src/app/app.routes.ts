import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {
  authGuard,
  adminGuard,
  transportGuard,
  evenementsGuard,
  droitGuard,
  invitesGuard
} from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [invitesGuard],
    loadComponent: () =>
      import('./core/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // SERVICES
      {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'services',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/services/services-list.component').then(m => m.ServicesListComponent)
      },
      {
        path: 'services/nouveau',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/services/service-form.component').then(m => m.ServiceFormComponent)
      },
      {
        path: 'services/:id/edit',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/services/service-form.component').then(m => m.ServiceFormComponent)
      },
      {
        path: 'formulaires',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/formulaires/formulaires-list.component').then(m => m.FormulairesListComponent)
      },
      {
        path: 'formulaires/builder',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/formulaires/form-builder.component').then(m => m.FormBuilderComponent)
      },
      {
        path: 'formulaires/:id/builder',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/formulaires/form-builder.component').then(m => m.FormBuilderComponent)
      },
      {
        path: 'formulaires/document',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/formulaires/document-formulaire.component').then(m => m.DocumentFormulaireComponent)
      },
      {
        path: 'formulaires/document/:id',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/formulaires/document-formulaire.component').then(m => m.DocumentFormulaireComponent)
      },
      {
        path: 'workflows',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/workflows/workflows-list.component').then(m => m.WorkflowsListComponent)
      },
      {
        path: 'workflows/nouveau',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/workflows/workflow-builder.component').then(m => m.WorkflowBuilderComponent)
      },
      {
        path: 'workflows/:id/builder',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/workflows/workflow-builder.component').then(m => m.WorkflowBuilderComponent)
      },

      // TRANSPORT — routes sous le Layout déjà en place
      {
        path: 'transport',
        canActivate: [transportGuard],
        loadComponent: () =>
          import('./features/transport/transport-dashboard.component').then(m => m.TransportDashboardComponent)
      },
      // ==========================
// VÉHICULES
// =========================

        {
          path: 'transport/vehicules',
          canActivate: [transportGuard],
          loadComponent: () =>
            import('./features/transport/vehicules/transport-vehicules.component')
              .then(m => m.TransportVehiculesComponent)
        },
         {
            path: 'transport/chauffeurs',
            canActivate: [transportGuard],
            loadComponent: () =>
              import('./features/transport/chauffeurs/transport-chauffeurs.component')
                .then(m => m.TransportChauffeursComponent)
          },
      {
        path: 'transport/recettes-versements',
        canActivate: [transportGuard],
        loadComponent: () =>
          import('./features/transport/recettes/transport-recettes-versements.component')
            .then(m => m.TransportRecettesVersementsComponent)
      },
      {
        path: 'transport/itineraires',
        canActivate: [transportGuard],
        loadComponent: () =>
          import('./features/transport/itineraire/transport-itineraires.component')
            .then(m => m.TransportItinerairesComponent)
      },
      {
        path: 'transport/rapports',
        canActivate: [transportGuard],
        loadComponent: () =>
          import('./features/transport/rapport/transport-rapports.component')
            .then(m => m.TransportRapportsComponent)
      },
       {
          path: 'transport/parametres',
          canActivate: [transportGuard],
          loadComponent: () =>
            import('./features/transport/parametres/transport-parametres.component')
              .then(m => m.TransportParametresComponent)
        },
      // Compatibilité avec les anciennes adresses du module Transport
      { path: 'transport/flotte', redirectTo: 'transport/vehicules', pathMatch: 'full' },
      { path: 'transport/lignes-tarifs', redirectTo: 'transport/itineraires', pathMatch: 'full' },
      { path: 'transport/statistiques', redirectTo: 'transport/recettes-versements', pathMatch: 'full' },
      {
        path: 'transport/courses',
        canActivate: [transportGuard],
        loadComponent: () =>
          import('./features/transport/courses-live.component').then(m => m.CoursesLiveComponent)
      },

      // ÉVÉNEMENTS
      {
        path: 'evenements',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/evenements-dashboard.component').then(m => m.EvenementsDashboardComponent)
      },
      {
        path: 'evenements/gestion',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/gestion-evenements.component').then(m => m.GestionEvenementsComponent)
      },
      {
        path: 'evenements/lieux',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/lieux.component').then(m => m.LieuxComponent)
      },
      {
        path: 'evenements/billetterie',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/billetterie-live.component').then(m => m.BilletterieLiveComponent)
      },
      {
        path: 'evenements/statistiques',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/statistiques-evenements.component').then(m => m.StatistiquesEvenementsComponent)
      },
      {
        path: 'evenements/rapports',
        canActivate: [evenementsGuard],
        loadComponent: () =>
          import('./features/evenements/rapports-evenements.component').then(m => m.RapportsEvenementsComponent)
      },

      // AUTRES FONCTIONS
      {
        path: 'demandes',
        canActivate: [droitGuard('VOIR_DEMANDE')],
        loadComponent: () =>
          import('./features/demandes/demandes-list.component').then(m => m.DemandesListComponent)
      },
      {
        path: 'utilisateurs',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/utilisateurs/utilisateurs-list.component').then(m => m.UtilisateursListComponent)
      },
      {
        path: 'statistiques',
        canActivate: [droitGuard('VOIR_STATISTIQUES')],
        loadComponent: () =>
          import('./features/statistiques/statistiques.component').then(m => m.StatistiquesComponent)
      },
      {
        path: 'rapports',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/rapports/rapports.component').then(m => m.RapportsComponent)
      },
      {
        path: 'parametres',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/parametres/parametres.component').then(m => m.ParametresComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
