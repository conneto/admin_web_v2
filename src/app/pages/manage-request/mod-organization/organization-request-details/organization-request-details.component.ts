import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';

@Component({
  selector: 'app-organization-request-details',
  templateUrl: './organization-request-details.component.html',
  styleUrls: ['./organization-request-details.component.scss']
})
export class OrganizationRequestDetailsComponent implements OnInit {
  organization?: Organization;
  constructor(private route: ActivatedRoute, private location: Location, private orgApi: OrganizationApiService) { }

  ngOnInit(): void {
    this.getValueFromRoute();
  }

  async getValueFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organization = await this.orgApi.getById(`${id}`);
  }
  goBack() {
    this.location.back();
  }
}
