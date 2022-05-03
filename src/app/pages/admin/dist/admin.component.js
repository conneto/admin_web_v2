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
                name: 'Bảng điều khiển',
                path: 'dashboard',
                icon: 'assets/icons/dashboard_icon.png',
                role: 'organization_manager_admin'
            },
            {
                id: '2',
                name: 'Quản lý người dùng',
                path: 'user-management',
                icon: 'assets/icons/user_icon.png',
                role: 'admin'
            },
            {
                id: '3',
                name: 'Quản lý tổ chức',
                path: 'manage-organization',
                icon: 'assets/icons/organization_icon.png',
                role: 'organization_manager_admin'
            },
            {
                id: '4',
                name: 'Quản lý dự án',
                path: 'manage-project',
                icon: 'assets/icons/project_icon.png',
                role: 'organization_manager_admin'
            },
            {
                id: '5',
                name: 'Quản lý chiến dịch',
                path: 'manage-campaign',
                icon: 'assets/icons/campaign_icon.png',
                role: 'organization_manager_admin'
            },
            {
                id: '6',
                name: 'Quản lý tình nguyện viên',
                path: 'manage-volunteer',
                icon: 'assets/icons/volunteer_icon.png',
                role: 'organization_manager'
            },
        ];
        this.isExpanded = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.user = this.authService.currentUserValue;
        if (this.user) {
            if (this.authService.currentUserValue.role_id == 'organization_manager') {
                this.menus = this.menus.filter(function (x) {
                    return (x.role == 'organization_manager' ||
                        x.role == 'organization_manager_admin');
                });
            }
            else if (this.user.role_id == 'admin') {
                this.menus = this.menus.filter(function (x) {
                    return x.role == 'organization_manager_admin' || x.role == 'admin';
                });
            }
            console.log(this.menus);
        }
    };
    AdminComponent.prototype.ngAfterContentChecked = function () {
        this.getTitle();
    };
    AdminComponent.prototype.getTitle = function () {
        var _this = this;
        this.title = this.router.url
            .split('/')[this.router.url.split.length].trim();
        if (this.title == 'organization-request' ||
            this.title == 'project-request' ||
            this.title == 'campaign-request') {
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
