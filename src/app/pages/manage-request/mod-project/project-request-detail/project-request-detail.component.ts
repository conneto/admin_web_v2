import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from 'src/app/models/projects/project.model';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-request-detail',
  templateUrl: './project-request-detail.component.html',
  styleUrls: ['./project-request-detail.component.scss']
})
export class ProjectRequestDetailComponent implements OnInit {
  project?: Project;
  constructor(private location: Location, private projectApi: ProjectApiService, private actived: ActivatedRoute) { }

  ngOnInit(): void {
  this.getByID();
  }
  async getByID() {

    const id = this.actived.snapshot.paramMap.get('id');
    this.project = await this.projectApi.getByID(`${id}`);
    console.log(this.project);
  }
  goBack() {
    this.location.back();
  }
}
