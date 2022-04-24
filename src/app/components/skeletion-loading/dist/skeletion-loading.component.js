"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SkeletionLoadingComponent = void 0;
var core_1 = require("@angular/core");
var SkeletionLoadingComponent = /** @class */ (function () {
    function SkeletionLoadingComponent(loading) {
        this.loading = loading;
    }
    SkeletionLoadingComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], SkeletionLoadingComponent.prototype, "count");
    SkeletionLoadingComponent = __decorate([
        core_1.Component({
            selector: 'app-skeletion-loading',
            templateUrl: './skeletion-loading.component.html',
            styleUrls: ['./skeletion-loading.component.scss']
        })
    ], SkeletionLoadingComponent);
    return SkeletionLoadingComponent;
}());
exports.SkeletionLoadingComponent = SkeletionLoadingComponent;
