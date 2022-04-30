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
var environment_1 = require("src/environments/environment");
var ApiService = /** @class */ (function () {
    function ApiService(http, baseResponseAdapter, loadingService) {
        this.http = http;
        this.baseResponseAdapter = baseResponseAdapter;
        this.loadingService = loadingService;
        this.fetchUri = environment_1.environment.api_fetch;
        this.postUri = environment_1.environment.api_core;
        this.corsHeaders = new http_1.HttpHeaders();
        this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Origin', '*');
        this.corsHeaders = this.corsHeaders.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }
    ApiService.prototype.getFetchUri = function (api_name, params) {
        var url = this.fetchUri + '/' + api_name;
        if (typeof params != 'undefined') {
            var array = [];
            for (var prop in params) {
                array.push(prop + '=' + params[prop]);
            }
            url += '?' + array.join('&');
        }
        return url;
    };
    ApiService.prototype.getPostUri = function (api_name, params) {
        var url = this.postUri + '/' + api_name;
        if (typeof params != 'undefined') {
            var array = [];
            for (var prop in params) {
                array.push(prop + '=' + params[prop]);
            }
            url += '?' + array.join('&');
        }
        return url;
    };
    ApiService.prototype.post = function (api_name, body, params, parse_json) {
        var _this = this;
        var api_uri = '';
        if (params) {
            api_uri = this.getPostUri(api_name, body);
        }
        else {
            api_uri = this.getPostUri(api_name);
        }
        console.log(localStorage.getItem('USER_TOKEN'));
        if (localStorage.getItem('USER_TOKEN')) {
            this.corsHeaders = this.corsHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('USER_TOKEN'));
        }
        var options = {
            headers: this.corsHeaders
        };
        return new Promise(function (resolve) {
            _this.http.post(api_uri, body, options).subscribe(function (data) {
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
    ApiService.prototype.get = function (api_name, params) {
        var _this = this;
        this.loadingService.getApiGetLink.next(this.fetchUri);
        var api_uri = this.getFetchUri(api_name, params);
        if (localStorage.getItem('USER_TOKEN')) {
            this.corsHeaders = this.corsHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('USER_TOKEN'));
        }
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
    ApiService.prototype["delete"] = function (api_name, params) {
        var _this = this;
        var api_uri = this.getPostUri(api_name, params);
        if (localStorage.getItem('USER_TOKEN')) {
            this.corsHeaders = this.corsHeaders.set('Authorization', "Bearer " + localStorage.getItem('USER_TOKEN'));
        }
        var options = {
            headers: this.corsHeaders
        };
        return new Promise(function (resolve) {
            console.log(api_uri, options);
            _this.http["delete"](api_uri, options).subscribe(function (data) {
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
    ApiService.prototype.put = function (api_name, body, params, parse_json) {
        var _this = this;
        var api_uri = '';
        if (params) {
            api_uri = this.getPostUri(api_name, body);
        }
        else {
            api_uri = this.getPostUri(api_name);
        }
        if (localStorage.getItem('USER_TOKEN')) {
            this.corsHeaders = this.corsHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('USER_TOKEN'));
        }
        if (localStorage.getItem('USER_TOKEN')) {
            this.corsHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('USER_TOKEN'));
        }
        var options = {
            headers: this.corsHeaders
        };
        return new Promise(function (resolve) {
            _this.http.put(api_uri, body, options).subscribe(function (data) {
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
