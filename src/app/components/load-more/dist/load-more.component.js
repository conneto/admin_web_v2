"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoadMoreComponent = void 0;
var core_1 = require("@angular/core");
var LoadMoreComponent = /** @class */ (function () {
    function LoadMoreComponent(loading) {
        this.loading = loading;
        this.passData = new core_1.EventEmitter();
        this.noMore = new core_1.EventEmitter();
    }
    LoadMoreComponent.prototype.ngOnInit = function () {
    };
    LoadMoreComponent.prototype.sendData = function (e) {
        this.passData.emit(e);
    };
    LoadMoreComponent.prototype.sendNoMore = function (e) {
        this.noMore.emit(e);
    };
    LoadMoreComponent.prototype.showMore = function () {
        var _this = this;
        this.loading.isLoading.next(true);
        setTimeout(function () {
            var newLength = _this.entity.length + 8;
            if (newLength > _this.oldData.length) {
                newLength = _this.oldData.length;
            }
            _this.entity = _this.oldData.slice(0, newLength);
            _this.checkShowMore();
            _this.loading.isLoading.next(false);
        }, 300);
    };
    LoadMoreComponent.prototype.checkShowMore = function () {
        if (this.entity.length > 8) {
            if (this.entity.length == this.oldData.length) {
                this.isNoMore = true;
            }
        }
    };
    __decorate([
        core_1.Input()
    ], LoadMoreComponent.prototype, "oldData");
    __decorate([
        core_1.Input()
    ], LoadMoreComponent.prototype, "entity");
    __decorate([
        core_1.Input()
    ], LoadMoreComponent.prototype, "type");
    __decorate([
        core_1.Output()
    ], LoadMoreComponent.prototype, "passData");
    __decorate([
        core_1.Output()
    ], LoadMoreComponent.prototype, "noMore");
    LoadMoreComponent = __decorate([
        core_1.Component({
            selector: 'app-load-more',
            templateUrl: './load-more.component.html',
            styleUrls: ['./load-more.component.scss']
        })
    ], LoadMoreComponent);
    return LoadMoreComponent;
}());
exports.LoadMoreComponent = LoadMoreComponent;
