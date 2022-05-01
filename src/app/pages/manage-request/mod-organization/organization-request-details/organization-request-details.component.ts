import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationInforCardComponent } from 'src/app/components/request-components/organization-infor-card/organization-infor-card.component';
import { Organization } from 'src/app/models/organization/organization';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';

@Component({
  selector: 'app-organization-request-details',
  templateUrl: './organization-request-details.component.html',
  styleUrls: ['./organization-request-details.component.scss']
})
export class OrganizationRequestDetailsComponent implements OnInit {
  organization?: Organization;
  uriApi = this.loadingService.getApiGetLink.value;
  urlLogo?:string;
  urlCover?:string;
  constructor(private loadingService: LoadingService, private route: ActivatedRoute, private location: Location, private orgApi: OrganizationApiService, private orgComponent: OrganizationInforCardComponent) { }

  ngOnInit(): void {
    this.getValueFromRoute();
  }

  async getValueFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organization = await this.orgApi.getById(`${id}`);
   this.urlLogo= this.organization?.logo?.replace(/\\/g, '\/');
   this.urlCover=this.organization?.cover?.replace(/\\/g,'\/');
  }

  goBack() {
    this.location.back();
  }

}
