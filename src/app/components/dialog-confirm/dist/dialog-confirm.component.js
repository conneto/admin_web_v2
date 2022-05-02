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
exports.DialogConfirmComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var DialogConfirmComponent = /** @class */ (function () {
    function DialogConfirmComponent(dialogRef, dialog, data) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.reasonFormControl = new forms_1.FormControl('', {
            validators: forms_1.Validators.required
        });
    }
    DialogConfirmComponent.prototype.ngOnInit = function () {
    };
    DialogConfirmComponent.prototype.noClick = function () {
        this.dialogRef.close(false);
    };
    DialogConfirmComponent.prototype.yesClick = function () {
        var _a;
        if (this.data.reason) {
            this.reasonFormControl.markAllAsTouched();
            if (!((_a = this.reasonFormControl.errors) === null || _a === void 0 ? void 0 : _a.required)) {
                this.dialogRef.close(this.reasonFormControl.value);
            }
        }
        else {
            this.dialogRef.close(true);
        }
    };
    DialogConfirmComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-confirm',
            templateUrl: './dialog-confirm.component.html',
            styleUrls: ['./dialog-confirm.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogConfirmComponent);
    return DialogConfirmComponent;
}());
exports.DialogConfirmComponent = DialogConfirmComponent;
