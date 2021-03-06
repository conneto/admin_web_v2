
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Organization } from 'src/app/models/organization/organization';


@Component({
  selector: 'app-change-to-list',
  templateUrl: './change-to-list.component.html',
  styleUrls: ['./change-to-list.component.scss']
})

export class ChangeToListComponent implements OnInit {
  whichView?: string;
  icon_view: string = 'view_list';

  @Output() handleTitle = new EventEmitter<string>();
  @Input() entityOrganization?: Organization[];
  @Output() entitys = new EventEmitter<Organization[]>();
  constructor() {
  }

  ngOnInit(): void {
  }


  changeView(isTab?: boolean) {
    if (isTab) {
      {
        this.handleTitle.emit(this.whichView = 'grid');
     
        this.icon_view = 'view_list';
      }
    } else {
      if (this.icon_view == 'grid_view') {
        this.handleTitle.emit(this.whichView = 'grid');
        this.entitys.emit(this.entityOrganization);
        this.icon_view = 'view_list';
      } else {
        this.handleTitle.emit(this.whichView = 'list');
        this.entitys.emit(this.entityOrganization);
        this.icon_view = 'grid_view';
      }
    }



  }
}
