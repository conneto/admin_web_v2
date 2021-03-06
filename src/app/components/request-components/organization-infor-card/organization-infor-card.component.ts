import { Location } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { CampaignRequestComponent } from 'src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.component';
import { OrganizationRequestComponent } from 'src/app/pages/manage-request/mod-organization/organization-request/organization-request.component';

import { CampaignsComponent } from 'src/app/pages/management/mod-campaign/campaigns/campaigns.component';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-organization-infor-card',
  templateUrl: './organization-infor-card.component.html',
  styleUrls: ['./organization-infor-card.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationInforCardComponent implements OnInit {
  @Input() organizations?: Organization;
  urlApi?: string;
  urlLogo?: string;
  @Input() checkType?: any;
  constructor(
    public utilService:UtilService,
    private pro: ProjectComponent,
    private cam: CampaignsComponent,
    private orga: OrganizationsComponent,
    private loadingApi: LoadingService,
    private camApi: CampaignRequestComponent,
    private location: Location,
    private snackBar: SnackBarMessageComponent,
    private router: Router,
    private dialog: MatDialog,
    private authApi: AuthService,
    private org: OrganizationRequestComponent
  ) { }

  ngOnInit(): void {
    this.urlApi = this.loadingApi.getApiGetLink.value;
  }

  viewDetails(id: string) {
    this.router.navigate([
      'admin/organization-request/organization-request-detail/:' + id,
    ]);
  }

  async approve(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: '?????ng ??',
        close: 'H???y',
        message:
          checkType == 'org'
            ? 'B???n c?? ch???c ch???n mu???n ch???p nh???n y??u c???u c???a t??? ch???c n??y kh??ng?'
            : checkType == 'cam'
              ? 'B???n c?? ch???c ch???n mu???n ch???p nh???n y??u c???u c???a chi???n d???ch n??y kh??ng?'
              : checkType == 'pro'
                ? 'B???n c?? ch???c ch???n mu???n ch???p nh???n y??u c???u c???a d??? ??n n??y kh??ng?'
                : 'B???n c?? ch???c ch???n mu???n ch???p nh???n y??u c???u c???a t??? ch???c n??y kh??ng?',
      },
    });

    diaglogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type:
            checkType == 'org'
              ? Constant.ORGANIZATION
              : checkType == 'cam'
                ? Constant.CAMPAIGN
                : checkType == 'pro'
                  ? Constant.PROJECT
                  : Constant.ORGANIZATION,
          status: 'approve',
          note: 'Approve this',
        };
       
        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(
          data1
        );

        if (res?.status == 0) {
          this.loadingApi.isLoading.next(false);

          if (checkType == 'org' || this.checkType == 'org') {
            this.orga.checkToGetData('pending');
          } else if (checkType == 'pro' || this.checkType == 'pro') {
            this.pro.checkToGetData('pending');
          } else if (checkType == 'cam' || this.checkType == 'cam') {
            this.cam.checkToGetData('pending');
          }
          this.snackBar.showMessage('Ch???p nh???n y??u c???u th??nh c??ng !', true);
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage('L???i.Xin h??y th??? l???i', false);
        }
      }
    });
  }

  async reject(id?: string, checkType?: string) {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: '?????ng ??',
        close: 'H???y',
        reason: true,
        message:
          checkType == 'org'
            ? 'B???n c?? ch???c ch???n mu???n t??? ch???i y??u c???u c???a t??? ch???c n??y kh??ng?'
            : checkType == 'cam'
              ? 'B???n c?? ch???c ch???n mu???n  mu???n t??? ch???i y??u c???u c???a chi???n d???ch n??y kh??ng?'
              : checkType == 'pro'
                ? 'B???n c?? ch???c ch???n mu???n mu???n t??? ch???i y??u c???u c???a d??? ??n n??y kh??ng?'
                : 'B???n c?? ch???c ch???n mu???n t??? ch???i y??u c???u c???a t??? ch???c n??y kh??ng?',
      },
    });
    diaglogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.loadingApi.isLoading.next(true);
        const data1 = {
          object_id: this.organizations?.id || id,
          object_type:
            checkType == 'org'
              ? Constant.ORGANIZATION
              : checkType == 'cam'
                ? Constant.CAMPAIGN
                : checkType == 'pro'
                  ? Constant.PROJECT
                  : Constant.ORGANIZATION,
          status: 'reject',
          note: data,
        };
        let res: BaseResponse | null = await this.authApi.updateRequestByAdmin(
          data1
        );
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
          this.snackBar.showMessage('T??? ch???i th??nh c??ng', true);
        } else {
          this.loadingApi.isLoading.next(false);
          this.snackBar.showMessage('L???i.Xin h??y th??? l???i', false);
        }
      }
    });
  }
}
