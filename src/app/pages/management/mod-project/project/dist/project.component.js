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
exports.ProjectComponent = void 0;
var core_1 = require("@angular/core");
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(loadingService, api, authApi) {
        this.loadingService = loadingService;
        this.api = api;
        this.authApi = authApi;
        this.projects = [];
        this.passData = [];
        this.oldData = [];
        this.isRequest = false;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.checkToGetData();
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
    };
    ProjectComponent.prototype.getData = function (e) {
        if (e == null || e.length <= 0) {
            this.noResultBySearch = true;
            this.projects = e;
        }
        else {
            this.projects = e;
            this.noResultBySearch = false;
        }
    };
    ProjectComponent.prototype.checkToGetData = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 1:
                        _a.projects = _b.sent();
                        this.passData = this.projects;
                        if (status == 'pending') {
                            this.getAllProjectsByStatus('pending', this.projects);
                            localStorage.setItem('pending', 'true');
                        }
                        else if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
                            && !localStorage.getItem('pending')) {
                            this.getAllProjectsByStatus('approve');
                            localStorage.setItem('approve', 'true');
                        }
                        else {
                            if (localStorage.getItem('reject')) {
                                this.getAllProjectsByStatus('reject');
                            }
                            else if (localStorage.getItem('approve')) {
                                this.getAllProjectsByStatus('approve');
                            }
                            else if (localStorage.getItem('pending')) {
                                this.getAllProjectsByStatus('pending');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.getAllProjectsByStatus = function (status, pro) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function () {
            var i, i, i;
            return __generator(this, function (_u) {
                this.user = this.authApi.currentUserValue;
                if (pro) {
                    this.projects = pro;
                }
                switch (status) {
                    case 'approve':
                        this.isLoaded = true;
                        this.isRequest = false;
                        for (i = 0; i < this.projects.length; i++) {
                            this.projects[i].cover = (_b = (_a = this.projects[i]) === null || _a === void 0 ? void 0 : _a.cover) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
                            this.projects[i].logo = (_d = (_c = this.projects[i]) === null || _c === void 0 ? void 0 : _c.logo) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
                            this.projects[i].organizationLogo = (_f = (_e = this.projects[i]) === null || _e === void 0 ? void 0 : _e.organizationLogo) === null || _f === void 0 ? void 0 : _f.replace(/\\/g, '\/');
                        }
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode == 610;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.resultCode == 610; });
                        this.isEmpty = false;
                        if (this.projects == [] || this.projects.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                    case 'reject':
                        this.isLoaded = true;
                        this.isRequest = false;
                        for (i = 0; i < this.projects.length; i++) {
                            this.projects[i].cover = (_h = (_g = this.projects[i]) === null || _g === void 0 ? void 0 : _g.cover) === null || _h === void 0 ? void 0 : _h.replace(/\\/g, '\/');
                            this.projects[i].logo = (_k = (_j = this.projects[i]) === null || _j === void 0 ? void 0 : _j.logo) === null || _k === void 0 ? void 0 : _k.replace(/\\/g, '\/');
                            this.projects[i].organizationLogo = (_m = (_l = this.projects[i]) === null || _l === void 0 ? void 0 : _l.organizationLogo) === null || _m === void 0 ? void 0 : _m.replace(/\\/g, '\/');
                        }
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode == 611;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.resultCode == 611; });
                        this.isEmpty = false;
                        if (this.projects == null || this.projects.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                    case 'pending':
                        this.isLoaded = true;
                        for (i = 0; i < this.projects.length; i++) {
                            this.projects[i].cover = (_p = (_o = this.projects[i]) === null || _o === void 0 ? void 0 : _o.cover) === null || _p === void 0 ? void 0 : _p.replace(/\\/g, '\/');
                            this.projects[i].logo = (_r = (_q = this.projects[i]) === null || _q === void 0 ? void 0 : _q.logo) === null || _r === void 0 ? void 0 : _r.replace(/\\/g, '\/');
                            this.projects[i].organizationLogo = (_t = (_s = this.projects[i]) === null || _s === void 0 ? void 0 : _s.organizationLogo) === null || _t === void 0 ? void 0 : _t.replace(/\\/g, '\/');
                        }
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode == 601;
                        });
                        this.oldData = this.passData.filter(function (x) { return x.resultCode == 601; });
                        if (this.authApi.currentUserValue.role == 'admin') {
                            this.isRequest = true;
                        }
                        else {
                            this.isRequest = false;
                        }
                        this.isEmpty = false;
                        if (this.projects == null || this.projects.length <= 0) {
                            this.isEmpty = true;
                        }
                        break;
                }
                this.number = this.projects.length;
                return [2 /*return*/];
            });
        });
    };
    ProjectComponent.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 1:
                        _a.projects = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'app-project',
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
