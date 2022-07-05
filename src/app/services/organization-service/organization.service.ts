import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Constant } from 'src/app/constant/constant';
import { UserLoginResponse } from 'src/app/dtos/user-login-response/user-login-response.model';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { OrganizationAdapter } from 'src/app/models/organization/organization';
import { ProjectAdapter } from 'src/app/models/projects/project.model';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  user?: UserLoginResponse;
  constructor(
    private campaignAdapter: CampaignAdapter,
    private projectAdapter: ProjectAdapter,
    private apiService: ApiService,
    private adapter: OrganizationAdapter,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue;
  }

  async getAll() {
    let res: BaseResponse = await this.apiService.get(Constant.ORGANIZATIONS);
    res.data = res.data?.map((item: any) => this.adapter.adapt(item));
    return res.data || [];
  }
  public getAllByObservable(): any {
    return this.apiService.getByObservable(Constant.ORGANIZATIONS);
  }
  async getProjectsByOrgId(id: string) {
    
    let res: BaseResponse = await this.apiService.get(
      `${Constant.ORGANIZATIONS}/${id}/${Constant.PROJECTS}`
    );
    if (res.data) {
      res.data = res.data.map((item: any) => {
        return this.projectAdapter.adapt(item);
      });
    }

    return res.data || [];
  }
  async getCampaignsByOrgId(id: string) {
    let res: BaseResponse = await this.apiService.get(
      `${Constant.ORGANIZATIONS}/${id}/${Constant.CAMPAIGNS}`
    );
    if (res.data) {
      res.data = res.data.map((item: any) => {
        return this.campaignAdapter.adapt(item);
      });
    }
    return res.data || [];
  }
  async getById(id: string) {
    let res: any = await this.apiService.get(`${Constant.ORGANIZATIONS}/${id}`);
    res.data = this.adapter.adapt(res.data);
    return res.data || [];
  }
  public getIdByObservable(id:string){
    return this.apiService.getByObservable(`${Constant.ORGANIZATIONS}/${id}`).pipe(map(data=>{
     return this.adapter.adapt(data.data);
    }))
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
