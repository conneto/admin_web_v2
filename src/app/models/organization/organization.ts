
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class Organization {
  constructor(
    public id?: string,
    public name?: string,
    public logo?: string,
    public creationCode?: number,
    public creationMessage?: string,
    public cover?: string,
    public description?: string,
    public vison?:string,
    public is_active?:boolean,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationAdapter implements Adapter<Organization> {
  adapt(item: any): Organization {
    return new Organization(
      item.id,
      item.name,
      item.logo,
      item.creationCode,
      item.creationMessage,
      item.cover,
      item.description,
      item.vision,
      item.is_active,
     
    );
  }
}
