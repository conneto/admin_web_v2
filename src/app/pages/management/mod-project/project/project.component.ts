import { Component, Injectable, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects/project.model';

import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
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
  projects: Project[] = [];
  passData: Project[] = [];
  oldData:any[]=[];
  user?: User;
  urlApi?: string;
  isEmpty?: boolean;
  isRequest: boolean = false;
  isLoaded?: boolean;
  number?: any;
  noResultBySearch?: boolean;
  constructor(private loadingService: LoadingServiceService, private api: ProjectApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.checkToGetData();
    this.urlApi = this.loadingService.getApiGetLink.value;
  }
  ngOnDestroy(): void {

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
  async checkToGetData() {
    this.projects = await this.api.getAll();

    this.passData = this.projects;
    if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
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
    switch (status) {

      case 'approve':
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
    this.isLoaded = true;
  }

  async getAll() {
    this.projects = await this.api.getAll();

  }
}
