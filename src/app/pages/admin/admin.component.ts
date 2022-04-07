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

  menus: Array<Menu> = [
    {
      id: '1',
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'assets/icon/dashboard-icon.png',
    },
    {
      id: '2',
      name: 'User Management',
      path: 'user-management',
      icon: 'assets/icon/user-icon.png',
    },
    // {
    //   id: '3',
    //   name: 'ORGANIZATION REQUEST',
    //   path: 'organization-request',
    //   icon: 'assets/icon/economic.png',
    // },
    // {
    //   id: '3',
    //   name: 'PROJECT REQUEST',
    //   icon: 'assets/icon/economic.png',
    // },
    // {
    //   id: '3',
    //   name: 'CAMPAIGN REQUEST',
    //   icon: 'assets/icon/economic.png',
    // },
    {
      id: '3',
      name: 'Manage Request',
      icon: 'assets/icon/economic.png',
      submenu: [{
        id: '3',
        subname: 'Organization Request',
        path: 'organization-request',
        icon: 'assets/icon/economic.png',
      }, {
        id: '3',
        subname: 'Campaign Request',
        path: 'campaign-request',
        icon: 'assets/icon/economic.png',
      }, {
        id: '3',
        subname: 'Project Request',
        path: 'project-request',
        icon: 'assets/icon/economic.png',
      },]
    },
    {
      id: '3',
      name: 'Organization Management',
      path: 'manage-oraganization',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
    {
      id: '3',
      name: 'Campagin Management',
      path: 'manage-campaign',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
    {
      id: '3',
      name: 'Project Management',
      path: 'manage-project',
      icon: 'assets/icon/user-icon.png',
      role: 'organization_manager',
    },
  ]
  user?: UserLoginResponse;
  constructor(private authService: AuthServiceService, private router: Router,private orgApi:OrganizationsComponent,) { }
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

    this.titleName = menu.name;
    if (this.titleName === 'MANAGE REQUEST') {
      this.titleName = menu.submenu.subname;
    }
    return this.titleName;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
