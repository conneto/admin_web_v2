import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { OrganizationAdapter } from 'src/app/models/organization/organization';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationApiService {
  public static readonly ORGANIZATION = 'organizations';
  constructor(private apiService: ApiService, private adapter: OrganizationAdapter) { }
  async getAll() {
    let res: BaseResponse = await this.apiService.get(OrganizationApiService.ORGANIZATION);
    res.data = res.data?.map((item: any) =>
      this.adapter.adapt(item));
    return res.data || [];

  }

  async getById(id: string) {
    let res: any = await this.apiService.get(`${OrganizationApiService.ORGANIZATION}/${id}`);
    res.data = this.adapter.adapt(res.data);
    return res.data || [];
  }
}


