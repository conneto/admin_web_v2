"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BaseResponseAdapter = exports.BaseResponse = void 0;
var core_1 = require("@angular/core");
var BaseResponse = /** @class */ (function () {
    function BaseResponse(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    return BaseResponse;
}());
exports.BaseResponse = BaseResponse;
var BaseResponseAdapter = /** @class */ (function () {
    function BaseResponseAdapter() {
    }
    BaseResponseAdapter.prototype.adapt = function (item) {
        return new BaseResponse(item.status, item.message, item.data);
    };
    BaseResponseAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BaseResponseAdapter);
    return BaseResponseAdapter;
}());
exports.BaseResponseAdapter = BaseResponseAdapter;
