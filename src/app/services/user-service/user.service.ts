import { Injectable } from '@angular/core';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { DashboardApdater } from 'src/app/models/dashboard/dashboard.model';
import { UserAdapter } from 'src/app/models/user/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private api: ApiService,
    private dashboardAdapter: DashboardApdater,
    private userAdapter: UserAdapter
  ) {}

  async getStatistics() {
    let res: BaseResponse = await this.api.get(Constant.STATISTICS);

    return res.data || [];
  }
  async getRanking(type?: string) {
    let res!: BaseResponse;
    if (type == 'recruitment') {
      res = await this.api.get(
        `${Constant.CAMPAIGNS}/top_volunteers?type=participate`
      );
    } else {
      res = await this.api.get(
        `${Constant.CAMPAIGNS}/top_volunteers?type=donate`
      );
    }
    return res.data || [];
  }
  async getListUsers() {
    let res: BaseResponse = await this.api.get(Constant.ACCOUNTS);

    res.data = res.data.map((item: any) => this.userAdapter.adapt(item));
    return res.data || [];
  }

  async getById(id: string) {
    let res: BaseResponse = await this.api.get(`${Constant.ACCOUNTS}/${id}`);

    res.data = this.userAdapter.adapt(res.data);

    // console.log(res.data);

    return res.data || null;
  }

  async getCampaignParticipations(id: string) {
    let res: BaseResponse = await this.api.get(
      `${Constant.ACCOUNTS}/${id}/${Constant.CAMPAIGN_PARTICIPATIONS}`
    );

    // console.log(res.data);

    return res.data || null;
  }
}
