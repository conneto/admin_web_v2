"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./guard/auth.guard");
var guard2_guard_1 = require("./guard/guard2.guard");
var guard3_guard_1 = require("./guard/guard3.guard");
var login_component_1 = require("./pages/login/login.component");
var routes = [
    { path: '', canActivate: [guard3_guard_1.Guard3Guard], loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/admin/admin.module'); }).then(function (m) { return m.AdminModule; }); } },
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: "admin", canActivate: [auth_guard_1.AuthGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/admin/admin.module'); }).then(function (m) { return m.AdminModule; }); }
    },
    { path: 'register', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/register/register.module'); }).then(function (m) { return m.RegisterModule; }); } },
    {
        path: 'manager', canActivate: [guard2_guard_1.Guard2Guard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/admin/admin.module'); }).then(function (m) { return m.AdminModule; }); }
    },
    { path: 'user-details', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/mod-user/user-details/user-details.module'); }).then(function (m) { return m.UserDetailsModule; }); } },
    { path: '**', redirectTo: '' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
