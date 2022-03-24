import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignApiService {
  private static readonly CAMPAIGN = 'campaigns'
  constructor(private apiService: ApiService, private campaignAdap: CampaignAdapter) {

  }
  async getAll() {
    let res: BaseResponse = await this.apiService.get(CampaignApiService.CAMPAIGN);
    res.data = res.data?.map((item: any) =>
      this.campaignAdap.adapt(item)
    )
 
    return res.data || [];
  }
}
