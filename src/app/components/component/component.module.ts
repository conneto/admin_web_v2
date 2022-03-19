import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardCardComponent } from 'src/app/components/dashboard-card/dashboard-card.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { OrganizationInforCardComponent } from '../organization-infor-card/organization-infor-card.component';
import { CampaignCardInfoComponent } from 'src/app/components/campaign-card-info/campaign-card-info.component';
import { OrganizationRequestComponent } from 'src/app/pages/manage-request/organization-request/organization-request.component';

const componentModules = [
  MenuIconComponent,
  DashboardCardComponent,
  UserCardComponent,
  OrganizationInforCardComponent,
  CampaignCardInfoComponent,
  OrganizationInforCardComponent,
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
