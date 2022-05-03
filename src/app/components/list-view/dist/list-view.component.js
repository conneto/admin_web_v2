"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListViewComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var ListViewComponent = /** @class */ (function () {
    function ListViewComponent(role, router, loadingService, utilService) {
        this.role = role;
        this.router = router;
        this.loadingService = loadingService;
        this.utilService = utilService;
        this.dataSource = new table_1.MatTableDataSource;
    }
    ListViewComponent.prototype.ngOnInit = function () {
        switch (this.whichEntity) {
            case 'org':
                this.displayColumns = ["no", 'name', "created_name", 'type', 'founding_date', 'status'];
                break;
            case 'pro':
                this.displayColumns = ["no", "org_name", 'name', 'created_date', 'start_date', 'end_date'];
                break;
            case 'cam':
                this.displayColumns = ["no", "pro_name", 'name', 'created_date', 'start_date', 'end_date'];
                break;
            case 'user':
                this.displayColumns = ["no", "name", 'username', 'created_date', 'role', 'status'];
                break;
        }
        for (var i = 0; i < this.entity.length; i++) {
            Object.assign(this.entity[i], { no: i + 1 });
        }
        this.dataSource = new table_1.MatTableDataSource(this.entity);
        this.urlApi = this.loadingService.getApiGetLink.value;
    };
    ListViewComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ListViewComponent.prototype.goToDetails = function (e) {
        if (this.role.currentUserValue.role_id != 'admin') {
            switch (this.whichEntity) {
                case 'org':
                    this.router.navigate(["manager/manage-organization/organization-request-detail/" + e]);
                    break;
                case 'pro':
                    this.router.navigate(["manager/manage-project/project-request-detail/" + e]);
                    break;
                case 'cam':
                    this.router.navigate(["manager/manage-campaign/campaign-details/" + e]);
                    break;
            }
        }
        else {
            switch (this.whichEntity) {
                case 'org':
                    this.router.navigate(["admin/manage-organization/organization-request-detail/" + e]);
                    break;
                case 'pro':
                    this.router.navigate(["admin/manage-project/project-request-detail/" + e]);
                    break;
                case 'cam':
                    this.router.navigate(["admin/manage-campaign/campaign-details/" + e]);
                    break;
            }
        }
    };
    ListViewComponent.prototype.filterByName = function (e) {
        var value = e.target.value;
        this.dataSource.filter = value.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        core_1.Input()
    ], ListViewComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], ListViewComponent.prototype, "whichEntity");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ListViewComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ListViewComponent.prototype, "sort");
    ListViewComponent = __decorate([
        core_1.Component({
            selector: 'app-list-view',
            templateUrl: './list-view.component.html',
            styleUrls: ['./list-view.component.scss']
        })
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;
