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
            {
                path: 'organization-request', loadChildren: () => import('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module').then((m) => m.OrganizationRequestModule),
                children: [
                    {
                        path: '', loadChildren: () => import('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module').then((m) => m.OrganizationRequestModule),
                    }, 
                    {
                        path: 'organization-request-detail/:id', loadChildren: () =>
                            import('src/app/pages/manage-request/mod-organization/organization-request-details/organization-request-details.module').then(m => m.OrganizationRequestDetailsModule),
                    }
                ]
            },
            { path: 'manage-campaign', loadChildren: () => import('src/app/pages/campaigns/campaigns.module').then(m => m.CampaignsModule) },
            { path: 'manage-project', loadChildren: () => import('src/app/pages/project/project.module').then(m => m.ProjectModule) },
            { path: 'campaign-request', loadChildren: () => import('src/app/pages/manage-request/campaign-request/campaign-request.module').then(m => m.CampaignRequestModule) },
            { path: 'project-request', loadChildren: () => import('src/app/pages/manage-request/project-request/project-request.module').then(m => m.ProjectRequestModule) },

        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
