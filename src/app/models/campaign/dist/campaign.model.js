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
    function Campaign(id, name, description, cover, type, startDate, endDate, totalDonated, totalPaticipant, target, jobRequirement, jobDescription, jobBenefit, donation_documentents, is_active, org_name, org_id, org_logo, pro_id, pro_name, pro_code, result_note, result_name, result_code, createdDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cover = cover;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalDonated = totalDonated;
        this.totalPaticipant = totalPaticipant;
        this.target = target;
        this.jobRequirement = jobRequirement;
        this.jobDescription = jobDescription;
        this.jobBenefit = jobBenefit;
        this.donation_documentents = donation_documentents;
        this.is_active = is_active;
        this.org_name = org_name;
        this.org_id = org_id;
        this.org_logo = org_logo;
        this.pro_id = pro_id;
        this.pro_name = pro_name;
        this.pro_code = pro_code;
        this.result_note = result_note;
        this.result_name = result_name;
        this.result_code = result_code;
        this.createdDate = createdDate;
    }
    return Campaign;
}());
exports.Campaign = Campaign;
var CampaignAdapter = /** @class */ (function () {
    function CampaignAdapter() {
    }
    CampaignAdapter.prototype.adapt = function (item) {
        return new Campaign(item.id, item.name, item.description, item.cover, item.type, item.start_date, item.end_date, item.total_donated_money, item.total_participants, item.target_number, item.job_requirement, item.job_description, item.job_benefit, item.donation_documentents, item.is_active, item.organization_name, item.organization_id, item.organization_logo, item.project_id, item.project_name, item.project_code, item.result_note, item.result_message, item.result_code, item.created_at);
    };
    CampaignAdapter = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CampaignAdapter);
    return CampaignAdapter;
}());
exports.CampaignAdapter = CampaignAdapter;
