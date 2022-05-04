import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/models/menu/menu';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent implements OnInit {
  @Input() menu?: Menu;
  @Input() isExpaned?: boolean;
  @Output() getTitle = new EventEmitter<Menu>();

  isShowSubMenu=false;
  constructor(private authApi:AuthService){

  }


  ngOnInit(): void {

  }

  check() {
    var a = document.querySelector('.sub-menu');
  }

}
