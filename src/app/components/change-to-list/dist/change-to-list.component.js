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
        this.icon_view = 'view_list';
        this.handleTitle = new core_1.EventEmitter();
        this.entitys = new core_1.EventEmitter();
    }
    ChangeToListComponent.prototype.ngOnInit = function () {
    };
    ChangeToListComponent.prototype.changeView = function (isTab) {
        if (isTab) {
            {
                this.handleTitle.emit(this.whichView = 'grid');
                this.icon_view = 'view_list';
            }
        }
        else {
            if (this.icon_view == 'grid_view') {
                this.handleTitle.emit(this.whichView = 'grid');
                this.entitys.emit(this.entityOrganization);
                this.icon_view = 'view_list';
            }
            else {
                this.handleTitle.emit(this.whichView = 'list');
                this.entitys.emit(this.entityOrganization);
                this.icon_view = 'grid_view';
            }
        }
    };
    __decorate([
        core_1.Output()
    ], ChangeToListComponent.prototype, "handleTitle");
    __decorate([
        core_1.Input()
    ], ChangeToListComponent.prototype, "entityOrganization");
    __decorate([
        core_1.Output()
    ], ChangeToListComponent.prototype, "entitys");
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
