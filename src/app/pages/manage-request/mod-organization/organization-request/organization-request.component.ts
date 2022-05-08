import { identifierModuleUrl } from '@angular/compiler';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationRequestComponent implements OnInit {
  organizations: Organization[] = [];
  isRequest: boolean = false;
  isEmpty: boolean = false;
  private listOrg: BehaviorSubject<any>;
  constructor(private organizationService: OrganizationService) {
    this.listOrg = new BehaviorSubject<any>(this.getAll());
  }

  public getListOrg(): any {
    return this.listOrg.value;
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    this.organizations = await this.organizationService.getAll();
    this.organizations = this.organizations.filter((x) => {
      return x.result_code === 501;
    });
    if (this.organizations.length <= 0 || this.organizations == []) {
      this.isEmpty = true;
    }
  }
}
