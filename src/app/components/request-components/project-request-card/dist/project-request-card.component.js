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
exports.ProjectRequestCardComponent = void 0;
var core_1 = require("@angular/core");
var ProjectRequestCardComponent = /** @class */ (function () {
    function ProjectRequestCardComponent(loadingApi, dialog, authApi, dialogConfirm) {
        this.loadingApi = loadingApi;
        this.dialog = dialog;
        this.authApi = authApi;
        this.dialogConfirm = dialogConfirm;
        this.isPro = '';
        this.isOrg = '';
        this.isCam = '';
    }
    ProjectRequestCardComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        this.check();
        this.urlApi = this.loadingApi.getApiGetLink.value;
        this.urlLogo = (_b = (_a = this.projects) === null || _a === void 0 ? void 0 : _a.organizationLogo) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
        this.urlCover = (_d = (_c = this.projects) === null || _c === void 0 ? void 0 : _c.cover) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
    };
    ProjectRequestCardComponent.prototype.viewDetails = function () {
    };
    ProjectRequestCardComponent.prototype.check = function () {
        if (this.organization) {
            this.isOrg = 'org';
        }
        else if (this.campaign) {
            this.isCam = 'cam';
        }
        else {
            this.isPro = 'pro';
        }
    };
    ProjectRequestCardComponent.prototype.approve = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log(this.isPro, this.isOrg, this.isCam);
                        return [4 /*yield*/, this.dialogConfirm.approve(((_a = this.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = this.projects) === null || _b === void 0 ? void 0 : _b.id) || ((_c = this.campaign) === null || _c === void 0 ? void 0 : _c.id), this.isPro || this.isOrg || this.isCam)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectRequestCardComponent.prototype.reject = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log(this.isPro, this.isOrg, this.isCam);
                        return [4 /*yield*/, this.dialogConfirm.reject(((_a = this.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = this.projects) === null || _b === void 0 ? void 0 : _b.id) || ((_c = this.campaign) === null || _c === void 0 ? void 0 : _c.id), this.isPro || this.isOrg || this.isCam)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], ProjectRequestCardComponent.prototype, "organization");
    __decorate([
        core_1.Input()
    ], ProjectRequestCardComponent.prototype, "projects");
    __decorate([
        core_1.Input()
    ], ProjectRequestCardComponent.prototype, "campaign");
    __decorate([
        core_1.Input()
    ], ProjectRequestCardComponent.prototype, "isRequest");
    ProjectRequestCardComponent = __decorate([
        core_1.Component({
            selector: 'app-project-request-card',
            templateUrl: './project-request-card.component.html',
            styleUrls: ['./project-request-card.component.scss']
        })
    ], ProjectRequestCardComponent);
    return ProjectRequestCardComponent;
}());
exports.ProjectRequestCardComponent = ProjectRequestCardComponent;
