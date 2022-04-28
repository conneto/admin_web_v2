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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DownloadDocumentFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var ng2_file_upload_1 = require("ng2-file-upload");
var XLSX = require("xlsx");
var _ = require("lodash");
var DownloadDocumentFormComponent = /** @class */ (function () {
    function DownloadDocumentFormComponent(data, matDialogRef, camApi, formBuilder, dialog) {
        var _a;
        this.data = data;
        this.matDialogRef = matDialogRef;
        this.camApi = camApi;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.fileName = 'BieuMau.xlsx';
        this.hasBaseDrop = true;
        this.uploadedFiles = [];
        this.hasBaseDropZoneOver = false;
        this.files = [];
        this.formData = new FormData();
        this.url = "http://conneto.org:5000/core/api/v1/campaigns/" + ((_a = this.data) === null || _a === void 0 ? void 0 : _a.id) + "/donation_documents/cashflow_details";
    }
    DownloadDocumentFormComponent.prototype.tableUpload = function () {
    };
    DownloadDocumentFormComponent.prototype.closeForm = function () {
        this.matDialogRef.close();
    };
    DownloadDocumentFormComponent.prototype.ngOnInit = function () {
        this.fileUpload = this.formBuilder.group({
            myFile: ['', forms_1.Validators.required]
        });
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: this.url,
            maxFileSize: 15 * 1024 * 1024
        });
        this.uploader.onBuildItemForm = function (fileItem, form) { form.append('myvar', 'myval'); return { fileItem: fileItem, form: form }; };
        if (this.uploader) {
            this.uploader.onCompleteItem = function (fileItem, form) {
                console.log('uploader onCompleteItem', fileItem);
                fileItem.withCredentials = false;
            };
        }
    };
    DownloadDocumentFormComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    DownloadDocumentFormComponent.prototype.uploadAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.camApi.uploadCashFlow(this.formData, "" + this.data.id)];
                    case 1:
                        res = _a.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            console.log("upload thành công");
                        }
                        else {
                            console.log("fail");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DownloadDocumentFormComponent.prototype.exportExcel = function () {
        var element = document.querySelector('#excel-table');
        var ws = XLSX.utils.table_to_sheet(element);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        var file = XLSX.writeFile(wb, this.fileName);
        console.log(file);
        console.log(XLSX.writeFile(wb, this.fileName));
    };
    DownloadDocumentFormComponent.prototype.openModal = function () {
    };
    DownloadDocumentFormComponent.prototype.uploadFile = function (e) {
        var af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (e.target.files.length > 0) {
            this.docFile = e.target.files[0];
            console.log(this.docFile);
            if (!_.includes(af, this.docFile.type)) {
                alert('Only EXCEL Docs Allowed!');
            }
        }
    };
    DownloadDocumentFormComponent.prototype.onFormSubmit = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('cashflow_detail', this.docFile, (_a = this.docFile) === null || _a === void 0 ? void 0 : _a.name);
                        return [4 /*yield*/, this.camApi.uploadCashFlow(formData, "" + ((_b = this.campaign) === null || _b === void 0 ? void 0 : _b.id))];
                    case 1:
                        res = _c.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                            console.log("upload thành công");
                        }
                        else {
                            console.log("fail");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(DownloadDocumentFormComponent.prototype, "campaignControl", {
        get: function () {
            return this.fileUpload.controls;
        },
        enumerable: false,
        configurable: true
    });
    DownloadDocumentFormComponent.prototype.onSelect = function (event) {
        var _a;
        var _b;
        console.log(event);
        (_a = this.files).push.apply(_a, event.addedFiles);
        for (var i = 0; i < this.files.length; i++) {
            (_b = this.formData) === null || _b === void 0 ? void 0 : _b.append("cashflow_detail", this.files[i], this.files[i].name);
        }
        console.log(this.formData);
    };
    DownloadDocumentFormComponent.prototype.onRemove = function (event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    };
    __decorate([
        core_1.Input()
    ], DownloadDocumentFormComponent.prototype, "campaign");
    DownloadDocumentFormComponent = __decorate([
        core_1.Component({
            selector: 'app-download-document-form',
            templateUrl: './download-document-form.component.html',
            styleUrls: ['./download-document-form.component.scss']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DownloadDocumentFormComponent);
    return DownloadDocumentFormComponent;
}());
exports.DownloadDocumentFormComponent = DownloadDocumentFormComponent;
