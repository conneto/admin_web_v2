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
            { path: 'register', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/register/register.module'); }).then(function (m) { return m.RegisterModule; }); } },
            {
                path: 'manage-oraganization',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-organization/organizations/organizations.module'); }).then(function (m) { return m.OrganizationsModule; }); },
                children: [
                    {
                        path: '',
                        loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-organization/organizations/organizations.module'); }).then(function (m) { return m.OrganizationsModule; }); }
                    },
                    {
                        path: 'organization-request-detail/:id',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('src/app/pages/management/mod-organization/organization-details/organization-details.module'); }).then(function (m) { return m.OrganizationDetailsModule; });
                        }
                    }
                ]
            },
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/dashboard/dashboard.module'); }).then((function (m) { return m.DashboardModule; })); }
            },
            { path: 'user-management', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/user-management/user-management.module'); }).then(function (m) { return m.UserManagementModule; }); } },
            {
                path: 'organization-request',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module'); }).then(function (m) { return m.OrganizationRequestModule; }); },
                children: [
                    {
                        path: '',
                        loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-organization/organization-request/organization-request.module'); }).then(function (m) { return m.OrganizationRequestModule; }); }
                    },
                    {
                        path: 'organization-request-detail/:id',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-organization/organization-request-details/organization-request-details.module'); }).then(function (m) { return m.OrganizationRequestDetailsModule; });
                        }
                    }
                ]
            },
            {
                path: 'manage-campaign',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-campaign/campaigns/campaigns.module'); }).then(function (m) { return m.CampaignsModule; }); }, children: [
                    { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-campaign/campaigns/campaigns.module'); }).then(function (m) { return m.CampaignsModule; }); } },
                    { path: 'campaign-details/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-campaign/campaign-details/campaign-details.module'); }).then(function (m) { return m.CampaignDetailsModule; }); } },
                ]
            },
            {
                path: 'manage-project',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-project/project/project.module'); }).then(function (m) { return m.ProjectModule; }); }, children: [
                    {
                        path: '',
                        loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-project/project/project.module'); }).then(function (m) { return m.ProjectModule; }); }
                    },
                    { path: 'project-request-detail/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/management/mod-project/project-details/project-details.module'); }).then(function (m) { return m.ProjectDetailsModule; }); } }
                ]
            },
            {
                path: 'campaign-request',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.module'); }).then(function (m) { return m.CampaignRequestModule; }); },
                children: [
                    { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-campaign/campaign-request/campaign-request.module'); }).then(function (m) { return m.CampaignRequestModule; }); } },
                    { path: 'campaign-request-detail/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-campaign/campaign-request-detail/campaign-request-detail.module'); }).then(function (m) { return m.CampaignRequestDetailModule; }); } }
                ]
            },
            {
                path: 'project-request',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-project/project-request/project-request.module'); }).then(function (m) { return m.ProjectRequestModule; }); },
                children: [
                    { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-project/project-request/project-request.module'); }).then(function (m) { return m.ProjectRequestModule; }); } },
                    { path: 'project-request-detail/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/manage-request/mod-project/project-request-detail/project-request-detail.module'); }).then(function (m) { return m.ProjectRequestDetailModule; }); } },
                ]
            },
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
