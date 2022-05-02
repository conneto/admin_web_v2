"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationUpdateFormComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("src/app/constant/constant");
var OrganizationUpdateFormComponent = /** @class */ (function () {
    function OrganizationUpdateFormComponent() {
        this.category = constant_1.Constant.CATEGORY;
        this.categoryString = '';
        this.categoryStringClone = '';
        this.filePDF = [];
    }
    OrganizationUpdateFormComponent.prototype.ngOnInit = function () {
    };
    OrganizationUpdateFormComponent.prototype.update = function () {
    };
    Object.defineProperty(OrganizationUpdateFormComponent.prototype, "organizationControl", {
        get: function () {
            return this.organizationForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    OrganizationUpdateFormComponent.prototype.onChangeLogo = function (e) {
    };
    OrganizationUpdateFormComponent.prototype.onChangeCover = function (e) {
    };
    OrganizationUpdateFormComponent.prototype.onRemoveCategory = function (e) {
    };
    OrganizationUpdateFormComponent.prototype.onSelectPDF = function (f) {
    };
    OrganizationUpdateFormComponent.prototype.onRemove = function (f) {
    };
    OrganizationUpdateFormComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-form',
            templateUrl: './organization-form.component.html',
            styleUrls: ['./organization-form.component.scss']
        })
    ], OrganizationUpdateFormComponent);
    return OrganizationUpdateFormComponent;
}());
exports.OrganizationUpdateFormComponent = OrganizationUpdateFormComponent;
