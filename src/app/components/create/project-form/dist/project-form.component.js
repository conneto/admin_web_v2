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
exports.ProjectFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var constant_1 = require("src/app/constant/constant");
var ProjectFormComponent = /** @class */ (function () {
    function ProjectFormComponent(router, organizationId, authApi, dialogRef, data, formBuilder) {
        this.router = router;
        this.organizationId = organizationId;
        this.authApi = authApi;
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.category = constant_1.Constant.CATEGORY;
    }
    ProjectFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ProjectFormComponent.prototype.initForm = function () {
        this.projectForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
            description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(256)]],
            start_date: ['', forms_1.Validators.required],
            end_date: ['', forms_1.Validators.required],
            created_by: [this.authApi.currentUserValue.id],
            organization_id: [this.organizationId.getOrganizationId.value],
            request_type: ['create'],
            cover: [''],
            logo: [''],
            category: ['']
        });
    };
    ProjectFormComponent.prototype.noClick = function () {
        this.dialogRef.close(false);
    };
    ProjectFormComponent.prototype.yesClick = function () {
        var _a, _b;
        if (this.projectForm.controls.category.value.length != 0 && this.projectForm.controls.category.value) {
            if (this.isRemoved == true || this.isSubmitted == true) {
                this.categoryStringClone = '';
                for (var i = 0; i < this.projectForm.controls.category.value.length; i++) {
                    this.categoryStringClone = this.projectForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
                }
            }
            else {
                this.categoryStringClone = '';
                for (var i = 0; i < this.projectForm.controls.category.value.length; i++) {
                    this.categoryStringClone = this.projectForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
                }
            }
        }
        this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
        this.isSubmitted = true;
        this.projectForm.value.category = this.categoryString;
        if (this.projectForm.valid) {
            var uploadData = new FormData();
            uploadData.append('cover', this.coverImage, (_a = this.coverImage) === null || _a === void 0 ? void 0 : _a.name);
            uploadData.append('logo', this.logo, (_b = this.logo) === null || _b === void 0 ? void 0 : _b.name);
            uploadData.append('project', JSON.stringify(this.projectForm.value));
            this.dialogRef.close(uploadData);
        }
    };
    ProjectFormComponent.prototype.onChange = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            this.coverImage = e.target.files[0];
        }
    };
    ProjectFormComponent.prototype.onChangeCover = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            this.logo = e.target.files[0];
        }
    };
    Object.defineProperty(ProjectFormComponent.prototype, "projectControl", {
        get: function () {
            return this.projectForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ProjectFormComponent.prototype.onRemoveCategory = function (e) {
        this.isRemoved = true;
        var category = this.projectForm.controls.category.value;
        var index = category.indexOf(e);
        console.log(index);
        if (index !== -1) {
            category.splice(index, 1);
        }
        if (index == 0) {
            this.categoryStringClone = '';
        }
        this.projectForm.controls.category.patchValue(category);
    };
    ProjectFormComponent = __decorate([
        core_1.Component({
            selector: 'app-project-form',
            templateUrl: './project-form.component.html',
            styleUrls: ['./project-form.component.scss']
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ProjectFormComponent);
    return ProjectFormComponent;
}());
exports.ProjectFormComponent = ProjectFormComponent;
