import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { UserCardComponent } from '../user-card/user-card.component';

import { CampaignCardInfoComponent } from '../campaign-card-info/campaign-card-info.component';
import { CampaignRequestCardComponent } from '../request-components/campaign-request-card/campaign-request-card.component';
import { ProjectRequestCardComponent } from '../request-components/project-request-card/project-request-card.component';

import { OrganizationInforCardComponent } from '../request-components/organization-infor-card/organization-infor-card.component';
import { ApproveDeclineButtonComponent } from 'src/app/components/approve-decline-button/approve-decline-button.component';
import { StatusComponent } from '../status/status.component';
import { OrganizationFormComponent } from '../create/organization-form/organization-form.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ProjectFormComponent } from '../create/project-form/project-form.component';
import { CamapaignFormComponent } from '../create/camapaign-form/camapaign-form.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import { ProjectRequestComponent } from 'src/app/pages/manage-request/mod-project/project-request/project-request.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';


const componentModules = [
  MenuIconComponent,
  DashboardCardComponent,
  UserCardComponent,
  OrganizationInforCardComponent,
  CampaignCardInfoComponent,
  CampaignRequestCardComponent,
  ProjectRequestCardComponent,
  ApproveDeclineButtonComponent,
  StatusComponent,
  OrganizationFormComponent,
  DialogConfirmComponent,
  ProjectFormComponent,
  CamapaignFormComponent,
  SnackBarMessageComponent,
  LoadingSpinnerComponent,
]

@NgModule({
  declarations: [...componentModules],
  imports: [
    RouterModule,
    CommonModule, AngularMaterialModule,
  ],
  exports: [
    ...componentModules,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule { }
