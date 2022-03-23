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
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { OrganizationInforCardComponent } from '../request-components/organization-infor-card/organization-infor-card.component';


const componentModules = [
  MenuIconComponent,
  DashboardCardComponent,
  UserCardComponent,
  OrganizationInforCardComponent,
  CampaignCardInfoComponent,
  CampaignRequestCardComponent,
  ProjectRequestCardComponent,
  SearchBarComponent,
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
