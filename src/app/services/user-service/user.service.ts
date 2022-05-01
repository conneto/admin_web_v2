import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { DashboardApdater } from 'src/app/models/dashboard/dashboard.model';
import { UserAdapter } from 'src/app/models/user/user.model';
import { ApiService } from '../api/api.service';
import { CampaignApiService } from '../campaign/campaign-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static readonly STATISTICS = 'statistics'
  public static readonly ACCOUNTS = 'accounts'
  constructor(private api: ApiService, private dashboardAdapter: DashboardApdater, private userAdapter: UserAdapter) { }

  async getStatistics() {
    let res: BaseResponse = await this.api.get(UserService.STATISTICS);
    
    return res.data || [];
  }
  async getRanking(type?: string) {
    let res!: BaseResponse;
    if (type == 'recruitment') {
      res = await this.api.get(`${CampaignApiService.CAMPAIGNS}/top_volunteers?type=participate`);
    } else {
      res = await this.api.get(`${CampaignApiService.CAMPAIGNS}/top_volunteers?type=donate`);
    }
    return res.data || [];
  }
  async getListUsers() {
    let res: BaseResponse = await this.api.get(UserService.ACCOUNTS);

    res.data = res.data.map((item: any) =>
      this.userAdapter.adapt(item)
    )
    return res.data || [];
  }
}
