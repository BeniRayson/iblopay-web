// src/app/modules/users/users-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UsersFundComponent } from './components/users-fund/users-fund.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: ':id',
    component: UsersDetailComponent
  },
  {
    path: ':id/edit',
    component: UsersDetailComponent,
    data: { editMode: true }
  },
  {
    path: ':id/fund',
    component: UsersFundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }