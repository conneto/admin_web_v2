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
var campaign_form_component_1 = require("../create/campaign-form/campaign-form.component");
var snack_bar_message_component_1 = require("../snack-bar-message/snack-bar-message.component");
var loading_spinner_component_1 = require("../loading-spinner/loading-spinner.component");
var tabgroup_component_1 = require("../tab-group/tabgroup.component");
var search_bar_component_1 = require("../search-bar/search-bar.component");
var project_item_component_1 = require("../project-item/project-item.component");
var campaign_item_component_1 = require("../campaign-item/campaign-item.component");
var table_rank_component_1 = require("../table-rank/table-rank.component");
var formatnumber_pipe_1 = require("src/app/pipes/FormatNumber/formatnumber.pipe");
var delete_entity_component_1 = require("../delete-entity/delete-entity.component");
var chip_category_component_1 = require("../chip-category/chip-category.component");
var skeletion_loading_component_1 = require("../skeletion-loading/skeletion-loading.component");
var download_document_form_component_1 = require("../download-document-form/download-document-form.component");
var document_button_component_1 = require("../document-button/document-button.component");
var select_type_campaign_component_1 = require("../select-type-campaign/select-type-campaign.component");
var change_to_list_component_1 = require("../change-to-list/change-to-list.component");
var list_view_component_1 = require("../list-view/list-view.component");
var table_campaign_participations_component_1 = require("../table-campaign-participations/table-campaign-participations.component");
var show_document_component_1 = require("../show-document/show-document.component");
var organization_details_component_1 = require("../organization-details/organization-details.component");
var entity_status_component_1 = require("../entity-status/entity-status.component");
var organization_form_component_2 = require("../update/organization-form/organization-form.component");
var organization_skeleton_loading_component_1 = require("../organization-skeleton-loading/organization-skeleton-loading.component");
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
    organization_form_component_2.OrganizationUpdateFormComponent,
    dialog_confirm_component_1.DialogConfirmComponent,
    project_form_component_1.ProjectFormComponent,
    campaign_form_component_1.CampaignForm,
    snack_bar_message_component_1.SnackBarMessageComponent,
    loading_spinner_component_1.LoadingSpinnerComponent,
    tabgroup_component_1.TabgroupComponent,
    search_bar_component_1.SearchBarComponent,
    project_item_component_1.ProjectItemComponent,
    campaign_item_component_1.CampaignItemComponent,
    table_rank_component_1.TableRankComponent,
    delete_entity_component_1.DeleteEntityComponent,
    chip_category_component_1.ChipCategoryComponent,
    skeletion_loading_component_1.SkeletionLoadingComponent,
    download_document_form_component_1.DownloadDocumentFormComponent,
    document_button_component_1.DocumentButtonComponent,
    select_type_campaign_component_1.SelectTypeCampaignComponent,
    change_to_list_component_1.ChangeToListComponent,
    list_view_component_1.ListViewComponent,
    table_campaign_participations_component_1.TableCampaignParticipationsComponent,
    show_document_component_1.ShowDocumentComponent,
    organization_details_component_1.OrganizationDetailsComponent,
    entity_status_component_1.EntityStatusComponent,
    organization_skeleton_loading_component_1.OrganizationSkeletonLoadingComponent,
    organization_form_component_2.OrganizationUpdateFormComponent,
];
var ComponentModule = /** @class */ (function () {
    function ComponentModule() {
    }
    ComponentModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(componentModules, [formatnumber_pipe_1.FormatnumberPipe]),
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
