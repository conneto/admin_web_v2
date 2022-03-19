import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu/menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menus: Array<Menu> = [
    {
      id: 'dashboard',
      name: 'DASHBOARD',
      path: 'dashboard',
      icon: 'assets/icon/dashboard-icon.png',
    },
    {
      id: '2',
      name: 'USER MANAGEMENT',
      path: 'user-management',
      icon: 'assets/icon/user-icon.png',
    },
    {

      id: '3',
      name: 'ORGANIZATION REQUEST',
      path: 'organization-request',
      icon: 'assets/icon/economic.png',

    },
    {

      id: '3',
      name: 'PROJECT REQUEST',
      icon: 'assets/icon/economic.png',

    },
    {

      id: '3',
      name: 'CAMPAIGN REQUEST',
      icon: 'assets/icon/economic.png',

    },
    {

      id: '3',
      name: 'MANAGE REQUEST',
      icon: 'assets/icon/economic.png',

    },
    {
      id: '3',
      name: 'ORGANIZATION MANAGEMENT',
      path: 'manage-oraganization',
      icon: 'assets/icon/user-icon.png',
    },
  ]
  constructor() { }
  isExpaned: boolean = false;
  ngOnInit(): void {
  }
  isLargeScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width > 720) {
      return true;
    } else {
      return false;
    }
  }

  check() {
    alert("ngu");
  }

  titleName?: string;
  handleTitle(menu: Menu) {
    return this.titleName = menu.name;
  }
}
