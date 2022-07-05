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
exports.OrganizationService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var constant_1 = require("src/app/constant/constant");
var OrganizationService = /** @class */ (function () {
    function OrganizationService(campaignAdapter, projectAdapter, apiService, adapter, authService) {
        this.campaignAdapter = campaignAdapter;
        this.projectAdapter = projectAdapter;
        this.apiService = apiService;
        this.adapter = adapter;
        this.authService = authService;
        this.user = this.authService.currentUserValue;
    }
    OrganizationService.prototype.getAll = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(constant_1.Constant.ORGANIZATIONS)];
                    case 1:
                        res = _b.sent();
                        res.data = (_a = res.data) === null || _a === void 0 ? void 0 : _a.map(function (item) { return _this.adapter.adapt(item); });
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    OrganizationService.prototype.getAllByObservable = function () {
        return this.apiService.getByObservable(constant_1.Constant.ORGANIZATIONS);
    };
    OrganizationService.prototype.getProjectsByOrgId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(constant_1.Constant.ORGANIZATIONS + "/" + id + "/" + constant_1.Constant.PROJECTS)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            res.data = res.data.map(function (item) {
                                return _this.projectAdapter.adapt(item);
                            });
                        }
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    OrganizationService.prototype.getCampaignsByOrgId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(constant_1.Constant.ORGANIZATIONS + "/" + id + "/" + constant_1.Constant.CAMPAIGNS)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            res.data = res.data.map(function (item) {
                                return _this.campaignAdapter.adapt(item);
                            });
                        }
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    OrganizationService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.get(constant_1.Constant.ORGANIZATIONS + "/" + id)];
                    case 1:
                        res = _a.sent();
                        res.data = this.adapter.adapt(res.data);
                        return [2 /*return*/, res.data || []];
                }
            });
        });
    };
    OrganizationService.prototype.getIdByObservable = function (id) {
        var _this = this;
        return this.apiService.getByObservable(constant_1.Constant.ORGANIZATIONS + "/" + id).pipe(operators_1.map(function (data) {
            return _this.adapter.adapt(data.data);
        }));
    };
    OrganizationService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post("" + constant_1.Constant.ORGANIZATIONS, data)];
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
    OrganizationService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService["delete"](constant_1.Constant.ORGANIZATIONS + "/" + id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    OrganizationService.prototype.createById = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post(constant_1.Constant.ORGANIZATIONS + "/" + id, data)];
                    case 1:
                        res = _a.sent();
                        if (res.status == 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    OrganizationService.prototype.updateById = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.put(constant_1.Constant.ORGANIZATIONS + "/" + id, data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    OrganizationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationService);
    return OrganizationService;
}());
exports.OrganizationService = OrganizationService;
