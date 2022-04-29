import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
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
  
  constructor(private loading: LoadingServiceService, private camApi: CampaignApiService, private proApi: ProjectApiService, private user: AuthServiceService, private snackBar: SnackBarMessageComponent, private orgApi: OrganizationApiService, private dialog: MatDialog) { }
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
  async delete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Xóa',
        message: 'Xóa',
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
