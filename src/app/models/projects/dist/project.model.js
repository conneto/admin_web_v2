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
    function Project(id, name, description, logo, cover, start_date, end_date, result_code, result_message, is_active, approved_by, approved_date, category, result_note, created_at, type, updated_at, organization_id, organization_name, organization_logo) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.cover = cover;
        this.start_date = start_date;
        this.end_date = end_date;
        this.result_code = result_code;
        this.result_message = result_message;
        this.is_active = is_active;
        this.approved_by = approved_by;
        this.approved_date = approved_date;
        this.category = category;
        this.result_note = result_note;
        this.created_at = created_at;
        this.type = type;
        this.updated_at = updated_at;
        this.organization_id = organization_id;
        this.organization_name = organization_name;
        this.organization_logo = organization_logo;
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
