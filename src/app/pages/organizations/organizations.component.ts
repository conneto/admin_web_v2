import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  constructor(private service: OrganizationApiService) { }

  ngOnInit(): void {
    this.getAllOrganizations();
  }
  async getAllOrganizations() {
    this.organizations = await this.service.getAll();
    this.organizations = this.organizations.filter((i, x) => { return true; })

  }

}
