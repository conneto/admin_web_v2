import { Location } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { _SnackBarContainer } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CamapaignFormComponent } from 'src/app/components/create/camapaign-form/camapaign-form.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
@Injectable({providedIn:'root'})
export class ProjectDetailsComponent implements OnInit {
  
  project?: Project;
  user?: User;
  isAdmin = true;
  urlApi:string='';
  urlLogo?:string='';
  urlCover?:string='';
  constructor(private router:Router,private loadingService:LoadingServiceService,private snackBar:SnackBarMessageComponent,private auth: AuthServiceService, private location: Location, private proApi: ProjectApiService, private campApi: CampaignApiService, private actived: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByID();
    this.check();
    this.urlApi=this.loadingService.getApiGetLink.value;
 
   
  }
  check() {
    this.user = this.auth.currentUserValue;
    if (this.user?.role === 'organization_manager') {
      this.isAdmin = false;
    }
  }
  async getByID() {

    const id = this.actived.snapshot.paramMap.get('id');
    this.project = await this.proApi.getByID(`${id}`);
    this.loadingService.projectId.next(`${id}`);
    this.urlLogo= this.project?.logo?.replace(/\\/g, '\/');
    this.urlCover=this.project?.cover?.replace(/\\/g,'\/');


  }
  goBack() {
    this.location.back();
  }
  openCampaignForm() {
    const dialogRef = this.dialog.open(CamapaignFormComponent, {
      width: '350px',
      data: {
        title: 'Campaign Form',
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.campApi.create(data);
        if(res?.status==0)
        {
          this.loadingService.isLoading.next(false);
          this.router.navigate(['/manager/manage-campaign']);
          this.snackBar.showMessage(res.message,true)
        }else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res?.message}`,false)
        }
      }
    })
  }
}
