import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
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
  @Input() type: any;

  constructor(
    private data: LoadingDataService,
    private loading: LoadingService,
    private camApi: CampaignService,
    private proApi: ProjectService,
    private user: AuthService,
    private snackBar: SnackBarMessageComponent,
    private orgApi: OrganizationApiService,
    private dialog: MatDialog,
    private router: Router,
  ) { }
  e: any;
  ngOnInit(): void {
    if (this.user.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  change() {
    this.isSave = !this.isSave;
    console.log(this.entity);
    const dialogRef = this.dialog.open(OrganizationUpdateFormComponent, {
      width: '700px',
      data: {
        title: 'Tạo chiến dịch',

      }
    })
  }
  async disable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Vô hiệu hóa',
        message: this.type == 'org'
          ? 'Bạn có chắc chắn muốn vô hiệu hóa tổ chức này không? Nếu bạn vô hiệu hóa này thì các dự án,chiến dịch liên quan đều sẽ bị tạm dừng theo'
          : this.type == 'cam'
            ? 'Bạn có chắc chắn muốn vô hiệu hóa chiến dịch này không?'
            : this.type == 'pro'
              ? 'Bạn có chắc chắn muốn vô hiệu hóa dự án này không? Nếu bạn vô hiệu hóa dự án này thì các chiến dịch liên quan đều sẽ bị tạm dừng theo'
              : 'Bạn có chắc chắn muốn vô hiệu hóa tổ chức này không? Nếu bạn vô hiệu hóa tổ chức này thì các dự án,chiến dịch liên quan đều sẽ bị tạm dừng theo',
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
          note: 'hi',
        };

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

          this.snackBar.showMessage('Vô hiệu hóa thành công !', true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage('Lỗi. Xin hãy thử lại', false);
        }
      }
    });
  }
  async enable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: this.type == 'org'
          ? 'Bạn có chắc chắn muốn cấp quyền hoạt động cho tổ chức này không?'
          : this.type == 'cam'
            ? 'Bạn có chắc chắn muốn cấp quyền hoạt động cho chiến dịch này không?'
            : this.type == 'pro'
              ? 'Bạn có chắc chắn muốn cấp quyền hoạt động cho dự án này không?'
              : 'Bạn có chắc chắn muốn cấp quyền hoạt động cho tổ chức này không?',
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
          this.snackBar.showMessage('Cấp quyền hoạt động thành công !', true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage('Lỗi.Xin hãy thử lại', false);
        }
      }
    });
  }
  async delete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Xóa',
        close: 'Hủy',
        message: this.type == 'org'
          ? 'Bạn có chắc chắn muốn xóa tổ chức này không? Nếu bạn xóa tổ chức này thì các dự án,chiến dịch liên quan đều sẽ bị tạm dừng theo'
          : this.type == 'cam'
            ? 'Bạn có chắc chắn muốn xóa chiến dịch này không? Nếu bạn xóa dự án này thì các chiến dịch liên quan đều sẽ bị tạm dừng theo'
            : this.type == 'pro'
              ? 'Bạn có chắc chắn muốn xóa dự án này không?'
              : 'Bạn có chắc chắn muốn xóa tổ chức này không? Nếu bạn xóa tổ chức này thì các dự án,chiến dịch liên quan đều sẽ bị tạm dừng theo',
      },
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        let res: BaseResponse;
        this.loading.isLoading.next(true);
        switch (this.type) {
          case 'org':
            res = await this.orgApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.router.navigate(['/manager/manage-organization'])
              this.snackBar.showMessage('Xóa thành công', true);
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
              this.snackBar.showMessage('Xóa thành công', true);
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
              this.snackBar.showMessage('Xóa thành công', true);
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
