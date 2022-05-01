"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var loading_service_1 = require("./loading.service");
describe('LoadingService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(loading_service_1.LoadingService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
