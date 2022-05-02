import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/guard/auth.guard';
import {User} from 'src/app/models/user/user.model';
import {AuthService} from 'src/app/services/auth/auth.service';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {

    path: '', component: AdminComponent,
    children: [
      {
        path: ''
        , redirectTo: 'manage-organization', pathMatch: 'full'
      },
      {
        path: 'dashboard',

        loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(((m) => m.DashboardModule)),
      },
      {
        path: 'manage-organization',
        loadChildren: () => import('src/app/pages/management/mod-organization/organizations/organizations.module').then(m => m.OrganizationsModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/management/mod-organization/organizations/organizations.module').then((m) => m.OrganizationsModule),
          },
          {
            path: 'organization-request-detail/:id', loadChildren: () =>
              import('src/app/pages/management/mod-organization/organization-details/organization-details.module').then(m => m.OrganizationDetailsModule),
          }
        ]
      },

      {
        path: 'user-management',
        loadChildren: () => import('src/app/pages/user-management/user-management.module').then((m) => m.UserManagementModule),
        children: [
          {
        path: '',
        loadChildren: () => import('src/app/pages/user-management/user-management.module').then((m) => m.UserManagementModule),
          },
          {
        path: 'user-details/:id',
        loadChildren: () => import('src/app/pages/mod-user/user-details/user-details.module').then((m) => m.UserDetailsModule),
          }
        ]
      },
      {
        path: 'organization-request',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module').then((m) => m.OrganizationRequestModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module').then((m) => m.OrganizationRequestModule),
          },
          {
            path: 'organization-request-detail/:id', loadChildren: () =>
              import('src/app/pages/manage-request/mod-organization/organization-request-details/organization-request-details.module').then(m => m.OrganizationRequestDetailsModule),
          }
        ]
      },
      {
        path: 'manage-campaign',
        loadChildren: () => import('src/app/pages/management/mod-campaign/campaigns/campaigns.module').then(m => m.CampaignsModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/management/mod-campaign/campaigns/campaigns.module').then(m => m.CampaignsModule)
          },
          {
            path: 'campaign-details/:id',
            loadChildren: () => import('src/app/pages/management/mod-campaign/campaign-details/campaign-details.module').then(m => m.CampaignDetailsModule)
          },
        ]
      },
      {
        path: 'manage-project',
        loadChildren: () => import('src/app/pages/management/mod-project/project/project.module').then(m => m.ProjectModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/management/mod-project/project/project.module').then((m) => m.ProjectModule),
          },
          {
            path: 'project-request-detail/:id',
            loadChildren: () => import('src/app/pages/management/mod-project/project-details/project-details.module').then(m => m.ProjectDetailsModule)
          }
        ]
      },
      {
        path: 'campaign-request',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.module').then(m => m.CampaignRequestModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.module').then(m => m.CampaignRequestModule)
          }
          , {
            path: 'campaign-request-detail/:id',
            loadChildren: () => import('src/app/pages/manage-request/mod-campaign/campaign-request-detail/campaign-request-detail.module').then(m => m.CampaignRequestDetailModule),
          }
        ]
      },
      {
        path: 'project-request',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('src/app/pages/manage-request/mod-project/project-request/project-request.module').then(m => m.ProjectRequestModule),
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/manage-request/mod-project/project-request/project-request.module').then(m => m.ProjectRequestModule)
          },
          {
            path: 'project-request-detail/:id',
            loadChildren: () => import('src/app/pages/manage-request/mod-project/project-request-detail/project-request-detail.module').then(m => m.ProjectRequestDetailModule)
          },
        ]
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})

export class AdminRoutingModule {


}
