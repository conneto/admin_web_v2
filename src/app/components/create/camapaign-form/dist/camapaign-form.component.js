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
exports.__esModule = true;
exports.CamapaignFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var CamapaignFormComponent = /** @class */ (function () {
    function CamapaignFormComponent(loadingService, authApi, dialogRef, data, formBuilder, organizatioNDetail) {
        this.loadingService = loadingService;
        this.authApi = authApi;
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.organizatioNDetail = organizatioNDetail;
        this.uploadData = new FormData();
    }
    CamapaignFormComponent.prototype.ngOnInit = function () {
        this.initForm();
        var uploadData = new FormData();
        uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
        console.log(this.loadingService.projectId.value);
        console.log(uploadData.get('campaign'));
    };
    CamapaignFormComponent.prototype.initForm = function () {
        this.campaignForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            start_date: ['', forms_1.Validators.required],
            end_date: ['', forms_1.Validators.required],
            request_type: ['create'],
            type: ['', forms_1.Validators.required],
            target_number: ['', forms_1.Validators.required],
            job_requirement: ['', forms_1.Validators.required],
            job_description: ['', forms_1.Validators.required],
            job_benefit: ['', forms_1.Validators.required],
            project_id: [this.loadingService.projectId.value],
            cover: ['']
        });
    };
    CamapaignFormComponent.prototype.noClick = function () {
        this.dialogRef.close(false);
    };
    CamapaignFormComponent.prototype.yesClick = function () {
        if (this.campaignForm.valid) {
            this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
            // uploadData.append('cover', this.coverImage, this.coverImage?.name);
            console.log(this.uploadData.getAll('cover'));
            console.log(this.uploadData.getAll('campaign'));
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
    CamapaignFormComponent = __decorate([
        core_1.Component({
            selector: 'app-camapaign-form',
            templateUrl: './camapaign-form.component.html',
            styleUrls: ['./camapaign-form.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CamapaignFormComponent);
    return CamapaignFormComponent;
}());
exports.CamapaignFormComponent = CamapaignFormComponent;
