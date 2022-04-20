import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  campaign?: Campaign;
  urlApi = this.loadingService.getApiGetLink.value;
  urlCover?: string;
  urlLogo?: string;
  urlProjectLogo?:string;
  isInformation?: boolean;
  constructor(private loadingService: LoadingServiceService, private location: Location, private activated: ActivatedRoute, private campaignApi: CampaignApiService) { }

  ngOnInit(): void {
    this.getByID();
    this.isInformation = true;
  }
  async getByID() {
    const id = this.activated.snapshot.paramMap.get('id');

    this.campaign = await this.campaignApi.getById(`${id}`);

    this.urlLogo = this.campaign?.org_logo?.replace(/\\/g, '\/');
    this.urlCover = this.campaign?.cover?.replace(/\\/g, '\/');
    this.urlProjectLogo = this.campaign?.pro_logo?.replace(/\\/g, '\/');
    switch (this.campaign?.type) {
      case 'donation': this.campaign.type = 'Quyên Góp';
        this.campaign.org_id = (this.campaign.totalDonated! / this.campaign.target!).toString();
        break;
      case 'recruitment': this.campaign.type = 'Thiện Nguyện';
        this.campaign.org_id = (this.campaign.totalPaticipant! / this.campaign.target!).toString();
        break;
    }


  }
  goBack() {
    this.location.back();
  }
  getTab(id: any) {
    switch (id) {
      case 'infor':
        this.isInformation = true;


        break;

      case 'doc':

        this.isInformation = false;

        break;
    }
  }
}
