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

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
