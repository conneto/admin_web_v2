import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  {
    path: "admin", loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  {
    path: 'manager',  loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'campaign-details', loadChildren: () => import('./pages/management/mod-campaign/campaign-details/campaign-details.module').then(m => m.CampaignDetailsModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
