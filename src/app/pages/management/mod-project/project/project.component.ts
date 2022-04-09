import { Component, OnInit } from '@angular/core';
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
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  user?: User;
  urlApi?: string;
  isEmpty: boolean = false;
  constructor(private loadingService: LoadingServiceService, private api: ProjectApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.check();
    this.urlApi = this.loadingService.getApiGetLink.value;

  }
  async check() {
    this.user = this.authApi.currentUserValue;

    if (this.user?.role === 'organization_manager') {
      this.projects = await this.api.getAll();
      for (var i = 0; i < this.projects.length; i++) {
        this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
        this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
      }
      this.projects = this.projects.filter(x => {

        return x.resultCode !== 611;
      })
      if (this.projects == [] || this.projects.length <= 0) {
        this.isEmpty = true;
      }
    } else {
      this.projects = await this.api.getAll();
      for (var i = 0; i < this.projects.length; i++) {
        this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
        this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
      }
      this.projects = this.projects.filter(x => {
        return x.resultCode === 610;
      })
      if (this.projects == [] || this.projects.length <= 0) {
        this.isEmpty = true;
      }
    }
  }
  async getAll() {
    this.projects = await this.api.getAll();

    console.log(this.projects);
  }
}
