"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrganizationDetailsComponent = void 0;
var core_1 = require("@angular/core");
var project_form_component_1 = require("src/app/components/create/project-form/project-form.component");
var OrganizationDetailsComponent = /** @class */ (function () {
    function OrganizationDetailsComponent(snackBar, auth, dialog, route, proApi, location, orgApi, orgComponent) {
        this.snackBar = snackBar;
        this.auth = auth;
        this.dialog = dialog;
        this.route = route;
        this.proApi = proApi;
        this.location = location;
        this.orgApi = orgApi;
        this.orgComponent = orgComponent;
        this.isAdmin = true;
    }
    OrganizationDetailsComponent.prototype.ngOnInit = function () {
        this.getValueFromRoute();
        this.check();
    };
    OrganizationDetailsComponent.prototype.check = function () {
        var _a;
        this.user = this.auth.currentUserValue;
        if (((_a = this.user) === null || _a === void 0 ? void 0 : _a.role) === 'organization_manager') {
            this.isAdmin = false;
        }
    };
    OrganizationDetailsComponent.prototype.getValueFromRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = this.route.snapshot.paramMap.get('id');
                        _a = this;
                        return [4 /*yield*/, this.orgApi.getById("" + id)];
                    case 1:
                        _a.organization = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrganizationDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    Object.defineProperty(OrganizationDetailsComponent.prototype, "getId", {
        get: function () {
            this.getValueFromRoute();
            var id = console.log(this.route.snapshot.paramMap.get('id'));
            return this.route.snapshot.paramMap.get('id');
        },
        enumerable: false,
        configurable: true
    });
    OrganizationDetailsComponent.prototype.openProjectForm = function () {
        var _this = this;
        var dialogRef = this.dialog.open(project_form_component_1.ProjectFormComponent, {
            width: '350px',
            data: {
                title: 'Project Form'
            }
        });
        dialogRef.afterClosed().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var uploadData, res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        uploadData = new FormData();
                        data = __assign(__assign({}, data), { organization_id: (_a = this.organization) === null || _a === void 0 ? void 0 : _a.id });
                        console.log(data);
                        uploadData.append('project', JSON.stringify(data));
                        return [4 /*yield*/, this.proApi.createProject(uploadData)];
                    case 1:
                        res = _b.sent();
                        if (res.resultCode == 0) {
                            this.snackBar.showMessage("Create success !");
                        }
                        else {
                            this.snackBar.showMessage("Error . Please try again !");
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    OrganizationDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-details',
            templateUrl: './organization-details.component.html',
            styleUrls: ['./organization-details.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrganizationDetailsComponent);
    return OrganizationDetailsComponent;
}());
exports.OrganizationDetailsComponent = OrganizationDetailsComponent;
