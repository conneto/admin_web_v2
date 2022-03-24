import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { ProjectAdapter } from 'src/app/models/projects/project.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  public static readonly PROJECT = 'projects';
  constructor(private api: ApiService, private projectAdap: ProjectAdapter) { }

  async getAll() {
    let res: BaseResponse = await this.api.get(ProjectApiService.PROJECT);
    res.data = res.data?.map((item: unknown) =>
      this.projectAdap.adapt(item)
    )
    return res.data || []
  }
}
