import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  campaign?:Campaign;
  constructor(private location:Location,private activated :ActivatedRoute,private campaignApi:CampaignApiService) { }

  ngOnInit(): void {
    this.getByID();
  }
  async getByID(){
    const id=this.activated.snapshot.paramMap.get('id');
    this.campaign=await this.campaignApi.getById(`${id}`);
  }
  goBack(){
    this.location.back();
  }
}
