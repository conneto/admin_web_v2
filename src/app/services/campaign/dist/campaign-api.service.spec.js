"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var campaign_service_1 = require("./campaign.service");
describe('CampaignService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(campaign_service_1.CampaignService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
