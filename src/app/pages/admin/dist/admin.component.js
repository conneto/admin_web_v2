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
    function AdminComponent() {
        this.menus = [
            {
                id: '1',
                name: 'DASHBOARD',
                path: 'dashboard',
                icon: 'assets/icon/dashboard-icon.png'
            },
            {
                id: '2',
                name: 'USER MANAGEMENT',
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
                name: 'MANAGE REQUEST',
                icon: 'assets/icon/economic.png',
                submenu: [{
                        id: '3',
                        subname: 'ORGANIZATION REQUEST',
                        path: 'organization-request',
                        icon: 'assets/icon/economic.png'
                    }, {
                        id: '3',
                        subname: 'CAMPAIGN REQUEST',
                        path: 'campaign-request',
                        icon: 'assets/icon/economic.png'
                    }, {
                        id: '3',
                        subname: 'PROJECT REQUEST',
                        path: 'project-request',
                        icon: 'assets/icon/economic.png'
                    },]
            },
            {
                id: '3',
                name: 'ORGANIZATION MANAGEMENT',
                path: 'manage-oraganization',
                icon: 'assets/icon/user-icon.png'
            },
            {
                id: '3',
                name: 'CAMPAIGN MANAGEMENT',
                path: 'manage-campaign',
                icon: 'assets/icon/user-icon.png'
            },
            {
                id: '3',
                name: 'PROJECT MANAGEMENT',
                path: 'manage-project',
                icon: 'assets/icon/user-icon.png'
            },
        ];
        this.isExpaned = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
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
