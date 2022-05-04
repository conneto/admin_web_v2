import { Component, Injectable, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campaign-request',
  templateUrl: './campaign-request.component.html',
  styleUrls: ['./campaign-request.component.scss']
})
@Injectable({providedIn:'root'})
export class CampaignRequestComponent implements OnInit {
  campaigns: Campaign[] = [];
  constructor(private campaingApi: CampaignService) { }

  ngOnInit(): void {
    this.getRequest();
  }
  async getAll() {
    this.campaigns = await this.campaingApi.getAll();
    // console.log(this.campaigns);
  }



  async getRequest() {
    this.campaigns = await this.campaingApi.getAll();
    this.campaigns = this.campaigns.filter(x => {
      return x.result_code === 701;
    })
  }

}
