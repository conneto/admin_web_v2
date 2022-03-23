"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationInforCardComponent = void 0;
var core_1 = require("@angular/core");
var OrganizationInforCardComponent = /** @class */ (function () {
    function OrganizationInforCardComponent() {
    }
    OrganizationInforCardComponent.prototype.ngOnInit = function () {
    };
    OrganizationInforCardComponent.prototype.viewDetails = function () {
    };
    OrganizationInforCardComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-infor-card',
            templateUrl: './organization-infor-card.component.html',
            styleUrls: ['./organization-infor-card.component.scss']
        })
    ], OrganizationInforCardComponent);
    return OrganizationInforCardComponent;
}());
exports.OrganizationInforCardComponent = OrganizationInforCardComponent;
