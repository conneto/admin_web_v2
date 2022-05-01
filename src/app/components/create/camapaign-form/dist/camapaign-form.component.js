"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CamapaignFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var CamapaignFormComponent = /** @class */ (function () {
    function CamapaignFormComponent(organizationApi, projectApi, loadingService, authApi, dialogRef, data, formBuilder, organizatioNDetail) {
        this.organizationApi = organizationApi;
        this.projectApi = projectApi;
        this.loadingService = loadingService;
        this.authApi = authApi;
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.organizatioNDetail = organizatioNDetail;
        this.organizations = [];
        this.projects = [];
        this.type = ['Quyên góp', 'Tuyển tình nguyện viên'];
        this.uploadData = new FormData();
    }
    CamapaignFormComponent.prototype.ngOnInit = function () {
        this.initForm();
        var uploadData = new FormData();
        uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
    };
    CamapaignFormComponent.prototype.initForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.campaignForm = this.formBuilder.group({
                            selected: [this.selectedValue, forms_1.Validators.required],
                            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
                            description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(256)]],
                            start_date: ['', forms_1.Validators.required],
                            end_date: ['', forms_1.Validators.required],
                            start_working_date: ["", this.selectedRadio == "Quyên góp" ? "" : forms_1.Validators.required],
                            end_working_date: ['', this.selectedRadio == "Quyên góp" ? "" : forms_1.Validators.required],
                            request_type: ['create'],
                            type: [this.selectedRadio == "Quyên góp" ? 'donate' : 'recruitment', forms_1.Validators.required],
                            target_number: ['', forms_1.Validators.required],
                            job_requirement: ['', this.selectedRadio == "Quyên góp" ? "" : [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
                            job_description: ['', this.selectedRadio == "Quyên góp" ? "" : [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
                            job_benefit: ['', this.selectedRadio == "Quyên góp" ? "" : [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
                            project_id: [this.loadingService.projectId.value],
                            cover: ['']
                        });
                        _a = this;
                        return [4 /*yield*/, this.organizationApi.getAll()];
                    case 1:
                        _a.organizations = _c.sent();
                        if (!this.organizations) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, this.organizationApi.getProjectsByOrgId("" + this.organizations[0].id)];
                    case 2:
                        _b.projects = _c.sent();
                        this.projects = this.projects.filter(function (x) {
                            return x.resultCode == 610;
                        });
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CamapaignFormComponent.prototype.noClick = function () {
        console.log(this.selectedValue);
        this.dialogRef.close(false);
    };
    CamapaignFormComponent.prototype.yesClick = function () {
        this.isSubmitted = true;
        console.log('ngu');
        console.log(this.campaignForm.value);
        if (this.campaignForm.valid) {
            // if (this.selectedRadio == "Quyên góp" ) {
            //   this.campaignForm.value.start_working_date = this.campaignForm.value.start_date;
            //   this.campaignForm.value.end_working_date = this.campaignForm.value.end_date;
            // }
            this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
            // uploadData.append('cover', this.coverImage, this.coverImage?.name);
            this.dialogRef.close(this.uploadData);
        }
    };
    CamapaignFormComponent.prototype.onChange = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            for (var i = 0; i < e.target.files.length; i++) {
                this.uploadData.append('cover', e.target.files[i], e.target.files[i].name);
            }
            // this.coverImage = e.target.files[0];
        }
    };
    Object.defineProperty(CamapaignFormComponent.prototype, "campaignControl", {
        get: function () {
            return this.campaignForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    CamapaignFormComponent = __decorate([
        core_1.Component({
            selector: 'app-camapaign-form',
            templateUrl: './camapaign-form.component.html',
            styleUrls: ['./camapaign-form.component.scss']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CamapaignFormComponent);
    return CamapaignFormComponent;
}());
exports.CamapaignFormComponent = CamapaignFormComponent;
