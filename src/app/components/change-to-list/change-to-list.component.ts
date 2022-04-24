import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-change-to-list',
  templateUrl: './change-to-list.component.html',
  styleUrls: ['./change-to-list.component.scss']
})
export class ChangeToListComponent implements OnInit {
  whichView?: string;
  isActiveList?: boolean = false;
  isActiveGrid?: boolean = false;
  @Output() handleTitle = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.isActiveGrid = true;
  }
  ngAfterViewInit(): void {

  }
  viewList() {

    this.handleTitle.emit(this.whichView = 'list');
    this.isActiveList = true;
    this.isActiveGrid = false;
  }
  viewGrid() {
    this.handleTitle.emit(this.whichView = 'grid');
    this.isActiveList = false;
    this.isActiveGrid = true;
  }
}
