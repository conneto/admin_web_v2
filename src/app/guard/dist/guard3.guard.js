"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Guard3Guard = void 0;
var core_1 = require("@angular/core");
var Guard3Guard = /** @class */ (function () {
    function Guard3Guard(user, router) {
        this.user = user;
        this.router = router;
    }
    Guard3Guard.prototype.canActivate = function (route, state) {
        if (this.user.currentUserValue) {
            if (this.user.currentUserValue.role == 'admin') {
                this.router.navigate(['/admin/dashboard']);
                return true;
            }
            else if (this.user.currentUserValue.role == 'organization_manager') {
                this.router.navigate(['/manager']);
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    };
    Guard3Guard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Guard3Guard);
    return Guard3Guard;
}());
exports.Guard3Guard = Guard3Guard;
