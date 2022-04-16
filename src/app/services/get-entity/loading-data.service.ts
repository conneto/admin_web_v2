import { Injectable } from '@angular/core';
import { CampaignCardInfoComponent } from 'src/app/components/campaign-card-info/campaign-card-info.component';
import { CampaignRequestComponent } from 'src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.component';
import { OrganizationRequestComponent } from 'src/app/pages/manage-request/mod-organization/organization-request/organization-request.component';
import { ProjectRequestComponent } from 'src/app/pages/manage-request/mod-project/project-request/project-request.component';
import { CampaignDetailsComponent } from 'src/app/pages/management/mod-campaign/campaign-details/campaign-details.component';
import { CampaignsComponent } from 'src/app/pages/management/mod-campaign/campaigns/campaigns.component';
import { OrganizationDetailsComponent } from 'src/app/pages/management/mod-organization/organization-details/organization-details.component';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { ProjectDetailsComponent } from 'src/app/pages/management/mod-project/project-details/project-details.component';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingDataService {

  constructor(private organization: OrganizationsComponent, private campaign: CampaignsComponent, private project: ProjectComponent, private orgRequest: OrganizationRequestComponent, private campRequest: CampaignRequestComponent,
    private proRequest: ProjectRequestComponent
  ) {
  }

 public getByEntity(entity: string) {
    switch (entity) {
      case 'org': this.organization.checkToGetData();
        break;
      case 'pro': this.project.checkToGetData();
        break;
      case 'cam': this.campaign.checkToGetData()
        break;
    }
  }
}
