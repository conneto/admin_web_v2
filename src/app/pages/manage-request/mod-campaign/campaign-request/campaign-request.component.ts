import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';

@Component({
  selector: 'app-campaign-request',
  templateUrl: './campaign-request.component.html',
  styleUrls: ['./campaign-request.component.scss']
})
export class CampaignRequestComponent implements OnInit {
  campaigns: Campaign[] = [];
  constructor(private campaingApi: CampaignApiService) { }

  ngOnInit(): void {
    this.getAll();
  }
  async getAll() {
    this.campaigns = await this.campaingApi.getAll();
  }



}
