"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowDocumentComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var ShowDocumentComponent = /** @class */ (function () {
    function ShowDocumentComponent(loading) {
        this.loading = loading;
        this.displayColumns = ["payer_name", "purpose", "payment_date", "item", "price", "quantity", "recipient_name", "unit"];
        this.dataSource = new table_1.MatTableDataSource();
    }
    ShowDocumentComponent.prototype.ngOnInit = function () {
        var _a, _b;
        if (this.type == 'pdf') {
            for (var i = 0; i < ((_a = this.entityPDF) === null || _a === void 0 ? void 0 : _a.length); i++) {
                this.name = this.entityPDF[i].url.split('/');
                Object.assign(this.entityPDF[i], {
                    name: this.name[3]
                });
            }
        }
        else {
            this.displayColumns = ["payer_name", "purpose", "payment_date", "item", "price", "quantity", "recipient_name", "unit", 'image'];
            this.dataSource = new table_1.MatTableDataSource((_b = this.entityExcel) === null || _b === void 0 ? void 0 : _b.cashflow_details);
        }
        this.uriApi = this.loading.getApiGetLink.value;
    };
    ShowDocumentComponent.prototype.ngViewAfterInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        core_1.Input()
    ], ShowDocumentComponent.prototype, "entityPDF");
    __decorate([
        core_1.Input()
    ], ShowDocumentComponent.prototype, "entityExcel");
    __decorate([
        core_1.Input()
    ], ShowDocumentComponent.prototype, "type");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ShowDocumentComponent.prototype, "paginator");
    ShowDocumentComponent = __decorate([
        core_1.Component({
            selector: 'app-show-document',
            templateUrl: './show-document.component.html',
            styleUrls: ['./show-document.component.scss']
        })
    ], ShowDocumentComponent);
    return ShowDocumentComponent;
}());
exports.ShowDocumentComponent = ShowDocumentComponent;
