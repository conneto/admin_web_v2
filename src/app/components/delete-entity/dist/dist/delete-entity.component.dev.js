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
exports.DeleteEntityComponent = void 0;

var core_1 = require("@angular/core");

var auth_service_1 = require("src/app/services/auth/auth.service");

var dialog_confirm_component_1 = require("../dialog-confirm/dialog-confirm.component");

var DeleteEntityComponent =
/** @class */
function () {
  function DeleteEntityComponent(data, loading, camApi, proApi, user, snackBar, orgApi, dialog) {
    this.data = data;
    this.loading = loading;
    this.camApi = camApi;
    this.proApi = proApi;
    this.user = user;
    this.snackBar = snackBar;
    this.orgApi = orgApi;
    this.dialog = dialog;
    this.isSave = false;
  }

  DeleteEntityComponent.prototype.ngOnInit = function () {
    if (this.user.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  };

  DeleteEntityComponent.prototype.change = function () {
    this.isSave = !this.isSave;
  };

  DeleteEntityComponent.prototype.disable = function () {
    return __awaiter(this, void 0, void 0, function () {
      var diaglogRef;

      var _this = this;

      return __generator(this, function (_a) {
        diaglogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
          width: '360px',
          data: {
            button: 'Vô hiệu hóa',
            message: 'vô hiệu hóa'
          }
        });
        diaglogRef.afterClosed().subscribe(function (x) {
          return __awaiter(_this, void 0, void 0, function () {
            var data1, res;

            var _a;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  if (!x) return [3
                  /*break*/
                  , 2];
                  this.loading.isLoading.next(true);
                  data1 = {
                    object_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id,
                    object_type: this.type == 'org' ? auth_service_1.Constant.ORGANIZATION : this.type == 'cam' ? auth_service_1.Constant.CAMPAIGN : this.type == 'pro' ? auth_service_1.Constant.PROJECT : auth_service_1.Constant.ORGANIZATION,
                    status: 'disable',
                    note: 'Disable this'
                  };
                  return [4
                  /*yield*/
                  , this.user.activateEntity(data1)];

                case 1:
                  res = _b.sent();

                  if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                    switch (this.type) {
                      case 'org':
                        this.data.getByEntity('org');
                        break;

                      case 'cam':
                        this.data.getByEntity('cam');
                        break;

                      case 'pro':
                        this.data.getByEntity('pro');
                        break;
                    }

                    this.loading.isLoading.next(false);
                    window.location.reload();
                    this.snackBar.showMessage('Vô hiệu hóa thành công !', true);
                  } else {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage('Lỗi. Xin hãy thử lại', false);
                  }

                  _b.label = 2;

                case 2:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  DeleteEntityComponent.prototype.enable = function () {
    return __awaiter(this, void 0, void 0, function () {
      var diaglogRef;

      var _this = this;

      return __generator(this, function (_a) {
        diaglogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
          width: '360px',
          data: {
            button: 'Đồng ý',
            close: 'Hủy',
            message: 'Bạn có chắc chắn muốn cấp quyền hoạt động cho đối tượng này?'
          }
        });
        diaglogRef.afterClosed().subscribe(function (x) {
          return __awaiter(_this, void 0, void 0, function () {
            var data1, res;

            var _a;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  if (!x) return [3
                  /*break*/
                  , 2];
                  this.loading.isLoading.next(true);
                  data1 = {
                    object_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id,
                    object_type: this.type == 'org' ? Constant.ORGANIZATION : this.type == 'cam' ? auth_service_1.Constant.CAMPAIGN : this.type == 'pro' ? auth_service_1.Constant.PROJECT : auth_service_1.Constant.ORGANIZATION,
                    status: 'enable',
                    note: 'Enable this'
                  };
                  return [4
                  /*yield*/
                  , this.user.activateEntity(data1)];

                case 1:
                  res = _b.sent();

                  if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
                    this.loading.isLoading.next(false);

                    switch (this.type) {
                      case 'org':
                        this.data.getByEntity('org');
                        break;

                      case 'cam':
                        this.data.getByEntity('cam');
                        break;

                      case 'pro':
                        this.data.getByEntity('pro');
                        break;
                    }

                    window.location.reload();
                    this.snackBar.showMessage('Cấp quyền hoạt động thành công !', true);
                  } else {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage('Lỗi.Xin hãy thử lại', false);
                  }

                  _b.label = 2;

                case 2:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  DeleteEntityComponent.prototype["delete"] = function () {
    return __awaiter(this, void 0, void 0, function () {
      var dialogRef;

      var _this = this;

      return __generator(this, function (_a) {
        dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, {
          width: '360px',
          data: {
            button: 'Xóa',
            close: 'Hủy',
            message: 'Bạn có chắc chắn muốn xóa không?'
          }
        });
        dialogRef.afterClosed().subscribe(function (data) {
          return __awaiter(_this, void 0, void 0, function () {
            var res, _a;

            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  if (!data) return [3
                  /*break*/
                  , 7];
                  res = void 0;
                  this.loading.isLoading.next(true);
                  _a = this.type;

                  switch (_a) {
                    case 'org':
                      return [3
                      /*break*/
                      , 1];

                    case 'cam':
                      return [3
                      /*break*/
                      , 3];

                    case 'pro':
                      return [3
                      /*break*/
                      , 5];
                  }

                  return [3
                  /*break*/
                  , 7];

                case 1:
                  return [4
                  /*yield*/
                  , this.orgApi["delete"]("" + this.entity.id)];

                case 2:
                  res = _b.sent();

                  if (res.status == 0) {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage('Xóa thành công', true);
                  } else {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage("" + res.message, false);
                  }

                  return [3
                  /*break*/
                  , 7];

                case 3:
                  return [4
                  /*yield*/
                  , this.camApi["delete"]("" + this.entity.id)];

                case 4:
                  res = _b.sent();

                  if (res.status == 0) {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage('Xóa thành công', true);
                  } else {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage("" + res.message, false);
                  }

                  return [3
                  /*break*/
                  , 7];

                case 5:
                  return [4
                  /*yield*/
                  , this.proApi["delete"]("" + this.entity.id)];

                case 6:
                  res = _b.sent();

                  if (res.status == 0) {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage('Xóa thành công', true);
                  } else {
                    this.loading.isLoading.next(false);
                    this.snackBar.showMessage("" + res.message, false);
                  }

                  return [3
                  /*break*/
                  , 7];

                case 7:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  __decorate([core_1.Input()], DeleteEntityComponent.prototype, "entity");

  __decorate([core_1.Input()], DeleteEntityComponent.prototype, "type");

  DeleteEntityComponent = __decorate([core_1.Component({
    selector: 'app-delete-entity',
    templateUrl: './delete-entity.component.html',
    styleUrls: ['./delete-entity.component.scss']
  })], DeleteEntityComponent);
  return DeleteEntityComponent;
}();

exports.DeleteEntityComponent = DeleteEntityComponent;