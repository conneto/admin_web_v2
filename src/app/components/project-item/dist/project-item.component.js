"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectItemComponent = void 0;
var core_1 = require("@angular/core");
var ProjectItemComponent = /** @class */ (function () {
    function ProjectItemComponent(router, loadingService) {
        this.router = router;
        this.loadingService = loadingService;
        this.projects = [];
    }
    ProjectItemComponent.prototype.ngOnInit = function () {
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    ProjectItemComponent.prototype.goToDetail = function (id) {
        this.router.navigate(["/manager/manage-project/project-request-detail/" + id]);
    };
    __decorate([
        core_1.Input()
    ], ProjectItemComponent.prototype, "projects");
    ProjectItemComponent = __decorate([
        core_1.Component({
            selector: 'app-project-item',
            templateUrl: './project-item.component.html',
            styleUrls: ['./project-item.component.scss']
        })
    ], ProjectItemComponent);
    return ProjectItemComponent;
}());
exports.ProjectItemComponent = ProjectItemComponent;
