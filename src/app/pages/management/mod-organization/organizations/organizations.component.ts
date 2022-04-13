import { Component, Injectable, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization/organization';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { UserApiService } from 'src/app/services/user/user-api.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  organizationId?: string;
  isShow: boolean = false;
  noOrg: boolean = false;
  user?: User;
  users: User[] = [];
  urlApi?: string;
 
  constructor(private loading: LoadingServiceService, private getUser: UserApiService, private service: OrganizationApiService, private userApi: AuthServiceService) { }

  ngOnInit(): void {
    this.getAllOrganizations();
    this.userApi.currentUserValue;
    this.urlApi = this.loading.getApiGetLink.value;
  }

  async getAllOrganizations() {
    this.organizations = await this.service.getAll();
    for (var i = 0; i < this.organizations.length; i++) {
      this.organizationId = this.organizations[i].id;
      this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');
      
    }
    if (this.userApi.currentUserValue.role === 'organization_manager') {
      const check = this.organizations.every((x) => {
        return x.result_code === 511
      })
      if (check || this.organizations.length == 0) {
        this.organizations = [];
        this.noOrg = true;
      } else {

        this.organizations = this.organizations.filter(x => {

          return x.result_code !== 511
        });

      }
    } else this.organizations = this.organizations.filter((x => { return x.result_code === 510 }))
  }

}

