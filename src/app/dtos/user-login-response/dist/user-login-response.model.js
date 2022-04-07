"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserLoginResponseApdater = exports.UserLoginResponse = void 0;
var core_1 = require("@angular/core");
var UserLoginResponse = /** @class */ (function () {
    function UserLoginResponse(id, username, email, gender, birthday, role, token, first_name, last_name, number_phone, operating_unit, is_active, is_block) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.birthday = birthday;
        this.role = role;
        this.token = token;
        this.first_name = first_name;
        this.last_name = last_name;
        this.number_phone = number_phone;
        this.operating_unit = operating_unit;
        this.is_active = is_active;
        this.is_block = is_block;
    }
    return UserLoginResponse;
}());
exports.UserLoginResponse = UserLoginResponse;
var UserLoginResponseApdater = /** @class */ (function () {
    function UserLoginResponseApdater() {
    }
    UserLoginResponseApdater.prototype.adapt = function (item) {
        return new UserLoginResponse(item.id, item.username, item.email, item.gender, item.birthday, item.role, item.token, item.first_name, item.last_name, item.number_phone, item.operating_unit, item.is_active, item.is_block);
    };
    UserLoginResponseApdater = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserLoginResponseApdater);
    return UserLoginResponseApdater;
}());
exports.UserLoginResponseApdater = UserLoginResponseApdater;
