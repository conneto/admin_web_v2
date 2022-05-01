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
exports.OrganizationFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var constant_1 = require("src/app/constant/constant");
var OrganizationFormComponent = /** @class */ (function () {
    function OrganizationFormComponent(org, getEntityService, loadingService, location, router, snackBar, formBuilder, orgApi, user) {
        this.org = org;
        this.getEntityService = getEntityService;
        this.loadingService = loadingService;
        this.location = location;
        this.router = router;
        this.snackBar = snackBar;
        this.formBuilder = formBuilder;
        this.orgApi = orgApi;
        this.user = user;
        this.category = constant_1.Constant.CATEGORY;
        this.categoryString = '';
        this.categoryStringClone = '';
    }
    OrganizationFormComponent_1 = OrganizationFormComponent;
    OrganizationFormComponent.prototype.ngOnInit = function () {
        this.initFormBuilder();
    };
    OrganizationFormComponent.prototype.create = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var i, i, uploadData, res, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.organizationForm.controls.category.value.length != 0 && this.organizationForm.controls.category.value) {
                            if (this.isRemoved == true || this.isSubmitted == true) {
                                this.categoryStringClone = '';
                                for (i = 0; i < this.organizationForm.controls.category.value.length; i++) {
                                    this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
                                }
                            }
                            else {
                                for (i = 0; i < this.organizationForm.controls.category.value.length; i++) {
                                    this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
                                }
                            }
                        }
                        this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
                        this.isSubmitted = true;
                        this.organizationForm.value.category = this.categoryString;
                        console.log(this.organizationForm.value);
                        if (!this.organizationForm.valid) return [3 /*break*/, 4];
                        console.log(this.organizationForm.value);
                        uploadData = new FormData();
                        uploadData.append('organization', JSON.stringify(this.organizationForm.value));
                        uploadData.append('logo', this.logoFile, (_a = this.logoFile) === null || _a === void 0 ? void 0 : _a.name);
                        uploadData.append('cover', this.coverFile, (_b = this.coverFile) === null || _b === void 0 ? void 0 : _b.name);
                        if (!this.organizationId) return [3 /*break*/, 2];
                        this.loadingService.isLoading.next(true);
                        return [4 /*yield*/, this.orgApi.createById(uploadData, "" + this.organizationId)];
                    case 1:
                        res = _c.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            this.snackBar.showMessage('Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi', true);
                            this.loadingService.isLoading.next(false);
                            this.router.navigate(['/manager/manage-organization']);
                            this.org.getAllOrganization();
                        }
                        else {
                            this.snackBar.showMessage("" + (res === null || res === void 0 ? void 0 : res.message), false);
                            this.loadingService.isLoading.next(false);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.loadingService.isLoading.next(true);
                        return [4 /*yield*/, this.orgApi.create(uploadData)];
                    case 3:
                        res = _c.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            this.snackBar.showMessage('Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi', true);
                            this.loadingService.isLoading.next(false);
                            this.org.getAllOrganization();
                            this.router.navigate(['/manager']);
                        }
                        else {
                            this.router.navigate(['/manager/manage-organization']);
                            this.snackBar.showMessage("" + (res === null || res === void 0 ? void 0 : res.message), false);
                            this.loadingService.isLoading.next(false);
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrganizationFormComponent.prototype.initFormBuilder = function () {
        this.organizationForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128), forms_1.Validators.pattern('^(?!\\s*$).+')]],
            eng_name: [''],
            description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
            vision: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
            website: [''],
            founding_date: ['', forms_1.Validators.required],
            created_by: [this.user.currentUserValue ? this.user.currentUserValue.id : ''],
            request_type: [OrganizationFormComponent_1.CREATE],
            mission: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
            category: [''],
            logo: [''],
            cover: ['']
        });
    };
    OrganizationFormComponent.prototype.onChangeCover = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            this.coverFile = e.target.files[0];
        }
    };
    OrganizationFormComponent.prototype.onChangeLogo = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            this.logoFile = e.target.files[0];
        }
    };
    Object.defineProperty(OrganizationFormComponent.prototype, "organizationControl", {
        get: function () {
            return this.organizationForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    OrganizationFormComponent.prototype.onRemoveCategory = function (e) {
        this.isRemoved = true;
        var category = this.organizationForm.controls.category.value;
        var index = category.indexOf(e);
        console.log(index);
        if (index !== -1) {
            category.splice(index, 1);
        }
        if (index == 0) {
            this.categoryStringClone = '';
        }
        this.organizationForm.controls.category.patchValue(category);
    };
    var OrganizationFormComponent_1;
    OrganizationFormComponent.CREATE = 'create';
    __decorate([
        core_1.Input()
    ], OrganizationFormComponent.prototype, "organizationId");
    OrganizationFormComponent = OrganizationFormComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-organization-form',
            templateUrl: './organization-form.component.html',
            styleUrls: ['./organization-form.component.scss']
        })
    ], OrganizationFormComponent);
    return OrganizationFormComponent;
}());
exports.OrganizationFormComponent = OrganizationFormComponent;
