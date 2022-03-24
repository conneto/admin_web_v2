"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var organizations_routing_module_1 = require("./organizations-routing.module");
var organizations_component_1 = require("./organizations.component");
var component_module_1 = require("src/app/components/component/component.module");
var angular_material_module_1 = require("src/app/angular-material.module");
var OrganizationsModule = /** @class */ (function () {
    function OrganizationsModule() {
    }
    OrganizationsModule = __decorate([
        core_1.NgModule({
            declarations: [
                organizations_component_1.OrganizationsComponent
            ],
            imports: [
                common_1.CommonModule,
                organizations_routing_module_1.OrganizationsRoutingModule,
                component_module_1.ComponentModule,
                angular_material_module_1.AngularMaterialModule,
            ]
        })
    ], OrganizationsModule);
    return OrganizationsModule;
}());
exports.OrganizationsModule = OrganizationsModule;
