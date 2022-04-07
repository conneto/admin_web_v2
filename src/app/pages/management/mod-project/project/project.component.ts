import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects/project.model';

import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  user?: User;
  constructor(private api: ProjectApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.check();
  }
 async check() {
    this.user=this.authApi.currentUserValue;
    console.log(this.user?.role);
    if (this.user?.role === 'organization_manager') {
      this.projects = await this.api.getAll();
      this.projects = this.projects.filter(x => {
        return x.resultCode !== 611;
      })
    } else {
      this.projects = await this.api.getAll();
      this.projects = this.projects.filter(x => {
        return x.resultCode === 610;
      })
    }
  }
  async getAll() {
    this.projects = await this.api.getAll();

    console.log(this.projects);
  }
}
