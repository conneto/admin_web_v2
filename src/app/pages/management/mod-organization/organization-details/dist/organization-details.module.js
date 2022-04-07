"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationDetailsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var component_module_1 = require("src/app/components/component/component.module");
var angular_material_module_1 = require("src/app/angular-material.module");
var organization_details_component_1 = require("./organization-details.component");
var organization_details_routing_module_1 = require("./organization-details-routing.module");
var OrganizationDetailsModule = /** @class */ (function () {
    function OrganizationDetailsModule() {
    }
    OrganizationDetailsModule = __decorate([
        core_1.NgModule({
            declarations: [
                organization_details_component_1.OrganizationDetailsComponent
            ],
            imports: [
                common_1.CommonModule,
                organization_details_routing_module_1.OrganizationDetailsRoutingModule, component_module_1.ComponentModule, angular_material_module_1.AngularMaterialModule,
            ]
        })
    ], OrganizationDetailsModule);
    return OrganizationDetailsModule;
}());
exports.OrganizationDetailsModule = OrganizationDetailsModule;
