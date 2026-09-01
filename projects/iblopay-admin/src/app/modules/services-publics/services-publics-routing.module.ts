import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPublicsListComponent } from './pages/services-publics-list/services-publics-list.component';
import { ServicesPublicsDetailComponent } from './pages/services-publics-detail/services-publics-detail.component';
import { ServicesPublicsEditComponent } from './pages/services-publics-edit/services-publics-edit.component';
import { CategoriesListComponent } from './pages/categories/categories-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesPublicsListComponent,
    data: { title: 'Liste des services publics' }
  },
  {
    path: ':id',
    component: ServicesPublicsDetailComponent,
    data: { title: 'Détail du service public' }
  },
  {
    path: 'edit/:id',
    component: ServicesPublicsEditComponent,
    data: { title: 'Modifier un service public' }
  },
  {
    path: ':id/edit',
    redirectTo: 'edit/:id'
  },
  {
    path: ':id/categories',
    component: CategoriesListComponent,
    data: { title: 'Catégories du service' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesPublicsRoutingModule { }