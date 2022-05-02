import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { ApiService } from '../api/api.service';
import { Constant } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public static readonly CAMPAIGNS = 'campaigns'
  public static readonly DONATION_DOCUMENT = 'donation_documents'
  public static readonly CASHFLOW_DETAILS = 'cashflow_details'
  public static readonly CAMPAIGN_PARTICIPATIONS = 'campaign_participations';
  constructor(private apiService: ApiService, private campaignAdap: CampaignAdapter) {

  }
  async getAll() {
    let res: BaseResponse = await this.apiService.get(Constant.CAMPAIGN);
    res.data = res.data?.map((item: any) =>
      this.campaignAdap.adapt(item)
    )

    return res.data || [];
  }
  async getById(id: string) {
    let res: BaseResponse = await this.apiService.get(`${Constant.CAMPAIGN}/${id}`);
    res.data = this.campaignAdap.adapt(res.data);
    return res.data || [];
  }
  async createById(data: any, id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.post(`${Constant.CAMPAIGN}/${id}`, data);
    if (res.status != 0) {
      return null;
    }
    return res;
  }
  async create(data: any) {
    let res: BaseResponse = await this.apiService.post(`${Constant.CAMPAIGN}`, data);
    if (res.status != 0) {
      return res;
    }
    return res
  }
  async uploadCashFlow(data: any, id: string) {
    let res: BaseResponse = await this.apiService.post(`${Constant.CAMPAIGN}/${id}/${Constant.DONATION_DOCUMENTS}/${Constant.CASHFLOW_DETAILS}`, data);
    if (res.status != 0) {
      return res;
    }
    return res;
  }
  async uploadPdf(data: any, id: string) {
    let res: BaseResponse = await this.apiService.post(`${Constant.CAMPAIGN}/${id}/${Constant.DONATION_DOCUMENTS}`, data);
    if (res.status != 0) {
      return res;
    }
    return res;
  }
  async getCashFlow(id: string) {
    let res: BaseResponse = await this.apiService.get(`${Constant.CAMPAIGN}/${id}/${Constant.DONATION_DOCUMENTS}/${Constant.CASHFLOW_DETAILS}`);

    return res.data || [];
  }
  async getParticipations(id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.get(`${Constant.CAMPAIGN}/${id}/${Constant.CAMPAIGN_PARTICIPATIONS}`);
    return res.data||[];
  }
  async delete(id:string){
    let res:BaseResponse=await this.apiService.delete(`${Constant.CAMPAIGN}/${id}`);
    return res;
  }
  async getPdf(id:string){
    let res:BaseResponse=await this.apiService.get(`${Constant.CAMPAIGN}/${id}/${Constant.DONATION_DOCUMENTS}`);
    return res.data||[];
  }
}
