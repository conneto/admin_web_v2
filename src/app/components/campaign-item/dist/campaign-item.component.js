"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CampaignItemComponent = void 0;
var core_1 = require("@angular/core");
var CampaignItemComponent = /** @class */ (function () {
    function CampaignItemComponent(userApi, router, loadingService) {
        this.userApi = userApi;
        this.router = router;
        this.loadingService = loadingService;
    }
    CampaignItemComponent.prototype.ngOnInit = function () {
        var _a;
        this.urlApi = this.loadingService.getApiGetLink.value;
        this.valueNumber = (Number((_a = this.campaign) === null || _a === void 0 ? void 0 : _a.org_id) * 100).toFixed(2);
        if (this.userApi.currentUserValue.role == 'admin') {
            this.isAdmin = true;
        }
    };
    CampaignItemComponent.prototype.goToDetails = function (id) {
        if (this.isAdmin) {
            this.router.navigate(["/admin/manage-campaign/campaign-details/" + id]);
        }
        else {
            this.router.navigate(["/manager/manage-campaign/campaign-details/" + id]);
        }
    };
    __decorate([
        core_1.Input()
    ], CampaignItemComponent.prototype, "campaign");
    __decorate([
        core_1.Input()
    ], CampaignItemComponent.prototype, "valueNumber");
    CampaignItemComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-item',
            templateUrl: './campaign-item.component.html',
            styleUrls: ['./campaign-item.component.scss']
        })
    ], CampaignItemComponent);
    return CampaignItemComponent;
}());
exports.CampaignItemComponent = CampaignItemComponent;
