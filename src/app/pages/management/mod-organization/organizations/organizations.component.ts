import { Component, Injectable, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { of } from 'rxjs';
import { TabgroupComponent } from 'src/app/components/tab-group/tabgroup.component';
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
  @ViewChild('tabGroup',) tabGroup?: TabgroupComponent;
  organizations: Organization[] = [];
  oldData: Organization[] = [];
  organizationId?: string;
  isShow: boolean = false;
  noOrg?: boolean;
  isEmpty?: boolean;
  user?: User;
  users: User[] = [];
  urlApi?: string;
  isRequest?: boolean = false;
  isActivated?: boolean = false;
  isLoaded?: boolean;
  status?: string;
  passData: Organization[] = [];
  isChangeState?: boolean;
  number?: any;
  noResultBySearch?: boolean;



  constructor(private loading: LoadingServiceService, private getUser: UserApiService, private service: OrganizationApiService, private userApi: AuthServiceService) { }

  ngOnInit(): void {

    this.checkToGetData();
    this.userApi.currentUserValue;
    this.urlApi = this.loading.getApiGetLink.value;


  }

  ngOnDestroy(): void {


  }
  getState(e: any) {
    this.isChangeState = e;

  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.organizations = e;
    } else {
      this.organizations = e;
      this.noResultBySearch = false;

    }

  }

  async checkToGetData(getStatus?: string) {
    this.organizations = await this.service.getAll();

    this.passData = this.organizations;
    if (getStatus == 'pending') {
      this.getAllOrganizationByStatus('pending');
      localStorage.setItem('pending', 'true');
    } else if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
      && !localStorage.getItem('pending')
    ) {
      this.getAllOrganizationByStatus('approve');
      localStorage.setItem('approve', 'true');
    } else {
      if (localStorage.getItem('reject')) {
        this.getAllOrganizationByStatus('reject');

      } else if (localStorage.getItem('approve')) {
        this.getAllOrganizationByStatus('approve');
      } else if (localStorage.getItem('pending')) {
        this.getAllOrganizationByStatus('pending');
      }
    }
  }
  async getAllOrganizationByStatus(status?: string, org?: any) {
    this.status = status;

    if (org) {
      this.organizations = org;
    }
    if (status) {
      switch (status) {
        case 'approve':

          this.isRequest = false;
          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');
            this.organizations[i].type = this.organizations[i].type == 'ngo' ?
              this.organizations[i].type = 'Tổ chức phi chính phủ' :
              this.organizations[i].type = 'Tổ chức phi lợi nhuận'
          }
          this.user
          if (this.userApi.currentUserValue.role == 'organization_manager') {
            if (this.organizations.length <= 0 || this.organizations == null) {
              this.organizations = [];
              this.noOrg = true;
              this.isLoaded = true;

            } else {
              this.isLoaded = true;

              this.organizations = this.organizations.filter(x => {
                return x.result_code == 510
              });

              this.oldData = this.passData.filter(x => x.result_code == 510);
              this.noOrg = false;
              this.isEmpty = false;
              if (this.organizations.length <= 0 || this.organizations == null) {

                this.isEmpty = true;
              }
            }
          } else if (this.userApi.currentUserValue.role == 'admin') {
            this.isLoaded = true;
            this.isEmpty = false;
            this.noOrg = false;
            this.organizations = this.organizations.filter((x => { return x.result_code === 510 }))
            this.oldData = this.passData.filter(x => x.result_code == 510);

          }
          break;
        case 'reject':

          this.isLoaded = true;
          this.isRequest = false;
          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');
            this.organizations[i].type = this.organizations[i].type == 'ngo' ?
              this.organizations[i].type = 'Tổ chức phi chính phủ' :
              this.organizations[i].type = 'Tổ chức phi lợi nhuận'
          }
          this.organizations = this.organizations.filter(x => x.result_code === 511);
          this.oldData = this.passData.filter(x => x.result_code == 511);

          this.isEmpty = false;
          if (this.organizations == null || this.organizations.length <= 0) {
            this.isEmpty = true;

          }
          break;
        case 'pending':
          this.isLoaded = true;
          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');
            this.organizations[i].type = this.organizations[i].type == 'ngo' ?
              this.organizations[i].type = 'Tổ chức phi chính phủ' :
              this.organizations[i].type = 'Tổ chức phi lợi nhuận'
          }
          if (this.userApi.currentUserValue.role == 'admin') {
            this.isRequest = true;
          } else {
            this.isRequest = false;
          }
          this.organizations = this.organizations.filter(x => x.result_code === 501);
          this.oldData = this.passData.filter(x => x.result_code == 501);

          this.isEmpty = false;
          this.isLoaded = true;
          if (this.organizations == null || this.organizations.length <= 0) {
            this.isEmpty = true;

            this.isLoaded = true;
          }
          break;
      }
      this.number = this.organizations.length;
    }

  }
  async getAllOrganization() {
    this.organizations = await this.service.getAll();
    if (this.organizations == null || this.organizations.length <= 0) {
      this.noOrg = true;
    }
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
        this.noOrg = false;
        this.organizations = this.organizations.filter(x => {
          return x.result_code !== 511
        });
      }
    } else this.noOrg = false; this.organizations = this.organizations.filter((x => { return x.result_code === 510 }))
  }
}

