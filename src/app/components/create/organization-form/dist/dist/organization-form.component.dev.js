"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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
exports.OrganizationFormComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var constant_1 = require("src/app/constant/constant");

var OrganizationFormComponent =
/** @class */
function () {
  function OrganizationFormComponent(org, getEntityService, loadingService, router, snackBar, formBuilder, organizationService, user) {
    this.org = org;
    this.getEntityService = getEntityService;
    this.loadingService = loadingService;
    this.router = router;
    this.snackBar = snackBar;
    this.formBuilder = formBuilder;
    this.organizationService = organizationService;
    this.user = user;
    this.filePDF = [];
    this.category = constant_1.Constant.CATEGORY;
    this.categoryString = '';
    this.categoryStringClone = '';
    this.uploadData = new FormData();
    this.selectedType = 'ngo';
    this.type = ['ngo', 'npo'];
    this.locations = [];
    this.locationObject = {};
    this.userAddress = '';
    this.userLatitude = '';
    this.userLongitude = '';
  }

  OrganizationFormComponent.prototype.ngOnInit = function () {
    this.initFormBuilder();
  };

  OrganizationFormComponent.prototype.getPosition = function (e) {
    if (e) {
      console.log(e);
    }
  };

  OrganizationFormComponent.prototype.getLocationName = function (e) {
    if (e) {
      this.locationObject = {
        name: e.target.value
      };
    } else {
      this.noLocationName = true;
    }

    console.log(this.locationObject);
  };

  OrganizationFormComponent.prototype.handleAddressChange = function (address) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();

    if (address) {
      this.locationObject = __assign(__assign({}, this.locationObject), {
        address: this.userAddress,
        latitude: this.userLatitude,
        longitude: this.userLongitude
      });
    } else {
      this.noAddress = true;
    }
  };

  OrganizationFormComponent.prototype.create = function () {
    var _a;

    return __awaiter(this, void 0, void 0, function () {
      var i, i, res, res_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (this.organizationForm.controls.category.value.length != 0 && this.organizationForm.controls.category.value) {
              if (this.isRemoved == true || this.isSubmitted == true) {
                this.categoryStringClone = '';

                for (i = 0; i < this.organizationForm.controls.category.value.length; i++) {
                  this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat('|', this.categoryStringClone);
                }
              } else {
                this.categoryStringClone = '';

                for (i = 0; i < this.organizationForm.controls.category.value.length; i++) {
                  this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat('|', this.categoryStringClone);
                }
              }
            }

            if (((_a = this.categoryStringClone) === null || _a === void 0 ? void 0 : _a.length) > 0) {
              this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
            }

            this.isSubmitted = true;
            this.organizationForm.value.category = this.categoryString;
            if (!(this.organizationForm.valid && !this.noCover && !this.noFile && !this.noLocationName && !this.noAddress)) return [3
            /*break*/
            , 4];

            if (!this.isSendRequest) {
              this.locations.push(this.locationObject);
            }

            this.isSendRequest = true;
            this.organizationForm.value.locations = this.locations;
            console.log(this.organizationForm.value);
            this.uploadData.append('organization', JSON.stringify(this.organizationForm.value));
            this.loadingService.isLoading.next(true);
            return [4
            /*yield*/
            , this.organizationService.create(this.uploadData)];

          case 1:
            res = _b.sent();
            if (!((res === null || res === void 0 ? void 0 : res.status) == 0)) return [3
            /*break*/
            , 2];
            this.snackBar.showMessage('T???o t??? ch???c th??nh c??ng. Y??u c???u c???a b???n ???? ???????c g???i', true);
            this.loadingService.isLoading.next(false);
            this.org.getAllOrganization();
            this.router.navigate(['/manager']);
            return [3
            /*break*/
            , 4];

          case 2:
            this.loadingService.isLoading.next(true);
            return [4
            /*yield*/
            , this.organizationService.create(this.uploadData)];

          case 3:
            res_1 = _b.sent();

            if ((res_1 === null || res_1 === void 0 ? void 0 : res_1.status) == 0) {
              this.snackBar.showMessage('T???o t??? ch???c th??nh c??ng. Y??u c???u c???a b???n ???? ???????c g???i', true);
              this.loadingService.isLoading.next(false);
              this.org.getAllOrganization();
              this.router.navigate(['/manager']);
            } else {
              this.router.navigate(['/manager/manage-organization']);
              this.snackBar.showMessage("" + (res_1 === null || res_1 === void 0 ? void 0 : res_1.message), false);
              this.loadingService.isLoading.next(false);
            }

            _b.label = 4;

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  OrganizationFormComponent.prototype.initFormBuilder = function () {
    this.organizationForm = this.formBuilder.group({
      name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128), forms_1.Validators.pattern('^(?!\\s*$).+')]],
      eng_name: [''],
      description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128)]],
      vision: ['', [forms_1.Validators.required]],
      website: [''],
      founding_date: ['', forms_1.Validators.required],
      created_by: [this.user.currentUserValue ? this.user.currentUserValue.id : ''],
      mission: ['', [forms_1.Validators.required]],
      category: [''],
      logo: ['', forms_1.Validators.required],
      cover: [''],
      type: [this.selectedType],
      locations: ['']
    });
  };

  OrganizationFormComponent.prototype.onChangeCover = function (e) {
    var _a;

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 5) {
        this.noCover = true;
      } else {
        this.noCover = false;

        for (var i = 0; i < e.target.files.length; i++) {
          this.uploadData.append('cover', e.target.files[i], (_a = e.target.files[i]) === null || _a === void 0 ? void 0 : _a.name);
        }
      }
    }
  };

  OrganizationFormComponent.prototype.onChangeLogo = function (e) {
    var _a;

    if (e.target.files && e.target.files.length > 0) {
      this.logoFile = e.target.files[0];
      this.uploadData.append('logo', this.logoFile, (_a = this.logoFile) === null || _a === void 0 ? void 0 : _a.name);
    } else {
      this.noLogo = true;
    }
  };

  Object.defineProperty(OrganizationFormComponent.prototype, "organizationControl", {
    get: function get() {
      return this.organizationForm.controls;
    },
    enumerable: false,
    configurable: true
  });

  OrganizationFormComponent.prototype.onRemoveCategory = function (e) {
    this.isRemoved = true;
    var category = this.organizationForm.controls.category.value;
    var index = category.indexOf(e);

    if (index !== -1) {
      category.splice(index, 1);
    }

    if (index == 0) {
      this.categoryStringClone = '';
    }

    this.organizationForm.controls.category.patchValue(category);
  };

  OrganizationFormComponent.prototype.onSelectPDF = function (e) {
    if (e) {
      if (e.addedFiles[0].type != 'application/pdf') {
        this.isWrongFile = true;
      } else {
        this.filePDF = e.addedFiles;

        if (this.filePDF.length > 0) {
          this.uploadData.append('operating_license', this.filePDF[0], this.filePDF[0].name);
        } else {
          this.noFile = true;
        }
      }
    }
  };

  OrganizationFormComponent.prototype.onRemove = function (event) {
    this.filePDF.splice(this.filePDF.indexOf(event), 1);
  };

  OrganizationFormComponent.prototype.getType = function (e) {};

  OrganizationFormComponent.CREATE = 'create';

  __decorate([core_1.Input()], OrganizationFormComponent.prototype, "organizationId");

  OrganizationFormComponent = __decorate([core_1.Component({
    selector: 'app-organization-form',
    templateUrl: './organization-form.component.html',
    styleUrls: ['./organization-form.component.scss']
  })], OrganizationFormComponent);
  return OrganizationFormComponent;
}();

exports.OrganizationFormComponent = OrganizationFormComponent;