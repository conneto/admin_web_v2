import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignApiService {
  public static readonly CAMPAIGN = 'campaigns'
  constructor(private apiService: ApiService, private campaignAdap: CampaignAdapter) {

  }
  async getAll() {
    let res: BaseResponse = await this.apiService.get(CampaignApiService.CAMPAIGN);
    res.data = res.data?.map((item: any) =>
      this.campaignAdap.adapt(item)
    )

    return res.data || [];
  }
  async getById(id: string) {
    let res: BaseResponse = await this.apiService.get(`${CampaignApiService.CAMPAIGN}/${id}`);
    res.data = this.campaignAdap.adapt(res.data);
    return res.data || [];
  }
  async createById(data: any, id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGN}/${id}`, data);
    if (res.status != 0) {
      return null;
    }
    return res;
  }
  async create(data: any) {
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGN}`, data);
    if (res.status != 0) {
      return res;
    }
    return res
  }
}
