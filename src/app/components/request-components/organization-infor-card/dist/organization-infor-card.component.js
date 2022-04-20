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
exports.OrganizationInforCardComponent = void 0;
var core_1 = require("@angular/core");
var auth_service_service_1 = require("src/app/services/auth/auth-service.service");
var dialog_confirm_component_1 = require("../../dialog-confirm/dialog-confirm.component");
var OrganizationInforCardComponent = /** @class */ (function () {
    function OrganizationInforCardComponent(pro, cam, orga, loadingApi, proApi, camApi, location, snackBar, router, dialog, authApi, org) {
        this.pro = pro;
        this.cam = cam;
        this.orga = orga;
        this.loadingApi = loadingApi;
        this.proApi = proApi;
        this.camApi = camApi;
        this.location = location;
        this.snackBar = snackBar;
        this.router = router;
        this.dialog = dialog;
        this.authApi = authApi;
        this.org = org;
    }
    OrganizationInforCardComponent.prototype.ngOnInit = function () {
        var _a, _b;
        this.urlApi = this.loadingApi.getApiGetLink.value;
        this.urlLogo = (_b = (_a = this.organizations) === null || _a === void 0 ? void 0 : _a.logo) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
        console.log(this.urlLogo);
    };
    OrganizationInforCardComponent.prototype.viewDetails = function (id) {
        this.router.navigate(['admin/organization-request/organization-request-detail/:' + id]);
    };
    OrganizationInforCardComponent.prototype.approve = function (id, checkType) {
        return __awaiter(this, void 0, void 0, function () {
            var diaglogRef;
            var _this = this;
            return __generator(this, function (_a) {
                diaglogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
                    width: '300px',
                    data: {
                        button: 'Chấp nhận',
                        message: auth_service_service_1.AuthServiceService.APPROVE
                    }
                });
                diaglogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var data1, res;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!data) return [3 /*break*/, 2];
                                this.loadingApi.isLoading.next(true);
                                data1 = {
                                    object_id: ((_a = this.organizations) === null || _a === void 0 ? void 0 : _a.id) || id,
                                    object_type: checkType == 'org' ? auth_service_service_1.AuthServiceService.ORGANIZATION
                                        : checkType == 'cam' ? auth_service_service_1.AuthServiceService.CAMPAIGN : checkType == 'pro' ? auth_service_service_1.AuthServiceService.PROJECT : auth_service_service_1.AuthServiceService.ORGANIZATION,
                                    status: 'approve',
                                    note: 'Approve this'
                                };
                                return [4 /*yield*/, this.authApi.updateRequestByAdmin(data1)];
                            case 1:
                                res = _b.sent();
                                if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                                    this.loadingApi.isLoading.next(false);
                                    this.snackBar.showMessage("Chấp nhận thành công !", true);
                                    if (checkType == 'org' || this.checkType == 'org') {
                                        this.orga.checkToGetData('pending');
                                    }
                                    else if (checkType == 'pro' || this.checkType == 'pro') {
                                        this.pro.checkToGetData('pending');
                                    }
                                    else {
                                        this.cam.checkToGetData('pending');
                                    }
                                }
                                else {
                                    this.loadingApi.isLoading.next(false);
                                    this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
                                }
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    OrganizationInforCardComponent.prototype.reject = function (id, checkType) {
        return __awaiter(this, void 0, void 0, function () {
            var diaglogRef;
            var _this = this;
            return __generator(this, function (_a) {
                diaglogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
                    width: '300px',
                    data: {
                        button: 'Từ chối',
                        message: auth_service_service_1.AuthServiceService.REJECT
                    }
                });
                diaglogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var data1, res;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!data) return [3 /*break*/, 2];
                                this.loadingApi.isLoading.next(true);
                                data1 = {
                                    object_id: ((_a = this.organizations) === null || _a === void 0 ? void 0 : _a.id) || id,
                                    object_type: checkType == 'org' ? auth_service_service_1.AuthServiceService.ORGANIZATION
                                        : checkType == 'cam' ? auth_service_service_1.AuthServiceService.CAMPAIGN : checkType == 'pro' ? auth_service_service_1.AuthServiceService.PROJECT : auth_service_service_1.AuthServiceService.ORGANIZATION,
                                    status: 'reject',
                                    note: 'Reject this'
                                };
                                return [4 /*yield*/, this.authApi.updateRequestByAdmin(data1)];
                            case 1:
                                res = _b.sent();
                                this.loadingApi.isLoading.next(true);
                                if ((res === null || res === void 0 ? void 0 : res.status) === 0) {
                                    this.loadingApi.isLoading.next(false);
                                    if (checkType == 'org' || this.checkType == 'org') {
                                        this.orga.checkToGetData('pending');
                                    }
                                    else if (checkType == 'pro' || this.checkType == 'pro') {
                                        this.pro.checkToGetData('pending');
                                    }
                                    else if (checkType == 'cam' || this.checkType == 'cam') {
                                        this.cam.checkToGetData('pending');
                                    }
                                    this.snackBar.showMessage("Từ chối thành công", true);
                                }
                                else {
                                    this.loadingApi.isLoading.next(false);
                                    this.snackBar.showMessage("Lỗi.Xin hãy thử lại", false);
                                }
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.Input()
    ], OrganizationInforCardComponent.prototype, "organizations");
    __decorate([
        core_1.Input()
    ], OrganizationInforCardComponent.prototype, "checkType");
    OrganizationInforCardComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-infor-card',
            templateUrl: './organization-infor-card.component.html',
            styleUrls: ['./organization-infor-card.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationInforCardComponent);
    return OrganizationInforCardComponent;
}());
exports.OrganizationInforCardComponent = OrganizationInforCardComponent;
