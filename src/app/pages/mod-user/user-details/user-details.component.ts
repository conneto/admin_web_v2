import { SnackBarMessageComponent } from './../../../components/snack-bar-message/snack-bar-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../../components/dialog-confirm/dialog-confirm.component';
import { BaseResponse } from './../../../models/base-response/base-response';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util-service/util.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  urlApi?: string = "";
  user?: User;
  userId?: string;
  campaign_participations: Array<any> = [];

  constructor(
    public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private snackBar: SnackBarMessageComponent
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.urlApi = this.loadingService.getApiGetLink.value;
   }

  ngOnInit(): void {
    this.getUserDetails(this.userId || "");
    this.getCampaignParticipations(this.userId || "");
  }

  async getUserDetails(id: string) {
    this.user = await this.userService.getById(id);
  }

  async getCampaignParticipations(id: string) {
    this.campaign_participations = await this.userService.getCampaignParticipations(id);
  }

  public getFirstCover(fullCover: string) {
    return fullCover.split('|')[0];
  }

  async disableUser() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn khóa người dùng này?',
      },
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        let obj: any = {
          "object_id": this.user?.id,
          "object_type": "activate_user",
          "status": "disable",
          "note": "Người dùng vi phạm"
        }
         let res: BaseResponse<any> = await this.userService.activateUser(obj);

        if (res?.status == 0) {
          this.snackBar.showMessage('Khóa tài khoản thành công', true);
        } else {
          this.snackBar.showMessage('Khóa tài khoản thất bại', false);
        }
        this.loadingService.isLoading.next(false);
        window.location.reload();
      }
    });
  }

  async enableUser() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn kích hoạt người dùng này?',
      },
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        let obj: any = {
          "object_id": this.user?.id,
          "object_type": "activate_user",
          "status": "enable",
          "note": ""
        }
         let res: BaseResponse<any> = await this.userService.activateUser(obj);

        if (res?.status == 0) {
          this.snackBar.showMessage('Kích hoạt thành công', true);
        } else {
          this.snackBar.showMessage('Kích hoạt thất bại', false);
        }
        this.loadingService.isLoading.next(false);
        window.location.reload();
      }
    });
  }

}
