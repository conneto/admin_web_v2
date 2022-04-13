"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchBarComponent = void 0;
var core_1 = require("@angular/core");
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(org, tabGroup) {
        this.org = org;
        this.tabGroup = tabGroup;
        this.organizations = [];
        this.projects = [];
        this.campaigns = [];
        this.getItem = new core_1.EventEmitter();
        this.organization = [];
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        // this.organization=this.organizations;
        // this.checkStatus(`${this.status}`);
    };
    SearchBarComponent.prototype.ngAfterViewChecked = function () {
    };
    SearchBarComponent.prototype.checkStatus = function (status) {
        switch (status) {
            case 'approve':
                this.org.getAllOrganizationByStatus('approve');
                break;
            case 'reject':
                this.org.getAllOrganizationByStatus('reject');
                break;
        }
    };
    SearchBarComponent.prototype.clearInput = function () {
        document.getElementById(('myInput')).value = '';
    };
    SearchBarComponent.prototype.searchName = function (e, status, entity) {
        if (this.entity) {
            entity = this.entity;
        }
        if (e.target.value.length <= 0 || e.target.value == '') {
            this.isEmpty = false;
            this.organization = this.entityCopy;
        }
        else {
            this.isEmpty = false;
            this.organization = this.entityCopy.filter(function (x) {
                var _a;
                return (_a = x.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(("" + e.target.value).toLowerCase().trim());
            });
            if (this.organization == [] || this.organization.length <= 0) {
                this.isEmpty = true;
            }
        }
        this.passData(this.organization);
    };
    SearchBarComponent.prototype.passData = function (e) {
        this.getItem.emit(e);
    };
    SearchBarComponent.prototype.getState = function (e) {
        return e;
    };
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "organizations");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "projects");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "campaigns");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "entityCopy");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "status");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "isChangeState");
    __decorate([
        core_1.Output()
    ], SearchBarComponent.prototype, "getItem");
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'app-search-bar',
            templateUrl: './search-bar.component.html',
            styleUrls: ['./search-bar.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
