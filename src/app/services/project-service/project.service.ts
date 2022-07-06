import { Injectable } from '@angular/core';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { CampaignAdapter } from 'src/app/models/campaign/campaign.model';
import { ProjectAdapter } from 'src/app/models/projects/project.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private campaignAdapter: CampaignAdapter,
    private apiService: ApiService,
    private projectAdap: ProjectAdapter
  ) {}

  async getAll() {
     let res: BaseResponse<any> = await this.apiService.get(Constant.PROJECTS);
    res.data = res.data?.map((item: any) => this.projectAdap.adapt(item));
    return res.data || [];
  }
  async getByID(id: string) {
    let res: any = await this.apiService.get(Constant.PROJECTS + '/' + `${id}`);
    return (res.data = this.projectAdap.adapt(res.data) || []);
  }
  async getCampaignsByProjectId(id: string) {
     let res: BaseResponse<any> = await this.apiService.get(
      `${Constant.PROJECTS}/${id}/${Constant.CAMPAIGNS}`
    );
    if (res.status != 8) {
      res.data = res.data.map((item: any) => {
        return this.campaignAdapter.adapt(item);
      });
    }
    return res.data || [];
  }
  async createProject(data: any) {
     let res: BaseResponse<any> = await this.apiService.post(Constant.PROJECTS, data);
    return res || [];
  }
  async updateById(data: any, id: string) {
     let res: BaseResponse<any> = await this.apiService.put(
      `${Constant.PROJECTS}/${id}`,
      data
    );
    return res;
  }

  async delete(id: string) {
     let res: BaseResponse<any> = await this.apiService.delete(
      `${Constant.PROJECTS}/${id}`
    );
    return res;
  }
}
