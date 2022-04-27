import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-change-to-list',
  templateUrl: './change-to-list.component.html',
  styleUrls: ['./change-to-list.component.scss']
})
export class ChangeToListComponent implements OnInit {
  whichView?: string;
  icon_view: string = 'grid_view';

  @Output() handleTitle = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeView() {
    if (this.icon_view == 'grid_view') {
      this.handleTitle.emit(this.whichView = 'list');
      this.icon_view = 'view_list';
    } else {
      this.handleTitle.emit(this.whichView = 'grid');
      this.icon_view = 'grid_view';
    }
  }
}
