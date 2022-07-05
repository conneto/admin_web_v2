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
var project_form_component_1 = require("src/app/components/create/project-form/project-form.component");
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(apiService, organizationService, router, dialog, snackbar, loadingService, projectService, authApi) {
        this.apiService = apiService;
        this.organizationService = organizationService;
        this.router = router;
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.loadingService = loadingService;
        this.projectService = projectService;
        this.authApi = authApi;
        this.projects = [];
        this.passData = [];
        this.oldData = [];
        this.isRequest = false;
        this.isList = false;
        this.organization = [];
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.checkToGetData();
        this.urlApi = this.loadingService.getApiGetLink.value;
        if (this.authApi.currentUserValue.role_id == 'admin') {
            this.isAdmin = true;
        }
        else {
            this.isAdmin = false;
        }
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
    };
    ProjectComponent.prototype.showMore = function () {
        var _this = this;
        this.loadingService.isLoading.next(true);
        setTimeout(function () {
            var newLength = _this.projects.length + 6;
            if (newLength > _this.oldData.length) {
                newLength = _this.oldData.length;
            }
            _this.projects = _this.oldData.slice(0, newLength);
            _this.checkShowMore();
            _this.loadingService.isLoading.next(false);
        }, 300);
    };
    ProjectComponent.prototype.checkShowMore = function () {
        if (this.projects.length > 6) {
            if (this.projects.length == this.oldData.length) {
                this.isNoMore = true;
            }
        }
        else {
            this.isNoMore = true;
        }
    };
    ProjectComponent.prototype.getEntity = function (e) {
        if ((e === null || e === void 0 ? void 0 : e.length) != 0) {
            if (e.length > 6) {
                this.isNoMore = false;
                this.isEmpty = false;
                this.projects = e.slice(0, 6);
                this.oldData = e;
            }
            else {
                this.isNoMore = true;
                this.isEmpty = false;
                this.projects = e;
                this.oldData = e;
            }
        }
        else {
            this.isEmpty = true;
            this.projects = e.slice(0, 6);
        }
    };
    ProjectComponent.prototype.getTabGroupState = function (e) {
        if (e) {
            if (e == 'pending') {
                this.isTabPending = true;
            }
            else {
                this.isTabPending = false;
            }
            if (e == 'reject') {
                this.isTabRejected = true;
            }
            else {
                this.isTabRejected = false;
            }
        }
    };
    ProjectComponent.prototype.changeView = function () {
        var _a;
        (_a = this.changeViewGrid) === null || _a === void 0 ? void 0 : _a.changeView(true);
    };
    ProjectComponent.prototype.getTab = function () {
        var _a;
        (_a = this.tabGroup) === null || _a === void 0 ? void 0 : _a.getEntity('pending', 'pro');
    };
    ProjectComponent.prototype.handleTitle = function (e) {
        this.noResultBySearch = false;
        if (e == 'list') {
            this.isList = true;
        }
        else {
            this.isList = false;
        }
    };
    ProjectComponent.prototype.getData = function (e) {
        if (e == null || e.length <= 0) {
            this.noResultBySearch = true;
            this.projects = e;
            this.isNoMore = true;
        }
        else {
            if (this.projects.length > 6) {
                this.isNoMore = false;
                this.projects = e.slice(0, 6);
            }
            else {
                this.projects = e;
                this.noResultBySearch = false;
                this.isNoMore = true;
            }
        }
    };
    ProjectComponent.prototype.checkToGetData = function (status) {
        var _this = this;
        this.projectService.getAllByObservable().subscribe(function (data) {
            _this.projects = data.data;
            _this.passData = _this.projects;
            if (status == 'pending') {
                _this.getAllProjectsByStatus('pending', _this.projects);
                localStorage.setItem('pending', 'true');
            }
            else if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
                && !localStorage.getItem('pending')) {
                _this.getAllProjectsByStatus('approve');
                localStorage.setItem('approve', 'true');
            }
            else {
                if (localStorage.getItem('reject')) {
                    _this.getAllProjectsByStatus('reject');
                }
                else if (localStorage.getItem('approve')) {
                    _this.getAllProjectsByStatus('approve');
                }
                else if (localStorage.getItem('pending')) {
                    _this.getAllProjectsByStatus('pending');
                }
            }
        });
        this.organizationService.getAllByObservable().subscribe(function (data) {
            _this.organization = data.data;
        });
    };
    ProjectComponent.prototype.getAllProjectsByStatus = function (status, pro) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this.isNoMore = false;
        this.user = this.authApi.currentUserValue;
        if (pro) {
            this.projects = pro;
        }
        if (status) {
            this.isList = false;
            this.changeView();
        }
        switch (status) {
            case 'approve':
                this.isLoaded = true;
                this.isRequest = false;
                for (var i = 0; i < this.projects.length; i++) {
                    this.projects[i].cover = (_b = (_a = this.projects[i]) === null || _a === void 0 ? void 0 : _a.cover) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '\/');
                    this.projects[i].logo = (_d = (_c = this.projects[i]) === null || _c === void 0 ? void 0 : _c.logo) === null || _d === void 0 ? void 0 : _d.replace(/\\/g, '\/');
                    this.projects[i].organization_logo = (_f = (_e = this.projects[i]) === null || _e === void 0 ? void 0 : _e.organization_logo) === null || _f === void 0 ? void 0 : _f.replace(/\\/g, '\/');
                }
                this.projects = this.projects.filter(function (x) {
                    return (x.result_code == 610 || x.result_code == 631 || x.result_code == 620 || x.result_code == 621);
                });
                this.oldData = this.passData.filter(function (x) { return (x.result_code == 610 || x.result_code == 631 || x.result_code == 620 || x.result_code == 621); });
                this.isEmpty = false;
                if (this.projects == [] || this.projects.length <= 0) {
                    this.isEmpty = true;
                }
                break;
            case 'reject':
                this.isLoaded = true;
                this.isRequest = false;
                for (var i = 0; i < this.projects.length; i++) {
                    this.projects[i].cover = (_h = (_g = this.projects[i]) === null || _g === void 0 ? void 0 : _g.cover) === null || _h === void 0 ? void 0 : _h.replace(/\\/g, '\/');
                    this.projects[i].logo = (_k = (_j = this.projects[i]) === null || _j === void 0 ? void 0 : _j.logo) === null || _k === void 0 ? void 0 : _k.replace(/\\/g, '\/');
                    this.projects[i].organization_logo = (_m = (_l = this.projects[i]) === null || _l === void 0 ? void 0 : _l.organization_logo) === null || _m === void 0 ? void 0 : _m.replace(/\\/g, '\/');
                }
                this.projects = this.projects.filter(function (x) {
                    return x.result_code == 611;
                });
                this.oldData = this.passData.filter(function (x) { return x.result_code == 611; });
                this.isEmpty = false;
                if (this.projects == null || this.projects.length <= 0) {
                    this.isEmpty = true;
                }
                break;
            case 'pending':
                this.isLoaded = true;
                for (var i = 0; i < this.projects.length; i++) {
                    this.projects[i].cover = (_p = (_o = this.projects[i]) === null || _o === void 0 ? void 0 : _o.cover) === null || _p === void 0 ? void 0 : _p.replace(/\\/g, '\/');
                    this.projects[i].logo = (_r = (_q = this.projects[i]) === null || _q === void 0 ? void 0 : _q.logo) === null || _r === void 0 ? void 0 : _r.replace(/\\/g, '\/');
                    this.projects[i].organization_logo = (_t = (_s = this.projects[i]) === null || _s === void 0 ? void 0 : _s.organization_logo) === null || _t === void 0 ? void 0 : _t.replace(/\\/g, '\/');
                }
                this.projects = this.projects.filter(function (x) {
                    return x.result_code == 601 || x.result_code == 603 || x.result_code == 602;
                });
                this.oldData = this.passData.filter(function (x) { return x.result_code == 601 || x.result_code == 603 || x.result_code == 602; });
                if (this.authApi.currentUserValue.role_id == 'admin') {
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
        if (this.projects.length > 6) {
            this.projects = this.projects.slice(0, 6);
        }
        else {
            this.isNoMore = true;
        }
        this.number = this.projects.length;
    };
    ProjectComponent.prototype.openProjectForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dialogRef;
            var _this = this;
            return __generator(this, function (_a) {
                this.loadingService.getOrganizationId.next("" + this.organization[0].id);
                dialogRef = this.dialog.open(project_form_component_1.ProjectFormComponent, {
                    width: '768px',
                    data: {
                        title: 'Tạo dự án'
                    }
                });
                dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!data) return [3 /*break*/, 2];
                                this.loadingService.isLoading.next(true);
                                return [4 /*yield*/, this.projectService.createProject(data)];
                            case 1:
                                res = _a.sent();
                                if (res.status == 0) {
                                    this.loadingService.isLoading.next(false);
                                    this.snackbar.showMessage('Tạo dự án thành công.Chờ phê duyệt từ ban quản trị', true);
                                    this.getTab();
                                    this.checkToGetData();
                                    this.router.navigate(['/manager/manage-project']);
                                }
                                else {
                                    this.dialog.open(project_form_component_1.ProjectFormComponent, {
                                        width: '768px',
                                        data: {
                                            title: 'Tạo dự án'
                                        }
                                    });
                                    this.loadingService.isLoading.next(false);
                                    this.snackbar.showMessage(res.message, false);
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild('changeView')
    ], ProjectComponent.prototype, "changeViewGrid");
    __decorate([
        core_1.ViewChild('tabGroup')
    ], ProjectComponent.prototype, "tabGroup");
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
