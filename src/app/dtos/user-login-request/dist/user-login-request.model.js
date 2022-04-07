"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserLoginRequestAdapter = exports.UserLoginRequest = void 0;
var core_1 = require("@angular/core");
var UserLoginRequest = /** @class */ (function () {
    function UserLoginRequest(username, password) {
        this.username = username;
        this.password = password;
    }
    return UserLoginRequest;
}());
exports.UserLoginRequest = UserLoginRequest;
var UserLoginRequestAdapter = /** @class */ (function () {
    function UserLoginRequestAdapter() {
    }
    UserLoginRequestAdapter.prototype.adapt = function (item) {
        return new UserLoginRequest(item.username, item.password);
    };
    UserLoginRequestAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserLoginRequestAdapter);
    return UserLoginRequestAdapter;
}());
exports.UserLoginRequestAdapter = UserLoginRequestAdapter;
