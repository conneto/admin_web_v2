"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardApdater = exports.Dashboard = void 0;
var core_1 = require("@angular/core");
var Dashboard = /** @class */ (function () {
    function Dashboard(numOrg, numPro, numCam, numLogin, totalDonatedMoney, totalParticipatedPeople) {
        this.numOrg = numOrg;
        this.numPro = numPro;
        this.numCam = numCam;
        this.numLogin = numLogin;
        this.totalDonatedMoney = totalDonatedMoney;
        this.totalParticipatedPeople = totalParticipatedPeople;
    }
    return Dashboard;
}());
exports.Dashboard = Dashboard;
var DashboardApdater = /** @class */ (function () {
    function DashboardApdater() {
    }
    DashboardApdater.prototype.adapt = function (item) {
        return new Dashboard(item.num_of_org, item.num_of_pro, item.num_of_cam, item.num_of_login, item.total_donated_money, item.total_participated_people);
    };
    DashboardApdater = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DashboardApdater);
    return DashboardApdater;
}());
exports.DashboardApdater = DashboardApdater;
