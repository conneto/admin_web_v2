"use strict";

exports.__esModule = true;

var testing_1 = require("@angular/core/testing");

var organization_service_1 = require("./organization.service");

describe('OrganizationService', function () {
  var service;
  beforeEach(function () {
    testing_1.TestBed.configureTestingModule({});
    service = testing_1.TestBed.inject(organization_service_1.OrganizationService);
  });
  it('should be created', function () {
    expect(service).toBeTruthy();
  });
});