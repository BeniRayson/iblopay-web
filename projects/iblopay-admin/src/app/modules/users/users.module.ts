// src/app/modules/users/users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UsersFundComponent } from './components/users-fund/users-fund.component';
import { UsersStatusComponent } from './components/users-status/users-status.component';
import { UsersDeleteComponent } from './components/users-delete/users-delete.component'; // ✅ Ajouté
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailComponent,
    UsersFundComponent,
    UsersStatusComponent,
    UsersDeleteComponent // ✅ Ajouté
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }