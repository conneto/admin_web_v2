"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CampaignCardInfoComponent = void 0;
var core_1 = require("@angular/core");
var CampaignCardInfoComponent = /** @class */ (function () {
    function CampaignCardInfoComponent(loadingService) {
        this.loadingService = loadingService;
        this.current = 60000000;
        this.total = 120000000;
    }
    CampaignCardInfoComponent.prototype.ngOnInit = function () {
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    __decorate([
        core_1.Input()
    ], CampaignCardInfoComponent.prototype, "campaign");
    CampaignCardInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-card-info',
            templateUrl: './campaign-card-info.component.html',
            styleUrls: ['./campaign-card-info.component.scss']
        })
    ], CampaignCardInfoComponent);
    return CampaignCardInfoComponent;
}());
exports.CampaignCardInfoComponent = CampaignCardInfoComponent;
