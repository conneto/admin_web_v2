import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { _SnackBarContainer } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CamapaignFormComponent } from 'src/app/components/create/camapaign-form/camapaign-form.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project?: Project;
  user?: User;
  isAdmin = true;
  constructor(private snackBar:SnackBarMessageComponent,private auth: AuthServiceService, private location: Location, private proApi: ProjectApiService, private campApi: CampaignApiService, private actived: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByID();
    this.check();
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
    console.log(this.project);
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
        let uploadData = new FormData();
        data = {
          ...data,
          project_id: this.project?.id,
        }
        console.log(data);
        uploadData.append('campaign', JSON.stringify(data));
        let res: BaseResponse | null = await this.campApi.create(uploadData);
        if(res?.resultCode==0)
        {
          this.snackBar.showMessage("Create success !")
        }else {
          this.snackBar.showMessage("Error . Please try again !")
        }
      }
    })
  }
}
