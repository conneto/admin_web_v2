"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.LoadingService = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var environment_1 = require("src/environments/environment");

var LoadingService =
/** @class */
function () {
  function LoadingService() {
    this.fetchUri = environment_1.environment.api_fetch;
    this.isNewTab = new rxjs_1.BehaviorSubject(false);
    this.isLoading = new rxjs_1.BehaviorSubject(false);
    this.getApiGetLink = new rxjs_1.BehaviorSubject(this.fetchUri);
    this.getOrganizationId = new rxjs_1.BehaviorSubject('');
    this.projectId = new rxjs_1.BehaviorSubject('');
    this.isSkeleton = new rxjs_1.BehaviorSubject(false);
  }

  LoadingService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], LoadingService);
  return LoadingService;
}();

exports.LoadingService = LoadingService;