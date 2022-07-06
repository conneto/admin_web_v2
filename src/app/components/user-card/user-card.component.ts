import { SnackBarMessageComponent } from './../snack-bar-message/snack-bar-message.component';
import { BaseResponse } from './../../models/base-response/base-response';
import { UserService } from 'src/app/services/user-service/user.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user/user.model';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user?: User;
  urlApi?: string;
  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    public utilService: UtilService,
    private userService: UserService,
    private snackBar: SnackBarMessageComponent
  ) {}

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
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
          object_id: this.user?.id,
          object_type: 'activate_user',
          status: 'disable',
          note: 'Người dùng vi phạm',
        };
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
          object_id: this.user?.id,
          object_type: 'activate_user',
          status: 'enable',
          note: '',
        };
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
