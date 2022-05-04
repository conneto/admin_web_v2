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
exports.OrganizationUpdateFormComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var constant_1 = require("src/app/constant/constant");

var OrganizationUpdateFormComponent =
/** @class */
function () {
  function OrganizationUpdateFormComponent(formBuilder, loadingService, organizationService, // public dialogRef: MatDialogRef<OrganizationUpdateFormComponent>,
  // public dialog: MatDialog,
  // @Inject(MAT_DIALOG_DATA) public data: any,
  router, snackBar) {
    this.formBuilder = formBuilder;
    this.loadingService = loadingService;
    this.organizationService = organizationService;
    this.router = router;
    this.snackBar = snackBar;
    this.category = constant_1.Constant.CATEGORY;
    this.categoryString = '';
    this.categoryStringClone = '';
    this.filePDF = [];
  }

  OrganizationUpdateFormComponent.prototype.ngOnInit = function () {
    this.initFormBuilder();
  };

  OrganizationUpdateFormComponent.prototype.initFormBuilder = function () {
    var _a; // this.category = this.data.category.split('|')


    this.organizationForm = this.formBuilder.group({
      name: [this.data.name, [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128), forms_1.Validators.pattern('^(?!\\s*$).+')]],
      eng_name: [this.data.eng_name],
      description: [this.data.description, [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
      vision: [this.data.vision, [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
      website: [this.data.website],
      founding_date: [new Date(this.data.founding_date).toISOString().substring(0, 10), forms_1.Validators.required],
      mission: [this.data.mission, [forms_1.Validators.required, forms_1.Validators.minLength(128), forms_1.Validators.maxLength(1000)]],
      category: [(_a = this.data) === null || _a === void 0 ? void 0 : _a.category.split('|')],
      logo: [''],
      cover: ['']
    });
  };

  OrganizationUpdateFormComponent.prototype.update = function () {
    var _a, _b, _c;

    return __awaiter(this, void 0, void 0, function () {
      var i, i, uploadData, res;
      return __generator(this, function (_d) {
        switch (_d.label) {
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
            if (!this.organizationForm.valid) return [3
            /*break*/
            , 2];
            uploadData = new FormData();
            this.organizationForm.value.founding_date = new Date(this.organizationForm.value.founding_date);
            uploadData.append('organization', JSON.stringify(this.organizationForm.value));
            if (this.logoFile != null) uploadData.append('logo', this.logoFile, (_b = this.logoFile) === null || _b === void 0 ? void 0 : _b.name);
            if (this.coverFile != null) uploadData.append('cover', this.coverFile, (_c = this.coverFile) === null || _c === void 0 ? void 0 : _c.name);
            if (this.filePDF.length != 0) uploadData.append('operating_license', this.filePDF[0], this.filePDF[0].name);
            this.loadingService.isLoading.next(true);
            return [4
            /*yield*/
            , this.organizationService.updateById(uploadData, this.data.id)];

          case 1:
            res = _d.sent();

            if ((res === null || res === void 0 ? void 0 : res.status) == 0) {
              this.snackBar.showMessage('Cập nhật thành công', true);
              window.location.reload();
            } else {
              this.snackBar.showMessage('Cập nhật thất bại', true);
            }

            this.router.navigate(['/manager/manage-organization']);
            this.loadingService.isLoading.next(false);
            _d.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Object.defineProperty(OrganizationUpdateFormComponent.prototype, "organizationControl", {
    get: function get() {
      return this.organizationForm.controls;
    },
    enumerable: false,
    configurable: true
  });

  OrganizationUpdateFormComponent.prototype.onChangeLogo = function (e) {
    if (e.target.files && e.target.files.length > 0) {
      this.logoFile = e.target.files[0];
    }
  };

  OrganizationUpdateFormComponent.prototype.onChangeCover = function (e) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverFile = e.target.files[0];
    }
  };

  OrganizationUpdateFormComponent.prototype.onRemoveCategory = function (e) {
    this.isRemoved = true;
    var category = this.organizationForm.controls.category.value;
    var index = category.indexOf(e); // console.log(index);

    if (index !== -1) {
      category.splice(index, 1);
    }

    if (index == 0) {
      this.categoryStringClone = '';
    }

    this.organizationForm.controls.category.patchValue(category);
  };

  OrganizationUpdateFormComponent.prototype.onSelectPDF = function (e) {
    if (e) {
      if (e.addedFiles[0].type != 'application/pdf') {
        this.isWrongFile = true;
      } else {
        this.filePDF = e.addedFiles;
      }
    }
  };

  OrganizationUpdateFormComponent.prototype.onRemove = function (event) {
    this.filePDF.splice(this.filePDF.indexOf(event), 1);
  };

  __decorate([core_1.Input()], OrganizationUpdateFormComponent.prototype, "data");

  OrganizationUpdateFormComponent = __decorate([core_1.Component({
    selector: 'app-organization-update-form',
    templateUrl: './organization-form.component.html',
    styleUrls: ['./organization-form.component.scss']
  })], OrganizationUpdateFormComponent);
  return OrganizationUpdateFormComponent;
}();

exports.OrganizationUpdateFormComponent = OrganizationUpdateFormComponent;