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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
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
exports.CampaignForm = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var dialog_1 = require("@angular/material/dialog");

var constant_1 = require("src/app/constant/constant");

var CampaignForm =
/** @class */
function () {
  function CampaignForm(currency, organizationService, projectApi, loadingService, authApi, dialogRef, data, formBuilder, organizatioNDetail) {
    this.currency = currency;
    this.organizationService = organizationService;
    this.projectApi = projectApi;
    this.loadingService = loadingService;
    this.authApi = authApi;
    this.dialogRef = dialogRef;
    this.data = data;
    this.formBuilder = formBuilder;
    this.organizatioNDetail = organizatioNDetail;
    this.organizations = [];
    this.projects = [];
    this.selectedRadio = 'Quy??n g??p';
    this.cloneProjects = [];
    this.type = ['Quy??n g??p', 'Tuy???n t??nh nguy???n vi??n'];
    this.uploadData = new FormData();
    this.category = constant_1.Constant.CATEGORY;
    this.categoryString = '';
    this.categoryStringClone = '';
  }

  CampaignForm.prototype.ngOnInit = function () {
    this.initForm();
    this.check(); // let uploadData: any = new FormData();
    // uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
  };

  CampaignForm.prototype.getValue = function (element) {
    this.defaultNumber = this.currency.transform(this.defaultNumber, '??');
    element.target.value = this.defaultNumber;
  };

  CampaignForm.prototype.initForm = function () {
    this.campaignForm = this.formBuilder.group({
      selected: [this.selectedValue, forms_1.Validators.required],
      name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(128)]],
      description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(128)]],
      start_date: ['', forms_1.Validators.required],
      end_date: ['', forms_1.Validators.required],
      start_working_date: ["", this.selectedRadio == "Quy??n g??p" ? "" : forms_1.Validators.required],
      end_working_date: ['', this.selectedRadio == "Quy??n g??p" ? "" : forms_1.Validators.required],
      request_type: ['create'],
      type: [this.selectedRadio, forms_1.Validators.required],
      target_number: ['', forms_1.Validators.required],
      job_requirement: [''],
      job_description: [''],
      job_benefit: [''],
      project_id: [''],
      cover: [''],
      category: ['']
    });
  };

  CampaignForm.prototype.check = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b, _c, _d;

      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            if (!this.data.project) return [3
            /*break*/
            , 4];
            this.isOnlyProject = true;
            _a = this;
            return [4
            /*yield*/
            , this.organizationService.getAll()];

          case 1:
            _a.organizations = _e.sent();
            if (!this.organizations) return [3
            /*break*/
            , 3];
            _b = this;
            return [4
            /*yield*/
            , this.organizationService.getProjectsByOrgId("" + this.organizations[0].id)];

          case 2:
            _b.cloneProjects = _e.sent();
            this.projects = this.cloneProjects.filter(function (x) {
              return x.result_code == 610;
            });
            _e.label = 3;

          case 3:
            return [3
            /*break*/
            , 7];

          case 4:
            _c = this;
            return [4
            /*yield*/
            , this.organizationService.getAll()];

          case 5:
            _c.organizations = _e.sent();
            if (!this.organizations) return [3
            /*break*/
            , 7];
            _d = this;
            return [4
            /*yield*/
            , this.organizationService.getProjectsByOrgId("" + this.organizations[0].id)];

          case 6:
            _d.cloneProjects = _e.sent();
            this.projects = this.cloneProjects.filter(function (x) {
              return x.result_code == 610;
            });
            _e.label = 7;

          case 7:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  CampaignForm.prototype.noClick = function () {
    this.dialogRef.close(false);
  };

  CampaignForm.prototype.yesClick = function () {
    var _this = this;

    var _a;

    if (this.campaignForm.controls.category.value.length != 0 && this.campaignForm.controls.category.value) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';

        for (var i = 0; i < this.campaignForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
        }
      } else {
        this.categoryStringClone = '';

        for (var i = 0; i < this.campaignForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.campaignForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
        }
      }
    }

    if (((_a = this.categoryStringClone) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
    } else {
      this.categoryString = '';
    }

    this.isSubmitted = true;
    this.projects = this.cloneProjects.filter(function (x) {
      return x.name == _this.campaignForm.value.selected;
    });

    if (this.projects.length != 0) {
      this.campaignForm.patchValue({
        project_id: "" + this.projects[0].id
      });
    }

    if (this.selectedRadio == 'Quy??n g??p') {
      this.campaignForm.patchValue({
        start_working_date: "" + this.campaignForm.value.start_date
      });
      this.campaignForm.patchValue({
        end_working_date: "" + this.campaignForm.value.end_date
      });
      this.campaignForm.patchValue({
        type: 'donation'
      });
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    } else if (this.selectedRadio == 'Tuy???n t??nh nguy???n vi??n') {
      this.campaignForm.patchValue({
        type: 'recruitment'
      });
    }

    if (this.campaignForm.valid) {
      this.campaignForm.value.category = this.categoryString;
      this.campaignForm.value.start_date = new Date(this.campaignForm.value.start_date);
      this.campaignForm.value.start_working_date = new Date(this.campaignForm.value.start_working_date);
      this.campaignForm.value.end_working_date = new Date(this.campaignForm.value.end_working_date);
      this.campaignForm.value.end_date = new Date(this.campaignForm.value.end_date);
      this.uploadData.append('campaign', JSON.stringify(this.campaignForm.value));
      this.dialogRef.close(this.uploadData);
    }
  };

  CampaignForm.prototype.onChange = function (e) {
    if (e.target.files && e.target.files.length > 0) {
      for (var i = 0; i < e.target.files.length; i++) {
        this.uploadData.append('cover', e.target.files[i], e.target.files[i].name);
      } // this.coverImage = e.target.files[0];

    }
  };

  Object.defineProperty(CampaignForm.prototype, "campaignControl", {
    get: function get() {
      return this.campaignForm.controls;
    },
    enumerable: false,
    configurable: true
  });

  CampaignForm.prototype.getType = function (e) {
    if (e == 'Quy??n g??p') {
      this.campaignForm.patchValue({
        start_working_date: "" + this.campaignForm.value.start_date
      });
      this.campaignForm.patchValue({
        end_working_date: "" + this.campaignForm.value.end_date
      });
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    } else if (e == 'Tuy???n t??nh nguy???n vi??n') {
      this.campaignForm.setControl('job_requirement', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
      this.campaignForm.setControl('job_description', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
      this.campaignForm.setControl('job_benefit', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8)]));
    }
  };

  CampaignForm.prototype.onRemoveCategory = function (e) {
    this.isRemoved = true;
    var category = this.campaignForm.controls.category.value;
    var index = category.indexOf(e);

    if (index !== -1) {
      category.splice(index, 1);
    }

    if (index == 0) {
      this.categoryStringClone = '';
    }

    this.campaignForm.controls.category.patchValue(category);
  };

  CampaignForm = __decorate([core_1.Component({
    selector: 'app-campaign-form',
    templateUrl: './campaign-form.component.html',
    styleUrls: ['./campaign-form.component.scss']
  }), __param(6, core_1.Inject(dialog_1.MAT_DIALOG_DATA))], CampaignForm);
  return CampaignForm;
}();

exports.CampaignForm = CampaignForm;