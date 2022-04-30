import { Location } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { CampaignRequestComponent } from 'src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.component';
import { OrganizationRequestComponent } from 'src/app/pages/manage-request/mod-organization/organization-request/organization-request.component';
import { ProjectRequestComponent } from 'src/app/pages/manage-request/mod-project/project-request/project-request.component';
import { CampaignsComponent } from 'src/app/pages/management/mod-campaign/campaigns/campaigns.component';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
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
  urlApi?: string;
  urlLogo?: string;
  @Input() checkType?: any;
  constructor(private pro: ProjectComponent, private cam: CampaignsComponent, private orga: OrganizationsComponent, private loadingApi: LoadingServiceService, private proApi: ProjectRequestComponent, private camApi: CampaignRequestComponent, private location: Location, private snackBar: SnackBarMessageComponent, private router: Router, private dialog: MatDialog, private authApi: AuthServiceService, private org: OrganizationRequestComponent) {

  }

  ngOnInit(): void {
    this.urlApi = this.loadingApi.getApiGetLink.value;




  }

  viewDetails(id: string) {
    this.router.navigate(['admin/organization-request/organization-request-detail/:' + id]);
  }

  async approve(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn chấp nhận tổ chức này không?',
      },
    })

    diaglogRef.afterClosed().subscribe(async (data) => {

      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type: checkType == 'org' ? AuthServiceService.ORGANIZATION
            : checkType == 'cam' ? AuthServiceService.CAMPAIGN : checkType == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: 'approve',
          note: 'Approve this',
        }

        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(data1);

        if (res?.status == 0) {
          this.loadingApi.isLoading.next(false);

          if (checkType == 'org' || this.checkType == 'org') {
            this.orga.checkToGetData('pending');
          } else if (checkType == 'pro' || this.checkType == 'pro') {
            this.pro.checkToGetData('pending');
          } else {
            this.cam.checkToGetData('pending');
          }
          this.snackBar.showMessage("Chấp nhận thành công !", true);
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
        }
      }
    })
  }

  async reject(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn từ chối xét duyệt tổ chức này không?',
      }
    })
    diaglogRef.afterClosed().subscribe(async data => {

      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type: checkType == 'org' ? AuthServiceService.ORGANIZATION
            : checkType == 'cam' ? AuthServiceService.CAMPAIGN : checkType == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: 'reject',
          note: 'Reject this',
        }
        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(data1);
        this.loadingApi.isLoading.next(true);
        if (res?.status === 0) {
          this.loadingApi.isLoading.next(false);
          if (checkType == 'org' || this.checkType == 'org') {
            this.orga.checkToGetData('pending');
          } else if (checkType == 'pro' || this.checkType == 'pro') {
            this.pro.checkToGetData('pending');
          } else if (checkType == 'cam' || this.checkType == 'cam') {
            this.cam.checkToGetData('pending');
          }
          this.snackBar.showMessage("Từ chối thành công", true);
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
        }


      }
    })
  }
}
