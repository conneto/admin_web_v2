import {
  AfterViewInit,
  Component,
  Injectable,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { ChangeToListComponent } from 'src/app/components/change-to-list/change-to-list.component';

import { TabgroupComponent } from 'src/app/components/tab-group/tabgroup.component';
import { Constant } from 'src/app/constant/constant';
import { Organization } from 'src/app/models/organization/organization';
import { User } from 'src/app/models/user/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilService } from 'src/app/services/util-service/util.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
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
  isPending?: boolean = false;
  isList?: boolean = false;
  isAdmin?: boolean = false;
  oldDataSearch: Organization[] = [];
  isTabRejected?: boolean;
  isNoMore?: boolean;
  test: any;
  constructor(
    public utilService: UtilService,
    private loadingService: LoadingService,
    private userService: UserService,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {


    if (this.authService.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
      this.checkToGetData();
    } else if (
      this.authService.currentUserValue.role_id == 'organization_manager'
    ) {
      this.isAdmin = false;
      this.getAllByObservable();
    }
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.loadingService.isSkeleton.next(true);
    this.checkShowMore();
  }
  public getAllByObservable(): any {
    this.apiService.getByObservable(Constant.ORGANIZATIONS).pipe(
      // map((data:Organization[])=>{

      //   return data.filter(data=>{
      //     console.log(data);
      //     return data.result_code==510;
      //   });
      // })
      // tap(data => data.filter((data:any)=>{
      //   console.log(data.result_code)
      // })),
    ).subscribe((data: Organization[]) => {
        console.log(data);
        this.organizations = data;
        this.isLoaded = true;
        this.noOrg = false;
        this.isEmpty = false;
        this.isNoMore = false;
        this.isList = false;
        this.isRequest = false;
        this.number = this.organizations.length;
        this.numberCount = new Array<number>(this.organizations.length);
      }
        // , (error) => {
        //   console.log(error);
        // }

      )
  }
  ngAfterViewInit(): void { }
  ngOnDestroy(): void { }
  showMore() {
    this.loadingService.isLoading.next(true);
    setTimeout(() => {
      let newLength = this.organizations.length + 6;
      if (newLength > this.oldData.length) {
        newLength = this.oldData.length;
      }
      this.organizations = this.oldData.slice(0, newLength);
      this.checkShowMore();
      this.loadingService.isLoading.next(false);
    }, 300)
  }

  checkShowMore() {
    if (this.organizations.length > 6) {
      if (this.organizations.length == this.oldData.length) {
        this.isNoMore = true;
      }
    } else {
      this.isNoMore = true;
    }
  }
  getTabGroupState(e: any) {
    if (e) {
      if (e == 'reject') {
        this.isTabRejected = true;
      } else {
        this.isTabRejected = false;
      }
    }
  }
  handleTitle(e: any) {
    this.noResultBySearch = false;

    if (e == 'list') {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }
  changeToGrid() {
    this.viewGrid?.changeView(true);
  }
  getOrganizations(e: any) {
    if (e) {
      this.isEmpty = false;
      this.oldData = e;
      this.organizations = e.splice(0, 6);
    } else {
      this.isEmpty = true;
    }
  }
  getDataSearch(e: any) {

    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.organizations = e
      this.isNoMore = true;
    } else {
      if (this.organizations.length > 6) {
        this.isNoMore = false;
        this.organizations = e.slice(0, 6);
      } else {
        this.organizations = e;
        this.noResultBySearch = false;
        this.isNoMore = true;
      }
    }
  }

  async checkToGetData(getStatus?: string) {
    this.getAllByObservable();

    this.passData = this.organizations;
    if (getStatus == 'pending') {
      this.getAllOrganizationByStatus('pending');
      localStorage.setItem('pending', 'true');
    } else if (
      !localStorage.getItem('reject') &&
      !localStorage.getItem('approve') &&
      !localStorage.getItem('pending')
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

    // if (org) {
    //   this.organizations = org;
    //   // console.log(this.organizations);
    // }
    if (status) {
      this.isNoMore = false;
      // if (this.authService.currentUserValue.role_id == 'organization_manager') {
      //   const check = this.organizations.every((a) => {
      //     return a.result_code == 503;
      //   });

      //   if (check == true) {
      //     this.isPending = true;
      //   }
      // }
      this.isList = false;

      switch (status) {
        case 'approve':
          this.changeToGrid();
          this.isRequest = false;
          // for (var i = 0; i < this.organizations.length; i++) {
          //   this.organizationId = this.organizations[i].id;
          //   this.organizations[i].logo = this.organizations[i]?.logo?.replace(
          //     /\\/g,
          //     '/'
          //   );
          // }

          // if (
          //   this.authService.currentUserValue.role_id == 'organization_manager'
          // ) {
          //   if (this.organizations.length <= 0 || this.organizations == null) {
          //     this.organizations = [];
          //     this.noOrg = true;
          //   } else {
          //     this.organizations = this.passData;
          //     this.oldData = this.passData;
          //     this.noOrg = false;
          //     this.isEmpty = false;
          //     if (
          //       this.organizations.length <= 0 ||
          //       this.organizations == null
          //     ) {
          //       this.isEmpty = true;
          //     }
          //   }
          // } else

          if (this.authService.currentUserValue.role_id == 'admin') {
            this.isEmpty = false;
            this.noOrg = false;
            // this.organizations = this.passData.filter(
            //   (x) => (x.result_code == 510 || x.result_code == 531 || x.result_code == 520 || x.result_code == 521)
            // );
            // this.oldData = this.passData.filter((x) => (x.result_code == 510 || x.result_code == 531 || x.result_code == 520 || x.result_code == 521));
          }
          setTimeout(() => {
            this.loadingService.isSkeleton.next(false);
            this.isLoaded = true;
          }, 1000);
          break;
          //   case 'reject':
          //     this.isRequest = false;
          //     for (var i = 0; i < this.organizations.length; i++) {
          //       this.organizationId = this.organizations[i].id;
          //       this.organizations[i].logo = this.organizations[i]?.logo?.replace(
          //         /\\/g,
          //         '/'
          //       );
          //     }
          //     this.organizations = this.organizations.filter(
          //       (x) => x.result_code == 511
          //     );
          //     this.oldData = this.passData.filter((x) => x.result_code == 511);

          //     this.isEmpty = false;
          //     if (this.organizations == null || this.organizations.length <= 0) {
          //       this.isEmpty = true;
          //     }
          //     setTimeout(() => {
          //       this.loadingService.isSkeleton.next(false);
          //       this.isLoaded = true;
          //     }, 1000);
          //     break;
          //   case 'pending':
          //     for (var i = 0; i < this.organizations.length; i++) {
          //       this.organizationId = this.organizations[i].id;
          //       this.organizations[i].logo = this.organizations[i]?.logo?.replace(
          //         /\\/g,
          //         '/'
          //       );
          //     }
          //     if (this.authService.currentUserValue.role_id == 'admin') {
          //       this.isRequest = true;
          //     } else {
          //       this.isRequest = false;
          //     }
          //     this.organizations = this.organizations.filter(
          //       (x) => x.result_code == 501 || x.result_code == 503 || x.result_code == 502
          //     );
          //     this.oldData = this.passData.filter((x) => x.result_code == 501 || x.result_code == 503 || x.result_code == 502);

          //     this.isEmpty = false;

          //     if (this.organizations == null || this.organizations.length <= 0) {
          //       this.isEmpty = true;
          //     }
          //     setTimeout(() => {
          //       this.loadingService.isSkeleton.next(false);
          //       this.isLoaded = true;
          //     }, 1000);
          //     break;
          // }
          // if (this.organizations.length > 6) {
          //   this.organizations = this.organizations.slice(0, 6);
          // } else {
          //   this.isNoMore = true;
          // }
          this.number = this.organizations.length;
          this.numberCount = new Array<number>(this.organizations.length);
      }
    }
  }


  async getAllOrganization() {
    this.isLoaded = true;
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
      this.organizations[i].logo = this.organizations[i]?.logo?.replace(
        /\\/g,
        '/'
      );
      this.organizations[i].type =
        this.organizations[i].type == 'ngo'
          ? (this.organizations[i].type = 'Tổ chức phi chính phủ')
          : (this.organizations[i].type = 'Tổ chức phi lợi nhuận');
    }
  }
  getEntity(e: any) {
    if (e?.length != 0) {
      if (e.length > 6) {
        this.isNoMore = false;
        this.isEmpty = false;
        this.organizations = e.slice(0, 6);
        this.oldData = e;
      } else {
        this.isNoMore = true;
        this.isEmpty = false;
        this.organizations = e
        this.oldData = e;
      }
    } else {
      this.isEmpty = true;
      this.organizations = e.slice(0, 6);
    }
  }
}
