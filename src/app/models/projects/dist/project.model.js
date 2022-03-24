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
    function Project(id, name, description, logo, cover, startDate, endDate, 
    // public totalDonated?: number,
    // public target?: number,
    // public jobRequirement?: string,
    // public jobDescription?: string,
    // public jobBenefit?: string,
    // public creationCode?: number,
    // public creationMessage?: string,
    is_active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.cover = cover;
        this.startDate = startDate;
        this.endDate = endDate;
        this.is_active = is_active;
    }
    return Project;
}());
exports.Project = Project;
var ProjectAdapter = /** @class */ (function () {
    function ProjectAdapter() {
    }
    ProjectAdapter.prototype.adapt = function (item) {
        return new Project(item.id, item.name, item.description, item.logo, item.cover, item.start_date, item.end_date, 
        // item.total_donated_money,
        // item.target_amount,
        // item.job_requirement,
        // item.job_description,
        // item.job_benefit,
        // item.creationCode,
        // item.createtionMessage,
        item.is_active);
    };
    ProjectAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectAdapter);
    return ProjectAdapter;
}());
exports.ProjectAdapter = ProjectAdapter;
