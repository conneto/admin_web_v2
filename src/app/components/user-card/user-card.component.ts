import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user/user.model';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
@Input() user?:User;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  disableUser(){
    const diaglogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Kích hoạt',
        message: 'kích hoạt',
      },
    })
  }
}
