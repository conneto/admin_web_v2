"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CampaignAdapter = exports.Campaign = void 0;
var core_1 = require("@angular/core");
var Campaign = /** @class */ (function () {
    function Campaign(id, name, description, cover, type, start_date, end_date, start_working_date, end_working_date, total_donated, total_participant, target_number, job_requirement, job_description, job_benefit, donation_documentents, is_active, org_name, org_id, org_logo, pro_id, pro_name, pro_logo, result_note, result_message, result_code, created_at, category, is_transparent) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cover = cover;
        this.type = type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_working_date = start_working_date;
        this.end_working_date = end_working_date;
        this.total_donated = total_donated;
        this.total_participant = total_participant;
        this.target_number = target_number;
        this.job_requirement = job_requirement;
        this.job_description = job_description;
        this.job_benefit = job_benefit;
        this.donation_documentents = donation_documentents;
        this.is_active = is_active;
        this.org_name = org_name;
        this.org_id = org_id;
        this.org_logo = org_logo;
        this.pro_id = pro_id;
        this.pro_name = pro_name;
        this.pro_logo = pro_logo;
        this.result_note = result_note;
        this.result_message = result_message;
        this.result_code = result_code;
        this.created_at = created_at;
        this.category = category;
        this.is_transparent = is_transparent;
    }
    return Campaign;
}());
exports.Campaign = Campaign;
var CampaignAdapter = /** @class */ (function () {
    function CampaignAdapter() {
    }
    CampaignAdapter.prototype.adapt = function (item) {
        return new Campaign(item.id, item.name, item.description, item.cover, item.type, item.start_date, item.end_date, item.start_working_date, item.end_working_date, item.total_donated_money, item.total_participants, item.target_number, item.job_requirement, item.job_description, item.job_benefit, item.donation_documentents, item.is_active, item.organization_name, item.organization_id, item.organization_logo, item.project_id, item.project_name, item.project_logo, item.result_note, item.result_message, item.result_code, item.created_at, item.category, item.is_transparent);
    };
    CampaignAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CampaignAdapter);
    return CampaignAdapter;
}());
exports.CampaignAdapter = CampaignAdapter;
