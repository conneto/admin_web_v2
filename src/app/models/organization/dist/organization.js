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
    function Organization(id, name, logo, creationCode, creationMessage, cover, description, vison, is_active) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.creationCode = creationCode;
        this.creationMessage = creationMessage;
        this.cover = cover;
        this.description = description;
        this.vison = vison;
        this.is_active = is_active;
    }
    return Organization;
}());
exports.Organization = Organization;
var OrganizationAdapter = /** @class */ (function () {
    function OrganizationAdapter() {
    }
    OrganizationAdapter.prototype.adapt = function (item) {
        return new Organization(item.id, item.name, item.logo, item.creationCode, item.creationMessage, item.cover, item.description, item.vision, item.is_active);
    };
    OrganizationAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationAdapter);
    return OrganizationAdapter;
}());
exports.OrganizationAdapter = OrganizationAdapter;
