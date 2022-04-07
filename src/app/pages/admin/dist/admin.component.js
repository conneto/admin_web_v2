"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(authService, router, orgApi) {
        this.authService = authService;
        this.router = router;
        this.orgApi = orgApi;
        this.menus = [
            {
                id: '1',
                name: 'Dashboard',
                path: 'dashboard',
                icon: 'assets/icon/dashboard-icon.png'
            },
            {
                id: '2',
                name: 'User Management',
                path: 'user-management',
                icon: 'assets/icon/user-icon.png'
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
                        icon: 'assets/icon/economic.png'
                    }, {
                        id: '3',
                        subname: 'Campaign Request',
                        path: 'campaign-request',
                        icon: 'assets/icon/economic.png'
                    }, {
                        id: '3',
                        subname: 'Project Request',
                        path: 'project-request',
                        icon: 'assets/icon/economic.png'
                    },]
            },
            {
                id: '3',
                name: 'Organization Management',
                path: 'manage-oraganization',
                icon: 'assets/icon/user-icon.png',
                role: 'organization_manager'
            },
            {
                id: '3',
                name: 'Campagin Management',
                path: 'manage-campaign',
                icon: 'assets/icon/user-icon.png',
                role: 'organization_manager'
            },
            {
                id: '3',
                name: 'Project Management',
                path: 'manage-project',
                icon: 'assets/icon/user-icon.png',
                role: 'organization_manager'
            },
        ];
        this.isExpaned = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _a;
        this.user = this.authService.currentUserValue;
        console.log((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
        if (this.user) {
            if (this.authService.currentUserValue.role === 'organization_manager') {
                this.menus = this.menus.filter(function (x) {
                    return x.role === 'organization_manager';
                });
            }
        }
    };
    AdminComponent.prototype.isLargeScreen = function () {
        var width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        if (width > 720) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminComponent.prototype.check = function () {
        alert("ngu");
    };
    AdminComponent.prototype.handleTitle = function (menu) {
        this.titleName = menu.name;
        if (this.titleName === 'MANAGE REQUEST') {
            this.titleName = menu.submenu.subname;
        }
        return this.titleName;
    };
    AdminComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigateByUrl('/');
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.scss']
        })
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
