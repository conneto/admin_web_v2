"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationRequestDetailsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var organization_request_details_routing_module_1 = require("./organization-request-details-routing.module");
var organization_request_details_component_1 = require("./organization-request-details.component");
var component_module_1 = require("src/app/components/component/component.module");
var angular_material_module_1 = require("src/app/angular-material.module");
var OrganizationRequestDetailsModule = /** @class */ (function () {
    function OrganizationRequestDetailsModule() {
    }
    OrganizationRequestDetailsModule = __decorate([
        core_1.NgModule({
            declarations: [
                organization_request_details_component_1.OrganizationRequestDetailsComponent
            ],
            imports: [
                common_1.CommonModule,
                organization_request_details_routing_module_1.OrganizationRequestDetailsRoutingModule, component_module_1.ComponentModule, angular_material_module_1.AngularMaterialModule,
            ]
        })
    ], OrganizationRequestDetailsModule);
    return OrganizationRequestDetailsModule;
}());
exports.OrganizationRequestDetailsModule = OrganizationRequestDetailsModule;
