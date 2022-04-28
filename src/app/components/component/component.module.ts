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

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TabgroupComponent } from '../tab-group/tabgroup.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

import { ProjectItemComponent } from '../project-item/project-item.component';
import { CampaignItemComponent } from '../campaign-item/campaign-item.component';
import { TableRankComponent } from '../table-rank/table-rank.component';
import { FormatnumberPipe } from 'src/app/pipes/FormatNumber/formatnumber.pipe';
import { DeleteEntityComponent } from '../delete-entity/delete-entity.component';
import { ChipCategoryComponent } from '../chip-category/chip-category.component';
import { SkeletionLoadingComponent } from '../skeletion-loading/skeletion-loading.component';
import { DownloadDocumentFormComponent } from '../download-document-form/download-document-form.component';
import { DocumentButtonComponent } from '../document-button/document-button.component';
import { SelectTypeCampaignComponent } from '../select-type-campaign/select-type-campaign.component';
import { ChangeToListComponent } from '../change-to-list/change-to-list.component';
import { ListViewComponent } from '../list-view/list-view.component';
import { TableCampaignParticipationsComponent } from '../table-campaign-participations/table-campaign-participations.component';


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
  TabgroupComponent,
  SearchBarComponent,
  ProjectItemComponent,
   CampaignItemComponent,
  TableRankComponent, 
  DeleteEntityComponent,
   ChipCategoryComponent,
   SkeletionLoadingComponent,
   DownloadDocumentFormComponent,
   DocumentButtonComponent,
   SelectTypeCampaignComponent,
   ChangeToListComponent,
   ListViewComponent,
   TableCampaignParticipationsComponent,

]

@NgModule({
  declarations: [...componentModules, FormatnumberPipe],
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
