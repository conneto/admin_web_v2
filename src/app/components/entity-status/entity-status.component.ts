import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entity-status',
  templateUrl: './entity-status.component.html',
  styleUrls: ['./entity-status.component.scss']
})
export class EntityStatusComponent implements OnInit {
  selectedStatus?: string;
  status: string[] = ["Tất cả", "Vô hiệu hóa", "Cấp quyền"]
  default?:string="Tất cả";
  @Output() entity=new EventEmitter<any>();
  @Input() type?:string;
  @Input() entityData?:any;
  passData?:any;
  constructor() { }

  ngOnInit(): void {
  } 
  sendData(e:any){
    this.entity.emit(e);
  }
  getStatus(e: any) {
    if(e){
      switch(e){
        case 'Tất cả': 
        this.sendData(this.entityData);
        break;
        case 'Vô hiệu hóa':
          this.passData=this.entityData.filter((x:any)=>{
            return x.is_active==false;
          })
          this.sendData(this.passData);
           break;
        case 'Cấp quyền':
          this.passData=this.entityData.filter((x:any)=>{
            return x.is_active==true;
          })
          this.sendData(this.passData);
           break;
      }
    }
  }

}
