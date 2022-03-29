import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, }
  ,
  {
    path: "admin", loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: 'project-detail', loadChildren: () => import('./pages/manage-request/mod-project/project-request-detail/project-request-detail.module').then(m => m.ProjectRequestDetailModule) },

  { path: 'campagin-request-detail', loadChildren: () => import('./pages/manage-request/mod-campaign/campaign-request-detail/campaign-request-detail.module').then(m => m.CampaignRequestDetailModule) },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
