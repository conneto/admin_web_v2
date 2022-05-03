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
exports.TableCampaignParticipationsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var dialog_confirm_component_1 = require("../dialog-confirm/dialog-confirm.component");
var TableCampaignParticipationsComponent = /** @class */ (function () {
    function TableCampaignParticipationsComponent(camApi, snackBar, api, dialog, loadingService, utilService) {
        this.camApi = camApi;
        this.snackBar = snackBar;
        this.api = api;
        this.dialog = dialog;
        this.loadingService = loadingService;
        this.utilService = utilService;
        this.dataSource = new table_1.MatTableDataSource;
    }
    TableCampaignParticipationsComponent.prototype.ngOnInit = function () {
        var _a;
        if (this.api.currentUserValue.role_id == 'admin') {
            this.isAdmin = true;
        }
        else {
            this.isAdmin = false;
        }
        switch (this.type) {
            case "donation":
                this.displayColumns = ['no', "name", "phone", 'total', 'payment_method_name', 'participate_date', "participate_message", "status"];
                break;
            case "recruitment":
                this.displayColumns = ['no', "name", "phone", 'participate_date', "participate_message", "participate_info", "status", 'action'];
                break;
        }
        for (var i = 0; i < ((_a = this.volunteer) === null || _a === void 0 ? void 0 : _a.length); i++) {
            Object.assign(this.volunteer[i], { no: i + 1 });
        }
        this.dataSource = new table_1.MatTableDataSource(this.volunteer);
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    TableCampaignParticipationsComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    TableCampaignParticipationsComponent.prototype.approve = function (e, cam_id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
            width: '360px',
            data: {
                button: "Đồng ý",
                close: "Suy nghĩ lại",
                message: "Bạn có chắc chắn muốn chấp nhận yêu cầu tham gia của tình nguyện viên này không?",
                volunteer: true
            }
        });
        dialogRef.afterClosed().subscribe(function (x) { return __awaiter(_this, void 0, void 0, function () {
            var data1, res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!x) return [3 /*break*/, 4];
                        this.loadingService.isLoading.next(true);
                        data1 = {
                            object_id: e,
                            object_type: 'volunteer',
                            status: 'approve',
                            note: x
                        };
                        console.log(data1);
                        return [4 /*yield*/, this.api.updateRequestByManager(data1)];
                    case 1:
                        res = _b.sent();
                        if (!(res.status == 0)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.camApi.getParticipations("" + cam_id)];
                    case 2:
                        _a.volunteer = _b.sent();
                        window.location.reload();
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("Chấp nhận thành công !", true);
                        return [3 /*break*/, 4];
                    case 3:
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("" + res.message, false);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    TableCampaignParticipationsComponent.prototype.reject = function (e, cam_id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
            width: '360px',
            data: {
                button: "Đồng ý",
                close: "Suy nghĩ lại",
                message: "Bạn có chắc chắn muốn từ chối yêu cầu tham gia của tình nguyện viên này không?",
                reason: true
            }
        });
        dialogRef.afterClosed().subscribe(function (x) { return __awaiter(_this, void 0, void 0, function () {
            var data1, res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!x) return [3 /*break*/, 4];
                        this.loadingService.isLoading.next(true);
                        data1 = {
                            object_id: e,
                            object_type: 'volunteer',
                            status: 'reject',
                            note: x
                        };
                        console.log(data1);
                        return [4 /*yield*/, this.api.updateRequestByManager(data1)];
                    case 1:
                        res = _b.sent();
                        if (!(res.status == 0)) return [3 /*break*/, 3];
                        window.location.reload();
                        _a = this;
                        return [4 /*yield*/, this.camApi.getParticipations("" + cam_id)];
                    case 2:
                        _a.volunteer = _b.sent();
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("Từ chối thành công !", true);
                        return [3 /*break*/, 4];
                    case 3:
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("" + res.message, false);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    TableCampaignParticipationsComponent.prototype.check = function (e, cam_id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
            width: '360px',
            data: {
                button: "Đồng ý",
                close: "Suy nghĩ lại",
                message: "Bạn có chắc chắn muốn từ chối yêu cầu tham gia của tình nguyện viên này không?"
            }
        });
        dialogRef.afterClosed().subscribe(function (x) { return __awaiter(_this, void 0, void 0, function () {
            var data1, res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!x) return [3 /*break*/, 4];
                        this.loadingService.isLoading.next(true);
                        data1 = {
                            object_id: e,
                            object_type: 'volunteer',
                            status: 'reject',
                            note: 'Reject this'
                        };
                        console.log(data1);
                        return [4 /*yield*/, this.api.updateRequestByManager(data1)];
                    case 1:
                        res = _b.sent();
                        if (!(res.status == 0)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.camApi.getParticipations("" + cam_id)];
                    case 2:
                        _a.volunteer = _b.sent();
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("Từ chối thành công !", true);
                        return [3 /*break*/, 4];
                    case 3:
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage("" + res.message, false);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    __decorate([
        core_1.Input()
    ], TableCampaignParticipationsComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], TableCampaignParticipationsComponent.prototype, "volunteer");
    __decorate([
        core_1.Input()
    ], TableCampaignParticipationsComponent.prototype, "type");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], TableCampaignParticipationsComponent.prototype, "paginator");
    TableCampaignParticipationsComponent = __decorate([
        core_1.Component({
            selector: 'app-table-campaign-participations',
            templateUrl: './table-campaign-participations.component.html',
            styleUrls: ['./table-campaign-participations.component.scss']
        })
    ], TableCampaignParticipationsComponent);
    return TableCampaignParticipationsComponent;
}());
exports.TableCampaignParticipationsComponent = TableCampaignParticipationsComponent;
