"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizationAdapter = exports.Organization = void 0;
var core_1 = require("@angular/core");
var Organization = /** @class */ (function () {
    function Organization(cover, description, eng_name, foundingDate, id, is_active, logo, mission, name, operating_license, vision, website) {
        this.cover = cover;
        this.description = description;
        this.eng_name = eng_name;
        this.foundingDate = foundingDate;
        this.id = id;
        this.is_active = is_active;
        this.logo = logo;
        this.mission = mission;
        this.name = name;
        this.operating_license = operating_license;
        this.vision = vision;
        this.website = website;
    }
    return Organization;
}());
exports.Organization = Organization;
var OrganizationAdapter = /** @class */ (function () {
    function OrganizationAdapter() {
    }
    OrganizationAdapter.prototype.adapt = function (item) {
        return new Organization(item.cover, item.description, item.eng_name, item.founding_date, item.id, item.is_active, item.logo, item.mission, item.name, item.operating_license, item.vision, item.website);
    };
    OrganizationAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationAdapter);
    return OrganizationAdapter;
}());
exports.OrganizationAdapter = OrganizationAdapter;
