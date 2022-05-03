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
  constructor() { }

  ngOnInit(): void {
  }
  sendData(e: any) {
    this.entity.emit(e);
  }
  getStatus(e: any) {
    if (e) {
      console.log(this.entityData);
      switch (e) {

        case 'Tất cả':
          this.passData = this.entityData.filter((x: any) => {
            return x.result_code == 510 || x.resultCode == 610 || x.result_code == 710;
          })

          this.sendData(this.passData);
          break;
        case 'Vô hiệu hóa':
          this.passData = this.entityData.filter((x: any) => {
            return x.is_active == false && x.result_code == 510 ||
              x.is_active == false &&
              x.resultCode == 610 ||

              x.is_active == false && x.result_code == 710;;
          })
          this.sendData(this.passData);

          break;
        case 'Cấp quyền':
          this.passData = this.entityData.filter((x: any) => {
            return x.is_active == true && x.result_code == 510 ||
              x.is_active == true &&
              x.resultCode == 610 ||
              x.is_active == true &&
              x.result_code == 710;
          })
          this.sendData(this.passData);
          break;
      }
    }
  }

}
