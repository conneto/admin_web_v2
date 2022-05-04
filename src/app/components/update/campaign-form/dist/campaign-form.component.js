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
exports.CampaignUpdateFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var constant_1 = require("src/app/constant/constant");
var CampaignUpdateFormComponent = /** @class */ (function () {
    function CampaignUpdateFormComponent(currency, loadingService, campaignService, authApi, formBuilder, snackBar) {
        this.currency = currency;
        this.loadingService = loadingService;
        this.campaignService = campaignService;
        this.authApi = authApi;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.organizations = [];
        this.projects = [];
        this.cloneProjects = [];
        this.type = ['Quyên góp', 'Tuyển tình nguyện viên'];
        this.uploadData = new FormData();
        this.category = constant_1.Constant.CATEGORY;
        this.categoryString = '';
        this.categoryStringClone = '';
    }
    CampaignUpdateFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    CampaignUpdateFormComponent.prototype.ngAfterContentChecked = function () {
        this.selectedRadio = this.data.type == 'Quyên góp' ? 'Quyên góp' : 'Tuyển tình nguyện viên';
        console.log(this.selectedRadio);
    };
    CampaignUpdateFormComponent.prototype.getValue = function (element) {
        this.defaultNumber = this.currency.transform(this.defaultNumber, 'đ');
        element.target.value = this.defaultNumber;
    };
    CampaignUpdateFormComponent.prototype.initForm = function () {
        this.campaignForm = this.formBuilder.group({
            name: [
                this.data.name,
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8),
                    forms_1.Validators.maxLength(128),
                ],
            ],
            description: [
                this.data.description,
                [forms_1.Validators.required, forms_1.Validators.minLength(128)],
            ],
            start_date: [
                new Date(this.data.start_date).toISOString().substring(0, 10),
                forms_1.Validators.required,
            ],
            end_date: [
                new Date(this.data.end_date).toISOString().substring(0, 10),
                forms_1.Validators.required,
            ],
            start_working_date: [
                new Date(this.data.start_working_date).toISOString().substring(0, 10),
                this.selectedRadio == 'Quyên góp' ? '' : forms_1.Validators.required,
            ],
            end_working_date: [
                new Date(this.data.end_working_date).toISOString().substring(0, 10),
                this.selectedRadio == 'Quyên góp' ? '' : forms_1.Validators.required,
            ],
            type: [this.selectedRadio, forms_1.Validators.required],
            target_number: [this.data.target_number, forms_1.Validators.required],
            job_requirement: [this.data.job_requirement],
            job_description: [this.data.job_description],
            job_benefit: [this.data.job_benefit],
            project_id: [this.data.pro_id],
            cover: [],
            category: ['']
        });
    };
    CampaignUpdateFormComponent.prototype.update = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var i, i, res;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.campaignForm.controls.category.value.length != 0 &&
                            this.campaignForm.controls.category.value) {
                            if (this.isRemoved == true || this.isSubmitted == true) {
                                this.categoryStringClone = '';
                                for (i = 0; i < this.campaignForm.controls.category.value.length; i++) {
                                    this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat('|', this.categoryStringClone);
                                }
                            }
                            else {
                                this.categoryStringClone = '';
                                for (i = 0; i < this.campaignForm.controls.category.value.length; i++) {
                                    this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat('|', this.categoryStringClone);
                                }
                            }
                        }
                        if (((_a = this.categoryStringClone) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
                        }
                        else {
                            this.categoryString = '';
                        }
                        this.isSubmitted = true;
                        this.projects = this.cloneProjects.filter(function (x) {
                            return x.name == _this.campaignForm.value.selected;
                        });
                        if (this.projects.length != 0) {
                            this.campaignForm.patchValue({ project_id: "" + this.projects[0].id });
                        }
                        if (this.selectedRadio == 'Quyên góp') {
                            this.campaignForm.patchValue({
                                start_working_date: "" + this.campaignForm.value.start_date
                            });
                            this.campaignForm.patchValue({
                                end_working_date: "" + this.campaignForm.value.end_date
                            });
                            this.campaignForm.patchValue({ type: 'donation' });
                            this.campaignForm.removeControl('job_requirement');
                            this.campaignForm.removeControl('job_description');
                            this.campaignForm.removeControl('job_benefit');
                        }
                        else if (this.selectedRadio == 'Tuyển tình nguyện viên') {
                            this.campaignForm.patchValue({ type: 'recruitment' });
                        }
                        if (!this.campaignForm.valid) return [3 /*break*/, 2];
                        this.campaignForm.value.category = this.categoryString;
                        this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
                        console.log(this.campaignForm.value);
                        return [4 /*yield*/, this.campaignService.updateById(this.uploadData, this.data.id)];
                    case 1:
                        res = _b.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            window.location.reload();
                            this.snackBar.showMessage('Cập nhật thành công', true);
                        }
                        else {
                            this.snackBar.showMessage(res === null || res === void 0 ? void 0 : res.message, false);
                        }
                        this.loadingService.isLoading.next(false);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CampaignUpdateFormComponent.prototype.onChange = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            for (var i = 0; i < e.target.files.length; i++) {
                this.uploadData.append('cover', e.target.files[i], e.target.files[i].name);
            }
            // this.coverImage = e.target.files[0];
        }
    };
    Object.defineProperty(CampaignUpdateFormComponent.prototype, "campaignControl", {
        get: function () {
            return this.campaignForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CampaignUpdateFormComponent.prototype.getType = function (e) {
        if (e == 'Quyên góp') {
            this.campaignForm.patchValue({
                start_working_date: "" + this.campaignForm.value.start_date
            });
            this.campaignForm.patchValue({
                end_working_date: "" + this.campaignForm.value.end_date
            });
            this.campaignForm.removeControl('job_requirement');
            this.campaignForm.removeControl('job_description');
            this.campaignForm.removeControl('job_benefit');
        }
        else if (e == 'Tuyển tình nguyện viên') {
            this.campaignForm.setControl('job_requirement', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
            this.campaignForm.setControl('job_description', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
            this.campaignForm.setControl('job_benefit', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
        }
    };
    CampaignUpdateFormComponent.prototype.onRemoveCategory = function (e) {
        this.isRemoved = true;
        var category = this.campaignForm.controls.category.value;
        var index = category.indexOf(e);
        if (index !== -1) {
            category.splice(index, 1);
        }
        if (index == 0) {
            this.categoryStringClone = '';
        }
        this.campaignForm.controls.category.patchValue(category);
    };
    __decorate([
        core_1.Input()
    ], CampaignUpdateFormComponent.prototype, "data");
    CampaignUpdateFormComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-update-form',
            templateUrl: './campaign-form.component.html',
            styleUrls: ['./campaign-form.component.scss']
        })
    ], CampaignUpdateFormComponent);
    return CampaignUpdateFormComponent;
}());
exports.CampaignUpdateFormComponent = CampaignUpdateFormComponent;
