import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campaign-request-detail',
  templateUrl: './campaign-request-detail.component.html',
  styleUrls: ['./campaign-request-detail.component.scss']
})
export class CampaignRequestDetailComponent implements OnInit {
campaign?:Campaign;
  constructor(private location:Location,private activated :ActivatedRoute,private campaignApi:CampaignService) { }

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
