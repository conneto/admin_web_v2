import { Location } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { CampaignRequestComponent } from 'src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.component';
import { OrganizationRequestComponent } from 'src/app/pages/manage-request/mod-organization/organization-request/organization-request.component';
import { ProjectRequestComponent } from 'src/app/pages/manage-request/mod-project/project-request/project-request.component';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-organization-infor-card',
  templateUrl: './organization-infor-card.component.html',
  styleUrls: ['./organization-infor-card.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationInforCardComponent implements OnInit {
  @Input() organizations?: Organization;
  urlApi?:string;
  urlLogo?:string;
  @Input() checkType?: any;
  constructor(private orga:OrganizationsComponent,private loadingApi:LoadingServiceService,private proApi: ProjectRequestComponent, private camApi: CampaignRequestComponent, private location: Location, private snackBar: SnackBarMessageComponent, private router: Router, private dialog: MatDialog, private authApi: AuthServiceService, private org: OrganizationRequestComponent) {

  }

  ngOnInit(): void {
    this.urlApi=this.loadingApi.getApiGetLink.value;
     this.urlLogo=this.organizations?.logo?.replace(/\\/g,'\/');
  
  }

  viewDetails(id: string) {
    this.router.navigate(['admin/organization-request/organization-request-detail/:' + id]);
  }

  async approve(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: AuthServiceService.APPROVE,
        message: AuthServiceService.APPROVE,
      },
    })

    diaglogRef.afterClosed().subscribe(async (data) => {
     
      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type: checkType == 'org' ? AuthServiceService.ORGANIZATION
            : checkType == 'cam' ? AuthServiceService.CAMPAIGN : checkType == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: AuthServiceService.APPROVE,
          note: 'Approve this',
        }
        
        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(data1);
    
        if (res?.status == 0) {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage("Your action is success",true);
          if (this.checkType == 'org') {
            this.orga.checkToGetData();
          } else if (this.checkType == 'pro') {
            this.proApi.getRequest();
          } else {
            this.camApi.getRequest();
          }
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage("Error.Please try  again",false);
        }
      }
    })
  }

  async reject(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: AuthServiceService.REJECT,
        message: AuthServiceService.REJECT,
      }
    })
    diaglogRef.afterClosed().subscribe(async data => {
      
      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type: checkType == 'org' ? AuthServiceService.ORGANIZATION
            : checkType == 'cam' ? AuthServiceService.CAMPAIGN : checkType == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: AuthServiceService.REJECT,
          note: 'Reject this',
        }
        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(data1);
        this.loadingApi.isLoading.next(true);
        if (res?.status === 0) {
          this.loadingApi.isLoading.next(false);
          if (this.checkType == 'org') {
            this.orga.checkToGetData();
          } else if (this.checkType == 'pro') {
            this.proApi.getRequest();
          } else {
            this.camApi.getRequest();
          }
          this.snackBar.showMessage("Your action is success",true);
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage("Error.Please try  again",false);
        }
  
 
      }
    })
  }
}
