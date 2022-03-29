import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects/project.model';

@Component({
  selector: 'app-project-request-card',
  templateUrl: './project-request-card.component.html',
  styleUrls: ['./project-request-card.component.scss']
})
export class ProjectRequestCardComponent implements OnInit {
@Input() projects?: Project;
  constructor() { }

  ngOnInit(): void {
  }
  viewDetails(){
    
  }
}
