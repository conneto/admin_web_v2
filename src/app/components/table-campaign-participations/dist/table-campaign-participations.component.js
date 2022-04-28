"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableCampaignParticipationsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var TableCampaignParticipationsComponent = /** @class */ (function () {
    function TableCampaignParticipationsComponent(loadingService, utilService) {
        this.loadingService = loadingService;
        this.utilService = utilService;
        this.displayColumns = ['name'];
        this.displayVolunteerColumns = ['name'];
        this.dataSource = new table_1.MatTableDataSource;
    }
    TableCampaignParticipationsComponent.prototype.ngOnInit = function () {
        this.dataSource = new table_1.MatTableDataSource(this.volunteer);
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    TableCampaignParticipationsComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        core_1.Input()
    ], TableCampaignParticipationsComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], TableCampaignParticipationsComponent.prototype, "volunteer");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], TableCampaignParticipationsComponent.prototype, "paginator");
    TableCampaignParticipationsComponent = __decorate([
        core_1.Component({
            selector: 'app-table-campaign-participations',
            templateUrl: './table-campaign-participations.component.html',
            styleUrls: ['./table-campaign-participations.component.scss']
        })
    ], TableCampaignParticipationsComponent);
    return TableCampaignParticipationsComponent;
}());
exports.TableCampaignParticipationsComponent = TableCampaignParticipationsComponent;
