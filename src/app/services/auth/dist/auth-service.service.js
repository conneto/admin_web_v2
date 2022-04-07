"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthServiceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ts_md5_1 = require("ts-md5");
var AuthServiceService = /** @class */ (function () {
    function AuthServiceService(loadingService, snackBar, apiService, userRequest, userResponse, registerRequest) {
        this.loadingService = loadingService;
        this.snackBar = snackBar;
        this.apiService = apiService;
        this.userRequest = userRequest;
        this.userResponse = userResponse;
        this.registerRequest = registerRequest;
        this.curUserSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('USER_WEB')));
        this.curUser = this.curUserSubject.asObservable();
    }
    AuthServiceService_1 = AuthServiceService;
    Object.defineProperty(AuthServiceService.prototype, "currentUserValue", {
        get: function () {
            return this.curUserSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AuthServiceService.prototype.login = function (isSaveUser, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var md5, res, userLoginResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        md5 = new ts_md5_1.Md5();
                        return [4 /*yield*/, this.apiService.post(AuthServiceService_1.ACCOUNTS + AuthServiceService_1.LOGIN, this.userRequest.adapt({
                                username: username,
                                // password: password,
                                password: md5.appendStr(password.concat(AuthServiceService_1.KEY)).end()
                            }))];
                    case 1:
                        res = _a.sent();
                        if (res.resultCode == 0) {
                            this.loadingService.isLoading.next(false);
                            this.snackBar.showMessage("\u0110\u0103ng Nh\u1EADp " + res.resultMessage, true);
                            userLoginResponse = this.userResponse.adapt(res.data);
                            localStorage.setItem('USER_WEB', JSON.stringify(userLoginResponse));
                            localStorage.setItem('USER_TOKEN', userLoginResponse.token);
                            this.curUserSubject.next(userLoginResponse);
                        }
                        else if (res.resultCode == 6) {
                            this.loadingService.isLoading.next(false);
                            this.snackBar.showMessage(res.resultMessage, false);
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AuthServiceService.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var md5, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        md5 = new ts_md5_1.Md5();
                        return [4 /*yield*/, this.apiService.post(AuthServiceService_1.ACCOUNTS + AuthServiceService_1.REGISTER, data)];
                    case 1:
                        res = _a.sent();
                        if (res.resultCode != 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AuthServiceService.prototype.logout = function () {
        localStorage.removeItem('USER_WEB');
        localStorage.removeItem('USER_TOKEN');
        this.curUserSubject.next(null);
    };
    AuthServiceService.prototype.updateRequestByAdmin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post(AuthServiceService_1.ADMIN + '/' + AuthServiceService_1.APPROVEMENTS, data)];
                    case 1:
                        res = _a.sent();
                        if (res.resultCode != 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    var AuthServiceService_1;
    AuthServiceService.ACCOUNTS = 'accounts';
    AuthServiceService.LOGIN = '/login';
    AuthServiceService.REGISTER = '/register';
    AuthServiceService.KEY = '_CoNn3t0Se(R3T';
    AuthServiceService.ROLE = 'organization_manager';
    AuthServiceService.ADMIN = 'admins';
    AuthServiceService.APPROVEMENTS = 'approvements';
    AuthServiceService.APPROVE = 'approve';
    AuthServiceService.REJECT = 'reject';
    AuthServiceService.PROJECT = 'project';
    AuthServiceService.ORGANIZATION = 'organization';
    AuthServiceService.CAMPAIGN = 'campaign';
    AuthServiceService = AuthServiceService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthServiceService);
    return AuthServiceService;
}());
exports.AuthServiceService = AuthServiceService;
