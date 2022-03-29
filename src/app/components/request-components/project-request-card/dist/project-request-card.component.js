"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectRequestCardComponent = void 0;
var core_1 = require("@angular/core");
var ProjectRequestCardComponent = /** @class */ (function () {
    function ProjectRequestCardComponent() {
    }
    ProjectRequestCardComponent.prototype.ngOnInit = function () {
    };
    ProjectRequestCardComponent.prototype.viewDetails = function () {
    };
    __decorate([
        core_1.Input()
    ], ProjectRequestCardComponent.prototype, "projects");
    ProjectRequestCardComponent = __decorate([
        core_1.Component({
            selector: 'app-project-request-card',
            templateUrl: './project-request-card.component.html',
            styleUrls: ['./project-request-card.component.scss']
        })
    ], ProjectRequestCardComponent);
    return ProjectRequestCardComponent;
}());
exports.ProjectRequestCardComponent = ProjectRequestCardComponent;
