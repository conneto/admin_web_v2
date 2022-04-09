"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectAdapter = exports.Project = void 0;
var core_1 = require("@angular/core");
var Project = /** @class */ (function () {
    function Project(id, name, description, logo, cover, startDate, endDate, resultCode, resultMessage, is_active, approvedBy, approvedDate, category, result_note, created_at, type, updated_at, organizationId, organizationName, organizationLogo) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.cover = cover;
        this.startDate = startDate;
        this.endDate = endDate;
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
        this.is_active = is_active;
        this.approvedBy = approvedBy;
        this.approvedDate = approvedDate;
        this.category = category;
        this.result_note = result_note;
        this.created_at = created_at;
        this.type = type;
        this.updated_at = updated_at;
        this.organizationId = organizationId;
        this.organizationName = organizationName;
        this.organizationLogo = organizationLogo;
    }
    return Project;
}());
exports.Project = Project;
var ProjectAdapter = /** @class */ (function () {
    function ProjectAdapter() {
    }
    ProjectAdapter.prototype.adapt = function (item) {
        return new Project(item.id, item.name, item.description, item.logo, item.cover, item.start_date, item.end_date, item.result_code, item.result_message, item.is_active, item.approved_by, item.approved_date, item.category, item.result_note, item.created_at, item.type, item.updated_at, item.organization_id, item.organization_name, item.organization_logo);
    };
    ProjectAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectAdapter);
    return ProjectAdapter;
}());
exports.ProjectAdapter = ProjectAdapter;
