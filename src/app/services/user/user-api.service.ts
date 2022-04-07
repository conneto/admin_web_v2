import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { DashboardApdater } from 'src/app/models/dashboard/dashboard.model';
import { UserAdapter } from 'src/app/models/user/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  public static readonly STATISTICS = 'statistics'
  public static readonly ACCOUNTS = 'accounts'
  constructor(private api: ApiService, private dashboardAdapter: DashboardApdater, private userAdapter: UserAdapter) { }

  async getStatistics() {
    let res: BaseResponse = await this.api.get(UserApiService.STATISTICS);
    console.log(res.data);
    res.data = this.dashboardAdapter.adapt(res.data);
    return res.data || [];
  }

  async getListUsers() {
    let res: BaseResponse = await this.api.get(UserApiService.ACCOUNTS);

    res.data = res.data.map((item: any) =>
      this.userAdapter.adapt(item)
    )
    return res.data || [];
  }
}
