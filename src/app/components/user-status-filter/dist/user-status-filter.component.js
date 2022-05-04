"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserStatusFilterComponent = void 0;
var core_1 = require("@angular/core");
var UserStatusFilterComponent = /** @class */ (function () {
    function UserStatusFilterComponent() {
        this.status = ["Tất cả", "Đang hoạt động", "Ngừng hoạt động"];
        this["default"] = "Tất cả";
        this.entity = new core_1.EventEmitter();
    }
    UserStatusFilterComponent.prototype.ngOnInit = function () {
    };
    UserStatusFilterComponent.prototype.sendData = function (e) {
        this.entity.emit(e);
    };
    UserStatusFilterComponent.prototype.checkData = function () {
        this.checkAll();
        this.checkEnable();
        this.checkDisable();
    };
    UserStatusFilterComponent.prototype.checkDisable = function () {
        this.passData = this.entityData.filter(function (x) {
            return x.is_block == true;
        });
        if (this.passData.length == 0) {
            this.noDataDisbale = true;
        }
        else {
            this.noDataDisbale = false;
        }
    };
    UserStatusFilterComponent.prototype.checkAll = function () {
        this.passData = this.entityData.filter(function (x) {
            return x.is_active == true;
        });
        if (this.passData.length == 0) {
            this.noDataAll = true;
        }
        else {
            this.noDataAll = false;
        }
    };
    UserStatusFilterComponent.prototype.checkEnable = function () {
        this.passData = this.entityData.filter(function (x) {
            return x.is_block == false;
        });
        if (this.passData.length == 0) {
            this.noDataEnable = true;
        }
        else {
            this.noDataEnable = false;
        }
    };
    UserStatusFilterComponent.prototype.getStatus = function (e) {
        if (e) {
            switch (e) {
                case 'Tất cả':
                    this.checkAll();
                    this.sendData(this.passData);
                    break;
                case 'Đang hoạt động':
                    this.checkEnable();
                    this.sendData(this.passData);
                    break;
                case 'Ngừng hoạt động':
                    this.checkDisable();
                    this.sendData(this.passData);
                    break;
            }
        }
    };
    __decorate([
        core_1.Output()
    ], UserStatusFilterComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], UserStatusFilterComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], UserStatusFilterComponent.prototype, "entityData");
    UserStatusFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-user-status-filter',
            templateUrl: './user-status-filter.component.html',
            styleUrls: ['./user-status-filter.component.scss']
        })
    ], UserStatusFilterComponent);
    return UserStatusFilterComponent;
}());
exports.UserStatusFilterComponent = UserStatusFilterComponent;
