"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterAdapter = exports.Register = void 0;
var core_1 = require("@angular/core");
var Register = /** @class */ (function () {
    function Register(username, password, first_name, last_name, number_phone, role) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.number_phone = number_phone;
        this.role = role;
    }
    return Register;
}());
exports.Register = Register;
var RegisterAdapter = /** @class */ (function () {
    function RegisterAdapter() {
    }
    RegisterAdapter.prototype.adapt = function (item) {
        return new Register(item.username, item.password, item.first_name, item.last_name, item.number_phone, item.role);
    };
    RegisterAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RegisterAdapter);
    return RegisterAdapter;
}());
exports.RegisterAdapter = RegisterAdapter;
