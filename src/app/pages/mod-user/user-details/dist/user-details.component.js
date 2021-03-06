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
exports.UserDetailsComponent = void 0;
var dialog_confirm_component_1 = require("./../../../components/dialog-confirm/dialog-confirm.component");
var core_1 = require("@angular/core");
var UserDetailsComponent = /** @class */ (function () {
    function UserDetailsComponent(utilService, activatedRoute, userService, loadingService, dialog, snackBar) {
        this.utilService = utilService;
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.loadingService = loadingService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.urlApi = "";
        this.campaign_participations = [];
        this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';
        this.urlApi = this.loadingService.getApiGetLink.value;
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        this.getUserDetails(this.userId || "");
        this.getCampaignParticipations(this.userId || "");
    };
    UserDetailsComponent.prototype.getUserDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getById(id)];
                    case 1:
                        _a.user = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDetailsComponent.prototype.getCampaignParticipations = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userService.getCampaignParticipations(id)];
                    case 1:
                        _a.campaign_participations = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDetailsComponent.prototype.getFirstCover = function (fullCover) {
        return fullCover.split('|')[0];
    };
    UserDetailsComponent.prototype.disableUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dialogRef;
            var _this = this;
            return __generator(this, function (_a) {
                dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
                    width: '360px',
                    data: {
                        button: '?????ng ??',
                        close: 'H???y',
                        message: 'B???n c?? ch???c ch???n mu???n kh??a ng?????i d??ng n??y?'
                    }
                });
                dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var obj, res;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!data) return [3 /*break*/, 2];
                                obj = {
                                    "object_id": (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
                                    "object_type": "activate_user",
                                    "status": "disable",
                                    "note": "Ng?????i d??ng vi ph???m"
                                };
                                return [4 /*yield*/, this.userService.activateUser(obj)];
                            case 1:
                                res = _b.sent();
                                if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                                    this.snackBar.showMessage('Kh??a t??i kho???n th??nh c??ng', true);
                                }
                                else {
                                    this.snackBar.showMessage('Kh??a t??i kho???n th???t b???i', false);
                                }
                                this.loadingService.isLoading.next(false);
                                window.location.reload();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    UserDetailsComponent.prototype.enableUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dialogRef;
            var _this = this;
            return __generator(this, function (_a) {
                dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
                    width: '360px',
                    data: {
                        button: '?????ng ??',
                        close: 'H???y',
                        message: 'B???n c?? ch???c ch???n mu???n k??ch ho???t ng?????i d??ng n??y?'
                    }
                });
                dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var obj, res;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!data) return [3 /*break*/, 2];
                                obj = {
                                    "object_id": (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
                                    "object_type": "activate_user",
                                    "status": "enable",
                                    "note": ""
                                };
                                return [4 /*yield*/, this.userService.activateUser(obj)];
                            case 1:
                                res = _b.sent();
                                if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                                    this.snackBar.showMessage('K??ch ho???t th??nh c??ng', true);
                                }
                                else {
                                    this.snackBar.showMessage('K??ch ho???t th???t b???i', false);
                                }
                                this.loadingService.isLoading.next(false);
                                window.location.reload();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    UserDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-user-details',
            templateUrl: './user-details.component.html',
            styleUrls: ['./user-details.component.scss']
        })
    ], UserDetailsComponent);
    return UserDetailsComponent;
}());
exports.UserDetailsComponent = UserDetailsComponent;
