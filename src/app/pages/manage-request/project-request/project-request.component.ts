import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects/project.model';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrls: ['./project-request.component.scss']
})
export class ProjectRequestComponent implements OnInit {

  projects:Project[]=[];
  constructor(private api:ProjectApiService) { }

  ngOnInit(): void {
    this.getAll();
  }
  async getAll(){
    this.projects=await this.api.getAll();
    console.log(this.projects);
  }
}
