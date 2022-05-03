import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Constant } from 'src/app/constant/constant';
import { UserLoginResponse } from 'src/app/dtos/user-login-response/user-login-response.model';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { OrganizationAdapter } from 'src/app/models/organization/organization';
import { ProjectAdapter } from 'src/app/models/projects/project.model';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { CampaignService } from '../campaign/campaign.service';
import { ProjectService } from '../project-service/project.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationApiService {
  public static readonly CREATE = 'create';
  user?: UserLoginResponse;
  constructor(
    private campaignAdapter: CampaignAdapter,
    private projectAdapter: ProjectAdapter,
    private apiService: ApiService,
    private adapter: OrganizationAdapter,
    private authApi: AuthService
  ) {
    this.user = authApi.currentUserValue;
  }

  async getAll() {
    let res: BaseResponse = await this.apiService.get(Constant.ORGANIZATIONS);
    res.data = res.data?.map((item: any) => this.adapter.adapt(item));
    return res.data || [];
  }
  async getProjectsByOrgId(id: string) {
    let res: BaseResponse = await this.apiService.get(
      `${Constant.ORGANIZATIONS}/${id}/${Constant.PROJECTS}`
    );
    res.data = res.data.map((item: any) => {
      return this.projectAdapter.adapt(item);
    });

    return res.data || [];
  }
  async getCampaignsByOrgId(id: string) {
    let res: BaseResponse = await this.apiService.get(
      `${Constant.ORGANIZATIONS}/${id}/${Constant.CAMPAIGNS}`
    );
    res.data = res.data.map((item: any) => {
      return this.campaignAdapter.adapt(item);
    });
    return res.data || [];
  }
  async getById(id: string) {
    let res: any = await this.apiService.get(`${Constant.ORGANIZATIONS}/${id}`);
    res.data = this.adapter.adapt(res.data);
    return res.data || [];
  }
  async create(data: any) {
    let res: BaseResponse = await this.apiService.post(
      `${Constant.ORGANIZATIONS}`,
      data
    );
    if (res.status != 0) {
      return res;
    }
    return res;
  }
  async delete(id: any) {
    let res: BaseResponse = await this.apiService.delete(
      `${Constant.ORGANIZATIONS}/${id}`
    );

    return res;
  }
  async createById(data: any, id: string) {
    console.log(id);
    let res: BaseResponse = await this.apiService.post(
      `${Constant.ORGANIZATIONS}/${id}`,
      data
    );
    if (res.status == 0) {
      return res;
    }
    return res;
  }
  async updateById(data: any, id: string) {
    let res: BaseResponse = await this.apiService.put(
      `${Constant.ORGANIZATIONS}/${id}`,
      data
    );
    return res;
  }
}
