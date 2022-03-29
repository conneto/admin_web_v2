import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.scss']
})
export class OrganizationRequestComponent implements OnInit {
  organizations: Organization[] = [];
  constructor(private organizationService: OrganizationApiService) { }

  ngOnInit(): void {
    this.getAll();
  }
  async getAll() {
    this.organizations = await this.organizationService.getAll();
  }
  

}
