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
  campaign?:Campaign;
  urlApi = this.loadingService.getApiGetLink.value;
  urlCover?: string;
  urlLogo?: string;
  constructor(private loadingService:LoadingServiceService,private location:Location,private activated :ActivatedRoute,private campaignApi:CampaignApiService) { }

  ngOnInit(): void {
    this.getByID();
  }
  async getByID(){
    const id=this.activated.snapshot.paramMap.get('id');
  
    this.campaign=await this.campaignApi.getById(`${id}`);
    console.log(this.campaign);
    this.urlLogo = this.campaign?.org_logo?.replace(/\\/g, '\/');
    this.urlCover = this.campaign?.cover?.replace(/\\/g, '\/');
   
  }
  goBack(){
    this.location.back();
  }
}
