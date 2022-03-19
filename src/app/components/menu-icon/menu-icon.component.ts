import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/models/menu/menu';


@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent implements OnInit {
  @Input() menu?: Menu;
  @Input() isExpaned?: boolean;
  @Output() getTitle=new EventEmitter<Menu>();

  ngOnInit(): void {
  }
  handleTitle() {
    this.getTitle.emit(this.menu);
  }
}
