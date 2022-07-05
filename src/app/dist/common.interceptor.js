"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommonInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CommonInterceptor = /** @class */ (function () {
    function CommonInterceptor() {
    }
    CommonInterceptor.prototype.intercept = function (request, next) {
        var _a;
        return next.handle(request.clone({
            setHeaders: (_a = {},
                _a["Access-Control-Allow-Origin"] = '*',
                _a.Authorization = "Bearer " + (localStorage.getItem('USER_TOKEN') ? localStorage.getItem('USER_TOKEN') : ''),
                _a)
        })).pipe(operators_1.retry(2), operators_1.catchError(function (error) {
            alert(error.message);
            return rxjs_1.throwError(error);
        }));
    };
    CommonInterceptor = __decorate([
        core_1.Injectable()
    ], CommonInterceptor);
    return CommonInterceptor;
}());
exports.CommonInterceptor = CommonInterceptor;
