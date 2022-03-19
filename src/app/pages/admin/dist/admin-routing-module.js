"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_component_1 = require("./admin.component");
var routes = [
    {
        path: '', component: admin_component_1.AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard', pathMatch: 'full'
            },
            { path: 'manage-oraganization', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/organizations/organizations.module'); }).then(function (m) { return m.OrganizationsModule; }); } },
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/dashboard/dashboard.module'); }).then((function (m) { return m.DashboardModule; })); }
            },
            { path: 'user-management', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/user-management/user-management.module'); }).then(function (m) { return m.UserManagementModule; }); } },
            { path: 'organization-request', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/organization-request/organization-request.module'); }).then(function (m) { return m.OrganizationRequestModule; }); } },
        ]
    },
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
