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
  public static readonly PROJECT = 'projects';
  constructor(
    private campaignAdapter: CampaignAdapter,
    private api: ApiService,
    private projectAdap: ProjectAdapter
  ) {}

  async getAll() {
    let res: BaseResponse = await this.api.get(ProjectService.PROJECT);
    res.data = res.data?.map((item: any) => this.projectAdap.adapt(item));
    return res.data || [];
  }
  async getByID(id: string) {
    let res: any = await this.api.get(
      ProjectService.PROJECT + '/' + `${id}`
    );
    return (res.data = this.projectAdap.adapt(res.data) || []);
  }
  async getCampaignsByProjectId(id: string) {
    let res: BaseResponse = await this.api.get(
      `${ProjectService.PROJECT}/${id}/${Constant.CAMPAIGN}`
    );
    res.data = res.data.map((item: any) => {
      return this.campaignAdapter.adapt(item);
    });
    return res.data || [];
  }
  async createProject(data: any) {
    let res: BaseResponse = await this.api.post(
      ProjectService.PROJECT,
      data
    );
    return res || [];
  }
  async delete(id: string) {
    let res: BaseResponse = await this.api.delete(
      `${ProjectService.PROJECT}/${id}`
    );
    return res;
  }
}
