import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { OrganizationUpdateFormComponent } from '../update/organization-form/organization-form.component';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.scss'],
})
export class DeleteEntityComponent implements OnInit {
  @Input() entity: any;
  isSave?: boolean = false;
  isAdmin?: boolean;
  isOpenEdit: boolean = false;
  @Input() type: any;

  constructor(
    private data: LoadingDataService,
    private loading: LoadingService,
    private camApi: CampaignService,
    private proApi: ProjectService,
    private user: AuthService,
    private snackBar: SnackBarMessageComponent,
    private organizationService: OrganizationService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  e: any;

  ngOnInit(): void {
    if (this.user.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  async disable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'V?? hi???u h??a',
        message:
          this.type == 'org'
            ? 'B???n c?? ch???c ch???n mu???n v?? hi???u h??a t??? ch???c n??y kh??ng? N???u b???n v?? hi???u h??a n??y th?? c??c d??? ??n,chi???n d???ch li??n quan ?????u s??? b??? t???m d???ng theo'
            : this.type == 'cam'
            ? 'B???n c?? ch???c ch???n mu???n v?? hi???u h??a chi???n d???ch n??y kh??ng?'
            : this.type == 'pro'
            ? 'B???n c?? ch???c ch???n mu???n v?? hi???u h??a d??? ??n n??y kh??ng? N???u b???n v?? hi???u h??a d??? ??n n??y th?? c??c chi???n d???ch li??n quan ?????u s??? b??? t???m d???ng theo'
            : 'B???n c?? ch???c ch???n mu???n v?? hi???u h??a t??? ch???c n??y kh??ng? N???u b???n v?? hi???u h??a t??? ch???c n??y th?? c??c d??? ??n,chi???n d???ch li??n quan ?????u s??? b??? t???m d???ng theo',
        reason: true,
      },
    });
    diaglogRef.afterClosed().subscribe(async (x) => {
      if (x) {
        this.loading.isLoading.next(true);
        const data1 = {
          object_id: this.entity?.id,
          object_type:
            this.type == 'org'
              ? Constant.ORGANIZATION
              : this.type == 'cam'
              ? Constant.CAMPAIGN
              : this.type == 'pro'
              ? Constant.PROJECT
              : Constant.ORGANIZATION,
          status: 'disable',
          note: x,
        };
        console.log(data1);
        let res: BaseResponse | null = await this.user.activateEntity(data1);
        if (res?.status == 0) {
          switch (this.type) {
            case 'org':
              this.data.getByEntity('org');
              break;
            case 'cam':
              this.data.getByEntity('cam');
              break;
            case 'pro':
              this.data.getByEntity('pro');
              break;
          }
          this.loading.isLoading.next(false);
          window.location.reload();

          this.snackBar.showMessage('V?? hi???u h??a th??nh c??ng !', true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage('L???i. Xin h??y th??? l???i', false);
        }
      }
    });
  }
  async enable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: '?????ng ??',
        close: 'H???y',
        message:
          this.type == 'org'
            ? 'B???n c?? ch???c ch???n mu???n c???p quy???n ho???t ?????ng cho t??? ch???c n??y kh??ng?'
            : this.type == 'cam'
            ? 'B???n c?? ch???c ch???n mu???n c???p quy???n ho???t ?????ng cho chi???n d???ch n??y kh??ng?'
            : this.type == 'pro'
            ? 'B???n c?? ch???c ch???n mu???n c???p quy???n ho???t ?????ng cho d??? ??n n??y kh??ng?'
            : 'B???n c?? ch???c ch???n mu???n c???p quy???n ho???t ?????ng cho t??? ch???c n??y kh??ng?',
      },
    });
    diaglogRef.afterClosed().subscribe(async (x) => {
      if (x) {
        this.loading.isLoading.next(true);
        const data1 = {
          object_id: this.entity?.id,
          object_type:
            this.type == 'org'
              ? Constant.ORGANIZATION
              : this.type == 'cam'
              ? Constant.CAMPAIGN
              : this.type == 'pro'
              ? Constant.PROJECT
              : Constant.ORGANIZATION,
          status: 'enable',
          note: 'Enable this',
        };
        let res: BaseResponse | null = await this.user.activateEntity(data1);
        if (res?.status == 0) {
          this.loading.isLoading.next(false);
          switch (this.type) {
            case 'org':
              this.data.getByEntity('org');
              break;
            case 'cam':
              this.data.getByEntity('cam');
              break;
            case 'pro':
              this.data.getByEntity('pro');
              break;
          }
          window.location.reload();
          this.snackBar.showMessage('C???p quy???n ho???t ?????ng th??nh c??ng !', true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage('L???i.Xin h??y th??? l???i', false);
        }
      }
    });
  }
  async delete() {
    console.log(this.entity?.id);
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'X??a',
        close: 'H???y',
        message:
          this.type == 'org'
            ? 'B???n c?? ch???c ch???n mu???n x??a t??? ch???c n??y kh??ng? N???u b???n x??a t??? ch???c n??y th?? c??c d??? ??n,chi???n d???ch li??n quan ?????u s??? x??a theo'
            : this.type == 'cam'
            ? 'B???n c?? ch???c ch???n mu???n x??a chi???n d???ch n??y kh??ng?'
            : this.type == 'pro'
              ? 'B???n c?? ch???c ch???n mu???n x??a d??? ??n n??y kh??ng? N???u b???n x??a d??? ??n n??y th?? c??c chi???n d???ch li??n quan ?????u s??? x??a theo'
              : 'B???n c?? ch???c ch???n mu???n x??a t??? ch???c n??y kh??ng? N???u b???n x??a t??? ch???c n??y th?? c??c d??? ??n,chi???n d???ch li??n quan ?????u s??? b??? x??a theo',

      },
    });
    dialogRef.afterClosed().subscribe(async (data) => {

      if (data) {
        let res: BaseResponse;
        this.loading.isLoading.next(true);
        switch (this.type) {
          case 'org':
            res = await this.organizationService.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.router.navigate(['/manager/manage-organization'])
              this.snackBar.showMessage('G???i y??u c???u x??a th??nh c??ng. ?????i ph?? duy???t t??? ban qu???n tr???', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
          case 'cam':
            res = await this.camApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.router.navigate(['/manager/manage-campaign'])
              this.snackBar.showMessage('G???i y??u c???u x??a th??nh c??ng. ?????i ph?? duy???t t??? ban qu???n tr???', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
          case 'pro':
            res = await this.proApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.router.navigate(['/manager/manage-project'])
              this.snackBar.showMessage('G???i y??u c???u x??a th??nh c??ng. ?????i ph?? duy???t t??? ban qu???n tr???', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
        }
      }
    });
  }
}
