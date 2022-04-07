import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects/project.model';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrls: ['./project-request.component.scss']
})
@Injectable({
  providedIn:'root',
})
export class ProjectRequestComponent implements OnInit {

  projects: Project[] = [];
  constructor(private api: ProjectApiService) { }

  ngOnInit(): void {
    this.getRequest();
  }
  async getAll() {
    this.projects = await this.api.getAll();
  }
  async getRequest() {
    await this.getAll();
    this.projects = this.projects.filter(x => {
      return x.resultCode === 601;
    })
  }
}
