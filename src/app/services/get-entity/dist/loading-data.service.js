"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoadingDataService = void 0;
var core_1 = require("@angular/core");
var LoadingDataService = /** @class */ (function () {
    function LoadingDataService(organization, campaign, project, orgRequest, campRequest, proRequest) {
        this.organization = organization;
        this.campaign = campaign;
        this.project = project;
        this.orgRequest = orgRequest;
        this.campRequest = campRequest;
        this.proRequest = proRequest;
    }
    LoadingDataService.prototype.getByEntity = function (entity) {
        switch (entity) {
            case 'org':
                this.organization.checkToGetData();
                break;
            case 'pro':
                this.project.checkToGetData(), this.proRequest.getRequest();
                break;
            case 'cam':
                this.campaign.checkToGetData();
                break;
        }
    };
    LoadingDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoadingDataService);
    return LoadingDataService;
}());
exports.LoadingDataService = LoadingDataService;
