"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SnackBarMessageComponent = void 0;
var core_1 = require("@angular/core");
var SnackBarMessageComponent = /** @class */ (function () {
    function SnackBarMessageComponent(snackBar) {
        this.snackBar = snackBar;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'bottom';
    }
    SnackBarMessageComponent.prototype.ngOnInit = function () {
    };
    SnackBarMessageComponent.prototype.showMessage = function (message, isSuccess) {
        this.snackBar.open(message, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: isSuccess ? ['success'] : ['fail']
        });
    };
    SnackBarMessageComponent = __decorate([
        core_1.Component({
            selector: 'app-snack-bar-message',
            templateUrl: './snack-bar-message.component.html',
            styleUrls: ['./snack-bar-message.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SnackBarMessageComponent);
    return SnackBarMessageComponent;
}());
exports.SnackBarMessageComponent = SnackBarMessageComponent;
