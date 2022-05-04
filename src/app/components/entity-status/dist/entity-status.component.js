"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EntityStatusComponent = void 0;
var core_1 = require("@angular/core");
var EntityStatusComponent = /** @class */ (function () {
    function EntityStatusComponent() {
        this.status = ["Tất cả", "Vô hiệu hóa", "Cấp quyền"];
        this["default"] = "Tất cả";
        this.entity = new core_1.EventEmitter();
    }
    EntityStatusComponent.prototype.ngOnInit = function () {
        this.checkData();
    };
    EntityStatusComponent.prototype.sendData = function (e) {
        this.entity.emit(e);
    };
    EntityStatusComponent.prototype.checkData = function () {
        this.checkAll();
        this.checkEnable();
        this.checkDisable();
    };
    EntityStatusComponent.prototype.checkDisable = function () {
        this.passData = this.entityData.filter(function (x) {
            return x.is_active == false && x.result_code == 510 ||
                x.is_active == false &&
                    x.result_code == 610 ||
                x.is_active == false && x.result_code == 710;
            ;
        });
        if (this.passData.length == 0) {
            this.noDataDisbale = true;
        }
        else {
            this.noDataDisbale = false;
        }
    };
    EntityStatusComponent.prototype.checkAll = function () {
        this.passData = this.entityData.filter(function (x) {
            return (x.result_code == 510 || x.result_code == 531 || x.result_code == 521 || x.result_code == 520
                || x.result_code == 610 || x.result_code == 631 || x.result_code == 621 || x.result_code == 620 ||
                x.result_code == 710 || x.result_code == 731 || x.result_code == 721 || x.result_code == 720);
        });
        if (this.passData.length == 0) {
            this.noDataAll = true;
        }
        else {
            this.noDataAll = false;
        }
    };
    EntityStatusComponent.prototype.checkEnable = function () {
        this.passData = this.entityData.filter(function (x) {
            return (x.is_active == true && x.result_code == 510 || x.result_code == 531 || x.result_code == 521 || x.result_code == 520) ||
                (x.is_active == true &&
                    x.result_code == 610 || x.result_code == 631 || x.result_code == 621 || x.result_code == 620) ||
                (x.is_active == true &&
                    x.result_code == 710 || x.result_code == 731 || x.result_code == 721 || x.result_code == 720);
        });
        if (this.passData.length == 0) {
            this.noDataEnable = true;
        }
        else {
            this.noDataEnable = false;
        }
    };
    EntityStatusComponent.prototype.getStatus = function (e) {
        if (e) {
            switch (e) {
                case 'Tất cả':
                    this.checkAll();
                    this.sendData(this.passData);
                    break;
                case 'Vô hiệu hóa':
                    this.checkDisable();
                    this.sendData(this.passData);
                    break;
                case 'Cấp quyền':
                    this.checkEnable();
                    this.sendData(this.passData);
                    break;
            }
        }
    };
    __decorate([
        core_1.Output()
    ], EntityStatusComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], EntityStatusComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], EntityStatusComponent.prototype, "entityData");
    EntityStatusComponent = __decorate([
        core_1.Component({
            selector: 'app-entity-status',
            templateUrl: './entity-status.component.html',
            styleUrls: ['./entity-status.component.scss']
        })
    ], EntityStatusComponent);
    return EntityStatusComponent;
}());
exports.EntityStatusComponent = EntityStatusComponent;
