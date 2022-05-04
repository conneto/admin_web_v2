import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { Guard2Guard } from './guard/guard2.guard';
import { Guard3Guard } from './guard/guard3.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  { path: '',canActivate:[Guard3Guard], loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule) },
  { path: 'login', component: LoginComponent },
  {
    path: "admin", canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  {
    path: 'manager', canActivate: [Guard2Guard], loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'user-details', loadChildren: () => import('./pages/mod-user/user-details/user-details.module').then(m => m.UserDetailsModule) },

  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
