import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-table-campaign-participations',
  templateUrl: './table-campaign-participations.component.html',
  styleUrls: ['./table-campaign-participations.component.scss']
})
export class TableCampaignParticipationsComponent implements OnInit {
  displayColumns?: string[];

  @Input() entity?: any;
  @Input() volunteer?: any;
  @Input() type?: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  dataSource = new MatTableDataSource;

  urlApi?: string;

  constructor(private camApi:CampaignService,private snackBar: SnackBarMessageComponent, private api: AuthService, private dialog: MatDialog, private loadingService: LoadingService, public utilService: UtilService) {
  }

  ngOnInit(): void {
    switch (this.type) {
      case "donation":
        this.displayColumns = ['no', "name", "phone", 'total', 'payment_method_name', 'participate_date', "participate_message", "status"];
        break;
      case "recruitment":
        this.displayColumns = ['no', "name", "phone", 'participate_date', "participate_message", "status", 'action'];
        break;
    }
    for (let i = 0; i < this.volunteer?.length; i++) {
      Object.assign(this.volunteer[i], { no: i + 1 });

    }
    this.dataSource = new MatTableDataSource(this.volunteer);
    this.urlApi = this.loadingService.getApiGetLink.value;

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  approve(e: any,cam_id?:any) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: "Chấp nhận",
        message: "chấp nhận",
      }
    })
    dialogRef.afterClosed().subscribe(async x => {
      if (x) {
        this.loadingService.isLoading.next(true);
        const data1 = {
          object_id: e,

          object_type: 'volunteer',
          status: 'approve',
          note: 'Approve this',
        }
        // console.log(data1);
        let res: BaseResponse = await this.api.updateRequestByManager(data1);
        if (res.status == 0) {
          this.volunteer = await this.camApi.getParticipations(`${cam_id}`);
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage("Chấp nhận thành công !", true);
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res.message}`, false);
        }
      }
    })
  }
  reject(e: any,cam_id?:any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '360px',
      data: {
        button: "Đồng ý",
        close: "Suy nghĩ lại",
        message: "Bạn có chắc chắn muốn từ chối yêu cầu tham gia của tình nguyện viên này không?",
      }
    })
    dialogRef.afterClosed().subscribe(async x => {
      if (x) {
        this.loadingService.isLoading.next(true);
        const data1 = {
          object_id: e,

          object_type: 'volunteer',
          status: 'reject',
          note: 'Reject this',
        }
        // console.log(data1);
        let res: BaseResponse = await this.api.updateRequestByManager(data1);
        if (res.status == 0) {
          this.volunteer = await this.camApi.getParticipations(`${cam_id}`);
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage("Từ chối thành công !", true);
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res.message}`, false);
        }
      }
    })
  }
}
