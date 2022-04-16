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
exports.ProjectDetailsComponent = void 0;
var core_1 = require("@angular/core");
var camapaign_form_component_1 = require("src/app/components/create/camapaign-form/camapaign-form.component");
var ProjectDetailsComponent = /** @class */ (function () {
    function ProjectDetailsComponent(getEntityService, router, loadingService, snackBar, auth, location, proApi, campApi, actived, dialog) {
        this.getEntityService = getEntityService;
        this.router = router;
        this.loadingService = loadingService;
        this.snackBar = snackBar;
        this.auth = auth;
        this.location = location;
        this.proApi = proApi;
        this.campApi = campApi;
        this.actived = actived;
        this.dialog = dialog;
        this.isAdmin = true;
        this.urlApi = '';
        this.urlLogo = '';
        this.urlCover = '';
    }
    ProjectDetailsComponent.prototype.ngOnInit = function () {
        this.getByID();
        this.check();
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    ProjectDetailsComponent.prototype.check = function () {
        var _a;
        this.user = this.auth.currentUserValue;
        if (((_a = this.user) === null || _a === void 0 ? void 0 : _a.role) === 'organization_manager') {
            this.isAdmin = false;
        }
    };
    ProjectDetailsComponent.prototype.getByID = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var id, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        id = this.actived.snapshot.paramMap.get('id');
                        _e = this;
                        return [4 /*yield*/, this.proApi.getByID("" + id)];
                    case 1:
                        _e.project = _f.sent();
                        this.loadingService.projectId.next("" + id);
                        if (this.project.resultCode == 610) {
                            this.isApproved = true;
                        }
                        this.urlLogo = (_b = (_a = this.project) === null || _a === void 0 ? void 0 : _a.logo) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
                        this.urlCover = (_d = (_c = this.project) === null || _c === void 0 ? void 0 : _c.cover) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjectDetailsComponent.prototype.openCampaignForm = function () {
        var _this = this;
        var dialogRef = this.dialog.open(camapaign_form_component_1.CamapaignFormComponent, {
            width: '700px',
            data: {
                title: 'Tạo chiến dịch'
            }
        });
        dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        this.loadingService.isLoading.next(true);
                        return [4 /*yield*/, this.campApi.create(data)];
                    case 1:
                        res = _a.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            this.loadingService.isLoading.next(false);
                            this.getEntityService.getByEntity('cam');
                            this.router.navigate(['/manager/manage-campaign']);
                            this.snackBar.showMessage(res.message, true);
                        }
                        else {
                            this.loadingService.isLoading.next(false);
                            this.snackBar.showMessage("" + (res === null || res === void 0 ? void 0 : res.message), false);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ProjectDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-project-details',
            templateUrl: './project-details.component.html',
            styleUrls: ['./project-details.component.scss']
        }),
        core_1.Injectable({ providedIn: 'root' })
    ], ProjectDetailsComponent);
    return ProjectDetailsComponent;
}());
exports.ProjectDetailsComponent = ProjectDetailsComponent;
