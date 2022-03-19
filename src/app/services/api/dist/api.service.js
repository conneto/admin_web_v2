"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ApiService = /** @class */ (function () {
    function ApiService(http, baseResponseAdapter) {
        this.http = http;
        this.baseResponseAdapter = baseResponseAdapter;
        this.uri = "https://955d-14-187-37-7.ngrok.io/fetch_data/api/v1";
        this.corsHeaders = new http_1.HttpHeaders();
        this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Origin', '*');
    }
    ApiService.prototype.getFullUri = function (api_name, params) {
        var url = this.uri + '/' + api_name;
        if (typeof params != 'undefined') {
            var array = [];
            for (var prop in params) {
                array.push(prop + '=' + params[prop]);
            }
            url += '?' + array.join('&');
        }
        return url;
    };
    ApiService.prototype.get = function (api_name, params) {
        var _this = this;
        var api_uri = this.getFullUri(api_name, params);
        var options = {
            headers: this.corsHeaders
        };
        return new Promise(function (resolve) {
            _this.http.get(api_uri, options).subscribe(function (data) {
                console.log(data);
                resolve(_this.baseResponseAdapter.adapt(data));
            }, function (err) {
                console.log(err);
                switch (err.status) {
                    case 0:
                        break;
                    case 404:
                        break;
                    default:
                        break;
                }
                err.status = 99;
                resolve(err);
            });
        });
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
