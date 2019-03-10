import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { StoreComponent } from './store/store.component';
import { DesignComponent } from './design/design/design.component';
import { ProdComponent } from './prod/prod.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';

const routes: Routes = [
  {path: '', redirectTo: 'Auth', pathMatch: 'full'},
  {path: 'Auth', component: AuthComponent, children: [
    {path: 'Login', component: LoginComponent}
  ]},
  {path: 'Store', component: StoreComponent},
  {path: 'Design', component: DesignComponent},
  {path: 'Prod', component: ProdComponent},
  {path: 'Admin', component: AdminComponent},
  {path: 'Users', component: ViewUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
