"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DocumentButtonComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var XLSX = require("xlsx");
var DocumentButtonComponent = /** @class */ (function () {
    function DocumentButtonComponent(matDialogRef, dialgo, data) {
        this.matDialogRef = matDialogRef;
        this.dialgo = dialgo;
        this.data = data;
        this.fileName = 'BieuMau.xlsx';
    }
    DocumentButtonComponent.prototype.ngOnInit = function () {
    };
    DocumentButtonComponent.prototype.exportExcel = function () {
        var element = document.querySelector('#excel-table');
        var ws = XLSX.utils.table_to_sheet(element);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        var file = XLSX.writeFile(wb, this.fileName);
    };
    DocumentButtonComponent = __decorate([
        core_1.Component({
            selector: 'app-document-button',
            templateUrl: './document-button.component.html',
            styleUrls: ['./document-button.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DocumentButtonComponent);
    return DocumentButtonComponent;
}());
exports.DocumentButtonComponent = DocumentButtonComponent;
