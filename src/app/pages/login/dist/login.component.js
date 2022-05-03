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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loadService, snackBar, router, formBuilder, authService) {
        this.loadService = loadService;
        this.snackBar = snackBar;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.isSubmitData = false;
        this.isChecked = false;
        this.isError = false;
        this.hide = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initLoginForm();
        var enter = document.getElementsByClassName('input');
        console.log(enter);
        for (var i = 0; i < enter.length; i++) {
            enter[i].addEventListener("keyup", function (e) {
                if (e.key == 'Enter') {
                    e.preventDefault();
                    document.getElementsByClassName('button-login')[0].click();
                    console.log(document.getElementsByClassName('login')[0]);
                }
            });
        }
    };
    LoginComponent.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitData = true;
                        if (!this.loginForm.valid) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.authService.login(this.isChecked, this.loginForm.value.username, this.loginForm.value.password)];
                    case 1:
                        baseResponse = _a.sent();
                        if (!((baseResponse === null || baseResponse === void 0 ? void 0 : baseResponse.status) == 0)) return [3 /*break*/, 7];
                        if (!(this.authService.currentUserValue.role_id === 'organization_manager')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.router.navigate(['manager'])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.authService.currentUserValue.role_id === 'admin')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.router.navigate(['admin/dashboard'])];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.isError = true;
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        if ((baseResponse === null || baseResponse === void 0 ? void 0 : baseResponse.status) == 6) {
                            this.isError = true;
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.initLoginForm = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
