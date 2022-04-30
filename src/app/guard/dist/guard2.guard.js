"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Guard2Guard = void 0;
var core_1 = require("@angular/core");
var Guard2Guard = /** @class */ (function () {
    function Guard2Guard(router, user) {
        this.router = router;
        this.user = user;
    }
    Guard2Guard.prototype.canActivate = function (route, state) {
        if (this.user.currentUserValue) {
            if (this.user.currentUserValue.role == 'admin') {
                this.router.navigate(['/admin/dashboard']);
                return true;
            }
            else if (this.user.currentUserValue.role == 'organization_manager') {
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
        // if (this.user.currentUserValue) {
        //   if (this.user.currentUserValue.role == 'organization_manager') {
        //     return true;
        //   }else if(this.user.currentUserValue.role=='admin'){
        //     this.router.navigate(['/admin/dashboard']);
        //     return true;
        //   }
        // }
        // this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        // return false;
    };
    Guard2Guard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Guard2Guard);
    return Guard2Guard;
}());
exports.Guard2Guard = Guard2Guard;
