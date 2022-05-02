import { AfterViewInit, Component, Injectable, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ChangeToListComponent } from 'src/app/components/change-to-list/change-to-list.component';

import { TabgroupComponent } from 'src/app/components/tab-group/tabgroup.component';
import { Organization } from 'src/app/models/organization/organization';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilService } from 'src/app/services/util-service/util.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationsComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup') tabGroup?: TabgroupComponent;
  @ViewChild('viewGrid') viewGrid: ChangeToListComponent | undefined;
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
  numberCount?: any;
  isDeleted?: boolean = false;
  isList?: boolean = false;
  isAdmin?: boolean = false;
  oldDataSearch:Organization[]=[];

  constructor(public utilService: UtilService, private loadingService: LoadingService, private userService: UserService, private organizationService: OrganizationApiService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue.role == 'admin') {
      this.isAdmin = true;
      this.checkToGetData();

    } else if (this.authService.currentUserValue.role == 'organization_manager') {
      this.isAdmin = false;
      this.getAllOrganization();
    }
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.loadingService.isSkeleton.next(true);
  }

  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {


  }
  getState(e: any) {
    this.isChangeState = e;

  }
  handleTitle(e: any) {
    this.noResultBySearch=false;

    if (e == 'list') {
      this.isList = true;
    } else {

      this.isList = false;
    }
  }
  changeToGrid() {
    this.viewGrid?.changeView(true);
  }
  getOrganizations(e:any){

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
    this.organizations = await this.organizationService.getAll();


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
  async getAllOrganizationAllRole(status?: string, org?: any) {
    this.status = status;

    if (org) {
      this.organizations = org;
    }
    if (status) {


      if (this.authService.currentUserValue.role == 'organization_manager') {
        const check = this.organizations.every((a) => {
          return a.result_code == 503;
        })

        if (check == true) {
          this.isDeleted = true;
        }
      }

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

          if (this.authService.currentUserValue.role == 'organization_manager') {
            if (this.organizations.length <= 0 || this.organizations == null) {
              this.organizations = [];
              this.noOrg = true;
            } else {
              this.organizations = this.organizations.filter(x => {
                return x.result_code == 510 || x.result_code == 502
              });
              this.oldData = this.passData.filter(x => x.result_code == 510);
              this.noOrg = false;
              this.isEmpty = false;
              if (this.organizations.length <= 0 || this.organizations == null) {
                this.isEmpty = true;
              }
            }
          }
          if (this.authService.currentUserValue.role == 'admin') {
            this.isEmpty = false;
            this.noOrg = false;
            this.organizations = this.organizations.filter((x => { return x.result_code === 510 }))
            this.oldData = this.passData.filter(x => x.result_code == 510);
          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
        case 'reject':


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
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
        case 'pending':

          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');

            this.organizations[i].type = this.organizations[i].type == 'ngo' ?
              this.organizations[i].type = 'Tổ chức phi chính phủ' :
              this.organizations[i].type = 'Tổ chức phi lợi nhuận'
          }
          if (this.authService.currentUserValue.role == 'admin') {
            this.isRequest = true;
          } else {
            this.isRequest = false;
          }
          this.organizations = this.organizations.filter(x => x.result_code === 501);
          this.oldData = this.passData.filter(x => x.result_code == 501);
          console.log(this.organizations);
          this.isEmpty = false;

          if (this.organizations == null || this.organizations.length <= 0) {
            this.isEmpty = true;

          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
      }
      this.oldDataSearch=this.oldData;
      this.number = this.organizations.length;
      this.numberCount = new Array<number>(this.organizations.length);

    }
  }

  async getAllOrganizationByStatus(status?: string, org?: any) {
    this.status = status;

    if (org) {
      this.organizations = org;
    }
    if (status) {
      if (this.authService.currentUserValue.role == 'organization_manager') {
        const check = this.organizations.every((a) => {
          return a.result_code == 503;
        })

        if (check == true) {
          this.isDeleted = true;
        }
      }
      this.isList = false;
      this.changeToGrid();

      switch (status) {
        case 'approve':

          this.isRequest = false;
          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');

          }

          if (this.authService.currentUserValue.role == 'organization_manager') {
            if (this.organizations.length <= 0 || this.organizations == null) {
              this.organizations = [];
              this.noOrg = true;
            } else {
              this.organizations = this.organizations.filter(x => {
                return x.result_code == 510 || x.result_code == 502
              });
              this.oldData = this.passData.filter(x => x.result_code == 510);
              this.noOrg = false;
              this.isEmpty = false;
              if (this.organizations.length <= 0 || this.organizations == null) {
                this.isEmpty = true;
              }
            }
          } else if (this.authService.currentUserValue.role == 'admin') {
            this.isEmpty = false;
            this.noOrg = false;
            this.organizations = this.organizations.filter((x => { return x.result_code === 510 }))
            this.oldData = this.passData.filter(x => x.result_code == 510);
          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
        case 'reject':


          this.isRequest = false;
          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');

          }
          this.organizations = this.organizations.filter(x => x.result_code === 511);
          this.oldData = this.passData.filter(x => x.result_code == 511);

          this.isEmpty = false;
          if (this.organizations == null || this.organizations.length <= 0) {
            this.isEmpty = true;

          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
        case 'pending':

          for (var i = 0; i < this.organizations.length; i++) {
            this.organizationId = this.organizations[i].id;
            this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');


          }
          if (this.authService.currentUserValue.role == 'admin') {
            this.isRequest = true;
          } else {
            this.isRequest = false;
          }
          this.organizations = this.organizations.filter(x => x.result_code === 501);
          this.oldData = this.passData.filter(x => x.result_code == 501);

          this.isEmpty = false;

          if (this.organizations == null || this.organizations.length <= 0) {
            this.isEmpty = true;

          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000)
          break;
      }


      this.number = this.organizations.length;
      this.numberCount = new Array<number>(this.organizations.length);

    }

  }


  async getAllOrganization() {

    this.isRequest = false;
    this.organizations = await this.organizationService.getAll();
    if (this.organizations == null || this.organizations.length <= 0) {
      this.isEmpty = true;
      this.noOrg = true;
    } else {
      this.noOrg = false;
      this.isEmpty = false;
      this.isShow = false;
    }
    for (var i = 0; i < this.organizations.length; i++) {
      this.organizationId = this.organizations[i].id;
      this.loadingService.getOrganizationId.next(`${this.organizationId}`);
      this.organizations[i].logo = this.organizations[i]?.logo?.replace(/\\/g, '\/');
      this.organizations[i].type = this.organizations[i].type == 'ngo' ?
        this.organizations[i].type = 'Tổ chức phi chính phủ' :
        this.organizations[i].type = 'Tổ chức phi lợi nhuận'
    }

    this.isLoaded = true;
  }
  getEntity(e:any){
    if(e){
      this.organizations=e;
      this.oldData=e;
    }
  }
}
