"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TabgroupComponent = void 0;
var core_1 = require("@angular/core");
var TabgroupComponent = /** @class */ (function () {
    function TabgroupComponent(org, pro, camp) {
        this.org = org;
        this.pro = pro;
        this.camp = camp;
        this.organizations = [];
        this.object = [];
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isChangeState = false;
        this.getState = new core_1.EventEmitter();
    }
    TabgroupComponent.prototype.ngOnInit = function () {
        this.getTabActivated();
    };
    TabgroupComponent.prototype.changeActive = function (name) {
        switch (name) {
            case 'approve':
                this.isActive1 = true, this.isActive2 = false, this.isActive3 = false;
                break;
            case 'reject':
                this.isActive1 = false, this.isActive2 = false, this.isActive3 = true;
                break;
            case 'pending':
                this.isActive1 = false, this.isActive2 = true, this.isActive3 = false;
                break;
        }
    };
    TabgroupComponent.prototype.getTabActivated = function () {
        if (localStorage.getItem('approve')) {
            this.getEntity('approve', this.entity);
        }
        if (localStorage.getItem('pending')) {
            this.getEntity('pending', this.entity);
        }
        if (localStorage.getItem('reject')) {
            this.getEntity('reject', this.entity);
        }
    };
    TabgroupComponent.prototype.getEntity = function (name, entity) {
        this.passData(this.isChangeState = true);
        switch (name) {
            case 'approve':
                localStorage.setItem('approve', 'true');
                localStorage.removeItem('reject');
                localStorage.removeItem('pending');
                this.changeActive('approve');
                switch (entity) {
                    case 'org':
                        this.org.getAllOrganizationByStatus('approve', this.organizations);
                        break;
                    case 'cam': break;
                    case 'pro':
                        this.pro.getAllProjectsByStatus('approve', this.object);
                        break;
                }
                break;
            case 'pending':
                localStorage.setItem('pending', 'true');
                localStorage.removeItem('approve');
                localStorage.removeItem('reject');
                this.changeActive('pending');
                switch (entity) {
                    case 'org':
                        this.org.getAllOrganizationByStatus('pending', this.organizations);
                        break;
                    case 'cam': break;
                    case 'pro':
                        this.pro.getAllProjectsByStatus('pending', this.object);
                        break;
                }
                break;
            case 'reject':
                localStorage.setItem('reject', 'true');
                localStorage.removeItem('approve');
                localStorage.removeItem('pending');
                this.changeActive('reject');
                switch (entity) {
                    case 'org':
                        this.org.getAllOrganizationByStatus('reject', this.organizations);
                        break;
                    case 'cam': break;
                    case 'pro':
                        this.pro.getAllProjectsByStatus('reject', this.object);
                        break;
                }
                break;
        }
    };
    TabgroupComponent.prototype.passData = function (e) {
        this.getState.emit(e);
    };
    __decorate([
        core_1.Input()
    ], TabgroupComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], TabgroupComponent.prototype, "isActivated");
    __decorate([
        core_1.Input()
    ], TabgroupComponent.prototype, "isEmpty");
    __decorate([
        core_1.Input()
    ], TabgroupComponent.prototype, "organizations");
    __decorate([
        core_1.Input()
    ], TabgroupComponent.prototype, "object");
    __decorate([
        core_1.Output()
    ], TabgroupComponent.prototype, "getState");
    __decorate([
        core_1.ViewChild('searchBar')
    ], TabgroupComponent.prototype, "searchBar");
    TabgroupComponent = __decorate([
        core_1.Component({
            selector: 'app-tabgroup',
            templateUrl: './tabgroup.component.html',
            styleUrls: ['./tabgroup.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TabgroupComponent);
    return TabgroupComponent;
}());
exports.TabgroupComponent = TabgroupComponent;
