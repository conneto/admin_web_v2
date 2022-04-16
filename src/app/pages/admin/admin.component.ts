import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginResponse } from 'src/app/dtos/user-login-response/user-login-response.model';
import { Menu } from 'src/app/models/menu/menu';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { OrganizationRequestComponent } from '../manage-request/mod-organization/organization-request/organization-request.component';
import { OrganizationsComponent } from '../management/mod-organization/organizations/organizations.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title: string = '';
  menus: Array<Menu> = [
    {
      id: '1',
      name: 'Báo Cáo',
      path: 'dashboard',
      icon: 'assets/icon/dashboard-icon.png',
    },
    {
      id: '2',
      name: 'Quản Lý Người Dùng',
      path: 'user-management',
      icon: 'assets/icon/user-icon.png',
    },
    // {
    //   id: '3',
    //   name: 'Manage Request',
    //   icon: 'assets/icon/economic.png',
    //   submenu: [{
    //     id: '3',
    //     subname: 'Organization Request',
    //     path: 'organization-request',
    //     icon: 'assets/icon/economic.png',
    //   }, {
    //     id: '3',
    //     subname: 'Project Request',
    //     path: 'project-request',
    //     icon: 'assets/icon/economic.png',
    //   }, {
    //     id: '3',
    //     subname: 'Campaign Request',
    //     path: 'campaign-request',
    //     icon: 'assets/icon/economic.png',
    //   },],
    // },
    {
      id: '3',
      name: 'Quản Lý Tổ Chức',
      path: 'manage-organization',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
    {
      id: '4',
      name: 'Quản Lý Dự Án',
      path: 'manage-project',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
    {
      id: '5',
      name: 'Quản Lý Chiến Dịch',
      path: 'manage-campaign',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
  ]
  user?: UserLoginResponse;
  constructor(private authService: AuthServiceService, private router: Router, private orgApi: OrganizationsComponent,) {
  }
  isExpaned: boolean = false;
  ngOnInit(): void {

    this.user = this.authService.currentUserValue;
    console.log(this.user?.id);
    if (this.user) {
      if (this.authService.currentUserValue.role === 'organization_manager') {
        this.menus = this.menus.filter(x => {
          return x.role === 'organization_manager';
        })
      }
    }
  }
  ngAfterContentChecked() {
    this.getTitle();
  }
  getTitle() {
    this.title = this.router.url.split('/')[this.router.url.split.length].trim();
    if (this.title == 'organization-request' || this.title == 'project-request' || this.title == 'campaign-request') {
      const tempMenu: any = this.menus.filter(x => {
        return x.submenu;
      })
      tempMenu[0].submenu.forEach((x: any) => {
        if (x.path == this.title) {
          this.title = x.subname;
        }
      })
    } else {
      const tempMenu: any = this.menus.filter(x => {
        return x.path === this.title;
      })
      this.title = tempMenu[0].name;
    }
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



  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
