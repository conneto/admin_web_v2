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
        this.isEmpty = false;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.check();
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    ProjectComponent.prototype.check = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var _k, i, _l, i;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        this.user = this.authApi.currentUserValue;
                        if (!(((_a = this.user) === null || _a === void 0 ? void 0 : _a.role) === 'organization_manager')) return [3 /*break*/, 2];
                        _k = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 1:
                        _k.projects = _m.sent();
                        for (i = 0; i < this.projects.length; i++) {
                            this.projects[i].cover = (_c = (_b = this.projects[i]) === null || _b === void 0 ? void 0 : _b.cover) === null || _c === void 0 ? void 0 : _c.replace(/\\/g, '\/');
                            this.projects[i].logo = (_e = (_d = this.projects[i]) === null || _d === void 0 ? void 0 : _d.logo) === null || _e === void 0 ? void 0 : _e.replace(/\\/g, '\/');
                        }
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode !== 611;
                        });
                        if (this.projects == [] || this.projects.length <= 0) {
                            this.isEmpty = true;
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        _l = this;
                        return [4 /*yield*/, this.api.getAll()];
                    case 3:
                        _l.projects = _m.sent();
                        for (i = 0; i < this.projects.length; i++) {
                            this.projects[i].cover = (_g = (_f = this.projects[i]) === null || _f === void 0 ? void 0 : _f.cover) === null || _g === void 0 ? void 0 : _g.replace(/\\/g, '\/');
                            this.projects[i].logo = (_j = (_h = this.projects[i]) === null || _h === void 0 ? void 0 : _h.logo) === null || _j === void 0 ? void 0 : _j.replace(/\\/g, '\/');
                        }
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode === 610;
                        });
                        if (this.projects == [] || this.projects.length <= 0) {
                            this.isEmpty = true;
                        }
                        _m.label = 4;
                    case 4: return [2 /*return*/];
                }
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
                        console.log(this.projects);
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
        })
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
