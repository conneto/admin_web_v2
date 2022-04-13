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
        this.title = '';
        this.menus = [
            {
                id: '1',
                name: 'Báo Cáo',
                path: 'dashboard',
                icon: 'assets/icon/dashboard-icon.png'
            },
            {
                id: '2',
                name: 'Quản Lý Người Dùng',
                path: 'user-management',
                icon: 'assets/icon/user-icon.png'
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
                path: 'manage-oraganization',
                icon: 'assets/icon/user-icon.png',
                role: 'organization_manager'
            },
            {
                id: '4',
                name: 'Quản Lý Dự Án',
                path: 'manage-project',
                icon: 'assets/icon/user-icon.png',
                role: 'organization_manager'
            },
            {
                id: '5',
                name: 'Quản Lý Chiến Dịch',
                path: 'manage-campaign',
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
    AdminComponent.prototype.ngAfterContentChecked = function () {
        this.getTitle();
    };
    AdminComponent.prototype.getTitle = function () {
        var _this = this;
        this.title = this.router.url.split('/')[this.router.url.split.length].trim();
        if (this.title == 'organization-request' || this.title == 'project-request' || this.title == 'campaign-request') {
            var tempMenu = this.menus.filter(function (x) {
                return x.submenu;
            });
            tempMenu[0].submenu.forEach(function (x) {
                if (x.path == _this.title) {
                    _this.title = x.subname;
                }
            });
        }
        else {
            var tempMenu = this.menus.filter(function (x) {
                return x.path === _this.title;
            });
            this.title = tempMenu[0].name;
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
