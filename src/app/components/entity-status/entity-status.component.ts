import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-status',
  templateUrl: './entity-status.component.html',
  styleUrls: ['./entity-status.component.scss']
})
export class EntityStatusComponent implements OnInit {
  selectedStatus?: string;
  status: string[] = ["Tất cả", "Vô hiệu hóa", "Cấp quyền"]
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
    this.checkData();
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
      return x.is_active == false && x.result_code == 510 ||
        x.is_active == false &&
        x.result_code == 610 ||
        x.is_active == false && x.result_code == 710;;
    })
    if (this.passData.length == 0) {
      this.noDataDisbale = true;
    } else {
      this.noDataDisbale = false;
    }
  }
  checkAll() {
    this.passData = this.entityData.filter((x: any) => {
      return x.result_code == 510 || x.result_code == 610 || x.result_code == 710;
    })
    if (this.passData.length == 0) {
      this.noDataAll = true;
    } else {
      this.noDataAll = false;
    }
  }
  checkEnable() {
    this.passData = this.entityData.filter((x: any) => {
      return (x.is_active == true && x.result_code == 510 || x.result_code == 531) ||
        (x.is_active == true &&
          x.result_code == 610 || x.result_code == 631) ||
        (x.is_active == true &&
          x.result_code == 710 || x.result_code == 731)
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
        case 'Vô hiệu hóa':
          this.checkDisable();
          this.sendData(this.passData);

          break;
        case 'Cấp quyền':
          this.checkEnable();
          this.sendData(this.passData);
          break;
      }
    }
  }

}
