"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ComponentModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var menu_icon_component_1 = require("../menu-icon/menu-icon.component");
var angular_material_module_1 = require("src/app/angular-material.module");
var dashboard_card_component_1 = require("../dashboard-card/dashboard-card.component");
var user_card_component_1 = require("../user-card/user-card.component");
var campaign_card_info_component_1 = require("../campaign-card-info/campaign-card-info.component");
var campaign_request_card_component_1 = require("../request-components/campaign-request-card/campaign-request-card.component");
var project_request_card_component_1 = require("../request-components/project-request-card/project-request-card.component");
var organization_infor_card_component_1 = require("../request-components/organization-infor-card/organization-infor-card.component");
var approve_decline_button_component_1 = require("src/app/components/approve-decline-button/approve-decline-button.component");
var status_component_1 = require("../status/status.component");
var organization_form_component_1 = require("../create/organization-form/organization-form.component");
var dialog_confirm_component_1 = require("../dialog-confirm/dialog-confirm.component");
var project_form_component_1 = require("../create/project-form/project-form.component");
var camapaign_form_component_1 = require("../create/camapaign-form/camapaign-form.component");
var snack_bar_message_component_1 = require("../snack-bar-message/snack-bar-message.component");
var loading_spinner_component_1 = require("../loading-spinner/loading-spinner.component");
var tabgroup_component_1 = require("../tab-group/tabgroup.component");
var search_bar_component_1 = require("../search-bar/search-bar.component");
var project_item_component_1 = require("../project-item/project-item.component");
var componentModules = [
    menu_icon_component_1.MenuIconComponent,
    dashboard_card_component_1.DashboardCardComponent,
    user_card_component_1.UserCardComponent,
    organization_infor_card_component_1.OrganizationInforCardComponent,
    campaign_card_info_component_1.CampaignCardInfoComponent,
    campaign_request_card_component_1.CampaignRequestCardComponent,
    project_request_card_component_1.ProjectRequestCardComponent,
    approve_decline_button_component_1.ApproveDeclineButtonComponent,
    status_component_1.StatusComponent,
    organization_form_component_1.OrganizationFormComponent,
    dialog_confirm_component_1.DialogConfirmComponent,
    project_form_component_1.ProjectFormComponent,
    camapaign_form_component_1.CamapaignFormComponent,
    snack_bar_message_component_1.SnackBarMessageComponent,
    loading_spinner_component_1.LoadingSpinnerComponent,
    tabgroup_component_1.TabgroupComponent,
    search_bar_component_1.SearchBarComponent,
    project_item_component_1.ProjectItemComponent,
];
var ComponentModule = /** @class */ (function () {
    function ComponentModule() {
    }
    ComponentModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(componentModules),
            imports: [
                router_1.RouterModule,
                common_1.CommonModule, angular_material_module_1.AngularMaterialModule,
            ],
            exports: __spreadArrays(componentModules),
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], ComponentModule);
    return ComponentModule;
}());
exports.ComponentModule = ComponentModule;
