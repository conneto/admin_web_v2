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
exports.OrganizationsComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var constant_1 = require("src/app/constant/constant");
var OrganizationsComponent = /** @class */ (function () {
    function OrganizationsComponent(utilService, loadingService, userService, organizationService, authService, apiService, organizationAdapter) {
        this.utilService = utilService;
        this.loadingService = loadingService;
        this.userService = userService;
        this.organizationService = organizationService;
        this.authService = authService;
        this.apiService = apiService;
        this.organizationAdapter = organizationAdapter;
        this.organizations = [];
        this.oldData = [];
        this.isShow = false;
        this.users = [];
        this.isRequest = false;
        this.isActivated = false;
        this.passData = [];
        this.isPending = false;
        this.isList = false;
        this.isAdmin = false;
        this.oldDataSearch = [];
    }
    OrganizationsComponent.prototype.ngOnInit = function () {
        if (this.authService.currentUserValue.role_id == 'admin') {
            this.isAdmin = true;
            this.checkToGetData();
        }
        else if (this.authService.currentUserValue.role_id == 'organization_manager') {
            this.isAdmin = false;
            this.getAllByObservable();
        }
        this.urlApi = this.loadingService.getApiGetLink.value;
        this.loadingService.isSkeleton.next(true);
        this.checkShowMore();
    };
    OrganizationsComponent.prototype.getAllByObservable = function () {
        this.apiService.getByObservable(constant_1.Constant.ORGANIZATIONS).pipe(
        // map((data:Organization[])=>{
        //   return data.filter(data=>{
        //     console.log(data);
        //     return data.result_code==510;
        //   });
        // })
        // tap(data => data.filter((data:any)=>{
        //   console.log(data.result_code)
        // })),
        operators_1.tap(function (data) {
            return data;
        }), operators_1.map(function (data) {
            return data.map(function (data) {
                console.log(data);
            });
        })).subscribe(function (data) {
            // console.log(data);
            // this.organizations = data;
            // this.isLoaded = true;
            // this.noOrg = false;
            // this.isEmpty = false;
            // this.isNoMore = false;
            // this.isList = false;
            // this.isRequest = false;
            // this.number = this.organizations.length;
            // this.numberCount = new Array<number>(this.organizations.length);
        }
        // , (error) => {
        //   console.log(error);
        // }
        );
    };
    OrganizationsComponent.prototype.ngAfterViewInit = function () { };
    OrganizationsComponent.prototype.ngOnDestroy = function () { };
    OrganizationsComponent.prototype.showMore = function () {
        var _this = this;
        this.loadingService.isLoading.next(true);
        setTimeout(function () {
            var newLength = _this.organizations.length + 6;
            if (newLength > _this.oldData.length) {
                newLength = _this.oldData.length;
            }
            _this.organizations = _this.oldData.slice(0, newLength);
            _this.checkShowMore();
            _this.loadingService.isLoading.next(false);
        }, 300);
    };
    OrganizationsComponent.prototype.checkShowMore = function () {
        if (this.organizations.length > 6) {
            if (this.organizations.length == this.oldData.length) {
                this.isNoMore = true;
            }
        }
        else {
            this.isNoMore = true;
        }
    };
    OrganizationsComponent.prototype.getTabGroupState = function (e) {
        if (e) {
            if (e == 'reject') {
                this.isTabRejected = true;
            }
            else {
                this.isTabRejected = false;
            }
        }
    };
    OrganizationsComponent.prototype.handleTitle = function (e) {
        this.noResultBySearch = false;
        if (e == 'list') {
            this.isList = true;
        }
        else {
            this.isList = false;
        }
    };
    OrganizationsComponent.prototype.changeToGrid = function () {
        var _a;
        (_a = this.viewGrid) === null || _a === void 0 ? void 0 : _a.changeView(true);
    };
    OrganizationsComponent.prototype.getOrganizations = function (e) {
        if (e) {
            this.isEmpty = false;
            this.oldData = e;
            this.organizations = e.splice(0, 6);
        }
        else {
            this.isEmpty = true;
        }
    };
    OrganizationsComponent.prototype.getDataSearch = function (e) {
        if (e == null || e.length <= 0) {
            this.noResultBySearch = true;
            this.organizations = e;
            this.isNoMore = true;
        }
        else {
            if (this.organizations.length > 6) {
                this.isNoMore = false;
                this.organizations = e.slice(0, 6);
            }
            else {
                this.organizations = e;
                this.noResultBySearch = false;
                this.isNoMore = true;
            }
        }
    };
    OrganizationsComponent.prototype.checkToGetData = function (getStatus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getAllByObservable();
                this.passData = this.organizations;
                if (getStatus == 'pending') {
                    this.getAllOrganizationByStatus('pending');
                    localStorage.setItem('pending', 'true');
                }
                else if (!localStorage.getItem('reject') &&
                    !localStorage.getItem('approve') &&
                    !localStorage.getItem('pending')) {
                    this.getAllOrganizationByStatus('approve');
                    localStorage.setItem('approve', 'true');
                }
                else {
                    if (localStorage.getItem('reject')) {
                        this.getAllOrganizationByStatus('reject');
                    }
                    else if (localStorage.getItem('approve')) {
                        this.getAllOrganizationByStatus('approve');
                    }
                    else if (localStorage.getItem('pending')) {
                        this.getAllOrganizationByStatus('pending');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    OrganizationsComponent.prototype.getAllOrganizationByStatus = function (status, org) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.status = status;
                // if (org) {
                //   this.organizations = org;
                //   // console.log(this.organizations);
                // }
                if (status) {
                    this.isNoMore = false;
                    // if (this.authService.currentUserValue.role_id == 'organization_manager') {
                    //   const check = this.organizations.every((a) => {
                    //     return a.result_code == 503;
                    //   });
                    //   if (check == true) {
                    //     this.isPending = true;
                    //   }
                    // }
                    this.isList = false;
                    switch (status) {
                        case 'approve':
                            this.changeToGrid();
                            this.isRequest = false;
                            // for (var i = 0; i < this.organizations.length; i++) {
                            //   this.organizationId = this.organizations[i].id;
                            //   this.organizations[i].logo = this.organizations[i]?.logo?.replace(
                            //     /\\/g,
                            //     '/'
                            //   );
                            // }
                            // if (
                            //   this.authService.currentUserValue.role_id == 'organization_manager'
                            // ) {
                            //   if (this.organizations.length <= 0 || this.organizations == null) {
                            //     this.organizations = [];
                            //     this.noOrg = true;
                            //   } else {
                            //     this.organizations = this.passData;
                            //     this.oldData = this.passData;
                            //     this.noOrg = false;
                            //     this.isEmpty = false;
                            //     if (
                            //       this.organizations.length <= 0 ||
                            //       this.organizations == null
                            //     ) {
                            //       this.isEmpty = true;
                            //     }
                            //   }
                            // } else
                            if (this.authService.currentUserValue.role_id == 'admin') {
                                this.isEmpty = false;
                                this.noOrg = false;
                                // this.organizations = this.passData.filter(
                                //   (x) => (x.result_code == 510 || x.result_code == 531 || x.result_code == 520 || x.result_code == 521)
                                // );
                                // this.oldData = this.passData.filter((x) => (x.result_code == 510 || x.result_code == 531 || x.result_code == 520 || x.result_code == 521));
                            }
                            setTimeout(function () {
                                _this.loadingService.isSkeleton.next(false);
                                _this.isLoaded = true;
                            }, 1000);
                            break;
                            //   case 'reject':
                            //     this.isRequest = false;
                            //     for (var i = 0; i < this.organizations.length; i++) {
                            //       this.organizationId = this.organizations[i].id;
                            //       this.organizations[i].logo = this.organizations[i]?.logo?.replace(
                            //         /\\/g,
                            //         '/'
                            //       );
                            //     }
                            //     this.organizations = this.organizations.filter(
                            //       (x) => x.result_code == 511
                            //     );
                            //     this.oldData = this.passData.filter((x) => x.result_code == 511);
                            //     this.isEmpty = false;
                            //     if (this.organizations == null || this.organizations.length <= 0) {
                            //       this.isEmpty = true;
                            //     }
                            //     setTimeout(() => {
                            //       this.loadingService.isSkeleton.next(false);
                            //       this.isLoaded = true;
                            //     }, 1000);
                            //     break;
                            //   case 'pending':
                            //     for (var i = 0; i < this.organizations.length; i++) {
                            //       this.organizationId = this.organizations[i].id;
                            //       this.organizations[i].logo = this.organizations[i]?.logo?.replace(
                            //         /\\/g,
                            //         '/'
                            //       );
                            //     }
                            //     if (this.authService.currentUserValue.role_id == 'admin') {
                            //       this.isRequest = true;
                            //     } else {
                            //       this.isRequest = false;
                            //     }
                            //     this.organizations = this.organizations.filter(
                            //       (x) => x.result_code == 501 || x.result_code == 503 || x.result_code == 502
                            //     );
                            //     this.oldData = this.passData.filter((x) => x.result_code == 501 || x.result_code == 503 || x.result_code == 502);
                            //     this.isEmpty = false;
                            //     if (this.organizations == null || this.organizations.length <= 0) {
                            //       this.isEmpty = true;
                            //     }
                            //     setTimeout(() => {
                            //       this.loadingService.isSkeleton.next(false);
                            //       this.isLoaded = true;
                            //     }, 1000);
                            //     break;
                            // }
                            // if (this.organizations.length > 6) {
                            //   this.organizations = this.organizations.slice(0, 6);
                            // } else {
                            //   this.isNoMore = true;
                            // }
                            this.number = this.organizations.length;
                            this.numberCount = new Array(this.organizations.length);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    OrganizationsComponent.prototype.getAllOrganization = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.isLoaded = true;
                        this.isRequest = false;
                        _c = this;
                        return [4 /*yield*/, this.organizationService.getAll()];
                    case 1:
                        _c.organizations = _d.sent();
                        if (this.organizations == null || this.organizations.length <= 0) {
                            this.isEmpty = true;
                            this.noOrg = true;
                        }
                        else {
                            this.noOrg = false;
                            this.isEmpty = false;
                            this.isShow = false;
                        }
                        for (i = 0; i < this.organizations.length; i++) {
                            this.organizationId = this.organizations[i].id;
                            this.loadingService.getOrganizationId.next("" + this.organizationId);
                            this.organizations[i].logo = (_b = (_a = this.organizations[i]) === null || _a === void 0 ? void 0 : _a.logo) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '/');
                            this.organizations[i].type =
                                this.organizations[i].type == 'ngo'
                                    ? (this.organizations[i].type = 'Tổ chức phi chính phủ')
                                    : (this.organizations[i].type = 'Tổ chức phi lợi nhuận');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrganizationsComponent.prototype.getEntity = function (e) {
        if ((e === null || e === void 0 ? void 0 : e.length) != 0) {
            if (e.length > 6) {
                this.isNoMore = false;
                this.isEmpty = false;
                this.organizations = e.slice(0, 6);
                this.oldData = e;
            }
            else {
                this.isNoMore = true;
                this.isEmpty = false;
                this.organizations = e;
                this.oldData = e;
            }
        }
        else {
            this.isEmpty = true;
            this.organizations = e.slice(0, 6);
        }
    };
    __decorate([
        core_1.ViewChild('tabGroup')
    ], OrganizationsComponent.prototype, "tabGroup");
    __decorate([
        core_1.ViewChild('viewGrid')
    ], OrganizationsComponent.prototype, "viewGrid");
    OrganizationsComponent = __decorate([
        core_1.Component({
            selector: 'app-organizations',
            templateUrl: './organizations.component.html',
            styleUrls: ['./organizations.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationsComponent);
    return OrganizationsComponent;
}());
exports.OrganizationsComponent = OrganizationsComponent;
