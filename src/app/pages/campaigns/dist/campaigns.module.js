"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CampaignsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var campaigns_routing_module_1 = require("./campaigns-routing.module");
var campaigns_component_1 = require("./campaigns.component");
var component_module_1 = require("src/app/components/component/component.module");
var CampaignsModule = /** @class */ (function () {
    function CampaignsModule() {
    }
    CampaignsModule = __decorate([
        core_1.NgModule({
            declarations: [
                campaigns_component_1.CampaignsComponent
            ],
            imports: [
                common_1.CommonModule,
                campaigns_routing_module_1.CampaignsRoutingModule,
                component_module_1.ComponentModule,
            ]
        })
    ], CampaignsModule);
    return CampaignsModule;
}());
exports.CampaignsModule = CampaignsModule;
