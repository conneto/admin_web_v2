import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.scss']
})
export class DeleteEntityComponent implements OnInit {
  @Input() entity: any;
  isSave?: boolean = false;
  isAdmin?: boolean;
  @Input() type: any;

  constructor(private data: LoadingDataService, private loading: LoadingServiceService, private camApi: CampaignApiService, private proApi: ProjectApiService, private user: AuthServiceService, private snackBar: SnackBarMessageComponent, private orgApi: OrganizationApiService, private dialog: MatDialog) { }
  e: any;
  ngOnInit(): void {
    if (this.user.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false
    }
  }
  change() {
    this.isSave = !this.isSave
  }
  async disable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Vô hiệu hóa',
        message: "vô hiệu hóa",
      },
    })
    diaglogRef.afterClosed().subscribe(async x => {

      if (x) {
        this.loading.isLoading.next(true);
        const data1 = {
          object_id: this.entity?.id,
          object_type: this.type == 'org' ? AuthServiceService.ORGANIZATION
            : this.type == 'cam' ? AuthServiceService.CAMPAIGN : this.type == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: 'disable',
          note: 'Disable this',
        }
        console.log(data1)
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

          this.snackBar.showMessage("Vô hiệu hóa thành công !", true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
        }
      }
    
    })
  }
  async enable() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Cấp quyền',
        message: "cấp quyền hoạt động",
      },
    })
    diaglogRef.afterClosed().subscribe(async x => {
      if (x) {
        this.loading.isLoading.next(true);
        const data1 = {
          object_id: this.entity?.id,
          object_type: this.type == 'org' ? AuthServiceService.ORGANIZATION
            : this.type == 'cam' ? AuthServiceService.CAMPAIGN : this.type == 'pro' ? AuthServiceService.PROJECT : AuthServiceService.ORGANIZATION,
          status: 'enable',
          note: 'Enable this',
        }
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
          this.snackBar.showMessage("Cấp quyền hoạt động thành công !", true);
        } else {
          this.loading.isLoading.next(false);
          this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
        }
      }
    })
  }
  async delete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Xóa',
        message: 'xóa',
      }
    })
    dialogRef.afterClosed().subscribe(async data => {

      if (data) {
        let res: BaseResponse
        this.loading.isLoading.next(true);
        switch (this.type) {
          case 'org': res = await this.orgApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage('Xóa thành công', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
          case 'cam': res = await this.camApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage('Xóa thành công', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
          case 'pro': res = await this.proApi.delete(`${this.entity.id}`);
            if (res.status == 0) {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage('Xóa thành công', true);
            } else {
              this.loading.isLoading.next(false);
              this.snackBar.showMessage(`${res.message}`, false);
            }
            break;
        }

      }
    })
  }
}
