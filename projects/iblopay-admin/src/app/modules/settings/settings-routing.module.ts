import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/settings-list/settings-list.component').then(m => m.SettingsListComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users-settings/users-settings.component').then(m => m.UsersSettingsComponent)
  },
  {
    path: 'wallets',
    loadComponent: () =>
      import('./pages/wallet-settings/wallet-settings.component').then(m => m.WalletSettingsComponent)
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./pages/cards-settings/cards-settings.component').then(m => m.CardsSettingsComponent)
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions-settings/transactions-settings.component').then(m => m.TransactionsSettingsComponent)
  },
  {
    path: 'financial',
    loadComponent: () =>
      import('./pages/financial-settings/financial-settings.component').then(m => m.FinancialSettingsComponent)
  },
  {
    path: 'commissions',
    loadComponent: () =>
      import('./pages/commissions-settings/commissions-settings.component').then(m => m.CommissionsSettingsComponent)
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services-settings/services-settings.component').then(m => m.ServicesSettingsComponent)
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports-settings/reports-settings.component').then(m => m.ReportsSettingsComponent)
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./pages/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent)
  },
  {
    path: 'system',
    loadComponent: () =>
      import('./pages/system-settings/system-settings.component').then(m => m.SystemSettingsComponent)
  },
  {
    path: 'partners',
    loadComponent: () =>
      import('./pages/partners-settings/partners-settings.component').then(m => m.PartnersSettingsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }