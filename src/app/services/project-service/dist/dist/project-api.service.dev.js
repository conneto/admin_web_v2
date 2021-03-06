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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.ProjectService = void 0;

var core_1 = require("@angular/core");

var campaign_api_service_1 = require("../campaign/campaign-api.service");

var ProjectService =
/** @class */
function () {
  function ProjectService(campaignAdapter, api, projectAdap) {
    this.campaignAdapter = campaignAdapter;
    this.api = api;
    this.projectAdap = projectAdap;
  }

  ProjectService_1 = ProjectService;

  ProjectService.prototype.getAll = function () {
    var _a;

    return __awaiter(this, void 0, void 0, function () {
      var res;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.api.get(ProjectService_1.PROJECT)];

          case 1:
            res = _b.sent();
            res.data = (_a = res.data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
              return _this.projectAdap.adapt(item);
            });
            return [2
            /*return*/
            , res.data || []];
        }
      });
    });
  };

  ProjectService.prototype.getByID = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.api.get(ProjectService_1.PROJECT + '/' + ("" + id))];

          case 1:
            res = _a.sent();
            return [2
            /*return*/
            , res.data = this.projectAdap.adapt(res.data) || []];
        }
      });
    });
  };

  ProjectService.prototype.getCampaignsByProjectId = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var res;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.api.get(ProjectService_1.PROJECT + "/" + id + "/" + campaign_api_service_1.Constant.CAMPAIGN)];

          case 1:
            res = _a.sent();
            res.data = res.data.map(function (item) {
              return _this.campaignAdapter.adapt(item);
            });
            return [2
            /*return*/
            , res.data || []];
        }
      });
    });
  };

  ProjectService.prototype.createProject = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.api.post(ProjectService_1.PROJECT, data)];

          case 1:
            res = _a.sent();
            return [2
            /*return*/
            , res || []];
        }
      });
    });
  };

  ProjectService.prototype["delete"] = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.api["delete"](ProjectService_1.PROJECT + "/" + id)];

          case 1:
            res = _a.sent();
            return [2
            /*return*/
            , res];
        }
      });
    });
  };

  var ProjectService_1;
  ProjectService.PROJECT = 'projects';
  ProjectService = ProjectService_1 = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], ProjectService);
  return ProjectService;
}();

exports.ProjectService = ProjectService;