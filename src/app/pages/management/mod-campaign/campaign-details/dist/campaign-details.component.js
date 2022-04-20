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
exports.CampaignDetailsComponent = void 0;
var core_1 = require("@angular/core");
var CampaignDetailsComponent = /** @class */ (function () {
    function CampaignDetailsComponent(loadingService, location, activated, campaignApi) {
        this.loadingService = loadingService;
        this.location = location;
        this.activated = activated;
        this.campaignApi = campaignApi;
        this.urlApi = this.loadingService.getApiGetLink.value;
    }
    CampaignDetailsComponent.prototype.ngOnInit = function () {
        this.getByID();
        this.isInformation = true;
    };
    CampaignDetailsComponent.prototype.getByID = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var id, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        id = this.activated.snapshot.paramMap.get('id');
                        _h = this;
                        return [4 /*yield*/, this.campaignApi.getById("" + id)];
                    case 1:
                        _h.campaign = _j.sent();
                        this.urlLogo = (_b = (_a = this.campaign) === null || _a === void 0 ? void 0 : _a.org_logo) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
                        this.urlCover = (_d = (_c = this.campaign) === null || _c === void 0 ? void 0 : _c.cover) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
                        this.urlProjectLogo = (_f = (_e = this.campaign) === null || _e === void 0 ? void 0 : _e.pro_logo) === null || _f === void 0 ? void 0 : _f.replace(/\\/g, '\/');
                        switch ((_g = this.campaign) === null || _g === void 0 ? void 0 : _g.type) {
                            case 'donation':
                                this.campaign.type = 'Quyên Góp';
                                this.campaign.org_id = (this.campaign.totalDonated / this.campaign.target).toString();
                                break;
                            case 'recruitment':
                                this.campaign.type = 'Thiện Nguyện';
                                this.campaign.org_id = (this.campaign.totalPaticipant / this.campaign.target).toString();
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CampaignDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    CampaignDetailsComponent.prototype.getTab = function (id) {
        switch (id) {
            case 'infor':
                this.isInformation = true;
                break;
            case 'doc':
                this.isInformation = false;
                break;
        }
    };
    CampaignDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-details',
            templateUrl: './campaign-details.component.html',
            styleUrls: ['./campaign-details.component.scss']
        })
    ], CampaignDetailsComponent);
    return CampaignDetailsComponent;
}());
exports.CampaignDetailsComponent = CampaignDetailsComponent;
