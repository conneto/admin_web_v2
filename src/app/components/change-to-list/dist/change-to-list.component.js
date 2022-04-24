"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangeToListComponent = void 0;
var core_1 = require("@angular/core");
var ChangeToListComponent = /** @class */ (function () {
    function ChangeToListComponent() {
        this.isActiveList = false;
        this.isActiveGrid = false;
        this.handleTitle = new core_1.EventEmitter();
    }
    ChangeToListComponent.prototype.ngOnInit = function () {
        this.isActiveGrid = true;
    };
    ChangeToListComponent.prototype.ngAfterViewInit = function () {
    };
    ChangeToListComponent.prototype.viewList = function () {
        this.handleTitle.emit(this.whichView = 'list');
        this.isActiveList = true;
        this.isActiveGrid = false;
    };
    ChangeToListComponent.prototype.viewGrid = function () {
        this.handleTitle.emit(this.whichView = 'grid');
        this.isActiveList = false;
        this.isActiveGrid = true;
    };
    __decorate([
        core_1.Output()
    ], ChangeToListComponent.prototype, "handleTitle");
    ChangeToListComponent = __decorate([
        core_1.Component({
            selector: 'app-change-to-list',
            templateUrl: './change-to-list.component.html',
            styleUrls: ['./change-to-list.component.scss']
        })
    ], ChangeToListComponent);
    return ChangeToListComponent;
}());
exports.ChangeToListComponent = ChangeToListComponent;
