import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  {
    path: "admin", canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  {
    path: 'manager', canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
