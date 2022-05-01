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
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

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
  isAdmin?:boolean;
  constructor(private orgApi: OrganizationApiService, private router: Router, private dialog: MatDialog, private snackbar: SnackBarMessageComponent, private loadingService: LoadingServiceService, private api: ProjectApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.checkToGetData();
    this.urlApi = this.loadingService.getApiGetLink.value;
    if(this.authApi.currentUserValue.role=='admin'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }
  ngOnDestroy(): void {

  }
  changeView() {
    this.changeViewGrid?.changeView(true);
  }
  getTab() {
    this.tabGroup?.getEntity('pending', 'pro');
  }
  handleTitle(e: any) {
    this.noResultBySearch=false;
    if (e == 'list') {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.projects = e;
    } else {
      this.projects = e;
      this.noResultBySearch = false;

    }

  }
  async checkToGetData(status?: string) {
    this.projects = await this.api.getAll();

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
          this.projects[i].organizationLogo = this.projects[i]?.organizationLogo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return x.resultCode == 610;
        })
        this.oldData = this.passData.filter(x => x.resultCode == 610);
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
          this.projects[i].organizationLogo = this.projects[i]?.organizationLogo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return x.resultCode == 611;
        })
        this.oldData = this.passData.filter(x => x.resultCode == 611);
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
          this.projects[i].organizationLogo = this.projects[i]?.organizationLogo?.replace(/\\/g, '\/');
        }

        this.projects = this.projects.filter(x => {
          return x.resultCode == 601;
        })
        this.oldData = this.passData.filter(x => x.resultCode == 601);
        if (this.authApi.currentUserValue.role == 'admin') {
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
    this.number = this.projects.length;

  }

  async getAll() {
    this.projects = await this.api.getAll();

  }

  async openProjectForm() {
    this.organization = await this.orgApi.getAll();
    this.loadingService.getOrganizationId.next(`${this.organization[0].id}`);
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '700px',
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
            width: '700px',
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
