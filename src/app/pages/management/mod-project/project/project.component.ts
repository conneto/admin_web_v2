import { Route } from '@angular/compiler/src/core';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeToListComponent } from 'src/app/components/change-to-list/change-to-list.component';
import { ProjectFormComponent } from 'src/app/components/create/project-form/project-form.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { TabgroupComponent } from 'src/app/components/tab-group/tabgroup.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';

import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class ProjectComponent implements OnInit {
  @ViewChild('changeView') changeViewGrid?: ChangeToListComponent;
  @ViewChild('tabGroup') tabGroup?: TabgroupComponent
  projects: Project[] = [];
  passData: Project[] = [];
  oldData: any[] = [];
  user?: User;
  urlApi?: string;
  isEmpty?: boolean;
  isRequest: boolean = false;
  isLoaded?: boolean;
  number?: any;
  noResultBySearch?: boolean;
  isList?: boolean = false;
  organization: Organization[] = [];
  isAdmin?: boolean;
  isTabRejected?: boolean;
  isTabPending?: boolean;
  isNoMore?:boolean;
  constructor(private organizationService: OrganizationService, private router: Router, private dialog: MatDialog, private snackbar: SnackBarMessageComponent, private loadingService: LoadingService, private api: ProjectService, private authApi: AuthService) { }

  ngOnInit(): void {
    this.checkToGetData();
    this.urlApi = this.loadingService.getApiGetLink.value;
    if (this.authApi.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  ngOnDestroy(): void {

  }
  showMore() {
    this.loadingService.isLoading.next(true);
    setTimeout(() => {
      let newLength = this.projects.length + 6;
      if (newLength > this.oldData.length) {
        newLength = this.oldData.length;
      }
      this.projects = this.oldData.slice(0, newLength);
      this.checkShowMore();
      this.loadingService.isLoading.next(false);
    }, 300)
  }

  checkShowMore() {
    if (this.projects.length > 6) {
      if (this.projects.length == this.oldData.length) {
        this.isNoMore = true;
      }
    } else {
      this.isNoMore = true;
    }
  }
  getEntity(e: any) {
    if (e?.length != 0) {
      if (e.length > 6) {
        this.isNoMore = false;
        this.isEmpty = false;
        this.projects = e.slice(0, 6);
        this.oldData = e;
      } else {
        this.isNoMore = true;
        this.isEmpty = false;
        this.projects = e
        this.oldData = e;
      }
    } else {
      this.isEmpty = true;
      this.projects = e.slice(0, 6);
    }
  }
  getTabGroupState(e: any) {
    if (e) {
      if (e == 'pending') {
        this.isTabPending = true;
      } else {
        this.isTabPending = false;
      }
      if (e == 'reject') {
        this.isTabRejected = true;
      } else {
        this.isTabRejected = false;
      }
    }


  }
  changeView() {
    this.changeViewGrid?.changeView(true);
  }
  getTab() {
    this.tabGroup?.getEntity('pending', 'pro');
  }
  handleTitle(e: any) {
    this.noResultBySearch = false;
    if (e == 'list') {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.projects = e
      this.isNoMore = true;
    } else {
      if (this.projects.length > 6) {
        this.isNoMore = false;
        this.projects = e.slice(0, 6);
      } else {
        this.projects = e;
        this.noResultBySearch = false;
        this.isNoMore = true;
      }
    }

  }
  async checkToGetData(status?: string) {
    this.projects = await this.api.getAll();
    this.organization = await this.organizationService.getAll();

    this.passData = this.projects;
    if (status == 'pending') {
      this.getAllProjectsByStatus('pending', this.projects);
      localStorage.setItem('pending', 'true');
    } else if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
      && !localStorage.getItem('pending')
    ) {
      this.getAllProjectsByStatus('approve');
      localStorage.setItem('approve', 'true');
    } else {
      if (localStorage.getItem('reject')) {
        this.getAllProjectsByStatus('reject');

      } else if (localStorage.getItem('approve')) {
        this.getAllProjectsByStatus('approve');
      } else if (localStorage.getItem('pending')) {
        this.getAllProjectsByStatus('pending');
      }
    }
  }
  async getAllProjectsByStatus(status?: string, pro?: any) {
    this.isNoMore=false;
    this.user = this.authApi.currentUserValue;
    if (pro) {
      this.projects = pro;
    }
    if (status) {
      this.isList = false;
      this.changeView();
    }
    switch (status) {

      case 'approve':
        this.isLoaded = true;
        this.isRequest = false;
        for (var i = 0; i < this.projects.length; i++) {
          this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
          this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
          this.projects[i].organization_logo = this.projects[i]?.organization_logo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return (x.result_code == 610 || x.result_code == 631 || x.result_code == 620 || x.result_code == 621)
            ;
        })
        this.oldData = this.passData.filter(x => (x.result_code == 610 || x.result_code == 631 || x.result_code == 620 || x.result_code == 621));
        this.isEmpty = false;
        if (this.projects == [] || this.projects.length <= 0) {
          this.isEmpty = true;
        }
        break;
      case 'reject':
        this.isLoaded = true;
        this.isRequest = false;
        for (var i = 0; i < this.projects.length; i++) {
          this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
          this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
          this.projects[i].organization_logo = this.projects[i]?.organization_logo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return x.result_code == 611;
        })
        this.oldData = this.passData.filter(x => x.result_code == 611);
        this.isEmpty = false;
        if (this.projects == null || this.projects.length <= 0) {
          this.isEmpty = true;
        }
        break;
      case 'pending':
        this.isLoaded = true;
        for (var i = 0; i < this.projects.length; i++) {
          this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
          this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
          this.projects[i].organization_logo = this.projects[i]?.organization_logo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return x.result_code == 601 || x.result_code == 603 || x.result_code == 602;
        })
        this.oldData = this.passData.filter(x => x.result_code == 601 || x.result_code == 603 || x.result_code == 602);
        if (this.authApi.currentUserValue.role_id == 'admin') {
          this.isRequest = true;
        } else {
          this.isRequest = false;
        }
        this.isEmpty = false;
        if (this.projects == null || this.projects.length <= 0) {
          this.isEmpty = true;
        }
        break;


    }
    if (this.projects.length > 6) {
      this.projects = this.projects.slice(0, 6);
    }else {
      this.isNoMore=true;
    }
    this.number = this.projects.length;

  }

  async getAll() {
    this.projects = await this.api.getAll();

  }

  async openProjectForm() {

    this.loadingService.getOrganizationId.next(`${this.organization[0].id}`);
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '768px',
      data: {
        title: 'Tạo dự án',
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse = await this.api.createProject(data);
        if (res.status == 0) {
          this.loadingService.isLoading.next(false);
          this.snackbar.showMessage('Tạo dự án thành công.Chờ phê duyệt từ ban quản trị', true);
          this.getTab();
          this.checkToGetData();
          this.router.navigate(['/manager/manage-project']);

        } else {
          this.dialog.open(ProjectFormComponent, {
            width: '768px',
            data: {
              title: 'Tạo dự án',
            }
          })
          this.loadingService.isLoading.next(false);
          this.snackbar.showMessage(res.message, false)
        }
      }
    })
  }
}
