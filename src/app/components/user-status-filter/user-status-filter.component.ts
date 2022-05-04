import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-status-filter',
  templateUrl: './user-status-filter.component.html',
  styleUrls: ['./user-status-filter.component.scss']
})
export class UserStatusFilterComponent implements OnInit {
  selectedStatus?: string;
  status: string[] = ["Tất cả", "Đang hoạt động", "Ngừng hoạt động"]
  default?: string = "Tất cả";
  @Output() entity = new EventEmitter<any>();
  @Input() type?: string;
  @Input() entityData?: any;
  passData?: any;
  noDataAll?: boolean;
  noDataDisbale?: boolean;

  noDataEnable?: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  sendData(e: any) {
    this.entity.emit(e);
  }
  checkData() {
    this.checkAll();
    this.checkEnable();
    this.checkDisable();
  }
  checkDisable() {
    this.passData = this.entityData.filter((x: any) => {
      return x.is_block == true;
    })
    if (this.passData.length == 0) {
      this.noDataDisbale = true;
    } else {
      this.noDataDisbale = false;
    }
  }
  checkAll() {
    this.passData = this.entityData.filter((x: any) => {
    return   x.is_active == true;
    })
    if (this.passData.length == 0) {
      this.noDataAll = true;
    } else {
      this.noDataAll = false;
    }
  }
  checkEnable() {
    this.passData = this.entityData.filter((x: any) => {
      return    x.is_block == false;
    })
    if (this.passData.length == 0) {
      this.noDataEnable = true;
    } else {
      this.noDataEnable = false;
    }
  }
  getStatus(e: any) {
    if (e) {
      switch (e) {

        case 'Tất cả':
          this.checkAll();
          this.sendData(this.passData);
          break;
        case 'Đang hoạt động':
          this.checkEnable();
          this.sendData(this.passData);

          break;
        case 'Ngừng hoạt động':
          this.checkDisable();
          this.sendData(this.passData);
          break;
      }
    }
  }
}
