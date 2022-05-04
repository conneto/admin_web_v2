import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';
import { Organization } from '../organization/organization';

export class Project {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public logo?: string,
    public cover?: string,
    public start_date?: number,
    public end_date?: number,
    public result_code?: number,
    public result_message?: string,
    public is_active?: boolean,
    public approved_by?: string,
    public approved_date?: number,
    public category?: string,
    public result_note?: string,
    public created_at?: number,
    public type?: string,
    public updated_at?: number,
    public organization_id?: string,
    public organization_name?: string,
    public organization_logo?: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class ProjectAdapter implements Adapter<Project> {
  adapt(item: any): Project {
    return new Project(
      item.id,
      item.name,
      item.description,
      item.logo,
      item.cover,
      item.start_date,
      item.end_date,
      item.result_code,
      item.result_message,
      item.is_active,
      item.approved_by,
      item.approved_date,
      item.category,
      item.result_note,
      item.created_at,
      item.type,
      item.updated_at,
      item.organization_id,
      item.organization_name,
      item.organization_logo
    );
  }
}
