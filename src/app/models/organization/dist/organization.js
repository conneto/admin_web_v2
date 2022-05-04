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
    function Organization(id, category, type, name, description, founding_date, eng_name, is_active, logo, mission, cover, operating_license, vision, website, approved_by, approved_date, created_by, result_code, result_message, result_note, created_at, created_name, is_enable, is_modify, location) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.name = name;
        this.description = description;
        this.founding_date = founding_date;
        this.eng_name = eng_name;
        this.is_active = is_active;
        this.logo = logo;
        this.mission = mission;
        this.cover = cover;
        this.operating_license = operating_license;
        this.vision = vision;
        this.website = website;
        this.approved_by = approved_by;
        this.approved_date = approved_date;
        this.created_by = created_by;
        this.result_code = result_code;
        this.result_message = result_message;
        this.result_note = result_note;
        this.created_at = created_at;
        this.created_name = created_name;
        this.is_enable = is_enable;
        this.is_modify = is_modify;
        this.location = location;
    }
    return Organization;
}());
exports.Organization = Organization;
var OrganizationAdapter = /** @class */ (function () {
    function OrganizationAdapter() {
    }
    OrganizationAdapter.prototype.adapt = function (item) {
        return new Organization(item.id, item.category, item.type, item.name, item.description, item.founding_date, item.eng_name, item.is_active, item.logo, item.mission, item.cover, item.operating_license, item.vision, item.website, item.approved_by, item.approved_date, item.created_by, item.result_code, item.result_message, item.result_note, item.created_at, item.created_by_name, item.is_enable, item.is_modify, item.location);
    };
    OrganizationAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationAdapter);
    return OrganizationAdapter;
}());
exports.OrganizationAdapter = OrganizationAdapter;
