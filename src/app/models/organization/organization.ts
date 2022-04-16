
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class Organization {
  constructor(
    public id?: string,
    public category?:string,
    public type?:string,
    public name?: string,
    public description?: string,
    public founding_date?: number,
    public eng_name?: string,
    public is_active?: boolean,
    public logo?: string,
    public mission?: string,
    public cover?: string,
    public operating_license?: string,
    public vision?: boolean,
    public website?: string,
    public approved_by?: string,
    public approved_date?: number,
    public created_by?: string,
    public result_code?: number,
    public result_message?: string,
    public result_note?: string,
    public created_at?: number,
    public created_name?: number,

  ) { }
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationAdapter implements Adapter<Organization> {
  adapt(item: any): Organization {
    return new Organization(
      item.id,
      item.category,
      item.type,
      item.name,
      item.description,
      item.founding_date,
      item.eng_name,
      item.is_active,
      item.logo,
      item.mission,
      item.cover,
      item.operating_license,
      item.vision,
      item.website,
      item.approved_by,
      item.approved_date,
      item.created_by,
      item.result_code,
      item.result_message,
      item.result_note,
      item.created_at,
      item.created_by_name

    );
  }
}
