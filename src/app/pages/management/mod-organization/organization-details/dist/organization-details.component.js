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
exports.OrganizationDetailsComponent = void 0;
var core_1 = require("@angular/core");
var project_form_component_1 = require("src/app/components/create/project-form/project-form.component");
var OrganizationDetailsComponent = /** @class */ (function () {
    function OrganizationDetailsComponent(pro, org, usersCom, getEntityService, router, loadingService, snackBar, auth, dialog, route, proApi, location, organizationService, orgComponent) {
        this.pro = pro;
        this.org = org;
        this.usersCom = usersCom;
        this.getEntityService = getEntityService;
        this.router = router;
        this.loadingService = loadingService;
        this.snackBar = snackBar;
        this.auth = auth;
        this.dialog = dialog;
        this.route = route;
        this.proApi = proApi;
        this.location = location;
        this.organizationService = organizationService;
        this.orgComponent = orgComponent;
        this.users = [];
        this.isAdmin = true;
        this.urlApi = this.loadingService.getApiGetLink.value;
        this.projects = [];
        this.projectsCopy = [];
        this.campaignsCopy = [];
        this.campaigns = [];
        this.isGetPro = false;
        this.isGetCam = false;
    }
    OrganizationDetailsComponent.prototype.ngOnInit = function () {
        this.getValueFromRoute();
        this.check();
        this.isInformation = true;
    };
    OrganizationDetailsComponent.prototype.check = function () {
        var _a;
        this.user = this.auth.currentUserValue;
        if (((_a = this.user) === null || _a === void 0 ? void 0 : _a.role_id) == 'organization_manager') {
            this.isAdmin = false;
        }
    };
    OrganizationDetailsComponent.prototype.getValueFromRoute = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var id, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = this.route.snapshot.paramMap.get('id');
                        _d = this;
                        return [4 /*yield*/, this.organizationService.getById("" + id)];
                    case 1:
                        _d.organization = _e.sent();
                        if (((_a = this.organization) === null || _a === void 0 ? void 0 : _a.result_code) == 510 || ((_b = this.organization) === null || _b === void 0 ? void 0 : _b.result_code) == 531) {
                            this.isApproved = true;
                        }
                        this.loadingService.getOrganizationId.next("" + id);
                        switch ((_c = this.organization) === null || _c === void 0 ? void 0 : _c.type) {
                            case 'ngo':
                                this.organization.type = 'T??? ch???c phi ch??nh ph???';
                                break;
                            case 'npo':
                                this.organization.type = 'T??? ch???c phi l???i nhu???n';
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrganizationDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    OrganizationDetailsComponent.prototype.getTab = function (id) {
        switch (id) {
            case 'infor':
                this.isInformation = true;
                this.isCampaigns = false;
                this.isProjects = false;
                break;
            case 'pro':
                if (this.isGetPro == false) {
                    this.getProjects();
                    this.isGetPro = true;
                }
                this.isProjects = true;
                this.isInformation = false;
                this.isCampaigns = false;
                break;
            case 'cam':
                if (this.isGetCam == false) {
                    this.getCampaigns();
                    this.isGetCam = true;
                }
                this.isCampaigns = true;
                this.isInformation = false;
                this.isProjects = false;
                break;
        }
    };
    OrganizationDetailsComponent.prototype.getCampaigns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.organizationService.getCampaignsByOrgId("" + this.route.snapshot.paramMap.get('id'))];
                    case 1:
                        _a.campaignsCopy = _b.sent();
                        this.campaigns = this.campaignsCopy;
                        if (this.campaigns) {
                            this.passDataCampaigns = this.campaignsCopy;
                            for (i = 0; i < this.campaigns.length; i++) {
                                switch (this.campaigns[i].type) {
                                    case 'donation':
                                        Object.assign(this.campaigns[i], {
                                            value: (this.campaigns[i].total_donated / this.campaigns[i].target_number).toString()
                                        });
                                        break;
                                    case 'recruitment':
                                        Object.assign(this.campaigns[i], {
                                            value: (this.campaigns[i].total_participant / this.campaigns[i].target_number).toString()
                                        });
                                        break;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrganizationDetailsComponent.prototype.getProjects = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, i;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _g = this;
                        return [4 /*yield*/, this.organizationService.getProjectsByOrgId("" + this.route.snapshot.paramMap.get('id'))];
                    case 1:
                        _g.projectsCopy = _h.sent();
                        this.projects = this.projectsCopy;
                        if (this.projects) {
                            for (i = 0; i < this.projects.length; i++) {
                                {
                                    this.projects[i].cover = (_b = (_a = this.projects[i]) === null || _a === void 0 ? void 0 : _a.cover) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '/');
                                    this.projects[i].logo = (_d = (_c = this.projects[i]) === null || _c === void 0 ? void 0 : _c.logo) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '/');
                                    this.projects[i].organization_logo = (_f = (_e = this.projects[i]) === null || _e === void 0 ? void 0 : _e.organization_logo) === null || _f === void 0 ? void 0 : _f.replace(/\\/g, '/');
                                }
                            }
                            this.passDataProjects = this.projectsCopy;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(OrganizationDetailsComponent.prototype, "getId", {
        get: function () {
            this.getValueFromRoute();
            return this.route.snapshot.paramMap.get('id');
        },
        enumerable: false,
        configurable: true
    });
    OrganizationDetailsComponent.prototype.openProjectForm = function () {
        var _this = this;
        var dialogRef = this.dialog.open(project_form_component_1.ProjectFormComponent, {
            width: '768px',
            data: {
                title: 'T???o d??? ??n'
            }
        });
        dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        this.loadingService.isLoading.next(true);
                        return [4 /*yield*/, this.proApi.createProject(data)];
                    case 1:
                        res = _a.sent();
                        if (res.status == 0) {
                            this.loadingService.isLoading.next(false);
                            this.snackBar.showMessage('T???o d??? ??n th??nh c??ng.Ch??? ph?? duy???t t??? ban qu???n tr???', true);
                            this.router.navigate(['/manager/manage-project']);
                            this.pro.checkToGetData('pending');
                        }
                        else {
                            this.dialog.open(project_form_component_1.ProjectFormComponent, {
                                width: '768px',
                                data: {
                                    title: 'T???o d??? ??n'
                                }
                            });
                            this.loadingService.isLoading.next(false);
                            this.snackBar.showMessage(res.message, false);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    OrganizationDetailsComponent.prototype.getData = function (e) {
        if (e == null || e.length <= 0) {
            if (this.isProjects) {
                this.noResultBySearch = true;
                this.projects = e;
            }
            else {
                this.noResultBySearch = true;
                this.campaigns = e;
            }
        }
        else {
            if (this.isProjects) {
                this.noResultBySearch = false;
                this.projects = e;
            }
            else {
                this.noResultBySearch = false;
                this.campaigns = e;
            }
        }
    };
    OrganizationDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-details',
            templateUrl: './organization-details.component.html',
            styleUrls: ['./organization-details.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationDetailsComponent);
    return OrganizationDetailsComponent;
}());
exports.OrganizationDetailsComponent = OrganizationDetailsComponent;
