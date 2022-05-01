import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user/user.model';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
@Input() user?:User;
  urlApi?: string;
  constructor(private dialog:MatDialog, private loadingService: LoadingServiceService) { }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
  }

  disableUser(){
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: 'Đồng ý',
        close: 'Hủy',
        message: 'Bạn có chắc chắn muốn khóa người dùng này?',
      },
    })
  }

  enableUser() {
  }
}
