import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/projects/project.model';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() projects?: Project[] = [];
  urlApi?: string;
  constructor(private router: Router, private loadingService: LoadingServiceService) { }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
  }
  goToDetail(id:any) {
    
    this.router.navigate([`/manager/manage-project/project-request-detail/${id}`])
  }
}
