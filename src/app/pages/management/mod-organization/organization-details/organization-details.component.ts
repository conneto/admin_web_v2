import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProjectFormComponent } from 'src/app/components/create/project-form/project-form.component';
import { OrganizationInforCardComponent } from 'src/app/components/request-components/organization-infor-card/organization-infor-card.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationDetailsComponent implements OnInit {
  organization?: Organization;
  user?: User;
  isAdmin = true;
  urlApi = this.loadingService.getApiGetLink.value;
  urlCover?: string;
  urlLogo?: string;
  constructor(private router:Router,private loadingService: LoadingServiceService, private snackBar: SnackBarMessageComponent, private auth: AuthServiceService, private dialog: MatDialog, private route: ActivatedRoute, private proApi: ProjectApiService, private location: Location, private orgApi: OrganizationApiService, private orgComponent: OrganizationInforCardComponent) {

  }

  ngOnInit(): void {
    this.getValueFromRoute();
    this.check();
  }
  check() {
    this.user = this.auth.currentUserValue;
    if (this.user?.role === 'organization_manager') {
      this.isAdmin = false;
    }
  }
  async getValueFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organization = await this.orgApi.getById(`${id}`);
    this.loadingService.getOrganizationId.next(`${id}`);
    this.urlLogo = this.organization?.logo?.replace(/\\/g, '\/');
    this.urlCover = this.organization?.cover?.replace(/\\/g, '\/');
  }
  goBack() {
    this.location.back();
  }
  public get getId() {
    this.getValueFromRoute();
    const id = console.log(this.route.snapshot.paramMap.get('id'));
    return this.route.snapshot.paramMap.get('id')

  }
  openProjectForm() {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '350px',
      data: {
        title: 'Project Form',
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse = await this.proApi.createProject(data);
        if (res.status == 0) {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(res.message, true)
          this.router.navigate(['/manager/manage-project']);
      
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(res.message, false)
        }
      }
    })
  }
}
