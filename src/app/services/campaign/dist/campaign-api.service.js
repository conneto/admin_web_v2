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
exports.CampaignApiService = void 0;
var core_1 = require("@angular/core");
var CampaignApiService = /** @class */ (function () {
    function CampaignApiService(apiService, campaignAdap) {
        this.apiService = apiService;
        this.campaignAdap = campaignAdap;
    }
    CampaignApiService_1 = CampaignApiService;
    CampaignApiService.prototype.getAll = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(CampaignApiService_1.CAMPAIGNS)];
                    case 1:
                        res = _b.sent();
                        res.data = (_a = res.data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                            return _this.campaignAdap.adapt(item);
                        });
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    CampaignApiService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(CampaignApiService_1.CAMPAIGNS + "/" + id)];
                    case 1:
                        res = _a.sent();
                        res.data = this.campaignAdap.adapt(res.data);
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    CampaignApiService.prototype.createById = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        return [4 /*yield*/, this.apiService.post(CampaignApiService_1.CAMPAIGNS + "/" + id, data)];
                    case 1:
                        res = _a.sent();
                        if (res.status != 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    CampaignApiService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post("" + CampaignApiService_1.CAMPAIGNS, data)];
                    case 1:
                        res = _a.sent();
                        if (res.status != 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    CampaignApiService.prototype.uploadCashFlow = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post(CampaignApiService_1.CAMPAIGNS + "/" + id + "/" + CampaignApiService_1.DONATION_DOCUMENTS + "/" + CampaignApiService_1.CASHFLOW_DETAILS, data)];
                    case 1:
                        res = _a.sent();
                        if (res.status != 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    CampaignApiService.prototype.uploadPdf = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post(CampaignApiService_1.CAMPAIGNS + "/" + id + "/" + CampaignApiService_1.DONATION_DOCUMENTS, data)];
                    case 1:
                        res = _a.sent();
                        if (res.status != 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    CampaignApiService.prototype.getCashFlow = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(CampaignApiService_1.CAMPAIGNS + "/" + id + "/" + CampaignApiService_1.DONATION_DOCUMENTS + "/" + CampaignApiService_1.CASHFLOW_DETAILS)];
                    case 1:
                        res = _a.sent();
                        res.data = this.campaignAdap.adapt(res.data);
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    CampaignApiService.prototype.getParticipations = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id);
                        return [4 /*yield*/, this.apiService.get(CampaignApiService_1.CAMPAIGNS + "/" + id + "/" + CampaignApiService_1.CAMPAIGN_PARTICIPATIONS)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    CampaignApiService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService["delete"](CampaignApiService_1.CAMPAIGNS + "/" + id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    var CampaignApiService_1;
    CampaignApiService.CAMPAIGNS = 'campaigns';
    CampaignApiService.DONATION_DOCUMENTS = 'donation_documents';
    CampaignApiService.CASHFLOW_DETAILS = 'cashflow_details';
    CampaignApiService.CAMPAIGN_PARTICIPATIONS = 'campaign_participations';
    CampaignApiService = CampaignApiService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CampaignApiService);
    return CampaignApiService;
}());
exports.CampaignApiService = CampaignApiService;
