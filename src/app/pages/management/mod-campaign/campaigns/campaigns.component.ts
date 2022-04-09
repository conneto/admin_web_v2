import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];
  user?: User;
  isEmpty?: boolean = false;
  constructor(private api: CampaignApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.check();
  }
  async check() {
    this.user = this.authApi.currentUserValue;

    if (this.user?.role === 'organization_manager') {
      this.campaigns = await this.api.getAll();
      for (var i = 0; i < this.campaigns.length; i++) {
        this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');
      }
      this.campaigns = this.campaigns.filter(x => {
        return x.result_code !== 711;
      })
      if (this.campaigns == [] || this.campaigns.length <= 0) {
        this.isEmpty = true;
      }
    } else {
      this.campaigns = await this.api.getAll();
      for (var i = 0; i < this.campaigns.length; i++) {
        this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');
      }
      this.campaigns = this.campaigns.filter(x => {
        return x.result_code === 710;
      })
      if (this.campaigns == [] || this.campaigns.length <= 0) {
        this.isEmpty = true;
      }
    }
  }
  async getAll() {
    this.campaigns = await this.api.getAll();

  }
}
