"use strict";
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
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ts_md5_1 = require("ts-md5");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userComponent, loadingService, snackBar, router, authService, formBuilder) {
        this.userComponent = userComponent;
        this.loadingService = loadingService;
        this.snackBar = snackBar;
        this.router = router;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.hide = false;
        this.isSubmited = false;
    }
    RegisterComponent_1 = RegisterComponent;
    RegisterComponent.prototype.ngOnInit = function () {
        this.initRegisterForm();
    };
    RegisterComponent.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var md5, uploadData, oldPass, oldPhone, res, baseResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmited = true;
                        this.loadingService.isLoading.next(true);
                        if (!this.registerForm.valid) return [3 /*break*/, 6];
                        md5 = new ts_md5_1.Md5();
                        uploadData = new FormData();
                        oldPass = this.registerForm.value.password;
                        oldPhone = this.registerForm.value.number_phone;
                        this.registerForm.value.number_phone = "0" + "" + oldPhone;
                        // this.registerForm.patchValue({ password: md5.appendStr(this.registerForm.value.password.concat(RegisterComponent.KEY)).end() });
                        this.registerForm.value.password = md5.appendStr(this.registerForm.value.password.concat(RegisterComponent_1.KEY)).end();
                        console.log(this.registerForm.value.password);
                        uploadData.append('account', JSON.stringify(this.registerForm.value));
                        console.log(uploadData.get('account'));
                        return [4 /*yield*/, this.authService.register(uploadData)];
                    case 1:
                        res = _a.sent();
                        if (!((res === null || res === void 0 ? void 0 : res.status) == 0)) return [3 /*break*/, 5];
                        this.userComponent.getListMangerAndVolunteer();
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage(res.message, true);
                        return [4 /*yield*/, this.authService.login(false, this.registerForm.value.username, oldPass)];
                    case 2:
                        baseResponse = _a.sent();
                        if (!((baseResponse === null || baseResponse === void 0 ? void 0 : baseResponse.status) == 0)) return [3 /*break*/, 4];
                        this.snackBar.showMessage(res.message, true);
                        return [4 /*yield*/, this.router.navigate(['admin'])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.registerForm.setValue({
                            username: this.registerForm.value.username, password: oldPass, first_name: this.registerForm.value.first_name,
                            last_name: this.registerForm.value.last_name, number_phone: oldPhone, role: 'organization_manager'
                        });
                        this.loadingService.isLoading.next(false);
                        this.snackBar.showMessage(res.message, false);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RegisterComponent.prototype.initRegisterForm = function () {
        var md5 = new ts_md5_1.Md5();
        this.registerForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            first_name: ['', forms_1.Validators.required],
            last_name: ['', forms_1.Validators.required],
            number_phone: ['', forms_1.Validators.required,],
            role: ['organization_manager']
        });
    };
    var RegisterComponent_1;
    RegisterComponent.KEY = '_CoNn3t0Se(R3T';
    RegisterComponent = RegisterComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
