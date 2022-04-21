import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.scss']
})
export class DeleteEntityComponent implements OnInit {
  @Input() entity: any;
  constructor(private snackBar: SnackBarMessageComponent, private orgApi: OrganizationApiService, private dialog: MatDialog) { }
  e: any;
  ngOnInit(): void {
  }
  async delete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        button: 'Vô hiệu hóa',
        message: 'vô hiệu hóa',
      }
    })
    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        // let res: BaseResponse = 
        await this.orgApi.delete(`${this.entity.id}`);
    
        // if (res.status == 0) {
        //   this.snackBar.showMessage('Xóa thành công', true);
        // }
      }
    })
  }
}
