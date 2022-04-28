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
exports.CampaignsComponent = void 0;
var core_1 = require("@angular/core");
var CampaignsComponent = /** @class */ (function () {
    function CampaignsComponent(api, authApi) {
        this.api = api;
        this.authApi = authApi;
        this.campaigns = [];
        this.passData = [];
        this.oldData = [];
        this.isEmpty = false;
        this.isList = false;
    }
    CampaignsComponent.prototype.ngOnInit = function () {
        this.checkToGetData();
    };
    CampaignsComponent.prototype.ngOnDestroy = function () {
        localStorage.removeItem('reject');
        localStorage.removeItem('pending');
    };
    CampaignsComponent.prototype.handleTitle = function (e) {
        if (e == 'list') {
            this.isList = true;
        }
        else {
            this.isList = false;
        }
    };
    CampaignsComponent.prototype.changeViewGrid = function () {
        var _a;
        (_a = this.changeView) === null || _a === void 0 ? void 0 : _a.changeView(true);
    };
    CampaignsComponent.prototype.getData = function (e) {
        if (e == null || e.length <= 0) {
            this.noResultBySearch = true;
            this.campaigns = e;
        }
        else {
            this.campaigns = e;
            this.noResultBySearch = false;
        }
    };
    CampaignsComponent.prototype.checkToGetData = function (pending) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 1:
                        _a.campaigns = _b.sent();
                        this.passData = this.campaigns;
                        if (pending == 'pending') {
                            this.getAllCampaignsByStatus('pending');
                            localStorage.setItem('pending', 'true');
                        }
                        if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
                            && !localStorage.getItem('pending')) {
                            this.getAllCampaignsByStatus('approve');
                            localStorage.setItem('approve', 'true');
                        }
                        else {
                            if (localStorage.getItem('reject')) {
                                this.getAllCampaignsByStatus('reject');
                            }
                            else if (localStorage.getItem('approve')) {
                                this.getAllCampaignsByStatus('approve');
                            }
                            else if (localStorage.getItem('pending')) {
                                this.getAllCampaignsByStatus('pending');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CampaignsComponent.prototype.getAllCampaignsByStatus = function (status, pro) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var i, a, b, c, i, i;
            return __generator(this, function (_o) {
                this.user = this.authApi.currentUserValue;
                if (pro) {
                    this.campaigns = pro;
                }
                if (status) {
                    this.isList = false;
                    this.changeViewGrid();
                }
                switch (status) {
                    case 'approve':
                        this.isLoaded = true;
                        this.isRequest = false;
                        for (i = 0; i < this.campaigns.length; i++) {
                            this.campaigns[i].cover = (_b = (_a = this.campaigns[i]) === null || _a === void 0 ? void 0 : _a.cover) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
                            this.campaigns[i].org_logo = (_d = (_c = this.campaigns[i]) === null || _c === void 0 ? void 0 : _c.org_logo) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
                            switch (this.campaigns[i].type) {
                                case 'donation':
                                    this.campaigns[i].org_id = (this.campaigns[i].totalDonated / this.campaigns[i].target).toString();
                                    break;
                                case 'recruitment':
                                    this.campaigns[i].org_id = (this.campaigns[i].totalPaticipant / this.campaigns[i].target).toString();
                                    break;
                            }
                            a = Date.parse("" + this.campaigns[i].startDate);
                            b = Date.parse("" + this.campaigns[i].endDate);
                            c = Date.now();
                            // console.log((b - c) / (1000 * 60 * 60 * 24));
                        }
                        this.campaigns = this.campaigns.filter(function (x) {
                            return x.result_code == 710;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.result_code == 710; });
                        this.isEmpty = false;
                        if (this.campaigns == [] || this.campaigns.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                    case 'reject':
                        this.isLoaded = true;
                        this.isRequest = false;
                        for (i = 0; i < this.campaigns.length; i++) {
                            this.campaigns[i].cover = (_f = (_e = this.campaigns[i]) === null || _e === void 0 ? void 0 : _e.cover) === null || _f === void 0 ? void 0 : _f.replace(/\\/g, '\/');
                            this.campaigns[i].org_logo = (_h = (_g = this.campaigns[i]) === null || _g === void 0 ? void 0 : _g.org_logo) === null || _h === void 0 ? void 0 : _h.replace(/\\/g, '\/');
                        }
                        this.campaigns = this.campaigns.filter(function (x) {
                            return x.result_code == 711;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.result_code == 711; });
                        this.isEmpty = false;
                        if (this.campaigns == null || this.campaigns.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                    case 'pending':
                        this.isLoaded = true;
                        for (i = 0; i < this.campaigns.length; i++) {
                            this.campaigns[i].cover = (_k = (_j = this.campaigns[i]) === null || _j === void 0 ? void 0 : _j.cover) === null || _k === void 0 ? void 0 : _k.replace(/\\/g, '\/');
                            this.campaigns[i].org_logo = (_m = (_l = this.campaigns[i]) === null || _l === void 0 ? void 0 : _l.org_logo) === null || _m === void 0 ? void 0 : _m.replace(/\\/g, '\/');
                        }
                        this.campaigns = this.campaigns.filter(function (x) {
                            return x.result_code == 701;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.result_code == 701; });
                        if (this.authApi.currentUserValue.role == 'admin') {
                            this.isRequest = true;
                        }
                        else {
                            this.isRequest = false;
                        }
                        this.isEmpty = false;
                        if (this.campaigns == null || this.campaigns.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                }
                this.number = this.campaigns.length;
                return [2 /*return*/];
            });
        });
    };
    CampaignsComponent.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 1:
                        _a.campaigns = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('changeView')
    ], CampaignsComponent.prototype, "changeView");
    CampaignsComponent = __decorate([
        core_1.Component({
            selector: 'app-campaigns',
            templateUrl: './campaigns.component.html',
            styleUrls: ['./campaigns.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CampaignsComponent);
    return CampaignsComponent;
}());
exports.CampaignsComponent = CampaignsComponent;
