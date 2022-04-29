import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignApiService {
  public static readonly CAMPAIGNS = 'campaigns'
  public static readonly DONATION_DOCUMENTS = 'donation_documents'
  public static readonly CASHFLOW_DETAILS = 'cashflow_details'
  public static readonly CAMPAIGN_PARTICIPATIONS = 'campaign_participations';
  constructor(private apiService: ApiService, private campaignAdap: CampaignAdapter) {

  }
  async getAll() {
    let res: BaseResponse = await this.apiService.get(CampaignApiService.CAMPAIGNS);
    res.data = res.data?.map((item: any) =>
      this.campaignAdap.adapt(item)
    )

    return res.data || [];
  }
  async getById(id: string) {
    let res: BaseResponse = await this.apiService.get(`${CampaignApiService.CAMPAIGNS}/${id}`);
    res.data = this.campaignAdap.adapt(res.data);
    return res.data || [];
  }
  async createById(data: any, id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGNS}/${id}`, data);
    if (res.status != 0) {
      return null;
    }
    return res;
  }
  async create(data: any) {
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGNS}`, data);
    if (res.status != 0) {
      return res;
    }
    return res
  }
  async uploadCashFlow(data: any, id: string) {
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGNS}/${id}/${CampaignApiService.DONATION_DOCUMENTS}/${CampaignApiService.CASHFLOW_DETAILS}`, data);
    if (res.status != 0) {
      return res;
    }
    return res;
  }
  async uploadPdf(data: any, id: string) {
    let res: BaseResponse = await this.apiService.post(`${CampaignApiService.CAMPAIGNS}/${id}/${CampaignApiService.DONATION_DOCUMENTS}`, data);
    if (res.status != 0) {
      return res;
    }
    return res;
  }
  async getCashFlow(id: string) {
    let res: BaseResponse = await this.apiService.get(`${CampaignApiService.CAMPAIGNS}/${id}/${CampaignApiService.DONATION_DOCUMENTS}/${CampaignApiService.CASHFLOW_DETAILS}`);
  
    return res.data || [];
  }
  async getParticipations(id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.get(`${CampaignApiService.CAMPAIGNS}/${id}/${CampaignApiService.CAMPAIGN_PARTICIPATIONS}`);
    return res.data||[];
  }
  async delete(id:string){
    let res:BaseResponse=await this.apiService.delete(`${CampaignApiService.CAMPAIGNS}/${id}`);
    return res;
  }
  async getPdf(id:string){
    let res:BaseResponse=await this.apiService.get(`${CampaignApiService.CAMPAIGNS}/${id}/${CampaignApiService.DONATION_DOCUMENTS}`);
    return res.data||[];
  }
}
