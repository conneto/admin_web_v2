
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class Organization {
  constructor(
    public cover?: string,
    public description?: string,
    public eng_name?: string,
    public foundingDate?: number,
    public id?: string,
    public is_active?:boolean,
    public logo?: string,
    public mission?: string,
    public name?: string,
    public operating_license?: string,
    public vision?: boolean,
    public website?:string,
  
  ) { }
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationAdapter implements Adapter<Organization> {
  adapt(item: any): Organization {
    return new Organization(
      item.cover,
      item.description,
      item.eng_name,
      item.founding_date,
      item.id,
      item.is_active,
      item.logo,
      item.mission,
      item.name,
      item.operating_license,
      item.vision,
      item.website,

    );
  }
}
