"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardCardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardCardComponent = /** @class */ (function () {
    function DashboardCardComponent() {
    }
    DashboardCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], DashboardCardComponent.prototype, "isChange");
    __decorate([
        core_1.Input()
    ], DashboardCardComponent.prototype, "card");
    DashboardCardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard-card',
            templateUrl: './dashboard-card.component.html',
            styleUrls: ['./dashboard-card.component.scss']
        })
    ], DashboardCardComponent);
    return DashboardCardComponent;
}());
exports.DashboardCardComponent = DashboardCardComponent;
