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
exports.AngularMaterialModule = void 0;
var google_maps_1 = require("@angular/google-maps");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var overlay_1 = require("@angular/cdk/overlay");
var tree_1 = require("@angular/cdk/tree");
var portal_1 = require("@angular/cdk/portal");
var autocomplete_1 = require("@angular/material/autocomplete");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var card_1 = require("@angular/material/card");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var core_2 = require("@angular/material/core");
var divider_1 = require("@angular/material/divider");
var expansion_1 = require("@angular/material/expansion");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var paginator_1 = require("@angular/material/paginator");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var snack_bar_1 = require("@angular/material/snack-bar");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var tabs_1 = require("@angular/material/tabs");
var toolbar_1 = require("@angular/material/toolbar");
var badge_1 = require("@angular/material/badge");
var grid_list_1 = require("@angular/material/grid-list");
var radio_1 = require("@angular/material/radio");
var datepicker_1 = require("@angular/material/datepicker");
var tooltip_1 = require("@angular/material/tooltip");
var progress_bar_1 = require("@angular/material/progress-bar");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var core_3 = require("@angular/material/core");
var ngx_skeleton_loader_1 = require("ngx-skeleton-loader");
var ng2_file_upload_1 = require("ng2-file-upload");
var ngx_dropzone_1 = require("ngx-dropzone");
var ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
var ngx_currency_1 = require("ngx-currency");
var materialModules = [
    tree_1.CdkTreeModule,
    autocomplete_1.MatAutocompleteModule,
    button_1.MatButtonModule,
    card_1.MatCardModule,
    checkbox_1.MatCheckboxModule,
    chips_1.MatChipsModule,
    divider_1.MatDividerModule,
    expansion_1.MatExpansionModule,
    icon_1.MatIconModule,
    input_1.MatInputModule,
    list_1.MatListModule,
    menu_1.MatMenuModule,
    progress_spinner_1.MatProgressSpinnerModule,
    paginator_1.MatPaginatorModule,
    core_2.MatRippleModule,
    select_1.MatSelectModule,
    sidenav_1.MatSidenavModule,
    snack_bar_1.MatSnackBarModule,
    sort_1.MatSortModule,
    table_1.MatTableModule,
    tabs_1.MatTabsModule,
    toolbar_1.MatToolbarModule,
    form_field_1.MatFormFieldModule,
    button_toggle_1.MatButtonToggleModule,
    overlay_1.OverlayModule,
    portal_1.PortalModule,
    badge_1.MatBadgeModule,
    grid_list_1.MatGridListModule,
    radio_1.MatRadioModule,
    datepicker_1.MatDatepickerModule,
    tooltip_1.MatTooltipModule,
    progress_bar_1.MatProgressBarModule,
    icon_1.MatIconModule,
    grid_list_1.MatGridListModule,
    form_field_1.MatFormFieldModule,
    forms_1.ReactiveFormsModule,
    dialog_1.MatDialogModule,
    snack_bar_1.MatSnackBarModule,
    progress_spinner_1.MatProgressSpinnerModule,
    core_3.MatNativeDateModule,
    ngx_skeleton_loader_1.NgxSkeletonLoaderModule,
    ng2_file_upload_1.FileUploadModule,
    ngx_dropzone_1.NgxDropzoneModule,
    ngx_skeleton_loader_1.NgxSkeletonLoaderModule,
    slide_toggle_1.MatSlideToggleModule,
    ngx_currency_1.NgxCurrencyModule,
    ngx_google_places_autocomplete_1.GooglePlaceModule,
    google_maps_1.GoogleMapsModule,
];
var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = __decorate([
        core_1.NgModule({
            imports: __spreadArrays([
                common_1.CommonModule
            ], materialModules),
            exports: __spreadArrays(materialModules),
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());
exports.AngularMaterialModule = AngularMaterialModule;
