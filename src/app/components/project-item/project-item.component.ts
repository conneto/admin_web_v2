import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/projects/project.model';

import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() projects?: Project[] = [];
  urlApi?: string;
  isAdmin?: boolean;
  constructor(private userApi: AuthServiceService, private router: Router, private loadingService: LoadingServiceService) { }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
 
    if (this.userApi.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    }
  }
  goToDetail(id: any) {

    if (this.isAdmin) {
      this.router.navigate([`/admin/manage-project/project-request-detail/${id}`])
    } else {
      this.router.navigate([`/manager/manage-project/project-request-detail/${id}`])
    }
  }
}
