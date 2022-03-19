import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent,

        children: [
            {
                path: ''
                , redirectTo: 'dashboard', pathMatch: 'full'
            },
            { path: 'manage-oraganization', loadChildren: () => import('src/app/pages/organizations/organizations.module').then(m => m.OrganizationsModule) },
            {
                path: 'dashboard', loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(((m) => m.DashboardModule)),
            },
            { path: 'user-management', loadChildren: () => import('src/app/pages/user-management/user-management.module').then((m) => m.UserManagementModule) },
            { path: 'organization-request', loadChildren: () => import('src/app/pages/manage-request/organization-request/organization-request.module').then(m => m.OrganizationRequestModule) },
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
