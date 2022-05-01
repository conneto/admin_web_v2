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
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
  }

  disableUser() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn khóa người dùng này?',
      },
    });
  }

  enableUser() {
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn kích hoạt người dùng này?',
      },
    });
  }
}
